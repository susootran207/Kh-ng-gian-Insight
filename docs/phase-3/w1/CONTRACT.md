# W1 — Hợp đồng và selector Chuyên đề tuần

Nền main `40700762f952e37495563c3baf44ac350f909142` sau merge PR #21. W1 chỉ hoàn thiện plumbing chuyên đề bằng fixture và empty state; không chọn lịch/nội dung thật hoặc cấp quyền xuất bản.

## Nguồn duy nhất cho W1

`prototype/editorial/weekly.json` là registry biên tập W1, hiện chỉ có `schemaVersion: 1, topics: []`. Không tự lấy FEATURED, T01–T09, chuyên đề `dem-dai` hoặc prose của catalogue mẫu thành lịch thật. Catalogue cũ và source-manifest.json giữ nguyên byte.

| Trường WeeklyTopic | Quy tắc |
|---|---|
| id | KGNT-W + ít nhất ba chữ số; duy nhất, không theo index; mở rộng quá 999 |
| slug | Slug lowercase/hyphen duy nhất, ổn định cho route |
| title, description | Chuỗi không rỗng; render bằng text React, không HTML/MDX |
| articleSlugs | Danh sách có thứ tự, không rỗng/trùng; mỗi slug phải có trong catalogue được truyền cho F0 |
| startsAt, endsAt | ISO đến giây với offset literal +07:00; kiểm calendar round-trip; start < end |
| status | draft / in_review / approved / published theo F0 |
| publication, publishedAt | F0 LegacyPublication, bắt buộc khi published; legacy approval đơn lẻ không đủ |

**Định danh bài ở W1 v1 là slug của catalogue Reader hiện hành.** Đây là ranh giới đã có trong F0, không phải cách cấp quyền khác. Bài ARTICLE trong SourceManifest cùng slug không tự trở thành bài catalogue được phép công bố, và bằng chứng của hai nguồn không thay thế nhau. C1 vẫn là preview 29 bài; W1 không nối toàn văn 29 bài vào production Reader hoặc chép chúng sang catalogue. Nếu sau này chọn ARTICLE thật cho public, cần phạm vi riêng cho adapter PublicView/Reader và bằng chứng đúng revision/hash trước khi nối lịch W1; xem [các quyết định](DECISIONS-NEEDED.md).

Mẫu `catalogue.topics` cũ được giữ cho lịch sử dữ liệu, không còn là nguồn runtime của các trang Chuyên đề tuần. DEV thường cũng dùng empty W1 khi registry chưa có dữ liệu, trong khi thư viện/Reader bốn mẫu và ba inline preview ngoài vùng weekly vẫn giữ nguyên. Fixture chuyên đề có entry riêng để kiểm đầy đủ tương tác.

## F0 là publication boundary

Tách nguyên selector catalogue đã có sang `build/select-content.ts`, giữ wrapper export cũ ở build/editorial.ts. Chỉ thêm clock tùy chọn để dùng cùng snapshot W1. Không đổi nội dung/phê duyệt/catalogue, không tạo bộ quyền song song.

1. `selectWeekly` gọi F0 `selectContent(catalogue, false, root, snapshot)`; dữ liệu DEV không mở bài nháp cho chuyên đề.
2. Chủ đề published phải vượt `assertLegacyPublication`. F0 yêu cầu đủ editorialApproval, expertReview, readerQA, learnerReview, publicationAuthorization, đúng subject/revision/hash/date/evidence. Revision nằm trong publication bundle hiện có.
3. `legacyHashes` phủ toàn payload chuyên đề, gồm ID, slug, tiêu đề, mô tả, thứ tự bài và hai mốc lịch. Thay title/order/interval làm bằng chứng cũ không hợp lệ. Topic không có asset nên không cấp quyền tài sản ngầm.
4. Quan hệ bài được lọc bằng tập eligible F0. Giữ nguyên thứ tự tương đối của các bài còn lại; chuyên đề không còn bài eligible bị loại khỏi mọi bề mặt.
5. Lịch chỉ chọn trong tập này, không viết status hoặc tạo bằng chứng. Record sai làm fail closed; lịch tới hạn không biến draft/approved thành published.

F0 kiểm nhất quán/toàn vẹn hồ sơ, không tự xác thực danh tính/chuyên môn hoặc giá trị pháp lý của người cấp quyền. Các record synthetic chỉ được sinh vào thư mục tạm của test và tự dọn; không có record thật mới cho dự án.

## Lịch và fallback

- Cấm interval chồng nhau, kể cả interval draft; hai khoảng liền nhau được phép. Input order không thay kết quả.
- `start <= now < end`: đúng mốc bắt đầu được chọn; đúng mốc kết thúc không còn là chuyên đề đang hiệu lực.
- Chỉ các chuyên đề đã bắt đầu, đủ quyền và có bài eligible vào index/detail. Topic tương lai không có route hay metadata trong payload browser.
- Ưu tiên interval đang hiệu lực. Nếu trống lịch hoặc interval hiện tại không còn eligible, chọn chuyên đề đã bắt đầu gần nhất còn eligible; nhãn ghi rõ “Đọc lại chuyên đề gần nhất”.
- Topic đã hết interval vẫn có thể đọc lại nếu còn quyền; hết lịch không đồng nghĩa thu hồi quyền công bố. Future không được dùng làm fallback.
- Không có ứng viên: currentId=null, reason=empty, topics/articles rỗng. Trang chủ và index hiện thông báo trung thực, direct topic không có trong view trả trang 404/recovery.

`WeeklyView` gồm selectedAt, reason, currentId, topics và các bài eligible được tham chiếu. Không serialize registry thô, topic bị giữ hoặc review records của weekly article pack. Các trang dùng cùng module `virtual:weekly`; không có ba selector riêng.

## Clock và tích hợp UI

Clock được chụp một lần lúc resolve cấu hình Vite. Snapshot của homepage/index/detail/library là cùng một object; không đọc Date.now, localStorage hoặc query để chọn lịch ở client. Website tĩnh chỉ đổi lựa chọn sau build lại được cấp phép. DEV cần restart server để tiến clock snapshot; hot reload nội dung không phải lịch tự động. Không backend/cron/deploy.

- WeeklySection dùng lại nguyên section ID/grid/artwork/classes đã duyệt, giữ inline mở/khép trong trạng thái có dữ liệu. Nội dung mở là mô tả và danh sách bài đúng thứ tự từ cùng view, không đoạn tâm lý viết riêng.
- Index/detail lấy topic từ cùng view; card dùng lại ArticleCard, shell/breadcrumb/title/focus dùng sẵn.
- Library nhận query `chuyen-de` trong hash, AND với q/chu-de/giai-doan. Khi chọn chuyên đề, thứ tự kết quả theo curated articleSlugs; Back/Forward/reload/related/return giữ query. Slug chuyên đề lạ không mở tập bài khác.
- CSS mới chỉ thêm khoảng cách giữa các CTA chuyên đề; global.css/reading.css/atmosphere.css và vùng Mây/B không đổi.

## Fixture và scanner

Từ `prototype/`:

```sh
npm ci
npm run test:w1
npm run dev:weekly-fixture
```

Mở `http://127.0.0.1:4192/tests/weekly-harness/index.html#/`. Có banner dữ liệu giả lập, clock server cố định 21/10/2026 12:00 +07:00. Ba topic giả lập (cũ/hiện tại/tương lai), hai bài synthetic có proof F0 giả lập và một bài thiếu quyền; không lấy 29 ARTICLE hoặc tên chuyên gia thật. Không copy fixture vào registry/catalogue thực.

Fixture chỉ serve literal 127.0.0.1:4192, chặn Host/Origin khác và build; no-store, không có public deployment output. Normal config không nạp fixture. Guard module graph từ chối fixture/harness/raw weekly.json ngay cả khi code “sạch”. Scanner F0 được mở rộng với ID/slug/title/description của topic W1 bị giữ, bao gồm escaped text; public topic hợp quyền không bị blacklist vĩnh viễn. Raw registry vẫn bị chặn trong artifact.

```sh
npm run test:w1:browser
npm run test:f0
npm run test:r1
npm run test:c1
npm run build
npm run test:production
```

Noindex/URL khó đoán không được dùng làm bảo mật. Repository vẫn công khai trên GitHub; guard bảo vệ ranh giới website.
