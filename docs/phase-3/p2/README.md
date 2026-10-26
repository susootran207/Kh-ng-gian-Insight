# P2 — Thư viện đầy đủ qua F0 và Reader R1

P2 triển khai mã tích hợp, **chưa công bố 29 bài**. Chấp thuận nội dung của chủ dự án đã được ghi nhận tại [P1C](../p1c/OWNER-DECISION.md), không yêu cầu duyệt lại nội dung hoặc P1B.1 AI. Chỉ thị P2 mới cho phép hoàn thiện kỹ thuật/kiểm thử trước khi hoàn tất các bằng chứng F0; không miễn các điều kiện phát hành.

Nền main `ef2a3a7d534dd6104c1fd29f17a90d74339e10b6`, PR #28 đã merge. Nhánh `phase-3-p2-full-library-integration`. [Báo cáo](REVIEW.md) · [coverage 29 bài](CONTENT-COVERAGE.json) · [bảo toàn 203 tệp](SOURCE-PRESERVATION.json) · [điều kiện phát hành](RELEASE-CONDITIONS.md).

## Xem website đầy đủ trong môi trường nội bộ

Node 24.19.0, từ `prototype/`:

```sh
npm ci --ignore-scripts
npm run dev:full-library-preview
```

Mở **http://127.0.0.1:4197/#/thu-vien**. Cùng server có trang chủ `/#/`, Dòng chảy `/#/dong-chay`, Nền tảng và Góc tâm tình. Toàn bộ 29 ARTICLE/SVG được đọc trực tiếp từ nguồn đã pin, không có JSON prose biên tập thứ hai. Đây là luồng PreviewView F0 trên chính các trang sản phẩm, không phải PublicView hoặc record xuất bản giả.

Có banner nội bộ; mỗi card/Reader ghi bản nháp/revision. H1, notice lịch sử trong nguyên bản, bảng, APA, Bloom, phản hồi, hình/alt/caption/mô tả được giữ. Liên kết nhãn hồ sơ trong nguyên bản dẫn đến lời giải thích tại Reader; không cung cấp dossier qua HTTP. Các hồ sơ đầy đủ vẫn có trong C1 riêng khi cần người có trách nhiệm đối chiếu.

Chỉ listen literal **127.0.0.1:4197**; Host/Origin khác bị từ chối, không CORS, phản hồi no-store, raw MD/JSON bị chặn; SVG chỉ qua allowlist C1 chính xác. Config không cho build. Không dùng tunnel, port forwarding công khai, deploy preview hoặc sửa host. Loopback không bảo vệ khỏi người/phần mềm đã có quyền trên máy; repo public cũng không trở thành private nhờ chế độ này. URL/noindex không cấp quyền.

Bộ lọc `q`, `chu-de`, `giai-doan` kết hợp AND; `bo-suu-tap=core|extension` phân nhóm nền tảng/mở rộng. `nhom=Txx` của C1 cũ được giữ riêng, không bị tái sử dụng. Link bài/related/chuyển bài giữ đường quay lại kết quả. Chuyên đề thật vẫn rỗng do chưa có lịch được duyệt; kiểm lựa chọn tuần bằng fixture tổng hợp, không tạo lịch thật.

## Kiểm thử và build

```sh
npm run test:p2
npm run test:p2:browser
npm run build
npm run test:content
```

`test:p2` gồm cả build production cô lập với 29 bài hoàn toàn giả lập và proof giả lập trong thư mục tạm tự dọn. Không gắn proof giả vào 29 bài thật. Ca thứ 30 kiểm không có giới hạn cứng 29. Browser P2 dùng 29 nguồn thật qua PreviewView, không gọi đó là 29 bài được cấp quyền.

Các suite cũ có thể ghi ảnh vào thư mục lịch sử: chạy trong bản sao QA riêng như báo cáo. Không dùng tâm tình thật khi kiểm Góc tâm tình. Xem REVIEW để biết kết quả thực chạy và giới hạn, không suy từ lệnh trong README thành PASS.

Bản build hiện tại chỉ có public eligible set rỗng; muốn xem 29 bài phải dùng lệnh preview ở trên. `npm run dev` vẫn phục vụ mẫu cũ ở chế độ phát triển để giữ hồi quy, không phải chế độ nghiệm thu 29 bài hoặc phương án kiểm soát truy cập công khai.

## Tương thích hosting sau này

Giữ HashRouter, base tương đối và tài nguyên tự host; `prototype/dist` là đầu ra tĩnh có thể đưa lên Cloudflare Pages **sau** khi F0/Q1 và lệnh phát hành riêng được hoàn tất. URL hình đã cấp quyền dùng hash, resolve theo base thực tế cả root và repository prefix. Không cần backend/cron/login. P2 không tạo hosting, đổi repo visibility, deploy hoặc publish.
