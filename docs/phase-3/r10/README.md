# R1.0 — chuẩn bị phát hành học thuật

Nền main `77092277eadeb1d9af169855e7b8a59096a17e87`; PR #31 đã merge ngày 27/10/2026 lúc 14:26:11 +07:00. Nhánh `phase-3-r10-academic-release-preparation`. Không kiểm toán AI, viết lại 29 bài hoặc lặp báo cáo QA Q1.

## Hồ sơ đã hoàn tất và chuẩn bị

**Đã hoàn tất hợp lệ: 29 editorialApproval bài + 29 assetRights + 10 editorialApproval chuyên đề = 68 record rời**, theo [xác nhận thực](CONFIRMATION.md) lúc 2026-10-27T14:34:11+07:00. F0 `assertRecord` kiểm từng record; không gắn bundle một phần vào manifest. Chỉ hoàn tất các phạm vi được chủ dự án xác nhận, không xác minh pháp lý độc lập.

- Giữ quyết định chấp thuận 29 bài trong P1C và xác nhận mới của chủ dự án. Chủ dự án chấp thuận 10 chuyên đề W2 làm lịch mô phỏng 18 tuần năm 2027, không khẳng định trường học đã triển khai.
- [Sổ hồ sơ](PREPARATION.json) có đúng ID/revision/contentHash/revisionHash của 29 bài, 29 SVG và 10 payload chuyên đề. W1 dùng **slug** làm subjectId và `legacyHashes(payload)`: gồm ID/title/description/thứ tự bài/start/end, không gồm status/publication. `r10-weekly-v1` là nhãn revision của record chuyên đề, không thay revision ARTICLE.
- [Căn cứ 29 SVG](ASSETS.md) trích hồ sơ hiện có theo từng asset/hash: hình học/chữ tạo riêng với hỗ trợ AI; không nhận diện ảnh/icon/font nhúng ngoài hoặc hình nguồn sao chép. Chủ dự án đã xác nhận thẩm quyền sử dụng trên web học thuật công khai, phi thương mại, giữ credit, không cấp phép mở hoặc khẳng định độc quyền. Không dựng giấy phép ảnh stock giả.
- Tái dùng Q1 theo từng bài/hash: 29 bài, 29 SVG, 4.716 AST = DOM node, 25 bảng tại 320/390/768/1440, kèm log liên quan. Đây là bằng chứng kỹ thuật, không tự thành expertReview/learnerReview hoặc readerQA toàn diện của người thật. Native zoom/screen reader/thiết bị thật chưa kiểm; C1 pan vẫn NOT REPRODUCED theo Q1.
- [Thông báo sản phẩm và quyền tác giả](NOTICE.md) sẵn để tích hợp: mục đích học tập cá nhân, phi thương mại, giới hạn tham vấn/trị liệu, trích nguồn, quyền phần đóng góp riêng và quyền bên thứ ba. Không thông tin cá nhân, không license mở toàn dự án; không sửa ARTICLE/UI đã duyệt.

F0 không cho gắn bundle một phần trong manifest của bài chưa published. Record có căn cứ được lưu **rời** và dẫn trong sổ R1.0; source-manifest/weekly vẫn draft/null cho tới khi đủ bundle. Không sửa validator/generator để chấp nhận partial records, không lấy fixture hoặc preview làm artifact phát hành.

## Việc tối thiểu còn thiếu

1. Người có chuyên môn và người tổ chức thử đọc bổ sung kết quả đã thực sự thực hiện cho expertReview/learnerReview. Nếu chưa làm thì giữ BLOCKED; dùng hồ sơ sẵn có, không thêm vòng AI.
2. Người chịu trách nhiệm readerQA xác nhận phần Q1 có thể tái dùng và bổ sung/giải quyết các kiểm bắt buộc còn thiếu. Không bắt chạy lại toàn bộ Q1 nếu mã/nguồn liên quan không đổi.
3. Khi các điều kiện trên đủ, chủ dự án xác nhận publicationAuthorization riêng, đúng phiên bản cho 29 bài và từng topic. R1.0 hiện là chuẩn bị, không cho công bố. W1 vẫn yêu cầu đủ 5 loại record cho mỗi topic, không chỉ editorialApproval.

## Trạng thái và build

| Đối tượng | Đã có căn cứ/record hợp lệ | Runtime hiện tại |
|---|---|---|
| 29 bài | 29 editorialApproval rời | 29 draft; publication/publishedAt null; public 0 |
| 29 SVG | 29 assetRights rời theo xác nhận chủ dự án | Chưa gắn rights vào manifest vì F0 chưa đủ bundle; public SVG bài 0 |
| 10 chuyên đề | 10 editorialApproval rời, đúng hash W1; lịch mô phỏng được chấp thuận | 10 draft; public 0; future còn phải chờ startsAt |

29 ARTICLE/29 SVG nguyên byte; 10 topic giữ nguyên payload W2. PublicView hiện 0 bài/0 chuyên đề; lịch 2027 cũng chưa đến mốc hiện tại. Ngay cả khi đủ proof, W1 vẫn giấu topic future trước startsAt: không hứa 10 chuyên đề cùng hiện public ngay bây giờ. Website tĩnh cần rebuild/deploy sau mốc; không dùng clock tương lai để phát sớm. Library lấy toàn bộ tập eligible độc lập với weekly.

**RELEASE BLOCKED**: còn 4 loại record cho mỗi bài (expertReview/readerQA/learnerReview/publicationAuthorization), tương ứng 116 scope; tương tự 40 scope cho 10 topic theo W1. Đây là số phạm vi record, không phải yêu cầu 156 người/buổi kiểm độc lập. Có thể dùng báo cáo nhóm thực nhưng từng record phải đúng subject/hash. Không làm thêm vòng AI. Đến khi đủ F0, không tạo artifact giả đủ 29 bài. [VALIDATION.json](VALIDATION.json) ghi kiểm tra có phạm vi của R1.0. Đã chạy thực tế manifest --check, validator 68 record + đối chiếu Q1/hash, npm run build (gồm typecheck), scanner/canary và negative incomplete-bundle: PASS. Bản kiểm boundary có 29 file output, 4.375 marker, 29 bài withheld; digest/file list trong VALIDATION.json. Không lặp browser toàn Q1; các route/Library/Reader/Dòng chảy/weekly không đổi mã hoặc nguồn. CI F0–W2 của Draft PR được xác minh riêng ở mô tả PR. Q1 là bằng chứng kỹ thuật theo SHA, không tự nâng thành proof người thật. Build kiểm boundary 0 bài chỉ là artifact xác minh fail closed, không phải bản nộp 29 bài.

## Cloudflare — checklist ngắn, chưa thực hiện

- Có chỉ thị riêng đổi repository private; rà collaborators/quyền tối thiểu/branch protection, giữ lịch sử. Public clone cũ không tự thu hồi.
- Đủ hồ sơ 29 bài/29 SVG/topic và nghiệm thu các phần còn thiếu. Checkout SHA đã duyệt → fresh build → F0/scanner/canary → count 29/29 và route trọng yếu → digest artifact.
- Chỉ Direct Upload dist đã duyệt; không checkout/docs/proof/manifest/preview/sourcemap. Không tạo GitHub App/token trong PR này.
- Duy trì link project production ổn định, không yêu cầu đăng nhập; giữ noindex và notice, không quảng bá. Noindex không phải kiểm soát truy cập.
- Sau chỉ thị deploy riêng: kiểm HTTPS/root/hash/deep link/reload/MIME/cache/noindex/privacy, rollback artifact đủ quyền và duy trì link qua thời gian chấm bài. [Checklist Q1](../q1/CLOUDFLARE.md) có chi tiết; response host thật chưa kiểm.

Dừng tại Draft PR; không merge/deploy/publish/đổi visibility/tạo hosting hoặc tự điền quyền giả.
