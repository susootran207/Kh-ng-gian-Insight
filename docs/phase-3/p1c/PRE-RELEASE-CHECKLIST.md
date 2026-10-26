# P1C bổ sung — Checklist private repo và phát hành có kiểm soát

Ngày 27/10/2026 (+07:00). **Tất cả ô là việc dự kiến, chưa thực hiện.** Không phải chỉ thị chuyển private/tạo host/deploy; chủ dự án cần cấp quyền riêng ở các điểm quyết định cuối tài liệu. Không bắt đầu P2/W2/Q1 trong PR #28.

## Trước khi đổi repository sang private

- [ ] Chủ dự án chốt thay đổi visibility, tài khoản sở hữu và thời điểm; đánh giá gói GitHub/Actions/Pages, quyền quản trị và ảnh hưởng tới cộng tác viên, checks, GitHub App/connector đang dùng. Không suy từ tài khoản public rằng đã có Pro/Team.
- [ ] Lập danh sách người thực sự cần nguồn/hồ sơ; giảng viên chỉ đọc site không cần quyền repo. Nếu giảng viên cần chứng minh quá trình, chọn phụ lục/bằng chứng phù hợp hoặc quyền read riêng, không mở lại toàn kho chỉ để gửi link.
- [ ] Sao lưu toàn bộ Git refs/tags/commit và kiểm phục hồi; lưu PR/review/discussion, thiết kế, quyết định, revision/hash, nguồn gốc artwork vào kho private được phép. Bản clone Git không giữ toàn bộ dữ liệu nền tảng; kiểm sự tồn tại các bản gốc đang ngoài repo/workspace.
- [ ] Kiểm các bản public/fork/clone/cache đã tồn tại và nói rõ không thu hồi được bằng đổi visibility; không hứa xóa dấu vết đã công khai. Không rewrite/xóa lịch sử phát triển để “bảo vệ bản quyền”.
- [ ] Kiểm nguồn public khác: releases, artifact, package, attachment, URL raw/CDN, bản mirror và domain cũ nếu có. Chỉ ghi nhận; xử lý/gỡ bỏ phải có quyền riêng, không tự xóa.
- [ ] Nếu có Pages/domain đang phục vụ lúc thực hiện: đánh giá ảnh hưởng plan và DNS trước khi chuyển để tránh link chết hoặc domain bị chiếm. Hiện API báo `has_pages=false`, không phải bảo đảm tương lai chưa ai cấu hình. GitHub có cảnh báo Free/private làm Pages ngừng phục vụ. [Hệ quả đổi visibility](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings/setting-repository-visibility).
- [ ] Sau thao tác có phép: kiểm ngoài phiên đăng nhập không tải được source/dossier qua GitHub, người được quyền vẫn làm việc được; không coi đó là kiểm bảo mật của website. Kiểm Actions/connector/billing còn phù hợp trước chạy lại quy trình phát hành; không nới quyền toàn tài khoản cho tiện.

## Trước khi tạo hosting hoặc gửi link website

- [ ] Chốt A/B/C, chế độ public-unindexed hay xác thực, chấp nhận giới hạn copy/link chuyển tiếp, chủ tài khoản host, ngân sách/quota, hostname và thời gian duy trì sau nộp bài. Không tự mua domain, đăng ký gói hoặc tạo project để thử.
- [ ] Nếu chọn B: duyệt Direct Upload artifact-only hay Git integration; ghi trade-off không đổi trực tiếp chế độ project. Mọi lần tạo project/upload đều là hành động phát hành cần quyền; không gắn repo/auto-preview trước để rồi lộ draft.
- [ ] Nếu chọn C: duyệt loại xác thực, dữ liệu/định danh người đọc, chính sách/log/session/thu hồi và kiểm tất cả hostname/asset/alias chưa xác thực; không chỉ khóa màn hình chính bằng JS hoặc bật bảo vệ preview rồi bỏ quên production.
- [ ] Giữ tiêu chí sản phẩm thật: đủ phân hệ, 29 bài/hình, Library/search/filter/related/Dòng chảy/Chuyên đề/Góc tâm tình, Mây/B, responsive/motion; không lấy ảnh hoặc slideshow thay thế. Hosting tĩnh được phép về kiến trúc; nghiệm thu runtime phải thực hiện thật sau tích hợp.
- [ ] Hoàn thiện các bằng chứng thật còn thiếu theo bảng dưới và [29 scope](ARTICLE-STATUS.md); chủ dự án nghiệm thu P1, cấp chỉ thị riêng cho P2/W2/Q1. Mục đích học thuật không miễn gate và không cho ra mắt28/29.
- [ ] Chốt định danh tác giả được phép công khai, năm 2026, câu chữ mục đích/giới hạn dịch vụ/notice/quyền sử dụng; rà tài sản bên thứ ba và notices cần phân phối. Không thêm license mở toàn dự án hoặc cấp phép tái sử dụng chưa được chọn.
- [ ] Ở đợt triển khai riêng: clean build đúng SHA, chỉ chọn nội dung đủ F0 trước serialize/copy, scanner/canary và QA; khóa artifact digest trước upload. Không đưa `.git`, `docs`, ARTICLE thô/dossier/proof/manifest, fixture, sourcemap, dependency source hoặc preview output lên host. License/notices cần thiết vẫn phải đi cùng phần được phân phối.
- [ ] Kiểm noindex HTML/HTTP trên URL thật/alias; không quảng bá/sitemap submission; không dùng robots.txt như ACL. Kiểm HTTP đường nháp/raw/preview và alias cũ, không kết luận “sạch” chỉ từ trang chủ200/404 hoặc vì repo private.
- [ ] Kiểm privacy thực của host/log/analytics/cookie, quyền ai xem log và thời gian lưu; không gửi nội dung textarea vào request, URL, storage hoặc telemetry. Chốt phần thông báo nếu cần bổ sung bằng PR được giao; không hứa zero data processing ở hạ tầng.
- [ ] Kiểm320/390/768/1440, keyboard/focus, zoom 200% native, screen reader thật, reduced motion, browser/thiết bị theo QA-PLAN. Giữ điều chưa kiểm là BLOCKED/UNVERIFIED; không gọi desktop giả lập là thiết bị thật.
- [ ] Kiểm link production/deep hash/reload/Back/Forward/return, font/SVG/MIME/cache, đủ29 bài sau P2; weekly subset không làm mất thư viện. Site tĩnh chuyển tuần bằng build/deploy có phép; không cron/backend mới.
- [ ] Chủ dự án duyệt release candidate, đúng artifact/digest và chỉ thị deploy riêng. Sau khi được phép: smoke test, log mốc nộp bài, người giữ link/bản sao an toàn và kế hoạch rollback không phục hồi quyền đã thu hồi. Không tự bật dịch vụ chỉ vì CI xanh.

## Bằng chứng F0 còn thiếu và thẩm quyền xác nhận

| Yêu cầu | Hiện có / còn thiếu | Cách hoàn tất hợp lệ và ai xác nhận |
|---|---|---|
| Chấp thuận nội dung | Chủ dự án chấp thuận 29/29, không đổi revision/hash | Giữ quyết định P1C; không kiểm toán AI lại |
| `editorialApproval` | Có ý định biên tập thật; chưa record/proof đúng F0 từng ID | Chủ dự án/người có thẩm quyền biên tập xác nhận đúng scope, định danh/ngày thực và bằng chứng truy xuất được; người được cấp việc mới ghi record |
| `expertReview` | Chưa có hoạt động/kết luận chuyên môn thật được xác minh trong bundle | Người có năng lực phù hợp rà claim/nguồn/an toàn/tuổi theo phiếu P1A, kết luận có giới hạn và xử lý blocker bắt buộc; không ký lại nguyên báo cáo AI như chuyên gia |
| `readerQA` | Log kỹ thuật trước có, chưa đủ phần thực tế và xác nhận F0 | Người phụ trách kỹ thuật/tiếp cận tái dùng phần còn hợp SHA, kiểm các phần thiếu thật và xác nhận phạm vi; không gán Node test là native zoom/SR |
| `learnerReview` | Chưa có bằng chứng thử đọc phù hợp THCS/THPT và record | Người tổ chức/giáo viên/người chịu trách nhiệm có thực hiện thử đọc xác nhận kết quả vô danh/hiểu nhầm/tải đọc; không công khai tên hoặc dữ liệu tâm lý trẻ |
| `assetRights` |29 SVG rights=null; tài sản dùng chung có notices/provenance, chưa chứng nhận toàn bộ | Chủ thể có quyền hoặc người có thẩm quyền xác minh căn cứ sử dụng thật cho đúngasset/hash/phạm vi học thuật web, credit/điều kiện; không tự gán CC/độc quyền, không cần giấy phép giả cho tài sản không dùng |
| `publicationAuthorization` | Chuẩn bị phát hành không phải quyền công bố; chưa có record | Chủ dự án/người được ủy quyền ra quyết định riêng sau đủ gate, đúng từng ID/hash/phạm vi/kênh; quyền chuyên môn/quyền hình không thay quyết định này |

Dùng [mẫu A–F](EVIDENCE-FORMS.md) đã có. Có thể tổ chức theo nhóm/báo cáo chung và phụ lục29 dòng, nhưng mỗi loại/ID/hash cần kết luận thật và proof tương thích. Không có yêu cầu làm thêm một báo cáo AI hàng loạt. Cách kiểm quyền phải bám đúng tài sản/phạm vi phân phối; nếu viện dẫn ngoại lệ pháp luật phải có căn cứ cụ thể do người có trách nhiệm xác nhận, không mặc định phi thương mại được miễn.

F0 proof vẫn ở đường quy định trong repo, không đưa vào website. Nếu repo được chuyển private sau này, người có trách nhiệm phải còn truy cập được proof khi kiểm/build; không cần công khai hồ sơ quyền/danh tính lên site chỉ để có hash. Mẫu “bằng chứng tối thiểu được phép công khai” của P1C được hiểu theo nơi lưu thực tế: chỉ công khai nếu thực sự phải và được phép, luôn tránh hợp đồng/thông tin nhạy cảm; không thay schema/guard.

## Điểm chủ dự án cần phê duyệt riêng trước thao tác

| Mã | Quyết định cần chốt | Trạng thái trong bổ sung này |
|---|---|---|
| A01 | Đổi repo private, thời điểm, sao lưu, danh sách quyền cộng tác/App/connector | **Chưa cho phép thao tác** |
| A02 | Chọn A/B/C; B được đề xuất, xác nhận chấp nhận public-unindexed và khả năng chuyển tiếp link; nếu C chốt auth/dữ liệu | **Đề xuất, chưa chọn thay chủ dự án** |
| A03 | Host/account/project/hostname/domain, plan/quota/chi phí, thời gian giữ link, người vận hành/thu hồi | **Chưa cho phép tạo/mua/cấu hình** |
| A04 | Định danh tác giả, notice/năm/phạm vi quyền riêng, credit và bất kỳ điều kiện cho phép tái sử dụng | **Mẫu chờ duyệt, không tự điền tên/license** |
| A05 | Quyền từng tài sản/proof thật, chuyên môn/learner/QA và quyền publication đúng F0 | **Còn BLOCKED theo từng loại** |
| A06 | Nếu tích hợp Git/hosting: quyền App/token, preview/auto-deploy, header/noindex, log/analytics/privacy copy, workflow riêng | **Chưa cấu hình hoặc đổi CI** |
| A07 | Bắt đầu P2/W2/Q1 sau điều kiện bắt buộc, nghiệm thu từngPR, release candidate và deploy/publish riêng | **Ngoài phạm vi PR #28** |

Chủ dự án đã xác nhận mục đích học thuật/phi thương mại và chấp thuận nội dung29 bài; không cần xin lại hai quyết định đó. Nghiệm thu tài liệu bảo vệ trong Draft PR không tự đồng nghĩa chấp thuận mọi thao tácA01–A07.
