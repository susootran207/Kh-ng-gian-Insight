# Bằng chứng và tồn đọng

Audit-r1, 25/10/2026. Đây là kiểm hồ sơ trên main `0486a46`, không nghiên cứu lại hoặc nâng trạng thái nguồn.

## Chuỗi bằng chứng theo bài

| Bài | Bản r2 và mapping hiện dùng | So với nghiên cứu 3.2A |
|---|---|---|
| C01 | [Nguồn](../drafts/C01/REFERENCES.md), [claim](../drafts/C01/CLAIM-AUDIT.md), [biên tập](../drafts/C01/EDITORIAL-REVIEW.md) | [SOURCES](../research/C01/SOURCES.md): giữ Scherer/Nook; thêm NIMH cho hỗ trợ; Reitsema S03 chỉ Abstract, không dùng kết luận phát triển theo tuổi. Bốn vùng không thay mô hình gốc năm thành phần |
| C05 | [Nguồn](../drafts/C05/REFERENCES.md), [claim](../drafts/C05/CLAIM-AUDIT.md), [biên tập](../drafts/C05/EDITORIAL-REVIEW.md) | [SOURCES](../research/C05/SOURCES.md): giữ Jagiello/Dunlosky/Paruthi; thêm NIMH. Jagiello dùng năm số báo 2025, không tự đổi theo online 2024. Không lý thuyết giao dịch stress chưa kiểm hoặc lịch nghỉ tối ưu |
| C17 | [Nguồn](../drafts/C17/REFERENCES.md), [claim](../drafts/C17/CLAIM-AUDIT.md), [biên tập](../drafts/C17/EDITORIAL-REVIEW.md) | [SOURCES](../research/C17/SOURCES.md): giữ AASM và Healthy Sleep Habits; bổ sung NHLBI body-clock/Diagnosis cho phạm vi hẹp; trang What Is Insomnia đọc nền nhưng không dùng làm mục thư mục. Carskadon chưa thân bài; bỏ cơ chế sâu/hình sinh học |
| E05 | [Nguồn](../drafts/E05/REFERENCES.md), [claim](../drafts/E05/CLAIM-AUDIT.md), [biên tập](../drafts/E05/EDITORIAL-REVIEW.md) | [SOURCES](../research/E05/SOURCES.md): bốn nguồn thực dùng, Fallace không vào bài. Giữ kết quả khác nhau 2018/2024, không chọn g chưa giải quyết; phần kỹ thuật kiểm định chuyển sang đọc sâu |

15 lượt nguồn ở thư mục bốn bài tương ứng 12 URL tài liệu duy nhất: Scherer, Nook, NIMH; Jagiello, Dunlosky, Paruthi; ba trang NHLBI; Pashler, Aslaksen/Lorås, Clinton-Lisell/Litzinger. Không cộng 13 nguồn nội dung dự kiến/nguồn S14 của 3.2A vào con số này. Audit kiểm citation–references và truy vết nội bộ; không mở lại toàn bộ URL, DOI resolver, dữ liệu gốc hoặc cập nhật đính chính.

## Bằng chứng quyết định người dùng
Yêu cầu 3.2B-4 trong hội thoại ghi: “Tôi nghiệm thu C01-r2, C05-r2 và C17-r2 làm bản nháp tham khảo cho quy trình biên tập. Chưa có phê duyệt chuyên môn hoặc quyền xuất bản.” Đây là căn cứ trục định hướng của ba bài, không chứng nhận chuyên môn.
Yêu cầu sửa E05-r2 đồng ý định hướng E05-r1 và yêu cầu sửa trên PR #9. Yêu cầu audit hiện tại liệt kê E05-r2 để tổng kiểm nhưng không nói riêng đã nghiệm thu revision này hoặc cấp quyền nội dung cuối. Vì vậy giữ mục cần người dùng xác nhận, không suy từ merge. Các lời chỉ thị nằm trong phiên tác vụ; không tạo đường dẫn hay chữ ký reviewer GitHub thay thế.

## Tồn đọng được phân loại

I = bắt buộc xử lý trước bắt đầu tích hợp bài; P = trước xuất bản; D = được tiếp tục pending nếu luận điểm liên quan không dùng; R = khuyến nghị cải tiến. Phân loại này là đề xuất trình duyệt, không tự cấp quyền triển khai.

| Mã | Vấn đề/bằng chứng | Loại và điều kiện xử lý | Người/vai trò cần tham gia |
|---|---|---|---|
| I01 | E05-r2 có PR merge/lệnh audit nhưng chưa lời nghiệm thu riêng r2 | I: người dùng xác nhận mức nghiệm thu, revision/phạm vi cần tích hợp; không suy từ merge | Chủ dự án |
| I02 | Schema hiện chỉ paragraphs/note/sources, chưa biểu đạt đủ figure/credit/claim/review theo revision; mẫu C05/C17 trùng slug cũ | I: phê duyệt hợp đồng chuyển đổi/ánh xạ ID–slug–revision–asset, hiển thị citation/APA/status và bảo toàn guard trước nhập bài; không sửa âm thầm mẫu cũ | Chủ dự án, người triển khai sau ủy quyền |
| I03 | Chưa có quyền bắt đầu tích hợp/3.3 hoặc đóng 3.2 | I: quyết định rõ phạm vi sau audit; audit PR không tự cho phép công việc tiếp | Chủ dự án |
| P01 | C01 chưa thử diễn đạt emotion differentiation và sơ đồ bốn vùng với học sinh | P: thử đọc THCS/THPT, quan sát phân biệt dữ kiện/suy đoán, kiểm không hiểu thành bốn thành phần gốc hoặc chẩn đoán | Người học/giáo viên phù hợp, reviewer chuyên môn |
| P02 | C05 chưa thử hoạt động theo điều kiện học khác nhau | P: thử tính khả thi khi phải chăm em/không gian ồn/không có hỗ trợ ngay; không yêu cầu khai hoàn cảnh nhạy cảm, có thể dùng thẻ giả định | Người học/giáo viên, biên tập |
| P03 | Cả bốn chưa reviewer chuyên môn độc lập | P: người thật, phạm vi/chuyên môn phù hợp và revision xác định; không thay bằng kiểm của trợ lý hoặc người dùng duyệt định hướng | Reviewer thực tế do chủ dự án lựa chọn |
| P04 | Chưa thử đọc C17/E05 và chưa reader/screen reader cả bốn | P: thử ngôn ngữ/logic theo tuổi; sau tích hợp kiểm giao diện thật, bàn phím, zoom, bảng, alt/caption/nguồn và công nghệ hỗ trợ; ghi công cụ/kết quả thực tế | Người học/giáo viên, QA tiếp cận |
| P05 | Chưa chốt quyền công bố bốn SVG | P: xác nhận điều kiện công bố, credit/tài nguyên/font theo revision; nguồn tự biên soạn không là chứng nhận quyền độc quyền | Chủ dự án/người có thẩm quyền quyền sử dụng |
| P06 | Chưa phê duyệt nội dung cuối và quyền xuất bản | P: hai quyết định có bằng chứng theo revision; build/guard không thay quyết định người thật | Chủ dự án |
| D01 | C17 Carskadon (2011), S07 excerpt_only/pending_fulltext | D: giữ nguyên pending khi không dùng cơ chế sâu/số liệu/đồ thị nguồn này. Muốn thêm phải đọc toàn văn hợp pháp, đối chiếu claim rồi duyệt revision mới trước dùng | Người nghiên cứu/reviewer sau ủy quyền |
| D02 | E05 Fallace (2023), S13 abstract_only/pending_fulltext | D: giữ pending khi không viết niên biểu/người khai sinh/lập luận lịch sử chi tiết; không bắt buộc tìm được toàn văn để dùng bài đã thu hẹp | Người nghiên cứu/reviewer |
| D03 | E05 S12 Abstract g=0,31, Results/Table 3 g=0,32 chưa giải quyết | D: bài/hình chỉ dùng nhận xét định tính có giới hạn, không số g. Muốn dùng số phải làm rõ phiên bản/đính chính/dữ liệu thích hợp, không tự chọn số hoặc đoán làm tròn | Người nghiên cứu/reviewer |
| D04 | C01 S03 mới Abstract; C05 nguồn gốc mô hình stress/lịch nghỉ tối ưu chưa kiểm | D: tiếp tục loại các luận điểm đó; không gọi nguồn đã verified hoặc hoạt động là điều trị | Biên tập/reviewer |
| R01 | Apply C05/C17/E05 phần lớn cùng nhân vật/có ví dụ gợi hướng | R: cân nhắc tình huống chuyển giao độc lập khi được phép sửa; hiện không tuyên bố đã đo transfer. Thử đọc P01/P02/P04 vẫn cần | Biên tập/giáo viên |
| R02 | Chữ C01/C05 nhỏ ở 320; nhãn r1 còn trong hồ sơ/asset không đổi | P cho độ đọc thật trong P04; R cho cách ghi phiên bản/biên tập thêm. Không đổi asset chỉ để tất cả cùng nhãn r2 | QA/biên tập |

## Khác biệt và bất đồng phải giữ rõ

- Kết luận 2018 và 2024 không hoàn toàn đồng nhất. Tập, phép đo, cách tổng hợp có thể ảnh hưởng; hồ sơ không chứng minh một nguyên nhân cụ thể gây chênh. Chênh số g không được “giải quyết” bằng cách bỏ kết quả dương hoặc chọn số thuận ý.
- C17 dùng NHLBI cho giải thích căn bản không đồng nghĩa đọc được Carskadon hoặc có bằng chứng phát triển sinh học sâu. C05 dựa kỹ thuật học/khuyến nghị ngủ không chứng minh phiếu làm giảm stress.
- Mã nguồn cục bộ như S04/S07 có nghĩa khác giữa các hồ sơ. Khi dẫn dùng kèm bài (ví dụ C01-S04, C05-S07), DOI/URL/tên tài liệu; không tự gộp thành một registry chung khi chưa có mapping được duyệt.
- Thông báo “chưa được duyệt biên tập” trong bài là trạng thái bản thảo; lời nghiệm thu định hướng không tự biến thành phê duyệt nội dung cuối. Audit ghi riêng, không sửa các thông báo.

Xem [ma trận trạng thái](FOUR-ARTICLE-COMPARISON.md) và [gate](READINESS-GATES.md). Không tìm lại nguồn trong đợt này để tự đổi pending thành verified; không ghi tên reviewer hoặc thông tin người học giả.
