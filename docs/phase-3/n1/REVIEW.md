# N1 — Trang Nền tảng

Ngày 26/10/2026, Asia/Saigon. Nhánh `phase-3-n1-foundation-page`. Chỉ N1 được cấp phép; bàn giao tại Draft PR, không merge, deploy, publish hoặc triển khai D1/G1/Q1.

## Nền và phạm vi

PR #22 đã merge lúc **09:48:15 ngày 26/10/2026**, giờ Việt Nam. Main nền `23d922582064d3e6a0dd48f6e53f9b8ec05a0a96`, tree `be581bb9a2515639e0525ed98da7107386ca2219`. Git fetch thành công. GitHub connector và Git xác nhận cùng SHA; đối chiếu **626/626 blob** nguồn theo Git SHA-1, không thiếu hoặc sai khác. Main kiểm lại trước bàn giao vẫn cùng SHA.

Đã đọc PRODUCT, DESIGN, AGENTS, IMPLEMENTATION-ROADMAP, CONTENT-INTEGRATION, QA-PLAN, F0-CONTRACT/F0-REVIEW, R1 READER-CONTRACT, C1 REVIEW và W1 REVIEW; kiểm trực tiếp App, router, ReadingShell, typography, LanternGarden, catalogue, weekly selector, manifest và publication scanner. Áp dụng bản Impeccable được ghim qua fallback đọc trực tiếp; không chạy context loader, launcher hoặc engine upstream.

## Nội dung và giao diện

Trang có chín phần: đối tượng/mục đích; cách đọc; nguồn và đối chiếu; ba mức Bloom; hình và mô tả chữ; trạng thái nội dung; giới hạn giáo dục; tìm người hỗ trợ; riêng tư. [Bản diễn đạt đầy đủ để duyệt](COPY-REVIEW.md).

Dùng ReadingShell hiện có, typography `article-title`, `article-prose`, `reader-layout`, mục lục, Arrow, breadcrumb và recovery links. Không dựng Reader thứ hai, không lấy nội dung của 29 ARTICLE để viết trang giới thiệu. Không thêm form, điểm số, tài khoản, backend hay animation.

Route logic `/nen-tang` tiếp tục dùng **HashRouter** hiện hành: URL thực tế khi chạy tại repository base là `/Kho-ng-gian-Insight/#/nen-tang`; không đổi sang history routing hoặc yêu cầu server rewrite. Mục lục dùng hash sâu và RoutePosition sẵn có để cuộn/focus, reload và Back/Forward. Khi mở trực tiếp một route không có hash sâu, ReadingShell giữ hành vi hiện có: skip link đưa focus vào main; điều hướng giữa các trang đưa focus vào main. Không tuyên bố initial load tự focus main.

Header “Về khu vườn” và anchor logic `/#nen-tang` vẫn về section cũ (URL thực `#/#nen-tang`). Giữ nguyên toàn bộ copy, tiêu đề và CTA cũ “Tìm một trang dành cho bạn”; chỉ thêm CTA “Tìm hiểu nền tảng”. Các lối đến `/thu-vien`, `/chuyen-de`, `/#tam-tinh` đều là route/anchor hiện có. Không tạo route Dòng chảy mới.

| Tệp | Thay đổi |
| --- | --- |
| prototype/src/reading/FoundationPage.tsx | Nội dung giới thiệu mới, mục lục, sections, lối đọc tiếp; JSX text thuần |
| prototype/src/reading/Router.tsx | Thêm route và document title; giữ các route/selector khác |
| prototype/src/reading/ReadingShell.tsx | Breadcrumb nhận parent tùy chọn; `parent=null` cho Trang chủ / Nền tảng; mặc định bài/chuyên đề giữ nguyên |
| prototype/src/App.tsx | Thêm đúng một link trong section Nền tảng cũ, giữ link và copy cũ |
| prototype/src/styles/foundation.css | Năm quy tắc khu trú cho trang và cụm link mới; dùng token cũ, không sửa stylesheet đã duyệt |
| prototype/tests/foundation.spec.ts, playwright.n1.config.ts | Route, focus, history, anchor, keyboard/menu, nội dung, Axe, responsive, ảnh và reflow |
| prototype/tests/production.spec.ts | Thêm N1 tại repository base, reload, deep hash và thư viện vẫn rỗng |
| prototype/playwright.config.ts, package.json, .gitignore | Tách suite N1; lệnh test; bỏ output tạm khỏi Git. Không đổi dependency/lockfile |
| docs/phase-3/n1/ | Copy review, báo cáo, bằng chứng kiểm, ảnh trước/sau |

## Đối chiếu các tuyên bố

| Nội dung trên trang | Căn cứ và giới hạn |
| --- | --- |
| Giáo dục tâm lý học đường, THCS–THPT, người lớn đồng hành | PRODUCT và phạm vi N1 do chủ dự án giao; mục tiêu giáo dục, không hứa hiệu quả lâm sàng |
| Nguồn có thể truy tìm, lưu ý bối cảnh và giới hạn | STANDARDS.md và contract R1/C1; diễn đạt là nguyên tắc biên soạn, không khẳng định tất cả tài liệu đã được thẩm định độc lập |
| Ghi nhớ – Thấu hiểu – Vận dụng, không chấm điểm | STANDARDS mục 3 và yêu cầu N1; ba mức được chọn, không gọi là toàn bộ Bloom. Không thêm nghiên cứu, DOI hoặc kết quả xác minh chưa làm |
| Hình/alt/caption/mô tả và xem lớn bằng phím | R1 Reader + C1 adapter/test; không hàm ý 29 hình đã được công bố |
| Nghiệm thu nội bộ khác phê duyệt chuyên môn và quyền công bố | F0 exact revision/hash/proof boundary; source-manifest và catalogue không thay đổi |
| Thư viện public hiện 0 bài | Build/scanner và production browser; câu này cần rà lại nếu có PR cấp quyền công bố sau này |
| Không tư vấn trực tuyến, không người nhận lời tâm tình | LanternGarden không network/storage/inbox; không thêm dịch vụ hay người phụ trách giả |
| Chỉ tồn tại tạm ở giao diện; xóa khi thả/rời homepage sang route khác | `text`/textarea được clear trước animation; unmount bỏ trạng thái. `pagehide` cũng clear. Chuyển anchor ngay trên homepage không unmount, vì vậy trang mới nói rõ không đồng nghĩa với xóa |
| Không cam kết bảo mật tuyệt đối hoặc xóa vật lý RAM | Không kiểm soát tiện ích/thiết bị/hosting; không bịa chính sách lưu log của hạ tầng. Không nhập thông tin thật trong test |

Các kiểm kỹ thuật không xác nhận khoa học, duyệt chuyên môn, hiệu quả học hay quyền xuất bản. Chưa có chuyên gia độc lập/người học duyệt bản giới thiệu trong phiên này; chủ dự án xem các điểm trong COPY-REVIEW.

## Kiểm thử

Môi trường: Node **24.19.0**, npm **11.9.0**, Chromium **154.0.8037.57**, Linux headless; Playwright và Axe theo lockfile hiện hành. `npm ci --ignore-scripts` dùng đúng lockfile, không đổi package version. Không còn BLOCKED proxy cho các bước đã chạy. Các suite cũ ghi ảnh lịch sử được chạy trong bản sao QA riêng, không ghi đè tài liệu/ảnh Phase 2, R1, C1 hoặc W1 trong nhánh bàn giao.

| Kiểm | Kết quả |
| --- | --- |
| content:manifest -- --check | PASS — 29 record không đổi, không cấp quyền |
| test:f0 | PASS 22/22 |
| test:r1 | PASS 12/12 |
| test:c1 | PASS 34/34 |
| test:w1 | PASS 12/12 |
| test:n1:browser | PASS 5/5 |
| test:c1:browser | PASS đủ 8 ca — lượt đầu 7/8; chạy lại riêng 1440 đạt 1/1 |
| test:r1:browser | PASS 8/8 |
| test:w1:browser | PASS 7/7 |
| test:e2e | PASS 30/30 |
| test:production | PASS 8/8 |
| npm run build + test:content | PASS — fresh output, typecheck + Vite + scanner |
| GitHub Actions tại đúng head SHA | Kết quả và run/job URL ở phần kiểm CI trong Draft PR |

N1 kiểm 320/390/768/1440, một h1 và chín h2 có liên kết mục lục, breadcrumb, title, deep link/reload, Back/Forward/focus, skip link, Enter, menu Escape/focus return, lối đến các khu vực liên quan và anchor cũ. Không tràn ngang, không lỗi pageerror; Axe `wcag2a/wcag2aa/wcag21aa` không violation trên trang N1 ở bốn viewport. Không có input/textarea/form mới. Đã xem ảnh render desktop/mobile và vùng riêng tư. Tỷ lệ contrast tính từ token cũ trên nền cream: ink **10.10:1**, muted **5.35:1**, plum **6.29:1**; Axe kiểm thêm DOM thực tế. Không suy kết quả Axe thành chứng nhận accessibility toàn diện.

Lượt N1 đầu có bốn test FAIL vì assertion của test kỳ vọng href `/#/#bai-viet`, trong khi HashRouter hiện có sinh `#/#bai-viet`; đã sửa kỳ vọng test về đúng href hiện hành, không sửa link ứng dụng để che lỗi. Lượt cuối 5/5 PASS. Đồng thời sửa một token border chưa tồn tại trong CSS mới sang `--sage-middle` đã có trước khi build/ảnh cuối.

C1 browser lượt đầu 7/8: request SVG cục bộ của KGNT-C04 tại 1440 bị `apiRequestContext.get: read ECONNRESET`. Không bỏ assertion hoặc thêm retry; chạy lại riêng nguyên ca 1440 trong môi trường không chạy song song các suite khác đạt 1/1, đủ 29 bài. Chưa xác định căn nguyên của lần reset kết nối; không gọi đó là lỗi nội dung hoặc đã sửa mã server. Bốn coverage cuối đều 29 bài, 4.716 AST = 4.716 DOM node, 29 SVG, 25 bảng, 4 r2/25 r1 và 0 Axe violation.

[Bằng chứng máy đọc được](TEST-RESULTS.json) kèm raw logs trong `verification/`; giữ cả log C1 thất bại ban đầu và lượt chạy lại. [Đối chiếu bảo toàn nguồn](SOURCE-PRESERVATION.json): 619/626 blob nền giữ nguyên; chỉ bảy tệp nền được sửa trong phạm vi đã liệt kê, các tệp N1 còn lại là mới.

## Bảo toàn và production boundary

- **203/203** ARTICLE/hồ sơ/SVG trong `docs/phase-3/drafts/` khớp Git blob SHA-1 nền. Manifest, catalogue, weekly registry, hồ sơ phê duyệt/quyền và toàn bộ F0/R1/C1/W1 logic không đổi.
- Fresh scanner: 29 file artifact, **4.335 marker**, 29 bài withheld; `sourceView=public`, `publicSourceArticles=0`, `publicLegacyArticles=0`, `publicLegacyTopics=0`, `publicWeeklyTopics=0`, `publicWeeklyArticles=0`, `currentWeeklyId=null`, `canary=detected`.
- F0/R1/C1/W1 negative tests kiểm quyền thiếu/sai revision/hash/proof, fixture và raw/escaped canary. Không nới denylist hoặc scanner để thêm trang mới.
- Không sửa Mây, tử đằng B, artwork, font, màu, global.css, reading.css, atmosphere.css, motion controller hoặc LanternGarden. JS bundle tăng từ **307,01 → 317,14 kB** (gzip **97,41 → 100,48 kB**) do nội dung/route N1; không thêm dependency, asset mạng hay vòng animation.

## So giao diện và ảnh

So main nền với build mới trên cùng Chromium, viewport 390/1440 × 1000, fonts local đã sẵn, `Math.random=.5`, reduced motion; server local dưới cùng repository base. [Geometry thô](HOME-GEOMETRY.json).

Desktop 1440: geometry tám vùng homepage giống hoàn toàn. Mobile 390: section Nền tảng tăng **52 CSS px** vì thêm link (44px + gap 8px); hero, quote, weekly giữ nguyên tọa độ/kích thước. Các vùng phía dưới dịch xuống 52px, kích thước từng vùng không đổi. Đây là tác động dự kiến của CTA bổ sung, không phải tuyên bố homepage mọi pixel giống nhau. Ảnh không được dùng để suy luận gesture hoặc độ mượt trên thiết bị thật.

| Ảnh | Liên kết |
| --- | --- |
| N1 desktop / mobile | [1440](screenshots/foundation-1440.jpg) · [390](screenshots/foundation-390.jpg) |
| Toàn trang | [desktop](screenshots/foundation-full-1440.jpg) · [mobile](screenshots/foundation-full-390.jpg) |
| Viewport khác | [320](screenshots/foundation-320.jpg) · [768](screenshots/foundation-768.jpg) |
| Riêng tư | [1440](screenshots/foundation-privacy-1440.jpg) · [390](screenshots/foundation-privacy-390.jpg) |
| Homepage trước / sau desktop | [trước](screenshots/before-home-foundation-1440.jpg) · [sau](screenshots/after-home-foundation-1440.jpg) |
| Homepage trước / sau mobile | [trước](screenshots/before-home-foundation-390.jpg) · [sau](screenshots/after-home-foundation-390.jpg) |
| Reflow tương đương | [720 CSS px, DPR 2](screenshots/foundation-reflow-720-dpr2.jpg) |

## Chưa xác minh và nghiệm thu

Chưa kiểm native browser zoom 200% (chỉ reflow tương đương 720 CSS px/DPR 2), screen reader, Safari/Firefox/Edge, thiết bị iOS/Android/tablet thật, người học thử đọc hoặc duyệt chuyên môn độc lập. Không tuyên bố 60fps, hiệu quả tâm lý hoặc đạt accessibility toàn diện. CI hiện có kiểm manifest/F0/R1/C1/W1/typecheck/build/scanner; browser và screenshot chạy local, không gọi đó là browser CI.

Chủ dự án cần duyệt cách diễn đạt trong COPY-REVIEW và tác động CTA mobile +52px. Không có quyết định nào trong PR này tự cấp quyền cho 29 bài. Dừng tại Draft PR N1; không tự merge, deploy, publish hoặc mở giai đoạn tiếp theo.

## Chạy lại

Từ `prototype/`, dùng dependency theo lockfile:

```sh
npm ci --ignore-scripts
npm run content:manifest -- --check
npm run test:f0
npm run test:r1
npm run test:c1
npm run test:w1
npm run test:n1:browser
npm run test:c1:browser
npm run test:r1:browser
npm run test:w1:browser
npm run test:e2e
npm run build
npm run test:production
npm run test:content
```

Chromium executable mặc định `/usr/bin/chromium`, hoặc `CHROMIUM_PATH` theo cấu hình hiện hành. Chạy các suite cũ trong bản sao riêng vì chúng ghi ảnh vào tài liệu lịch sử. Xem trang local bằng `npm run dev -- --host 127.0.0.1`, mở `http://127.0.0.1:5173/#/nen-tang`; không deploy public preview.
