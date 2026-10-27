# W2 — Chuyên đề tuần và lịch học thuật mẫu

[10 chuyên đề / lý do chọn bài](SCHEDULE.md) · [contract và snapshot](CONTRACT.md) · [báo cáo/ảnh/test](REVIEW.md) · [quyết định còn thiếu](DECISIONS-NEEDED.md).

PR #29 đã merge. Nền main `d6d9b142e097ab3c24c31ed841d6e13d416fbfcd`, tree `f5d0c7ffeddd82c953cbc8776727e45e2ba424b3`. W2 bổ sung 10 draft vào registry W1, không công bố chuyên đề hoặc bài viết. Chấp thuận nội dung 29/29 của chủ dự án giữ theo P1C; không kiểm toán nguồn AI lại hoặc sửa ARTICLE.

## Xem và thử chuyển tuần

Node 24.19.0, từ `prototype/`:

```sh
npm ci --ignore-scripts
npm run dev:weekly-preview
```

Mở **http://127.0.0.1:4198/#/**. Thanh “Lịch học thuật mẫu” có combobox **Thử thời điểm theo giờ Việt Nam**: chọn một trong 10 mốc bắt đầu, trước lịch hoặc sau lịch. Mỗi lựa chọn tải lại trang với query `w2-at` trước phần HashRouter; trang chủ/index/detail/filter nhận cùng snapshot. Default là chuyên đề 2 (25/01/2027). Back/Forward và reload giữ mốc; chọn lại mốc cũ mô phỏng xem lại snapshot trước. Đồng hồ thiết bị không tự chuyển tuần.

Tại trang chủ: mở danh sách bài hoặc đi tới chuyên đề đầy đủ. Index `/chuyen-de` chia đang mở/đã qua/sắp tới; future detail chỉ xem được ở preview. Từ chuyên đề mở Reader R1 hoặc lọc Thư viện; xóa bộ lọc để thấy đủ 29 bài. Đổi chuyên đề không khóa hoặc loại bài khỏi Thư viện, Dòng chảy hoặc search.

Đây là **F0 PreviewView trên loopback**, không dùng quyền giả hoặc đổi draft thành published. Kế thừa server/asset allowlist/no-store/Host-Origin guard từ C1 và cấu hình full-site P2. Chỉ listen 127.0.0.1:4198, serve-only, không tunnel, không deploy hoặc dùng URL/noindex làm bảo mật. Raw MD/JSON không được phục vụ. Query clock chỉ tồn tại trong virtual module/controls preview; public graph/scanner từ chối chúng. Query không hợp lệ dùng mốc mặc định đã khai báo, không chấp nhận thời gian tùy ý.

P2 riêng vẫn ở 4197, C1 ở 4191 và G1 test ở 4195. Dừng dev server bằng Ctrl+C khi xem xong. Repo hiện public vẫn đọc được nguồn trên GitHub; loopback không thay quyền truy cập repository hoặc bảo vệ khỏi phần mềm/người có quyền trên máy.

## Kiểm thử

```sh
npm run test:w2
npm run test:w2:browser
npm run build
npm run test:content
```

Báo cáo ghi kết quả thực chạy, không suy lệnh thành PASS. Suite cũ có thể ghi ảnh lịch sử: chạy trong bản sao QA riêng. Test quyền thật chỉ bằng fixture hoàn toàn giả lập trong temp root tự dọn; không gắn proof vào 29 bài thật. Không dùng tâm tình thật trong test.

## Production và vận hành sau này

Hiện public vẫn 0 bài/0 chuyên đề vì F0 chưa đủ; 10 draft không xuất ra artifact, kể cả khi tới ngày mẫu. Future có đủ proof cũng không có title/slug/detail/metadata trước `startsAt`. Không xuất danh sách “sắp tới” có nội dung ở public; chỉ giải thích chung rằng chuyên đề sẽ xuất hiện sau khi tới hạn và đủ quyền.

Build dùng snapshot duy nhất; website tĩnh không tự đổi tuần vào nửa đêm. Sau này người có trách nhiệm chỉ rebuild/phát hành artifact mới tại hoặc sau mốc với chỉ thị riêng. Không cron/backend/workflow deploy được thêm trong W2. Rollback vận hành là chọn lại artifact đã duyệt và kiểm tra snapshot/quyền phù hợp; preview quay mốc cũ không triển khai rollback hosting.

Dừng tại Draft PR `phase-3-w2-weekly-editorial`, không merge/deploy/publish hoặc bắt đầu Q1.
