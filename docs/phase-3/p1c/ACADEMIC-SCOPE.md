# P1C bổ sung — Mục đích học thuật và phạm vi sử dụng

Ghi nhận ngày **27/10/2026, Asia/Ho_Chi_Minh**, theo chỉ thị bổ sung của chủ dự án đối với Draft PR #28. Đây là quyết định về mục đích/phạm vi và yêu cầu sản phẩm; không phải quyền triển khai hosting hoặc hồ sơ phê duyệt F0.

## Mục đích đã được chủ dự án xác nhận

Không Gian Nội Tâm là sản phẩm website phục vụ **bài tiểu luận cá nhân môn Tham vấn học đường**, trong hoạt động học tập và thực hành thiết kế sản phẩm truyền thông tâm lý học đường.

Dự án **phi thương mại**: không bán dịch vụ, không thu phí, không quảng cáo và không cung cấp tham vấn/trị liệu trực tuyến. Không tự thêm tên cơ sở đào tạo, giảng viên, đơn vị bảo trợ, chứng nhận hoặc chuyên gia. Tên/định danh tác giả muốn công khai cần chủ dự án chọn, không suy từ tài khoản GitHub.

## Yêu cầu sản phẩm được giữ nguyên

Sản phẩm khi phát hành phải vận hành như website thực tế: đầy đủ các phân hệ đã chốt, **29 bài nguyên nội dung cùng hình**, tìm kiếm, bộ lọc, điều hướng, Dòng chảy, Chuyên đề tuần và Góc tâm tình. Giữ Mây, tử đằng B, artwork, typography, responsive và chuyển động đã duyệt. Hoạt động Góc tâm tình mang tính biểu tượng, không có người nhận/đọc/phản hồi lời viết và không biến thành dịch vụ hỗ trợ trực tuyến.

Mục đích học thuật **không hạ chuẩn** ổn định, accessibility, an toàn tâm lý, quyền riêng tư hoặc toàn vẹn nội dung. Không thay một website đầy đủ bằng slideshow, ảnh chụp hay demo thiếu bài. Hosting phục vụ tệp tĩnh vẫn có thể chạy ứng dụng React tương tác đầy đủ; lựa chọn hosting không quyết định số bài được phép công bố.

Hiện tại chưa phải bản ra mắt: 29 bài được chủ dự án chấp thuận nội dung nhưng F0 còn thiếu bằng chứng; public vẫn 0 bài. Yêu cầu V1.0 đủ 29 bài là mục tiêu sau P1/P2/W2/Q1 có chỉ thị riêng, không phải mô tả tính năng đã công bố.

## Người đọc và chia sẻ

Chủ dự án muốn một **link ổn định** để gửi giảng viên và người được mời, không yêu cầu họ đăng nhập hoặc nhập thông tin cá nhân, không chủ động quảng bá hay đưa website lên công cụ tìm kiếm. Với lựa chọn A/B không xác thực, đây là **website công khai được chia sẻ hạn chế**, không phải chỉ người được mời mới đọc được. Nếu muốn hạn chế người đọc thực sự, phải chọn C và phê duyệt thay đổi yêu cầu về đăng nhập/định danh hoặc bí mật truy cập. Xem [so sánh truy cập](HOSTING-ACCESS.md).

Không thu tài khoản, thông tin liên hệ, câu trả lời tâm lý hoặc lịch sử tâm tình qua ứng dụng. Hạ tầng hosting vẫn có thể xử lý IP, thông tin request và log vận hành; không hứa “không có bất kỳ xử lý dữ liệu cá nhân nào”. Trước phát hành phải kiểm cấu hình log/analytics của dịch vụ và cách diễn đạt riêng tư trên Nền tảng/footer/Góc tâm tình, chỉ thay bằng PR được giao riêng.

## Chấp thuận nội dung, quyền và F0

Giữ nguyên [quyết định chấp thuận 29/29 bài](OWNER-DECISION.md), đúng revision/hash trong [bảng phạm vi](ARTICLE-STATUS.md). Không thực hiện lại P1B.1 kiểm toán nguồn AI hàng loạt hoặc viết lại bài theo cảm tính.

Đánh giá quyền phải tương xứng với phạm vi học thuật thực tế: xác minh đúng tài sản và hình thức dùng/phân phối, dùng lại chứng cứ còn phù hợp, không dựng giấy phép bên thứ ba cho tài sản không sử dụng. **Phi thương mại hoặc gửi giảng viên không tự tạo quyền tái bản/phân phối.** Nếu dựa vào ngoại lệ giáo dục hoặc trích dẫn, người có trách nhiệm phải xác định căn cứ áp dụng và điều kiện thật; không tự kết luận một ngoại lệ bao trùm toàn website. [WIPO giải thích quyền, giấy phép và ngoại lệ theo pháp luật áp dụng](https://www.wipo.int/en/web/copyright/faq-copyright).

Các yêu cầu `expertReview`, `learnerReview`, `readerQA`, `assetRights` và `publicationAuthorization` không được thay bằng nhãn “bài tiểu luận”. Các hoạt động/bằng chứng còn thiếu giữ BLOCKED theo [F0-GAP-MAP](F0-GAP-MAP.md). Không tạo proof hoặc đổi status published; không nới guard.

## Hiệu lực của bổ sung này

Được ghi nhận ngay: bối cảnh học thuật/phi thương mại, yêu cầu bảo vệ sản phẩm và tiêu chí truy cập. **Chưa được phép thực hiện:** đổi repository sang private, mở hosting, cấu hình DNS/domain, cài GitHub App hosting, đổi CI, phát hành hoặc triển khai P2/W2/Q1. Đề xuất nhà cung cấp, notice và thao tác quản trị cần chủ dự án phê duyệt riêng theo [checklist](PRE-RELEASE-CHECKLIST.md).
