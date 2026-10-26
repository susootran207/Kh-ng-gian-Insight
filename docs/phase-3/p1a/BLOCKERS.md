# P1A — Blocker và thứ tự xử lý

Mức P1 ở đây nghĩa cần giải quyết trước kết luận sẵn sàng phê duyệt/công bố; P2 là truy vết hoặc kiểm bổ sung cần người duyệt quyết định, không tự miễn gate. Không có lỗi kỹ thuật mất nguồn hoặc đề nghị viết lại hàng loạt được phát hiện. Những ghi chú provenance đã được giải thích không tính là lỗi ARTICLE.

## Blocker chung áp dụng cho29 bài

| ID / ưu tiên | Bằng chứng tại P1A | Việc cần xử lý / người theo vai trò | Điều kiện đóng |
|---|---|---|---|
| SRC-01 / P1 |119/119 URL bị proxy CONNECT403;0 nội dung bên ngoài tải được. Hồ sơ cũ là AI claim-scoped partial. | Người rà học thuật mở bản hợp pháp tại các vị trí được pin; kiểm tuổi/thiết kế/claim, metadata và corrections/retractions. | Mọi claim thực dùng có bằng chứng kiểm trực tiếp hoặc nguồn thứ cấp/abstract được chấp nhận có lý do trong phạm vi đúng; phần thiếu vẫn UNVERIFIED. |
| SAFE-01 / P1 | Chưa có chuyên gia độc lập được chứng minh trong publication bundle; có ma trận HIGH và giới hạn nội bộ. | Mời chuyên môn phù hợp từng phiếu, rà nội dung/hoạt động/phản hồi, hỗ trợ an toàn/không kỳ thị. | Kết luận thực gắn đúng revision/hash, issue bắt buộc đóng, năng lực/người/phạm vi được xác minh. |
| LEARN-01 / P1 | Chưa có thử đọc người học/giáo viên thật; thiết kế Bloom không đo kết quả. | Biên tập và người tổ chức thử đọc kiểm THCS/THPT, thuật ngữ/tải đọc/hiểu nhầm. | Bằng chứng learnerReview thực, không dữ liệu tâm lý/danh tính trẻ trong repo public. |
| A11Y-01 / P1 | Native zoom200%, screen reader thật, thiết bị thật chưa xác minh mới; C1 browser là lịch sử. | ReaderQA theo HANDOFF/QA-PLAN; chú ý C01/C05 chữ scale nhỏ, C17/E02 hình dài. | Bằng chứng tổ hợp/version/SHA, không biến viewport/CSS zoom thành native/thiết bị thật. |
| RIGHTS-01 / P1 |29 asset.rights=null; VISUAL ghi quyền công bố/credit pending. | Người xác minh quyền kiểm provenance/điều kiện công cụ/tài sản phái sinh/credit/phạm vi thật cho từng hash SVG. | AssetRights/proof thật phù hợp F0 và được phép công khai tối thiểu; không tự gán CC. |
| AUTH-01 / P1 |29 publication=null/publishedAt=null, chưa đủ5review và assetRights. | Chủ dự án/người có thẩm quyền kiểm thật các loại bằng chứng sau khi các bước trên đủ. | Đủ đúng29/29 revision/hash và29 quyền SVG; chỉ tạo record/status trong giai đoạn được cấp phép riêng. |

Thiếu record trong repository không chứng minh không có tài liệu riêng ngoài repo; P1A chưa nhận/kiểm tài liệu ấy. Người có thẩm quyền phải xác minh, không lấy tự khai hoặc test fixture làm bằng chứng thật.

## Ghi nhận riêng từng bài

13 ghi nhận dưới đây gồm **ghi chú lịch sử, phạm vi nguồn và lỗi truy vết**, không phải13 lỗi học thuật mới. Xem từng phiếu để đi tới dòng cố định của ARTICLE/REFERENCES/CLAIM/VISUAL. Các dòng nguồn còn giữ nguyên.

| ID / bài / mức | Bằng chứng cụ thể | Xử lý đề nghị ngoài P1A |
|---|---|---|
| C01-01 / [KGNT-C01](articles/C01.md) / P2 (provenance-note) | REFERENCES tiêu đề còn c01-draft-r1; EDITORIAL-REVIEW giải thích REFERENCES giữ nguyên khi r2 | Người duyệt đọc đúng hash r2 trong manifest, không suy header dossier cũ là grant hoặc tự sửa lịch sử. |
| C03-01 / [KGNT-C03](articles/C03.md) / P1 (bibliographic-metadata) | REFERENCES NEFF03 ghi PDF DOI 10.1080/15298860390129863 nhưng ARTICLE APA dùng 10.1080/15298860309032; dossier giữ chênh lệch chưa giải quyết | Xác nhận nhà xuất bản/Crossref/PDF chính xác trước ký duyệt; không tự thay DOI trong P1A. |
| C04-01 / [KGNT-C04](articles/C04.md) / P2 (source-version) | REFERENCES mục NHS23G ghi last reviewed 24/4/2023, next due 24/4/2026 đã qua; P1A bị chặn proxy khi mở lại. | Người rà mở bản hiện hành và ghi phiên bản/thay đổi thật; không đổi năm sang 2026 tự động. |
| C05-01 / [KGNT-C05](articles/C05.md) / P2 (provenance-note) | REFERENCES/VISUAL/SVG ghi r1; EDITORIAL r2 giải thích giữ nguyên byte và không cần sửa chỉ để đổi nhãn. | Gắn người duyệt với hash manifest của asset; không suy nhãn r1 là sai hình và không sửa lịch sử. |
| C07-01 / [KGNT-C07](articles/C07.md) / P2 (abstract-scope) | REFERENCES C07-AGARWAL: abstract_only; CLAIM C07-05 giới hạn 2 nhận xét abstract | Người rà xác nhận hai câu có đủ hỗ trợ từ abstract; không mở rộng phương pháp hoặc tuổi ngoài phần đã đọc. |
| C09-01 / [KGNT-C09](articles/C09.md) / P2 (claim-location-drift) | CLAIM-AUDIT C09-01/02/03 dùng nhãn heading cũ không khớp nguyên văn heading hiện tại; nội dung liên quan ở ARTICLE14,20,40/68. | Phiếu P1A trỏ đúng dòng hiện tại; người rà đối chiếu nội dung và ghi chú traceability, không viết lại bài hoặc sửa dossier cũ trong P1A. |
| C15-01 / [KGNT-C15](articles/C15.md) / P2 (dossier-wording) | REFERENCES.md dòng 42 ghi “Hoạt động vận động của bài” trong hồ sơ bài tìm hỗ trợ. | Người duyệt làm rõ cụm từ và phạm vi hoạt động thực dùng; P1A không sửa hồ sơ lịch sử. |
| C19-01 / [KGNT-C19](articles/C19.md) / P2 (claim-traceability) | VISUAL-REVIEW.md dòng 7 dẫn C19-01–04 nhưng CLAIM-AUDIT chỉ có C19-01–03 và C19-E1. | Người duyệt xác nhận phạm vi hình theo ba claim hiện có và E1; không tạo claim 04 giả hoặc suy thiếu bằng chứng học thuật từ lỗi dẫn dải ID. |
| C21-01 / [KGNT-C21](articles/C21.md) / P1 (source-version) | REFERENCES.md dòng 9–16: nội dung Festinger đọc qua bản chép tái dàn; chưa xem scan/trang publisher. | Đối chiếu Hypotheses I–II với bản ghi gốc hợp pháp; ghi bản/trang và sai khác nếu có, không tự tuyên bố bản chép chính xác. |
| C22-01 / [KGNT-C22](articles/C22.md) / P2 (claim-traceability) | VISUAL-REVIEW.md dòng 7 dẫn C22-01–03 nhưng CLAIM-AUDIT có C22-01–02 và E1. | Xác nhận phạm vi hình theo hai claim và phần biên tập; không tạo claim 03 giả. |
| C22-02 / [KGNT-C22](articles/C22.md) / P1 (source-version) | REFERENCES.md dòng 9–16 ghi Monsell qua mirror psychfiles.net, chưa bản tác giả/publisher. | Đối chiếu phiên bản/metadata và phần dùng với bản hợp pháp đáng tin; không coi quyền đọc mirror là quyền tái bản. |
| E02-01 / [KGNT-E02](articles/E02.md) / P1 (source-version) | REFERENCES.md dòng 21–27: John 2008 là author draft, phân trang khác bản sách. | Người duyệt đối chiếu các định nghĩa/lịch sử đang dùng với bản xuất bản hoặc ghi căn cứ chấp nhận đúng bản thảo; không đổi số trang tự động. |
| E05-01 / [KGNT-E05](articles/E05.md) / P1 (unresolved-source-reporting) | REFERENCES.md mục Chênh lệch số g: Abstract 0,31, Results/Table 3 0,32; chưa giải thích. ARTICLE/SVG không dùng số g. | Người duyệt kiểm đính chính/PDF hoặc ghi quyết định có căn cứ cho nhận định định tính; không buộc thêm số, không tự chọn một số hoặc phủ định toàn nguồn. |

C01/C05: ghi chú r1 được giữ byte trong r2 có giải thích EDITORIAL; **không yêu cầu đổi nhãn/SVG hoặc tạo revision hình thức**. C17/E05 cũng giữ REFERENCESr1 theo giải thích r2. C09/C19/C22 và cụm từ ở C15 là vấn đề định vị/hồ sơ cụ thể, chưa đủ để kết luận claim trong ARTICLE sai.

## Ngoại lệ phạm vi cần người duyệt giữ đúng

| Bài / nhóm | Điều đã biết từ hồ sơ lịch sử | Cách xử lý hợp phạm vi |
|---|---|---|
| C01, C17, E05 | Nguồn S03/Carskadon/Fallace có phần chưa đọc và bị loại khỏi ARTICLE. | Không mở rộng claim/lịch sử/cơ chế từ đầu mối chưa đọc; không ép truy cập nguồn bị loại để làm đẹp số lượng. |
| C07, C23 | Agarwal2021/Jindal-Snape2020 chỉ abstract cho nhận xét hẹp. | Người duyệt đối chiếu câu thực dùng và abstract; muốn mở rộng mới cần thân bài. Không tự gọi abstract là toàn văn. |
| C04 | Định nghĩa trước đó qua Compas; NHS anger đã quá ngày dự kiến review theo hồ sơ. | Giữ dẫn thứ cấp đúng, kiểm phiên bản NHS; quá review due không tự làm nguồn sai/hết giá trị. |
| C09 | Loades AAM Bristol, không bản publisher đã được đọc; giới hạn quyền nguồn riêng. | Kiểm đúng bản/đính chính và phạm vi, không coi AAM hoặc giấy phép nguồn là quyền SVG mới. |
| C21, C22, E02 | Bản chép Festinger / mirror Monsell / author draft John. | Đối chiếu phiên bản và trang hợp pháp; ghi căn cứ chấp nhận hoặc vấn đề thật, không tự đổi nội dung. |
| E01 | Provider có lợi ích thương mại, Form M tiếng Anh khác các form/NERIS; Stein lý thuyết khác Erford tâm trắc. | Người có chuyên môn đánh giá đúng câu hỏi và phiên bản, không quảng bá hoặc bác bỏ quá mức. |
| E03, E04 | Holland/Cohen1983 được dẫn qua manual/CMU thứ cấp, bản Việt/tuổi chưa xác minh cho triển khai test. | Bài giáo dục không có test; giữ giới hạn, không gán firsthand hoặc cấp quyền/công cụ. |
| E05 | Nguồn2024 chênh g0,31/0,32, bài dùng định tính; năm số báo2008 của Pashler khác chuỗi DOI2009. | Không chọn/thêm số hoặc đổi năm tự động. Quyết định khoa học có căn cứ phải được người duyệt ghi lại. |

## Thứ tự xử lý đề nghị

1. Giao29 phiếu và bộ hash cho người rà học thuật/quyền; bố trí truy cập hợp pháp ngoài môi trường proxy bị chặn. Ưu tiên C03, C21/C22/E02, E05 và các bài HIGH/y tế/bảo vệ trẻ em, vẫn rà đủ29 bài.
2. Xác minh claim/phiên bản/corrections và quyền29 SVG song song về tổ chức; chưa có bằng chứng thì giữ UNVERIFIED. Không liên hệ người ngoài tự động từ tác vụ này.
3. Người có chuyên môn rà an toàn, biên tập/APA/Bloom; chỉ đề nghị sửa khi có vị trí/bằng chứng/phạm vi cụ thể và được chủ dự án cấp phép đợt riêng.
4. Thử đọc THCS/THPT và ReaderQA/native zoom/screen reader/thiết bị đúng revision sau khi các vấn đề liên quan đã được xử lý.
5. Người có thẩm quyền xác minh bằng chứng thật, quyết định đầy đủ các gate theo checklist P1. P1A chỉ chuẩn bị hồ sơ; không tự làm bước cấp quyền hoặc bắt đầu P1B.

Theo phương án A: một bài hoặc quyền hình còn thiếu thì release BLOCKED; không mở28/29, không placeholder, không tắt guard. Merge bản kiểm toán không đồng nghĩa phê duyệt29 bài.
