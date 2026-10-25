# Tích hợp 29 bài — đề xuất hợp đồng, chưa nhập runtime

Căn cứ main29510528e0cf465b8d709aed3190d9d5e8608de9; kiểm ngày25/10/2026, Asia/Saigon. [Kiểm toán](CURRENT-STATE-AUDIT.md) ghi phương pháp đồng bộ và giới hạn runtime. **Không thêm29 bài vào prototype/editorial/catalogue.json, không đổi published.**

## 1. Kho nguồn đã xác nhận

Có24 core C01–C24 và5 extension E01–E05, không thiếu/trùng ID hoặc slug. Mỗi ID có ARTICLE.md và5 hồ sơ REFERENCES, CLAIM-AUDIT, BLOOM-REVIEW, VISUAL-REVIEW, EDITORIAL-REVIEW, cùng1 SVG: **29 bài +145 hồ sơ +29 SVG =203 tệp**. Nói “174 Markdown” là gồm cả ARTICLE; không phải174 hồ sơ ngoài bài.

Bốn mẫu dùng r2: C01/C05/C17/E05;25 bài B01–B05 dùng r1. ARTICLE h1 khớp matrix29/29. Tất cả có hình và mô tả chữ;20 bài có bảng Markdown. Kiểm link ARTICLE nội bộ không thấy đường thiếu; validators kiểm các dossier/source/claim mapping theo phạm vi riêng, không xác nhận HTTP nguồn hoặc chuyên môn. Các hồ sơ vẫn có pending và phát biểu lịch sử trước nghiệm thu; giữ nguyên, lấy chỉ thị hiện tại làm bằng chứng nghiệm thu nội bộ.

Bảng dưới chốt revision để preview, không phải danh sách xuất bản. Mọi ID có prefix KGNT-; đường nguồn là docs/phase-3/drafts/{ID}/ARTICLE.md. SVG ở cùng thư mục.

| ID / bài | Slug cố định | Revision | SVG |
|---|---|---|---|
| [C01](../drafts/C01/ARTICLE.md) | `hom-nay-minh-cam-thay-gi` | `c01-draft-r2` | [experience-map.svg](../drafts/C01/experience-map.svg) |
| [C02](../drafts/C02/ARTICLE.md) | `lo-lang-truoc-gio-hoc` | `c02-draft-r1` | [before-class-options.svg](../drafts/C02/before-class-options.svg) |
| [C03](../drafts/C03/ARTICLE.md) | `dung-ve-phia-minh` | `c03-draft-r1` | [mistake-and-response.svg](../drafts/C03/mistake-and-response.svg) |
| [C04](../drafts/C04/ARTICLE.md) | `con-gian-truoc-loi-noi` | `c04-draft-r1` | [pause-and-choose.svg](../drafts/C04/pause-and-choose.svg) |
| [C05](../drafts/C05/ARTICLE.md) | `khi-mua-thi-den-gan` | `c05-draft-r2` | [study-plan.svg](../drafts/C05/study-plan.svg) |
| [C06](../drafts/C06/ARTICLE.md) | `chua-bat-dau-hoc` | `c06-draft-r1` | [first-step.svg](../drafts/C06/first-step.svg) |
| [C07](../drafts/C07/ARTICLE.md) | `hoc-va-nho-lau` | `c07-draft-r1` | [return-to-learn.svg](../drafts/C07/return-to-learn.svg) |
| [C08](../drafts/C08/ARTICLE.md) | `sau-bai-kiem-tra` | `c08-draft-r1` | [read-feedback.svg](../drafts/C08/read-feedback.svg) |
| [C09](../drafts/C09/ARTICLE.md) | `o-giua-lop` | `c09-draft-r1` | [connection-options.svg](../drafts/C09/connection-options.svg) |
| [C10](../drafts/C10/ARTICLE.md) | `bat-dong-tinh-ban` | `c10-draft-r1` | [disagreement-dialogue.svg](../drafts/C10/disagreement-dialogue.svg) |
| [C11](../drafts/C11/ARTICLE.md) | `treu-choc-va-bat-nat` | `c11-draft-r1` | [support-without-confronting.svg](../drafts/C11/support-without-confronting.svg) |
| [C12](../drafts/C12/ARTICLE.md) | `noi-khong-ton-trong` | `c12-draft-r1` | [no-with-an-exit.svg](../drafts/C12/no-with-an-exit.svg) |
| [C13](../drafts/C13/ARTICLE.md) | `ky-vong-o-nha` | `c13-draft-r1` | [expectations-and-support.svg](../drafts/C13/expectations-and-support.svg) |
| [C14](../drafts/C14/ARTICLE.md) | `tro-chuyen-voi-nguoi-lon` | `c14-draft-r1` | [conversation-options.svg](../drafts/C14/conversation-options.svg) |
| [C15](../drafts/C15/ARTICLE.md) | `tim-them-su-giup-do` | `c15-draft-r1` | [support-role-map.svg](../drafts/C15/support-role-map.svg) |
| [C16](../drafts/C16/ARTICLE.md) | `khi-ban-rat-buon` | `c16-draft-r1` | [listen-and-share-support.svg](../drafts/C16/listen-and-share-support.svg) |
| [C17](../drafts/C17/ARTICLE.md) | `dem-dai-minh-chua-ngu` | `c17-draft-r2` | [sleep-context.svg](../drafts/C17/sleep-context.svg) |
| [C18](../drafts/C18/ARTICLE.md) | `nghi-mot-chut` | `c18-draft-r1` | [rest-options.svg](../drafts/C18/rest-options.svg) |
| [C19](../drafts/C19/ARTICLE.md) | `tin-hieu-co-the` | `c19-draft-r1` | [body-signal-context.svg](../drafts/C19/body-signal-context.svg) |
| [C20](../drafts/C20/ARTICLE.md) | `van-dong-giua-ngay-hoc` | `c20-draft-r1` | [movement-options.svg](../drafts/C20/movement-options.svg) |
| [C21](../drafts/C21/ARTICLE.md) | `so-sanh-tren-mang` | `c21-draft-r1` | [post-and-missing-context.svg](../drafts/C21/post-and-missing-context.svg) |
| [C22](../drafts/C22/ARTICLE.md) | `dien-thoai-va-chu-y` | `c22-draft-r1` | [study-and-contact.svg](../drafts/C22/study-and-contact.svg) |
| [C23](../drafts/C23/ARTICLE.md) | `lop-moi-truong-moi` | `c23-draft-r1` | [new-school-map.svg](../drafts/C23/new-school-map.svg) |
| [C24](../drafts/C24/ARTICLE.md) | `kham-pha-tuong-lai` | `c24-draft-r1` | [exploration-and-reflection.svg](../drafts/C24/exploration-and-reflection.svg) |
| [E01](../drafts/E01/ARTICLE.md) | `mbti-va-16-kieu-tinh-cach` | `e01-draft-r1` | [tool-result-conclusion.svg](../drafts/E01/tool-result-conclusion.svg) |
| [E02](../drafts/E02/ARTICLE.md) | `big-five` | `e02-draft-r1` | [five-dimensions.svg](../drafts/E02/five-dimensions.svg) |
| [E03](../drafts/E03/ARTICLE.md) | `holland-riasec` | `e03-draft-r1` | [six-interest-directions.svg](../drafts/E03/six-interest-directions.svg) |
| [E04](../drafts/E04/ARTICLE.md) | `stress-va-cong-cu-sang-loc` | `e04-draft-r1` | [score-context-support.svg](../drafts/E04/score-context-support.svg) |
| [E05](../drafts/E05/ARTICLE.md) | `phong-cach-hoc-tap` | `e05-draft-r2` | [claim-to-practice.svg](../drafts/E05/claim-to-practice.svg) |

Báo cáo lô: [B01](../batches/B01/REVIEW.md), [B02](../batches/B02/REVIEW.md), [B03](../batches/B03/REVIEW.md), [B04](../batches/B04/REVIEW.md), [B05](../batches/B05/REVIEW.md); [bốn mẫu](../audit-3-2/FINAL-AUDIT.md). Không dùng trường outline_only/sourceVerification:not_started trong matrix lịch sử để phủ nhận các ARTICLE đã có, cũng không tự sửa matrix thành approved.

## 2. Hai nguồn đang khác nhau

- **Nguồn biên tập đúng:** ARTICLE và dossier trong docs. Không có frontmatter chuẩn chung; revision/notice nằm Markdown; metadata ID/slug/topic/season/keywords/topicIds/relatedArticleIds ở matrix và hồ sơ.
- **Nguồn UI cũ:** catalogue có4 bài minh họa ngắn và1 topic dem-dai. C03/C05/C09/C17 đã có slug trùng kế hoạch; phải giải quyết bằng adapter có ưu tiên rõ, không nối hai mảng rồi duplicate. C03 mẫu cũ tên “Học cách đứng về phía mình”, bài nghiệm thu tên “Một sai sót không kể hết về bạn”; giữ slug dung-ve-phia-minh, dùng đúng tên bài nghiệm thu trong preview mới.
- Homepage legacy ba excerpt và weekly cũ là mẫu UI, không phải nguồn29 bài hoặc bản tóm tắt được duyệt của chúng.
- Article.sections hiện chỉ heading/paragraphs/note; sources chỉ title/url. Không thể nhận Markdown bằng cách đặt cả bài vào paragraphs hay tự chép sang29 JSON.
- T01–T09 trong matrix mới là planned-topic; không suy thành chuyên đề được duyệt tên/lịch hoặc quyền xuất bản.

## 3. Hợp đồng đề xuất F0

Tách manifest định danh, nội dung nguồn, bằng chứng biên tập và view model. Tên tệp dưới đây là dự kiến, chưa tạo.

| Thành phần | Trường tối thiểu / quy tắc |
|---|---|
| SourceManifest | schemaVersion; id; slug; sourcePath; sourceCommit; revision; contentHash; dossierPaths; assetPaths. ID ổn định không theo index; slug cũ không đổi; hash là SHA-256 byte nguồn của ARTICLE và từng tài sản/hồ sơ liên quan |
| Metadata | title lấy từ h1; collection/topic/season/keywords/audience/topicIds/relatedArticleIds từ nguồn metadata được chọn; excerpt/deck/readingMinutes không tự viết mới. Deck lấy đoạn nguồn được chủ dự án chọn bằng selector/vị trí, hoặc bỏ khi chưa có; readingMinutes tính minh bạch, không lấy số cũ giả thành thời lượng thật |
| ParsedArticle | AST GFM gồm paragraph, emphasis/strong, heading2–3, ordered/unordered list, table, blockquote, figure, link, linebreak. heading IDs ổn định, duy nhất, không xung đột nguon; unknown syntax/asset/anchor → báo lỗi, không bỏ âm thầm |
| References | Bibliography trình bày từ nguyên phần “Tài liệu tham khảo” ARTICLE, giữ APA7/tác giả/năm/n.d.-a/b/URL. REFERENCES.md là dossier đối chiếu, không phải bản thư mục thứ hai để biên tập thủ công. Source IDs/claim map chỉ dùng validate; rich metadata có thể trích từ sổ hiện hữu, không cấp verified tự động |
| Figure | assetId/path/hash/revision; alt lấy Markdown; caption và longDescription lấy các block kế tiếp theo quy tắc có kiểm; credit/rights từ VISUAL-REVIEW hoặc asset-index. Không copy cùng alt/caption vào ba tệp mới để tự lệch |
| Learning | Giữ nguyên hoạt động, câu hỏi và phản hồi trong ARTICLE; mục tiêu/alignment từ BLOOM-REVIEW chỉ phục vụ kiểm. Không áp ba nhãn Bloom cứng lên UI; không chấm điểm, thêm biểu mẫu bắt kể chuyện riêng hoặc suy luận tâm lý |
| ReviewRecord | kind: internalDraftAcceptance/editorialApproval/expertReview/readerQA/assetRights/publicationAuthorization; revision+hash/phạm vi; người thật/ngày/bằng chứng khi có; pending khi chưa có. Không đẩy dữ liệu cá nhân nhạy cảm vào repo public |
| RuntimeArticleView | Đầu ra adapter đủ cho ArticleCard/Reader/TOC/related. PreviewView và PublicView được chọn trước serialize/copy assets, không phải client toggle. Contract mở cho mục30+, không max29 |
| TopicView / stage | topicId/slug/title/intro/orderedArticleIds; weekly schedule riêng. stage key ổn định ánh xạ4 nhãn và query giai-doan hiện tại; không đổi query cũ âm thầm |

Manifest đầu tiên có thể sinh từ matrix + ARTICLE + sổ lô; commit/pin và review29 hàng metadata **một lần**. Matrix không dùng làm nguồn trạng thái phê duyệt và không runtime-import trực tiếp. Sau khi chốt manifest là metadata phục vụ tích hợp, validate nó so ID/slug đã dành và phát hiện thay đổi; không tạo hai nguồn metadata cùng được sửa mà không quy tắc ưu tiên.

Hồ sơ r2 mẫu không cùng cấu trúc JSON với sổ B01–B05; dùng extractor rõ theo nguồn, fail với trường thiếu/mâu thuẫn. Ngoại lệ trình trong báo cáo adapter, không regex “đoán” chuyên môn, license hoặc trạng thái từ chữ PASS.

### Hướng render và bảo toàn nguyên văn

1. Đọc nguồn **lúc build preview cục bộ** qua build-side adapter; parser Markdown GFM đã chọn/version lock sau duyệt F0. Không thực thi MDX, script hoặc HTML thô, không dangerouslySetInnerHTML với chuỗi chưa lọc.
2. H1 và notice đầu bài có thể đưa vào title/status component bằng source map, bảo toàn nội dung và revision. Nhãn UI “Bản nháp đã nghiệm thu nội bộ; chưa phê duyệt chuyên môn/chưa được phép xuất bản” tách khỏi nội dung, không sửa ARTICLE để đổi lịch sử.
3. Không trộn/viết lại đoạn, đổi citation hoặc xóa giới hạn. Cho phép khác bố cục để đọc, không làm mất câu hoặc thứ tự học. So text tokens/blocks với nguồn sau normalize có quy tắc; mọi khác biệt phải có vị trí/rationale.
4. Figures dùng img từ asset đã kiểm allowlist và pipeline tương ứng; SVG không inline DOM tùy tiện. Cấm script/event/foreignObject/external href/URL/entity, path traversal và remote resource. Giữ alt/caption/long description hiện có; zoom/xem lớn bằng bàn phím, mô tả chữ luôn đọc được. Không sửa hình để đạt cỡ chữ khi chưa được phép.
5. Bảng có header semantics và wrapper cuộn riêng trên hẹp, không làm tràn toàn trang. Heading2–3 sinh TOC có cấp, slug normalize tiếng Việt và xử lý trùng ổn định; liên kết anchor reload/focus như route cũ.
6. Hoạt động/đáp án hiển thị nguyên văn trước; chỉ thêm disclosure nếu chủ dự án chọn sau. Đọc thụ động đủ dùng, không cần backend hoặc lưu tiến độ.
7. Link tương đối ARTICLE→REFERENCES/VISUAL-REVIEW không được phát raw dossier vào public hoặc thành404. Adapter nhận diện nhóm “hồ sơ biên tập”: preview có panel provenance được chọn; public khi sau này được phép chỉ dẫn tới nguồn/credit công khai được duyệt hoặc không render nhóm link dossier theo rule đã review. Không đụng citation/nguồn học thuật; báo cáo mọi link bị chuyển cách hiển thị.
8. Related/topic/stage/card resolve từ cùng tập eligibility, giữ quan hệ ID→slug qua adapter. Không suy ra related từ vị trí mảng, không hardcode đủ29. Legacy liên kết vẫn có hành vi kiểm thử tới đúng slug.

## 4. Preview an toàn đề xuất

**Khuyến nghị:** build/dev entry riêng chỉ cho chủ dự án chạy local loopback127.0.0.1, chọn đúng29 revision trong bảng. Tái dùng Reader/component UI, giữ banner và revision xuyên suốt. Không host server DEV bằng0.0.0.0 hoặc tunnel công khai để gọi là “nội bộ”. Nếu cần xem từ xa, cần quyết định công cụ/access riêng; noindex hay URL khó đoán không là kiểm soát truy cập. Không thêm login/backend trong phạm vi này.

- Preview loader/manifest/Markdown/SVG nằm ngoài dependency graph public; không eager glob toàn kho rồi lọc ở browser.
- Production vẫn entry hiện tại, published-only, catalogue chưa có29 bài, topic/homepage không trỏ nháp. Không query/localStorage/env phía client mở bài.
- Preview build output nằm work/riêng, không public/, không dist production hoặc deployment archive; provenance/hồ sơ chỉ dùng khi cần, không serve cả docs.
- Máy preview chỉ đọc dữ liệu tác vụ; không export/cache/service-worker nháp vào public. Không tạo Service Worker mới.
- Hai build chạy clean thư mục riêng, CI quét production cả filename/content/escaped text/raw MD/JSON/SVG/map và sentinel từ29 bài, revision, hình, fixture. Vì slug có thể trùng nội dung đã được cấp quyền sau này, scanner phân loại theo revision/eligible source, không blacklist một slug mãi mãi.
- Test URL trực tiếp/hash/query/tải asset phải không tìm được nội dung nháp ở build public; production empty vẫn là kết quả đúng. Một preview dùng nháp thật phải được cấp quyền triển khai riêng sau PR kế hoạch này.
- Repository hiện **public**: ARTICLE và dossier đã đọc được từ GitHub. Guard/loopback bảo vệ ranh giới website, **không thể bảo mật ngược nội dung đã nằm trên repo public**.

## 5. Gate xuất bản riêng, chưa thực hiện

Hiện chỉ internalDraftAcceptance=29/29 theo chỉ thị chủ dự án. Không tự điền editorialApproval/expertReview/publicationAuthorization; không sửa chữ pending trong hồ sơ lịch sử.

Sau này publicEligible phải đồng thời: status published + revision/hash đúng bản cuối + duyệt biên tập/chuyên môn thật đúng phạm vi + QA reader/thử đọc cần thiết + quyền từng tài sản/credit + chủ dự án cấp quyền xuất bản rõ + publishedAt hợp lệ. Metadata kiểm được định dạng/liên kết, không thay việc xác minh người thật. Sửa ARTICLE/figure/hồ sơ có ý nghĩa làm hash đổi phải invalidate approval phụ thuộc, không kế thừa nhờ slug giống.

F0 chỉ xây validator và test âm bằng fixture tổng hợp ở test-only; **không tạo dữ liệu published giả cho29 bài**. C1 chỉ preview. Việc chọn bài và kích hoạt xuất bản/deploy là PR/chỉ thị tương lai ngoài roadmap triển khai này.

## 6. Không mở lại vòng biên tập

Không tái viết29 bài để hợp schema. Nếu adapter/preview phát hiện lỗi thực chất: ghi ID/revision+tệp/vị trí, vấn đề, lý do, mức độ, sửa đề xuất và kiểm phụ thuộc; trình riêng trước sửa nội dung. Bố cục/độ dài khác nhau hoặc muốn câu “mượt hơn” không là lỗi. Pending chuyên môn không cản engineering preview đã được phép, nhưng vẫn chặn công bố.
