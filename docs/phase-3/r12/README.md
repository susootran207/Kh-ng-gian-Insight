# R1.2 — đối chiếu F0 và production 29 bài

Nền main `cf088fcac7f74eecade6d6840c75ff5d99735b4e`; PR #33 đã merge ngày 27/10/2026 lúc 15:13:04 +07:00. Nhánh `phase-3-r12-f0-production-completion`.

**TECHNICAL PASS trong phạm vi kiểm; RELEASE BLOCKED. Chưa có production đủ 29 bài.** Giữ nguyên 107 record/proof R1.0/R1.1, 29 ARTICLE, 29 SVG, giao diện và publication guard. Không kiểm toán AI hoặc yêu cầu làm lại hoạt động.

## Dữ kiện mới đã ghi nhận

Phạm vi ba nhóm hoạt động nay đã được chủ dự án xác nhận là **toàn bộ 29 bài và 10 chuyên đề, đúng hash R1.0**. Giáo viên tâm lý là người đánh giá chuyên môn; kết luận được chủ dự án thuật lại là **“cho phép”**. Giáo viên đã kiểm website bằng **laptop**; thử đọc bao phủ toàn bộ phạm vi. Không có thời gian đánh giá được cung cấp; không có browser, số người, từng thao tác, phản hồi chi tiết hoặc kết luận riêng readerQA/learnerReview được nêu. “Chủ dự án không nêu giới hạn” được giữ đúng nghĩa **chưa cung cấp giới hạn**, không phải chứng nhận không có giới hạn.

[Sổ tiếp nhận và scope/hash](STATUS.json) / [bảng 29 bài + 10 topic](STATUS.md) phân biệt nguồn thuật lại và bằng chứng kỹ thuật Q1. Không mô tả thành chữ ký/biên bản hoặc xác nhận trực tiếp của giáo viên. Không công khai danh tính học sinh.

## Những trường có thể điền và chỗ phải pending

| Nhóm | Có thể ghi hợp lệ | Phải giữ pending |
|---|---|---|
| expertReview | Nguồn thuật lại là chủ dự án; vai trò giáo viên tâm lý; đủ 39 subject/hash; kết luận được thuật lại “cho phép” | `at`: thời gian đánh giá không được cung cấp; chưa tạo record/proof approved |
| readerQA | Giáo viên kiểm website bằng laptop; đủ phạm vi; Q1 đúng source/SVG hash cho phần kỹ thuật đã kiểm | `at` và kết luận cho phép riêng của hoạt động này chưa được cung cấp; không tự điền browser/từng thao tác hoặc biến Q1 thành kiểm thiết bị thật |
| learnerReview | Chủ dự án xác nhận thử đọc bao phủ đủ phạm vi; nhóm mục tiêu theo xác nhận R1.1 | `at` và kết luận thực tế riêng chưa được cung cấp; không suy “đã thử đọc” thành “approved”, không đặt số người/nhận xét |

F0 `assertRecord` gọi `validDate(record.at)` bắt buộc ISO 8601 có giờ/offset; null, chuỗi rỗng hoặc “không cung cấp” không hợp lệ. Record phải `decision=approved`, có người xác nhận/by và proof khớp scope/hash. Không sửa F0 để chấp nhận thiếu dữ kiện. Thời điểm tạo hồ sơ/xác nhận R1.2 không được dùng thay thời gian diễn ra đánh giá. Thời gian Q1 cũng không thay thời gian kiểm của giáo viên hoặc người học.

**Chỉ còn dữ kiện thực sự chặn bước này:** thời gian thực có thể ràng buộc vào `at` cho ba nhóm review; kết luận thực tế readerQA và learnerReview để xác định có thể ghi `decision=approved` hay không. Nếu thời gian không thể cung cấp, guard hiện tại tiếp tục chặn. Không đòi thêm tên học sinh, số người, browser hay 29 buổi đánh giá riêng; không yêu cầu làm lại toàn bộ hoạt động. Không mở lại quyền xuất bản/assetRights đã xác nhận.

## Validation và số liệu production

[VALIDATION.json](VALIDATION.json) và verification ghi lệnh/kết quả thực chạy, digest/file list và bảo toàn record. 107 record cũ được đối chiếu đúng scope; 39 subject mới xác nhận được nối về hash R1.0, Q1 được tái dùng đúng giới hạn. Không có expertReview/readerQA/learnerReview chính thức mới, bundle mới hoặc publishedAt mới.

| Chỉ số | Hiện trạng |
|---|---|
| PublicView bài nguồn | 0/29 |
| SVG bài được emit trong artifact | 0/29; SVG favicon không phải SVG bài |
| Topic đủ toàn bộ proof F0/W1 | 0/10 |
| Topic đến lịch vào snapshot build hiện tại | 0/10; lịch mẫu bắt đầu 11/01/2027 |
| Topic public sau cả quyền và lịch | 0 |
| Record hợp lệ rời | 107, giữ nguyên byte |

Build 0 bài chỉ xác minh fail closed, không phải bản phát hành đủ 29 bài. Không dùng fixture/preview làm production; không chạy lại browser toàn Q1 khi không có thay đổi mã/nguồn hoặc artifact 29 bài để nghiệm thu. CI F0–W2/typecheck/build/scanner được xác minh tại head Draft PR và dẫn trong mô tả PR.

Khi đủ dữ kiện thật mới tạo ba loại record còn thiếu, dùng 29 assetRights và 39 publicationAuthorization hiện có, validate toàn bundle rồi mới gắn vào manifest/weekly và build 29 bài/29 SVG, chạy browser smoke cho Library/Reader/Flow/link/scanner. W1 vẫn giấu topic future trước startsAt, Library không khóa theo tuần. Không dùng đồng hồ tương lai để phát sớm.

Dừng tại Draft PR. Không merge, deploy, publish, tạo hosting hoặc đổi repository private.
