# Song song theo phụ thuộc và quyền sở hữu tệp

Đề xuất accel-plan-r1, chưa tạo nhánh triển khai/fixture hoặc sửa website. Đây là các luồng công việc có thể tách, không giả định đã có nhân sự hoặc reviewer. Nếu một người thực hiện thì xen kẽ nghiên cứu/viết/QA/UI; không cam kết thời gian giảm tuyến tính theo số luồng.

## Luồng có thể bắt đầu sau phê duyệt phạm vi tương ứng

| Luồng | Công việc độc lập | Phụ thuộc bắt buộc / điểm nhập chung |
|---|---|---|
| Nội dung B01–B05 | Nghiên cứu và viết các thư mục bài không trùng; preflight công cụ/nguồn khó sớm | Mỗi lô được cho phép và G0 nguồn; không cần website xong. Kiểm định nghĩa/giới hạn dùng chung trước nghiệm thu |
| F0 nền reader | Hợp đồng ID–slug–revision–nguồn–hình/status và cách fixture kiểm UI; kiểm publication boundary | Duyệt hợp đồng trước các thay đổi runtime phụ thuộc; không giả hồ sơ review; không bỏ guard hiện có |
| Reader/QA | Layout citation/APA/hình/bảng/TOC/đáp án, cỡ chữ/zoom/bàn phím/assistive bằng fixture | Dựa hợp đồng F0 được duyệt; tích hợp bản nháp thật cần quyền và revision được chọn; không cần đợi 25 bài |
| Chuyên đề 3.3 | Lời dẫn, thứ tự, lịch Việt Nam, fallback và dữ liệu đồng bộ homepage | F0 nếu đổi dữ liệu; link production phải qua published. Có thể chuẩn bị logic/empty state khi chưa có bài xuất bản |
| Nền tảng 3.4 | Nội dung mục đích/quy trình/thực tế nguồn và quyền riêng tư | Không chờ 3.3 xong; không ghi reviewer/đối tác hoặc trạng thái chưa có. Router/nav dùng chung nhập tuần tự |
| Dòng chảy 3.5 | Bốn chặng, nhãn đọc và logic lọc | Dùng hợp đồng nhãn/URL thống nhất; không suy đoán cảm xúc; điểm nhập timeline/homepage có chủ tệp chung |
| Góc tâm tình 3.6 | Hướng dẫn, phản hồi thao tác, quyền bỏ qua và QA quyền riêng tư | Giữ giới hạn hiện có, không backend/inbox/log/analytics; phần trạng thái/chung homepage nhập theo lượt |
| Bên ngoài | Lên lịch chuyên môn/thử đọc/quyền theo các revision ổn định | Người thật và phạm vi thực tế; kết quả có thể đến khi lô sau đang viết, không lấy kết quả bài này thay bài khác |

## Fixture cho reader, không thành đường xuất bản nháp
Sau khi được phép, đề xuất thư mục test riêng như `prototype/tests/fixtures/` (đường dẫn mới dự kiến, chưa tạo). Dùng văn bản giả định/ID test dễ nhận, không nội dung thật hoặc tên reviewer/phê duyệt giả; component test có thể truyền dữ liệu nháp qua đầu vào test, không nới filter runtime. Gắn rõ tính chất giả định trong môi trường review.

Fixture phải nằm ngoài catalogue production và `public/`, không được dependency graph production import dù dưới URL/query “preview”, không copy raw Markdown/JSON hoặc SVG chưa đủ quyền ra bundle. Không coi chỉ gắn nhãn fixture hoặc dùng một điều kiện DEV là bằng chứng đã loại khỏi production.

Kiểm bắt buộc khi thực hiện: build production → quét toàn bộ output cho sentinel fixture, ID/text nháp và source map; kiểm catalogue/route/homepage/topic không trỏ fixture; truy cập URL trực tiếp/query không mở nội dung test; kiểm test phân biệt draft/in_review/approved chưa published với published đủ quyền theo dữ liệu hợp lệ. Không tạo người duyệt giả trong dữ liệu thật. Nếu chưa có bài published hợp lệ, production vẫn empty state; không cần dựng phê duyệt giả để thử bố cục reader.

Render fixture/browser/keyboard/screen reader giúp phát hiện lỗi hạ tầng sớm, không thay chuyên môn, thử đọc bài thật hoặc QA lại revision/asset khi tích hợp. Repository công khai vẫn có thể đọc source test; “không vào production” không phải hứa bảo mật.

## Nhánh/PR và tránh xung đột
Đề xuất nhánh nội dung `phase-3-b01-drafts`…`phase-3-b05-drafts`, nhánh nền reader và nhánh các module website riêng sau duyệt. Mỗi nhánh từ main mới nhất, không xếp B02 dựa B01 chưa merge khi không có phụ thuộc. Dùng checkout/worktree riêng nếu làm đồng thời. Bài trong lô chỉ thuộc lô đó; không sửa bốn mẫu hoặc tệp nền để giải quyết xung đột tiện tay.

Phân một người/luồng chịu trách nhiệm tệp chung: schema, catalogue/adapter, router/nav, kiểm publication và cấu hình build/deploy. Module độc lập nên thêm tệp riêng khi phù hợp; việc ráp vào router/homepage và stylesheet dùng chung được nhập theo lượt. Không coi hai nhánh đều sửa một router là song song không phụ thuộc. Không đổi global palette/tử đằng B/Mây để tiện module mới.

Trình tự merge đề xuất (do người có quyền thực hiện, không tự merge): hợp đồng/nền F0 → các phần reader/module dựa nó → adapter tích hợp revision đã được cho phép → tổng kiểm 3.9. PR nội dung chỉ docs có thể merge độc lập trước/sau các bước website, vẫn là draft chưa xuất bản. Shared files phải có owner/điểm phối hợp trong mô tả PR. Rebase/merge main vào nhánh đang làm có kiểm soát, không force-push/rewrite nhánh chung; giải xung đột rồi chạy lại kiểm bị ảnh hưởng.

## Giảm chờ mà không tăng tồn kho lỗi
Cho phép nhiều lô trong một quyết định phạm vi nếu chủ dự án muốn; mỗi lô vẫn PR riêng và chờ duyệt. Tối đa hai lô ở bước viết/QA; preflight nguồn khó có thể đi trước nhưng phải ghi là nghiên cứu chưa thành bản thảo. Tách ngoại lệ BLOCKED, để các bài và module độc lập đi tiếp. Không gộp PR UI và năm bài thành một khối khó duyệt; báo cáo theo bài/risk giúp chủ dự án chỉ xem kỹ ngoại lệ và điểm cần quyết định.

Trạng thái chờ người thật/quyền công bố không chặn việc tạo bản nháp hoặc thử UI được cho phép; luôn chặn công bố khi thiếu bằng chứng cần thiết. Không đồng nghĩa mọi việc được chạy ngay: hiện chỉ sáu tài liệu kế hoạch được phép.
