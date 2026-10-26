# P2 — Báo cáo tích hợp đầy đủ qua publication boundary

Ngày ghi nhận: 27/10/2026 (+07:00). Main nền `ef2a3a7d534dd6104c1fd29f17a90d74339e10b6`, PR #28 đã merge; Git fetch thành công và GitHub connector đối chiếu SHA/tree. Worktree/nhánh `phase-3-p2-full-library-integration` từ đúng nền, không dùng HEAD cũ.

Đã đọc PRODUCT/DESIGN/AGENTS, roadmap V1.0 A, CONTENT-INTEGRATION, QA-PLAN, F0/R1/C1/W1/D1/G1 và P1A/P1C; khảo sát router, Library, source compiler, weekly, stage và artifact scanner. Impeccable dùng fallback đọc trực tiếp/craft floor, không chạy launcher/context engine. Chỉ thị P2 mới cho phép hoàn thiện kỹ thuật trước khi đủ hồ sơ phát hành; giới hạn dừng ở P1C trong tài liệu lịch sử không bị hiểu thành lệnh publish hoặc yêu cầu kiểm toán AI lại.

## Kiến trúc và phạm vi diff

```text
ARTICLE + source-manifest + bằng chứng thật
  → F0 selectSourceView(public)
  → compiler nguồn dùng chung với C1 → GFM AST R1
  → DTO card/Reader + SVG đủ quyền
  → virtual:editorial → Library / Flow / Home / Article
                     → W1 schedule + proof của chuyên đề
```

| Tệp / nhóm | Thay đổi |
| --- | --- |
| build/source-reader.ts, content-preview.ts | Tách compiler nguồn hiện có thành helper build dùng chung; C1 giữ hợp đồng/vòng kiểm hash/title/figure. Không parser thứ hai hoặc JSON prose nhập tay |
| build/public-library.ts | Chọn PublicView F0 trước khi compile/đọc asset; giữ full source AST; DTO whitelist không source/dossier paths, proof, manifest hay trace build; related lọc qua descriptor F0 |
| build/editorial.ts | virtual:editorial dùng adapter; chỉ emit SVG đủ quyền bằng đường hash; DEV cũ còn fallback mẫu khi chưa có nguồn public; thêm graph gate P2 và phục vụ SVG public hợp lệ khi dev |
| build/weekly.ts, weekly-plugin.ts | Tái dùng toàn bộ kiểm lịch/proof W1; façade source-public chọn lại Library qua F0, biết slug nguồn bị giữ để schedule không tự mở quyền; không tạo lịch thật |
| build/publication-scan.ts, scripts/check-publication.mts | Scanner/CLI theo cùng source-weekly; mẫu legacy trùng slug đã được nghỉ không tạo allowance để thay ARTICLE đang withheld; giữ mọi kiểm byte/encoding/assets/maps/canary |
| editorial/schema.ts | Bổ sung trường DTO tùy chọn cho Reader/id/revision/collection/related; catalogue và source manifest thật nguyên byte |
| src/reading/Router.tsx, ArticleCard.tsx | Cùng Library với search tiêu đề/mô tả/chủ đề/keywords, AND filters, nhóm core/extension, Reader R1, related theo ID đã resolve, trước/tiếp và return URL; legacy reader còn để giữ hồi quy |
| markdown/ArticleReader.tsx | Resolve asset theo base root/repository prefix, nhãn publication/revision và note cho liên kết hồ sơ nội bộ; giữ toàn bộ renderer/TOC/dialog/focus/safe links |
| src/App.tsx | Góc đọc lấy ba excerpt nguyên đoạn từ cùng Library theo thứ tự nguồn; artwork/card/inline interaction cũ giữ; link đầy đủ dùng slug nguồn, không map29ID; copy footer theo chế độ nguồn học tập |
| vite.p2.config.ts, content-preview-server.ts | Preview toàn website serve-only127.0.0.1:4197, dùng PreviewView/C1 asset allowlist và middleware dùng chung; không proof giả hoặc preview production |
| tests/config/package/CI | Thêm P2 Node/build giả lập/browser; không đổi dependency/lockfile, không bỏ gate cũ; C1 oracle search thêm topic tương ứng chức năng mới |
| docs/phase-3/p2 | Hướng dẫn, evidence, ảnh, bảo toàn và điều kiện phát hành |

Không sửa ARTICLE/dossier/SVG, source manifest/catalogue/weekly registry/publication records, F0 validator, CSS/artwork/Mây/tử đằng B, animation/G1 privacy. Không backend/login/analytics, không hosting, visibility hoặc deploy. Giữ HashRouter/base tương đối cho build tĩnh; cấu hình future Cloudflare chỉ ở mức tương thích, chưa tạo dịch vụ.

## Hành vi và boundary

Thư viện luôn lấy toàn bộ tập eligible, không lấy bảy FEATURED/T01–T09 hoặc weekly subset. Dòng chảy lọc đúng bốn stage keys từ cùng mảng, không có catalogue mới. W1 chỉ chọn bài nổi bật đã qua F0, proof/lịch chuyên đề riêng vẫn bắt buộc; đổi tuần giữ Library. Không hardcode giới hạn29.

Bốn slug C03/C05/C09/C17 thuộc namespace ARTICLE; legacy cùng slug không thay thế nguồn đang thiếu quyền, không kế thừa grant hoặc tạo bản trùng. Khi một nguồn đủ quyền, tiêu đề/nội dung là ARTICLE, không đoạn mẫu cũ. `bo-suu-tap=core|extension` tránh xung đột `nhom=Txx` ở C1. Query/stage/topic/search/history/return vẫn kết hợp, không dùng query mở quyền.

Parser R1 vẫn reject HTML/unsupported node/URL nguy hiểm/asset ngoài allowlist, không lược nội dung. Public DTO giữ cây AST/ranges phục vụ receipt nhưng loại trace build (rawHash/value ledger), không emit raw ARTICLE hay JS sourcemap. H1/notice lịch sử/nhãn hồ sơ trong nguyên bản giữ nguyên; nhãn Reader bên ngoài nói rõ trạng thái hiện tại. Nhãn link dossier được giữ và dẫn tới note, không công bố hồ sơ nội bộ hoặc tạo link tải hỏng. SVG được kiểm byte/hash trước emit và scanner sau emit; nguồn/alt/caption/mô tả đầy đủ qua R1.

Preview P2 dùng 29 nguồn thật đã nghiệm thu nhưng qua **PreviewView**, nhãn bản nháp/revision rõ ràng. Positive-public dùng **29 bài hoàn toàn giả lập**, proof chỉ trong temp root tự dọn. Không đưa source preview29 hoặc quyền giả vào production thật; production hiện vẫn0.

## Kiểm thử

Kết quả chính thức và log được chốt tại [TEST-RESULTS.json](TEST-RESULTS.json) / verification sau khi các lượt chạy hoàn tất. Node24.19.0/npm11.9.0, Chromium Linux headless. Viewport/keyboard/Axe/reduced motion là mô phỏng trình duyệt, không thiết bị thật hoặc thử đọc chuyên môn.

P2 browser kiểm29 route tại320/390/768/1440: số receipt AST→DOM và từng leaf text, H1, SVG tải thật/alt, reflow; Axe Library/Reader/Flow; search/topic/stage/group AND, reload/TOC, history/return, Enter mở hình/Escape trả focus, home→Reader; Host/Origin/raw source bị từ chối. Node kiểm29/30, bốn stage, weekly subset không hạn chế Library, legacy collision, thiếu proof/rights/sai hash, graph canary và production build29 synthetic với29 SVG/real scanner.

Các lỗi trong quá trình làm được giữ trong log, không gọi lượt fail là PASS: assertion ảnh ban đầu đọc `complete` ngay trước khi load xong, đổi sang poll trạng thái thật; xung đột `nhom` phát hiện nhờ C1 và đã đổi key mới; oracle search C1 cập nhật đúng phạm vi thêm topic. Build đầu cũng bị scanner chặn khi mapping slug mẫu cũ còn trong nhánh runtime; đã giới hạn fallback đó vào DEV để compiler loại khỏi production, không thêm allowance. Một lượt browser bị ERR_CONNECTION_REFUSED ở SVG C21 trong khi config đang reload; giữ log và chạy lại snapshot ổn định. P2 dùng cổng4197 riêng sau khi phát hiện trùng4195 của G1. Không sửa nội dung cho vừa parser, không nới guard/dependency hoặc bỏ assertion để vượt test.

## Ảnh trước / sau

Trước = main nền, DEV mẫu lịch sử; sau = preview nội bộ P2 đủ29 nguồn thật, **không phải website công khai đã publish**. Reader so cùng slug C05; Góc đọc sau chọn ba bài đầu nguồn thay ba mẫu cũ. Ảnh đủ bốn viewport sau nằm trong screenshots; bảng này chọn mobile390/desktop1440. Không chứa tâm tình thật.

| Vùng | Mobile trước / sau | Desktop trước / sau |
| --- | --- | --- |
| Library | [trước](screenshots/before-library-390.jpg) / [sau](screenshots/after-library-390.jpg) | [trước](screenshots/before-library-1440.jpg) / [sau](screenshots/after-library-1440.jpg) |
| Reader C05 | [trước](screenshots/before-reader-390.jpg) / [sau](screenshots/after-reader-390.jpg) | [trước](screenshots/before-reader-1440.jpg) / [sau](screenshots/after-reader-1440.jpg) |
| Dòng chảy | [trước](screenshots/before-flow-390.jpg) / [sau](screenshots/after-flow-390.jpg) | [trước](screenshots/before-flow-1440.jpg) / [sau](screenshots/after-flow-1440.jpg) |
| Góc đọc | [trước](screenshots/before-home-reading-390.jpg) / [sau](screenshots/after-home-reading-390.jpg) | [trước](screenshots/before-home-reading-1440.jpg) / [sau](screenshots/after-home-reading-1440.jpg) |

## Giới hạn và điểm dừng

Chưa xác minh native zoom200%, screen reader, Safari/Firefox/Edge, thiết bị iOS/Android/tablet thật hoặc hoạt động thử đọc của người học; Axe không thay các kiểm này. Test30 là Node/compiler/data, chưa browser riêng30. Build29 public là giả lập cô lập, không chứng minh quyền công bố thật của29 nguồn hiện tại. P2 payload AST được build từ một nguồn, serialize cùng bundle; khi thư viện lớn hơn có thể cần lazy chunks theo đo lường, hiện không có giới hạn số bài.

[Điều kiện còn thiếu](RELEASE-CONDITIONS.md) giữ F0 fail closed. Chấp thuận nội dung29/29 đã có; không tạo người/ngày/proof chuyên gia, learner, readerQA, rights hoặc authorization. Dừng tại **Draft PR P2**, không merge/deploy/publish hoặc tự bắt đầu W2/Q1.
