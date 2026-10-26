# R1 — Article Reader bằng fixture

Ngày 25/10/2026, Asia/Saigon. R1 được cấp riêng sau nghiệm thu F0 ở phạm vi logic/kiểm thử cô lập. Nền main `1304bb32f73da50fe931c2197d641370e2bf202a`. Không tích hợp 29 ARTICLE, không C1, không cấp quyền xuất bản.

## Thành phần

| Tệp | Vai trò |
|---|---|
| [build/reader-document.ts](../../../prototype/build/reader-document.ts) | Parse GFM thành MDAST chuẩn, kiểm cấu trúc/link/asset, sinh ReaderDocument và trace nguồn |
| [markdown/model.ts](../../../prototype/src/reading/markdown/model.ts) | DTO của AST, source ranges, asset descriptor; helper URL thuần, không publication logic |
| [ArticleReader.tsx](../../../prototype/src/reading/markdown/ArticleReader.tsx) | Render whitelist node bằng React, TOC, figure, hộp xem hình lớn, link quay lại thư viện |
| [ReadingShell.tsx](../../../prototype/src/reading/ReadingShell.tsx) | Tách nguyên hành vi shell/header/footer/breadcrumb/RoutePosition hiện có để dùng chung |
| [markdown-reader.css](../../../prototype/src/styles/markdown-reader.css) | Style giới hạn trong Reader, giữ tokens/font/measure và breakpoint Read mode đã duyệt |
| [vite.r1.config.ts](../../../prototype/vite.r1.config.ts) | Harness fixture riêng, chỉ serve trên literal 127.0.0.1, cấm build |
| [tests/fixtures/reader](../../../prototype/tests/fixtures/reader/article.md) | Một bài giả lập và SVG dài, không có dữ liệu học sinh hoặc bằng chứng published |

Parser chạy ở build/test bằng ba devDependency khóa chính xác: mdast-util-from-markdown 2.0.2, mdast-util-gfm 3.1.0 và micromark-extension-gfm 3.0.0. Không dùng MDX, HTML renderer hoặc dangerouslySetInnerHTML. Không đổi bất kỳ phiên bản dependency cũ nào; lockfile thêm đúng 57 package entries phụ thuộc parser. Các parser không vào public browser graph trong R1.

## AST và đối chiếu nguồn

ReaderDocument là DTO giữ cây loại node MDAST và thêm metadata, không phải chuỗi HTML:

- format=gfm-mdast-v1, sourceHash SHA-256 của chuỗi nguồn mã hóa UTF-8.
- offsetEncoding=utf16: start/end là offset code unit UTF-16 của MDAST/JavaScript, **không phải offset byte UTF-8**. Range còn có line/column.
- Mỗi node có ID theo type/range, rawHash của source.slice(start,end) mã hóa UTF-8 và value ngữ nghĩa khi có.
- Heading anchor chuẩn hóa dấu/đ/Đ, tránh ID dành cho shell/viewer và thêm hậu tố khi trùng. Cùng nguồn sinh cùng anchor/trace.
- Mỗi node render có data-source-id/start/end. Test so độc lập AST chuẩn → 169 receipts → 169 DOM nodes ở cả bốn viewport, rồi so từng leaf value sau chuẩn hóa whitespace của HTML.
- Definition là binding của liên kết, giữ receipt/URL trong DOM ẩn; không giả thành prose. Bold/italic/list/table/blockquote/code/line break giữ nghĩa gốc thay vì giữ ký tự cú pháp Markdown.

Đây là kiểm bảo toàn hiển thị, không xác nhận nguồn học thuật hoặc hiệu quả Bloom. Title/deck trong harness là metadata fixture; R1 không tự cắt H1/notice từ 29 bài thật. Adapter nguồn thật thuộc phạm vi C1 được cấp riêng. Nếu chuyển H1/notice vào header, adapter phải giữ sourceRef/contentHash F0 của file gốc và map offset về nguồn gốc; không thay hash của manifest bằng hash body để hợp thức hóa review.

## Node được hỗ trợ và giới hạn có chủ ý

H2/H3 và TOC phân cấp; paragraph, text, strong/emphasis/delete, break, ordered/unordered/nested list, blockquote, table với header/alignment, inline/fenced code chỉ đọc, thematic break, link/linkReference/definition, image/imageReference có hồ sơ hình.

Checklist GFM chỉ hiển thị dấu chọn có sẵn bằng input disabled, không tương tác/lưu trạng thái. Hoạt động Nhớ–Hiểu–Vận dụng và gợi ý phản hồi là nội dung đọc đầy đủ; không thêm form câu trả lời, chấm điểm hoặc công cụ tâm lý.

H1 hoặc heading sâu hơn H3 trong body, footnote và node chưa hỗ trợ bị reject rõ ràng. Không âm thầm bỏ node. Đó là giới hạn v1, không sửa nội dung thật cho vừa parser.

## Figure và xem lớn

Trong fixture, một figure có ba block liên tiếp: paragraph chỉ chứa image; caption paragraph một emphasis; description paragraph bắt đầu strong “Mô tả tương đương bằng chữ:”. Compiler ghi nhóm bằng source ID, không chép caption/mô tả sang JSON biên tập khác. Nếu thiếu/không khớp thì fail.

Asset chỉ từ allowlist do harness đăng ký: key file SVG, URL local, hash, viewBox. F0 readReference/safeFile/assertSafeSvg kiểm file/hash/tag và chặn script/event/href/resource ngoài; bổ sung từ chối style/escape/entity trong attribute để không lách kiểm URL. SVG được dùng qua img, không chèn markup vào DOM.

Hộp dialog native có tên, đóng/zoom, viewport cuộn nhận focus, vòng Tab đầu/cuối và Escape. Sau đóng trả focus cho nút gốc; trạng thái zoom chỉ tồn tại trong component. Alt/caption/mô tả ngoài hình luôn có ở bài gốc. Không thêm chuyển động chờ nội dung; reduced motion giữ toàn bộ chức năng.

## Link và nội dung nguy hiểm

- Link chỉ HTTPS không credential hoặc fragment đã biết; JavaScript/data/HTTP/protocol-relative/anchor lạ bị reject.
- HTML node, script/JSX/MDX HTML, SVG ngoài allowlist, traversal/query asset và thiếu alt bị reject.
- Nội dung giống script trong code block là text được React escape, không thực thi.
- Bảng cuộn trong vùng riêng có tên/tabindex; code block cuộn cũng nhận focus. Không làm tràn toàn trang để vừa dữ liệu.

## Publication boundary và harness

F0 vẫn quyết định public eligibility. R1 không thêm lifecycle/quyền/phê duyệt thay thế:

1. Production vẫn entry/config cũ, catalogue cũ và source manifest nguyên byte; không import fixture hoặc parser vào src/main/Router.
2. Harness ở tests/reader-harness/index.html và virtual:r1-fixture chỉ tồn tại qua config riêng. Config từ chối build hoặc host khác 127.0.0.1; không dùng noindex/URL ẩn làm cơ chế bảo mật.
3. F0 generateBundle kiểm module IDs để chặn tests/fixtures, tests/reader-harness và virtual:r1-fixture ngay cả nếu chunk không có sentinel. Scanner F0 vẫn kiểm byte/text/encoding/canary trước/sau emit.
4. Fixture MD/compiled document/virtual pack/SVG có sentinel F0_FIXTURE_ONLY_. Không copy vào public/, manifest nguồn hoặc production catalogue.
5. Harness HTTP chỉ phục vụ URI SVG chính xác; unknown/query asset trả 404. Real ARTICLE ngoài Vite allowlist trả 403. Đây không phải bảo mật repo GitHub công khai.
6. Direct production route/query không mở fixture; raw harness/MD/SVG URLs trả 404. Bộ kiểm production đã chạy trên artifact build mới.

## Cách chạy

Từ prototype/, Node 24.19.0:

```sh
npm ci
npm run test:r1
npm run test:f0
npm run build
npm run dev:reader-fixture
```

Mở `http://127.0.0.1:4190/tests/reader-harness/index.html#/r1/fixture`. Để xem luồng quay lại có filter, mở harness tại #/ rồi chọn “Mở Reader giả lập”.

```sh
npm run test:r1:browser
npm run test:e2e
npm run test:production
```

Browser suites dùng Chromium hiện có hoặc CHROMIUM_PATH; không cần cài engine UI skill. Tests cũ ghi ảnh vào thư mục Phase2, nên chạy trong bản sao QA để giữ ảnh lịch sử. [Báo cáo và ảnh R1](REVIEW.md) chỉ lưu ảnh mới, không ghi đè baseline cũ.
