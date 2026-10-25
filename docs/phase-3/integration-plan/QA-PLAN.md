# Kế hoạch QA và bằng chứng

Ngày 25/10/2026, Asia/Saigon. Xem [hiện trạng](CURRENT-STATE-AUDIT.md), [contract](CONTENT-INTEGRATION.md), [roadmap](IMPLEMENTATION-ROADMAP.md). Chỉ mục 1 ghi kết quả phiên này; các mục sau là kế hoạch cho PR được cấp quyền.

## 1. Đã chạy và giới hạn thực tế

Snapshot main 29510528e0cf465b8d709aed3190d9d5e8608de9 khớp GitHub toàn bộ 534 blob. Đã chạy:

```sh
python3 docs/phase-3/validate.py
python3 docs/phase-3/audit-3-2/validate.py
python3 docs/phase-3/batches/B01/validate.py
python3 docs/phase-3/batches/B02/validate.py
python3 docs/phase-3/batches/B03/validate.py
python3 docs/phase-3/batches/B04/validate.py
python3 docs/phase-3/batches/B05/validate.py
```

Tất cả PASS cấu trúc, số liệu ở CURRENT-STATE-AUDIT. Inventory bổ sung: 29/29 title/ID/slug/revision/link ARTICLE đúng, đủ sáu Markdown và SVG mỗi bài; 20 bài có bảng. Không phải kiểm khoa học, quyền hoặc hiệu quả học.

Node 24.19.0 với --experimental-strip-types import trực tiếp selectContent, assert DEV 4 bài, public 0 bài/0 topic; draft/in_review/approved bị loại; published thiếu approval bị reject. Dữ liệu test chỉ trong bộ nhớ, không ghi phê duyệt/fixture vào catalogue.

Trong bản sao work/website-audit, npm run build dừng vì TS2307 thiếu react-router-dom và TS7006 liên quan type router. npm ci offline thiếu cache yallist 3.1.1; npm ci mạng lỗi EPERM proxy:8080. **Build chưa PASS; e2e chưa chạy** vì chuỗi lệnh dừng trước e2e. test:production, Axe, browser và ảnh mới cũng chưa chạy. Không kết luận lỗi source và không đổi package/lock để né lỗi.

Dist/screenshots/report sẵn có và REVIEW Phase 1–2 là bằng chứng lịch sử, không chứng nhận runtime hiện tại hay Reader 29 bài chưa triển khai. Chưa kiểm Safari/Firefox/thiết bị thật/screen reader/người học/reviewer độc lập hoặc mở lại mọi URL học thuật.

## 2. Chạy lại baseline sau khi có quyền triển khai

- Lấy main mới, kiểm hash, cài đúng lockfile trong môi trường kết nối được registry. Không đổi dependency chỉ để test xanh.
- Đọc scripts/lifecycle thay đổi trước thực thi; dùng project-owned scripts, không chạy engine/installer UI skill.
- Build preview và production ở thư mục riêng, clean output. Chỉ server local, không deploy.
- Tests reading/homepage/production hiện ghi ảnh vào docs/phase-2/screenshots. Chạy trong bản sao/worktree hoặc đổi output trong PR được phép; không ghi đè lịch sử. Baseline mới chỉ cập nhật sau review.
- Ghi rõ lỗi source/environment/test, case và expected/actual; không bỏ assert/guard để qua kiểm.

Lệnh từ prototype/ khi đủ môi trường:

```sh
npm ci
npm run build
npm run test:e2e
npm run test:production
```

build đã gồm test:content; Vite xuất file nhưng scanner fail vẫn là build fail.

## 3. Route và điều hướng

Route mới chỉ kiểm sau PR tương ứng; 404 của route chưa triển khai không là regression hiện tại. Query bộ lọc nằm **trong hash** sau #/thu-vien, không phải search trước dấu #.

| Case | Phạm vi / thao tác | Kết quả bắt buộc | PR |
|---|---|---|---|
| NAV01 | / và base /Kho-ng-gian-Insight/#/ | Reload đúng không cần server fallback; logo/menu/quote/anchor/Mây/B/assets local hoạt động | Mọi UI/Q1 |
| NAV02 | /thu-vien: dấu/không dấu/đ/Đ/case/nhiều từ; topic+stage | AND search và filters; empty/reset đúng; reload/Back/Forward giữ state; mở bài/return giữ filter | R1/C1/D1 |
| NAV03 | /bai-viet/:slug direct/reload/TOC | Title, main focus, hash sâu/reload/focus, breadcrumbs/related/return fallback đúng; đi TOC không mất state.from | R1/C1 |
| NAV04 | /chuyen-de và detail | Cùng dữ liệu homepage, đúng thứ tự/link; topic lạ/unpublished xử lý đúng | W1 |
| NAV05 | /#nen-tang, /#dong-chay, /#tam-tinh từ hai header | Giữ section và focus tương thích | N1/D1/G1 |
| NAV06 | /nen-tang, /dong-chay mới | Breadcrumb/title/focus/reload/base path và CTA đúng | N1/D1 |
| NAV07 | Slug/path lạ, hash mã hóa bất thường | 404 có recovery, không crash/console error; query không mở nháp | R1/C1/Q1 |

## 4. Nội dung và Reader

| Case | Cách kiểm | Tiêu chí |
|---|---|---|
| DATA01 | Manifest 29 nguồn + fixture thứ 30 | Unique ID/slug; đúng bốn r2, 25 r1; title khớp; nhận thêm mục không giới hạn 29 |
| DATA02 | Hash trước/sau | 203 tệp ARTICLE/hồ sơ/SVG giữ nguyên; không approval giả |
| DATA03 | AST/text coverage mỗi bài | Không mất/đổi đoạn, nhấn mạnh, list, bảng, citation, giới hạn/giả định, câu hỏi/phản hồi/APA; chuyển cách hiển thị có source map |
| DATA04 | 29 preview pages và crawl link nội bộ | Không duplicate bốn slug cũ; C03 title mới/slug cũ; related/topic/stage/provenance không đứt |
| READ01 | Fixture h2/h3 trùng/dấu Việt/nguon | TOC đúng cấp, anchor ổn định/duy nhất/an toàn, focus/reload đúng |
| READ02 | Bảng, DOI dài, list, blockquote | Header bảng có semantics; cuộn vùng riêng có thể tới bằng phím khi cần; không tràn trang; typography kế thừa |
| READ03 | 29 SVG/caption/alt/mô tả/credit | XML allowlist, không active/external resource; khớp dossier; thông tin tương đương bằng chữ còn; không lặp alt dài vô ích |
| READ04 | C01/C05 có chữ 11–15px tại 320; E02 hình dài | Xem lớn/zoom bằng phím không cắt chữ/nút thoát; mô tả luôn đọc được; không sửa SVG để né kiểm |
| READ05 | APA7/citation | Giữ tác giả–năm/n.d.-a/b/dấu/italics/URL; HTTPS và thông báo tab mới; không sinh bibliography thứ hai lệch ARTICLE |
| READ06 | Hoạt động và Bloom | Đủ câu hỏi/phản hồi/lý do/quyền bỏ qua/nhân vật; không input nội tâm, chấm điểm, trắc nghiệm |
| SAFE01 | HTML/script, javascript URL, path traversal, SVG lỗi | Reject/escape có báo lỗi; không MDX/raw HTML execution; không âm thầm bỏ nội dung |

DATA03 cần báo cáo block tự động **và xem trực tiếp từng bài hẹp/rộng**. Không thay chuyên môn. Lỗi biên tập cần phiếu và quyền sửa riêng. Kiểm URL học thuật nếu thực hiện phải ghi trạng thái truy cập và giới hạn, không suy HTTP200 là claim đúng.

## 5. Publication boundary

Bắt buộc với PR đụng dữ liệu/build/Reader.

| Case | Thiết lập | Kết quả bắt buộc |
|---|---|---|
| PUB01 | draft/in_review/approved; hiện không có published thật | Public 0 bài/0 topic; homepage/topic/related/stage không link nháp; preview có nhãn đúng |
| PUB02 | Synthetic published fixture trong test-only | Thiếu hoặc lệch review/hash/revision/rights/date bị reject; fixture hợp lệ kiểm hàm; không sửa status thật |
| PUB03 | Topic/weekly/stage/related trộn quyền | Chỉ link eligible; empty/fallback đúng; lịch không cấp quyền xuất bản |
| PUB04 | Cố ý copy canary MD/SVG/JSON/fixture vào output test | Scanner bắt filename/text/escaped text/revision/asset marker; negative case thực sự fail, output sạch pass |
| PUB05 | Clean production graph và toàn artifact | Không raw MD/dossier/catalogue29/SVG chưa cấp quyền/map/preview chunk; không chỉ kiểm HTML |
| PUB06 | Direct article/asset, hash/query preview=true, wisteria=A/C | Nháp vẫn 404/không có bytes asset; query không mở gate; tử đằng vẫn B; kiểm dưới repo prefix |
| PUB07 | Đổi byte ARTICLE/asset hoặc revision fixture | Bằng chứng lệch hash/revision invalidated, không kế thừa qua slug |
| PUB08 | Preview rồi production liên tiếp | Output riêng, clean; không stale preview asset hoặc service worker/cache xuất nháp |

Scanner phải phủ 29 nguồn, không chỉ bốn legacy articles. Slug sau này có bản hợp quyền không bị blacklist vĩnh viễn: kiểm revision/hash/prose chưa được phép. Public clean không làm repo thành private.

## 6. Responsive, accessibility và motion

| Nhóm | Phạm vi kiểm / tiêu chí |
|---|---|
| Viewport | 320/390/768/1440, chiều cao 900/1000; thêm tablet 1024/landscape và zoom 200%. scrollWidth không vượt viewport; bảng cuộn riêng; không thu nhỏ toàn bài |
| Touch | Mobile 390, menu/filter/form/zoom hình; cuộn ngoài vùng vẫn tự nhiên, không drag trap |
| Keyboard | Skip/main, menu Enter/Escape/focus return, anchors/TOC, filters/reset, disclosure, Mây arrow/reset, thả đèn, figure zoom; không trap/ẩn focus |
| Axe | wcag2a/wcag2aa/wcag21aa ở các route/state chính, không violation trong phạm vi; vẫn kiểm thủ công contrast/labels/headings/landmarks/live status/zoom |
| Screen reader | Ghi tổ hợp thật và version, ví dụ NVDA+Firefox hoặc VoiceOver+Safari: TOC/bảng/figure/nguồn/status. Thiếu công cụ/người thì U, không PASS; xử lý trước công bố phần phụ thuộc |
| Motion | OS reduction, nút giảm, tab hidden, offscreen, đang gõ/focus: loops pause, chữ hiện, confirmation còn; explicit hero drag vẫn dùng được |
| B và Mây | Composition/assets/sizes/timing giữ nguyên, legacy A/C không đổi B; mask không đè logo/menu/headline/nút. Companion không che nội dung/bảng/hình mới, không có hai Mây cùng vai tương tác |
| So ảnh | Cùng viewport/data/font/art readiness/quote seed/animation time; ảnh lịch sử có nhãn, chụp lại baseline khi chạy được; không so hai state khác nhau rồi kết luận |
| Hiệu năng | Cùng máy/browser/viewport, đo idle/scroll/reading/reflection; giữ số petals/lantern, không thêm frame-by-frame React. So long tasks/layout shift/frame profile/asset transfer; tăng lặp lại phải có nguyên nhân và budget được review, không hứa 60fps từ headless |
| Thiết bị thật | iOS/Safari, Android/Chrome, tablet nếu có: dấu Việt/zoom/touch/menu/form keyboard/blur/mask. Ghi model/OS/browser, không gọi giả lập viewport là thiết bị thật |

## 7. Riêng tư và lịch tuần

**PRIV01–06:** dùng canary giả định, không lời viết thật. Canary không nằm trong request URL/body/headers, local/session storage, IndexedDB/cache/cookie, console, URL hoặc DOM/attributes đèn. Không request phát sinh do thả. Clear sau thả/pagehide/rời route/unmount; blank/space disabled; max 500 ký tự; tối đa bốn đèn; hết hạn 9,5s kể cả pause/reduced; status không nhắc lại lời. Kiểm timer handle không tích lũy vô hạn nếu có sửa bookkeeping. Không tuyên bố xóa vật lý RAM.

**WEEK01–06:** clock fixture +07:00; start inclusive/end exclusive; trước/đúng/sau mốc; reject overlap, gap dùng fallback, future không chọn; quyền rút/tập eligible rỗng; homepage/detail đồng nhất. Build-time selector không tự đổi trên website tĩnh nếu chưa rebuild. Không thêm cron/backend/auto publish.

## 8. Nghiệm thu và xử lý phát hiện

- Mỗi PR chạy case liên quan và guard/hồi quy chịu ảnh hưởng; Q1 chạy toàn ma trận trên main hợp nhất.
- Đề xuất chặn nghiệm thu kỹ thuật khi mất nội dung/link sai/rò nháp/lưu tâm tình/keyboard trap hoặc regression vùng thiết kế khóa. Chủ dự án quyết định merge, không tự merge khi test xanh.
- Phiếu lỗi: case ID, commit/revision, tệp/vị trí, môi trường, bước tái hiện, expected/actual, mức độ, ảnh/log, sửa đề xuất, phụ thuộc và kiểm lại.
- Lỗi thiếu dependency ghi BLOCKED environment. Không sửa ứng dụng để che; không auto cập nhật baseline.
- Chỉ kiểm lại phần ảnh hưởng; không bắt 29 bài làm r2 hoặc viết test soi implementation cho chỉnh copy nhỏ. Ưu tiên kiểm meaningful cho parser/gate/privacy/routes.
- Bàn giao report, ảnh, scan report, checksum và danh sách chưa xác minh. Kỹ thuật PASS không xác nhận chuyên môn/thử đọc/quyền hình/duyệt cuối/xuất bản.
