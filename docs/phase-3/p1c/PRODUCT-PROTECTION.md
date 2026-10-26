# P1C bổ sung — Bảo vệ mã nguồn, nội dung và tài sản

Ngày 27/10/2026 (+07:00). Chỉ kế hoạch; chưa đổi quyền truy cập, thêm giấy phép hoặc sửa giao diện. Mục tiêu là hạn chế sao chép/nhận vơ và bảo toàn bằng chứng quá trình thực hiện, không hứa chống sao chép tuyệt đối.

## Ba lớp bảo vệ

| Lớp | Biện pháp đề xuất | Giới hạn và bằng chứng cần giữ |
|---|---|---|
| Kho phát triển | Chuyển repo gốc sang private sau phê duyệt; chỉ cấp quyền cộng tác tối thiểu; không cần cấp quyền repo cho người chỉ đọc website | Repo hiện public; bản clone/fork/cache đã có không bị thu hồi bằng thay visibility. Không xóa lịch sử để giả chưa từng công khai |
| Bản đưa lên host | Chỉ artifact production được kiểm F0 và cấp phép; không upload checkout, docs, dossier, manifest/proof thô, ARTICLE nguồn, fixture, C1 preview hoặc sourcemap | JavaScript/CSS/font/hình và nội dung đã gửi đến trình duyệt có thể tải/xem lại; minify không phải mã hóa hay kiểm soát quyền |
| Chứng minh và thông tin tác giả | Lưu commit/revision/hash, thiết kế, provenance/artwork, nhật ký quyết định và bản build được phép; có tác giả/phạm vi học thuật/năm/notice trên bản phát hành sau khi duyệt câu chữ | Commit/hash hỗ trợ truy vết, không tự chứng nhận tác giả pháp lý, quyền độc quyền hoặc danh tính người duyệt |

GitHub nêu repo public cho người dùng quyền xem/fork theo điều khoản nền tảng; chuyển private không xóa các bản sao đã tạo. Không có giấy phép mở toàn dự án không đồng nghĩa có thể gỡ quyền đã cấp cho thành phần bên thứ ba. [GitHub: licensing a repository](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/licensing-a-repository), [ảnh hưởng đổi visibility](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings/setting-repository-visibility).

## Phân định tài sản hiện có — chưa chứng nhận quyền mới

| Nhóm | Bằng chứng hiện có trong repo | Phạm vi cần xác minh trước phát hành / người chịu trách nhiệm |
|---|---|---|
| Mã/bố cục/thiết kế riêng của dự án | Lịch sử Git; PRODUCT/DESIGN và các PR; phần do chủ dự án thực hiện/chỉ đạo, có hỗ trợ AI | Chủ dự án xác nhận đóng góp, quyền đối với phần thuộc mình và định danh công khai; không nhận độc quyền React, pattern thông dụng hoặc code bên thứ ba |
| 29 ARTICLE và 29 SVG | [Inventory/hash](INVENTORY.json), ARTICLE/dossier/visual provenance, quyết định nội dung đã có | Người chuyên môn/biên tập và người xác minh quyền theo F0; giữ quyền SVG là UNVERIFIED cho tới bằng chứng thật. Căn cứ nguồn học thuật không tự cấp quyền sao đồ thị/test/toàn văn |
| Artwork nền/tán cây/Mây/tử đằng | [THIRD_PARTY_NOTICES](../../../prototype/THIRD_PARTY_NOTICES.md), [ARTWORK](../../prototype/ARTWORK.md) và lịch sử thiết kế | Chủ dự án/người rà quyền kiểm nguồn gốc, phần AI và điều kiện công cụ áp dụng lúc tạo. Bản gốc trong workspace cần sao lưu an toàn có kiểm chứng, không giả định workspace luôn tồn tại; không tự nhận độc quyền mọi đầu ra AI |
| React/React DOM/React Router và các dependency | Notices hiện ghi runtime MIT; lockfile pin phiên bản | Người rà kỹ thuật/quyền kiểm license thực của đúng bản và các thành phần thực được phân phối, giữ copyright/license notice cần thiết; đây chưa là kiểm toàn bộ license tree mới |
| Be Vietnam Pro/Cormorant Garamond | Notices ghi OFL-1.1; license trong `prototype/public/licenses/`; font serve local | Giữ upstream copyright/OFL, không nhận tác giả font; kiểm subset/đóng gói/sửa đổi nếu có. Không bỏ tệp giấy phép để “giấu tài sản” |
| UI skills/tài liệu upstream và build/test tooling | Có LICENSE/NOTICE riêng trong `.agents`/`docs/ui-skills`, parser GFM ở tầng build/test | Giữ nghĩa vụ license trong kho; không upload thư mục phát triển lên host. Không suy license của skill/dependency thành license mở cho toàn bộ dự án |
| Nguồn tham khảo/công cụ/hình bên thứ ba | REFERENCES/CLAIM-AUDIT/phiếu công cụ và credit hiện có | Người xác minh quyền kiểm từng cách dùng, tác giả, phiên bản, điều kiện tái bản/dịch/credit nếu liên quan; phi thương mại không miễn tự động; không triển khai MBTI/BFI/PSS/O*NET test |

`repository.license=null` là metadata GitHub chưa nhận diện license toàn repo, không phải kết luận mọi tệp không có license. Không thêm MIT/CC hoặc cho phép tái sử dụng phần riêng của dự án khi chưa được chủ dự án chấp thuận; đồng thời không sửa/xóa license của thành phần bên thứ ba.

## Notice đề xuất để chủ dự án duyệt, chưa đưa lên UI

**Mẫu nội dung, không phải giấy phép hoặc thông tin tác giả đã điền:**

> Không Gian Nội Tâm — sản phẩm học tập cá nhân môn Tham vấn học đường. Thực hiện: [định danh chủ dự án được phép công khai]. Năm thực hiện: 2026. Phi thương mại; không cung cấp dịch vụ tham vấn hoặc trị liệu trực tuyến.
>
> Quyền đối với phần nội dung, thiết kế và mã riêng thuộc chủ thể có quyền tương ứng, trong phạm vi được pháp luật bảo hộ. Chưa cấp giấy phép tái sử dụng phần riêng của dự án; việc xem để học tập/đánh giá không cho phép nhận là sản phẩm của người khác. Tài sản bên thứ ba giữ quyền và điều kiện sử dụng của tác giả/chủ thể tương ứng; xem thông tin nguồn và giấy phép liên quan.

Mẫu dòng copyright chờ duyệt: **© 2026 [chủ thể/định danh đã xác nhận] — áp dụng cho phần đóng góp có quyền đã được xác minh; tài sản bên thứ ba giữ thông báo và điều kiện riêng.** Chưa điền chủ thể hoặc đưa mẫu này lên giao diện.

Sau khi xác minh chủ thể/phạm vi, có thể dùng dòng copyright năm 2026 gắn với định danh đã được chủ dự án xác nhận; không tự điền tên hoặc “all rights reserved” bao trùm font/thư viện/artwork AI. Chủ dự án chốt có cho phép trích dẫn học thuật có ghi nguồn hay không và theo phạm vi nào; PR này không tự cấp quyền đó. Không thêm email cá nhân/mã sinh viên nếu chưa được phép. Vị trí đề xuất: footer/Nền tảng và một mục thông tin nguồn/giấy phép dễ đọc, không modal cản trở đọc.

## Artifact và hồ sơ nội bộ

Mã hiện hành dùng `base: './'`, HashRouter và `build.sourcemap:false` trong [vite.config.ts](../../../prototype/vite.config.ts); build có guard/scanner theo [F0 contract](../integration-plan/F0-CONTRACT.md). Đây là kiểm mã, không phải nghiệm thu hosting hoặc đảm bảo artifact tương lai đã sạch.

Khi được phép phát hành: clean build đúng SHA/lockfile, chọn PublicView trước serialize, scanner trước/sau emit/CLI và canary âm; chỉ upload output đã duyệt. Kiểm HTTP trực tiếp đường docs/ARTICLE/dossier/manifest/proof/fixture/map/preview trả không có bytes nhạy cảm, không dùng SPA fallback200 để che việc thiếu kiểm. Các notices/font license cần phân phối vẫn được giữ ở đúng phạm vi artifact. Phần prose public/asset đủ quyền vẫn có thể xem từ bundle; không cố giấu nội dung đã công bố bằng blacklist sai.

C1 giữ **serve-only trên 127.0.0.1**. Không deploy C1 hoặc bật tunnel chia sẻ draft với lý do website chỉ gửi giảng viên; không biến URL ngẫu nhiên thành bảo mật. Chọn hosting công khai không thay đổi F0.

## Bảo toàn quá trình và xử lý sao chép

- Trước đổi visibility, sao lưu kho đầy đủ refs/tags/commit vào nơi private có kiểm quyền; kiểm khả năng phục hồi. Lưu riêng PR/discussion/review/design/provenance cần thiết vì bản clone Git không chứa toàn bộ dữ liệu nền tảng.
- Lưu đối chiếu mỗi mốc release: source SHA, revision/hash, artifact digest, bộ notice/credit đã duyệt, kết quả QA và quyền tương ứng. Không rewrite/squash lịch sử chỉ để che xuất xứ; không đưa lời viết thật hoặc thông tin trẻ vào lịch sử.
- Nếu có bản sao nhận vơ: thu URL/ngày/bằng chứng đối chiếu với lịch sử và nội dung gốc; chủ dự án quyết định yêu cầu ghi nguồn/gỡ bỏ qua kênh phù hợp. Không tự gửi thông báo pháp lý hoặc liên hệ bên ngoài trong tác vụ này.
- Không chặn F12, chuột phải, chọn chữ, clipboard, in trang hay phím tắt; không watermark che chữ/hình hoặc phá screen reader/zoom/keyboard. Không obfuscation/anti-copy làm giảm chất lượng hoặc thêm tracking.

Phân biệt quyền được xác minh với khả năng kỹ thuật tải về. Kế hoạch giúp giảm lộ kho nguồn và chứng minh quá trình, không ngăn tuyệt đối người xem chụp màn hình, lưu tệp hoặc diễn giải lại.
