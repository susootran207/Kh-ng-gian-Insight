# KGNT-C18 — Hình / c18-draft-r1

## Asset C18-V1

- Tệp: [rest-options.svg](rest-options.svg), asset revision v1, tương thích c18-draft-r1; đặt tại heading ngay trước hoạt động trong ARTICLE.
- Loại: sơ đồ/thẻ học tập tự thiết kế bằng hình học và chữ, không ảnh thật hoặc chân dung, không đồ thị dữ liệu.
- Mục đích học: Phân biệt tạm dừng yêu cầu với làm việc khác, giữ lựa chọn nghỉ thêm hoặc giảm nhiệm vụ.
- Nguồn gốc: tệp SVG mới trong PR B01, do trợ lý AI biên soạn cho dự án ngày 25/10/2026 theo ủy quyền người dùng. Không sao chép bố cục/hình nguồn, bộ test hoặc tài sản bên thứ ba.
- Tác giả công cụ: trợ lý AI; không nhận là người vẽ/chuyên gia thật. Chủ thể quyết định quyền công bố: chủ dự án, chưa chốt điều kiện/giấy phép cuối; không tự ghi CC hoặc độc quyền.
- Giấy phép/điều kiện: dùng trong phạm vi review bản nháp được giao; quyền công bố cuối **pending**. Không URL stock/ảnh bên ngoài, không giấy phép bên thứ ba cần giả lập. Font ghi tên hệ thống, không nhúng/tải font; khi tích hợp cần kiểm môi trường font thực tế.
- Nguồn khoa học: Không biểu diễn mô hình khoa học; C18-02 giải thích giới hạn bằng chứng nghỉ; C18-E1 là thẻ biên tập.
- Giản lược: câu hỏi sư phạm do bài tạo, không tái tạo mô hình gốc hoặc protocol đã kiểm chứng; số (nếu có) chỉ thao tác đọc, chưa dữ liệu/nhân quả.
- Caption: Thẻ học tập tự biên soạn; không tái tạo mô hình phục hồi, không quy định phút nghỉ hoặc hứa tác dụng điều trị.
- Credit đề xuất cho review: “Sơ đồ học tập do Không Gian Nội Tâm biên soạn với hỗ trợ AI,2026; không phải dữ liệu nghiên cứu.” Chủ dự án duyệt credit/quyền cuối riêng.
- Alt text (khớp ARTICLE và desc): Ba phần chọn khoảng nghỉ: tạm dừng một yêu cầu; chọn cách nghỉ khả thi; xem lại nhiệm vụ và hỗ trợ. Không cần chứng minh nghỉ giúp tăng năng suất.
- Mô tả dài bằng chữ (có ngay ngoài hình): Ba khối chứa câu hỏi tạm dừng gì, nghỉ thế nào và sau đó điều chỉnh hoặc nhờ ai. Không có thang điểm, bộ đếm hoặc mũi tên nhân quả. Xem lại sau nghỉ có thể dẫn đến nghỉ thêm hoặc giảm nhiệm vụ, không chỉ trở lại học.

## Kiểm kỹ thuật và xem render

Kiểm XML, không script/foreignObject/image/use/href/tài nguyên ngoài/event handler; chỉ hình học, chữ, title/desc. ViewBox rộng 320, cỡ chữ 16–22px tại320; PNG640 tăng tỷ lệ 2 lần. Bố cục xếp dọc, không dùng màu một mình: mỗi khối có nhãn riêng. Chữ #333e32 trên #dce3d2/#e9e2ee/#fffdf7; kiểm tỷ lệ tương phản bằng công thức WCAG trong validator, đều trên 4,5:1. Điều này không xác nhận toàn diện accessibility.

Render Inkscape320/640 và xem PNG trực tiếp trong lượt B01, không thấy chữ cắt, thiếu dấu hoặc thiếu khối. Bằng chứng lệnh/kết quả trong báo cáo lô; PNG chỉ ở work/không đưa vào website hoặc PR. XML và chuỗi alt/caption/mô tả được validator kiểm riêng. Không dùng đường nối gợi nhân quả hoặc hứa hiệu quả; mô tả chữ truyền đạt đủ nội dung khi không xem hình.

**PASS nội bộ về nội dung/kỹ thuật; quyền công bố và reader/assistive QA vẫn PENDING_EXTERNAL_REVIEW.** Chưa thử trên thiết bị thật/reader/screen reader; cần kiểm zoom, phông và độ đọc với học sinh trước công bố. Không xem vector sắc nét thay thử đọc. Nếu font hoặc ảnh không phù hợp, có thể dùng nguyên mô tả chữ và câu hỏi; không cần ảnh chân dung giả.
