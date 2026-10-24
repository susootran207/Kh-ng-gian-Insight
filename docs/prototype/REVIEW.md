# Giai đoạn 1 — Bản bàn giao prototype trang chủ

Ngày kiểm tra: 24/10/2026. Phạm vi: chỉ Giai đoạn 1. Dự án mới tại `prototype/`.

## Kết quả

Trang chủ Poetic Interactive Garden × Editorial Design gồm header responsive, giàn tử đằng chuyển động nhiều lớp, mèo Mây có bốn biểu cảm, quote ngẫu nhiên, chuyên đề mẫu, giới thiệu, timeline bốn mốc, ba đoạn đọc bản nháp, thả đèn và footer quyền riêng tư.

HTML gốc không thay đổi. SHA-256:
`4f78efcea9aa8b57f0603261abc4af3a56efb35111646bb7a9fbd7e7c70a4928`.

Font Cormorant Garamond và Be Vietnam Pro có subset tiếng Việt, được đóng gói cục bộ với bản quyền SIL OFL 1.1. Hình vườn được tạo riêng bằng công cụ tạo ảnh; không dùng ảnh giả làm bằng chứng về trường học hoặc đội ngũ. Xem `ARTWORK.md` và `prototype/THIRD_PARTY_NOTICES.md`.

## Đã kiểm thử

- `npm install`: thành công; dependency được khóa trong package-lock.json.
- `npm run build`: TypeScript strict và Vite production build thành công.
- `npm run test:e2e`: **10/10 bài kiểm thử đạt**, chạy trên bản production build bằng Chromium 154, Playwright 1.64.1.
- 320, 390, 768, 1440px: không tràn ngang; font tiếng Việt và ảnh local tải được; không có pageerror hoặc request bên ngoài.
- Axe WCAG 2 A/AA và 2.1 AA: không phát hiện vi phạm ở bốn viewport mặc định và một trạng thái nội dung mở rộng. Đây là quét tự động, không phải chứng nhận accessibility.
- Menu mobile: mở bằng bàn phím, Escape đóng và trả focus; liên kết đúng section; tải lại anchor không lỗi.
- Quote: mỗi lần đổi đều khác câu trước. Chuyên đề mở/đóng được. Cả bốn mốc timeline thay nội dung. Cả ba bản đọc mở đúng nội dung, nhận focus; đóng trả focus về nút gọi. Quyền riêng tư mở được.
- Mèo: click/Enter/Space đổi biểu cảm; chuột kéo và chặn ở ranh giới; bật chế độ di chuyển, dùng mũi tên và Escape; reset; thu nhỏ viewport vẫn nằm trong vùng cho phép.
- Cảm ứng: mô phỏng touch thực qua Chromium CDP, kéo mèo thay đổi vị trí; vuốt dọc bên ngoài mèo vẫn cuộn trang.
- Tâm tình: chuỗi thử nghiệm được xóa khỏi ô nhập và HTML sau thả; không xuất hiện trong URL; localStorage/sessionStorage rỗng; không có request mạng khi nhập/thả; pagehide xóa ô nhập; đèn không giữ văn bản và tối đa bốn đèn.
- Reduced motion của hệ điều hành và nút giảm chuyển động: giữ nội dung, dừng loop, vẫn có xác nhận thả đèn.
- Đã mở và xem cả tám ảnh chụp cuối cùng (hero và toàn trang ở bốn kích thước). Chụp với ambient motion tạm dừng để hình ảnh rõ; không có nội dung bị ẩn khi tắt animation.

## Đánh giá hình ảnh sau khi xem render

- Điểm nhấn riêng: giàn tử đằng lớn trong khung vườn, mascot độc lập; khoảng đọc có hệ chữ và nền nhất quán.
- Các phần có cấu trúc khác nhau: spread chuyên đề, phần giới thiệu, timeline và hàng bài viết lệch nhịp. Mobile chuyển thành bố cục một cột và bài viết ảnh/chữ ngang.
- Đã điều chỉnh cỡ chữ phần đọc sau lần chụp đầu, bỏ chi tiết mặt trời trang trí thừa và làm rõ điều khiển mèo bằng SVG.
- Giới hạn thị giác còn lại: lớp hoa động là vector phẳng trên nền tranh gouache, có chủ ý tách lớp nhưng chưa phải mô phỏng vật lý. Cần người dùng duyệt cảm giác và nhịp trước khi phát triển tiếp.

## Chưa kiểm thử / chưa thực hiện

- Chưa thử iPhone, Android hoặc tablet vật lý; touch là mô phỏng Chromium, không phải Safari.
- Chưa thử Firefox, WebKit/Safari hoặc trình đọc màn hình thực tế; chưa đo hiệu năng trên thiết bị cấu hình thấp.
- Chưa chạy các script/engine/detector/hook của UI Skills. Đã áp dụng tài liệu đọc trực tiếp; chi tiết và ngoại lệ theo brief trong DESIGN.md. Không tuyên bố vượt qua gate tự động của skill.
- Các nội dung đọc chỉ là mẫu bố cục, chưa kiểm chứng nguồn và chưa được chuyên gia duyệt. Chưa có 24 bài đầy đủ, công cụ duyệt/xuất bản, thư viện hay HashRouter của Giai đoạn 2.
- Không backend, không tài khoản, không gửi/lưu nội dung tâm tình. Không cài workflow deploy, không triển khai GitHub Pages, không merge PR.

## Xem bản chạy

```sh
cd prototype
npm install
npm run dev
```

Hoặc `npm run build` rồi `npm run preview`. Kiểm thử: `npm run test:e2e` (Chromium theo hướng dẫn trong README).

## Ảnh để duyệt

- [Desktop 1440 — toàn trang](screenshots/homepage-1440.png)
- [Tablet 768 — toàn trang](screenshots/homepage-768.png)
- [Mobile 390 — toàn trang](screenshots/homepage-390.png)
- [Mobile 320 — toàn trang](screenshots/homepage-320.png)
- Ảnh riêng phần đầu trang: `screenshots/hero-{320,390,768,1440}.png`.

Chờ duyệt chất lượng trang chủ trước khi thực hiện bất kỳ phần nào của Giai đoạn 2.
