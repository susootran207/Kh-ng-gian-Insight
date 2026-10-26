# W1 — Bàn giao Chuyên đề tuần

Ngày 26/10/2026, Asia/Saigon. Nhánh `phase-3-w1-weekly-topic`. Chỉ W1 được cấp phép; dừng tại Draft PR, không merge/deploy/publish hoặc triển khai N1/D1/G1/Q1.

## Nền và kiến trúc

PR #21 đã merge lúc **08:49:26 ngày 26/10/2026** giờ Việt Nam. Main `40700762f952e37495563c3baf44ac350f909142`; Git fetch thành công. Worktree mới lấy đúng commit này; **595/595 blob đối chiếu GitHub khớp SHA-1**, không lấy local HEAD cũ. Main kiểm lại trước bàn giao vẫn cùng SHA.

Đã đọc F0-CONTRACT, R1 READER-CONTRACT, CONTENT-INTEGRATION, IMPLEMENTATION-ROADMAP, QA-PLAN, C1 REVIEW, PRODUCT/DESIGN/AGENTS và mã App/Router/catalogue/metadata/guard. Áp dụng Impeccable trực tiếp từ bản ghim để giữ typography/Read mode; không chạy context launcher/engine theo AGENTS.

Trước W1, homepage có weekly prose viết riêng; index/detail dùng một topic mẫu trong catalogue. Nay ba bề mặt và bộ lọc thư viện dùng chung **WeeklyView**, được tạo một lần từ registry + F0 ở phía build. Thứ tự homepage/detail/library đã được đối chiếu; không có selector lịch phía client.

| Tệp / nhóm | Thay đổi |
|---|---|
| editorial/weekly-contract.ts, weekly.json | Contract Topic kế thừa F0; registry thật rỗng, không tạo lịch thật |
| build/select-content.ts, build/editorial.ts | Tách nguyên selector F0 hiện có, giữ wrapper tương thích; thêm clock snapshot tùy chọn, tăng graph guard |
| build/weekly.ts, weekly-plugin.ts | Kiểm lịch/metadata/F0, chọn active/fallback/empty; serialize duy nhất view đã lọc |
| src/reading/weekly.ts, WeeklySection.tsx | Shared view; tách vùng weekly với nguyên artwork/section/grid, giữ thao tác mở/khép khi có dữ liệu |
| src/App.tsx | Chỉ import/tái dùng WeeklySection và chuyển state weekly vào component đó |
| src/reading/Router.tsx | Weekly index/detail, ordered cards, filter chuyen-de, return query; không nhập ARTICLE thật |
| src/styles/weekly.css | CSS khu trú để hai CTA không dính nhau; không sửa stylesheet đã duyệt |
| build/publication-scan.ts, scripts/check-publication.mts | Thêm marker weekly bị giữ và báo số public weekly; giữ toàn bộ canary/scanner cũ |
| vite config/virtual types, fixture/harness/test/config W1 | Fixture serve-only, test lịch/quyền/link/browser/negative; không vào public graph |
| tests homepage/reading/production/atmosphere | Kiểm empty state mới đúng scope; giữ các ca tương tác khác, ổn định đồng hồ test Mây |
| package scripts, .gitignore, CI workflow | Lệnh W1, bỏ evidence tạm khỏi Git; thêm Node W1 vào Verify prototype |

Không thêm dependency hoặc đổi lockfile. [CONTRACT](CONTRACT.md) giải thích schema, F0 gate, clock/fallback, cách chạy fixture và giới hạn nguồn bài.

## Phạm vi dữ liệu và empty state

- `weekly.json` chỉ có schemaVersion=1 và topics=[]; không có tên/lời dẫn/lịch đăng hoặc phê duyệt thật mới.
- W1 v1 dùng articleSlugs của catalogue Reader hiện hành và F0 legacy publication bundle. Nguồn ARTICLE trong SourceManifest không được cấp quyền nhờ cùng slug. C1 vẫn là preview 29 bài, không được biến thành public qua W1.
- Không tự lấy bảy FEATURED, T01–T09 hoặc `dem-dai` mẫu làm weekly thật. Catalogue topic mẫu giữ nguyên tệp nhưng không còn cấp nguồn cho route weekly. DEV thường hiển thị empty weekly thay vì ngụ ý mẫu là chuyên đề đã được chọn; bốn Reader mẫu và ba inline article previews còn nguyên.
- Production hiện **0 source articles, 0 legacy articles/topics, 0 weekly topics/articles; currentWeeklyId=null**. Homepage/index có thông báo trung thực, topic draft/future/unknown không có route; query không mở gate.
- Đã kiểm lịch +07:00, calendar hợp lệ, start inclusive/end exclusive, khoảng liền nhau/gap/overlap, tương lai, bài bị rút quyền, topic thiếu bài eligible, fallback gần nhất đã bắt đầu, all-empty và đổi proof/revision/hash/order/interval.
- Fixture có banner rõ, ba topic giả lập, hai bài synthetic có đủ proof F0 trong thư mục tạm và một bài thiếu quyền. Không dùng tên chuyên gia/người học thật hoặc dữ liệu 29 bài để giả phê duyệt.

## Kết quả thực chạy

Node 24.19.0; npm ci --ignore-scripts theo lockfile cài 140 packages, không sửa dependency để né môi trường. Browser là Chromium hệ thống qua Playwright. Không suite nào được thay bằng mock hoặc bỏ assert để tạo PASS.

| Kiểm tra | Kết quả |
|---|---|
| Manifest --check | PASS — 29 records unchanged, no publication grants |
| Node W1 | PASS **12/12** nhóm ca, gồm typecheck W1, nhiều mốc lịch và input âm |
| Node F0 / R1 / C1 | PASS **22/22 · 12/12 · 34/34** |
| Browser W1 | PASS **7/7** lượt cuối: 320/390/768/1440, homepage/index/detail/library, thứ tự, keyboard, Axe, direct URL/history/return, Host/Origin/no-store/raw source và emulated reflow |
| Browser C1 | PASS **8/8** — 29 bài × bốn viewport; source/AST/DOM, 29 SVG/caption/mô tả và đầy đủ phản hồi giữ nguyên |
| Browser R1 | PASS **8/8**, fixture GFM/TOC/keyboard/dialog/return giữ nguyên |
| Hồi quy website | PASS **30/30** trong lượt full cuối, gồm Mây/B/timeline/quote/reflection/privacy/reduced motion/Reader cũ |
| Build TypeScript/Vite/scanner | PASS — 29 output files, 29 withheld, 4.335 markers, public source/legacy/topic/weekly đều 0, canary detected |
| Production browser | PASS **7/7**, repo prefix, không SPA fallback; toàn bộ 29 slug và 203 source/dossier/SVG paths cùng fixture/preview/weekly registry bị giữ |
| Build config fixture W1 | Negative PASS — exit 1 “W1 fixture is serve-only on 127.0.0.1:4192”, không tạo output fixture |
| Diff/checksum | PASS — 203 nguồn/hồ sơ/SVG, manifest/catalogue, màu/font/artwork và component Mây/B giữ nguyên |
| So production trước/sau | PASS — tám vùng layout giữ đúng geometry ở 390/1440; ảnh section empty trước/sau còn **giống byte JPEG** ở từng width |

Các suite cũ ghi ảnh Phase 2/R1 được chạy trong bản sao QA riêng. W1 evidence tạm ở test-results-w1-evidence; chỉ ảnh đại diện mới trong thư mục W1 được commit. Baseline build mới lấy từ git archive đúng main nền và cùng lockfile/dependency tree; không dùng ảnh lịch sử để chứng nhận runtime hiện tại.

CI thật được kiểm và dẫn trong mô tả Draft PR/check **Verify prototype** tại đúng SHA của PR. Workflow chạy F0/R1/C1/W1 Node, typecheck/build/scanner; không gọi các kết quả browser local là CI browser PASS. Không deploy/upload artifact.

### Phát hiện và xử lý

1. Home và topic trước đây không cùng nguồn: thay phần plumbing bằng shared view, không đổi nội dung khoa học hoặc artwork.
2. Bản fixture cho thấy nhãn/CTA dính nhau: dùng lại block badge của topic-spread và thêm CSS spacing chỉ trong weekly. Không sửa global.css/reading.css/atmosphere.css.
3. Filter weekly ban đầu lấy thứ tự catalogue: sửa để Library theo curated articleSlugs, đồng nhất với homepage/detail; test kiểm cả thứ tự, không chỉ count.
4. Một lượt regression Mây gặp ResizeObserver làm ẩn nhân vật sau layout update trong lúc test tua clock. Giữ nguyên component/cơ chế an toàn; test dùng clock đóng băng và flush layout như suite đã làm ở ca khác. Assert action/active/position vẫn còn nguyên; ca riêng rồi lượt full 30/30 đều qua. Không sửa Mây để ép xuất hiện.

Không có lỗi chức năng W1 còn thất bại trong các suite cuối. Việc cập nhật hai ca regression weekly từ mẫu cũ sang empty là thay kỳ vọng đúng scope: hành vi có dữ liệu/inline open-close/order/links được kiểm lại bằng fixture W1 đầy đủ.

## Bảo toàn và publication boundary

- 203 ARTICLE/dossier/SVG, matrix, source-manifest, catalogue và mọi trạng thái/bằng chứng thật không đổi byte. Không sửa nội dung 29 bài hoặc sinh grant thật.
- CatGarden/CatArt/ScrollCompanion/GardenAtmosphere/TopCanopy/tử đằng B, fonts/artwork/public, HTML gốc và các stylesheet đã duyệt giữ nguyên. CSS mới chỉ cho CTA weekly; JS/CSS bundle có đổi hash nên không tuyên bố toàn artifact giống byte. **26 tài sản font/artwork/license ngoài JS/CSS/HTML khớp baseline**.
- Registry thô/fixture/harness bị graph guard chặn ngay cả với code không sentinel. Scanner bắt ID/slug/title/description và Unicode-escaped text của topic bị giữ; negative tests có topic hợp quyền để chứng minh không blacklist vĩnh viễn.
- Bằng chứng F0 của topic gắn với chính payload gồm lịch và thứ tự; lịch không thay quyền. Member chưa eligible bị bỏ trước serialize, topic rỗng không hiện. Review records không được đưa vào weekly article pack.
- Public artifact không ARTICLE/dossier/source manifest/nháp SVG/raw registry/source maps/fixture. Direct/query/asset/harness đều kiểm dưới repository prefix. Có chạy preview trước production với output tách biệt; không service worker, backend/cron, noindex bypass hoặc deploy preview công khai.

## Giới hạn và quyết định còn mở

Reflow tương đương 200% (720 CSS px, DPR2) PASS cho index/detail/library; **zoom native bằng UI trình duyệt, screen reader, Safari/Firefox và thiết bị thật chưa kiểm**. Axe/Chromium không thay nghiệm thu toàn diện hoặc thử đọc với người học. Không đánh giá lại chuyên môn/APA/quyền hình của 29 bài.

Phần có dữ liệu của W1 mới được kiểm bằng synthetic catalogue, chưa có topic public thật hoặc chuyên đề nối tới 29 ARTICLE public. Không ngụ ý đã hoàn thành adapter công bố ARTICLE từ C1. Chủ dự án còn chọn nguồn/revision, lời dẫn, thứ tự, lịch +07:00 và bằng chứng thật; xem [DECISIONS-NEEDED](DECISIONS-NEEDED.md). Đây là phụ thuộc cho dữ liệu thật, không phải yêu cầu viết lại 29 bài.

## Ảnh render

Đã xem ảnh render trực tiếp; ảnh JPEG không chỉnh sửa/ghép. Fixture screenshots là dữ liệu giả lập, không phải lịch/chuyên đề đã duyệt. Ảnh section có thể bắt đầu sau khi cuộn; banner fixture vẫn có trong trang gốc. [GEOMETRY.json](GEOMETRY.json) ghi phép so tám vùng trước/sau, cùng viewport/font/quote seed/reduced motion.

| Bề mặt | Ảnh |
|---|---|
| Production empty trước/sau mobile | [Trước 390](screenshots/before-empty-390.jpg), [Sau 390](screenshots/after-empty-390.jpg) |
| Production empty trước/sau desktop | [Trước 1440](screenshots/before-empty-1440.jpg), [Sau 1440](screenshots/after-empty-1440.jpg) |
| Index empty thật | [390](screenshots/empty-index-390.jpg) |
| Homepage fixture | [390](screenshots/fixture-weekly-home-390.jpg), [1440](screenshots/fixture-weekly-home-1440.jpg) |
| Detail fixture | [390](screenshots/fixture-weekly-detail-390.jpg), [1440](screenshots/fixture-weekly-detail-1440.jpg) |
| Index fixture | [1440](screenshots/fixture-weekly-index-1440.jpg) |
| Library filter fixture | [390](screenshots/fixture-weekly-library-390.jpg), [1440](screenshots/fixture-weekly-library-1440.jpg) |

**Dừng tại Draft PR W1 để chủ dự án nghiệm thu. Không merge, deploy, publish hoặc bắt đầu giai đoạn tiếp theo.**
