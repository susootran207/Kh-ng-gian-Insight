# R1.1 — tiếp nhận hoạt động đánh giá thực tế

Nguồn xác nhận: chỉ thị R1.1 của chủ dự án trong hội thoại, sau khi PR #32 đã merge. Tài liệu ghi nhận lời xác nhận, không giả chữ ký hoặc URL công khai của hội thoại.

Chủ dự án xác nhận ba hoạt động **đã diễn ra thực tế**:

> Nội dung học thuật và an toàn tâm lý đã được xem xét, có sự tham gia của giáo viên có chuyên môn tâm lý.
>
> Website đã được sử dụng và kiểm tra khả năng đọc, điều hướng và trải nghiệm.
>
> Nội dung đã được thử đọc với người học thuộc nhóm đối tượng mục tiêu.

| Nhóm | Đã biết | Chưa được xác nhận cụ thể |
|---|---|---|
| expertReview | Có hoạt động xem xét học thuật/an toàn, có giáo viên có chuyên môn tâm lý tham gia | Người xác nhận/vai trò được phép ghi, thời gian, tập bài/topic và phiên bản, nhận xét/kết luận thực tế |
| readerQA | Có sử dụng/kiểm tra đọc, điều hướng, trải nghiệm; Q1 có log kỹ thuật theo hash | Người xác nhận, thời gian/phạm vi kiểm thực tế, chức năng/kết quả, lỗi/cách xử lý, thiết bị/browser nếu biết và phần chưa kiểm |
| learnerReview | Có thử đọc với nhóm người học mục tiêu | Người phụ trách xác nhận, thời gian, nhóm đối tượng/tập bài-topic, phản hồi/đề xuất và kết luận thực tế |

Không gọi các hoạt động này là “chưa thực hiện”. Hiện chưa đủ căn cứ để suy hoạt động bao phủ mọi C01–C24/E01–E05 hoặc 10 payload chuyên đề W2. Không tự điền số người, ngày đánh giá, tên/vai trò cụ thể hơn xác nhận, thiết bị, nhận xét hoặc kết luận approved. Không yêu cầu thực hiện lại hoạt động.

## Bằng chứng có thể tái dùng ngay

- [R1.0](../r10/README.md): 68 record rời editorial/assetRights đã hợp lệ; giữ nguyên byte và thời điểm cũ. Không dùng chúng thay expert/readerQA/learner/publicationAuthorization.
- [Q1](../q1/REVIEW.md) và coverage JSON tại 320/390/768/1440: 29 bài, 4.716 AST = DOM node, 25 bảng, 29 SVG mỗi viewport. Mã/nguồn liên quan được đối chiếu hash trước khi tái dùng.
- Q1 có đường dẫn/log Library/search/reset/history/Reader/TOC/related/return/Flow/weekly/privacy/dialog; môi trường Chromium headless và viewport mô phỏng được giữ nhãn. Không đổi thành thiết bị thật hoặc hoạt động người học.
- Q1 chưa kiểm native zoom 200%, screen reader, thiết bị thật và browser khác; R1.1 chưa có chi tiết mới để thay các nhãn này. C1 keyboard pan tiếp tục NOT REPRODUCED, không tuyên bố đã sửa.
- P2/W2 đã dùng cùng nguồn Library, không khóa tuần. 10 chuyên đề là lịch mô phỏng 2027; future vẫn chịu W1, không tự mở sớm.

Một tài liệu gốc có thể mô tả một đợt đánh giá chung. F0 hiện đòi JSON proof có scope riêng trùng từng record: có thể dẫn cùng tài liệu gốc/hash từ nhiều proof theo subject, không dùng nguyên một proof có subject khác hoặc tự suy 29 lần đánh giá. Tài liệu gốc phải nêu tập bài/topic, phiên bản và kết luận tương ứng.

Hồ sơ tiếp nhận không phải proof approved. Dữ kiện cần bổ sung chỉ tập trung tại [MISSING-INFO.md](MISSING-INFO.md); mẫu quyết định xuất bản tại [PUBLICATION-AUTHORIZATION.md](PUBLICATION-AUTHORIZATION.md).
