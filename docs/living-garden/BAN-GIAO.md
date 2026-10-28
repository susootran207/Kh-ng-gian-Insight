> **Cập nhật tiếp theo trên PR #37:** xem [hoa chạm tay và scene 2.5D nhiều lớp](depth-v2/README.md) cùng [bằng chứng/kiểm thử mới](depth-v2/VALIDATION.md). Tài liệu và GIF của lần đầu bên dưới được giữ để đối chiếu; ZIP và checksum trỏ tới bản mới nhất.

# Bàn giao Living Garden

Bản nâng cấp để nghiệm thu trải nghiệm. Không tự merge hoặc deploy.

| Khu vực | Thao tác để kiểm tra |
|---|---|
| Trang chủ | Quan sát từng chùm tử đằng, nhóm cánh và lá chuyển động riêng. Nhấn **Gọi một làn gió** để giàn hoa lay nhanh hơn và 14 cánh rơi. Hoa cũng rơi rải khắp viewport, không nhận/chặn click. |
| Mây | Cuộn khỏi hero để Mây đi theo trong viewport. Kéo bằng chuột/ngón tay, thả để tìm chỗ ít che nội dung. Tap để vui/vẫy; Tab rồi dùng mũi tên để di chuyển, Home/Escape để về góc. Có các trạng thái đi, ngồi, nhìn quanh, nghỉ, chớp mắt, nghiêng đầu và được bế. Menu, hộp xem hình và ô nhập có ưu tiên. |
| Chuyên đề | Chạm ảnh hoặc nút trong ảnh; liên kết đọc là điều khiển riêng. Có 10 phản hồi theo chủ đề: lối sáng qua cổng, gợn nước, dải nối, sóng lắng nghe, hơi trà, dòng trên sổ, các điểm chú ý tan đi, cát chảy, mầm xanh và nhánh đường. Chuột làm nền và lớp trước dịch chuyển khác hướng. |
| Thư viện | Mỗi bài dùng scene theo chuyên đề; lớp sáng quét qua ảnh và các vật thể vector phản hồi. Chơi với ảnh không tự điều hướng khỏi trang. Mở bài bằng tiêu đề/phần đọc. |
| Dòng chảy | Chọn một trong bốn mốc trên đường cong để đến chặng tương ứng; mốc và đường nối đổi trạng thái. Mỗi chặng có scene và bộ lọc bài đúng giai đoạn. |
| Trang đọc | Scene bìa tương tác theo chủ đề, nút chuyển động ngay trên trang. Giữ nhịp chương, mục lục, tiến độ đọc, bảng và phóng lớn SVG học thuật; không rải hoa qua phần đọc. |
| Đèn | Thả đèn để xem đèn bay lên, lời viết xóa trước khi tạo hiệu ứng. Lời viết không nằm trong hạt hoa, đèn hay trạng thái Mây. |

## Xem bằng chứng

- [GIF desktop](evidence/desktop.gif) · [video desktop](evidence/desktop.mp4).
- [GIF mobile](evidence/mobile.gif) · [video mobile](evidence/mobile.mp4).
- [Scene gợn nước](evidence/scene-1.png) · [scene hơi trà](evidence/scene-4.png) · [scene mầm xanh](evidence/scene-8.png). Đủ 10 ảnh trạng thái trong thư mục `evidence`.
- [Kết quả và giới hạn kiểm thử](VALIDATION.md), kèm log và số đo thực.

Giữ đủ **29 bài, 29 SVG học thuật, 10 chuyên đề**. Build học thuật kiểm tra lại **107 record bảo vệ**. Không sửa nội dung học thuật hay ý nghĩa của hình gốc. Giữ ranh giới giữa build thông thường và Academic Showcase; không tự cấp trạng thái xuất bản.

Kiểm thử dùng Chromium headless, kích thước desktop/mobile và sự kiện chạm tổng hợp. Tap scene và kéo Mây bằng touch đã được thao tác trong trình duyệt. Native pan của Chromium môi trường này không hoạt động cả trên trang HTML tối giản; phần này được ghi riêng trong bằng chứng, không gọi là vuốt ngón tay đã đạt. **Chưa kiểm tra iPhone/Android thật hoặc Safari.** Kết quả tự động không thay thế nghiệm thu trực tiếp của bạn.

## ZIP và cập nhật deploy sau khi duyệt

1. Tải [Academic Showcase ZIP](artifacts/Academic-Showcase-Living-Garden.zip), đối chiếu [SHA256SUMS.txt](artifacts/SHA256SUMS.txt).
2. Giải nén và thử qua HTTP server cục bộ, ví dụ `python3 -m http.server 8080` trong thư mục đã giải nén; mở `http://localhost:8080`. Không mở bằng `file://`.
3. Nếu build lại: vào `prototype`, chạy `npm ci`, `npm run build:academic`, `npm run test:f0`, `npm run test:academic:browser`. Cần Chromium và ffmpeg helper cho phần video. Xem hướng dẫn môi trường trong VALIDATION.md.
4. Sau khi duyệt, cập nhật **nội dung** `dist-academic/` hoặc nội dung ZIP lên thư mục tĩnh hiện có. Không upload repository, dossier, source manifest, log kiểm thử hay source map.
5. Giữ bản deploy cũ để rollback; kiểm tra lại deep link, hoa, Mây, scene, cài đặt motion và đèn trên host thật.

`npm run build` là bản xuất bản thông thường, cố ý không hiển thị 29 bài chưa được cấp quyền công bố. Muốn đúng bản trưng bày này phải chọn `build:academic`.
