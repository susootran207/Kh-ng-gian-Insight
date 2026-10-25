# Các quyết định trình chủ dự án

Accel-plan-r1, 25/10/2026. Chỉ đề xuất, chưa phê duyệt điều chỉnh PLAN hoặc triển khai. Có thể xác nhận nhiều mục cùng một chỉ thị, không cần thêm lượt hỏi cho mỗi bài hoặc bắt sửa r2 hình thức.

## Đã được xác nhận trong yêu cầu hiện tại
- Ưu tiên hoàn thiện website và đủ 29 bài nhanh hơn, giữ khoa học/tuổi/quyền xuất bản.
- C01-r2/C05-r2/C17-r2/E05-r2 đã nghiệm thu **làm bản nháp mẫu**; không tự suy chuyên môn, duyệt nội dung cuối hoặc quyền công bố.
- Cho phép lập sáu tài liệu kế hoạch sau main merge PR #10; chưa cho phép viết 25 bài, thay website hoặc triển khai lô.
- R1 có thể được đề nghị nghiệm thu khi đạt; chỉ sửa lỗi thực chất, không bắt mỗi bài có r2.

## Các lựa chọn cần quyết định

| Mã | Đề xuất khuyến nghị | Tác động và phạm vi cần duyệt |
|---|---|---|
| D01 — Lộ trình | Duyệt phương án hai luồng nội dung/website, đưa 3.7–3.8 lên sớm và kiểm 3.9 tăng dần | Bỏ phụ thuộc nội dung phải chờ 3.6; giữ chức năng 3.3–3.9 và lượt tổng cuối. Không sửa PLAN hiện hành trong PR này |
| D02 — Đầu tư | Duyệt danh sách đề xuất 7 FEATURED, 18 STANDARD cho 25 bài | Featured là ưu tiên trải nghiệm, chưa chọn vị trí/tuần xuất hiện; bốn mẫu không tự bị gán nhãn mới. Có thể đổi trục A mà không hạ risk/chuẩn |
| D03 — Risk | Duyệt sàng lọc 12 HIGH/11 MEDIUM/2 LOW và quy tắc đánh giá lại sau preflight | STANDARD-HIGH cùng chuẩn học thuật như FEATURED-HIGH; LOW chỉ phạm vi hẹp, mở rộng phát triển/sức khỏe phải nâng risk |
| D04 — Lô/năng lực | Duyệt năm lô 5, WIP tối đa hai lô viết/QA; preflight nguồn khó sớm; có thể cấp quyền nhiều lô trong một chỉ thị thực hiện | Giảm chờ từng bài; mỗi lô vẫn PR riêng/chờ duyệt. Nếu chỉ cấp B01 thì các lô khác chưa được làm. Bài BLOCKED không đếm hoàn thành, tiếp tục cùng ID khi gỡ |
| D05 — Nghiệm thu | Duyệt PASS/FIX_REQUIRED/BLOCKED cho nội bộ và PENDING_EXTERNAL_REVIEW riêng trước công bố | Có thể nghiệm thu ngay r1; lỗi cần năm trường cụ thể. Không review lại chỉ vì bố cục/độ dài khác mẫu; sửa có nghĩa phải kiểm/duyệt revision mới |
| D06 — Website và fixture | Cho phép đợt F0 cụ thể tiếp theo để chốt hợp đồng dữ liệu/reader/fixture, rồi phạm vi module độc lập | Trước thay schema/guard/router cần hợp đồng review được; fixture chỉ test, không production/public/catalogue. Không mở đường URL bypass, không phê duyệt giả |
| D07 — Vai trò/điểm nhập | Chỉ định người/luồng phụ trách tệp chung, người QA và reviewer phù hợp; xếp lịch người thật theo lô ổn định | Tránh xung đột và nút chờ reviewer cuối kỳ. Nếu chưa có nhân lực thì ghi giới hạn, không giả song song hoặc hứa deadline |
| D08 — Công bố | Giữ các trục chuyên môn/thử đọc/reader/quyền/duyệt cuối/xuất bản như gate riêng | Nghiệm thu 29 bản nháp không tự mở production. Nguồn không dùng có thể pending; nguồn thiết yếu/luận điểm mới phải đủ căn cứ trước dùng |

## Bước tiếp theo được đề xuất, chưa bắt đầu
Sau duyệt, nên cho phép **B01 và preflight các bài HIGH được chỉ định**, đồng thời cho phép chuẩn bị hợp đồng F0/fixture trong PR độc lập nếu có nguồn lực website. Chủ dự án có thể cấp luôn phạm vi pipeline B01–B05 và các luồng website đã duyệt để không cần chờ thêm trước từng lô; vẫn nghiệm thu từng PR và không tự merge. Có thể gộp duyệt kế hoạch và ủy quyền bước cụ thể trong một phản hồi, nhưng phê duyệt kế hoạch thuần túy không tự là cho phép mọi thay đổi runtime/xuất bản.

Điểm quyết định F0 phải nêu rõ đầu ra và tệp chung được phép, không cấp quyền thay mỹ thuật giàn tử đằng B/Mây hoặc cấu hình deploy. Kế hoạch thử reader được trình trước tích hợp thật; việc dùng bản nháp thật phải chọn revision và giữ nhãn/quyền riêng tư/guard.

## Kiểm tra của PR kế hoạch này
Kiểm bằng mã danh mục 25 ID/slug với matrix trên main; mỗi bài một lô, năm lô đủ 5, tổng 21 core + 4 extension; đếm FEATURED/STANDARD và risk; link nội bộ sáu tài liệu; đối chiếu tree chỉ thêm accelerated-plan. Đây là kiểm kế hoạch, không xác minh nguồn, Bloom hoặc chất lượng 25 bài chưa viết. Kiểm kế hoạch thực tế PASS: sáu tài liệu, 25 ID/slug đúng và không trùng, năm lô đủ 5, số phân loại/lô khớp, 29 liên kết nội bộ hợp lệ. Đối chiếu tree cuối được ghi tại PR. Script kiểm một lần nằm ở thư mục work, không thêm vào sáu tệp bàn giao.
Không chạy build/browser/reader/screen reader vì không đổi ứng dụng hoặc fixture. Không chạy vòng khoa học mới, không cập nhật pending/chuyên gia/quyền công bố. Sáu tài liệu là đề xuất để chủ dự án phê duyệt; không đóng giai đoạn hoặc tự nhận kế hoạch tăng tốc đã có hiệu lực.

## Điểm dừng
Tạo PR tài liệu riêng vào main với [ROADMAP](ROADMAP.md), [ARTICLE-PRIORITY](ARTICLE-PRIORITY.md), [BATCH-SCHEDULE](BATCH-SCHEDULE.md), [QUALITY-GATES](QUALITY-GATES.md), [PARALLEL-WORK](PARALLEL-WORK.md) và tài liệu này. Không sửa mẫu, STANDARDS, PLAN, matrix/catalogue/UI/schema/router/guard hoặc deploy; không viết bài, merge, publish hoặc bắt đầu bước tiếp. Chờ chủ dự án duyệt.
