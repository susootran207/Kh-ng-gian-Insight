# R1 — Bàn giao Article Reader fixture

Ngày25/10/2026, Asia/Saigon. Nhánh **phase-3-r1-article-reader**, Draft PR vào main. Chủ dự án cho phép riêng R1; chưa cho phép C1 hoặc xuất bản.

## Nền và phạm vi

PR #18 đã merge lúc **21:28:04 ngày 25/10/2026**, giờ Việt Nam. Main `1304bb32f73da50fe931c2197d641370e2bf202a`, tree `44cdd35b86f8e866ea1d7fb2c5abb8e4c092dbe9`.

Git fetch vẫn lỗi proxy. Dùng GitHub connector và snapshot F0, đối chiếu toàn bộ **547/547 blob main khớp SHA-1**, không truncated; không lấy local HEAD cũ làm parent. Đã đọc F0-CONTRACT/F0-REVIEW, roadmap, content integration, QA, PRODUCT/DESIGN/AGENTS và mã hiện hành.

Trong phiên này lệnh npm được cấp quyền mạng đã kết nối proxy/registry, nên npm ci theo lockfile thành công. Không đổi phiên bản dependency cũ để né lỗi. F0 từng bị BLOCKED build trong môi trường trước là lịch sử được giữ nguyên; kết quả mới dưới đây không ghi đè F0-REVIEW.

Áp dụng trực tiếp skill Impeccable từ bản ghim trong repo cho Read mode, typography/responsive/accessibility; context launcher/engine không chạy theo AGENTS. Không thiết kế lại website.

## Thành phần và tệp thay đổi

- [Contract/luồng dữ liệu](READER-CONTRACT.md): GFM parser build-side →ReaderDocument/trace →React Reader.
- Mới: build/reader-document.ts; src/reading/markdown/{model,ArticleReader}; styles/markdown-reader.css.
- Tách ReadingShell/header/footer/breadcrumb/RoutePosition hiện có sang ReadingShell.tsx; Router dùng lại cùng markup/hành vi, export Library để harness kiểm return thật.
- Mới: fixture MD/SVG, harness HTML/TSX/declaration và vite.r1.config.ts serve-only trên127.0.0.1.
- F0: trích xuất assertSafeSvg dùng chung, bổ sung chặn style/attribute escape; thêm kiểm module IDs test-only trong generateBundle. Không thay gate phê duyệt/publication.
- Mới: 12 Node tests R1, Playwright R1 config/spec, tsconfig.r1. Sửa config e2e để tách .spec.ts khỏi Node .test.mts; thêm ca production chặn fixture.
- package/lock: ba parser devDependency pin exact, thêm 57 entries transitive; **0 phiên bản dependency cũ thay đổi**. Scripts và THIRD_PARTY_NOTICES cập nhật cho R1.
- Tổng 32 tệp thay đổi: 8 tệp nền sửa, 24 tệp mới; 539 blob nền còn lại giữ nguyên. Hai tài liệu R1 và bảy screenshot JPEG trực tiếp từ Chromium; không chỉnh sửa/ghép ảnh, không thay ảnh lịch sử.

Renderer cũ vẫn phục vụ bốn mẫu legacy; R1 mới chỉ được gọi qua harness fixture, không nối 29 bài hoặc đổi catalogue.

## Kết quả kiểm thực tế

Node 24.19.0, TypeScript theo lockfile, Chromium hệ thống qua Playwright. Không test nào bị bỏ qua trong các suite đã chạy.

| Lệnh / ca | Kết quả |
|---|---|
| npm ci theo lockfile | **PASS**, 83 packages nền cài thành công; sau đó thêm parser đúng mục đích R1 bằng npm install --save-dev --save-exact --ignore-scripts; không sửa dependency cũ |
| npm run test:r1 | **PASS 12/12**; gồm typecheck tsc -p tsconfig.r1.json và kiểm AST/safety/trace/canary/graph |
| npm run test:f0 | **PASS 22/22** sau thay đổi R1; cả fixture thứ 30 và proof/hash/rights fail-closed còn nguyên |
| npm run build | **PASS**, TypeScript/Vite/F0 scanner;29 output files, 4335 markers, 29 bài bị giữ, public source 0/legacy 0/topic 0, canary detected |
| npm run test:r1:browser | **PASS 8/8**, Chromium thật, không test mock thay browser |
| npm run test:e2e | **PASS 30/30**, gồm library/Reader cũ, filter/history/route/TOC, Mây, B, responsive/Axe, reduced motion, thả đèn/quyền riêng tư |
| npm run test:production | **PASS 5/5** dưới /Kho-ng-gian-Insight/ không SPA fallback; bao gồm direct route/query/raw harness/MD/SVG fixture bị loại |
| vite build --config vite.r1.config.ts | **PASS negative case:** exit 1 với “R1 fixture harness is serve-only on127.0.0.1”; không tạo fixture build |
| 200%-equivalent reflow | **PASS phần mô phỏng:** 720 CSS px, DPR 2, không tràn/cắt, TOC đổi normal flow và giữ focus |
| Zoom native qua browser UI/API | **Chưa xác minh**. Probe extension tạm cho chrome.tabs.setZoom không tạo được service worker trong Chromium headless (timeout 5s); profile/extension tạm đã xóa. Không gọi phép mô phỏng phía trên là kết quả zoom native |
| Safari/Firefox, screen reader, thiết bị thật | **Chưa thực hiện**; không suy đạt toàn diện accessibility từ Axe |

Kết quả build/30e2e/5production được chạy trong bản sao QA riêng để scripts không ghi đè ảnh Phase2 trong nhánh bàn giao. Chỉ ảnh R1 được sao về docs/phase-3/r1/screenshots.

### Reader đã kiểm được gì?

- Bốn viewport 320/390/768/1440: **169 AST nodes khớp 169 DOM receipts** mỗi viewport; vị trí/source hash và thứ tự node đúng; từng leaf value đầy đủ sau chuẩn hóa whitespace. Source hash fixture: `cc93da844753be02fe42da06516a1878bebe800f8f16cb5b8dd8cf8180717536`. Offset là UTF-16, hash slice dùng UTF-8.
- Chín heading h2/h3, anchor trùng có hậu tố; TOC/focus/hash/reload và link trong bài đúng.
- Quay lại **Library hiện có** giữ q=mua thi và kết quả thật của catalogue mẫu. Skip link kiểm ở lần tải mới, không nhầm focus khi chuyển route.
- Bold/italic/delete, list lồng, blockquote, bảng header/alignment, code inert, APA/DOI/HTTPS/link definition và line break giữ đầy đủ.
- Bảng rộng cuộn bằng bàn phím ở320/390, không tràn toàn trang. Code block cuộn nhận focus.
- Một SVG dài với alt/caption/mô tả; native dialog mở bằng Enter, focus vào Đóng, zoom 150%, cuộn hai chiều bằng phím, Tab cycle, Escape/nút đóng trả focus; reduced motion giữ thao tác.
- Axe A/AA không violation trên bốn viewport và dialog. Không có textarea hoặc input tương tác trong Reader; checklist GFM chỉ đọc/disabled.
- Code giống script được escape thành chữ; HTML/MDX HTML, URL nguy hiểm, asset lạ/traversal/thiếu alt hoặc hình thiếu caption/mô tả bị reject.

### Những lỗi đã phát hiện và sửa

1. Axe phát hiện pre cuộn không thể focus trên320/390: bổ sung tabindex và tên vùng; không bỏ rule.
2. Vòng Tab native ở cuối dialog chưa trở về control đầu theo yêu cầu: thêm xử lý đầu/cuối cho Tab/Shift+Tab, giữ Escape và native dialog semantics.
3. Harness skip-link test từng dùng goto chỉ đổi hash sau Library nên main đang được focus đúng theo route. Chỉnh test reload để đo entry mới; không đổi RoutePosition để làm test qua.

Không có lỗi chức năng R1 còn thất bại trong các suite cuối. Các mục chưa xác minh vẫn ghi rõ, nhất là zoom native/assistive/thiết bị.

## Bằng chứng không rò fixture và bảo toàn

- Production graph không chứa module tests/fixtures, tests/reader-harness hoặc virtual:r1-fixture. Negative test chèn module có code “sạch” vẫn bị F0 reject.
- Scanner thật bắt compiled fixture, Unicode sentinel, SVG đổi tên; negative canary F0 vẫn phát hiện. Production artifact 29 files không có raw MD/JSON/map/fixture chunks/assets.
- Browser production: #/r1/fixture?preview=true là404 của app; thư viện với query preview/r1 vẫn0 bài; harness HTML/fixture MD/SVG và __r1_assets trả HTTP404.
- Harness không mở bài thật qua /@fs: ARTICLE C01 ngoài serving allowlist trả 403. URL lạ/query không mở asset ngoài allowlist.
- Giữ nguyên **203 tệp ARTICLE/dossier/SVG**, matrix, source-manifest.json, catalogue.json và mọi trạng thái/phê duyệt thật.
- App.tsx, main.tsx, nội dung trang chủ, global.css/atmosphere.css/reading.css, Mây/CatArt/tử đằng B và artwork/font/public giữ nguyên byte.
- CSS artifact và toàn bộ binary artwork/font/license public khớp baseline build cùng phiên. JS có thể đổi hash do tách module shell; không tuyên bố toàn artifact byte-identical.
- Không backend/login/analytics/thu đáp án, không tạo proof published thật, không lấy fixture thành nội dung học thuật đã duyệt.

## Ảnh render

Đã xem trực tiếp cả bảy ảnh, cùng font/art local đã sẵn sàng; ảnh body được chụp sau cuộn, không phải trang chủ hoặc mockup.

| Góc xem | Ảnh |
|---|---|
| Desktop mở đầu | [1440](screenshots/reader-top-1440.jpg) |
| Mobile mở đầu và TOC | [390](screenshots/reader-top-390.jpg) |
| Prose hẹp | [320](screenshots/reader-body-320.jpg), [390](screenshots/reader-body-390.jpg) |
| Prose tablet/desktop | [768](screenshots/reader-body-768.jpg), [1440](screenshots/reader-body-1440.jpg) |
| Hình lớn, zoom 150%, focus nút Đóng | [390](screenshots/reader-figure-390.jpg) |

## Giới hạn và điểm dừng

- Chỉ fixture, chưa render/kiểm 29 bài thật, chưa C1. Không xem kết quả fixture là kiểm APA/Bloom/khả dụng hay chuyên môn của 29 bài.
- v1 từ chối footnote, body heading ngoài h2/h3 và convention figure khác thay vì mất nội dung âm thầm. Adapter tương lai phải xử lý ngoại lệ được review, không sửa bài đã nghiệm thu cho vừa parser.
- Probe zoom native bị chặn ở cơ chế extension test headless; còn cần kiểm zoom 200% bằng browser UI thực cùng screen reader/thiết bị và các browser khác trước nghiệm thu tổng.
- SVG validator là allowlist bảo thủ tái sử dụng F0, không phải parser XML/sanitizer tổng quát. Renderer không cấp quyền công bố tài sản.
- Repo GitHub công khai; loopback/harness không làm source thành private.

**Dừng tại Draft PR R1 để chủ dự án nghiệm thu. Không merge, deploy, publish hoặc tự bắt đầu C1.**
