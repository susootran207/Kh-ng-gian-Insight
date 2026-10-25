# F0 — Contract nguồn và publication boundary

Ngày 25/10/2026 (Asia/Saigon). Phạm vi được chủ dự án cấp riêng sau nghiệm thu PR #17. Nền main: `498fcf656098aaf4338744f8a289200c01eec26a`. Đây là triển khai F0, không triển khai R1/Reader, preview 29 bài hoặc các phân hệ website.

## 1. Tái sử dụng kiến trúc hiện có

Giữ virtual:editorial và schema Catalogue cho giao diện Phase 2. Không thêm router, renderer hoặc catalogue chạy song song. Plugin build/editorial.ts vẫn là điểm chọn dữ liệu duy nhất cho giao diện hiện tại; nó kiểm manifest ở phía build nhưng **không serialize manifest/Markdown/PreviewView vào module browser**.

Một manifest nguồn riêng là hợp đồng cho việc tích hợp sau này, không phải 29 JSON prose. ARTICLE.md vẫn là nguồn gốc. Types mới nằm trong editorial/source-contract.ts; schema.ts tái sử dụng cùng EditorialStatus và thêm kiểu bằng chứng xuất bản tùy chọn cho các mẫu cũ. Chỉ status published mới bắt buộc có đủ bằng chứng mới; approval cũ một mình không còn cấp quyền.

## 2. Manifest sinh từ nguồn

`prototype/editorial/source-manifest.json` được sinh từ matrix + ARTICLE + năm dossier và SVG mỗi bài:

| Trường | Ý nghĩa / kiểm |
|---|---|
| schemaVersion | 1; từ chối phiên bản không biết |
| sourceCommit | SHA Git 40 ký tự của nền nguồn; byte tệp được kiểm bằng SHA-256, đối chiếu Git tree được ghi ở F0-REVIEW |
| id / slug | ID KGNT-Cxx/Exx và slug ổn định; không lấy index mảng; không trùng |
| revision | Đọc nhãn duy nhất trong ARTICLE, đối chiếu ID; không tự tạo r2 |
| source / contentHash | Đường ARTICLE và SHA-256 byte nguyên tệp; contentHash phải bằng source.sha256 |
| metadata | H1 title; collection, topic, season, keywords, audience, Bloom, topicIds, relatedArticleIds từ matrix; đối chiếu lại lúc load |
| referenceUrls | URL HTTPS trong bibliography ARTICLE; đối chiếu lại tập URL, không xác nhận khoa học hoặc HTTP khả dụng |
| dossiers | Đúng năm REFERENCES/CLAIM-AUDIT/BLOOM-REVIEW/VISUAL-REVIEW/EDITORIAL-REVIEW, đường chuẩn và hash từng tệp |
| assets | Đọc tham chiếu hình từ ARTICLE; đường/hash/alt; asset revision định danh bằng SHA-256 byte, không giả số v2; rights=null lúc sinh |
| revisionHash | SHA-256 canonical JSON của ID/slug/revision/source/contentHash/metadata/URLs/dossiers/assets; không gồm status hoặc các record cấp quyền để tránh vòng hash |
| status / publication / publishedAt | Khi sinh: draft / null / null. Không suy trạng thái từ chữ PASS trong hồ sơ hoặc matrix outline_only |
| topicRegistry | Chỉ ID và membership dự kiến; không prose, lịch hoặc quyền công bố chuyên đề |

Bloom trong manifest là metadata mục tiêu của matrix, không tuyên bố kết quả học thực tế hoặc thay phần hoạt động/phản hồi trong ARTICLE/BLOOM-REVIEW. Caption/credit/mô tả dài vẫn ở nguồn đã pin, chưa sao chép thành trường biên tập trùng lặp. R1 sẽ chốt AST GFM/parser và source map; F0 không parse/render GFM.

Validator không có max 29. Baseline 29 chỉ nằm trong test nghiệm thu; fixture thứ 30 dùng cùng generator và validator. Tên thư mục draft ngoài registry bị từ chối để tránh bỏ sót nguồn mới.

### Lệnh bảo trì

Từ prototype/, Node 24.19.0:

```sh
npm run content:manifest -- --check
npm run content:manifest -- <SOURCE_COMMIT_SHA_40_KY_TU>
npm run test:f0
```

--check không ghi tệp. Sinh lại chỉ ghi manifest, không ghi ARTICLE/dossier/SVG/catalogue. Generator từ chối ghi đè manifest đã có trạng thái review/published hoặc quyền tài sản, tránh xóa bằng chứng vô ý. Sau thay đổi nguồn có ý nghĩa, việc tạo revision/duyệt mới phải do quy trình được cấp quyền, không chạy generator để hợp thức hóa.

## 3. Đường dẫn và tham chiếu

- Chỉ đường tương đối POSIX chuẩn, dưới root repo và prefix được phép. Từ chối absolute path, .., dấu gạch ngược, encoding %, query/hash trong đường tệp, segment rỗng, symlink ở bất kỳ segment và tệp thiếu.
- Source/dossier gắn đúng thư mục ID; hash phải khớp byte thực. Danh sách asset/hash/alt phải khớp embed ARTICLE.
- SVG chỉ chấp nhận nhóm element hiện đang dùng (svg/title/desc/g/path/rect/text), không script, event, href, resource ngoài, entity hoặc URL CSS. Đây là kiểm bảo thủ cho asset hiện tại, không phải trình render/sanitizer XML tổng quát.
- Link nội bộ ARTICLE chỉ tới dossier/asset đã khai báo hoặc fragment hợp cú pháp; URL nguồn chỉ HTTPS, không credential. Việc resolve heading và GFM syntax đầy đủ thuộc R1.
- Quan hệ related/topic phải biết ID, không tự related, membership hai chiều; metadata không nhận trường lạ hoặc stage/audience ngoài contract.

## 4. Hai view ở phía build

- PreviewView chỉ là kiểu và selector contract, nhận literal host **127.0.0.1**. Các alias/0.0.0.0/query không mở view. **Không có preview entry, server, route, output hoặc trang preview 29 bài trong F0.** Kiểm host trong contract không thay cấu hình listen/access của preview server tương lai.
- PublicView chỉ có descriptor bài đã published với đủ gate. Nó không có dossier, record người duyệt hoặc prose; relatedArticleIds được lọc theo tập eligible. topicIds hiện rỗng vì planned topic registry không cấp quyền công bố chuyên đề.
- resolveArticleLinks tự dựng lại PublicView từ manifest + root, không nhận tập eligible do caller tự khai. Đây là resolver dùng chung sẵn cho related/stage/homepage/topic ở đợt sau; **F0 chưa nối các module đó**.
- Catalogue cũ vẫn DEV 4 mẫu/1 topic, public 0/0. Manifest 29 bài không được nhập vào catalogue hoặc virtual module.
- Topic trong catalogue cũ phải có bằng chứng của chính topic nếu published; link bài lạ bị reject, link tới bài chưa đủ quyền bị loại. Mẫu cũ không tự kế thừa quyền từ bài cùng slug.

## 5. Bằng chứng đúng revision/hash

Đối với bài published cần đủ editorialApproval, expertReview, readerQA, learnerReview và publicationAuthorization; từng asset cần assetRights riêng. Các trường này không thay thế nhau.

Mỗi ReviewRecord phải khớp kind, subjectId, revision, contentHash và revisionHash; decision=approved, by không rỗng, timestamp ISO hợp lệ và không sau publishedAt. publishedAt không được ở tương lai. Asset record gắn đúng ID/hash/revision của asset và revisionHash của bài.

Record trỏ một JSON bằng chứng dưới docs/phase-3/publication-records/, kèm SHA-256. Validator kiểm byte/hash và đối chiếu các trường trong JSON với record; tệp thiếu, bị đổi, khác phạm vi, người/ngày hoặc hash đều bị từ chối. Thay source/dossier/asset/metadata, kể cả tính lại các hash mới, không tái sử dụng được bằng chứng cũ.

Catalogue legacy chưa có provenance ARTICLE nên digest của nó là canonical payload được review, bỏ status/publication/approval/publishedAt khỏi phép hash. Nó vẫn phải có cùng năm record đúng revision/hash; approval cũ không đủ. Reader legacy không hỗ trợ asset nên không nhận grant asset ngầm.

**Đây là kiểm nhất quán và toàn vẹn, không xác thực danh tính, năng lực chuyên gia, chữ ký hoặc giá trị pháp lý của giấy phép.** Code review/người có thẩm quyền phải xác nhận bằng chứng thật và quyền hiển thị tên. Bằng chứng test chỉ tồn tại trong thư mục tạm, tự dọn; không có record xuất bản thật cho 29 bài. Hồ sơ từng review đang chờ không được tự đổi thành full publication bundle.

## 6. Quét artifact và không nới guard

Cùng scanner được gọi ở generateBundle (trước emit), writeBundle (toàn cây output) và scripts/check-publication.mts sau build. Bước CLI vẫn có canary âm từ fixture sentinel; không dựa vào catalogue rỗng để kết luận sạch.

Scanner bao phủ cả 29 ARTICLE/dossier/SVG, catalogue cũ và legacy homepage:

- Kiểm ID/revision/slug/title, đoạn prose nguyên nguồn và dạng bỏ Markdown, alt/tên asset/text SVG, hash byte source/asset.
- Kiểm tên file và nội dung; từ chối raw JSON/MD/TS/map, fixture sentinel, symlink, asset tĩnh không có trong nguồn public/font đã biết hoặc không đủ quyền.
- Giải mã các dạng JSON/JS Unicode, HTML entity, percent encoding và payload base64; kiểm gzip/brotli với giới hạn giải nén 16 MiB. Không chạy JavaScript/HTML/SVG.
- Asset SVG/TXT vẫn quét text dù bị copy vào public/. Binary đã biết chỉ qua sau kiểm byte bị giữ lại; raster lạ bị reject, không tự gán quyền vì tên file.
- Shared slug/title/đoạn đã được cấp quyền ở đúng source revision không bị blacklist mãi. Prose phiên bản cũ còn bị giữ và dossier nội bộ vẫn không được xuất thô.
- Source maps bị cấm cả ở cấu hình build và artifact. Không có query/env/client toggle làm đường tắt publication.

Scanner là phòng vệ nhiều lớp, không phải DLP chứng minh được mọi phép mã hóa tùy ý, paraphrase hay hình raster do người khác tái tạo. Không bỏ kiểm graph/bằng chứng/code review. Repo public vẫn đọc được source; ranh giới website không bảo mật ngược repo.

## 7. Phạm vi tiếp theo

R1 chưa được bắt đầu. Trước nghiệm thu kỹ thuật tổng vẫn cần clean production build và browser route/asset checks khi môi trường hoạt động; xem [F0-REVIEW](F0-REVIEW.md). Không merge/deploy/publish từ kết quả F0.
