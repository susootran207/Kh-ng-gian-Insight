# Q1 — tổng kiểm website V1.0

Ngày 27/10/2026, giờ Việt Nam. Nền `e5c777cf4dc057c8fe589360380fdb7a12762ca0`, PR #30 đã merge vào main lúc 13:32:11 +07:00. Git fetch/fast-forward main xong trước QA; nhánh `phase-3-q1-final-qa`. Các giới hạn “chưa bắt đầu Q1” trong tài liệu cũ được thay bằng chỉ thị Q1 hiện tại, không mở quyền phát hành.

**TECHNICAL PASS trong phạm vi đã kiểm; RELEASE BLOCKED.** Production thật vẫn 0 bài/0 chuyên đề do thiếu record/proof F0; không phải lỗi giao diện P2/W2. Nghiệm thu nội dung 29 bài của chủ dự án giữ nguyên, không mở lại kiểm toán AI. Không merge/deploy/publish, tạo hosting/DNS/token/GitHub App, đổi private hoặc tự cấp hồ sơ.

[Log/kết quả](TEST-RESULTS.json) · [lỗi/ưu tiên/tái hiện](ISSUES.md) · [29 bài/10 chuyên đề](INVENTORY.md) · [artifact/digest](PRODUCTION-ARTIFACT.json) · [Cloudflare/repo](CLOUDFLARE.md) · [kiểm thủ công còn thiếu](MANUAL-CHECKS.md).

## Môi trường và cách đọc trạng thái

Node24.19.0/npm11.9.0, Chromium154.0.8037.57 Linux headless, Playwright/dependency theo lockfile nguyên vẹn. Suite chạy tuần tự trong `work/q1` để tránh ghi đè ảnh/báo cáo lịch sử, một worker, không tự retry, không sửa assertion hay app để test xanh. Cài đặt dùng cache trong workspace; lượt đầu cache mặc định không ghi được làm mất dependency ở bản sao, log giữ riêng. Sau đổi cache, npm ci theo lockfile thành công, không đổi package/lock.

- **PASS thực tế:** lệnh thật, compiler/scanner/HTTP hoặc hành vi trong Chromium headless đã chạy; không phải mô tả dự kiến.
- **PASS mô phỏng:** viewport 320/390/768/1440/1920, keyboard do Playwright gửi, OS reduced motion giả lập, clock/events/fixture proof hoặc reflow720/DPR2; chạy trên browser thật nhưng không chứng minh thiết bị/người dùng thật.
- **NOT TESTED:** native zoom200%, NVDA/VoiceOver, Safari/Firefox/Edge, iOS/Android/tablet thật, thử đọc người học/giảng viên, native BFCache mọi tổ hợp và Cloudflare response/rollback thực. Không lấy Axe/reflow thay các mục đó.
- **BLOCKED:** release29/29, quyền SVG, topic proof/lịch thật và các hồ sơ F0 còn thiếu. Không dùng fixture tổng hợp làm chứng nhận nguồn thật.

## Theo từng phân hệ

| Phân hệ | Kết quả và bằng chứng đã kiểm |
|---|---|
| Trang chủ | Hồi quy kiểm bố cục/font/link/menu/quote/weekly/timeline/inline reading/Mây/B/privacy/reduced motion. Preview P2/W2 dùng nguồn29, production dùng empty copy đúng quyền; không thay artwork/font/palette/composition |
| Nền tảng | N1 kiểm mục đích/giới hạn/không tham vấn trực tuyến, privacy/safe destinations, direct/reload/anchor/main focus, keyboard/Axe bốn viewport |
| Thư viện | C1/P2 kiểm29 unique routes, Vietnamese có/không dấu/case/whitespace, AND search/topic/stage/group, reset/empty, thao tác nhanh5 lượt, reload/Back/Forward/return qua related; không catalogue cạnh tranh |
| Reader | C1 kiểm từng bài source→AST→DOM preorder/range/leaf text, H1, bảng/nguồn, SVG hash/alt/caption/mô tả; TOC focus/hash/reload, dossier label→note/provenance, HTTPS tab mới, related/return. P2 kiểm lại29 routes trên full-site |
| Dòng chảy | D1/P2 kiểm4 chặng/membership/filter đúng Library, query/history/related/return, không ép tuần tự; production empty vẫn có recovery |
| Chuyên đề tuần | W1/W2 Node/browser kiểm10 mốc, current/past/upcoming preview, order/home/index/detail/filter cùng snapshot, start inclusive/end exclusive +07:00, gap/overlap/future/rollback. Library vẫn29 khi chuyển đủ10 mốc. Public không tiết lộ future hoặc draft; clock query không cấp quyền |
| Góc tâm tình | G1 kiểm quyền bỏ qua/clear/focus,500 ký tự, blank disabled, rapid same-tick submit, tối đa4 đèn/cleanup9,5s, pagehide/pageshow mô phỏng và route unmount. Canary synthetic: không request phát sinh sau asset ready, không network/storage/URL/console/DOM đèn; production có audit riêng. Không hứa xóa vật lý RAM hoặc hành vi host/extension |
| Điều hướng | HashRouter/repository prefix, direct/reload/Back/Forward, TOC hash, filter query, app404/recovery; raw source/fixture/preview resources HTTP404, Host/Origin guard. Không server article route giả làm hash deep link |
| Không đủ quyền | Production Library/weekly/flow empty trung thực,29 bài draft không mở bằng direct/query/client clock. Positive29/30 và weekly eligible chỉ bằng fixture temp tự dọn; không cấp quyền dữ liệu thật |

Các số PASS chính xác nằm trong TEST-RESULTS.json; log là nguồn sự thật nếu một lượt fail. Không gộp một lần chạy lại thành full suite PASS.

## Kết quả chạy mới

| Bộ kiểm | Kết quả |
|---|---|
| F0/R1/C1/W1/D1/G1/P2/W2 Node | PASS22/12/34/12/4/2/8/6 |
| R1/C1/W1/N1/D1/G1/P2/W2 browser | PASS8/8/7/5/6/9/5/7 |
| Hồi quy / production browser | PASS30/30 ·14/14 |
| Q1 bổ sung preview / production prefix / production root | PASS3/3 mỗi cấu hình;1920px,18 lần chuyển route+reload,3 cold contexts và HTTP asset audit |
| C1 lặp riêng | PASS5/5, NOT REPRODUCED |
| 6 build fixture/preview bị cấm | PASS âm, exit1 đúng thông báo serve-only |
| Manifest/typecheck/build/scanner/canary | PASS, build lại sau preview vẫn sạch |

Một sửa nhỏ ngoài mã UI: `prototype/scripts/serve-production.mjs` thiếu MIME SVG, audit trước sửa trả application/octet-stream cho favicon; thêm image/svg+xml, giữ server static không SPA fallback. Root Python server vốn trả đúng SVG. Log trước/sau và browser rerun được giữ; đây là helper QA, không sửa hay xác minh cấu hình Cloudflare.

## C1 keyboard pan — NOT REPRODUCED

Full C1 đạt8/8; sau khi mọi suite khác kết thúc, chạy nguyên ca `C01/C05/E02 figure keyboard...` với `--repeat-each=5`, một worker/cùngChromium/viewport390/reduced motion và cùng mã: **5/5 PASS trong1,4phút**, mỗi lần kiểm3hình/zoom150%/ArrowRight+Down/Tab/Escape. Không sửa Reader/test/assertion, không chạy đồng thời suite khác. Lỗi pan0 của W2 **NOT REPRODUCED**, nguyên nhân chưa xác định; không tuyên bố đã sửa hoặc bảo đảm không tái xuất hiện. Log `verification/follow-0.log` giữ bằng chứng riêng.

## Toàn vẹn nội dung

Tại mỗi viewport320/390/768/1440, C1 đủ **29/29 bài,4.716 AST=4.716 DOM node,25 bảng,29 SVG,0 Axe violation**. Bốn viewport tương ứng18.864 receipts. Hash SVG đối chiếu request bytes và file nguồn; alt/caption/mô tả/order còn nguyên. P2 kiểm cùng29 Reader trên full-site, không dùng29 JSON prose nhập tay. F0/P2 test thứ30 chứng minh contract/compiler không hardcode29; chưa browser riêng30.

[203 ref source/dossier/SVG giữ hash](SOURCE-PRESERVATION.json), ARTICLE/SVG/artwork/Mây/tử đằngB/manifest/catalogue/weekly/publication records và toàn mã ứng dụng không sửa. Bốn slug legacy thuộc namespace ARTICLE, không cộng hai catalogue; weekly chỉ chọn subset giới thiệu, không làm mất bài khỏi Library. Không thay revision/nội dung.

Ảnh mới gồm29 bài × mobile390/desktop1440 ở phần đầu prose, figure đại diện, và các phân hệ. Đã xem tổng quan58 ảnh prose bằng contact sheets, cùng ảnh gốc đại diệnC01/C05/E02; đây là kiểm layout khu vực chụp, không tuyên bố xem từng pixel toàn trang29 bài. Toàn văn được đối chiếu AST/DOM. Title bị cắt ở ảnh body là vị trí cuộn có chủ đích; ảnh không phải top-of-page.

## Accessibility và hiệu năng

Keyboard/skip/menu Escape/main/TOC focus, dialog Tab/ShiftTab/Escape return, zoom hình150% và pan hai hướng được kiểm bằng Playwright. Axe tags wcag2a/wcag2aa/wcag21aa không violation trong các route/state đã chạy; không là chứng nhận WCAG toàn diện hoặc speech reader PASS. Contrast được Axe kiểm trong phạm vi, ảnh mẫu đọc được; chưa đo thủ công mọi pixel/overlay/mọi trạng thái động. Reflow720/DPR2 là mô phỏng200%, native zoom vẫn NOT TESTED.

Hiệu năng: build production JS337,77kB (gzip106,31), CSS46,72kB (gzip10,78), font/art local; không dependency/motion mới. Suite hồi quy có effect budget/long task sanity check. Ba cold contexts production prefix trước sửa MIME: load145,8/164,1/173,6ms, CLS0,000356, long task lớn nhất246/210/182ms, resource transfer1.374.746byte (không gồm navigation). Root load135,2–168,4ms, CLS0,000356–0,000403, long task tối đa248ms. Dev preview có transfer16.990.091byte và CLS0,26008, phản ánh graph dev/controls/AST preview; không dùng làm production benchmark. Bản production0 bài chưa chứng minh chi phí khi có29 bài public thật. Đo bổ sung local cold contexts và1920 nằm trong verification; localhost/headless không thay mạng di động/GPU/thời gian đọc thật, không khẳng định60fps hoặc Core Web Vitals ngoài thực địa. Preview chứa29 draft là đường dev riêng, không dùng payload preview làm benchmark artifact0 public.

## Production và bản nộp

Build/scanner mới:29 output files,4.375 marker,29 withheld,sourceView=public,publicSourceArticles=0,publicLegacyArticles=0,publicLegacyTopics=0,publicWeeklyTopics=0,currentWeeklyId=null,canary=detected. Không raw ARTICLE/dossier/manifest/proof/registry/preview module/sourcemap. Graph/scanner âm và build preview serve-only vẫn phải chặn.

Release phương ánA cần29/29 đủ F0/quyền hình; record editorial của chủ dự án chưa được chuyển thành proof máy đọc, expert/readerQA/learner/assetRights/authorization còn thiếu; không tự điền.10 chuyên đề là lịch mẫu draft, cần lịch/bối cảnh/người vận hành và proof riêng. Native assistive/device QA chưa đóng. Artifact hiện sạch nhưng **chưa dùng làm bản website đầy đủ gửi giảng viên**; không upload preview để thay thế.

Cloudflare checklist chuẩn bị Direct Upload, root/prefix/hash/assets/MIME/cache/noindex/author notice/link stability và repo protections; chưa cấu hình host hoặc đổi visibility. HTML có noindex/nofollow, chưa có thông báo tác giả/tiểu luận cụ thể được duyệt; không tự suy tên tác giả từ tài khoản GitHub. Điểm dừng là Draft PR Q1 để chủ dự án nghiệm thu.
