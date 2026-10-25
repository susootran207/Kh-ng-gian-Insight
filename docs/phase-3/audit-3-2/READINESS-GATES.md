# Điều kiện trước tích hợp và xuất bản

Đề xuất audit-r1 để người dùng duyệt, không tự cho phép triển khai. Căn cứ [STANDARDS](../STANDARDS.md), [ARCHITECTURE](../ARCHITECTURE.md) và phạm vi hiện tại. “Tích hợp” dưới đây tách bản xem xét trong development khỏi đưa nội dung vào website production.

## G0 — Trước bắt đầu đưa bốn bài vào reader

| Điều kiện bắt buộc | Hiện trạng | Bằng chứng cần có |
|---|---|---|
| Người dùng duyệt kết quả audit/mức nghiệm thu revision; cấp quyền tích hợp cụ thể | Chưa; E05-r2 chưa lời nghiệm thu riêng được ghi nhận | Quyết định người dùng nêu revision và phạm vi; merge PR không thay thế |
| Hợp đồng dữ liệu/ánh xạ được duyệt: ID, slug, revision bài–asset–nguồn, citation/APA/figure/credit và status | Chưa thiết kế/triển khai trong đợt này; C05/C17 trùng slug mẫu cũ | Phương án chuyển đổi review được, không ghi đè mẫu âm thầm; xử lý ID nguồn cục bộ |
| Xác định đường preview và giữ cổng production | Có bộ lọc hiện tại nhưng chưa có tích hợp r2; catalogue chỉ mẫu cũ | Preview development không tự bật công khai; production chỉ lấy tập có quyền published; không URL/client toggle mở draft |
| Xác định phạm vi dùng tài nguyên khi review, bảo toàn quyền riêng tư và GĐ1–2 | Bản nháp có sơ đồ tự biên soạn, quyền công bố cuối còn pending | Phạm vi dùng preview được phép; không tài nguyên không rõ quyền, lưu/log/gửi hoạt động, thay thiết kế tử đằng B/Mây |

Không cần giải quyết Carskadon/Fallace hay chọn được số g để bắt đầu một tích hợp được cho phép **nếu** không thêm luận điểm/số liệu phụ thuộc. Cũng không cần giả có reviewer trước thử engineering preview. Chuyên môn/thử đọc vẫn là điều kiện trước xuất bản, không bị preview thay thế.

## G1 — Trước nghiệm thu một tích hợp kỹ thuật

Kiểm trên reader thật: citation–reference, caption/credit/alt/long description, heading/TOC/bảng, phần sâu tùy chọn, cỡ chữ/zoom/hẹp–rộng và dữ kiện đầy đủ ngoài ảnh. Kiểm bàn phím/focus và screen reader bằng công cụ/người thực tế; không xác nhận từ regex hoặc SVG riêng. Đặc biệt C01/C05 thu hẹp có chữ nhỏ.

Chạy build/kiểm publication boundary và hồi quy route/filter/Back–Forward/chuyên đề/trang chủ, quyền riêng tư Góc tâm tình, reduced motion và thiết kế GĐ1–2 theo phạm vi đổi. Chỉ các tệp/asset đã được cho phép được tích hợp; nguồn pending và status phải giữ đúng. G1 chưa chạy vì audit không tích hợp. Không đặt yêu cầu “đã kiểm reader tích hợp” trước khi được phép tạo bản tích hợp để kiểm.

## G2 — Trước xuất bản bất kỳ bài nào

1. Rà soát chuyên môn độc lập thực tế theo revision/phạm vi, ưu tiên cảm xúc/giấc ngủ và giới hạn khoa học; xác minh chuyên môn/đồng ý hiển thị tên nếu định ghi. Không tạo reviewer thay người thật.
2. Thử đọc phù hợp THCS–THPT và rà tính khả thi hoạt động trong nhiều điều kiện. Dùng tình huống giả định, quyền bỏ qua, không thu dữ liệu nhạy cảm vào repo. Không bắt buộc thử nghiệm hiệu quả điều trị hoặc đo can thiệp khi bài không hứa hiệu quả ấy; cần bằng chứng độ hiểu/khả dụng trước chuẩn hóa.
3. Hoàn thành G1 và QA tiếp cận cho đúng revision; sửa phát hiện rồi kiểm lại phần ảnh hưởng. Các kiểm kỹ thuật không xác nhận khoa học.
4. Chốt quyền công bố SVG và mọi tài nguyên/credit/phông cần dùng; hồ sơ quyền rõ. Asset tự thiết kế chưa đồng nghĩa đã có giấy phép công bố cuối.
5. Xác nhận nguồn hỗ trợ từng nhận định vẫn đúng phạm vi; sửa chuyên môn phải cập nhật claim/citation/hoạt động/hình và duyệt lại. Nguồn không dùng có thể pending; muốn thêm cơ chế/lịch sử/số g phải gỡ vấn đề trước thêm, không làm ngược.
6. Chủ dự án phê duyệt **nội dung cuối** và **quyền xuất bản** riêng, đúng revision/phạm vi, ngày/bằng chứng. Không chuyển trạng thái vì bài đã merge hoặc được dùng làm ví dụ quy trình.
7. Khi có ủy quyền triển khai/xuất bản thực sự, kiểm build không rò các bản chưa được chọn, liên kết chuyên đề/trang chủ chỉ tới bài được phép; deployment là hành động cần đúng phạm vi chỉ thị, audit không thực hiện.

Tại audit này G0 chưa được thông qua, G1 chưa thực hiện và G2 chưa đủ. Không sửa runtime guard để “hợp thức hóa” các bài; guard hiện không xác thực nguồn/quyền hình/danh tính reviewer. Mọi mở rộng phải được trình duyệt, giữ kiểm soát đang có.

## G3 — Đóng 3.2 và chuyển 3.3
Người dùng xác nhận kết quả tổng kiểm tra và cách xử lý tồn đọng, sau đó cho phép phạm vi 3.3 cụ thể. Có thể duyệt đóng quy trình bốn mẫu với pending được chấp nhận mà **không** cấp quyền xuất bản chúng; quyết định cần ghi rõ. Bản audit hoặc PR merge không tự đóng 3.2, không tự mở 3.3.
