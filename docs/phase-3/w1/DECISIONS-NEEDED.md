# Quyết định còn cần trước dữ liệu thật

W1 không cần chủ dự án chọn các mục này để nghiệm thu logic/fixture/empty state. Registry thật hiện rỗng; không có lịch đăng hoặc phê duyệt mới nào được tạo.

1. **Nguồn bài public:** chọn các bài và revision thực sự muốn công bố, cùng phạm vi adapter public. W1 v1 tái sử dụng catalogue/Reader hiện hành và F0 legacy gate; không tự biến preview C1 thành public, không nhập 29 ARTICLE vào catalogue. Nếu chọn ARTICLE thật, cần nối adapter PublicView/R1 trong một phạm vi được cấp riêng trước khi bật liên kết thật; không tái dùng giấy duyệt của mẫu legacy cùng slug.
2. **Nội dung chuyên đề:** ID/slug, tên, lời dẫn và thứ tự bài do chủ dự án chọn; không mặc định FEATURED hoặc T01–T09 là weekly đã duyệt. Metadata của chuyên đề cần bằng chứng F0 của chính nó.
3. **Mốc lịch:** ngày/giờ +07:00 cụ thể, start inclusive/end exclusive; chốt trước khi tạo review bundle vì đổi mốc/order/title làm hash thay đổi. Mặc định W1 theo roadmap: khoảng trống dùng chuyên đề đã bắt đầu gần nhất còn quyền; không dùng future.
4. **Phê duyệt và quyền:** các bằng chứng biên tập/chuyên môn/QA/thử đọc/quyền công bố đúng revision/hash và quyền từng tài sản theo F0. Nghiệm thu nội bộ bản nháp không thay thế các bằng chứng này. Không ghi tên/ngày người thật nếu chưa có quyền và bằng chứng.
5. **Giới hạn QA:** screen reader, Safari/Firefox, thiết bị thật và zoom native chưa được xác minh trong đợt này. Kết quả Chromium/reflow emulated không được gọi là nghiệm thu toàn diện. Cần người/công cụ phù hợp và quyết định chấp nhận giới hạn trước phạm vi công bố tương ứng.

Website tĩnh cần build lại để đổi snapshot lịch. W1 không thiết lập cron, hosting, tự động publish hoặc deploy. Các lựa chọn nội dung/phê duyệt/xuất bản là đợt được cấp riêng sau này, không tự bắt đầu từ Draft PR này.
