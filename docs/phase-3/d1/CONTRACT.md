# D1 — Hợp đồng Dòng chảy

D1 tuân thủ roadmap V1.0 phương án A tại main `40c6d342fe19ed2ff876c19fee8513fce4b432a0`. Đây là lối tổ chức nội dung, không phải công cụ đánh giá hoặc tiến trình buộc học sinh hoàn thành. [Bản diễn đạt để duyệt](COPY-REVIEW.md).

## Metadata và route

`prototype/src/reading/stages.ts` giữ metadata dùng chung: bốn title/subtitle/text/note cũ được chuyển nguyên văn từ `src/content.ts`; `content.ts` re-export dưới tên `seasons` để homepage tương thích. Mỗi mục có `key` bằng nhãn cũ, `anchor` chỉ dùng cho ID HTML mới và đoạn dẫn nhập D1. Type `StageKey` dùng union `SourceMetadata['season']` của F0, chỉ import type (không kéo manifest/Node build vào browser).

| key / nhãn và query giai-doan giữ nguyên | Anchor HTML của trang mới |
| --- | --- |
| Đầu năm | dau-nam |
| Giữa học kỳ | giua-hoc-ky |
| Mùa thi | mua-thi |
| Sau thi | sau-thi |

Không đổi key thành slug, số hoặc T01–T09. `stageLibraryLink(key)` mã hóa query bằng URLSearchParams; Library tạo options từ cùng metadata. `articlesForStage(entries,key)` chỉ nhóm bằng field `season`, không lọc theo topicIds, weekly, index hoặc số lượng bài; không mutate input, không giới hạn 29.

Route logic `/dong-chay` dùng HashRouter sẵn có. URL production static là `/Kho-ng-gian-Insight/#/dong-chay`, hash sâu ví dụ `#/dong-chay#mua-thi`; không thêm server rewrite. Giữ `/#dong-chay` (URL thực `#/#dong-chay`) và cả hai header hiện có. Homepage thêm lối đến trang đầy đủ và filter của chặng đang chọn. Tất cả nút timeline dùng `aria-controls="season-panel"` trỏ tới panel dùng chung luôn tồn tại; một nút `aria-expanded=true`, các nút khác false; click/Enter/Space vẫn là button native, không chuyển sang tablist/stepper.

## Một tập Thư viện, không phải quyền mới

`FlowPage` và `Library` cùng import `articles` từ `reading/content.ts` → `virtual:editorial` → selector F0 hiện hành. FlowPage không import weeklyView, manifest, matrix, C1 preview, ARTICLE hoặc hồ sơ; không merge catalogue. ArticleCard được chuyển nguyên hàm sang component riêng để hai bề mặt dùng chung; Router re-export API cũ cho C1, không đổi thuật toán return URL.

D1 chỉ nhóm một view **đã được chọn ở build**. `articlesForStage` không tự kiểm hoặc cấp quyền; status filter phía client không thay F0. Normal development vẫn dùng bốn mẫu legacy có nhãn theo cơ chế có sẵn; production hiện rỗng. Không dùng dữ liệu development/C1 làm public. Các đoạn giới thiệu và empty state D1 là nội dung chức năng mới, không phải bản tóm tắt của 29 bài.

Khi P2 nối public ARTICLE/card DTO vào nguồn dùng chung của Library, D1 đọc cùng tập đó qua các field card/season, không cần nhập từng bài, sửa danh sách theo stage hoặc lọc weekly. **P2 adapter và quyền thật chưa được thực hiện ở D1.** Nếu P2 thay interface card, phải giữ hợp đồng dùng chung này; không import preview entry để rút ngắn bước. Tập 29 synthetic qua F0 đã kiểm cơ chế; không thay nghiệm thu 29 liên kết thật ở Q1 hoặc điều kiện phát hành 29/29.

WeeklyView hiện giữ bài thuộc các chuyên đề đã bắt đầu/được phép (gồm archive), không phải toàn Library. D1 không dùng tập con này. Fixture đổi current chuyên đề từ hai sang ba bài; union weekly lúc sau năm bài, trong khi Library giữ 29. Bài giả lập thứ 30 vẫn xuất hiện ở Library và chặng tương ứng.

Từ một chặng, CTA tới Library với query giai-doan; search/chủ đề/giai đoạn tiếp tục AND theo URL. Mở card trên D1 đặt returnTo về filter của chặng. Mở từ Library giữ nguyên toàn query, cả qua related; direct article vẫn dùng fallback Library hiện có. “Toàn bộ thư viện” bỏ bộ lọc, không làm mất bài nào khỏi nguồn.

## Fixture và boundary

Fixture tạo 29 bài synthetic published với proof **giả lập trong thư mục tạm**, một bài draft bị giữ, hai chuyên đề synthetic. Tái dùng helper bằng chứng/selector F0 và W1; không đổi hoặc ghi proof cho 29 bài thật. Chỉ serve `127.0.0.1:4194`, kiểm Host/Origin, no-store, chặn build config fixture; raw ARTICLE ngoài Vite filesystem allowlist bị từ chối. Không URL ẩn/noindex/tunnel/deploy.

```sh
cd prototype
npm ci --ignore-scripts
npm run test:d1
npm run dev:flow-fixture
```

Mở `http://127.0.0.1:4194/tests/flow-harness/index.html#/dong-chay` trên cùng máy. Banner ghi rõ dữ liệu giả lập. Trang thật local qua config thường: `npm run dev -- --host 127.0.0.1`, mở `http://127.0.0.1:5173/#/dong-chay`; đây là development legacy, không phải bản public hoặc preview29.

Normal production config không import fixture. Guard graph hiện có chỉ được **mở rộng denylist** cho `virtual:d1-fixture` và `tests/flow-harness`; scanner sentinel F0 chặn bytes fixture. Negative tests kiểm cả module code sạch không có sentinel; production browser kiểm fixture/raw URL 404 và query không mở bài. CI thêm D1 Node, giữ nguyên mọi gate cũ, không deploy/upload artifact.

## Giới hạn

Không phê duyệt chuyên môn/quyền hình hoặc cấp quyền công bố; không triển khai G1/P1/P2/W2/Q1. Production 0 bài là expected trước P2, không là tiêu chí release V1.0 phương án A. Thiếu một bài hoặc quyền hình khi release vẫn BLOCKED. Không sửa 29 ARTICLE, dossier, SVG, manifest, catalogue, weekly registry hoặc bằng chứng quyền.
