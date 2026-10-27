# R1.1 — tiếp nhận bằng chứng thực tế, chuẩn bị xuất bản

Nền main `4d434cc25848f2e3e1f381a7361a1afa1180cf6c`; PR #32 đã merge ngày 27/10/2026 lúc 14:50:34 +07:00. Nhánh `phase-3-r11-review-evidence-release`.

**Đã ghi nhận ba hoạt động đánh giá có thật theo xác nhận chủ dự án; chưa đủ dữ kiện ràng buộc theo từng subject để tạo review approved mới. RELEASE BLOCKED.** Không yêu cầu làm lại hoạt động hoặc kiểm toán AI. Giữ nguyên 68 record/proof R1.0, 29 ARTICLE, 29 SVG, mã sản phẩm và guard.

- [Tiếp nhận ba nhóm bằng chứng](INTAKE.md): phân biệt điều đã xác nhận và dữ kiện chưa có; tái dùng Q1 đúng hash, không suy ra kết luận chuyên gia/người học.
- [Bảng 29 bài và 10 topic](STATUS.md) / [scope/hash và trường chưa biết](STATUS.json): editorial/assetRights R1.0 hợp lệ; expert/reader/learner chờ ánh xạ phạm vi và kết luận thực tế.
- [Một danh sách bổ sung tối thiểu](MISSING-INFO.md): dùng một đợt đánh giá/tài liệu gốc cho nhiều subject nếu đúng phạm vi, không cần 29 buổi riêng. Không đưa danh tính học sinh lên repo.
- [Mẫu publicationAuthorization ngắn](PUBLICATION-AUTHORIZATION.md): chưa là quyết định đã xác nhận, không bao gồm deploy/hosting/đổi visibility.
- [Validation/build/scanner](VALIDATION.json): trạng thái thật của artifact, không lấy preview hoặc fixture làm production.

## Bằng chứng đã có và giới hạn

Hoạt động chuyên môn có giáo viên tâm lý tham gia, kiểm trải nghiệm thực và thử đọc người học **đã diễn ra theo chủ dự án**. Tên người, thời gian, nhóm/thiết bị, phạm vi bài-topic/phiên bản, phản hồi và kết luận chưa được chỉ thị cung cấp cụ thể; không tự đặt. Không gán báo cáo Q1 cho hoạt động con người hoặc đổi NOT TESTED thành PASS. R1.0 vẫn có 29 editorialApproval bài + 29 assetRights + 10 editorialApproval topic hợp lệ rời.

F0 kiểm proof theo kind/subjectId/revision/contentHash/revisionHash/by/at và hash tệp. Một báo cáo gốc chung có thể được dẫn trong nhiều proof đúng scope; một proof subject A không thay record subject B. Chỉ khi có kết luận và phạm vi thật mới ghi approved. F0 không thay xác minh thẩm quyền/năng lực hoặc tạo kết quả còn thiếu.

Chưa gắn bundle, không đặt publishedAt hoặc đổi source-manifest/weekly sang published. Khi đủ bằng chứng và quyết định riêng: tái dùng 68 record cũ nguyên byte, bổ sung record đúng subject, validate bundle rồi mới build đủ 29 bài/29 SVG và kiểm route/scanner. W1 tiếp tục giấu các topic tương lai của lịch mô phỏng 2027 trước startsAt; Library không khóa theo tuần.

## Kết luận

Bản kiểm boundary hiện 0 bài/0 chuyên đề public là fail closed đúng guard, không phải bản phát hành đủ 29 bài. Digest/file list và log có trong VALIDATION.json/verification. Không triển khai Cloudflare, không đổi private, merge hoặc deploy. Dừng tại Draft PR để chủ dự án nghiệm thu và bổ sung dữ kiện có thật trong danh sách duy nhất ở trên.
