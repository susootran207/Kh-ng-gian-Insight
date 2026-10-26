# P1C — Quyết định chủ dự án đáp ứng gì trong F0?

Đọc cùng [quyết định](OWNER-DECISION.md), [29 dòng phạm vi](ARTICLE-STATUS.md), [F0-CONTRACT](../integration-plan/F0-CONTRACT.md), [source-contract.ts](../../../prototype/editorial/source-contract.ts) và [assertRecord/assertPublication](../../../prototype/build/content-contract.ts).

## Phân loại tại thời điểm ghi nhận

| Yêu cầu | Quyết định P1C có thể đáp ứng hợp lệ | Điều chưa có / trạng thái |
|---|---|---|
| Chấp thuận nội dung của chủ dự án | **Có, đã ghi nhận 29/29**, theo chỉ thị thật, gắn inventory/hash hiện tại | Không phải trạng thái publication hoặc một loại gate mới trong mã |
| `editorialApproval` | **Có căn cứ về ý nghĩa chấp thuận nội dung/biên tập của chủ dự án**; không yêu cầu thực hiện lại kiểm toán AI | Chưa đủ record/proof F0: người xác nhận dùng định danh được phép công khai, thời điểm xác nhận thực, scope từng ID/revision/hash và proof đúng schema/hash. Chưa biến tài liệu này thành record máy đọc; **PENDING/BLOCKED record** |
| `expertReview` | Không. Chủ dự án không tuyên bố chuyên môn độc lập và không được gán vai này tự động | Người có năng lực phù hợp rà nguồn/claim/an toàn/lứa tuổi thật, ghi giới hạn và xử lý các vấn đề bắt buộc. **BLOCKED** |
| `readerQA` | Không. “Đã đọc” không tự chứng minh source/AST/DOM, điều hướng, accessibility và các tổ hợp thiết bị đã kiểm | Tái sử dụng bằng chứng C1/R1 còn hợp phạm vi, bổ sung native zoom/screen reader/thiết bị và việc bắt buộc còn thiếu; người chịu trách nhiệm xác nhận đúng bản. **BLOCKED** |
| `learnerReview` | Không. Nghiệm thu nội dung của chủ dự án không chứng minh thử đọc phù hợp THCS/THPT đã thực hiện | Người tổ chức/người có trách nhiệm cung cấp kết quả thật về tải đọc/hiểu nhầm/Bloom/khả năng tiếp cận; không công khai dữ liệu trẻ. **BLOCKED** |
| `assetRights` cho 29 SVG | Không. Lời chấp thuận nội dung không xác nhận nguồn gốc/chủ quyền/license/phạm vi phân phối của hình | Người có quyền hoặc người xác minh quyền cung cấp căn cứ thật cho từng SVG/hash và credit; không tự gán CC/độc quyền. **BLOCKED** |
| `publicationAuthorization` | Không. Ý muốn chuẩn bị V1.0 chưa phải quyền công bố đúng bản/phạm vi | Chủ dự án/người có thẩm quyền ra quyết định **riêng, rõ ràng** sau khi các gate bắt buộc đủ bằng chứng. **BLOCKED** |
| Tính toàn vẹn ID/revision/hash | Đã đối chiếu với main và P1A; không thay nguồn | PASS kỹ thuật không thay chuyên môn/quyền; thay byte thì review phụ thuộc phải kiểm lại |
| PublicView đủ 29 bài / chuyển sang P2 | Không đạt ở P1C | Cả 29 bài vẫn draft, publication/publishedAt=null, 29 asset.rights=null; chưa có bundle đầy đủ. **BLOCKED** |

Không phủ nhận quyết định nội dung đã xảy ra, cũng không coi giấy ghi quyết định là proof F0 hợp lệ chỉ vì nằm trong GitHub. Tên tài khoản repository/tác giả commit không tự là `by` của người duyệt. Trợ lý ghi tài liệu không được ký thay chủ dự án.

## Hình thức F0 hiện hành — không đổi contract

Năm record mỗi bài cần đúng `kind`, `subjectId`, `revision`, `contentHash`, `revisionHash`, `decision`, `by`, `at`, `evidence.path`, `evidence.sha256`. Proof là JSON dưới `docs/phase-3/publication-records/`; byte/hash và các trường scope/decision/người/ngày phải khớp record. `decision` chỉ được ghi nhận khi người thật thực sự xác nhận; không mặc định từ mẫu trống.

AssetRights dùng `subjectId` của asset, `revision` của asset và `contentHash` bằng SHA-256 SVG, **`revisionHash` vẫn của bài sở hữu**. Không dùng ID bài làm asset subject hoặc lấy article contentHash thay SVG hash. Mỗi review có ngày thực; không sau publishedAt. PublishedAt không tương lai theo F0; P1C không đặt giá trị này.

Cần 145 record review bài và 29 record quyền hình khi hoàn tất bộ 29 bài, tương ứng 174 phạm vi bằng chứng; **không có nghĩa 174 cuộc họp, người duyệt hoặc chữ ký khác nhau**. Có thể thu theo nhóm trong một buổi/báo cáo, nhưng từng ID/hash/kind phải có kết luận và proof tương thích riêng. Báo cáo chung có thể được dẫn trong bằng chứng tối thiểu, không dùng một object proof có subject khác để vượt kiểm.

F0 chỉ kiểm consistency/integrity; người có thẩm quyền phải xác minh bằng chứng thật và phạm vi năng lực/quyền. Mã không kiểm danh tính không phải lỗ hổng để điền tên bất kỳ. F0 không buộc mọi vai khác nhau; dùng cùng người cho nhiều vai chỉ khi họ thực sự thực hiện và đủ năng lực/thẩm quyền từng vai, vẫn giữ tính độc lập mà checklist chuyên môn yêu cầu. Không gán chủ dự án thành expert/learner/QA từ một lời xác nhận nội dung.

## Blocker P1A sau quyết định mới

- Chấp thuận nội dung của chủ dự án: **đã ghi nhận** trong P1C, không cần kiểm toán AI lặp lại.
- SRC-01/SAFE-01: **UNVERIFIED/BLOCKED** về xác minh ngoài/chuyên môn; không tuyên bố nguồn đã sai hoặc đã được kiểm lại. Chuyển phiếu có sẵn cho người rà có năng lực, không tạo thêm một báo cáo AI cùng nội dung.
- LEARN-01/A11Y-01/RIGHTS-01: **BLOCKED** cho tới khi có hoạt động/bằng chứng thực đúng loại.
- AUTH-01: **BLOCKED**, gồm record editorial chưa hoàn thiện và các gate còn thiếu; quyết định nội dung không tự đóng toàn bộ AUTH-01.

Không có waiver hoặc phương án tắt guard được đề xuất. Chủ dự án có thể tự xác nhận phần mình có thẩm quyền và dữ kiện thật; phần mình chưa làm/chưa biết cần người phù hợp hoặc giữ BLOCKED. Không xác nhận khống để rút ngắn thủ tục.
