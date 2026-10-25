# Đề xuất kế tiếp — chưa triển khai

Audit-r1, theo [PLAN](../PLAN.md), hàng **3.3 — Hoàn thiện chuyên đề tuần trên route hiện có**. Không đề nghị nhảy sang viết 25 bài, Nền tảng/Dòng chảy/Góc tâm tình hoặc tích hợp bốn bản nháp để lấp thư viện.

## Việc ngay sau PR audit
Người dùng xem [kết quả](FINAL-AUDIT.md), ma trận chín trục, [tồn đọng](EVIDENCE-AND-OPEN-ISSUES.md), playbook và gate. Cần xác nhận E05-r2 ở mức định hướng, cách ghi pending và đóng quy trình 3.2 nếu đồng ý. Không suy quyền chuyên môn/xuất bản. Sau đó mới xin/phê duyệt phạm vi 3.3 cụ thể; không bắt đầu trong đợt audit.

## Nội dung đề xuất cho bản kế hoạch 3.3 tiếp theo

| Bước phụ thuộc | Mục tiêu/đầu ra để duyệt | Tiêu chí nghiệm thu dự kiến |
|---|---|---|
| 1. Sau xác nhận 3.2, trước code | Kiểm trạng thái route/topic/catalogue mới nhất; đề xuất dữ liệu chuyên đề, lời dẫn, thứ tự đọc, lịch giới thiệu và người có quyền chọn | Tái sử dụng route chuyên đề hiện có; không kế thừa status nguồn/mẫu cũ thành quyền xuất bản; không đổi 24+5 đề tài |
| 2. Sau duyệt cách xử lý nội dung đủ điều kiện | Quy tắc chỉ liên kết bài published được cấp quyền; UI trung thực khi chưa có bài hoặc chuyên đề hợp lệ | Bốn mẫu r2 hiện không phải nguồn nội dung production. Cùng slug C05/C17 không là quyền thay mẫu. Không thêm draft vào public hoặc bỏ guard để có nội dung |
| 3. Sau duyệt quy tắc lịch | Lịch theo giờ Việt Nam, cách xác định chuyên đề hiện hành, giữ chuyên đề hợp lệ gần nhất và xử lý chưa có chuyên đề nào | Trang chủ/chuyên đề dùng cùng dữ liệu/quy tắc; kiểm mốc tuần/múi giờ, không link hỏng hoặc tự xuất bản bằng đồng hồ |
| 4. Sau cho phép triển khai 3.3 | Thực hiện trên nhánh/PR riêng và kiểm kỹ thuật theo thay đổi | Build/guard, route/detail, homepage–topic nhất quán; empty/fallback; responsive/bàn phím/focus; hồi quy GĐ1–2, không lưu dữ liệu suy ngẫm |

Khi hiện có **0 bài và 0 chuyên đề published**, vẫn có thể thiết kế/kiểm quy tắc và trạng thái trống sau khi được phép. Không vì thế phải xuất bản bốn bài, dùng placeholder như bài đã duyệt hoặc tạo reviewer giả. Nếu cần dữ liệu fixture để test sau này, phạm vi fixture và cách loại khỏi production phải được trình duyệt; audit không tạo chúng.

## Ranh giới với các đợt sau
3.4 Nền tảng, 3.5 Dòng chảy, 3.6 Góc tâm tình, 3.7/3.8 các lô bài còn lại, 3.9 kết nối/kiểm tổng thể giữ thứ tự trong PLAN. Tích hợp reader của bốn bài có thể cần hợp đồng dữ liệu/guard được duyệt theo ARCHITECTURE và [READINESS-GATES](READINESS-GATES.md); không mặc định nằm trọn trong 3.3 hoặc tự làm kèm.

PLAN/PRODUCT vẫn chứa trạng thái 3.1 lịch sử. Báo cáo này ghi nhận ủy quyền mới của hội thoại, không sửa tài liệu nền để tự cấp quyền. Nếu người dùng muốn cập nhật tài liệu quản trị theo trạng thái hiện tại, trình phạm vi riêng; chưa làm trong audit.

**Điểm dừng:** PR tổng kiểm tra, chờ người dùng quyết định. Chưa đóng 3.2, chưa code 3.3, chưa viết bài, tích hợp, merge hoặc deploy/publish.
