# Interactive Editorial Garden

Một đợt nâng cấp trên main sau PR #35 (`ca5bac5`), không đổi nguồn học thuật hoặc cơ chế xuất bản. Hai chỉ thị Interactive Garden và phần bổ sung được tích hợp trong cùng thay đổi.

## Hướng thiết kế

Giữ kem ngà, tím tử đằng, sage, nâu sáng; Cormorant Garamond cho tiêu đề và Be Vietnam Pro cho phần đọc. Trang chủ mở ra khu vườn; từ Chuyên đề trở xuống là nhịp biên tập có mảng lớn/nhỏ, khoảng nghỉ và hành trình đọc. Reader dùng cột 68ch, chương có đường phân cách, ảnh mở bài, mục lục theo đoạn và toàn bộ nội dung hiển thị mặc định. Không tự thêm pull quote, định nghĩa hay lời khuyên vào bài.

- Focal motion: bông hoa đổi lời nhắn và hành trình đèn bay sau thao tác chủ động.
- Khám phá: `DepthSurface` dùng transform/opacity, một lần cập nhật mỗi animation frame khi có pointer chuột. Góc nghiêng tối đa khoảng 3°, parallax ảnh ±4.5px và lá đi ngược chiều. Trở về bằng easing có độ nảy rất nhỏ. Không tilt văn bản, bảng hoặc form.
- Đọc: tiến trình mảnh, mục lục sticky và đánh dấu đoạn đang xem; mobile mở/đóng mục lục, các chương luôn hiện đầy đủ. Không có Mây/hoa rơi trên Reader.
- Mây: cùng tạo hình cũ, đi thành chặng ngắn rồi nghỉ; phản hồi wave/look/happy/stretch, kéo cảm ứng và di chuyển bàn phím. Companion chỉ hiện sau hero, ở điểm trống đã đối chiếu hình chữ nhật của nội dung/control; ẩn khi cuộn và chọn lại dock sau khi dừng, không bám từng pixel cuộn. Mobile thu nhỏ, có thể ẩn khi không có chỗ an toàn.
- Tử đằng: giữ bố cục B và ảnh cũ, bổ sung chuyển động độc lập cho lá và lớp cánh SVG; hạt thưa ở mép trang, giảm trên mobile. Không tạo particle mỗi frame.
- Đèn: metadata chỉ chứa id/vị trí/thời lượng; lời viết xóa trước animation. Chặng bay 7–9 giây theo gió, hạ sáng/thu nhỏ, tối đa bốn đèn và tự hủy sau 9.5 giây. Reduced-motion giữ phản hồi tĩnh.
- `GardenMotion`: lựa chọn trong bộ nhớ, dùng chung qua route, tôn trọng OS và tab ẩn. Không localStorage/cookie/analytics/âm thanh.

## Minh họa và quyền

10 biến thể editorial được tạo mới bằng image generation trong tác vụ: cổng vườn/khởi đầu; đá trong nước/cảm xúc; hai chậu cây/ranh giới; ghế/lắng nghe; trà–gối–trăng/nghỉ; sổ–lá/việc học; điện thoại/sự chú ý; sổ–đồng hồ/chuẩn bị; chậu được sửa/đi tiếp; đường rẽ/tương lai. Không chữ, không người, không ảnh stock. Cùng ánh sáng sáng sớm, bề mặt gouache matte, nền ngà và chi tiết tử đằng. Tách atlas thành 10 WebP, tổng 289,650 byte, lazy-load ngoài màn hình. Ảnh hero bài đọc chọn theo chuyên đề; không dùng một hình cho cả 29 bài. 29 sơ đồ SVG học thuật giữ nguyên byte, caption, nguồn và chức năng mở lớn.

Prompt tổng quát: editorial gouache botanical still life, ivory/sage/wisteria/soft gold, morning light from upper left, sparse composition, matte texture, no text/no people/no logos; ten independent meaningful scenes. Nguồn gốc này không phải chứng nhận quyền độc quyền hoặc chuyên môn. Allowlist showcase chỉ bổ sung hash của 10 tài sản mới, không thay quyền tài sản hay record F0 cũ.

## Tham khảo ThreeUI

Đã đọc [Community README](https://github.com/MengTo/threeui/blob/main/README.md) và [Asset Licenses](https://github.com/MengTo/threeui/blob/main/ASSET-LICENSES.md). Community cung cấp React, component subpath và giấy phép MIT cho mã/tài sản Community; preview bên ngoài không tự thuộc giấy phép đó. URL `/docs` không truy cập được trong công cụ; sử dụng README/package guidance chính thức. Không sao chép mã hoặc ảnh ThreeUI, không thêm dependency/runtime/CDN/WebGL. Tilt, pointer highlight, parallax và reveal được viết bằng React/CSS trong dự án.

## Kiểm tra và bàn giao

`npm run build:academic` và `npm run test:academic:browser` kiểm artifact `dist-academic/`, không dùng P2/W2/dev preview. Giữ `npm run build` và scanner tiêu chuẩn fail closed theo F0. Các kiểm thử nội dung so hash và AST/DOM bảo toàn 29 bài/29 SVG, 25 bảng và 10 chuyên đề. Browser suite gồm 320/390/768/1024/1440px, hiệu ứng thực qua computed transform, pointer, synthesized touch và bàn phím; không coi là kiểm thiết bị thật/Safari/screen reader.

Không có Lighthouse cài sẵn. Browser ghi Navigation Timing, tổng resource, CLS và mẫu requestAnimationFrame vào `test-results-academic/garden-performance.json`. Đây là số đo localhost/headless không throttle, không phải điểm Lighthouse hoặc cam kết FPS trên thiết bị thật.

Tạo ZIP từ nội dung `dist-academic/`, `index.html` ở gốc; không đưa source, dossier, record, test, manifest hoặc sourcemap vào ZIP. Cập nhật Cloudflare Pages hiện tại bằng **Create new deployment → Direct Upload** ZIP mới; không cần đổi repository, DNS hoặc token trong chat. Không tự merge/deploy.
