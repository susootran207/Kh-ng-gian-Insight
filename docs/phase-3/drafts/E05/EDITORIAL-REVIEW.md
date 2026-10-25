# E05 — Hoàn thiện e05-draft-r2

25/10/2026. Chỉnh **chính PR #9**, nhánh `phase-3-2b-4-e05-draft`. R1 giữ tại [0f0fc7f2cfc5bfa8134ec9c757cd4d53c3f0ae5b](https://github.com/susootran207/Kho-ng-gian-Insight/tree/0f0fc7f2cfc5bfa8134ec9c757cd4d53c3f0ae5b/docs/phase-3/drafts/E05); r2 nối tiếp, không rewrite lịch sử. Phần r1 bên dưới là hồ sơ lịch sử, không báo như mọi kiểm tra r1 đã chạy lại.

## Trước–sau
- Matching: trước giới thiệu tên matching/meshing rồi mô tả phân ngẫu nhiên/phép kiểm chung trong mạch chính; sau bắt đầu hai nhóm sở thích A/B, thử cả hai cách trong mỗi nhóm, lợi thế phải đổi giữa nhóm, rồi mới giới thiệu thuật ngữ. Phép đo phân nhóm, phân ngẫu nhiên, phép kiểm chung và tương tác chéo chuyển thành phần đọc sâu có hướng dẫn, không xóa kiến thức.
- Tổng quan: trước chỉ nhắc khác tập/cách gộp; sau thêm tiêu chí chọn, cách đo và phương pháp tổng hợp có thể ảnh hưởng kết quả, nhưng chưa chứng minh nguyên nhân chênh cụ thể 2018/2024. Giữ bảng và lợi ích trung bình nhỏ dương cùng chất lượng/nhất quán/tương tác, không tuyệt đối hóa bằng chứng.
- Hai nhiệm vụ: trước các phương án đã được gọi ví dụ; sau nói rõ nghe không là cách duy nhất cho phát âm và hình không là cách duy nhất cho bản đồ. Mẫu yêu cầu chọn theo điều kiện tiếp cận/thực tế; ví dụ trước hoạt động chỉ ghi mục tiêu, không cung cấp cả đáp án.
- Phản hồi câu 2: từ lời có “phép kiểm tra chung” sang logic so kết quả trong mỗi nhóm và lợi thế đổi nhóm, cho phép ví dụ A/B hoặc lời riêng. Câu hỏi 1–3 và tiêu chí mở câu 3 giữ nguyên.
- SVG: khối bằng chứng từ bốn dòng có thuật ngữ phép kiểm chung sang ba dòng: “So kết quả học của / các cách dạy trong mỗi nhóm, / không chỉ hỏi sở thích.” Giữ bốn khối, bố cục/màu/kích thước. Alt/desc/mô tả chữ cập nhật, phần chữ nêu cả logic lợi thế khác nhóm. Caption giữ nguồn/phạm vi cũ.

## Nhận định–nguồn và các điểm pending
Giữ bốn nguồn Pashler (2008), Aslaksen & Lorås (2018), Clinton-Lisell & Litzinger (2024), Dunlosky và cộng sự (2013). REFERENCES và thư mục cuối ARTICLE không đổi; không nguồn/DOI hoặc thông tin xác minh mới.
R2 đọc lại PDF Pashler phần tr. 108–110, đặc biệt Interactions; HTML 2024 phần Potential moderators/The current study/Inclusion criteria. Đây là đối chiếu lại các mục đã dùng ở r1, không rà soát/tái phân tích mới. Q2/Q3/Q4 cập nhật trong CLAIM-AUDIT; các nhận định còn lại giữ căn cứ r1, không báo đã mở lại mọi nguồn.
Không gán các yếu tố phương pháp luận là nguyên nhân đã chứng minh khác biệt 2018/2024. Giữ hạn chế áp dụng rộng, hiệu quả lâu dài và khái quát cho học sinh Việt Nam.
Fallace vẫn abstract_only/pending_fulltext, không tra lại hoặc nâng xác minh; không lịch sử chi tiết trong ARTICLE. Chênh lệch g của 2024 vẫn chưa giải quyết theo hồ sơ r1; không chọn một số và không đưa g/p/CI hoặc biểu đồ vào ARTICLE/SVG.

## Bloom và kiểm tra r2
Nhớ giữ hai câu sở thích/hiệu quả. Hiểu dùng ví dụ trước thuật ngữ và phản hồi dựa logic. Vận dụng giữ hai nhiệm vụ, hành động có điều kiện tiếp cận, phản hồi đúng mục tiêu và điều chỉnh; nhiều phương án được chấp nhận. Không test VAK, dữ liệu riêng, chấm năng lực hoặc công kích người từng tin VAK; có quyền bỏ qua.
Kiểm tự động r2 PASS: đủ bảy tệp; liên kết nội bộ; bốn cặp citation–references/DOI; ba câu hỏi/ba phản hồi; nhãn r2; hai nhiệm vụ/quyền bỏ qua/ranh giới tiếp cận; không số g trong bài hoặc hình; SVG XML/title/desc/bốn khối, không tài nguyên ngoài; alt/caption/mô tả và kích thước PNG. Kiểm thêm ví dụ đứng trước thuật ngữ, cả hai phương pháp trong mỗi nhóm, chi tiết thiết kế còn trong phần sâu, không khẳng định nguyên nhân chênh hai tổng quan; REFERENCES/thư mục cuối bài giữ nguyên. Kiểm chuỗi/cấu trúc không thay đọc nguồn, rà lập luận hoặc thử với học sinh.
Đã render Inkscape mới 320px/640px và xem cả hai: chữ Việt, bốn khối/footer hiện đủ, không thấy cắt chữ. Có warning Pango/GTK/cache/profile read-only; PNG xuất thành công, giữ ngoài tệp repo. Màu chữ/nền giữ nguyên; tương phản tĩnh tính lại từ mã màu: 10,10 / 11,01 / 8,51 / 8,84:1 trên kem/giấy/sage/tím. Không chứng nhận accessibility.
Chỉ sáu tệp E05 cần thay: ARTICLE, CLAIM-AUDIT, BLOOM-REVIEW, VISUAL-REVIEW, EDITORIAL-REVIEW và SVG. REFERENCES giữ nguyên; đối chiếu tree GitHub cuối ghi tại PR, không coi riêng thư mục cục bộ là bằng chứng phạm vi Git.

## Chưa kiểm, chờ duyệt và điểm dừng
Chưa reader/browser/screen reader, thiết bị vật lý, học sinh/giáo viên thử hoặc reviewer chuyên môn. Không chạy build/runtime/Playwright/Axe website vì không thay ứng dụng. Chưa quyền công bố asset cuối hoặc giải quyết các điểm pending nguồn.
Cần người dùng duyệt mạch matching mới, mức chi tiết phần sâu, cách giải thích phương pháp luận, ví dụ/đáp án và SVG ngắn hơn. Chưa approved/expert_reviewed/published; không reviewer giả.
Không sửa C01/C05/C17/website, không PR mới/merge/deploy/publish, không tổng kết 3.2 hay bắt đầu 3.3. Dừng tại PR #9 chờ nghiệm thu E05-r2.

---

## Hồ sơ lịch sử r1
# E05 — Bàn giao e05-draft-r1

25/10/2026; chỉ đợt 3.2B-4/KGNT-E05. Nhánh `phase-3-2b-4-e05-draft`, slug `phong-cach-hoc-tap`, collection extension, đối tượng THCS–THPT, chủ đề T09 theo ma trận.

## Điều kiện nền và phạm vi
PR #8 đã merge. Main được đọc tại `03cbf599e18ae2d9ff304db53d80b71f1f52d64a`, đúng merge commit. Đã lấy PRODUCT/DESIGN/AGENTS, PLAN/MATRIX/STANDARDS/TEMPLATES và matrix.json trên commit này; đọc hồ sơ research/E05 cùng ba bài C01-r2/C05-r2/C17-r2 và hồ sơ kiểm chứng làm tham khảo quy trình. Các giới hạn lịch sử trong tài liệu nền được hiểu theo ủy quyền mới chỉ E05, không sửa chúng hoặc biến nghiệm thu các bản nháp thành duyệt chuyên môn.
Chỉ thêm [ARTICLE](ARTICLE.md), [REFERENCES](REFERENCES.md), [CLAIM-AUDIT](CLAIM-AUDIT.md), [BLOOM-REVIEW](BLOOM-REVIEW.md), [VISUAL-REVIEW](VISUAL-REVIEW.md), [SVG](claim-to-practice.svg) và báo cáo này trong thư mục E05. Không sửa research/3.2A, ba bài trước hoặc website.
Bản nháp để duyệt; chưa approved/expert_reviewed/published. Không tên reviewer chuyên môn hay approval metadata giả. Repository công khai có thể đọc được bản nháp, chưa có quyền đưa lên website.

## Các quyết định biên tập
- Mở từ Huy thích hình, rồi chuyển sang hai yêu cầu phát âm/bản đồ. Giải thích sở thích trước nhãn, ví dụ trước thuật ngữ matching. Không công kích người học/giáo viên hoặc yêu cầu bỏ sở thích.
- Tách sở thích, phép phân loại, ghép phương thức và kết quả học. Không tuyên bố kiểu cố định hoặc mọi khác biệt cá nhân không có thật.
- Giữ 2008 cho tiêu chuẩn/giới hạn; trình bày riêng kết quả 2018 và 2024. Không dùng câu tuyệt đối “mọi nghiên cứu bác bỏ”, “không có bất kỳ hiệu quả nào” hoặc “ghép đúng chắc học tốt”.
- Không giấu kết quả trung bình dương nhỏ 2024; giữ giới hạn mẫu tương tác, chất lượng/khác biệt và một phiên học. Không suy lợi ích dài hạn, nhân quả lý do hai tổng quan khác nhau hoặc hiệu quả riêng Việt Nam.
- Các ví dụ học theo nhiệm vụ là biên tập, không nghiên cứu chứng minh phương pháp tối ưu. Dunlosky chỉ dùng cho tự kiểm/ôn cách quãng, không chứng minh toàn phiếu.
- Phân biệt hỗ trợ tiếp cận, nhất là người khuyết tật giác quan, với giả thuyết VAK. Không từ chối hỗ trợ vì phê bình matching hoặc ép người học dùng phương thức không thể tiếp cận.
- Ba câu hỏi/đáp án mở, phiếu hai nhiệm vụ có mục tiêu–cách thử–phản hồi/điều chỉnh. Có thể bỏ qua, không inventory hoặc dữ liệu riêng, không tự thiết kế thử nghiệm hay phân loại năng lực.
- Infographic bốn khối dọc thay bốn cột để đọc hẹp; không đồ thị thống kê hoặc hình gốc từ tài liệu. Phần sâu giải thích tương tác bằng lời và ví dụ giả định không số liệu.

## Fallace và số liệu 2024
S13 Fallace vẫn abstract_only/pending_fulltext: đã đọc Abstract/metadata và đầu bài Spotlight; DOI/PsycNet gặp robots denial hoặc không truy cập, tìm PDF/kho tác giả chưa cung cấp bản toàn văn đọc được. Không dùng niên biểu/người/năm khai sinh hoặc nội dung lịch sử chi tiết trong ARTICLE. Không gọi Spotlight là toàn văn.
S12 bản HTML vẫn lệch Abstract g = 0,31 và Results/Table 3 g = 0,32. Chưa có giải thích/đính chính xác nhận, PDF tải timeout, chưa tái chạy dữ liệu hoặc liên hệ tác giả. Giữ cả hai vị trí trong REFERENCES, không chọn một số và gọi verified; ARTICLE/SVG không có g/p/CI hay biểu đồ. Chi tiết và so sánh 2008–2018–2024 trong REFERENCES.

## Kiểm tra thực tế và giới hạn
- Tự đối chiếu bốn nguồn thực dùng theo các mục/trang ghi trong REFERENCES, mapping Q1–Q7/P1–P2; không thẩm định mọi nghiên cứu gốc, phụ lục hoặc cập nhật toàn bộ lĩnh vực.
- Rà câu chuyên môn với nguồn, phân biệt nhận định định tính khỏi số liệu chưa giải quyết. Metadata/DOI/trang xác định được không đồng nghĩa toàn bộ nguồn verified hoặc chuyên gia duyệt.
- Tự rà Bloom bằng mục tiêu/nội dung/câu hỏi/phản hồi, không chỉ ba nhãn; hoạt động dùng mẫu có hướng dẫn, chấp nhận nhiều phương án có căn cứ.
- SVG Inkscape xuất mới 320px và 640px thành công; đã xem cả hai: bốn khối/chữ Việt/footer hiện đủ, không thấy cắt chữ. Có warning Pango/GTK/font cache/profile read-only. PNG chỉ giữ work, không vào repo/website.
- Kiểm tự động PASS: đủ bảy tệp, liên kết nội bộ, bốn cặp citation–references/DOI nhất quán, ba câu hỏi/ba phản hồi, nhãn draft, hai nhiệm vụ, quyền bỏ qua và ranh giới tiếp cận; ARTICLE không g/p/CI hoặc Fallace làm căn cứ; SVG XML/title/desc/bốn khối, không script/tài nguyên ngoài/mũi tên; alt/caption/mô tả chữ và kích thước PNG. Kiểm chuỗi chỉ xác nhận cấu trúc, không chứng minh đọc hiểu hoặc khoa học đúng. Tương phản chữ #333e32 trên kem/giấy/sage/tím: 10,10 / 11,01 / 8,51 / 8,84:1, tính từ mã màu, không chứng nhận accessibility.
- Đối chiếu tree GitHub trước commit/PR để xác nhận chỉ thêm E05, không xóa và giữ SHA mọi tệp cũ; kết quả cuối ghi tại PR.

Chưa người đọc THCS–THPT/giáo viên thử, chưa đo hiệu quả học, chưa reviewer chuyên môn. Chưa kiểm reader/browser/screen reader/thiết bị vật lý hoặc Safari/Firefox; không chạy build/runtime/Playwright/Axe website vì không đổi ứng dụng. Render SVG không chứng minh bài đọc tích hợp đã responsive/accessibility đạt.
Chưa gán giấy phép công bố asset thay chủ dự án; chưa kiểm tài liệu lịch sử toàn văn hoặc giải quyết g của S12. Các giới hạn này không được lấp bằng diễn giải từ Abstract.

## Cần người dùng phê duyệt
1. Giọng văn/độ dài, mức giải thích thiết kế nghiên cứu và phần sâu tùy chọn.
2. Cách trình bày khác biệt 2018/2024 và quyết định không dùng số g.
3. Bỏ lịch sử chi tiết khi Fallace pending; định nghĩa VAK dựa nguồn tổng quan đã đọc.
4. Hai nhiệm vụ Huy, tiêu chí phản hồi và cách bảo vệ hỗ trợ tiếp cận.
5. Infographic/alt/caption, mức giản lược và quyền dùng asset cuối.
6. Rà soát chuyên môn thực tế trước dùng làm chuẩn bài mẫu hoặc xuất bản; nghiệm thu bản nháp không thay quyết định này.

## Điểm dừng
Tạo PR E05 riêng vào main để xem, chưa merge. Không sửa C01/C05/C17, không viết 25 bài khác, không schema/catalogue/router/publication guard/UI, không tích hợp, deploy/publish hoặc 3.3. Dừng sau PR, chờ nghiệm thu E05; chưa tổng kết giai đoạn 3.2 hoặc tự coi bài mẫu cuối đã được duyệt.
