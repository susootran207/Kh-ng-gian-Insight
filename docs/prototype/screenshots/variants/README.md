# Giàn tử đằng — ảnh lịch sử; B đã được duyệt

Cả ba phương án sử dụng cùng trang chủ, viewport 1440×1000, cùng quote seed `.5`, cùng pha animation đóng băng tại 1000ms. Không sửa khung hero hoặc thay đổi thành phần nào khác.

| Phương án | Hướng thiết kế | Ảnh toàn khung |
| --- | --- | --- |
| A | Mật độ vừa, hai góc dày, giữa thưa nhẹ | [A — 1440px](hero-A-1440.png) |
| B | Mật độ vừa-dày, nhánh và hoa phân bố tự nhiên toàn cạnh trên | [B — 1440px](hero-B-1440.png) |
| C | Sum suê hơn ở hai góc, chùm dài ngắn đa dạng, giữa thoáng | [C — 1440px](hero-C-1440.png) |

[Bảng so sánh A/B/C cùng tỷ lệ](canopy-options-1440.png). Bảng chỉ cắt cùng vùng đầu của ba screenshot thật để dễ đối chiếu; các ảnh hero giữ toàn viewport.

## Quyết định chính thức

Ngày 24/10/2026, người dùng chính thức chọn B và duyệt Giai đoạn 1. A/C và cơ chế chọn biến thể đã được loại khỏi giao diện chạy; các ảnh ở đây chỉ giữ để đối chiếu lịch sử. Không dùng các URL preview cũ để chọn A/C nữa: mọi URL đều hiển thị B.

Thiết kế chính thức là ảnh [B — 1440px](hero-B-1440.png), được giữ nguyên thông số trong `prototype/src/components/wisteriaDesign.ts`. Không merge tự động, deploy hoặc triển khai Giai đoạn 2.
