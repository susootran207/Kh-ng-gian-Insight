"""Offline planning checks only; does not verify scholarship or image rights."""
import copy
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent

def validate(data):
    articles, topics = data["articles"], data["topics"]
    ids = [a["id"] for a in articles]
    slugs = [a["slug"] for a in articles]
    assert len(ids) == len(set(ids)), "duplicate ID"
    assert len(slugs) == len(set(slugs)), "duplicate slug"
    topic_ids = {t["id"] for t in topics}
    assert len(topic_ids) == len(topics), "duplicate topic ID"
    for a in articles:
        assert re.fullmatch(r"KGNT-[CE][0-9]{2,}", a["id"])
        assert re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", a["slug"])
        assert a["collection"] in ("core", "extension")
        assert a["title"] and a["topic"] and a["keywords"]
        assert a["audience"] and set(a["audience"]) <= {"THCS", "THPT"}
        assert set(a["bloom"]) == {"remember", "understand", "apply"}
        assert all(a["bloom"].values())
        assert a["candidateConcepts"] and a["researchDirection"]
        assert a["visualPlan"]["proposal"] and a["visualPlan"]["purpose"]
        assert a["visualPlan"]["rightsStatus"] == "pending"
        assert a["visualPlan"]["sourceStatus"] == "pending"
        assert a["editorialStatus"] == "draft"
        assert a["artifactStage"] == "outline_only" and a["isIllustrative"] is False
        assert a["sourceVerification"] == "not_started"
        assert all(a[k] is None for k in ("editorialApproval", "expertReview", "publicationAuthorization"))
        assert a["approvalNeeded"]
        assert a["relatedArticleIds"] and set(a["relatedArticleIds"]) <= set(ids)
        assert a["id"] not in a["relatedArticleIds"]
        assert a["topicIds"] and set(a["topicIds"]) <= topic_ids
        for tid in a["topicIds"]:
            assert a["id"] in next(t for t in topics if t["id"] == tid)["articleIds"]
    for t in topics:
        assert t["status"] == "draft" and t["kind"] == "planned-topic"
        assert t["articleIds"] and len(t["articleIds"]) == len(set(t["articleIds"]))
        assert set(t["articleIds"]) <= set(ids)
        for aid in t["articleIds"]:
            assert t["id"] in next(a for a in articles if a["id"] == aid)["topicIds"]

def must_reject(data, label):
    try:
        validate(data)
    except AssertionError:
        return
    raise AssertionError("did not reject: " + label)

if __name__ == "__main__":
    data = json.loads((ROOT / "matrix.json").read_text())
    validate(data)
    # Baseline acceptance, not an implementation limit.
    assert len([a for a in data["articles"] if a["collection"] == "core"]) == 24
    assert len([a for a in data["articles"] if a["collection"] == "extension"]) == 5
    assert len(data["topics"]) == 9
    broken = copy.deepcopy(data)
    broken["articles"][0]["id"] = broken["articles"][1]["id"]
    must_reject(broken, "duplicate ID")
    broken = copy.deepcopy(data)
    broken["articles"][0]["relatedArticleIds"] = ["missing"]
    must_reject(broken, "dangling link")
    broken = copy.deepcopy(data)
    broken["articles"][0]["expertReview"] = {"by": "invented"}
    must_reject(broken, "fabricated approval")
    broken = copy.deepcopy(data)
    broken["articles"][0]["visualPlan"]["rightsStatus"] = "verified"
    must_reject(broken, "unverified image marked verified")
    extended = copy.deepcopy(data)
    extra = copy.deepcopy(extended["articles"][-1])
    extra.update(id="KGNT-E06", slug="future-topic", title="Future planning fixture")
    extended["articles"].append(extra)
    extended["topics"][-1]["articleIds"].append(extra["id"])
    validate(extended)  # Confirms no 29-item maximum.
    # Local Markdown references; not remote URLs or factual verification.
    for doc in ROOT.glob("*.md"):
        for link in re.findall(r"\]\(([^)]+)\)", doc.read_text()):
            if "://" not in link and not link.startswith("#"):
                assert (doc.parent / link.split("#")[0]).exists(), (doc.name, link)
    print("PASS: 24+5 baseline; 29 profiles; 9 topics; IDs/slugs/relations/statuses; 4 rejection cases; growth to 30; local doc links.")
