# Quyết định cần chủ dự án chọn

Ngày 25/10/2026, Asia/Saigon. Draft PR này chỉ gồm [kiểm toán](CURRENT-STATE-AUDIT.md), [hợp đồng tích hợp](CONTENT-INTEGRATION.md), [roadmap](IMPLEMENTATION-ROADMAP.md), [QA](QA-PLAN.md) và tài liệu này. Chưa triển khai.

## Đã chốt, không hỏi lại

- 29/29 bản nháp được nghiệm thu nội bộ: bốn mẫu r2 và 25 bài B01–B05 r1. Chỉ sửa khi có lỗi thực chất.
- Giữ Mây, tử đằng B, palette, font, artwork, bố cục và chức năng tốt.
- Nghiệm thu bản nháp khác phê duyệt chuyên môn, nội dung cuối, quyền tài sản và quyền xuất bản.
- Không backend, đăng nhập, lưu tâm tình, trắc nghiệm hoặc đưa 29 bài vào production catalogue/published.
- PR #16 đã merge; main là 29510528e0cf465b8d709aed3190d9d5e8608de9.
- Chỉ cho phép Draft PR năm tài liệu; không tự merge, deploy, publish hoặc bắt đầu PR chức năng.

Các tài liệu nền và báo cáo lô có mô tả quyền/trạng thái lịch sử. Giữ nguyên chúng; chỉ thị hiện tại xác nhận nghiệm thu nội bộ, không tự mở quyền triển khai.

## Các lựa chọn cho bước sau

| Mã | Cần chọn | Khuyến nghị / tác động | Khi cần |
|---|---|---|---|
| D01 | Phạm vi đợt đầu | **F0 contract và guard** riêng; sau đó R1 Reader với fixture, C1 preview 29 bài. Có thể cấp cả ba trong một chỉ thị nhưng mỗi PR vẫn nghiệm thu riêng | Trước sửa code |
| D02 | Nguồn dữ liệu | Giữ ARTICLE là nguồn prose; manifest sinh và pin revision/hash. Title từ h1, metadata từ nguồn được chốt. Một season chính, nhiều topicIds; không migration đa giai đoạn đợt đầu | F0 |
| D03 | Preview | Entry/output riêng, chỉ loopback 127.0.0.1, banner/revision rõ. Nếu muốn xem từ xa cần chọn kênh/access riêng; URL ẩn/noindex không là quyền truy cập. Repo hiện công khai | F0/R1, trước C1 |
| D04 | Nền tảng và Dòng chảy | Thêm /nen-tang và /dong-chay bằng ReadingShell; giữ section và anchor cũ. Không đổi toàn bộ navigation hoặc composition | N1/D1 |
| D05 | Góc tâm tình | Giữ section /#tam-tinh, thêm quyền bỏ qua và hướng dẫn đúng thực tế; không thêm route/inbox. Chỉ sửa timer bookkeeping khi có kiểm cụ thể | G1 |
| D06 | Reader | GFM AST, không MDX/HTML thô; giữ APA, hoạt động/phản hồi, hình/alt/caption/mô tả. Xem hình lớn để giữ SVG nguồn. Dossier dùng cho provenance preview, không public raw dossier | F0/R1 |
| D07 | Chuyên đề tuần | Chủ dự án chọn tên/lời dẫn/thứ tự/lịch T01–T09. Lịch +07:00, start inclusive/end exclusive, fallback gần nhất hợp quyền. Khuyến nghị chọn ở build time; không tự rebuild/deploy. Khi chưa chọn dữ liệu, chỉ làm logic fixture/empty state | W1 |
| D08 | Môi trường và QA | Cài đúng lockfile, chạy lại build/browser khi kết nối hoạt động; bố trí người/công cụ screen reader và thiết bị iOS/Android/tablet trước tổng kiểm. Không giả nhân lực hoặc deadline | Mỗi PR/Q1 |

Đây là khuyến nghị để review, chưa phải quyền thực thi. Chủ dự án có thể chọn một gói phạm vi; không cần trả lời tám câu để hoàn tất Draft PR tài liệu. Chưa chọn lịch tuần không cản N1/G1 độc lập hoặc buộc viết lại bài.

## Những gate trước công bố vẫn riêng biệt

| Gate | Bằng chứng cần có | Hiện trạng |
|---|---|---|
| Chuyên môn độc lập | Người thật, năng lực phù hợp bài/risk/tuổi/công cụ; phạm vi, ngày, revision/hash, giới hạn và đồng ý hiển thị tên nếu có | Chưa ghi nhận reviewer thật cho 29 bài; không tự điền |
| Thử đọc | THCS–THPT trong điều kiện khác nhau; kiểm hiểu/khả dụng của hoạt động, không thu dữ liệu tâm lý vào repo công khai | Chưa thực hiện |
| Reader/assistive/thiết bị | QA đúng revision: không mất nội dung, bảng/hình/nguồn/focus/zoom/screen reader; sửa lỗi thực chất | Chưa có Reader 29 bài |
| Nguồn và cập nhật | Claim đúng phạm vi, ghi đúng nguồn trực tiếp/thứ cấp/Abstract; kiểm phiên bản/đính chính/rút bài sát công bố khi liên quan | Không nghiên cứu lại trong kiểm toán này; pending trong dossier giữ nguyên |
| Quyền tài sản | Quyền công bố, credit cuối cho từng SVG/tài nguyên/phông và bằng chứng đúng revision | Quyền review nháp không là giấy phép công bố; không tự gán CC |
| Duyệt nội dung cuối | Chủ dự án/chủ thể được chỉ định chọn đúng revision/hash sau sửa cần thiết | Nghiệm thu nội bộ không thay gate này |
| Quyền xuất bản | Chọn bài, revision, ngày, phạm vi, bằng chứng quyết định rõ | Chưa cấp; không published/catalogue production |
| Deploy/publish website | Chỉ thị thực hiện riêng với artifact và selection đã kiểm | Ngoài Draft PR và roadmap engineering này |

Không cần đợi chuyên môn xong mới tạo engineering preview được cấp quyền. Nhưng preview không thay gate công bố. Pending không tự là lý do rewrite bài.

## Nghiệm thu kế hoạch và điểm dừng

1. Chỉ thêm năm tệp đã yêu cầu dưới docs/phase-3/integration-plan/.
2. Base là main mới nêu trên; giữ nguyên toàn bộ 534 blob có sẵn, gồm 29 bài và mã ứng dụng/catalogue/schema/router/guard/package.
3. Phân biệt kiểm source, đã chạy, lịch sử và chưa xác minh; ghi rõ build bị chặn bởi môi trường.
4. Có đủ ID/slug/revision/link, contract, preview, phạm vi/phụ thuộc/tiêu chí mỗi PR và vùng thiết kế phải giữ.
5. Draft=true; không ready/merge/deploy/publish hoặc bắt đầu F0.

Bước tiếp theo khuyến nghị sau nghiệm thu: **“Cho phép F0 theo roadmap; dừng tại PR F0 để nghiệm thu.”** Đây là ví dụ chỉ thị để chủ dự án chọn, không phải quyền đã được cấp. Nếu chỉ duyệt tài liệu, vẫn dừng tại đây.
