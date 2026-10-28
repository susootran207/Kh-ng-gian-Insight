# PR #37 — hoa chạm tay và scene 2.5D

Tiếp tục trên chính nhánh `living-garden-master-20261028`, không tạo nhánh/PR mới. Đây là phần thay thế renderer minh họa của lần bàn giao đầu, giữ các chức năng đã có. Chưa merge hoặc deploy.

## Hoa phản ứng trực tiếp

Mỗi cụm hoa, nhóm lá và đoạn cành trong hero có khớp nhận lực riêng, tách khỏi phần tự đung đưa bên trong. Giàn hoa phía trên và nhánh hoa trong các scene cũng dùng khớp phản ứng. Vị trí tay và vận tốc quét tạo lực có falloff theo khoảng cách; các vùng xa không nhận cùng lực với vùng gần. Spring giảm chấn đưa khớp về nghỉ sau khi quét/thả. Không thêm thư viện vật lý.

Chuột dùng PointerEvent. Cảm ứng dùng TouchEvent thụ động vì trình duyệt có thể gửi pointercancel khi nhận gesture nhưng vẫn tiếp tục touchmove. Không dùng preventDefault, giữ pan dọc và pinch zoom, ngăn history overscroll ngang của trang. Reduced motion tháo các listener tác động và đưa khớp về tĩnh. Các vùng mask bảo vệ chữ/menu/CTA của giàn trên vẫn được giữ.

## Thay bản chất scene

Renderer mới **không dùng ảnh WebP phẳng garden-01…10 làm nền chính**. Scene được lắp từ 36 asset vật thể có alpha thật, được tạo riêng cho dự án và cắt khỏi ba atlas nội bộ. Nền vật liệu/sàn là CSS; các cảnh ngoài trời có lớp đồi xa riêng. Vật thể nằm ở background, midground, subject, foreground với độ sâu riêng, phép chiếu phối cảnh `scale = 850 / (850 - depth)` và hệ số parallax khác nhau. Không dùng WebGL hay dependency mới.

- **Nước:** bát riêng, ba viên đá riêng, nhánh olive, lá nổi và cánh rơi riêng; mặt nước/gợn là lớp bổ trợ, không chứa bát/đá trong một tranh nền.
- **Trà:** tách, đĩa, gối vải, trăng, nhánh hoa và lá riêng. Nhấn để tách nâng/nghiêng, đĩa dịch, gối nén, trăng đổi góc; hơi nước có nhịp riêng.
- **Mầm:** giấy nền, chậu sửa, mầm, lá non và lá phía trước riêng; mầm lớn từ chân, lá non xoay mở, chậu đổi góc.
- **Kết nối:** hai chậu hoa và dải nối tách riêng, tương tác theo hai phía.
- **Lựa chọn:** đồi, lối cong, ba bậc đá, bảng hướng, lá và cụm hoa ở những độ sâu riêng.
- Năm scene còn lại dùng cổng, ghế, sổ, bút, điện thoại, sách và đồng hồ cát riêng, vẫn giữ nút/ngữ nghĩa tương tác của PR #37.

Có trạng thái nghỉ, tương tác và lắng lại; các transform vật thể nội dung độc lập với transform parallax của lớp. Reader dùng cường độ depth 0.32 và nhịp ambient chậm hơn, không thêm hoa rơi qua nội dung bài. Mây, gọi gió, hoa rơi, Dòng chảy, Reader và đèn được kiểm tra hồi quy.

## Asset và đóng gói

- Công cụ tạo asset: OpenAI image_gen, ngày 28/10/2026. Hướng tạo: hand-painted botanical editorial gouache; 12 vật thể tách biệt/atlas 4×3; alpha trong suốt; sage/violet/wood; không chữ/nhãn/thương hiệu; góc nhìn ba phần tư và ánh sáng trên trái nhất quán.
- Ba atlas gốc nằm trong `source-atlases/`; 36 crop và SHA-256 nằm trong `asset-provenance.json`. Không lấy preview asset từ website/thư viện bên thứ ba. Đây là minh họa nội bộ, không phải hình học thuật hoặc ảnh tư liệu.
- Có thể tái tạo prop bằng `python3 prototype/scripts/slice-scene-atlases.py` từ gốc repository; cần ImageMagick.
- Publication guard và manifest **không đổi**. Guard yêu cầu một code chunk duy nhất và allowlist tĩnh cố định, nên prop được đóng gói inline trong bundle. Chỉ gắn/giải mã ảnh theo viewport, không tuyên bố tải asset qua mạng theo từng scene. Bundle tăng do dữ liệu ảnh; số đo tải/khung hình và cảnh báo chunk được giữ trong log.

Gọi đúng kỹ thuật là **2.5D / pseudo-3D bằng vật thể alpha, phép chiếu phối cảnh và CSS parallax**, không phải mô hình 3D hoàn chỉnh.

## Nghiệm thu và bằng chứng

Xem `VALIDATION.md` và thư mục `evidence/` của đợt này. GIF/video hoa desktop/mobile ghi thao tác quét thực trong Chromium; video scene ghi pointer parallax và trigger trên nhiều vật thể. JSON ghi transform, độ sâu, lực gần/xa và hồi về nghỉ. Ảnh tĩnh chỉ bổ trợ video, không thay thế kiểm tra chuyển động.

Giới hạn cần ghi nhận: môi trường Chromium headless và touch tổng hợp; chưa nghiệm thu trên máy iPhone/Android thật hoặc Safari. Hành vi cuộn native vẫn có giới hạn môi trường được ghi trong báo cáo cũ. Không tuyên bố đã kiểm tra phần cứng hoặc đạt chứng nhận accessibility toàn site.

Renderer chiếu các plane vào compositor 2D thay cho sắp giao cắt các plane 3D lồng nhau. Đây vẫn là scene 2.5D từ vật thể tách lớp; phép chiếu được ghi trong dữ liệu kiểm thử, không giả ghi matrixZ khác 0. Cách ghép này loại lỗi cắt lá và giảm chi phí render trong Chromium headless.

Hero trang chủ cũng được thay nền phẳng bằng cùng bộ lớp cổng/đồi/cây/tiền cảnh. Vẫn giữ Mây và vùng kéo, giàn tử đằng SVG, nút gọi gió; thao tác gọi gió còn mở nhẹ cổng và đổi ánh sáng cảnh. Không chỉ nâng các card rồi giữ một tranh phẳng làm cảnh chính của homepage.
