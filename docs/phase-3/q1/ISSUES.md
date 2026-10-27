# Q1 — phát hiện và mức ưu tiên

Nền e5c777c, Chromium 154 Linux headless/Node 24.19.0. Các kết quả suite chi tiết ở TEST-RESULTS.json và verification; không gọi hạn chế công cụ là lỗi ứng dụng.

| ID | Ưu tiên / trạng thái | Tái hiện / actual | Expected / xử lý |
|---|---|---|---|
| Q1-REL-01 | P0 release / BLOCKED | Build production → Library 0, weekly 0; source manifest 29 draft, publication/publishedAt null, assetRights null; registry 10 draft | V1.0 phương án A phải 29/29 đủ quyền. Thu hồ sơ thật đúng F0; không tự cấp hoặc nới guard. Đây là blocker hồ sơ, không defect P2/W2 |
| Q1-REL-02 | P1 release / BLOCKED | Mở weekly.json: lịch mẫu 11/01–trước 17/05/2027, 10 draft, không topic publication proof | Cần lịch/bối cảnh được chủ dự án duyệt, proof riêng và người vận hành rebuild. Đến ngày không tự cấp quyền |
| Q1-A11Y-01 | P1 verification / NOT TESTED | Môi trường chỉ có Chromium headless, không speech reader/thiết bị thật hoặc browser UI native zoom | Thực hiện MANUAL-CHECKS; viewport 720/DPR2 không là native zoom PASS. Không tự ký readerQA |
| Q1-C1-01 | P2 stability / NOT REPRODUCED | W2 lịch sử có scrollLeft hoặc scrollTop 0 ở ca `C01/C05/E02 figure keyboard...`; mở bằng Enter, Tab zoom150%, focus region, ArrowRight/Down | Mỗi hướng cuộn >0, Escape trả opener. Q1 chạy nguyên ca không sửa app/test/assertion, không auto retry. Q1 full8/8 và lặp riêng5/5 PASS; NOT REPRODUCED, không tuyên bố đã sửa |
| Q1-SUBMIT-01 | P2 chuẩn bị nộp / OPEN decision | index mô tả Prototype, UI chưa ghi rõ tên tác giả/môn/tiểu luận cá nhân | Chủ dự án cung cấp định danh được phép công khai và duyệt câu thông báo; chưa tự thêm tên hoặc đổi UI đã duyệt |
| Q1-MIME-01 | P3 QA helper / FIXED | GET favicon.svg qua server prefix local trả application/octet-stream; root Python trả image/svg+xml | Bổ sung .svg:image/svg+xml ở serve-production.mjs; audit trước/sau và production browser chạy lại; không suy thành Cloudflare PASS |
| Q1-PERF-01 | P2 observation / OPEN | Local production0 bài có initial long task tối đa246–248ms; dev preview transfer≈17MB/CLS≈0,26 | Không có baseline cùng29 public đủ quyền; cần đo lại khi đủF0 trên thiết bị/mạng đại diện, không tối ưu hoặc đổi thiết kế từ số đo dev |
| Q1-HOST-01 | P1 deployment verification / NOT TESTED | Không có Cloudflare project/URL được phép tạo | MIME/cache/noindex/link stability/rollback ở host thực kiểm sau chỉ thị deploy riêng; CLOUDFLARE có checklist |

Không có yêu cầu mở lại kiểm toán AI hoặc viết lại nội dung. Bằng chứng kỹ thuật và ảnh không thay expert/learner/rights/authorization. Các lỗi môi trường ở lượt cài cache đầu được lưu riêng, không tính thành lỗi website.
