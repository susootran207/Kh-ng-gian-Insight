# KGNT-C08 — Hình / c08-draft-r1

## Asset C08-V1

- Tệp: [read-feedback.svg](read-feedback.svg), asset revision v1, tương thích c08-draft-r1; đặt tại heading ngay trước hoạt động trong ARTICLE.
- Loại: sơ đồ/thẻ học tập tự thiết kế bằng hình học và chữ, không ảnh thật hoặc chân dung, không đồ thị dữ liệu.
- Mục đích học: Gắn yêu cầu với một chỗ nhận xét và việc sửa/hỏi. Không chỉ nhìn điểm.
- Nguồn gốc: tệp SVG mới trong PR B01, do trợ lý AI biên soạn cho dự án ngày 25/10/2026 theo ủy quyền người dùng. Không sao chép bố cục/hình nguồn, bộ test hoặc tài sản bên thứ ba.
- Tác giả công cụ: trợ lý AI; không nhận là người vẽ/chuyên gia thật. Chủ thể quyết định quyền công bố: chủ dự án, chưa chốt điều kiện/giấy phép cuối; không tự ghi CC hoặc độc quyền.
- Giấy phép/điều kiện: dùng trong phạm vi review bản nháp được giao; quyền công bố cuối **pending**. Không URL stock/ảnh bên ngoài, không giấy phép bên thứ ba cần giả lập. Font ghi tên hệ thống, không nhúng/tải font; khi tích hợp cần kiểm môi trường font thực tế.
- Nguồn khoa học: Hattie & Timperley 2007, tr.81–82; theo C08-01.
- Giản lược: câu hỏi sư phạm do bài tạo, không tái tạo mô hình gốc hoặc protocol đã kiểm chứng; số (nếu có) chỉ thao tác đọc, chưa dữ liệu/nhân quả.
- Caption: Phiếu tự biên soạn, tham khảo cách xem phản hồi theo nhiệm vụ của Hattie và Timperley (2007); không chép hình hoặc bảng của nguồn.
- Credit đề xuất cho review: “Sơ đồ học tập do Không Gian Nội Tâm biên soạn với hỗ trợ AI,2026; không phải dữ liệu nghiên cứu.” Chủ dự án duyệt credit/quyền cuối riêng.
- Alt text (khớp ARTICLE và desc): Phiếu đọc phản hồi có ba vùng: yêu cầu của bài; thông tin tại một chỗ cụ thể; bước sửa hoặc câu hỏi cần làm rõ.
- Mô tả dài bằng chữ (có ngay ngoài hình): Ba thẻ nhắc đọc yêu cầu, nhìn một chi tiết trong bài rồi chọn việc sửa hoặc hỏi. Số chỉ thứ tự làm bài tập; không thể hiện quan hệ nhân quả hay bảo đảm tăng điểm.

## Kiểm kỹ thuật và xem render

Kiểm XML, không script/foreignObject/image/use/href/tài nguyên ngoài/event handler; chỉ hình học, chữ, title/desc. ViewBox rộng 320, cỡ chữ 16–22px tại320; PNG640 tăng tỷ lệ 2 lần. Bố cục xếp dọc, không dùng màu một mình: mỗi khối có nhãn riêng. Chữ #333e32 trên #dce3d2/#e9e2ee/#fffdf7; kiểm tỷ lệ tương phản bằng công thức WCAG trong validator, đều trên 4,5:1. Điều này không xác nhận toàn diện accessibility.

Render Inkscape320/640 và xem PNG trực tiếp trong lượt B01, không thấy chữ cắt, thiếu dấu hoặc thiếu khối. Bằng chứng lệnh/kết quả trong báo cáo lô; PNG chỉ ở work/không đưa vào website hoặc PR. XML và chuỗi alt/caption/mô tả được validator kiểm riêng. Không dùng đường nối gợi nhân quả hoặc hứa hiệu quả; mô tả chữ truyền đạt đủ nội dung khi không xem hình.

**PASS nội bộ về nội dung/kỹ thuật; quyền công bố và reader/assistive QA vẫn PENDING_EXTERNAL_REVIEW.** Chưa thử trên thiết bị thật/reader/screen reader; cần kiểm zoom, phông và độ đọc với học sinh trước công bố. Không xem vector sắc nét thay thử đọc. Nếu font hoặc ảnh không phù hợp, có thể dùng nguyên mô tả chữ và câu hỏi; không cần ảnh chân dung giả.
