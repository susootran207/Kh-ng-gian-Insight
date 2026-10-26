# P1C bổ sung — Hosting và quyền truy cập website

Đánh giá ngày **27/10/2026 (+07:00)** bằng mã hiện hành và tài liệu chính thức bên dưới. Đây là đề xuất, chưa tạo tài khoản/project, liên kết GitHub App, domain, cấu hình hoặc deploy thử. Gói tài khoản/quota/điều kiện phải kiểm lại khi thực hiện; không cam kết giá hoặc SLA.

**Đề xuất phù hợp nhất: B — repo private + Cloudflare Pages phục vụ artifact production đã duyệt, link production ổn định, không yêu cầu người đọc đăng nhập, có yêu cầu noindex.** Ưu tiên Direct Upload có kiểm soát từ bản build đã qua gate, không cấp quyền đọc repo cho host ở bước đầu. Điều kiện chọn B: chủ dự án chấp nhận website truy cập công khai dù chỉ gửi link cho giảng viên/người mời. Nếu yêu cầu chỉ người được phép mới đọc, chuyển sang C và chốt lại yêu cầu xác thực/dữ liệu.

## Những ranh giới phải hiểu đúng

- **Không lập chỉ mục không đồng nghĩa bảo mật:** noindex là yêu cầu với crawler hỗ trợ nó, không chặn người/bot truy cập, lưu hoặc chia sẻ.
- **URL khó đoán không đồng nghĩa kiểm soát truy cập:** link có thể bị chuyển tiếp, xuất hiện trong lịch sử/log hoặc bị tìm thấy; không dùng nó bảo vệ tài liệu nội bộ.
- **Repo private không giấu tài nguyên đã gửi tới trình duyệt:** người xem vẫn có thể tải HTML/JS/CSS/font/hình và nội dung đọc public; quyền tác giả và notice không phải DRM.
- **Phục vụ tệp tĩnh không phải demo tĩnh:** ứng dụng React/HashRouter hiện có chạy tương tác ở trình duyệt. Không cần backend để giữ tìm kiếm, điều hướng, bộ lọc, hiệu ứng hay nghi thức thả đèn không lưu/gửi.

## So sánh A/B/C

| Phương án | Repo nguồn / link người đọc | Xác thực và mức kín | Chi phí / bảo trì | Điểm phù hợp và điều kiện |
|---|---|---|---|---|
| **A. Repo private + GitHub Pages công khai** | Repo private; link production GitHub Pages ổn định khi site/tài khoản còn hoạt động; giảng viên không cần GitHub để đọc | Site vẫn public, không có allowlist người đọc chỉ nhờ private repo; tài nguyên browser tải được | Với private repo cần gói GitHub hỗ trợ, chẳng hạn Pro/Team/Enterprise; Free thông thường chỉ Pages từ repo public. Chưa biết gói tài khoản này. Bảo trì ít, có quota Actions private | Hợp nếu đã có gói phù hợp và muốn một hệ sinh thái. Chỉ publish artifact kiểm sạch, tuyệt đối không chọn toàn thư mục docs làm nguồn Pages. Không chọn A chỉ vì tưởng private repo có Pages private |
| **B. Repo private + Cloudflare Pages public, Direct Upload artifact** | Repo private giữ Git/dossier; host nhận tệp build đã duyệt, không cần tích hợp quyền repo. Link production theo project `*.pages.dev`, không dùng URL preview theo commit | Người đọc mở link không account/email; **ai có link hoặc tìm ra đều đọc được**. Noindex để giảm lập chỉ mục, không auth | Có gói Free với giới hạn; domain riêng không bắt buộc, mua domain có phí riêng. Cần tài khoản quản trị host và thao tác upload được cho phép mỗi lần phát hành; CI private có quota riêng | **Ưu tiên cho bài tiểu luận:** ít chi phí/bảo trì, không backend, giữ chức năng. Cần chủ dự án chấp nhận public-unindexed, chốt quota và không phát nháp |
| **C. Repo private + hosting có xác thực tầng ngoài** | Chẳng hạn Pages với Cloudflare Access bảo vệ mọi hostname/asset; một link ổn định dẫn qua cổng truy cập | Người được cho phép xác thực trước khi nhận bytes. Ví dụ Access OTP cần email; không đáp ứng nguyên vẹn yêu cầu hiện tại “không đăng nhập/không cung cấp thông tin cá nhân” | Thêm chính sách, phiên hết hạn, xử lý mất quyền, log và hỗ trợ người dùng; gói/quota Access chưa kiểm cho tài khoản thực | Chỉ chọn khi thật sự cần giới hạn người đọc và chủ dự án chấp nhận đánh đổi. Không thêm login vào app/backend; chưa triển khai trong PR này |

Nguồn A: [GitHub Pages và private repo/gói](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site). Nguồn B: [Direct Upload](https://developers.cloudflare.com/pages/get-started/direct-upload/), [giới hạn gói Free](https://developers.cloudflare.com/pages/platform/limits/). Nguồn C: [Access OTP](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/one-time-pin/), [Access cho Pages production/alias](https://developers.cloudflare.com/pages/platform/known-issues/).

Không đề xuất một mật khẩu chia sẻ như allowlist danh tính: bí mật dùng chung có thể bị chuyển tiếp và không thu hồi riêng từng người. Nếu chủ dự án muốn cổng mật khẩu để không nhập email, phải chọn nhà cung cấp/gói hỗ trợ xác thực thật ở tầng hosting và phê duyệt riêng; không dùng mật khẩu viết trong JS, hộp thoại client-side hoặc URL bí mật. Ngay cả C cũng không ngăn người đã được phép lưu/chụp/chuyển nội dung họ nhận.

## B — cách vận hành đề xuất, chưa thực hiện

Chỉ sau khi F0/P1 đầy đủ và P2/W2/Q1 đạt trong các PR được cấp riêng: clean production build → scanner/canary → duyệt SHA/digest artifact → người được ủy quyền upload **chính artifact đó** → smoke test link production. Không upload workspace/checkout, không build bằng C1 preview hoặc dev server. Lưu artifact đã duyệt để rollback, nhưng không rollback về bản thiếu bài/quyền đã thu hồi. Khóa phiên bản đã nộp bài và thời gian duy trì link theo quyết định chủ dự án.

Cloudflare Direct Upload nhận prebuilt assets và có link production theo project. **Không chuyển trực tiếp project Direct Upload sang Git integration sau này**; muốn dùng Git integration phải lập kế hoạch project mới/chuyển địa chỉ. Chấp nhận đổi workflow tương lai là một quyết định cần duyệt trước khi chọn chế độ project. [Tài liệu Direct Upload](https://developers.cloudflare.com/pages/get-started/direct-upload/).

Git integration là lựa chọn phụ nếu sau này cần cập nhật thường xuyên: nó mặc định tạo build/deploy và preview từ push. Cần quyền repo tối thiểu và kiểm soát production/branch preview trước khi dùng; không nối repo rồi coi CI xanh là chỉ thị xuất bản. [Git integration và tắt automatic deployments](https://developers.cloudflare.com/pages/configuration/git-integration/). Không tạo GitHub App hoặc auto-deploy ở phiên này. Chưa có yêu cầu xây workflow triển khai mới.

Vite hiện dùng đường asset tương đối và HashRouter nên phù hợp về kiến trúc, nhưng chưa thử trên Cloudflare. Cần kiểm path root/repository prefix, reload/deep hash, MIME/cache/font/SVG, liên kết và history sau chuyển host; không hứa tương thích đã PASS chỉ từ đọc config. Website tĩnh không tự đổi lịch chuyên đề khi tới giờ: W2 vẫn cần snapshot build/redeploy có phép, không cron mới trong P1C.

## Không lập chỉ mục và bảo vệ nội bộ

Đề xuất khi được phép cấu hình: noindex ở HTML và/hoặc HTTP `X-Robots-Tag` tại host, kiểm response thật của link production và các alias. Không gửi sitemap/Search Console để quảng bá, không đăng link trong README public/diễn đàn hay chiến dịch SEO. Không hứa không bao giờ xuất hiện trong tìm kiếm. Google cần crawl được rule noindex; chặn robots.txt trước có thể khiến rule không được đọc. Không dùng robots.txt để liệt kê đường tài liệu bí mật. [Google noindex](https://developers.google.com/search/docs/crawling-indexing/block-indexing).

Cloudflare có cơ chế `_headers` cho static asset responses; đây chỉ là cấu hình dự kiến, **chưa thêm file hoặc nới allowlist scanner**. Khi có PR hosting riêng phải kiểm guard và schema cho các tệp điều khiển được phép. [Headers](https://developers.cloudflare.com/pages/configuration/headers/).

Mọi raw ARTICLE/dossier/proof/manifest, fixture, sourcemap, C1 endpoint/assets và tệp phát triển phải **không có trong artifact**. Không đặt chúng lên host rồi trông cậy vào noindex/URL lạ. Chỉ nội dung public đúng quyền và notices cần phân phối được đưa ra. Trong lúc F0 còn BLOCKED không dựng site “chỉ gửi giảng viên” chứa29 draft để lách guard.

## Nếu chọn C: các đường vòng phải đóng

Cloudflare cảnh báo bật Access cho preview **không tự bảo vệ** production `project.pages.dev` hoặc custom domain. Phải lập chính sách cho production, preview/branch aliases, URL deployment cũ và domain phụ tương ứng; kiểm request chưa xác thực tới HTML, JS/CSS và asset riêng đều bị từ chối trước bytes. Không để origin/alias công khai làm lối vòng. [Preview access](https://developers.cloudflare.com/pages/configuration/preview-deployments/), [production Access](https://developers.cloudflare.com/pages/platform/known-issues/).

Cần kế hoạch người mời/thu hồi, session, cách giảng viên truy cập, log tối thiểu/thời gian lưu và xử lý email/identity. Access OTP gửi mã cho email được cho phép; chủ dự án phải đồng ý đánh đổi này trước. Không ghi email người được mời vào repo public hoặc làm backend tài khoản trong app.

## Dữ liệu và vận hành ở cả A/B/C

Không có account/form/analytics trong ứng dụng không đồng nghĩa hạ tầng không xử lý IP/request metadata. Chọn dịch vụ, vị trí/quyền quản trị log, retention và tracking tùy chọn phải được xem xét; không tự bật Web Analytics, tag manager, error telemetry, form service hoặc gửi nội dung textarea. Chưa kiểm tài khoản/dịch vụ thực nên không tuyên bố đã tắt log/cookie ở host.

Giữ privacy copy đúng chức năng đã kiểm, bổ sung mô tả hạ tầng nếu cần trong PR có phép. Giữ keyboard/reduced motion/zoom/screen reader và responsive; cổng Access nếu chọn C cũng phải được kiểm accessibility. Không đổi giao diện/hiệu ứng để phù hợp host bằng cách bỏ chức năng.

## Những gì đã kiểm và chưa kiểm

Đã xem mã Vite/Router/F0, workflow và notices; GitHub API báo repo `public`, `has_pages=false`, PR #28 `draft=true`, chưa merge. Chưa biết gói GitHub, tài khoản/quota/điều khoản quản trị hosting hoặc domain; chưa kiểm runtime/HTTP/cache/Access/noindex trên host thực và chưa tạo dịch vụ. Các đường dẫn ví dụ là mẫu, không phải URL đã được cấp.

Việc tra cứu ở đây chỉ xác minh lựa chọn hosting/truy cập/quyền ở mức kế hoạch; **không mở lại kiểm toán khoa học 29 bài**. Tài liệu chính thức được truy cập qua web ngày27/10/2026; điều kiện phải kiểm lại trước quyết định triển khai.
