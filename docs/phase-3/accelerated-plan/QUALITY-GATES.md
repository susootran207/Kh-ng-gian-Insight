# Nghiệm thu nhanh, chỉ sửa khi có lý do

Đề xuất accel-plan-r1. Giữ [STANDARDS](../STANDARDS.md), [TEMPLATES](../TEMPLATES.md) và các trục trạng thái của [audit](../audit-3-2/FOUR-ARTICLE-COMPARISON.md); không chuyển thành luật runtime hoặc trạng thái bài đã được duyệt trong đợt này.

## Hai lớp kết quả để PASS không bị hiểu thành quyền công bố

| Nhãn | Phạm vi/ý nghĩa | Cách xử lý |
|---|---|---|
| PASS | Đạt kiểm nội bộ ở mức bản nháp, đủ hồ sơ cho revision đang xét | Có thể đề nghị người dùng nghiệm thu ngay r1; không tạo r2 cho đủ quy trình |
| FIX_REQUIRED | Có lỗi thực chất, vị trí và lý do cụ thể, có thể sửa trong phạm vi bài | Sửa lỗi, cập nhật hồ sơ ảnh hưởng và kiểm lại phần liên quan; không viết lại các phần/bài đã PASS vô cớ |
| BLOCKED | Thiếu nguồn thiết yếu/quyền cần dùng hoặc vấn đề không thể giải quyết an toàn trong phạm vi | Dừng luận điểm/bài bị chặn, ghi điều kiện gỡ; không viết lấp hoặc đổi tên nguồn, không chặn các bài độc lập đã đạt |
| PENDING_EXTERNAL_REVIEW | Kiểm nội bộ có thể đã đạt nhưng thiếu một hay nhiều bằng chứng người thật/quyền trước công bố | Giữ riêng chuyên môn, thử đọc, reader/assistive QA, quyền tài nguyên, duyệt cuối và quyền xuất bản; không nâng thành published |

Trong báo cáo lô dùng **hai cột độc lập**: `Kết quả bản nháp = PASS/FIX_REQUIRED/BLOCKED` và `Trạng thái trước công bố = PENDING_EXTERNAL_REVIEW + danh sách còn thiếu`. Ví dụ hợp lệ: PASS ở r1 và PENDING_EXTERNAL_REVIEW. Đây là nhãn hồ sơ đề xuất, không thêm enum vào schema hiện tại. Khi có bằng chứng bên ngoài, ghi người/vai trò/ngày/revision/phạm vi thực tế của từng trục; không suy một trục đã đạt thì các trục khác đạt.

## G0 — Phạm vi và căn cứ trước khi viết
Mỗi bài có ID/slug không đổi, mục tiêu học theo tuổi, giới hạn và mức risk được đối chiếu đề cương. Phân biệt nguồn thực dùng, đầu mối, phần chưa đọc và luận điểm sẽ loại. Tài liệu chung có thể tìm/ghi thư mục một lần, nhưng nhận định, trang/mục, đối tượng và giới hạn kiểm theo từng bài. Không dùng link tồn tại làm bằng chứng, không bịa DOI/URL/tên tài liệu/trích nguyên văn.

Nếu nguồn thiết yếu không đọc được, tìm bản hợp pháp/nguồn phù hợp khác hoặc thu hẹp claim có căn cứ, giữ mục tiêu. Thay đổi phạm vi có ý nghĩa phải báo ngoại lệ cho người dùng; nếu không đạt mục tiêu an toàn thì BLOCKED. Nguồn không dùng có thể tiếp tục pending, không bắt gỡ toàn bộ pending của C17/E05 trước viết bài mới.

## G1 — Sáu hồ sơ tối thiểu, không miễn theo trục A
1. ARTICLE.md: nhãn bản nháp/revision, tình huống giả định, nội dung có trích dẫn, hoạt động tự nguyện và phản hồi có lý do, tài liệu APA; không lời hứa điều trị/điểm số hoặc dữ liệu cá nhân.
2. REFERENCES.md: thư mục thật, loại/độ tuổi/vị trí/ngày/mức truy cập, hỗ trợ và giới hạn; không gọi toàn văn khi chỉ Abstract.
3. CLAIM-AUDIT.md: truy vết nhận định chính, phân biệt bằng chứng và biên tập; đối chiếu claim–source, mức suy rộng và tuổi/văn hóa.
4. BLOOM-REVIEW.md: mục tiêu → nội dung → hoạt động/câu hỏi → tiêu chí phản hồi; phân biệt luyện có gợi ý với chuyển giao được kiểm. Không tự chứng minh đạt Bloom chỉ bằng ba nhãn.
5. VISUAL-REVIEW.md: chức năng học, nguồn/chủ thể tạo/quyền/credit/alt/caption/mô tả; SVG hoặc phương án hình hợp lệ nếu phù hợp. Nếu không dùng hình, giải thích vì sao và cách truyền đạt bằng chữ; không vẽ để đủ số lượng. Nếu hình bên thứ ba cần dùng bị thiếu quyền, thay bằng phương án hợp lệ hoặc BLOCKED phần phụ thuộc. Không lẫn trường hợp này với SVG tự biên soạn dùng hợp lệ để review nhưng còn chờ chủ dự án chốt quyền công bố: trường hợp sau có thể PASS bản nháp và PENDING_EXTERNAL_REVIEW trước công bố.
6. EDITORIAL-REVIEW.md: kiểm đã chạy và chưa chạy, kết quả nội bộ/ngoại lệ theo revision, nguồn/hình còn mở và trước công bố còn thiếu gì.

FEATURED chỉ khác đầu tư trải nghiệm; STANDARD-HIGH phải kiểm học thuật/nguồn/quyền/an toàn kỹ như FEATURED-HIGH. HIGH cần ma trận riêng về luận điểm nhạy cảm/tranh luận, giá trị công cụ/tuổi/bản dịch/quyền nếu có, và phạm vi reviewer cần mời. Không tự nhận có người độc lập khi thực tế chỉ trợ lý kiểm. Mọi risk đều phải truy vết nguồn; LOW không là giấy miễn kiểm.

## G2 — Kiểm từng bài rồi kiểm chung lô

| Kiểm không được cắt giảm | Bằng chứng cần có | Có thể dùng chung gì? |
|---|---|---|
| Nguồn/thuật ngữ/số liệu/tuổi | Claim, tài liệu đã đọc ở mục phù hợp, giới hạn suy luận | Metadata/công cụ tra cứu được dùng lại; không dùng kết quả kiểm bài A thay bài B |
| Citation–APA và nguồn thực dùng | Đối chiếu hai chiều tác giả–năm, DOI/URL thật; phân biệt online/số báo | Cùng format và script, không sao danh mục không liên quan |
| Bloom/đáp án | Bài cho kiến thức cần để làm; câu trả lời có lý do/nhiều phương án; không hỏi chuyện riêng | Mẫu alignment dùng lại, nội dung và đánh giá phải riêng |
| An toàn/không kỳ thị/tiếp cận | Không chẩn đoán, điều trị, đổ lỗi; có giới hạn tìm hỗ trợ khi cần | Checklist chung, quyết định rủi ro theo tình huống bài |
| Hình/quyền/độ đọc | Hồ sơ từng asset; XML/nguồn/alt/caption; render hẹp/rộng khi có SVG | Dùng lại bố cục/màu được phép, không tái dùng xác minh mô hình/giấy phép cho hình khác |
| Cấu trúc và phạm vi PR | Link/ID/slug/revision, đủ tệp, không rò nháp/metadata giả; danh sách đổi đúng lô | Chạy một lệnh cho cả lô nhưng báo kết quả theo bài |

Script chỉ kiểm cấu trúc, không thay đọc nguồn, xem hình hay người thật đánh giá. Kiểm r2 chỉ chạy lại phần chịu ảnh hưởng và kiểm liên kết/citation/phạm vi chung khi cần; không đọc lại mọi nguồn hoặc chạy full website chỉ vì sửa một câu không đổi nghĩa. Thay claim, tuổi, số liệu, mô hình, quyền hoặc hoạt động phải kiểm lại phần phụ thuộc tương ứng.

## G3 — Khi nào phải sửa, khi nào không
FIX_REQUIRED phải có đủ **vị trí, vấn đề, lý do, mức độ, cách sửa**; bổ sung revision/tệp phụ thuộc và cách xác nhận đã sửa. Mẫu sau chỉ minh họa, không phải lỗi đã phát hiện ở bài chưa viết:

| Vị trí | Vấn đề | Lý do | Mức độ | Cách sửa đề xuất |
|---|---|---|---|---|
| Bài X, đoạn luận điểm Y | Kết quả liên hệ được viết thành nguyên nhân | Vượt thiết kế nguồn | Nghiêm trọng | Thu hẹp câu/đối chiếu nguồn phù hợp, cập nhật claim và hoạt động/hình nếu ảnh hưởng |
| Bài X, câu hỏi Z | Đáp án đòi kiến thức bài chưa giải thích | Bloom không khớp | Đáng kể | Bổ sung giải thích hoặc chỉnh câu hỏi, kiểm lại phản hồi |

Lỗi khoa học/nguồn/suy rộng, tuổi, kỳ thị/tư vấn vượt phạm vi, Bloom lệch, hình gây hiểu sai/thiếu quyền, hoặc máy móc/lặp làm khó hiểu đều là lỗi thực chất. Chọn hai cách diễn đạt đều rõ và đúng, khác bố cục mẫu, độ dài khác mẫu, hoặc muốn “mượt hơn” mà không có vấn đề hiểu nghĩa chỉ là gợi ý tùy chọn, **không** trả bài hoặc bắt r2. Không đặt quota r1/r2.

Người dùng có thể nghiệm thu r1 nếu PASS; mọi sửa có ý nghĩa sau nghiệm thu cần vòng kiểm/phê duyệt đúng phạm vi revision mới, không rewrite lịch sử. PR lô có thể duyệt theo từng bài; không tự hợp thức hóa bài BLOCKED để báo đủ 29.

## G4 — Trước công bố, giữ đầy đủ các trục bên ngoài
Kế hoạch tăng tốc không bỏ chuyên môn độc lập, thử đọc theo tuổi/điều kiện, reader/screen reader, quyền tài nguyên, duyệt nội dung cuối hoặc quyền xuất bản. Có thể xếp lịch theo lô sớm và xử lý lỗi thực chất từ phản hồi. Merge tài liệu/PASS r1/nghiệm thu mẫu không tự là published; production guard và chỉ thị deploy vẫn độc lập. Xem [PARALLEL-WORK](PARALLEL-WORK.md) để thử UI mà không đưa fixture/draft vào production.
