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
- `npm run test:e2e`: **16/16 bài kiểm thử đạt**, chạy trên bản production build bằng Chromium 154, Playwright 1.64.1.
- 320, 390, 768, 1440px: không tràn ngang; font tiếng Việt và ảnh local tải được; không có pageerror hoặc request bên ngoài.
- Axe WCAG 2 A/AA và 2.1 AA: không phát hiện vi phạm ở bốn viewport mặc định và một trạng thái nội dung mở rộng. Đây là quét tự động, không phải chứng nhận accessibility.
- Menu mobile: mở bằng bàn phím, Escape đóng và trả focus; liên kết đúng section; tải lại anchor không lỗi.
- Quote: mỗi lần đổi đều khác câu trước. Chuyên đề mở/đóng được. Cả bốn mốc timeline thay nội dung. Cả ba bản đọc mở đúng nội dung, nhận focus; đóng trả focus về nút gọi. Quyền riêng tư mở được.
- Mèo: click/Enter/Space đổi biểu cảm; chuột kéo và chặn ở ranh giới; bật chế độ di chuyển, dùng mũi tên và Escape; reset; thu nhỏ viewport vẫn nằm trong vùng cho phép.
- Cảm ứng: mô phỏng touch thực qua Chromium CDP, kéo mèo thay đổi vị trí; vuốt dọc bên ngoài mèo vẫn cuộn trang.
- Tâm tình: chuỗi thử nghiệm được xóa khỏi ô nhập và HTML sau thả; không xuất hiện trong URL; localStorage/sessionStorage rỗng; không có request mạng khi nhập/thả; pagehide xóa ô nhập; đèn không giữ văn bản và tối đa bốn đèn.
- Reduced motion của hệ điều hành và nút giảm chuyển động: giữ nội dung, dừng loop, vẫn có xác nhận thả đèn.
- Đã mở và xem cả tám ảnh chụp cuối cùng (hero và toàn trang ở bốn kích thước). Chụp bằng cách đóng băng vị trí animation đang hiển thị để giữ cả cánh hoa trong ảnh; không có nội dung bị ẩn khi tắt animation.

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


## Bổ sung hiệu ứng và Mây đồng hành — 24/10/2026

**Giữ nguyên thiết kế đã duyệt:** `prototype/src/styles/global.css`, khung vườn hero, `Wisteria.tsx`, tranh vườn và HTML gốc không thay đổi. Không thêm dependency; không triển khai Giai đoạn 2.

### Những gì được thêm

- Bề mặt kem/tím/sage bán trong suốt, blur giới hạn 4–10px trên các lớp phù hợp; có fallback màu đặc.
- Giàn hoa mép trên độc lập, hai bên có độ dài và nhịp khác nhau. Chỉ chiếm lề, giảm mật độ trên tablet/mobile; dừng khi ra khỏi màn hình.
- 20 phần tử cánh hoa cố định, tablet hiện 14 và mobile hiện 8. Có rơi, trôi và xoay bằng CSS; không tạo phần tử liên tục hoặc dùng canvas. Lớp trước chỉ ở lề, lớp sau nằm dưới chữ/nội dung. Dừng/ẩn theo giảm chuyển động, hoạt động nhập/bấm và vùng footer.
- Tái sử dụng CatArt cho Mây trong hero và Mây trang trí theo section. Giữ toàn bộ tương tác Mây trong hero. Mây trang trí chỉ xuất hiện trong hành lang trống đã kiểm tra va chạm; đi cùng vị trí section khi cuộn, có fade và khoảng nghỉ, không di chuyển tự do qua chữ.
- Hành vi trang trí: vẫy tay, nhìn quanh, chạy ngắn trong giới hạn, ló đầu qua vùng crop. Mobile nhỏ hơn, nghỉ lâu hơn, không chạy. Không phát thông báo screen reader, không lấy focus; nhường chỗ khi người dùng tương tác, mở bài hoặc khi hero xuất hiện.

### Kiểm thử bản bổ sung

- Production build thành công. **16/16 kiểm thử đạt:** giữ 10 kiểm thử cũ và thêm 6 nhóm về lớp hiệu ứng, giới hạn phần tử, vị trí an toàn/cooldown của Mây, mobile, reduced motion và bốn hành vi tự phát.
- Bốn kích thước 320/390/768/1440px vẫn không tràn ngang, tải font/ảnh local, không pageerror hoặc request bên ngoài. Axe A/AA vẫn không phát hiện vi phạm ở phạm vi đã kiểm tra.
- Mouse drag, touch drag mô phỏng và bàn phím trong hero vẫn đạt. Nhập/thả đèn vẫn xóa nội dung, không lưu hoặc gửi dữ liệu.
- Đã xem lại cả tám screenshot responsive và hai ảnh chụp lượt ghé thực tế của Mây trên desktop/mobile. Bộ kiểm thử thời gian sử dụng đồng hồ và giá trị ngẫu nhiên điều khiển được; bản ứng dụng không có hook/debug API để ép hành vi.
- Kiểm tra mã: toàn bộ nội dung và bố cục gốc được giữ. Mọi lớp trang trí mới đều không nhận pointer/focus. Cả hành lang chạy, không chỉ điểm đầu, được kiểm tra với nội dung thực.

### Mẫu đo hiệu năng

`performance.json` lưu kết quả đo khi hiệu ứng đang bật: 240 callback requestAnimationFrame trong hành trình cuộn toàn trang mỗi viewport, Chromium headless trên cloud, không throttle CPU.

| Viewport | Median / p95 khoảng frame | Khoảng lớn nhất | Long task >50ms | DOM đầu/cuối |
| --- | --- | --- | --- | --- |
| 1440px | 16,7 / 17,0ms | 31,5ms | 0 | 1131 / 1131 |
| 390px | 16,7 / 16,8ms | 34,9ms | 0 | 1131 / 1131 |

Số DOM không tăng khi cuộn. JavaScript gzip tăng từ khoảng 79,47kB lên 81,62kB; không có dependency mới. Đây là mẫu đo callback và main thread, không phải chứng nhận FPS render/GPU. Chưa thử thiết bị cấu hình thấp, điện thoại/tablet vật lý hoặc Safari/Firefox.

Ảnh bổ sung: [Mây trên desktop](screenshots/atmosphere-journey-1440.png), [Mây trên mobile](screenshots/atmosphere-journey-390.png).

**Chỉ cập nhật nhánh feat/homepage-garden-prototype và PR #2. Không merge, không deploy. Chờ người dùng duyệt.**
