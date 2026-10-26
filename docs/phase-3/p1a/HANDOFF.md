# P1A — Checklist bàn giao cho người duyệt

Đây là hướng dẫn thu thập bằng chứng, **không phải phiếu phê duyệt đã điền**. Chưa chỉ định hoặc ghi ai đã tham gia. Dùng [29 phiếu](SUMMARY.md), [checklist P1](../integration-plan/P1-PUBLICATION-CHECKLIST.md) và [F0-CONTRACT](../integration-plan/F0-CONTRACT.md). Chỉ tạo record thật ở giai đoạn được chủ dự án cấp phép riêng.

## Người duyệt chuyên môn

- [ ] Nhận đúng ID/slug/revision, sourceHash/contentHash/revisionHash và toàn bộ dossier/SVG hash trong phiếu. Đọc nguyên ARTICLE, hoạt động và phản hồi, không chỉ xem tóm tắt kiểm toán.
- [ ] Mở từng nguồn ở vị trí REFERENCES và từng claim. Ghi bản đọc/URL/DOI/trang/mục, ngày truy cập thực, loại tài liệu, tuổi/quần thể/bối cảnh, kết luận và giới hạn; tách trực tiếp, thứ cấp, abstract, author draft, mirror, không truy cập. Nguồn không lấy được giữ UNVERIFIED và ghi cách xử lý.
- [ ] Kiểm metadata APA ở nguồn gốc hợp pháp, cập nhật/đính chính/rút bài liên quan; không xác nhận không có correction chỉ vì tìm chưa thấy. C03 cần giải quyết chênh DOI; C21/C22/E02 cần kiểm phiên bản; E05 cần quyết định có căn cứ về số liệu nguồn và nhận định định tính đang dùng.
- [ ] Kiểm ngôn ngữ không chẩn đoán, gán nhãn, đổ lỗi hoặc hứa hiệu quả; không biến hoạt động thành điều trị/test. Kiểm tuổi, bối cảnh Việt Nam, quyền bỏ qua và không tự bộc lộ; hỗ trợ không đợi hoàn thành hoạt động/đủ ngày/đủ nặng.
- [ ] Với HIGH: rà từng trục của ma trận CLAIM-AUDIT, gồm riêng tư, nguy cơ, trách nhiệm người lớn/bạn bè. C19 cần chuyên môn y tế/nhi hoặc vị thành niên; C20 cần chuyên môn vận động/thích ứng phù hợp; C11/C13/C16 cần năng lực bảo vệ trẻ em; E01–E04 cần tâm trắc/nhân cách/hướng nghiệp và tuổi–văn hóa theo nội dung. Đây là phạm vi năng lực cần tìm, không tuyên bố ai đã đủ năng lực/đã duyệt.
- [ ] E01–E04: phân biệt mô hình và công cụ, form/ngôn ngữ/tuổi/định chuẩn/validity theo mục đích; không yêu cầu làm test hoặc xin quyền bộ test khi chỉ đọc bài giáo dục. Nếu tương lai muốn triển khai công cụ phải có phạm vi riêng.
- [ ] Ghi issue bằng ID, câu/dòng, bằng chứng, mức độ và đề nghị cụ thể; không yêu cầu viết lại do sở thích. Nếu có sửa nguồn trong đợt khác, lập revision/hash mới và xác định review phụ thuộc phải làm lại.
- [ ] Khi đủ điều kiện: người có thẩm quyền xác minh danh tính/năng lực/phạm vi thực, quyền công khai thông tin người duyệt và bằng chứng thật. F0 kiểm consistency/hash, không xác thực chuyên môn hoặc pháp lý.

## Biên tập viên và người tổ chức thử đọc

- [ ] Kiểm tác giả–năm/citation hai chiều, tên tổ chức, n.d.-a/b, năm tập khác online, số trang in khác PDF, APA7 nhiều hơn20 tác giả; không sửa DOI/năm từ phỏng đoán.
- [ ] Đối chiếu Nhớ–Hiểu–Vận dụng với kiến thức đã giải thích, câu hỏi, phản hồi có lý do/đáp án mở; kiểm nội dung không ép cảm xúc hoặc kết quả sống tốt lên mới đạt.
- [ ] Thử đọc THCS và THPT với cách tổ chức tự nguyện/an toàn, nội dung nhân vật giả định, không thu dữ liệu sức khỏe/chuyện riêng hoặc danh tính trẻ vào repo public. Ghi tải đọc, thuật ngữ/hiểu nhầm cụ thể và quyết định xử lý; không gọi đủ nhãn Bloom là đã học được.
- [ ] Không coi người dùng nghiệm thu29 bản nháp là learnerReview hoặc editorialApproval thật theo F0. Chỉ ghi loại review/ngày/phạm vi khi có hoạt động thực và bằng chứng được phép công khai.

## ReaderQA và khả năng tiếp cận

- [ ] Đọc đúng revision trên C1 loopback127.0.0.1; kiểm source/AST/DOM receipts, đủ nguồn/Bloom/nhấn mạnh/list/bảng/DOI/alt/caption/mô tả/credit.
- [ ] Xem từng bài hẹp/rộng và320/390/768/1440, keyboard/TOC/hash/reload/Back/return/zoom hình/focus, không tràn; ghi browser/OS/version và SHA thật.
- [ ] Kiểm native zoom200% bằng thao tác trình duyệt, không dùng CSS zoom/viewport thay thế; screen reader thực với tổ hợp/version cụ thể, gồm TOC/bảng/nguồn/hình dài/status/focus. C01/C05 chữ hình scale320 nhỏ, E02/C17 dài cần chú ý, không sửa SVG để bỏ gate.
- [ ] Kiểm trên Safari/Firefox và thiết bị thật theo phạm vi gate; ghi thiếu công cụ/thiết bị là UNVERIFIED/BLOCKED, không PASS. Bằng chứng browser lịch sử C1 không thay lần nghiệm thu cuối.

## Người xác minh quyền tài sản

- [ ] Mỗi SVG: nhận assetId/path/revision hash/SHA-256 và revisionHash bài; đối chiếu hình thực, title/desc/alt/caption/mô tả/credit với đúng bản.
- [ ] Kiểm provenance trợ lý AI/hình học/chữ theo hồ sơ và quá trình tạo được chủ dự án lưu; kiểm có tài sản phái sinh, sao bố cục/biểu đồ/logo/items/scoring hoặc nguồn bên thứ ba nào cần quyền không. XML không có import ngoài không đủ chứng minh toàn bộ quyền.
- [ ] Xác minh chủ thể có quyền quyết định, điều kiện công cụ/nguồn dùng lúc tạo khi cần, giấy phép/ủy quyền thật và phạm vi web công khai/GitHub Pages/phân phối repo/sửa đổi; kiểm credit, thời hạn/lãnh thổ/thu hồi nếu áp dụng. Nếu không xác minh được ghi UNVERIFIED và lý do, không tự gán CC/độc quyền.
- [ ] Tách quyền đọc/cite bài khoa học với quyền tái bản hình/toàn văn/bản dịch/test. BFI-2, MBTI, O*NET và PSS có phạm vi/phiên bản/quyền riêng; không suy research-free/read-free=request-approved. Trang license đọc được cũng không tự là giấy phép cấp cho dự án.
- [ ] Kiểm font/artwork dùng chung tại gate release riêng; P1A không chứng nhận những asset ngoài29 SVG đã đủ quyền.
- [ ] Không đưa hợp đồng riêng tư hoặc dữ liệu cá nhân vào repo public. Bố trí lưu bằng chứng gốc riêng, bản tối thiểu được phép công khai tương thích F0 proof path/hash. Chưa giải quyết được cách chứng minh công khai thì giữ BLOCKED, không nới guard.

## Chủ dự án/người được ủy quyền — bước sau khi có chứng cứ thật

- [ ] Tất cả issue bắt buộc đã đóng bằng bằng chứng; đủ29/29 bài và29 SVG; chưa đủ thì không đóng P1 hoặc cho P2.
- [ ] Mỗi bài có đúng năm loại editorialApproval/expertReview/readerQA/learnerReview/publicationAuthorization, assetRights riêng; subject/revision/contentHash/revisionHash/assetHash/proofHash đúng. Người/ngày/scope/decision thật, timestamp hợp lệ theo F0; không kế thừa qua slug hoặc từ review AI.
- [ ] Xác minh tính xác thực của người/giấy phép và quyền công khai bằng chứng. P1A không thay người quyết định; các ô trên vẫn chưa được đánh dấu.
- [ ] Sau này chỉ triển khai record/status hoặc sửa nội dung khi được cấp phép riêng. Phê duyệt chuyên môn, quyền hình, quyền publication, merge và deploy là các quyết định riêng.

Không có tên người, chữ ký, giấy phép, ngày phê duyệt hoặc quyết định giả được điền trong bộ này. Dừng tại Draft PR P1A.
