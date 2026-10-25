# C05 — Bàn giao c05-draft-r1

Ngày 25/10/2026. Base main afd38295ec0c5129f5f7a1466c75e3a19941398c, đã merge PR #6.
Người dùng nghiệm thu C01-r2 làm mẫu quy trình, không xác nhận chuyên môn/xuất bản; không sửa C01.

## Phạm vi và tệp
Chỉ 3.2B-2/KGNT-C05 trên phase-3-2b-2-c05-draft.
[ARTICLE](ARTICLE.md), [REFERENCES](REFERENCES.md), [CLAIM-AUDIT](CLAIM-AUDIT.md),
[BLOOM](BLOOM-REVIEW.md), [hồ sơ hình](VISUAL-REVIEW.md), [SVG](study-plan.svg), báo cáo này.
Đã đọc PRODUCT/DESIGN/AGENTS, PLAN/MATRIX/STANDARDS/TEMPLATES, toàn bộ research/C05 và C01-r2 cùng hồ sơ kiểm tra trên đúng main.
Những giới hạn cũ ở tài liệu lịch sử được hiểu theo ủy quyền mới chỉ cho C05; không sửa hay tự đánh dấu các tài liệu cũ đã duyệt.

## Lựa chọn biên tập
- Mở Minh với hai bài thi, việc nhà và phạm vi chưa rõ; so sánh Hà để nói tính khả thi thay vì quy thiếu ý chí.
- Không đặt tên mô hình giao dịch stress khi chưa đọc tài liệu gốc. Yêu cầu/nguồn lực dùng nghĩa đời thường.
- Phân biệt căn cứ kỹ thuật học (S05), khuyến nghị ngủ (S06), phạm vi hỗ trợ học đường (S04), tìm trợ giúp (C05-S07).
- Không dùng một tổng quan chứng minh toàn phiếu; không CBT, thời lượng nghỉ tối ưu hoặc bảo đảm điểm/hết lo.
- Giữ cả hai nhóm tuổi ngủ và đơn vị mỗi24 giờ; không suy từ ngoài khoảng sang rối loạn.
- Thủ tục một buổi và phản ví dụ ngoài khả năng kiểm soát đi trước hoạt động tự điền. Phần sâu đặt trước thư mục để người đọc có thể chọn hoặc bỏ qua mà vẫn tìm nguồn cuối bài.
- Bảng ví dụ và phản hồi chấp nhận nhiều phương án; không thu chuyện riêng hoặc chấm tâm lý.
- Hình là phiếu năm vùng, không sao chép bố cục phân tích cảm xúc C01 hoặc biểu đồ nghiên cứu.

## Nguồn và xác minh
Ba nguồn 3.2A đã mở lại các mục liên quan trong toàn văn, thêm hướng dẫn NIMH revised2024 cho đoạn hỗ trợ.
PMC gặp captcha cho S04/S06, thay bằng trang Springer và PDF AASM chính thức; ghi đường đọc và vị trí ở REFERENCES.
Đã đọc thêm phần practice testing/feedback và distributed practice trong PDF S05.
Không tuyên bố đọc mọi trang, thẩm định từng thử nghiệm, cập nhật toàn bộ nghiên cứu hoặc chuyên gia đã kiểm.
Không trích nguyên văn khoa học, không DOI/số trang tự tạo, không dùng nguồn lý thuyết gốc đang pending.

## Kiểm tra thực tế
- Tự đọc lại bài: thuật ngữ giải thích bằng lời thường, giữ tác giả–năm tại luận điểm, tách khuyến nghị từ nguồn và ví dụ giả định.
- Đối chiếu 4 cặp tác giả/năm trong bài–thư mục–REFERENCES; rà claim map tương ứng. Kiểm tự động chỉ kiểm cấu trúc, không thay việc đọc nguồn.
- Kiểm 3 câu hỏi/3 phản hồi và alignment Nhớ/Hiểu/Vận dụng, cho phép cách nói khác có dữ kiện.
- Kiểm link tài liệu, SVG XML/title/desc, không script/foreignObject/image/marker hoặc href ngoài; alt ARTICLE khớp VISUAL-REVIEW: PASS.
- Inkscape render320/640px thành công, đã xem trực tiếp cả hai: năm vùng, chữ Việt và footer hiển thị, không thấy cắt chữ. Có warning Pango/GTK, không thất bại render.
- Tính tương phản chữ #333e32 với năm nền đạt 8,51–11,01:1; không coi là chứng nhận accessibility toàn website.
- ARTICLE có 2.406 mục tách theo khoảng trắng, gồm đáp án/thư mục; không là thước đo độ khó tiếng Việt.
- Đối chiếu tree trước commit: chỉ thêm bảy tệp trong C05; mọi tệp có sẵn, C01 và prototype giữ nguyên SHA.

## Giới hạn chưa kiểm
Chưa chuyên gia/giáo viên/học sinh đọc thử hoặc đo hiệu quả học; chưa reader, screen reader, Safari/Firefox hay thiết bị vật lý.
Không chạy lại build/Playwright/Axe toàn website vì không thay runtime. Lỗi Chromium ở C01 là lịch sử, không báo như đã chạy thất bại mới cho C05.
Chưa gán giấy phép công bố asset thay người dùng; không tài nguyên bên thứ ba tải vào. Chưa xác minh dịch vụ địa phương và không đưa thông tin ấy vào bài.
Không nguồn nào đủ để chứng minh hiệu quả cả phiếu; thời lượng nghỉ tối ưu và mô hình stress nguồn gốc chưa sử dụng.

## Cần người dùng duyệt
1. Độ dài, giọng văn và phạm vi đọc sâu; có cần rút lặp giữa ví dụ và phản hồi không.
2. Dữ kiện Minh/Hà, nhiệm vụ Toán và cách chấp nhận ưu tiên hỏi lại phạm vi.
3. Mẫu nghỉ/giữ ngủ/điều chỉnh trong hoàn cảnh không kiểm soát; không quy thất bại cho học sinh.
4. Phạm vi giải thích khoa học, năm trích Jagiello (bản số báo2025), hai nhóm tuổi ngủ.
5. Hình, alt/caption, chữ trên thiết bị nhỏ và quyền dùng asset cuối.
6. Rà soát chuyên môn thực tế cùng người phù hợp nếu tiến tới chuẩn bài mẫu; duyệt nội dung không thay duyệt chuyên môn/xuất bản.

## Dừng phạm vi
Bản nháp chưa approved/expert_reviewed/published, không approval metadata giả.
Không viết C17/E05 hay bài khác, không đổi C01/UI/schema/catalogue/router/guard, không tích hợp, deploy hoặc merge.
Tạo PR C05 để người dùng xem; dừng và chờ duyệt, không bắt đầu3.2B-3.
