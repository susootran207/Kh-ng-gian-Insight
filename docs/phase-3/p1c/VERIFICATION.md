# P1C — Bằng chứng kiểm chứng

Tiếp tục bàn giao ngày **27/10/2026, Asia/Ho_Chi_Minh**. Đã kiểm lại PR #27/main và không có PR P1C trùng; main chưa đổi.

Nền main: `16965ff8972124762ba712196ac211d769b09388`; tree `9066b682591917986fc421d3ed2e9c0a9ba4968b`. PR #27 được GitHub xác nhận merged; Git fetch thành công và ref local trùng main qua connector. Node24.19.0, không cài hoặc đổi dependency trong P1C.

| Kiểm thực chạy local | Kết quả / bằng chứng |
|---|---|
| Đối chiếu inventory với manifest và P1A | PASS: 29 ID/slug duy nhất, bốn r2/25 r1, 29 SVG; source/content/revision hash và dossier/asset khớp |
| Hash nguồn trước/sau | PASS: 203 tệp ARTICLE/dossier/SVG khớp byte Git nền và manifest; [INTEGRITY.json](INTEGRITY.json) |
| `npm run content:manifest --prefix prototype -- --check` | PASS: 29 records unchanged, no publication grants; [manifest.log](verification/manifest.log) |
| `npm run test:f0 --prefix prototype` | PASS: 22/22, không skip; mismatch/path/proof/rights/date và negative/canary giữ nguyên; [f0.log](verification/f0.log) |
| Gọi `loadManifest` và `selectSourceView(...,{kind:'public'})` bằng mã hiện hành | PASS: 29 nguồn, **0 public article, 0 publication bundle, 0 assetRights**; [public-view.log](verification/public-view.log) |
| `python3 docs/phase-3/p1c/validate.py` | PASS kiểm docs/integrity: 29 scope, 203 hash, 808 blob nền không đổi, link và trạng thái hồ sơ; [p1c.log](verification/p1c.log) |
| Diff/scope | Chỉ thêm docs/phase-3/p1c; không sửa tệp nguồn, hồ sơ lịch sử, guard/status, catalogue, CI hoặc ứng dụng. `git diff --check` khi bàn giao |

PublicView test kiểm tập dữ liệu build-side, **không phải build/scanner/browser hoặc kiểm artifact mới**. Chưa chạy build hay browser local vì chỉ ghi quyết định và mẫu tài liệu; không đổi mã/data production. CI hiện hữu chạy Node/build/scanner ở head PR; run/head và kết quả được dẫn trong mô tả Draft PR sau khi xác minh GitHub, không lấy kết quả P1A làm CI mới. Workflow không có browser hoặc validator P1C/Python, không được gán các bước đó là CI PASS.

Không chạy lại kiểm toán nguồn AI/P1B.1, không retry119URL học thuật, không thực hiện chuyên môn độc lập/quyền/thử đọc/ReaderQA mới. UNVERIFIED/BLOCKED của các phần còn thiếu giữ nguyên; các mẫu không phải kết quả thực. Không kiểm mới native zoom 200%, screen reader, Safari/Firefox hoặc thiết bị thật. Không chụp ảnh mới vì không đổi UI.

Validator và F0 chỉ chứng minh nhất quán/phạm vi/toàn vẹn kỹ thuật, không xác minh người có thật/chuyên môn/quyền pháp lý hoặc chữ ký. Quyết định chấp thuận nội dung là chỉ thị thật của chủ dự án, nhưng chưa có bộ năm record/proof và assetRights hoàn chỉnh. P2 vẫn BLOCKED; không tạo trạng thái published hoặc cấp quyền ngầm.
