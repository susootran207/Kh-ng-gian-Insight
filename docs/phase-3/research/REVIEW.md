# Bàn giao 3.2A — nghiên cứu và thiết kế, 25/10/2026

## Căn cứ và ranh giới
PR #4 đã merge; main được đọc trực tiếp qua GitHub tại 0c223808fab2d53e7e099ab80be1180e384f437a.
Đã đọc PRODUCT.md/DESIGN.md/AGENTS.md và toàn bộ docs/phase-3/ hiện có, gồm validator; đối chiếu C01,C05,C17,E05 và slug trong matrix.
Quyết định Phương án B/29 đề tài giữ nguyên. Tài liệu 3.1 là lịch sử, không sửa để tự cho phép 3.2B.
Ủy quyền mới chỉ 3.2A; chỉ thêm tài liệu docs/phase-3/research/, không chỉnh PRODUCT, catalogue, runtime, schema, router, guard, HTML hay thiết kế.
Dùng GitHub connector đọc và tạo nhánh từ đúng main, không dùng bản checkout GĐ1 còn cũ trong môi trường.

## Liên kết bàn giao
- [C01](C01/OUTLINE.md): [nguồn](C01/SOURCES.md), [khái niệm](C01/CONCEPTS.md), [nhận định](C01/CLAIMS.md), [Bloom](C01/BLOOM.md), [hình](C01/VISUALS.md), [vấn đề mở](C01/OPEN-QUESTIONS.md).
- [C05](C05/OUTLINE.md): [nguồn](C05/SOURCES.md), [khái niệm](C05/CONCEPTS.md), [nhận định](C05/CLAIMS.md), [Bloom](C05/BLOOM.md), [hình](C05/VISUALS.md), [vấn đề mở](C05/OPEN-QUESTIONS.md).
- [C17](C17/OUTLINE.md): [nguồn](C17/SOURCES.md), [khái niệm](C17/CONCEPTS.md), [nhận định](C17/CLAIMS.md), [Bloom](C17/BLOOM.md), [hình](C17/VISUALS.md), [vấn đề mở](C17/OPEN-QUESTIONS.md).
- [E05](E05/OUTLINE.md): [nguồn](E05/SOURCES.md), [khái niệm](E05/CONCEPTS.md), [nhận định](E05/CLAIMS.md), [Bloom](E05/BLOOM.md), [hình](E05/VISUALS.md), [vấn đề mở](E05/OPEN-QUESTIONS.md).
- [So sánh](COMPARISON.md); [phương pháp/nhật ký](METHOD.md); [sổ nguồn](sources.json); [kiểm tra hồ sơ](validate.py).

## Số nguồn thực tế
Nguồn “đã tìm” ở đây là tài liệu được chọn vào hồ sơ; không tổng kết quả tìm kiếm.
“Đối chiếu toàn văn” chỉ có nghĩa đã đọc các mục chỉ định trong bản toàn văn; không đã đọc mọi trang/nghiên cứu nền.

| Bài | Nguồn đưa vào hồ sơ | Đối chiếu mục trong toàn văn | Chỉ tóm tắt | Chỉ trích đoạn | Cần tiếp tục toàn văn |
|---|---:|---:|---:|---:|---:|
| C01 | 3 | 2 | 1 | 0 | 1 |
| C05 | 3 | 3 | 0 | 0 | 0 |
| C17 | 4 | 3 | 0 | 1 | 1 |
| E05 | 5 | 4 | 1 | 0 | 1 |

15 lượt nguồn nội dung theo bài tương ứng 13 tài liệu duy nhất (S05/S06 dùng chung); thêm S14 cho Bloom thành 14 tài liệu.
S14 đã đọc mục trong toàn văn; sách 2001 chưa được đọc trực tiếp. Không có nguồn nào được gắn VERIFIED toàn diện.
C05 không còn nguồn trong tập chính chờ toàn văn, nhưng lịch sử mô hình stress và bằng chứng nghỉ tối ưu vẫn chưa đủ.
Không tính các trang chỉ sàng lọc hoặc đầu mối chưa đối chiếu là nguồn đã xác minh.

## Điểm cần thận trọng
- Nguồn phát triển cảm xúc mới Abstract không dùng để gán kết luận tuổi/chẩn đoán.
- S07 thiếu thân bài: cơ chế nhịp ngủ và hình phụ thuộc vẫn pending.
- E05 phải giữ bằng chứng không đồng nhất; lệch số g giữa Abstract/Results S12 cần làm rõ trước trích số.
- Chưa rà soát chuyên môn, kiểm ngôn ngữ với học sinh, đo kết quả Bloom hoặc cấp quyền asset cuối.
- Không nguồn ảnh bên ngoài được tải; chỉ thiết kế sơ đồ mới, quyền/bản hình cuối chờ kiểm.

## Kiểm tra
Chạy python3 docs/phase-3/research/validate.py trong work/phase-3-2a:
kiểm đủ hồ sơ, source IDs, trạng thái/mức truy cập, đếm nguồn, liên kết nội bộ; kiểm từ chối hồ sơ chuyên gia giả và số toàn văn bị tăng.
Chạy lại validator 3.1 trên bản docs tải từ main để kiểm ma trận 29 bài không bị thay đổi.
Không chạy build/Playwright/Axe: không thay ứng dụng; không tuyên bố đã hồi quy UI hoặc kiểm link ngoài bằng HTTP toàn bộ.
Nguồn ngoài được mở thực tế trong quá trình nghiên cứu; timeout/captcha/404 và bản thay thế ghi ở từng nguồn/METHOD.

## Bảo toàn và bàn giao PR
Nhánh phase-3-2a-research-blueprints, base main sau PR #4. Đối chiếu tree trước tạo commit để chỉ thêm research/.
Không merge/deploy/publish; không tự ghi chuyên gia; không viết văn xuôi hoàn chỉnh hoặc sản xuất hình cuối.
Giữ nguyên prototype/, HTML, PRODUCT/DESIGN/AGENTS, toàn bộ docs 3.1.

## Cần người dùng quyết định
Duyệt bốn đề cương, mức khó/hoạt động, cách trình bày bất định, phạm vi hình và ưu tiên gỡ pending.
Chọn có giới thiệu mô hình giao dịch stress không; có bỏ phần cơ chế C17 nếu chưa đủ nguồn không;
mức lịch sử VAK và cách xử lý số liệu S12; vai trò reviewer chuyên môn thực tế.
Duyệt kế hoạch không duyệt bài/ảnh và không cho phép xuất bản.

## Đề xuất 3.2B — chưa thực hiện
Sau phê duyệt mới: giải quyết nguồn pending hoặc xin thu hẹp luận điểm; viết bốn bản nháp theo đề cương được duyệt;
đặt dẫn trong bài/thư mục APA; làm hình hợp pháp kèm alt/credit; đối chiếu bản thảo từng nhận định;
rà soát sư phạm/chuyên môn theo người thực sự tham gia. Không mặc định gồm tích hợp website hay thay guard.
Dừng ở PR 3.2A để người dùng kiểm tra.
