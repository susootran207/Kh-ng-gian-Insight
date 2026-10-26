# P1 — Checklist phê duyệt 29 bài và 29 SVG

Ngày 26/10/2026, Asia/Ho_Chi_Minh. Đây là thiết kế checklist, **không phải hồ sơ phê duyệt thật**. Mọi ô dưới đây chưa xác minh trong phiên kế hoạch; không tạo publication-records, không thay manifest/status/quyền. [Roadmap A](IMPLEMENTATION-ROADMAP.md) · [F0 contract](F0-CONTRACT.md).

## Ba số đếm độc lập

| Số đếm | Ý nghĩa | Trạng thái kế hoạch |
|---|---|---|
| Biên soạn/nghiệm thu nội bộ | 24 core + 5 extension, đủ ARTICLE/dossier/SVG; bốn r2 và 25 r1 | 29/29 theo nghiệm thu nội bộ đã có |
| Được phê duyệt đầy đủ | Mỗi bài đủ chuyên môn, biên tập, readerQA, learnerReview, quyền hình và authorization đúng revision/hash | Chưa xác minh đủ 29/29; không suy từ chữ PASS, C1 hoặc quyết định A |
| Công khai trên website production | Bài đủ quyền được tích hợp trong artifact đã kiểm và deploy có cấp phép | Báo cáo nền C1/W1/N1 ghi 0 bài/0 topic; phiên này không build/deploy hoặc cấp quyền |

29/29 approved là mục tiêu trước release, không phải tuyên bố hiện trạng. 29 eligible chưa chứng minh đã deploy; deploy chưa chứng minh giấy duyệt thật.

## Phiếu bắt buộc cho từng ID, từng revision/hash

Mỗi dòng inventory cần một phiếu riêng; không duyệt gộp 29 bài bằng một câu. Nếu thay revision hoặc byte/hash của ARTICLE/dossier/metadata/SVG, đánh dấu bằng chứng phụ thuộc hết hiệu lực và duyệt lại đúng phạm vi; không kế thừa qua slug.

- [ ] **Identity/provenance:** full subjectId KGNT-Cxx/Exx, slug, title, sourceCommit, ARTICLE path, revision, contentHash SHA-256 byte toàn nguồn, revisionHash theo F0 canonical payload; đường và SHA-256 từng dossier; ghi công cụ/cách tính. Không dùng hash body sau cắt H1/notice thay hash nguồn.
- [ ] **Nguồn khoa học:** reviewer có năng lực đối chiếu từng claim với REFERENCES/CLAIM-AUDIT và nguồn gốc; ghi vị trí/trang/DOI/URL, truy cập toàn văn hay abstract/thứ cấp, quần thể/tuổi/bối cảnh và giới hạn suy rộng; kiểm nguồn có đính chính/rút bài/cập nhật liên quan sát công bố. URL mở được không đồng nghĩa claim đúng. Thiếu quyền truy cập/claim chưa kiểm phải ghi rõ và giải quyết trước duyệt.
- [ ] **An toàn tâm lý:** ngôn ngữ không chẩn đoán/gán nhãn/đổ lỗi; lời khuyên phù hợp THCS–THPT, bối cảnh bắt nạt/gia đình/khủng hoảng, quyền bỏ qua, không ép tự bộc lộ; giới hạn giáo dục và hướng hỗ trợ không gây hiểu nhầm. Kiểm riêng E01–E05 về giá trị/giới hạn công cụ, không biến bài thành trắc nghiệm/chẩn đoán. Không bịa người hỗ trợ hoặc hotline.
- [ ] **Biên tập và học tập:** đúng nguyên văn bản cuối, citation/APA/Bloom/hoạt động/phản hồi/giới hạn; không placeholder/tóm tắt. Thử đọc có kế hoạch phù hợp lứa tuổi, ghi kết quả và xử lý hiểu nhầm; không đưa dữ liệu tâm lý hoặc danh tính trẻ vào repo public.
- [ ] **Reader và khả năng tiếp cận:** kiểm đúng revision trên Reader preview, đủ source-map/AST/text receipts; title/heading/TOC/bảng/nguồn/link/alt/caption/mô tả dài/zoom hình; 320/390/768/1440, keyboard/focus, native zoom 200%, screen reader thật theo tổ hợp/version đã ghi. Ghi ngoại lệ thay vì gọi giả lập là thiết bị thật; hạng mục bắt buộc còn U/BLOCKED không được đánh PASS.
- [ ] **SVG tương ứng:** assetId/path/SHA-256 byte/revision định danh hash, liên kết đúng ARTICLE và revisionHash của bài; caption/alt/mô tả/credit khớp; SVG an toàn không resource ngoài/active content, chữ và ý nghĩa đọc được khi xem lớn. Nhãn revision lịch sử trong hình không tự sửa để giả đồng bộ với ARTICLE.
- [ ] **Quyền tài sản:** xác nhận tác giả/chủ quyền, nguồn gốc/giấy phép hoặc văn bản cho phép, phạm vi web công khai/GitHub Pages/phân phối trong repo, sửa đổi nếu có, điều kiện credit, thời hạn/lãnh thổ/thu hồi, tài sản phái sinh hoặc hình/công cụ được tham chiếu. Lưu chứng cứ quyền cho từng SVG và hash; không tự gán CC hoặc suy hình tự vẽ luôn không vướng quyền. Kiểm quyền font/artwork dùng chung ở gate release riêng.
- [ ] **Năm record F0:** editorialApproval, expertReview, readerQA, learnerReview, publicationAuthorization, mỗi record approved, by người thật, timestamp và scope đúng. Gắn subjectId/revision/contentHash/revisionHash, proof JSON path dưới docs/phase-3/publication-records/ và proof SHA-256 đúng contract. Không dùng internalDraftAcceptance thay một record.
- [ ] **assetRights riêng:** từng SVG có record đúng asset subject/revision/hash và revisionHash bài, proof path/hash, người/ngày/quyết định thật. Quyền chuyên môn và quyền hình không thay thế nhau.
- [ ] **Kiểm chứng con người:** người có thẩm quyền xác minh reviewer/khả năng chuyên môn và giấy phép thực; ghi bằng chứng xác minh và người chịu trách nhiệm. Validator F0 chỉ kiểm consistency/integrity, không chứng thực danh tính/pháp lý. Chỉ đưa bằng chứng tối thiểu đã được phép công khai; không commit hợp đồng hoặc thông tin cá nhân nhạy cảm.
- [ ] **Duyệt cuối:** lỗi/blocker đã đóng, chủ dự án hoặc người được ủy quyền ký đúng bản cuối, ngày/phạm vi publication rõ; mọi review không sau publishedAt, publishedAt hợp lệ/không tương lai theo F0. Việc ghi record/status thật chỉ ở giai đoạn được cấp quyền, không phiên tài liệu.
- [ ] **Kết luận từng bài:** READY hoặc BLOCKED + lý do, người xử lý, chứng cứ còn thiếu; tuyệt đối không suy pending thành approved. P2 kiểm lại eligibility tại thời điểm build; Q1 kiểm lại tại release candidate.

Mẫu kết quả mỗi phiếu: ID/slug; revision; contentHash; revisionHash; source/dossier hashes; SVG path/hash; 5 record + assetRights và proof hashes; nguồn khoa học/an toàn/a11y/quyền; reviewer/ngày/scope; issue còn mở; READY/BLOCKED; người duyệt cuối. Nếu chứng cứ gốc cần giữ riêng, phải có bản chứng cứ tối thiểu tương thích F0 được phép công khai; chưa giải quyết thì BLOCKED, không hạ guard.

## Inventory kiểm duyệt — 29 phiếu và 29 hình

Các revision dưới đây là baseline đã biên soạn, không phải khẳng định bản cuối được duyệt. Hash phải lấy/kiểm từ byte và manifest tại P1; không điền hash hoặc proof giả trong PR kế hoạch. Mỗi trạng thái “Chưa kiểm” nghĩa là chưa có kết luận publication readiness trong phiên này, không phủ nhận nghiệm thu nháp.

| ID | Revision baseline | SVG phải kiểm riêng | Hash/proof và checklist đầy đủ | Kết luận release hiện tại |
|---|---|---|---|---|
| [C01](../drafts/C01/ARTICLE.md) | `c01-draft-r2` | [experience-map.svg](../drafts/C01/experience-map.svg) | Chưa kiểm — cần contentHash/revisionHash/assetHash và 6 loại record | BLOCKED cho tới khi có bằng chứng |
| [C02](../drafts/C02/ARTICLE.md) | `c02-draft-r1` | [before-class-options.svg](../drafts/C02/before-class-options.svg) | Chưa kiểm — cần contentHash/revisionHash/assetHash và 6 loại record | BLOCKED cho tới khi có bằng chứng |
| [C03](../drafts/C03/ARTICLE.md) | `c03-draft-r1` | [mistake-and-response.svg](../drafts/C03/mistake-and-response.svg) | Chưa kiểm — cần contentHash/revisionHash/assetHash và 6 loại record | BLOCKED cho tới khi có bằng chứng |
| [C04](../drafts/C04/ARTICLE.md) | `c04-draft-r1` | [pause-and-choose.svg](../drafts/C04/pause-and-choose.svg) | Chưa kiểm — cần contentHash/revisionHash/assetHash và 6 loại record | BLOCKED cho tới khi có bằng chứng |
| [C05](../drafts/C05/ARTICLE.md) | `c05-draft-r2` | [study-plan.svg](../drafts/C05/study-plan.svg) | Chưa kiểm — cần contentHash/revisionHash/assetHash và 6 loại record | BLOCKED cho tới khi có bằng chứng |
| [C06](../drafts/C06/ARTICLE.md) | `c06-draft-r1` | [first-step.svg](../drafts/C06/first-step.svg) | Chưa kiểm — cần contentHash/revisionHash/assetHash và 6 loại record | BLOCKED cho tới khi có bằng chứng |
| [C07](../drafts/C07/ARTICLE.md) | `c07-draft-r1` | [return-to-learn.svg](../drafts/C07/return-to-learn.svg) | Chưa kiểm — cần contentHash/revisionHash/assetHash và 6 loại record | BLOCKED cho tới khi có bằng chứng |
| [C08](../drafts/C08/ARTICLE.md) | `c08-draft-r1` | [read-feedback.svg](../drafts/C08/read-feedback.svg) | Chưa kiểm — cần contentHash/revisionHash/assetHash và 6 loại record | BLOCKED cho tới khi có bằng chứng |
| [C09](../drafts/C09/ARTICLE.md) | `c09-draft-r1` | [connection-options.svg](../drafts/C09/connection-options.svg) | Chưa kiểm — cần contentHash/revisionHash/assetHash và 6 loại record | BLOCKED cho tới khi có bằng chứng |
| [C10](../drafts/C10/ARTICLE.md) | `c10-draft-r1` | [disagreement-dialogue.svg](../drafts/C10/disagreement-dialogue.svg) | Chưa kiểm — cần contentHash/revisionHash/assetHash và 6 loại record | BLOCKED cho tới khi có bằng chứng |
| [C11](../drafts/C11/ARTICLE.md) | `c11-draft-r1` | [support-without-confronting.svg](../drafts/C11/support-without-confronting.svg) | Chưa kiểm — cần contentHash/revisionHash/assetHash và 6 loại record | BLOCKED cho tới khi có bằng chứng |
| [C12](../drafts/C12/ARTICLE.md) | `c12-draft-r1` | [no-with-an-exit.svg](../drafts/C12/no-with-an-exit.svg) | Chưa kiểm — cần contentHash/revisionHash/assetHash và 6 loại record | BLOCKED cho tới khi có bằng chứng |
| [C13](../drafts/C13/ARTICLE.md) | `c13-draft-r1` | [expectations-and-support.svg](../drafts/C13/expectations-and-support.svg) | Chưa kiểm — cần contentHash/revisionHash/assetHash và 6 loại record | BLOCKED cho tới khi có bằng chứng |
| [C14](../drafts/C14/ARTICLE.md) | `c14-draft-r1` | [conversation-options.svg](../drafts/C14/conversation-options.svg) | Chưa kiểm — cần contentHash/revisionHash/assetHash và 6 loại record | BLOCKED cho tới khi có bằng chứng |
| [C15](../drafts/C15/ARTICLE.md) | `c15-draft-r1` | [support-role-map.svg](../drafts/C15/support-role-map.svg) | Chưa kiểm — cần contentHash/revisionHash/assetHash và 6 loại record | BLOCKED cho tới khi có bằng chứng |
| [C16](../drafts/C16/ARTICLE.md) | `c16-draft-r1` | [listen-and-share-support.svg](../drafts/C16/listen-and-share-support.svg) | Chưa kiểm — cần contentHash/revisionHash/assetHash và 6 loại record | BLOCKED cho tới khi có bằng chứng |
| [C17](../drafts/C17/ARTICLE.md) | `c17-draft-r2` | [sleep-context.svg](../drafts/C17/sleep-context.svg) | Chưa kiểm — cần contentHash/revisionHash/assetHash và 6 loại record | BLOCKED cho tới khi có bằng chứng |
| [C18](../drafts/C18/ARTICLE.md) | `c18-draft-r1` | [rest-options.svg](../drafts/C18/rest-options.svg) | Chưa kiểm — cần contentHash/revisionHash/assetHash và 6 loại record | BLOCKED cho tới khi có bằng chứng |
| [C19](../drafts/C19/ARTICLE.md) | `c19-draft-r1` | [body-signal-context.svg](../drafts/C19/body-signal-context.svg) | Chưa kiểm — cần contentHash/revisionHash/assetHash và 6 loại record | BLOCKED cho tới khi có bằng chứng |
| [C20](../drafts/C20/ARTICLE.md) | `c20-draft-r1` | [movement-options.svg](../drafts/C20/movement-options.svg) | Chưa kiểm — cần contentHash/revisionHash/assetHash và 6 loại record | BLOCKED cho tới khi có bằng chứng |
| [C21](../drafts/C21/ARTICLE.md) | `c21-draft-r1` | [post-and-missing-context.svg](../drafts/C21/post-and-missing-context.svg) | Chưa kiểm — cần contentHash/revisionHash/assetHash và 6 loại record | BLOCKED cho tới khi có bằng chứng |
| [C22](../drafts/C22/ARTICLE.md) | `c22-draft-r1` | [study-and-contact.svg](../drafts/C22/study-and-contact.svg) | Chưa kiểm — cần contentHash/revisionHash/assetHash và 6 loại record | BLOCKED cho tới khi có bằng chứng |
| [C23](../drafts/C23/ARTICLE.md) | `c23-draft-r1` | [new-school-map.svg](../drafts/C23/new-school-map.svg) | Chưa kiểm — cần contentHash/revisionHash/assetHash và 6 loại record | BLOCKED cho tới khi có bằng chứng |
| [C24](../drafts/C24/ARTICLE.md) | `c24-draft-r1` | [exploration-and-reflection.svg](../drafts/C24/exploration-and-reflection.svg) | Chưa kiểm — cần contentHash/revisionHash/assetHash và 6 loại record | BLOCKED cho tới khi có bằng chứng |
| [E01](../drafts/E01/ARTICLE.md) | `e01-draft-r1` | [tool-result-conclusion.svg](../drafts/E01/tool-result-conclusion.svg) | Chưa kiểm — cần contentHash/revisionHash/assetHash và 6 loại record | BLOCKED cho tới khi có bằng chứng |
| [E02](../drafts/E02/ARTICLE.md) | `e02-draft-r1` | [five-dimensions.svg](../drafts/E02/five-dimensions.svg) | Chưa kiểm — cần contentHash/revisionHash/assetHash và 6 loại record | BLOCKED cho tới khi có bằng chứng |
| [E03](../drafts/E03/ARTICLE.md) | `e03-draft-r1` | [six-interest-directions.svg](../drafts/E03/six-interest-directions.svg) | Chưa kiểm — cần contentHash/revisionHash/assetHash và 6 loại record | BLOCKED cho tới khi có bằng chứng |
| [E04](../drafts/E04/ARTICLE.md) | `e04-draft-r1` | [score-context-support.svg](../drafts/E04/score-context-support.svg) | Chưa kiểm — cần contentHash/revisionHash/assetHash và 6 loại record | BLOCKED cho tới khi có bằng chứng |
| [E05](../drafts/E05/ARTICLE.md) | `e05-draft-r2` | [claim-to-practice.svg](../drafts/E05/claim-to-practice.svg) | Chưa kiểm — cần contentHash/revisionHash/assetHash và 6 loại record | BLOCKED cho tới khi có bằng chứng |

## Gate tổng P1 và xử lý thay đổi

- [ ] 29 phiếu READY tại đúng bộ revision/hash cuối, 29/29 SVG có quyền và credit; danh sách ID không thiếu/trùng.
- [ ] Các bằng chứng được người có thẩm quyền xác minh, đủ năm review từng bài và assetRights từng hình; không nhận giấy duyệt mẫu legacy cùng slug.
- [ ] Các vấn đề học thuật, an toàn tâm lý, a11y và bản quyền bắt buộc đã đóng; thử đọc/readerQA có bằng chứng thực.
- [ ] Không thay byte nguồn hoặc tạo revision chỉ để đủ gate; lỗi thực chất cần phiếu và phạm vi sửa riêng, sau đó tính lại hash/duyệt lại.
- [ ] Chốt bộ release candidate cho P2; P1 READY chưa cấp quyền deploy, chưa chứng minh P2/W2/Q1 đạt.

**Một phiếu chưa READY = release BLOCKED.** Không ra mắt thiếu bài, không dùng tóm tắt/placeholder, không tự sửa quyền. Nếu quyền bị thu hồi sau duyệt, mở lại gate và xử lý artifact công khai có kiểm soát.
