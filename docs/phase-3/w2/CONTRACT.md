# W2 — Lịch draft, thời gian và publication boundary

Mở rộng W1/P2, không tạo hệ thống quyền hay nguồn bài thứ hai. `ARTICLE.md`/source-manifest và 29 SVG nguyên byte. `prototype/editorial/weekly.json` nay có 10 chuyên đề **draft** dùng nguyên schema W1 (`id/slug/title/description/articleSlugs/startsAt/endsAt/status`). Không thêm trường học thuật mới vào payload đã ký; lý do chọn bài/bối cảnh/phòng ngừa nằm trong SCHEDULE.md. Quan hệ articleSlugs đối chiếu với manifest để suy ID, không tự lấy FEATURED/T 01–T 09.

## Chọn và kiểm lịch

`validateWeeklyRegistry` tách nguyên kiểm W1: field/ID/slug/known article/unique, calendar +07:00, start<end, overlap và proof nếu published. Hai khoảng liền nhau được phép. Gap được phép nhưng selector ghi fallback rõ ràng; lịch đề xuất có riêng test yêu cầu liền nhau đủ 18 tuần. Việc validate không cấp quyền.

`selectWeekly` giữ API cho fixture legacy. `selectPublicWeekly` vẫn dựng Library qua F0/P2 trước khi project view. Chuyên đề cần proof F0 của chính nó; chỉ published và đã bắt đầu mới được chọn. Sau lọc member eligible mà không còn bài thì loại cả chuyên đề khỏi mọi route/metadata. Không truyền future topic vào public view, kể cả own proof đã đúng. `upcoming` public luôn mảng rỗng, không title/slug/date/member count của tương lai.

Projection dùng chung chỉ tạo DTO từ selection; không xác nhận publication hoặc đổi status. Public caller bắt buộc đi qua F0, preview caller nằm trong module serve-only bị cấm vào public graph. Không có client query/env/localStorage cho phép public caller chọn preview hoặc tiến đồng hồ.

## Một snapshot cho mỗi build

`vite.config.ts` lấy một `Date.now()` lúc tạo cấu hình, truyền cùng giá trị cho `editorial` và `weekly`. Editorial lựa Library/emit asset, W1 lựa lịch, generateBundle/writeBundle scan đều nhận snapshot đó. F0 `loadManifest`/`selectSourceView` nhận thêm đối số clock tùy chọn và truyền tiếp vào **validator có sẵn**; mặc định vẫn Date.now. Không đổi predicate, bằng chứng, hash, quyền hoặc logic fail closed. `createPublicLibrary` cũng dùng cùng clock cho source và legacy; thử fixture có publishedAt sau snapshot phải bị từ chối.

Homepage/index/detail/filter dùng cùng `virtual:weekly`, không đọc clock client. `start <= snapshot < end`. Tại end, nếu có chuyên đề kế tiếp hợp quyền thì chọn nó; nếu không thì đọc lại chuyên đề đã bắt đầu gần nhất còn eligible. Hết khoảng không tự thu hồi quyền bài hoặc giấu bài khỏi Library. Chọn lại cùng snapshot/registry cho kết quả giống nhau (rollback logic).

CLI scanner sau build chạy tại thời điểm kiểm chứng riêng, không phải selector client hoặc cách đổi nội dung artifact. Các artifact từ hai lần build có thể khác timestamp/hash vì snapshot khác; không giả bộ chúng cùng byte bằng cách bỏ kiểm clock. Phát hành/rollback artifact thật cần chỉ thị và QA riêng; W2 chỉ có kiểm logic, không hosting.

## Ba trạng thái và giao diện

- Đang mở: chuyên đề tại snapshot, dùng chung order/links từ trang chủ đến detail/filter.
- Đã qua: đọc lại các chuyên đề đã bắt đầu; fallback được ghi “Chuyên đề gần nhất/Đọc lại chuyên đề gần nhất”.
- Sắp tới: đầy đủ draft title/mô tả/bài/date **chỉ ở preview**. Public chỉ có lời giải thích chung, không danh sách tương lai.

Giữ WeeklySection artwork/grid/inline open/close, ReadingShell, ArticleCard, breadcrumb/focus và Read mode. Metadata hiển thị theo Asia/Ho_Chi_Minh; ngày cuối ghi “trước” để không nhầm end inclusive. Không thêm animation. CSS chỉ bổ sung các rule khu trú cho control preview và đoạn snapshot; không đổi palette/font/artwork/Mây/B.

## Preview học thuật an toàn

`vite.p2.config.ts` xuất factory dùng lại, default P2 vẫn 4197. W2 dùng factory tại **127.0.0.1:4198**, kế thừa F0 PreviewView/C1 SVG allowlist/server protections. Module server `weekly-preview.ts` chỉ lấy dữ liệu từ preview C1 và validator lịch W1; không tạo publication record, không clone draft thành published.

Vite W2 precompute view cho 10 starts + trước lịch + sau lịch. Query `w2-at` chỉ chọn trong các khóa này trong **virtual:w2-preview**; không phải đồng hồ public. `Object.hasOwn` tránh khóa prototype, sai input fallback mốc 2. React control riêng chỉ đổi URL và reload, không lưu storage hoặc gửi dữ liệu người dùng; source bài không được đưa vào request. Mọi trang sau reload đọc cùng view. View gồm draft started và future để người nghiệm thu có thể mở trước; banner và nhãn draft/revision phân biệt với quyền công bố.

Guard graph thêm virtual:w2-preview/weekly-preview directory, kể cả module rỗng không sentinel. Scanner kiểm tất cả 40 marker ID/slug/title/description của 10 draft, raw JSON/MD/TS/map và canary như trước. Bộ kiểm âm cố đưa text/graph vào output phải fail; không thêm allowance cho lịch draft.

Không backend sản phẩm, cron, tunnel, tài khoản, tracking, Q1 hoặc deploy. Không nhận đây là lịch trường học hay hiệu quả can thiệp đã được chứng minh.
