# Giai đoạn 2 — luồng đọc và nội dung mẫu

Trạng thái: đã triển khai để người dùng kiểm tra; chưa merge, chưa deploy, chưa bắt đầu Giai đoạn 3. Nhánh `phase-2-reading-flow` xuất phát từ main `842ac129dcf0ac6473293cc4a840db71d3ca7313` (merge PR #2), xác minh lại bằng `git fetch origin`.

## Phạm vi hoàn thành

- HashRouter cho trang chủ, thư viện, bài viết `:slug`, chuyên đề và chuyên đề `:slug`, cùng 404 có đường về thư viện/trang chủ. Nền tảng, Dòng chảy và Góc tâm tình vẫn truy cập được tại section trang chủ.
- Thư viện Editorial Garden: tìm tiêu đề/mô tả/từ khóa, có dấu/không dấu, chuẩn hóa đ/Đ và hoa/thường; kết hợp bộ lọc chủ đề/giai đoạn; đếm kết quả, không tìm thấy, xóa bộ lọc. URL giữ toàn bộ trạng thái để reload và Back/Forward hoạt động.
- Bài đọc: breadcrumb, tiêu đề/mô tả/metadata, mục lục có anchor và focus đích, heading, ghi chú, nguồn mở tab mới, bài liên quan và quay lại thư viện giữ bộ lọc.
- Bốn bài minh họa (ba draft, một in_review) và một chuyên đề draft. Không bài nào tự nhận được chuyên gia phê duyệt. Hai bài có nguồn WHO/NHS thật để đối chiếu khi biên tập; hai bài thiếu nguồn được ghi rõ.
- Schema có draft/in_review/approved/published. Virtual module lọc trước bundling; approved chưa xuất bản vẫn bị loại. Item published phải có hồ sơ approval và publishedAt. Đây là quy trình biên tập qua mã/PR, không phải chứng thực chuyên gia hay hệ thống đăng nhập.
- Production không có bài published nên hiển thị trạng thái chờ nội dung. Bản nháp trang chủ cũ cũng chỉ còn ở development. Không dùng query preview, chế độ build khác hoặc URL trực tiếp để mở bản nháp trên production.

## Giữ nguyên Giai đoạn 1

Không sửa `global.css`, `atmosphere.css`, bất kỳ garden/mascot component nào, ảnh nền, font, cấu hình giàn B hoặc HTML gốc. `git diff --exit-code origin/main -- prototype/src/styles/global.css prototype/src/styles/atmosphere.css prototype/src/components 'Không Gian Nội Tâm.html'` sạch.

SHA-256 HTML gốc vẫn là `4f78efcea9aa8b57f0603261abc4af3a56efb35111646bb7a9fbd7e7c70a4928`.

Trang chủ chỉ đổi plumbing của liên kết cho HashRouter và thêm đường vào các trang đọc. Chức năng đọc thử cũ được giữ ở development. Production thay phần văn bản nháp bằng lời chờ duyệt để đáp ứng yêu cầu không chứa bản nháp; đây là khác biệt có chủ đích về nội dung, không thiết kế lại khu vườn.

## Cách kiểm tra

```sh
cd prototype
npm ci
npm run dev
# /#/thu-vien
# /#/chuyen-de
# /#/chuyen-de/dem-dai
# /#/bai-viet/khi-mua-thi-den-gan
npm run build
npm run test:e2e
npm run test:production
```

Node 22.18+; khuyến nghị Node 24. Chromium tại `/usr/bin/chromium` hoặc `CHROMIUM_PATH`. Bản development là nơi xem các mẫu; `npm run preview` cố ý không có các bài này.

## Kiểm thử

**Kết quả cuối: build + publication guard đạt; development 30/30; production 4/4.** Môi trường và từng kiểm tra được ghi trong [verification.json](verification.json).

- TypeScript strict, Vite production và publication guard: kiểm tra lựa chọn đủ bốn trạng thái; published thiếu hồ sơ bị từ chối; loại link bài nháp khỏi chuyên đề; leak canary phải bị phát hiện; quét mọi file dist, gồm assets sao chép từ public; không source map.
- Bộ Chromium development gồm 22 kiểm tra kế thừa và 8 kiểm tra luồng đọc. Các trang mới được kiểm tra overflow, keyboard/skip link và Axe ở 320/390/768/1440px. Tìm kiếm gồm dấu/không dấu, hoa/thường, tiêu đề/mô tả/từ khóa, tổ hợp bộ lọc, rỗng, reset, reload và lịch sử.
- Kiểm tra mọi slug mẫu, chuyên đề, mục lục, link nguồn, bài liên quan, URL thiếu và 404. Điều hướng giữa các trang focus main; mục lục focus section; menu có Escape và trả focus. Rời trang chủ hủy nội dung Góc tâm tình.
- Production được phục vụ dưới `/Kho-ng-gian-Insight/` bằng máy chủ tĩnh không SPA fallback: asset/font/ảnh, tải lại route, query preview không mở nháp, 404 cho từng slug chưa xuất bản, trang chờ chuyên đề và giàn B tại cả bốn độ rộng.
- Hồi quy giữ Mây chuột/touch/bàn phím/reset, hành vi đồng hành/vùng an toàn, quote, weekly preview, timeline, ba excerpt, privacy, thả đèn/xóa nội dung/không lưu-gửi, reduced motion và tạm dừng khi offscreen/ẩn tab.

Trong quá trình kiểm tra đã sửa cách tổ chức test: development và production dùng outputDir riêng để không xóa trace của nhau; kiểm tra skip-link bắt đầu từ document mới thay vì sau focus chuyển route; dùng locator combobox theo accessible name cho select. Một test đồng hành cũ dùng đồng hồ đang chạy thật, làm cửa sổ xuất hiện lần hai trôi theo chi phí assertions; test được đóng băng thời gian và chỉ tiến bằng clock.runFor. Không thay đổi thời gian hoặc hành vi mascot để làm test đạt.

## Screenshot thật từ trình duyệt

Ảnh development có nhãn chưa duyệt. Ảnh production là build công khai không có bài xuất bản. Không dùng mockup hoặc sửa nội dung ảnh. Bộ đầy đủ nằm tại [screenshots/](screenshots/).

| Trang | Desktop 1440px | Mobile 390px |
|---|---|---|
| Thư viện | [Ảnh](screenshots/library-1440.png) | [Ảnh](screenshots/library-390.png) |
| Bài đọc | [Ảnh](screenshots/article-1440.png) | [Ảnh](screenshots/article-390.png) |
| Chuyên đề | [Ảnh](screenshots/topics-1440.png) | [Ảnh](screenshots/topics-390.png) |
| Chi tiết chuyên đề | [Ảnh](screenshots/topic-1440.png) | [Ảnh](screenshots/topic-390.png) |
| 404 | [Ảnh](screenshots/404-1440.png) | [Ảnh](screenshots/404-390.png) |
| Trang chủ production | [Ảnh](screenshots/production-home-1440.png) | [Ảnh](screenshots/production-home-390.png) |

Có thêm ảnh tương ứng tại 320/768px và ảnh trang chủ development. Ảnh lịch sử Giai đoạn 1 không bị ghi đè.

## Rà soát UI và nguồn

Đã đọc AGENTS.md cùng ba UI Skills được ghim trong repository. Taste dùng theo hướng nghệ thuật hiện có; NameThatUI dùng taxonomy offline cho native links/disclosure/search/select/breadcrumb/contents/status; Impeccable dùng Read mode, craft-floor, typography và responsive. Theo giới hạn AGENTS.md, không chạy launcher/context binary, draw/inspector engine, installer hoặc hook. Ngữ cảnh PRODUCT.md/DESIGN.md được đọc trực tiếp.

Rà soát độc lập theo Impeccable trả disposition **ship** cho các screenshot và phần triển khai được cung cấp: không có lỗi hình ảnh trọng yếu; xác nhận typography, nền, thích ứng reader và publication boundary. Tại thời điểm rà soát, hồi quy đầy đủ đang chạy; kết quả cuối ở verification.json. Phần tài liệu được đối chiếu độc lập với token/CSS/component đã dựng; đã sửa mô tả breakpoint thành gồm cả 600/900px và phân biệt điều hướng cuộn đến đích với scroll hijacking. Không thay format hay sửa drift lịch sử ngoài phạm vi.

Nguồn được mở kiểm tra ngày 24/10/2026: [WHO — Doing What Matters in Times of Stress](https://www.who.int/publications/i/item/9789240003927) và [NHS — Insomnia](https://www.nhs.uk/conditions/insomnia/). Chỉ xác nhận trang nguồn thật và truy cập được, không xác nhận toàn bộ bản mẫu đã được đối chiếu hoặc chuyên gia duyệt.

## Giới hạn còn lại

Chưa kiểm tra thiết bị vật lý, Safari/Firefox hay screen reader thực tế; Axe không phải chứng nhận accessibility. Bài mẫu ngắn, không phải 24 bài và chưa đủ điều kiện xuất bản. Chưa có bài published để người dùng đọc trên production; trang chờ là kết quả đúng. Các fixture published chỉ dùng trong kiểm thử selection, không vào catalogue hoặc website.

Approval metadata được quản lý qua review repository, không xác thực danh tính người duyệt. Bản nháp bị loại khỏi website build nhưng vẫn có trong source của repository công khai. Không có backend, đăng nhập, analytics, triển khai Pages hoặc auto-merge. Dừng để người dùng kiểm tra và duyệt Giai đoạn 2 trước khi có bất kỳ Giai đoạn 3 nào.
