# W2 — Báo cáo lịch biên tập và Chuyên đề tuần

Ngày 27/10/2026, Asia/Ho_Chi_Minh. Nhánh `phase-3-w2-weekly-editorial`. PR #29 đã merge vào main lúc 12:45:50 +07:00; main `d6d9b142e097ab3c24c31ed841d6e13d416fbfcd`, tree `f5d0c7ffeddd82c953cbc8776727e45e2ba424b3`. GitHub connector và Git fetch đối chiếu đúng SHA; worktree mới từ main, không nền cũ hoặc tự merge.

Đã đọc W1/P2, roadmap V 1.0 A/QA-PLAN/F0, PRODUCT/DESIGN/AGENTS và khảo sát nguồn/heading 29 bài để chọn chuyên đề. Không mở lại kiểm toán nguồn AI, không viết lại ARTICLE hoặc thêm bài. Dùng Impeccable fallback đọc trực tiếp/craft floor; không context loader/launcher/engine theo AGENTS.md. Giữ thiết kế và Read mode.

## Lịch đề xuất

[SCHEDULE.md](SCHEDULE.md) có 10 tên/mô tả/mục tiêu/bối cảnh, danh sách ID/slug/title theo thứ tự, lý do thứ tự và liên hệ mục tiêu phổ biến kiến thức phòng ngừa toàn trường. Phủ đủ 29 bài trong 18 tuần mẫu từ 11/01 đến trước 17/05/2027. Tám khoảng 2 tuần và hai khoảng 1 tuần;31 lượt giới thiệu do C12/C14 dùng lại có lý do, Library vẫn 29 duy nhất.

Đây là thiết kế phổ biến thông tin tự nguyện cho sản phẩm học tập, không lịch của trường cụ thể hoặc kết quả can thiệp đã được đo lường. Không sàng lọc/đánh giá/chẩn đoán/điều trị, không buộc đọc hoặc tự bộc lộ. Ngày/nhịp là mẫu chờ chủ dự án chọn, xét kỳ thi/nghỉ và điều kiện thực tế. Không có lịch được công bố bằng W2.

## Phạm vi mã/dữ liệu

| Tệp / nhóm | Thay đổi và lý do |
| --- | --- |
| editorial/weekly.json |10 chuyên đề draft, đúng schema W1; tham chiếu slug của ARTICLE có ID đối chiếu; không publication/publishedAt/proof |
| build/weekly.ts | Tách nguyên validator W1 và projection để public/preview dùng chung lịch, order, boundary/gap/fallback; public luôn lọc proof/eligible/started trước projection, không future payload |
| build/weekly-preview.ts | Helper server-only nhận F0/C1 PreviewView và literal loopback; không fake published; precompute clock options có thứ tự, empty fallback an toàn |
| editorial/weekly-contract.ts | Trường tùy chọn preview/upcoming; public upcoming rỗng, rich future chỉ trong controlled preview |
| vite.config.ts, weekly-plugin.ts, editorial.ts | Một snapshot truyền cho Library/weekly/F0/scanner trong từng build; thêm graph deny W2 module/directory |
| content-contract.ts, public-library.ts, publication-scan.ts | Chỉ truyền clock qua API/validator đã có; không đổi predicate, loại evidence, hash, path, SVG hoặc điều kiện từ chối; scanner thêm marker 10 draft tự nhiên từ registry |
| vite.p2.config.ts, vite.w2.config.ts | Factory tái sử dụng full-site P2, giữ P2 default 4197; W2 serve-only 127.0.0.1:4198, C1 Host/Origin/no-store/assets như trước; không deploy output |
| weekly-preview/controls.tsx | React native select đổi mốc bằng URL+reload; không state bền vững, backend, API sản phẩm hoặc clock public; invalid/prototype key fallback an toàn |
| reading/weekly.ts, WeeklySection.tsx, Router.tsx | Cùng metadata date/label; homepage→detail→Library order nhất quán; index chia đang mở/đã qua/sắp tới; future detail chỉ preview, Library/Reader/Flow vẫn qua P2 |
| styles/weekly.css | Rule khu trú cho control preview và độ dài đoạn snapshot; không đổi font/palette/artwork/global styles/animation |
| tests/config/package/CI | W2 Node/browser và production negative test; chỉ thêm CI gate W2, giữ mọi gate cũ; W1 oracle baseline cập nhật từ empty sang 10 draft và đúng source-public selector P2, không bỏ kiểm quyền |
| docs/phase-3/w2 | Lịch/lý do, contract, chạy preview, decisions, log, ảnh và bảo toàn |

[Contract](CONTRACT.md) giải thích snapshot/projection/timezone và boundary. Không sửa 203 tệp ARTICLE/dossier/SVG, source manifest, catalogue, matrix, records/quyền, Reader R1, Mây/B/LanternGarden hoặc lockfile. Publication guard chỉ được truyền cùng clock; các record và predicate giữ nguyên, fixture có publishedAt sau snapshot bị reject. Nội dung được chủ dự án chấp thuận 29/29 giữ theo P1C; không suy thành record chuyên gia/learner/QA/rights/authorization.

[Danh sách tệp chính xác](FILES.md) · [Artifact production](PRODUCTION-ARTIFACT.json).

## Hành vi cần nghiệm thu

-10 draft có ID/slug duy nhất; articleSlugs hợp lệ, không trùng trong chuyên đề; các khoảng +07:00 liền nhau, start inclusive/end exclusive. Article dùng lại không tạo bản trùng.
- Trang chủ giới thiệu current/fallback từ cùng view với index/detail/filter. Index hiển thị thời điểm snapshot, ngày cuối ghi “trước”; không ép tiến trình đọc.
- Public chỉ có chuyên đề đã bắt đầu đủ proof và còn member eligible. Future có đủ proof vẫn bị giữ trước start; no eligible thì empty trung thực. Không title/slug/prose/route/metadata tương lai public, chỉ giải thích chung.
- Preview dùng chính UI sản phẩm và 29 nguồn đã pin; có draft labels, control chọn 10 starts/trước/sau, Back/Forward/reload/quay mốc cũ. Controls giữ route hiện tại; đổi mốc tải lại document. Empty registry có clock an toàn và thông báo không có mốc để chọn.
- Thư viện giữ 29 bài trong preview/fixture eligible bất kể tuần; search/AND filters/Dòng chảy/Reader/related/direct routes vẫn cùng P2. Không auto-publish hay đồng hồ client cho public.
- Website tĩnh giữ snapshot tới build/artifact mới; không cron hoặc triển khai hosting/rollback thật. [Các quyết định trước phát hành](DECISIONS-NEEDED.md).

## Kiểm thử và bằng chứng

Node 24.19.0/npm 11.9.0, Chromium 154.0.8037.57 Linux headless. [TEST-RESULTS.json](TEST-RESULTS.json) ghi kết quả/log thực chạy. Suite cũ chạy trong các bản sao QA để không ghi đè ảnh lịch sử; không dùng tâm tình thật.

| Bộ kiểm | Kết quả thực chạy |
| --- | --- |
| W2 Node / browser | PASS 6/6 · 7/7 |
| F0 / R1 / C1 / W1 / D1 / G1 / P2 Node | PASS 22 · 12 · 34 · 12 · 4 · 2 · 8 |
| R1 / W1 / N1 / D1 / G1 / P2 browser | PASS 8 · 7 · 5 · 6 · 9 · 5 |
| C1 browser | Lượt đầu 7/8; nguyên ca còn lại chạy lại PASS 1/1 — xem giới hạn bên dưới |
| Hồi quy / production browser | PASS 30/30 · 14/14 |
| Manifest / typecheck / build / scanner | PASS — 0 public source/topic, 29 withheld, 4.375 marker, canary detected |
| Cấm build preview | PASS — config từ chối build, exit1 như mong đợi |

W2 Node kiểm lịch 10/29/18 tuần, overlap/gap/calendar/ID/slug/reference, start/end, rollback, source/public snapshot, fake granted 29 giữ Library, future withheld, wrong topic hash, graph/canary và empty clock. Fixture quyền hoàn toàn giả lập trong temp root tự dọn, không gắn vào nguồn thật. Browser W2 kiểm 320/390/768/1440, index/home/detail/filter/Reader return, đủ 29 khi chuyển 10 mốc, trước/sau/Back/Forward/reload, direct future preview, malformed clock, keyboard/Axe control, Host/Origin/no-store/raw source. Production test trực tiếp 10 slug/query clock/raw W2 đều không mở quyền.

C1 có một lần ca pan hình bằng bàn phím trả vị trí cuộn 0, trong lượt chạy nhiều suite đồng thời. **Không khẳng định nguyên nhân đã được xác định.** Giữ log lượt đầu 7/8; chạy lại nguyên ca không sửa Reader/test/assertion đạt 1/1. Không gọi đó là một lượt 8/8; độ ổn định ca này còn cần theo dõi. Bốn viewport C1 trong lượt đầu đã đủ 29/29 source→AST→DOM/SVG/Axe (4.716 node,29 hình,25 bảng mỗi viewport).

W2 case chuyển đủ 10 mốc ban đầu có giả định sai rằng control đổi route về homepage; đã chỉnh test đi tới route muốn kiểm, giữ hành vi bảo toàn route. Một lượt kế tiếp chạm 90s ở chuỗi nhiều reload/rollback; riêng case này có budget 180s, giữ toàn bộ assertion. Lượt cuối đủ 7 ca có log thật. Không đổi dependency, bỏ guard hoặc gọi mô phỏng thành thiết bị thật.

## Ảnh nghiệm thu nội bộ

Các ảnh là W2 preview draft tại snapshot 25/01/2027, không website đã công bố. Dùng lại artwork/grid/components. [Bảo toàn nguồn](SOURCE-PRESERVATION.json). Toàn bộ 12 ảnh đủ 320/390/768/1440 trong screenshots.

| Vùng | Mobile 390 | Desktop 1440 |
| --- | --- | --- |
| Homepage + danh sách bài | [ảnh](screenshots/home-390.jpg) | [ảnh](screenshots/home-1440.jpg) |
| Index ba trạng thái | [ảnh](screenshots/index-390.jpg) | [ảnh](screenshots/index-1440.jpg) |
| Detail + bài đúng thứ tự | [ảnh](screenshots/detail-390.jpg) | [ảnh](screenshots/detail-1440.jpg) |

## Giới hạn và điểm dừng

Chưa kiểm native zoom 200%, screen reader, Safari/Firefox/Edge, iOS/Android/tablet thật, thử đọc học sinh mới, hiệu quả phòng ngừa, quyền chuyên môn/tài sản hoặc hosting rollback. Viewport/keyboard/Axe/fake clock và reflow 720/DPR 2 không thay các kiểm đó. Chưa chạy browser với registry preview hoàn toàn rỗng; empty clock/contract đã kiểm Node, empty public và trước lịch đã kiểm browser. Các lựa chọn ngày/nghỉ/nhịp/lịch và proof thật vẫn cần người chịu trách nhiệm.

Public production hiện 0 bài/0 chuyên đề; scanner kiểm 29 bài withheld và 10 draft, canary phải bị phát hiện. Không raw ARTICLE/dossier/manifest/proof/registry/fixture/preview assets/maps. CI đúng head được xác minh tại Draft PR; không suy từ local hoặc coi CI là browser/human review. Chấp thuận nội dung 29/29 không bị mở lại.

Dừng tại Draft PR W2, không merge/deploy/publish, đổi repository private, tạo Cloudflare Pages hoặc bắt đầu Q1.
