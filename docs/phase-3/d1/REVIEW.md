# D1 — Bàn giao Dòng chảy

Ngày 26/10/2026, Asia/Ho_Chi_Minh. Nhánh `phase-3-d1-flow-page`. Chỉ D1 được cấp phép, dừng tại Draft PR; không merge/deploy/publish hoặc bắt đầu G1/P1/P2/W2/Q1.

## Điều kiện và quyết định A

PR #24 đã merge lúc **18:20:21 ngày 26/10/2026 +07:00**. Git fetch và GitHub connector cùng xác nhận main `40c6d342fe19ed2ff876c19fee8513fce4b432a0`, tree `9894a98e8ecd51b8de1f24a554977f64f7d61ef3`. Tạo worktree riêng từ đúng SHA này; không dùng HEAD N1 cũ.

Đã đọc roadmap V1.0, CONTENT-INTEGRATION, QA-PLAN, PRODUCT/DESIGN/AGENTS và F0/R1/C1/W1/N1 contract/báo cáo; kiểm trực tiếp App/content/timeline/router/ReadingShell/Library/return links, selector F0/W1 và scanner. Các mô tả lịch sử “chưa có R1/N1” không thay thế trạng thái main mới. Dùng Impeccable bản ghim qua fallback đọc trực tiếp; không chạy context loader/launcher/engine upstream.

Phương án A: phát hành đủ 29 bài/29 hình đủ quyền, weekly chỉ chọn bài nổi bật. **D1 không phải phát hành V1.0**; hiện public chưa có bài eligible nên cả bốn chặng có empty state trung thực. Không coi test fixture xanh là duyệt chuyên môn hoặc quyền thật.

## Kiến trúc và phạm vi diff

[Hợp đồng luồng dữ liệu và cách chạy](CONTRACT.md) · [Toàn văn cần duyệt](COPY-REVIEW.md).

| Tệp / nhóm | Thay đổi |
| --- | --- |
| src/reading/stages.ts, src/content.ts | Metadata bốn chặng dùng chung; chuyển nguyên copy timeline cũ, key = nhãn tiếng Việt đã có; thêm anchor/intro mới, link filter và grouping thuần |
| src/reading/FlowPage.tsx | ReadingShell qua router; breadcrumb, title/deck, bốn section/TOC, ArticleCard cùng Library và empty state |
| src/reading/ArticleCard.tsx, Router.tsx | Tách nguyên component/card type để tái dùng; Router re-export API cũ cho C1; thêm route/title D1, Library dùng stage options chung |
| src/App.tsx | Giữ timeline/copy/artwork/selection; sửa mọi aria-controls trỏ panel dùng chung tồn tại; thêm hai CTA theo chặng và trang đầy đủ |
| src/styles/flow.css | CSS khu trú cho trang D1/cụm link mới; không đổi token hoặc stylesheet đã duyệt |
| build/editorial.ts | Chỉ tăng graph denylist cho fixture/harness D1, không nới F0 |
| tests/fixtures/flow, tests/flow-harness, vite.d1.config.ts | Fixture serve-only loopback, proof synthetic tạm; không vào normal public graph |
| tests/flow.test.mts, flow.spec.ts, cấu hình D1 | Mapping/F0/full-library 29+30/weekly đổi/negative leak; browser keyboard, filter/history/return, responsive/Axe/reflow |
| tests/production.spec.ts | Thêm bốn viewport D1 production empty, stage filter, reload/query, Axe và fixture/direct URL denial |
| CI/package/.gitignore/playwright config | Thêm bước D1 Node và lệnh test; giữ mọi gate; tách suite/evidence, không đổi dependency/lockfile |
| docs/phase-3/d1 | Contract, copy review, báo cáo, kiểm thử và ảnh trước/sau |

ReadingShell, FoundationPage/N1 CSS/nội dung và toàn bộ F0/R1/C1/W1 logic cấp quyền không thay đổi. Không backend, tracking, form tâm lý, chấm điểm hoặc animation mới. HashRouter tiếp tục hoạt động dưới repository base. Hai header giữ anchor cũ; thêm CTA ở timeline để mở route đầy đủ.

## Kiểm dữ liệu và cách diễn đạt

- Exact stage keys: **Đầu năm / Giữa học kỳ / Mùa thi / Sau thi**, so trực tiếp với F0 STAGES; query cũ giữ nguyên. T01–T09 không là stage keys.
- `FlowPage` lấy `articles` từ cùng module với Library, không từ weekly subset. Không catalogue thứ hai hoặc danh sách ID bài nhập tay theo chặng; grouping không mutate nguồn hoặc có max29.
- Fixture: 29 bài có proof synthetic F0, bài thứ 99 thiếu quyền bị loại. Chọn từng chặng không đổi Library 29; weekly current đổi từ hai sang ba bài (union archive năm bài), Library vẫn 29. Thêm bài 30 bằng cùng contract vẫn nhận; proof revision sai bị F0 từ chối.
- Dẫn nhập mới nói về mốc năm học và lựa chọn đọc; không suy đoán cảm xúc/khả năng hoặc yêu cầu hoàn thành tuần tự. Không bịa nguồn khoa học/chuyên gia/chứng nhận/quy trình duyệt.
- P2 vẫn phải nối compiler/public ARTICLE vào cùng nguồn Library và đủ quyền thật. D1 không thực hiện adapter P2, không giả ARTICLE thành legacy hoặc đưa C1 ra production. Q1 kiểm lại 29 link thật theo roadmap.

## Kết quả kiểm thử

Node 24.19.0, npm 11.9.0, Chromium 154.0.8037.57 trên Linux headless, dependency theo lockfile hiện có (`npm ci --ignore-scripts`). Suite cũ ghi ảnh lịch sử được chạy trong bản sao QA riêng; không ghi đè ảnh/báo cáo các pha trước trong nhánh bàn giao.

| Kiểm | Kết quả |
| --- | --- |
| Manifest --check | PASS — 29 record giữ nguyên, không grant |
| F0 / R1 / C1 / W1 Node | PASS 22 / 12 / 34 / 12 |
| D1 Node | PASS 4/4 |
| D1 browser | PASS 6/6 |
| C1 browser | PASS 8/8 |
| R1 / W1 / N1 browser | PASS 8 / 7 / 5 |
| Hồi quy | PASS 30/30 |
| Production browser | PASS 12/12 |
| Fresh build + scanner | PASS — 29 bài withheld, public 0, canary detected |
| CI đúng head SHA | Run/job URL và từng step ở Draft PR sau khi xác minh |

D1 fixture kiểm cả bốn viewport 320/390/768/1440: route/direct/reload/title/breadcrumb/TOC/hash/focus/Back/Forward, stage → filter, AND search/topic/stage, reload và return qua related, bỏ lọc trở về đủ 29. Timeline có đủ controls hợp lệ, đúng một expanded, dùng Enter và giữ home anchor; Mây và tử đằng B còn hiện, companion không vượt viewport. Axe wcag2a/wcag2aa/wcag21aa trên D1 có bài và production empty; không suy kết quả Axe thành chứng nhận tiếp cận toàn diện.

Trong lúc viết test, kỳ vọng ban đầu về `WeeklyView.articles` bị nhầm với toàn Library hoặc chỉ current topic. Đã đối chiếu contract/mã W1: đó là union bài thuộc các topic đã bắt đầu/được phép. Chỉnh kỳ vọng test về đúng boundary hiện hành và kiểm Library riêng, không đổi selector W1, không nới guard. Log phát hiện và kết quả cuối được giữ trong bằng chứng. Typecheck ban đầu cũng phát hiện import type Article dư sau khi tách card và union options không nhận query lạ; đã bỏ import dư, giữ options kiểu string[] để bảo toàn unknown-filter state cũ.

## Production và bảo toàn

203 ARTICLE/hồ sơ/SVG được đối chiếu hash với main nền; manifest, catalogue, weekly registry và record quyền giữ nguyên. Không đổi Mây/tử đằng B, artwork, font/palette, global.css/reading.css/atmosphere.css, motion controller, LanternGarden hoặc N1 copy/CSS.

Fresh scanner: 29 artifact files, 4.335 marker, 29 withheld; `sourceView=public`, `publicSourceArticles=0`, `publicLegacyArticles=0`, `publicLegacyTopics=0`, `publicWeeklyTopics=0`, `publicWeeklyArticles=0`, `currentWeeklyId=null`, `canary=detected`. F0 canary và negative module-only fixture leak vẫn bị bắt; không có raw ARTICLE/dossier/SVG nháp/manifest/fixture/preview output. Production browser kiểm URL fixture và draft direct/query bị chặn.

## Ảnh trước/sau và giới hạn

[Geometry thô](HOME-GEOMETRY.json): timeline tăng **112 CSS px ở 390**, **41,55 CSS px ở 1440** để chứa hai CTA mới. Hero, quote, weekly và Nền tảng giữ nguyên tọa độ/kích thước; các vùng phía dưới timeline dịch xuống cùng độ tăng, kích thước từng vùng không đổi. Copy và artwork timeline cũ giữ nguyên. Đây là tác động có chủ đích của link bổ sung, không phải tuyên bố homepage mọi pixel giống trước.

Bundle JS tăng từ 317,14 → 321,23 kB (gzip 100,48 → 101,58 kB), không dependency/asset mạng/animation mới.

Ảnh ở `screenshots/`: production empty 320/390/768/1440; D1 với **dữ liệu giả lập** có banner rõ ràng; timeline trước/sau main nền ở 390/1440, cùng browser/viewport/font/art readiness/random seed/reduced motion. Không coi ảnh fixture là 29 bài thật đã công bố.

Chưa kiểm native zoom 200% (chỉ viewport 720 CSS px/DPR2 tương đương reflow), screen reader, Safari/Firefox/Edge, thiết bị iOS/Android/tablet thật, thử đọc với học sinh hoặc thẩm định độc lập. Không hứa 60fps hoặc hiệu quả tâm lý. CI chỉ chạy Node/type/build/scanner; browser/screenshot chạy local và được ghi riêng.

Chủ dự án duyệt cách dẫn nhập bốn chặng, hai CTA và tác động chiều cao timeline trong COPY-REVIEW/ảnh. Không có quyết định nào trong D1 cấp quyền cho 29 bài. Dừng tại Draft PR, không tự merge/deploy/publish hoặc bắt đầu G1/P1/P2/W2/Q1.

## Bằng chứng và chạy lại

[TEST-RESULTS.json](TEST-RESULTS.json) kèm raw logs trong `verification/`; [bảo toàn nguồn](SOURCE-PRESERVATION.json): 663 blob nền, 654 không đổi; chỉ chín tệp nền thuộc scope được sửa. 203/203 tệp nháp khớp hash; các tệp mới không thay nguồn bài. C1 coverage ở bốn viewport đều đủ 29 bài, 4.716 AST = 4.716 DOM node, 29 SVG, 25 bảng và 0 Axe violation. Contrast từ token cũ trên cream: ink 10,10:1, muted 5,35:1, plum 6,29:1; không đổi palette.

| Ảnh | Liên kết |
| --- | --- |
| Trang thật production, đầu trang | [desktop](screenshots/flow-empty-top-1440.jpg) · [mobile](screenshots/flow-empty-top-390.jpg) |
| Toàn trang thật | [desktop](screenshots/flow-empty-full-1440.jpg) · [mobile](screenshots/flow-empty-full-390.jpg) |
| Empty state qua lượt điều hướng | [320](screenshots/flow-empty-320.jpg) · [390](screenshots/flow-empty-390.jpg) · [768](screenshots/flow-empty-768.jpg) · [1440](screenshots/flow-empty-1440.jpg) |
| Fixture có bài, KHÔNG phải nội dung thật | [320](screenshots/flow-fixture-320.jpg) · [390](screenshots/flow-fixture-390.jpg) · [768](screenshots/flow-fixture-768.jpg) · [1440](screenshots/flow-fixture-1440.jpg) |
| Timeline mobile trước / sau | [trước](screenshots/before-home-flow-390.jpg) · [sau](screenshots/after-home-flow-390.jpg) |
| Timeline desktop trước / sau | [trước](screenshots/before-home-flow-1440.jpg) · [sau](screenshots/after-home-flow-1440.jpg) |

Từ `prototype/`, dùng Chromium hiện có hoặc CHROMIUM_PATH. Chạy suite cũ trong bản sao QA để không ghi đè ảnh lịch sử:

```sh
npm ci --ignore-scripts
npm run content:manifest -- --check
npm run test:f0
npm run test:r1
npm run test:c1
npm run test:w1
npm run test:d1
npm run test:d1:browser
npm run test:c1:browser
npm run test:r1:browser
npm run test:w1:browser
npm run test:n1:browser
npm run test:e2e
npm run build
npm run test:production
npm run test:content
```
