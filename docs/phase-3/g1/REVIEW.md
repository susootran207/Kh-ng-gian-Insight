# G1 — Góc tâm tình và quyền riêng tư

Ngày 26/10/2026, Asia/Ho_Chi_Minh. Nhánh `phase-3-g1-reflection-privacy`. Chỉ G1 được cấp phép; dừng tại Draft PR, không merge/deploy/publish hoặc triển khai P1/P2/W2/Q1.

## Nền và khảo sát trước khi sửa

PR #25 đã merge lúc **18:52:44 ngày 26/10/2026 +07:00**. Git fetch và GitHub connector cùng xác nhận main `e2e3cfe21025a9e2543dafd405e2fcc1e20acfbb`, tree `1a0de4dfd744ad795f0990ad90d87724704f856a`. Worktree riêng từ đúng main, không dùng HEAD D1 cũ.

Đã đọc PRODUCT/DESIGN/AGENTS, roadmap V1.0 A, QA-PLAN/PRIV01–06, Nền tảng phần riêng tư và báo cáo F0/R1/C1/W1/N1/D1; kiểm LanternGarden, MotionRegion, App/footer, ReadingShell/RoutePosition, CSS, storage/network calls và suite cũ. Dùng Impeccable qua fallback đọc trực tiếp; không chạy context loader/launcher/engine upstream. Roadmap A vẫn yêu cầu 29/29 bài/hình đủ quyền trước release; G1 không cấp quyền hoặc triển khai phát hành.

Trước G1: textarea + React `text` giữ lời tạm; release clear DOM/state trước tạo metadata, không có network/storage/backend/AI/analytics. `maxLength=500` là giới hạn UTF-16 của HTML/JS, không phải 500 grapheme. Tối đa bốn đèn hiển thị, 9,5 giây hết hạn dù CSS pause. Anchor cùng homepage giữ component; rời route unmount; `pagehide` chỉ clear lời viết. **Mảng timer giữ mọi handle đã dùng tới lúc unmount**, không xóa handle khi hết hạn/cắt đèn cũ. Guard submit đọc React state đóng trong closure, nên hai submit cùng tick có thể cùng đọc giá trị cũ dù ô DOM đã được xóa.

## Thay đổi thật sự cần thiết

| Tệp | Thay đổi và lý do |
| --- | --- |
| components/LanternGarden.tsx | Đọc DOM hiện tại để chặn submit dồn; clear DOM + state tức thì; nút xóa, skip về Library, status; pagehide/pageshow persisted reset lời/đèn/timer; cleanup listener/timer khi unmount |
| components/lanternLifetime.ts | Chỉ nhận ID, không nhận lời viết; Map tối đa bốn handle, cancel đèn bị cắt, tự delete khi expire, clear idempotent/reusable cho StrictMode |
| styles/reflection.css | Đúng một quy tắc `flex-wrap:wrap` khu trú cho hàng có ba control ở 320px; không đổi font/palette/artwork hoặc animation |
| src/App.tsx | Chỉ sửa lời riêng tư footer để phân biệt anchor/route, xóa/tải lại và không người nhận |
| reading/FoundationPage.tsx | Chỉ sửa đoạn riêng tư để đồng nhất vòng đời; không viết lại các phần N1 khác |
| tests/lantern-lifetime.test.mts, reflection.spec.ts, tsconfig/playwright G1 | Stress timer 1.000 lượt, canary/privacy, Unicode, submit cùng tick, lifecycle/navigation, keyboard/Axe/motion/reflow |
| tests/production.spec.ts | Bổ sung canary trên artifact production dưới repository base; không request/persistence, xóa/thả/bỏ qua và đồng nhất N1 |
| tests/homepage.spec.ts | Scope assertion privacy disclosure cũ vào footer, vì G1 thêm disclosure khác; giữ nguyên các assertion riêng tư và tương tác cũ |
| CI/package/.gitignore/playwright config | Thêm G1 typecheck/Node gate và lệnh browser; giữ mọi gate/dependency/lockfile, tách evidence khỏi Git |
| docs/phase-3/g1 | Báo cáo, bản diễn đạt, bằng chứng và ảnh trước/sau |

Không route mới; giữ `/#tam-tinh` (URL HashRouter thực `#/#tam-tinh`). Không thay SVG Lantern, bầu trời/trăng/cây/sao, flight 7–9s, expiry 9,5s, bounded four, Mây/tử đằng B, MotionRegion/controller hoặc animation CSS.

## Hành vi trước / sau

| Tình huống | Sau G1 và bằng chứng |
| --- | --- |
| Viết/chỉnh sửa | Tạm trong textarea + React state; không lưu lịch sử. Enter trong textarea xuống dòng, không thả |
| Blank/space/NBSP | Nút thả disabled; submit guard trim DOM hiện tại, không tạo đèn |
| Unicode | Giữ giới hạn 500 UTF-16 hiện hành; paste 300 emoji hai code unit bị giới hạn còn 500 unit; dấu kết hợp/emoji dùng trong canary. Không đổi sang đếm grapheme hoặc làm hỏng nghĩa của bộ đếm bằng nhãn “500 từ” |
| Xóa | Clear DOM/state, counter 0/500, status chung không nhắc lời, focus về textarea. Không cần chờ hoặc chạy animation |
| Thả | Clear DOM/state trước metadata; hai submit đồng tick chỉ tạo một đèn; status cũ mang tính khoảng dừng, không “đã gửi”, không hứa chữa lành |
| Thả nhiều khi đèn đang chạy | Tối đa bốn đèn **và bốn timer**, cancel handle đèn cũ bị cắt. Hết 9,5s xóa handle và metadata, không phụ thuộc animationend/reduced motion |
| Bỏ qua | Link Library có thể dùng khi chưa viết gì; route đổi focus main, unmount bỏ lời/timer/đèn, không truyền lời qua history state |
| Đổi anchor/Back/Forward giữa anchor homepage | Cùng component, giữ lời đang gõ và metadata; không coi chuyển mục là xóa |
| Đổi route, Back về homepage | Component cũ unmount; clear timers/listeners; mới trống. Focus/route theo ReadingShell sẵn có |
| Reload/rời document | Trang mới trống; pagehide clear DOM/state/notice/đèn/timer. pageshow có persisted=true clear lần nữa cho đường khôi phục trang; pageshow thường không xóa lời đã gõ sớm trong lúc trang đang tải |
| pagehide/pageshow persisted | Đã dispatch sự kiện mô phỏng trong Chromium, assert rỗng/không timer. Chưa chứng minh mọi đường BFCache native, tab discard/restore hoặc browser form-history trên mọi OS |
| Chỉ ẩn tab/visibilitychange | Không clear lời; MotionRegion cũ pause animation. Không hứa đổi tab là xóa; expiry JS có thể bị browser throttle khi background, được thực hiện khi event loop chạy lại |
| Không an toàn | Hướng dẫn tìm người lớn đáng tin cậy/hỗ trợ trực tiếp, không chờ website; không thu thập hoặc phân tích lời viết |

Lời hiển thị ở Góc tâm tình, footer và Nền tảng được đối chiếu trong [COPY-REVIEW](COPY-REVIEW.md). Không cam kết bảo mật tuyệt đối hoặc xóa vật lý RAM/bản sao thiết bị/tiện ích; không bịa chính sách log của hosting. Không input tên/contact, không backend, inbox, tài khoản, analytics, chấm điểm/chẩn đoán hoặc AI đọc lời.

## Kiểm thử thực chạy

Node 24.19.0, npm 11.9.0, Chromium 154.0.8037.57 Linux headless, theo lockfile không đổi (`npm ci --ignore-scripts`). Suite cũ chạy trong bản sao QA để không ghi đè ảnh/báo cáo lịch sử.

| Bộ kiểm | Kết quả |
| --- | --- |
| Manifest --check | PASS — 29 record không đổi |
| G1 typecheck/Node | PASS 2/2 — stress 1.000 lượt và clear/reuse |
| G1 browser | PASS 9/9 |
| F0 / R1 / C1 / W1 / D1 Node | PASS 22 / 12 / 34 / 12 / 4 |
| C1 browser | PASS 8/8 |
| R1 / W1 / N1 / D1 browser | PASS 8 / 7 / 5 / 6 |
| Hồi quy | PASS đủ 30 ca — lượt đầu 29/30, ca clock chạy lại 1/1 |
| Production browser | PASS 13/13 |
| Fresh build + scanner/canary | PASS — public 0, 29 withheld, 4.335 marker, canary detected |
| CI đúng head SHA | Run/job và từng step tại Draft PR sau khi xác minh |

### Bằng chứng riêng tư

Canary chỉ là chuỗi kỹ thuật giả lập có tiền tố G1_PRIVATE_TEST/G1_PRODUCTION_CANARY, dấu Việt/ký tự kết hợp/emoji; không phải tâm tình thật. Không nhập thông tin thật vào ảnh/log/repository. Ảnh bàn giao chụp input trống; traces khi test thất bại chỉ có canary synthetic, không ảnh lời thật.

Browser canary ở cả motion thường/reduced: HTTP request audit URL/headers/body sau khi asset/font sẵn cho kết quả **không request phát sinh** khi viết/chỉnh/xóa/thả. Console/pageerror không chứa canary. WebSocket listener gắn trước load để quan sát frames (dev HMR); không frames chứa canary. localStorage/sessionStorage/IndexedDB/CacheStorage/cookie đều rỗng; URL/history/DOM/attributes đèn/status sau thả không có canary. Audit production riêng không có HMR, cùng kiểm no-request/no-persistence và public catalogue rỗng.

Nguồn không có sink network/storage/console/error telemetry cho lời viết; không thêm SDK. Đây là kiểm chức năng website trong môi trường đã chạy, không bằng chứng DLP mọi extension/thiết bị hoặc xóa vật lý heap. Không dump React fiber/heap để giả vờ chứng minh xóa RAM; clear state được đối chiếu bằng mã và hành vi input/counter/rerender/navigation.

Timer browser test dùng Playwright clock và instrumentation **chỉ trong test** để đếm handle 9,5s; Node dùng scheduler giả lập để chứng minh bookkeeping, không gọi đó là browser test. Lượt đầu monitor gắn sau component nên không thấy scheduler đã capture; đã chuyển lên init trước mount. Sau đó đổi assertion cleanup sang poll sau khi route/main hoàn tất để chờ passive effect React thực thi, không bỏ kiểm hoặc tăng giới hạn timer. Các ca cuối xác nhận handle về 0. Typecheck ban đầu bắt nullable ref/timer handle DOM-vs-Node trong test; đã chỉnh kiểu/khởi tạo rõ ràng, không đổi dependency hoặc guard.

Axe wcag2a/wcag2aa/wcag21aa ở section đóng/mở disclosure và viewport 320/390/768/1440 không violation. Kiểm Enter/Space, focus xóa về textarea/skip về main, giới hạn 500, reflow, thông báo status chung, normal/reduced motion. Không yêu cầu animation hoàn thành để clear/status. Native screen reader/zoom chưa được xác minh; không tuyên bố accessibility toàn diện từ Axe.

## Bảo toàn và ảnh

[Geometry thô](HOME-GEOMETRY.json), main nền so cùng Chromium 390/1440 × 1000, font/art readiness, Math.random=.5, reduced motion, input trống/disclosure đóng. Sáu vùng trước Góc tâm tình giữ nguyên tọa độ/kích thước. Section tăng **328,80 CSS px ở 390**, **308,91 CSS px ở 1440** do phần dẫn nhập/quyền riêng tư/thao tác mới; footer dịch xuống tương ứng, kích thước footer đóng không đổi. Không tuyên bố mọi pixel/relative position trong bầu trời giống trước: artwork và animation source giữ nguyên, container cao hơn.

[Probe control 320](CONTROL-REFLOW.json): row rộng 280px; nếu tắt wrap tạm trong DOM kiểm thử, cả hai nhãn nút bị ép hai dòng (cao 72/60px), có wrap thì nhãn một dòng (53/44px). Đây là nhu cầu responsive đã đo cho đúng một CSS rule mới; không đổi CSS ứng dụng trong lúc probe hoặc cập nhật baseline giả.

Đối chiếu hash 203 ARTICLE/dossier/SVG với main nền; manifest/catalogue/weekly registry/publication records và mọi F0/R1/C1/W1/D1 boundary không đổi. Không P1/P2/W2/Q1, không quyền thật hoặc public content mới. Scanner vẫn từ chối 29 nguồn nháp, raw/fixture/preview/maps; production 0 bài là hiện trạng trước P2, không thay tiêu chí release A đủ29/29.

## Giới hạn và điểm dừng

Chưa kiểm native browser zoom 200% (chỉ reflow 720 CSS px/DPR2), screen reader, Safari/Firefox/Edge, thiết bị iOS/Android/tablet thật, native BFCache/tab discard/restore trên mọi trình duyệt, extension/autofill của bên thứ ba, chính sách log hosting hoặc thử đọc/thẩm định độc lập. Không suy fake event/viewport thành thiết bị thật, không hứa expiry đúng mili giây khi browser đóng băng/throttle event loop. CI chỉ type/Node/build/scanner; browser và ảnh chạy local.

Chủ dự án duyệt cách diễn đạt/lối bỏ qua/xóa và tác động chiều cao section. Dừng tại Draft PR G1, không merge/deploy/publish hoặc tự bắt đầu P1/P2/W2/Q1.

## Bằng chứng, ảnh và chạy lại

[TEST-RESULTS.json](TEST-RESULTS.json) kèm raw logs/hash trong `verification/`. [SOURCE-PRESERVATION.json](SOURCE-PRESERVATION.json): 712 blob nền, 703 không đổi; chín tệp nền sửa đúng scope, 203/203 nguồn nháp giữ hash. C1 kiểm 29 bài tại cả bốn viewport, 4.716 AST = 4.716 DOM node, 29 SVG, 25 bảng và 0 Axe violation mỗi viewport.

Hồi quy ban đầu có một lỗi `clock.pauseAt: Cannot fast-forward to the past` tại test Mây ambient: pause tại epoch ngay sau install(epoch), trước khi nạp ứng dụng. Chạy lại riêng nguyên ca đạt 1/1, không sửa app/test/assertion. 29 ca khác đạt ở lượt đầu. Giữ cả hai log; flakiness setup đồng hồ của test cũ là giới hạn còn mở, không gọi kết quả là một lượt 30/30 hoặc che bằng retry.

Bundle JS 321,23 → 323,72 kB (gzip 101,58 → 102,16 kB), không dependency, asset mạng hoặc animation mới.

| Ảnh | Liên kết |
| --- | --- |
| Trang thật trước / sau mobile | [trước](screenshots/before-reflection-390.jpg) · [sau](screenshots/after-reflection-390.jpg) |
| Trang thật trước / sau desktop | [trước](screenshots/before-reflection-1440.jpg) · [sau](screenshots/after-reflection-1440.jpg) |
| Giao diện và control trống | [320](screenshots/reflection-320.jpg) · [390](screenshots/reflection-390.jpg) · [768](screenshots/reflection-768.jpg) · [1440](screenshots/reflection-1440.jpg) |
| Disclosure mở | [320](screenshots/reflection-details-320.jpg) · [390](screenshots/reflection-details-390.jpg) · [768](screenshots/reflection-details-768.jpg) · [1440](screenshots/reflection-details-1440.jpg) |

Từ `prototype/`, dùng Chromium hệ thống hoặc CHROMIUM_PATH. Các suite cũ ghi ảnh lịch sử: chạy ở bản sao QA riêng. Không dùng tâm tình thật trong test.

```sh
npm ci --ignore-scripts
npm run content:manifest -- --check
npm run test:g1
npm run test:g1:browser
npm run test:f0
npm run test:r1
npm run test:c1
npm run test:w1
npm run test:d1
npm run test:c1:browser
npm run test:r1:browser
npm run test:w1:browser
npm run test:n1:browser
npm run test:d1:browser
npm run test:e2e
npm run build
npm run test:production
npm run test:content
```

[Probe submit trước/sau](SUBMIT-RACE.json) chạy trên hai production build dưới cùng repository base bằng chuỗi kỹ thuật synthetic: hai submit trong cùng tick tạo **hai đèn ở main cũ, một đèn ở G1**, cả hai đã làm trống ô nhập. Không chụp/log lời thật. Đây là tái hiện lỗi trước sửa, không chỉ suy đoán từ sự tồn tại của tệp.
