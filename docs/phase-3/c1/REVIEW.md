# C1 — Bàn giao preview cục bộ 29 bài

Ngày 26/10/2026, Asia/Saigon. Chỉ C1 được cấp phép. [Cách chạy và kiến trúc](README.md), [đối chiếu từng bài](COVERAGE.json).

## Nền, kiến trúc và phạm vi tệp

PR #19 merge lúc 07:23:57 và #20 merge lúc 07:24:42 ngày 26/10/2026 (giờ Việt Nam). Main nền `c36a8e8c8349e2557abfe1ed1aaab8a19a3652d8`, tree `141cff45198b9daed2bf518b302834e027f22bfa`. Git fetch thành công với quyền mạng; tạo worktree/nhánh C1 từ đúng main. Đối chiếu GitHub connector: **573/573 blob nguồn khớp SHA-1, không truncated**. Không lấy checkout cũ làm nền.

Đã đọc F0-CONTRACT, READER-CONTRACT R1, CONTENT-INTEGRATION, IMPLEMENTATION-ROADMAP, QA-PLAN và REVIEW R1; PRODUCT/DESIGN/AGENTS và mã hiện hành. Áp dụng Impeccable trực tiếp từ bản ghim cho Read mode; context launcher/engine không chạy theo AGENTS.

| Nhóm tệp | Vai trò |
|---|---|
| build/content-preview.ts | F0 PreviewView → đọc ARTICLE/asset theo hash → R1 GFM AST; metadata/card/related/provenance |
| build/content-preview-server.ts, vite.c1.config.ts | Server serve-only, loopback Host/Origin, no-store, SVG allowlist và raw-source denial |
| preview/{index.html,main.tsx,virtual.d.ts,preview.css} | Entry riêng, thư viện/Reader thật, nhãn/revision, nhóm chủ đề, provenance và related; không nhập vào main |
| build/reader-document.ts, markdown/{model,ArticleReader.tsx} | Hai khả năng tùy chọn cho tích hợp: H1 nguồn vào header và link dossier → provenance; giữ trace/hash nguồn gốc, không đổi renderer sang hệ thống khác |
| src/reading/Router.tsx | Library nhận entries và notice tùy chọn; ArticleCard dùng lại, nhãn revision và giữ state.from qua related; sửa query race khi thao tác nhanh; mặc định vẫn catalogue cũ |
| build/editorial.ts | Chỉ mở rộng graph denylist C1; không nới F0 validation/publication/scanner |
| vite.config.ts, vite.r1.config.ts | Khoanh dependency discovery theo đúng HTML entry để không quét nhầm virtual module của harness khác |
| tests/content-preview.test.mts, tests/c1-preview.spec.ts; cấu hình C1 | Mapping/safety, 29 bài × bốn viewport, điều hướng, hình, HTTP boundary và thư viện |
| tests/production.spec.ts, tests/r1-reader.spec.ts, playwright.config.ts | Thêm 29 route/203 raw-resource checks; tách suite C1 khỏi regression thường; test cuộn R1 chờ ảnh sẵn sàng và kết quả từng hướng |
| package.json, .gitignore, workflow CI | Scripts C1, bỏ output QA khỏi Git; thêm Node contract R1/C1 vào Verify prototype |
| docs/phase-3/c1/ | Hướng dẫn, báo cáo, số liệu coverage và ảnh đại diện mới |

**Không thêm dependency hoặc đổi lockfile.** Không chép tay 29 bài thành JSON. Preview không có build artifact/export, backend, login, lưu nhận xét/đáp án, trắc nghiệm hoặc chấm điểm. Không sửa 29 bài/hồ sơ/SVG để vừa parser.

## Mapping và bảo toàn

- 29 ID/slug duy nhất, 29 Reader routes. C01/C05/C17/E05 dùng r2; 25 bài khác dùng r1. Metadata so toàn bộ với manifest, gồm collection/topic/season/keywords/audience/Bloom/topicIds/relatedArticleIds.
- Giữ nguyên sourceHash/contentHash và revisionHash F0. H1, notice lịch sử, mọi đoạn/bảng/APA/citation/hoạt động/phản hồi và link hồ sơ vẫn có node/receipt và range trên **nguyên ARTICLE**. Không cắt notice, không hash riêng body để thay hash đã pin.
- Tổng **4.716 node AST**, **25 bảng trong 20 bài**, **29 SVG**, đủ caption và mô tả chữ. Node tests đối chiếu độc lập MDAST type/order/value/range/URL/alt/heading/list/table attributes và hash từng slice; browser đối chiếu preorder AST/DOM và từng leaf text, chỉ chuẩn hóa whitespace theo HTML. Bốn viewport tương ứng 18.864 receipts.
- C03/C05/C09/C17 trùng slug mẫu được giải quyết bằng việc truyền duy nhất tập ARTICLE vào Library, không nối hai catalogue. C03 giữ slug `dung-ve-phia-minh`, title mới đúng nguồn. Có nhãn giải thích không dùng các mẫu legacy trong preview.
- Mô tả thẻ lấy nguyên đoạn đầu, thời lượng tính theo quy tắc công khai; không tạo deck/tóm tắt học thuật mới.
- Liên kết dossier giữ nguyên label/source URL trong AST; resolver chuyển tới đúng anchor provenance, hiển thị path và SHA-256, không expose dossier Markdown. APA/DOI/HTTPS vẫn từ ARTICLE, không tạo bibliography thứ hai.
- Quan hệ bài dựa ID trong manifest; nhóm T01–T09 là filter membership, không tạo nội dung/lịch Chuyên đề tuần. Quay lại giữ q/chủ đề/giai đoạn/nhóm cả sau related/TOC/reload.

Checksum đối chiếu base không thấy thay đổi ở **203 tệp ARTICLE/hồ sơ/SVG**, matrix, source-manifest.json hoặc catalogue.json. App/main, ReadingShell, toàn bộ CSS đã duyệt, Mây/CatArt, tử đằng B, artwork/font/public và bằng chứng lịch sử giữ nguyên. CSS và 26 tài sản khác trong production khớp byte với build R1 trước đó (27 tài sản ngoài JS/HTML); không tuyên bố toàn bộ JS artifact giống byte.

## Kiểm thử thực chạy

Node 24.19.0, dependency theo nguyên lockfile, Chromium hệ thống với Playwright. Npm ci --ignore-scripts cài 140 packages; esbuild/Vite/build thực tế hoạt động, không đổi dependency để né lỗi môi trường. Lần đầu browser gặp listen EPERM ở sandbox, sau đó chạy được với quyền mạng. Không dùng test giả lập thay browser.

| Kiểm tra | Kết quả |
|---|---|
| npm run content:manifest -- --check | PASS, 29 records unchanged, no publication grants |
| npm run test:c1 | PASS 34/34, gồm typecheck config C1; mỗi bài có một case đối chiếu đầy đủ |
| npm run test:f0 | PASS 22/22, fixture thứ 30 và các mismatch/rights/canary giữ nguyên |
| npm run test:r1 | PASS 12/12, không bỏ guard/raw HTML/URL/asset negative tests |
| npm run test:c1:browser | PASS 8/8 trong lượt full cuối, không skipped; gồm 29/29 bài ở từng viewport và ca hồi quy query race |
| npm run test:r1:browser | PASS 8/8 trên Chromium thật |
| npm run test:e2e | PASS 30/30, thư viện/Reader cũ, Mây/B/trang chủ/privacy/reduced motion |
| npm run build và scanner sau build | PASS; 29 output files, 29 withheld articles, 4.335 markers; source/legacy/topic public đều 0, canary detected |
| npm run test:production | PASS 6/6 dưới repo prefix, không SPA fallback; có toàn bộ 29 route và 203 raw paths |
| vite build --config vite.c1.config.ts | Negative PASS: exit 1 “C1 preview is serve-only on literal 127.0.0.1”; không tạo output preview |
| HTTP HTML/virtual AST/main TSX | PASS 200 với Cache-Control: no-store, đo trực tiếp sau sửa Vite override |
| Git diff --check / checksum nguồn | PASS; không thay nguồn, manifest/catalogue/quyền thật |

Các suite lịch sử chạy trong bản sao QA riêng để không ghi đè ảnh Phase 2/R1. C1 evidence có thư mục riêng không bị Playwright dọn khi chạy lại. Kết quả CI thật được dẫn và cập nhật trong phần mô tả Draft PR/check **Verify prototype** tại đúng SHA; không gọi kết quả local là CI PASS. Workflow chỉ thêm Node tests R1/C1, chưa chạy Playwright trên GitHub Actions, không deploy/upload artifact.

### Phạm vi browser

- 29 bài × 320/390/768/1440: đủ node/order/range/leaf text, SVG byte/hash/alt/caption/mô tả, bảng, link HTTPS mở tab mới, không input thu câu trả lời, không tràn trang, Axe A/AA không violation trong phạm vi.
- Đã xem trực tiếp **58 ảnh prose** của từng bài ở 390 và 1440, cùng font local đã sẵn sàng; thêm các hình đại diện C01/C05/E02. Đây là review layout, không phải đọc duyệt lại khoa học hoặc kiểm mọi pixel/toàn bộ trang bằng mắt. Toàn văn được kiểm bằng source/AST/DOM.
- Search có/không dấu, uppercase và whitespace; AND filters chủ đề/giai đoạn, bốn chặng, nhóm topic; reset/empty/reload/Back/Forward; TOC/hash/focus, provenance và related/return giữ kết quả.
- C01/C05/E02: keyboard mở/zoom 150%/cuộn hai chiều/Tab cycle/Escape trả focus, reduced motion; skip link và menu keyboard. Không sửa SVG chữ nhỏ để qua test.
- 29 bài kiểm reflow tương đương 200%: 720 CSS px, DPR2, TOC normal flow, không tràn. **Zoom native 200% qua browser UI chưa xác minh**, không gọi mô phỏng là native PASS.
- Chưa kiểm Safari/Firefox, NVDA/VoiceOver/screen reader hoặc thiết bị thật; emulated viewport không phải iPhone/Android thật. Chưa kiểm khả dụng với người học, HTTP toàn bộ nguồn học thuật hoặc tính đúng chuyên môn/giấy phép.

## Những phát hiện và cách xử lý

Không có ARTICLE nào bị parser từ chối cấu trúc; không phát hiện mất đoạn/block, asset hoặc metadata qua các phép đối chiếu đã chạy. Không tạo phiếu sửa nội dung khoa học vì không có lỗi nguồn thực chất được xác minh trong phạm vi C1.

1. Vite ban đầu quét mọi HTML và cố resolve virtual R1 trong C1: khoanh optimizeDeps.entries theo entry đúng, không thêm dependency hoặc hệ thống cấp quyền khác.
2. URL traversal bị client chuẩn hóa thành /ARTICLE.md nhận HTML fallback 200 (không phải nội dung bài): thêm từ chối raw Markdown/JSON trước fallback, negative test hiện đòi 404.
3. Vite ghi đè Cache-Control thành no-cache: giữ no-store ngay khi header được đặt; kiểm lại HTML/compiled virtual AST/TSX và SVG.
4. Library dùng params từ render cũ khi đổi query rất nhanh, có thể đưa từ khóa đã xóa trở lại: sửa việc gộp query từ HashRouter URL mới nhất đã ghi vào history. Test lặp năm lượt nhập/xóa/đổi giai đoạn không chờ navigation trung gian, cộng Back/Forward/related/return đã PASS. Đây là lỗi ứng dụng được sửa trong phạm vi C1, không phải lỗi nguồn.
5. Test cuộn hình R1 có lần gửi hai phím khác hướng trước khi ảnh/scroll sẵn sàng: chờ naturalWidth/scrollHeight và assert từng hướng rồi mới gửi phím kế; không bỏ assert hoặc sửa FigureViewer.
6. Test giữ locator tên Menu sau khi đổi Đóng/select label quá chặt được sửa theo control thật. Có chờ URL commit ở các bước kiểm ổn định, không bỏ các assert hoặc giảm guard.

Giới hạn còn mở: zoom native/assistive/browser/thiết bị ở trên; toolbar header tái dùng có lối tới phân hệ ngoài scope, link chuyên đề trả thông báo/recovery, các anchor trang chủ quay về thư viện preview; không nhập các phân hệ đó. Hình dài có thể cần cuộn/zoom; caption/mô tả chữ luôn có ngoài hộp xem lớn. SVG có thể mang nhãn revision lịch sử riêng (ví dụ C05 r1) trong artwork gốc; asset identity dùng hash theo F0, không tự sửa nhãn để gán thành revision ARTICLE.

## Bằng chứng production không rò

- F0 PublicationEvidence và PublicView không đổi. Không thêm grant/phê duyệt chuyên môn/quyền hình hoặc publishedAt thật; công khai vẫn 0 bài/0 topic.
- Production graph reject cả module preview có code “sạch”, virtual:c1-preview và harness/fixture R1. Node negative tests cho từng compiled ARTICLE và từng SVG đổi tên đều bị scanner F0 phát hiện; escaped canary vẫn bị chặn.
- Build output sạch không có raw ARTICLE/dossier/manifest29, SVG nháp, fixture/chunk/preview assets hoặc sourcemap. Scanner chạy trước/sau emit và CLI trên cây dist mới.
- Browser production mở trực tiếp cả 29 slug với query preview/c1 đều 404 của ứng dụng; 203 đường nguồn/hồ sơ/SVG, preview entry/TSX/virtual/manifest và URI SVG preview đều HTTP404; library với query vẫn rỗng.
- Đã chạy preview trước production, build sạch riêng không nhận stale preview output. Preview không tạo output hoặc service worker; no-store không phải lời hứa xóa vật lý RAM.
- Host/Origin ngoài literal loopback bị 403; raw MD/JSON, URI asset lạ/query/traversal bị 404. Không mở docs ngoài filesystem allowlist. Repo vẫn public trên GitHub.

## Ảnh đại diện

Ảnh JPEG chụp trực tiếp Chromium, không chỉnh sửa/ghép; prose đã cuộn nên đầu tiêu đề có thể nằm ngoài khung. Bộ đầy đủ 116 ảnh prose/figure ở 390/1440 phục vụ kiểm cục bộ, chỉ các ảnh đại diện dưới đây vào PR.

| Góc xem | Ảnh |
|---|---|
| Thư viện mở đầu | [390](screenshots/library-top-390.jpg), [1440](screenshots/library-top-1440.jpg) |
| Bộ lọc trên màn hình hẹp | [390](screenshots/library-filters-390.jpg) |
| C03 đúng title/nguồn | [Prose 390](screenshots/reader-C03-390.jpg) |
| C01 với TOC | [Prose 1440](screenshots/reader-C01-1440.jpg) |
| C05 hình/caption/mô tả | [390](screenshots/figure-C05-390.jpg) |
| E02 xem lớn bằng phím | [Dialog 390](screenshots/figure-E02-modal-390.jpg) |
| E05 r2 | [Prose 1440](screenshots/reader-E05-1440.jpg) |

**Dừng tại Draft PR C1 để chủ dự án nghiệm thu. Không merge, deploy, publish hoặc tự bắt đầu giai đoạn khác.**
