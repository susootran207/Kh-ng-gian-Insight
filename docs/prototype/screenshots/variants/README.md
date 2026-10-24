# Giàn tử đằng — ba phương án chờ duyệt

Cả ba phương án sử dụng cùng trang chủ, viewport 1440×1000, cùng quote seed `.5`, cùng pha animation đóng băng tại 1000ms. Không sửa khung hero hoặc thay đổi thành phần nào khác.

| Phương án | Hướng thiết kế | Ảnh toàn khung |
| --- | --- | --- |
| A | Mật độ vừa, hai góc dày, giữa thưa nhẹ | [A — 1440px](hero-A-1440.png) |
| B | Mật độ vừa-dày, nhánh và hoa phân bố tự nhiên toàn cạnh trên | [B — 1440px](hero-B-1440.png) |
| C | Sum suê hơn ở hai góc, chùm dài ngắn đa dạng, giữa thoáng | [C — 1440px](hero-C-1440.png) |

[Bảng so sánh A/B/C cùng tỷ lệ](canopy-options-1440.png). Bảng chỉ cắt cùng vùng đầu của ba screenshot thật để dễ đối chiếu; các ảnh hero giữ toàn viewport.

Chạy prototype bằng `npm run dev`, rồi xem:

- `http://localhost:5173/?wisteria=A`
- `http://localhost:5173/?wisteria=B`
- `http://localhost:5173/?wisteria=C`

Không có tham số sẽ xem B theo ưu tiên của người dùng. Đây là mặc định tạm để phát triển, **chưa phải quyết định thiết kế**. A/C vẫn có đầy đủ dữ liệu, render và animation trong build; không biến thể nào bị xóa. Các URL chỉ chọn cấu hình trang trí của cùng trang chủ, không tạo routing hoặc tính năng Giai đoạn 2.

Người dùng chọn một phương án hoặc chỉ rõ phần cần kết hợp trước vòng triển khai tiếp theo.
