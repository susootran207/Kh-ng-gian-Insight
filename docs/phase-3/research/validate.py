"""Validate research records and internal links, not scholarly truth."""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent
def validate(data):
    sources = data["sources"]
    ids = [s["id"] for s in sources]
    assert len(ids) == len(set(ids)), "duplicate source"
    assert set(data["articleSources"]) == {"C01", "C05", "C17", "E05"}
    for s in sources:
        for k in ("citation", "canonical", "url", "type", "access", "locator",
                  "population", "support", "limits", "log", "checkedOn"):
            assert s[k], (s["id"], k)
        assert s["url"].startswith("https://") and s["canonical"].startswith("https://")
        assert s["access"] in {"fulltext_sections", "abstract_only", "excerpt_only"}
        assert s["verification"] == "scoped_reading_only"
        assert s["expertApproval"] is None
    for code, refs in data["articleSources"].items():
        assert 3 <= len(refs) <= 6 and len(refs) == len(set(refs))
        assert set(refs) <= set(ids)
        subset = [s for s in sources if s["id"] in refs]
        count = {
            "found": len(refs),
            "fulltextSections": sum(s["access"] == "fulltext_sections" for s in subset),
            "abstractOnly": sum(s["access"] == "abstract_only" for s in subset),
            "excerptOnly": sum(s["access"] == "excerpt_only" for s in subset),
            "pendingFulltext": sum(s["access"] != "fulltext_sections" for s in subset),
        }
        assert count == data["counts"][code], (code, count)
        for name in ("SOURCES", "CONCEPTS", "CLAIMS", "BLOOM", "OUTLINE", "VISUALS", "OPEN-QUESTIONS"):
            assert (ROOT / code / (name + ".md")).is_file(), (code, name)
        claims = (ROOT / code / "CLAIMS.md").read_text()
        for sid in re.findall(r"\| (S[0-9]{2}) \|", claims):
            assert sid in refs
    return True

if __name__ == "__main__":
    import copy
    data = json.loads((ROOT / "sources.json").read_text())
    validate(data)
    bad = copy.deepcopy(data)
    bad["sources"][0]["expertApproval"] = {"by": "fixture"}
    try:
        validate(bad)
    except AssertionError:
        pass
    else:
        raise AssertionError("fabricated approval accepted")
    bad = copy.deepcopy(data)
    bad["counts"]["C17"]["fulltextSections"] += 1
    try:
        validate(bad)
    except AssertionError:
        pass
    else:
        raise AssertionError("inflated full-text count accepted")
    for doc in ROOT.rglob("*.md"):
        for target in re.findall(r"\]\(([^)]+)\)", doc.read_text()):
            if "://" not in target and not target.startswith("#"):
                assert (doc.parent / target.split("#")[0]).exists(), (doc, target)
    print("PASS: 4 dossiers; 14 unique sources including shared Bloom; reference IDs, counts and internal links; rejects fabricated approval and inflated full-text count.")
