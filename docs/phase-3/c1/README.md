# C1 — Đọc 29 bản nháp trên máy cục bộ

Đây là preview phục vụ nghiệm thu kỹ thuật và nhận xét của chủ dự án. Nghiệm thu nội bộ bản nháp không thay thế phê duyệt chuyên môn, quyền hình hoặc quyền xuất bản.

## Chạy

Checkout nhánh `phase-3-c1-content-preview` (hoặc commit được chủ dự án chọn), dùng Node 24.19.0 và chạy từ `prototype/`:

```sh
npm ci
npm run content:manifest -- --check
npm run dev:content-preview
```

Mở **http://127.0.0.1:4191/preview/index.html#/thu-vien** trên cùng máy. Dừng server bằng Ctrl+C khi xem xong. Không dùng lệnh `dev` thông thường để xem 29 bài; lệnh đó vẫn dùng catalogue mẫu cũ. Không đổi host sang `0.0.0.0`, tunnel, deploy hoặc chia sẻ server ra Internet.

Thư viện có tìm kiếm dấu/không dấu, chủ đề, bốn giai đoạn và các nhóm ID T01–T09 theo manifest. Các nhóm này chưa phải Chuyên đề tuần được duyệt. Bốn slug trùng catalogue mẫu chỉ có một bản ARTICLE thật trong preview; C03 dùng tiêu đề “Một sai sót không kể hết về bạn”.

Mỗi bài có ID/revision và nhãn trạng thái. Mục lục, liên kết trong bài, xem hình lớn bằng bàn phím, bài liên quan và quay lại kết quả đã chọn dùng Reader/shell hiện có. Không có chỗ nhập đáp án, chấm điểm hoặc lưu thông tin tâm lý. Nhận xét có thể đối chiếu theo ID, revision, heading và SHA-256 trong mục cuối bài; C1 không thêm hộp thư hay backend nhận nhận xét.

Notice lịch sử trong ARTICLE được giữ nguyên. Nhãn giao diện giải thích trạng thái nghiệm thu nội bộ hiện tại. Những đường dẫn REFERENCES/CLAIM-AUDIT/BLOOM-REVIEW/VISUAL-REVIEW/EDITORIAL-REVIEW trong bài dẫn tới mục đối chiếu đường dẫn/checksum, không tải hồ sơ thô qua web. Mở hồ sơ trong checkout khi cần đối chiếu tại máy.

Header/footer được tái sử dụng. Link Chuyên đề tuần trả thông báo phạm vi và đường về thư viện; các anchor trang chủ quay về thư viện preview. C1 không nhập trang chủ hoặc triển khai các phân hệ đó.

## Pipeline

`source-manifest.json` → F0 `loadManifest`/`selectSourceView({kind:'preview',host:'127.0.0.1'})` → đọc byte ARTICLE/SVG đã pin → R1 GFM AST → `ReaderDocument` → virtual module chỉ trong server C1 → Reader.

- Không sinh hoặc commit 29 JSON prose; không đổi manifest nguồn hay catalogue production.
- H1 đầu nguồn được render trong header bằng chính AST node. Không cắt chuỗi, đổi source hash hoặc đánh lại offset. Mọi node vẫn có receipt; offset UTF-16, hash slice dùng UTF-8.
- Chỉ H1 đầu tiên được chuyển vào header; H1 khác/H4, node lạ, raw HTML, URL nguy hiểm và asset lạ vẫn fail rõ. Không âm thầm bỏ block để khớp renderer.
- Caption và mô tả chữ vẫn đọc từ các block gốc theo contract R1. SVG dùng `img` qua URL allowlist gắn ID/hash, không inline XML.
- Mô tả thẻ lấy nguyên đoạn văn đầu tiên; thời gian đọc là ước tính số từ cách trắng của toàn nguồn chia 200/phút. Không lấy mô tả/thời lượng từ mẫu legacy.
- Topic, season, keywords, audience, collection, Bloom và related IDs giữ theo manifest; không suy thêm quan hệ hoặc quyền từ metadata.

## Ranh giới website

Preview chỉ **serve** trên literal `127.0.0.1:4191`; config từ chối build/host/port khác. Kiểm Host/Origin, tắt CORS và giữ `Cache-Control: no-store` kể cả khi Vite định ghi đè. Không có service worker hoặc output preview để deploy. Không xem noindex hay URL ẩn là bảo mật.

Raw Markdown/JSON bị từ chối; docs ngoài Vite filesystem allowlist. Endpoint SVG chỉ nhận đúng URI manifest, không query, không traversal. F0 kiểm hash và SVG trước khi trả bytes. Đây không phải cơ chế bảo mật ngược source đã có trên repository GitHub công khai.

Production vẫn config/entry bình thường và F0 PublicView. Guard module graph được mở rộng để chặn cả thư mục preview và virtual C1; scanner F0 không bị giảm. Public hiện vẫn **0 bài, 0 chuyên đề**. Không thêm quyền hoặc thay trạng thái publication.

## Kiểm thử

```sh
npm run test:c1
npm run test:c1:browser
npm run test:f0
npm run test:r1
npm run test:r1:browser
npm run test:e2e
npm run build
npm run test:production
```

Browser dùng Chromium hiện có hoặc `CHROMIUM_PATH`. Các suite lịch sử ghi ảnh vào docs Phase 2/R1, nên chạy trong bản sao QA để không ghi đè bằng chứng cũ. C1 ghi ảnh/coverage vào `prototype/test-results-c1-evidence/` ngoài cây output Playwright có thể dọn; chỉ ảnh đại diện và số liệu đối chiếu được đưa vào tài liệu bàn giao.

Xem [REVIEW](REVIEW.md) cho kết quả đã chạy, ảnh, giới hạn và điểm dừng Draft PR. Không merge, deploy, publish hoặc bắt đầu đợt khác từ kết quả này.
