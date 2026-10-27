# W2 — Các quyết định trước phát hành

**Không yêu cầu chấp thuận lại nội dung 29 bài.** Quyết định chủ dự án ở P1C và phạm vi kỹ thuật W2 hiện tại được giữ. Các việc dưới đây là lựa chọn lịch/vận hành/bằng chứng đúng loại còn thiếu, không phải một đợt kiểm toán nguồn AI hoặc đề nghị viết lại ARTICLE.

| Mục | Cần xác nhận thật | Hiện trạng W2 |
| --- | --- | --- |
| Lịch và mục đích | Chọn 10 tên/mô tả/thứ tự bài hoặc điều chỉnh cụ thể; xác nhận lối phổ biến thông tin tự nguyện, không chẩn đoán/điều trị/tiến trình bắt buộc | Đề xuất draft trong SCHEDULE; chưa phải quyết định chấp thuận chuyên đề |
| Ngày và bối cảnh | Chọn học kỳ/thời điểm thật, xét ngày nghỉ/kỳ thi/bối cảnh THCS–THPT; không gán cho trường cụ thể khi chưa có căn cứ | Mẫu 11/01–17/05/2027, 18 tuần, 10 khoảng 1–2 tuần, UTC+07:00, liên tục; không coi ngày mẫu là lịch được triển khai |
| Quyền chuyên đề | Phê duyệt đúng payload W1: ID/slug/title/description/order/start/end và proof/record F0 của chuyên đề | 10 draft, không proof/status published; sửa payload sau review làm hash cũ hết hiệu lực |
| Quyền bài/hình | Hoàn thiện các bằng chứng F0 còn thiếu theo P1C/P2, đúng ID/revision/contentHash/revisionHash/SVG hash | Chấp thuận nội dung 29/29 đã ghi nhận, nhưng PublicView vẫn 0; lịch tới ngày không cấp quyền |
| Nguyên tắc giới thiệu | Chuyên đề chỉ là lối giới thiệu; bài vẫn có đủ trong Library khi eligible; không khóa bài theo tuần hay buộc học sinh tự bộc lộ | Đã thực hiện kỹ thuật/fixture; chưa có bằng chứng thử đọc học sinh mới |
| Người vận hành | Chọn người được phép rebuild/phát hành, người thay thế, mốc kiểm tra và xử lý khi chậm lịch | Không thêm cron/backend/auto deploy; website tĩnh giữ snapshot cũ tới artifact tiếp theo |
| Rollback | Chọn quy trình kiểm snapshot/SHA/artifact và quyền còn hiệu lực; chỉ phát hành lại artifact đã duyệt khi có chỉ thị | Chỉ thử pure selector + preview history quay mốc, chưa thử hosting rollback |
| Phát hành/hosting | Nghiệm thu Draft W2 và cấp phạm vi Q1/phát hành riêng nếu muốn; chọn access/hosting/notice theo P1C | Không đổi repo private, tạo Cloudflare Pages, deploy/publish hoặc bắt đầu Q1 |

Các record chuyên môn/learner/readerQA/assetRights/publicationAuthorization cần hoạt động và người chịu trách nhiệm thật; không sinh chúng từ lời chấp thuận nội dung, code hoặc PASS CI. Dùng [mẫu P1C](../p1c/EVIDENCE-FORMS.md) và [điều kiện P2](../p2/RELEASE-CONDITIONS.md), tránh thu thập/commit dữ liệu cá nhân hoặc hợp đồng riêng tư.

Native zoom 200%, screen reader và thiết bị/thử đọc thực cần ghi nhận riêng theo phạm vi Q1 khi được cấp. Không biến viewport/Axe/fake clock/fixture thành bằng chứng này.
