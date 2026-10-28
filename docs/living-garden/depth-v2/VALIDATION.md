# Kiểm thử và bằng chứng — hoa chạm tay / scene 2.5D

Đúng nhánh `living-garden-master-20261028`, tiếp tục PR #37. Không tạo PR khác, chưa merge hoặc deploy.

## Kết quả trên bản build cuối

- **22/22 browser tests qua**, không skip hoặc flaky, trong 4.4 phút. Gồm 16 ca hồi quy của PR #37 và 6 ca mới; log: [browser.log](evidence/browser.log).
- **22/22 F0 tests qua**; [log](evidence/f0.log).
- Build/typecheck bản thông thường và Academic Showcase, scanner và 2 academic contract tests qua. Giữ **29 bài, 29 SVG học thuật, 10 chuyên đề**, kiểm tra lại **107 record bảo vệ**. [Build học thuật](evidence/build-academic.log) · [build thông thường](evidence/build-standard.log).
- `git diff --check` qua. Đối chiếu với commit PR #37 trước đợt này (`e428256`) cho thấy không sửa `prototype/build`, `prototype/editorial`, publication records hoặc HTML gốc. SHA-256 HTML vẫn là `4f78efcea9aa8b57f0603261abc4af3a56efb35111646bb7a9fbd7e7c70a4928`.
- Pipeline cắt asset được chạy kiểm tra lại: **36 prop khớp SHA-256** trong provenance; không thêm dependency hoặc WebGL.

## Những gì đã thao tác và đo

**Hoa:** chuột quét từ trái sang phải ở 1440 px; ngón tay tổng hợp quét qua hero ở 390 px. Các vùng gần/xa có đáp ứng khác nhau; sau thả trở về nghỉ. Kiểm thử đọc **góc xoay render từ computed CSS/DOMMatrix**, không chỉ tin metadata spring. Hai bộ số đo: [desktop](evidence/flower-desktop-forces.json), [touch](evidence/flower-touch-forces.json). Có cả khớp cành, lá, hoa; phần đung đưa ambient vẫn nằm trên node con.

**Scene:** thực hiện pointer parallax, trigger và lắng lại ở 390/768/1440 px. Nước, trà và mầm đều có ít nhất ba vật thể được đo transform nội dung riêng trước/sau; nhiều hệ số parallax và kích thước phối cảnh được đối chiếu với `850 / (850 - depth)`. `matrixZ` thực tế là 0 vì renderer chiếu plane vào compositor 2D; dữ liệu ghi rõ authored depth và projected scale, không tuyên bố mô hình 3D. Kiểm tra network không thấy request tới tranh nền phẳng `illustrations/garden-01…10.webp`. Hero cũng được kiểm tra không còn `.botanical-art`, có hơn năm vật thể tách riêng.

**Hồi quy:** toàn bộ 29 bài được mở/reload ở 320/390/768/1024/1440 px; source node IDs, 25 bảng, 29 hình học thuật và link giữ nguyên. Mây hero/floating, mouse/touch drag, theo cuộn, bàn phím, menu, gọi gió, cánh rơi, 10 scene, Dòng chảy, Reader, đèn và privacy đều có ca kiểm thử. Reduced motion ngừng lực tay và motion vật thể nhưng giữ feedback chữ. Reader depth intensity là 0.32. Axe Reader 390/1440 không có vi phạm trong tập tag được chạy; không coi đây là chứng nhận toàn site.

## Bằng chứng trực quan

- **Hoa desktop:** [GIF](evidence/flowers-desktop.gif) · [video](evidence/flowers-desktop.mp4).
- **Hoa touch 390 px:** [GIF](evidence/flowers-mobile.gif) · [video](evidence/flowers-mobile.mp4).
- **Ba scene chuyển động độc lập:** [video nước → trà → mầm, gồm parallax, trigger và trở về nghỉ](evidence/scenes-1440.mp4).
- [Nước](evidence/scene-1-1440-active.png) · [trà](evidence/scene-4-1440-active.png) · [mầm](evidence/scene-8-1440-active.png). Có ảnh tương ứng ở 390 và 768 px trong thư mục evidence.
- [Trước/sau scene nước](evidence/before-after-water.png): trái là lần đầu PR #37, phải là renderer mới. Đây là đối chiếu ảnh tĩnh; video mới là bằng chứng motion.
- [Hero desktop](evidence/hero-layered.png) · [hero mobile](evidence/hero-layered-mobile.png). Đủ 10 ảnh scene mới được giữ trong evidence.

## Tải và frame pacing

Mẫu local Chromium headless, không throttle CPU/network; không phải Lighthouse hoặc thiết bị thật. Trang chủ: DOMContentLoaded 298 ms, CLS 0.00018, encoded resources 4.05 MB trong máy chủ kiểm thử. [Raw](evidence/garden-performance.json).

Các mẫu dưới đây là 60 khung khi scene active và **đang ghi video**; ms/khung, không phải cam kết FPS trên thiết bị thật:

| Rộng px | Scene | Trung vị ms | P95 ms |
|---|---|---:|---:|
| 390 | Nước | 16.7 | 16.8 |
| 390 | Trà | 16.7 | 16.7 |
| 390 | Mầm | 16.7 | 16.7 |
| 768 | Nước | 16.7 | 33.3 |
| 768 | Trà | 16.7 | 16.7 |
| 768 | Mầm | 16.7 | 33.3 |
| 1440 | Nước | 33.3 | 33.4 |
| 1440 | Trà | 33.4 | 66.6 |
| 1440 | Mầm | 33.3 | 50.0 |

Đối chứng không ghi video ở 1440 px: trung vị nước/trà/mầm lần lượt **16.7 / 16.7 / 16.7 ms**, P95 **33.4 / 33.4 / 33.4 ms** trên 90 khung/scene. [Raw](evidence/performance-no-recorder-1440.json). Lỗi cắt lá do plane lồng nhau đã được loại bằng compositor phẳng với phép chiếu phối cảnh; vẫn giữ vật thể và tương tác tách lớp.

Log build giữ cảnh báo chunk lớn. Asset mới đóng gói inline để giữ guard một code chunk/allowlist tĩnh hiện có; không tuyên bố tải asset qua mạng theo viewport. Đây là đánh đổi kích thước bundle được ghi rõ, không nới hoặc sửa guard.

## Giới hạn và gói nghiệm thu

Touch là sự kiện native tổng hợp qua Chromium CDP; chưa kiểm tra iPhone/Android thật hoặc Safari. Native pan của Chromium máy này không hoạt động cả trên trang HTML đối chứng, được ghi riêng trong [native-pan-limit.json](evidence/native-pan-limit.json); không gọi phần đó là đã đạt. Quét hoa ngang và kéo Mây bằng touch được đo riêng, có video, không dùng JS cuộn giả trong sản phẩm.

Nghiệm thu trực tiếp vẫn do người dùng quyết định. [ZIP Academic Showcase mới](../artifacts/Academic-Showcase-Living-Garden.zip) · [checksum](../artifacts/SHA256SUMS.txt). SHA-256:

```text
47a2f4c52c7a11a79a3fcfff0d2957b119c337a30140ec1f67af2cb880b69393
```

ZIP đã được đối chiếu byte với toàn bộ file trong `dist-academic`. Chạy qua HTTP server tĩnh để thử, không dùng file://. Hướng dẫn cập nhật deploy sau khi duyệt nằm trong [bàn giao](../BAN-GIAO.md); không thực hiện merge/deploy trong tác vụ này.
