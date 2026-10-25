# C01 — Hình nháp V1, bản sửa r2

- Asset: [experience-map.svg](experience-map.svg), chỉ trong thư mục bản nháp, không public/catalogue.
- Mục đích: phân biệt bốn vùng ở ví dụ An và nhắc vai trò bối cảnh. Không chuỗi nhân quả.
- Bố cục: nền kem, mực xanh, một vùng tím nhạt và sage, dùng token màu đã duyệt. Bốn vùng xếp dọc để giữ chữ đọc được khi xem hẹp; mỗi vùng nối riêng không có đầu mũi tên với cùng bối cảnh, không đánh số.
- Căn cứ: Scherer (2005), pp.697–699; tên vùng/diễn giải dành bài tập không tái tạo nguyên mô hình năm thành phần.
- Nguồn hình: tự biên soạn SVG bằng hình học và chữ, không lấy hình có sẵn, không ảnh AI, không chân dung, không chép Table 1.
- Người tạo: trợ lý biên soạn trong tác vụ C01. Không đưa ra bảo đảm quyền độc quyền hoặc tự quyết giấy phép thương mại thay chủ dự án.
- Thành phần bên ngoài: không ảnh/icon/phông nhúng; dùng tên font hệ thống và fallback. Việc phân phối font không diễn ra trong asset.
- Giấy phép: chưa gán giấy phép công bố cho asset; người dùng quyết định trước tái sử dụng/xuất bản. Không có giấy phép ảnh bên thứ ba cần giả lập.
- Caption: “Sơ đồ diễn giải do dự án biên soạn cho bài học; tham khảo Scherer (2005). Không tái tạo mô hình gốc hoặc dùng để chẩn đoán.”
- Alt: “Tình huống An liên hệ với bốn vùng: cảm xúc An tự nói, suy nghĩ, tín hiệu cơ thể và hành vi. Các đường nét đứt nối mỗi vùng với bối cảnh, không biểu thị trình tự hoặc quan hệ nhân quả.”
- Mô tả bằng chữ tương đương nằm ngay dưới hình trong ARTICLE, cùng bảng dữ kiện ngay trước đó. SVG có title/desc để hỗ trợ mở riêng; khi dùng img, alt của bài là đường mô tả chính.
- Thay đổi so với 3.2A: bỏ ẩn ý rằng mọi đường nối giữa bốn vùng là quan hệ có cơ chế chứng minh; chỉ nối vùng với bối cảnh, chú thích rõ.
- Kiểm tra r2: XML/title/desc hợp lệ, không script/foreignObject/image/href ngoài hoặc marker; render Inkscape 320/640px và xem cả hai không thấy cắt chữ. Tỷ lệ chữ–nền đo từ mã màu: 8,51–11,01:1; đường/border mẫu đo 4,50–6,29:1, không phải chứng nhận accessibility toàn website.
- Chưa tích hợp responsive vào reader hoặc kiểm screen reader thực tế. Khi sản xuất cuối ưu tiên SVG/HTML có chữ đủ lớn và mô tả dài; nếu không phù hợp, giữ bảng chữ thay thế.

## Thay đổi r2
Bỏ marker và toàn bộ đầu mũi tên để giảm hiểu nhầm quan hệ nhân quả hai chiều; giữ bốn đường nét đứt riêng với bối cảnh và bảng bốn vùng. Footer đổi thành “Đường nối không biểu thị nhân quả.” Alt/mô tả ARTICLE và desc SVG khớp bố cục xếp dọc. Giữ palette, font hệ thống, dữ kiện An và hình học nền.
