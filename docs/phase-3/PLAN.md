# Giai đoạn 3 — Phương án B, chỉ triển khai 3.1

Ngày ghi nhận: 25/10/2026 (Asia/Saigon). Căn cứ main: 0c1f4399c0f995fe7d4395186f767918beb5289f, đã merge PR #3.
Người dùng xác nhận Giai đoạn 2 đã được duyệt; chọn giữ 24 bài cốt lõi, bổ sung 5 bài mở rộng.
Chỉ đợt 3.1 được cho phép. Duyệt định hướng không phải duyệt từng bài, xác nhận chuyên môn hay quyền xuất bản.
Danh sách không phải giới hạn thư viện; các hồ sơ hiện chỉ là đề cương, chưa có bản thảo.

## Tài liệu bàn giao
- [Ma trận đọc nhanh](MATRIX.md); [hồ sơ 29 đề tài và chuyên đề](matrix.json).
- [Quy chuẩn](STANDARDS.md): học thuật, APA 7, Bloom, hình ảnh, công cụ và vòng duyệt.
- [Mẫu hồ sơ](TEMPLATES.md): bài, nguồn, khái niệm, nhận định, alignment, hình, phê duyệt.
- [Kiến trúc mở rộng](ARCHITECTURE.md): tái sử dụng, ranh giới xuất bản và các thay đổi cần xin duyệt.
- [Báo cáo](REVIEW.md); kiểm tra dữ liệu bằng `python3 docs/phase-3/validate.py`.

## Thứ tự phụ thuộc và nghiệm thu
Mỗi đợt sau chỉ bắt đầu khi người dùng cho phép; không tự chuyển đợt.

| Đợt | Mục tiêu, chức năng, nội dung | Nghiệm thu |
|---|---|---|
| 3.1 — đang thực hiện | Chốt phương án B; ma trận 29 đề cương; chuẩn nguồn/Bloom/hình; mẫu hồ sơ và đánh giá kiến trúc | Đủ 24+5 hồ sơ, định danh và liên kết hợp lệ; không nguồn/ảnh/phê duyệt giả; PR chỉ tài liệu và kiểm tra offline |
| 3.2 — chưa cho phép | Đề xuất 4 mẫu C01, C05, C17, E05: nhận diện cảm xúc, mùa thi, giấc ngủ và phong cách học; đủ trích dẫn và hình | Nguồn đối chiếu từng nhận định; quyền hình rõ; alignment có phản hồi; người dùng duyệt mẫu trước khi nhân rộng |
| 3.3 — sau 3.2 | Hoàn thiện chuyên đề tuần trên route hiện có: lời dẫn, thứ tự, lịch giới thiệu và trạng thái chờ | Trang chủ/chuyên đề cùng dữ liệu; chỉ liên kết bài published; lịch dùng giờ Việt Nam, giữ chuyên đề hợp lệ gần nhất |
| 3.4 — sau 3.3 | Trang Nền tảng: mục đích, cách đọc, biên tập, nguồn, Bloom, hình, quyền riêng tư | Mô tả đúng thực tế; không chuyên gia/đối tác giả; giữ section và liên kết cũ |
| 3.5 — sau 3.4 | Dòng chảy: bốn chặng Đầu năm/Giữa học kỳ/Mùa thi/Sau thi; gợi ý đọc và bộ lọc | Người đọc tự chọn; không suy đoán cảm xúc; timeline và URL/bộ lọc nhất quán |
| 3.6 — sau 3.5 | Góc tâm tình: hướng dẫn, suy ngẫm tùy chọn và phản hồi thao tác | Không lưu/gửi/log/URL nội dung; giữ cleanup, bàn phím, giảm chuyển động và giới hạn đèn |
| 3.7 — sau 3.6 | 8 bài C02,C03,C06,C07,C09,C11,C14,C18, hai lô 4 | Mỗi lô kiểm nguồn, Bloom, quyền hình; không tự approved/published |
| 3.8 — sau 3.7 | 17 bài còn lại: 13 cốt lõi C04,C08,C10,C12,C13,C15,C16,C19,C20,C21,C22,C23,C24 và 4 mở rộng E01–E04; lô 4+4+4+4+1 | Đủ 29 bản nháp kèm hồ sơ, không sao chép test; phân biệt bằng chứng từng công cụ; mỗi lô được rà soát |
| 3.9 — sau 3.8 | Kết nối trang chủ, thư viện, reader, chuyên đề, Nền tảng, Dòng chảy | Đối chiếu trích dẫn hai chiều, quyền ảnh/alt/chú thích/khả năng đọc; không rò nháp; kiểm route, bộ lọc, 320/390/768/1440, bàn phím và hồi quy GĐ1–2; xuất bản cần quyết định riêng |

## Chuyên đề
T01–T08 giữ cấu trúc tám cụm ba bài của bộ 24 ban đầu. T09 là chuyên đề kiến thức mở rộng gồm năm bài, không khẳng định các công cụ có giá trị tương đương và không buộc đọc cùng tuần.
Các tựa và lịch chuyên đề còn chờ duyệt. Không thêm bài nguyên văn vào catalogue ở 3.1.

## Phạm vi bảo toàn
Giữ HTML gốc, tử đằng B, Mây, artwork, palette, font, chuyển động, trang chủ và mọi chức năng GĐ1–2.
Không test tâm lý online, backend, tài khoản, analytics, deploy, merge hay tự xuất bản.
