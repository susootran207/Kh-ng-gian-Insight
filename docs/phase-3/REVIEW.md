# Bàn giao đợt 3.1 — 25/10/2026

## Căn cứ và phạm vi
Main được kiểm tra trực tiếp qua GitHub: 0c1f4399c0f995fe7d4395186f767918beb5289f, merge PR #3.
Git trong môi trường còn ở 842ac12; git ls-remote thất bại vì không kết nối được proxy:8080.
Dùng GitHub connector đọc main, tạo commit kế thừa đúng tree main trên nhánh riêng và mở PR; không checkout/ghi đè bản làm việc cũ.
Đã đọc PRODUCT.md, DESIGN.md, AGENTS.md, REVIEW của GĐ1/GĐ2, toàn bộ cây thư mục và schema/build/catalogue/router/guard liên quan.
Kế hoạch GĐ3 trước đó nằm trong hội thoại, chưa có file trên main; bộ tài liệu này lưu lại quyết định B và 9 đợt.
Không sửa UI, không áp dụng/chạy engine UI Skills, không cài dependency.

## Tệp bàn giao
- PRODUCT.md: ghi nhận GĐ2 đã duyệt và chỉ cho phép 3.1.
- docs/phase-3/PLAN.md: 9 đợt và tiêu chí, điều chỉnh B đủ 29.
- docs/phase-3/MATRIX.md và matrix.json: bản đọc nhanh và hồ sơ đủ 29 đề cương, 9 chuyên đề.
- docs/phase-3/STANDARDS.md: học thuật/APA 7, Bloom, hình, công cụ, vòng duyệt.
- docs/phase-3/TEMPLATES.md: bài hoàn chỉnh và các hồ sơ nguồn/khái niệm/nhận định/alignment/hình/duyệt/công cụ.
- docs/phase-3/ARCHITECTURE.md: cấu trúc hiện có, tái sử dụng và đề xuất cần duyệt.
- docs/phase-3/validate.py: kiểm tra offline dữ liệu kế hoạch; không nối vào build.

## Thay đổi kỹ thuật
Không thay đổi runtime/schema/catalogue/package/guard: mảng và quan hệ bài–chuyên đề hiện có đã đáp ứng việc mở rộng.
Chỉ thêm dữ liệu kế hoạch và kiểm tra offline trong docs. Không có nội dung bài nguyên văn, URL nguồn, giấy phép hay hồ sơ chuyên gia giả.
Mọi đề tài draft/outline_only; sourceVerification not_started; quyền hình pending; các phê duyệt null.
Metadata này chỉ phục vụ quy trình kế hoạch; runtime chưa cưỡng chế hồ sơ học thuật/hình/Bloom, cần đề xuất và duyệt trước sửa ở đợt sau.

## Kiểm tra thực tế
Chạy python3 docs/phase-3/validate.py trong bản tài liệu ở work/phase-3-1.
Lượt đầu phát hiện liên kết REVIEW.md chưa có khi đang soạn; đã bổ sung báo cáo và chạy lại.
Kết quả cuối được ghi sau khi chạy lại: PASS baseline 24+5; 29 hồ sơ; 9 chuyên đề; ID/slug/quan hệ/trạng thái; 4 trường hợp lỗi bị từ chối; thêm đề tài thứ 30 hợp lệ; liên kết tài liệu nội bộ.
Chưa chạy build, Playwright, production, Axe, trình duyệt hoặc kiểm thiết bị: không thay mã ứng dụng và bản local cũ không phải main GĐ2. Không lấy kết quả GĐ2 làm kết quả mới.
Chưa kiểm nguồn học thuật bên ngoài hoặc cấp quyền ảnh: đây là hướng tìm nguồn và kế hoạch hình, không phải hồ sơ đã xác minh.

## Bảo toàn GĐ1–2
PR chỉ PRODUCT.md và docs/phase-3/*; phải đối chiếu tree với base để xác nhận prototype/ và HTML gốc giữ cùng blob/tree SHA.
Các tài liệu REVIEW lịch sử giữ nguyên. B vẫn là thiết kế chính thức; không đổi Mây, tương tác, palette/font, hiệu ứng, reflection/privacy, library/reader/routes hay publication gate.
Không tuyên bố đã chạy lại kiểm thử hành vi chỉ từ việc các tệp không thay đổi.

## Cần người dùng duyệt tiếp
- Bản đồ, tiêu đề dự kiến, đối tượng và phạm vi từng bài; 9 chuyên đề/lịch giới thiệu.
- Bộ mẫu 3.2: C01, C05, C17, E05; mục tiêu, hoạt động và độ khó.
- Sau nghiên cứu: thuật ngữ/nguồn, hình và quyền sử dụng; từng bản thảo.
- Người và phạm vi rà soát chuyên môn thực tế; duyệt biên tập và quyền xuất bản đúng revision.
- Phương án runtime để hiển thị citation/figure/credit và kiểm hồ sơ, trước khi sửa schema/UI/guard.

## Đề xuất 3.2 — chưa thực hiện
Nghiên cứu bốn mẫu C01,C05,C17,E05; lập phiếu nguồn/khái niệm và claim map; viết bản nháp;
thiết kế hình hợp pháp, alt/caption; hoàn thiện alignment và phản hồi; rà soát từng bài rồi trình duyệt.
Không triển khai 3.2, không tạo test tâm lý, không publish/deploy/merge. Dừng sau PR 3.1.
