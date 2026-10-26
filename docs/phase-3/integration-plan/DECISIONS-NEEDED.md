# Quyết định phát hành V1.0

Cập nhật 26/10/2026, Asia/Ho_Chi_Minh. Main `cbb88fd0b31b6745765b15c782857c07bdef2823`; PR #23/N1 đã merge lúc 18:05:24 +07:00. [Roadmap](IMPLEMENTATION-ROADMAP.md) · [P1 checklist](P1-PUBLICATION-CHECKLIST.md).

## Đã chốt — không hỏi lại

- **A — Full Library at Launch:** 29 bài đủ phê duyệt và đúng 29 hình có sẵn khi V1.0 ra mắt; được đọc bất kỳ bài qua Thư viện/search/filter/Dòng chảy/direct link. Weekly chỉ giới thiệu, không mở khóa và không xóa bài khi chuyển tuần.
- Nghiệm thu nội bộ 29 bản nháp khác 29 phê duyệt đầy đủ và 29 công khai. A không thay thế review chuyên môn, quyền tài sản hoặc bằng chứng xuất bản đúng revision/hash.
- Thiếu một bài/quyền hình/bằng chứng bắt buộc: **release BLOCKED**; không 28/29, placeholder, tóm tắt, tự gán license hoặc nới F0.
- Giữ D1/G1 và thiết kế Mây/tử đằng B/font/palette/artwork; không backend/login/trắc nghiệm/lưu tâm tình.
- F0/R1/C1/W1/N1 đã tích hợp; C1 là preview, W1 chưa có lịch thật. N1 đã merge, không cần chủ dự án merge lại #23.
- Lần này chỉ nhánh kế hoạch và Draft PR. Không triển khai D1/G1/P1/P2/W2/Q1, sửa dữ liệu/status/CI/UI hoặc merge/deploy/publish.

## Cần chủ dự án quyết định trước khi phát hành

| Mã | Quyết định còn mở | Bằng chứng/kết quả cần có | Hạn cần |
|---|---|---|---|
| V01 | Người chịu trách nhiệm chuyên môn, an toàn tâm lý và biên tập từng bài | Người thật/năng lực/phạm vi/giới hạn, cách xác minh và quyền hiển thị tên; đủ 5 review F0 theo từng revision/hash | Đóng P1 |
| V02 | Kế hoạch thử đọc, readerQA và assistive/thiết bị | Người/công cụ/tổ hợp browser–screen reader, bảo vệ dữ liệu người học, tiêu chí hiểu/khả dụng và xử lý blocker; không coi Axe là toàn bộ a11y | P1 và Q1 |
| V03 | Chủ quyền và điều kiện công bố từng SVG cùng tài sản dùng chung | Giấy phép/chấp thuận, credit, phạm vi web/repo, thời hạn/thu hồi; phương án proof tối thiểu công khai tương thích F0 mà không lộ hợp đồng/dữ liệu nhạy cảm | P1, kiểm lại Q1 |
| V04 | Bộ revision/hash cuối và người có thẩm quyền ký xuất bản | 29 phiếu READY, bằng chứng thật cho từng bài/hình, phạm vi và publishedAt hợp lệ; sửa nguồn chỉ khi có lỗi thực chất và được cấp riêng | P1 trước P2 |
| V05 | Phạm vi triển khai từng mốc | Cho phép riêng D1/G1/P1/P2/W2/Q1, PR review và nghiệm thu theo roadmap; quyết định A không phải lệnh triển khai tất cả | Trước mốc tương ứng |
| V06 | Lịch biên tập thật | Topic ID/slug/tên/lời dẫn/thứ tự bài từ library public, khoảng giờ +07:00, proof topic riêng; T01–T09/FEATURED không tự là lịch duyệt | W2 |
| V07 | Vận hành GitHub Pages và chuyển tuần | Chốt người rebuild/deploy thủ công, người thay thế, mốc chuyển/độ trễ chấp nhận, smoke test/rollback; nếu muốn cron phải cấp phạm vi thiết kế riêng | W2 trước release |
| V08 | Nghiệm thu release candidate và chỉ thị deploy/publish | SHA/artifact/QA/bằng chứng còn hiệu lực; ghi rõ giới hạn còn lại và quyết định xử lý; mọi blocker nguồn/quyền/29 bài bắt buộc phải đóng | Q1 rồi chỉ thị phát hành riêng |

Ngày phát hành cụ thể chưa chốt; không đặt deadline giả. Có thể chốt người/phạm vi khi cấp từng giai đoạn, không cần trả lời các mục này để tạo Draft PR kế hoạch.

## Giới hạn còn mở

Kỹ thuật: P2 public adapter chưa có; W1 legacy slug boundary cần nối nguồn public đúng proof; build-time selector không tự đổi trên GitHub Pages; rebuild/deploy có độ trễ, cần rollback và xử lý thu hồi quyền. Báo cáo Chromium cũ chưa xác minh native zoom/screen reader/Safari/Firefox/thiết bị thật; Q1 phải có bằng chứng mới đúng artifact.

Học thuật: chưa xác nhận toàn bộ nguồn/claim/cập nhật/đính chính và năng lực reviewer; chưa có thử đọc độc lập đủ phạm vi. Không dùng kết quả parser/fidelity để chứng minh tính đúng khoa học hoặc hiệu quả Bloom.

Bản quyền: quyền duyệt bản nháp không phải quyền công bố; 29 SVG và tài sản dùng chung phải có chứng cứ phù hợp. F0 kiểm toàn vẹn/nhất quán, không xác minh pháp lý. Repo GitHub công khai; guard bảo vệ website, không làm source đã công khai thành riêng tư.

## Điểm dừng

Chỉ Draft PR tài liệu. Không ghi tên/ngày/phê duyệt giả, không sửa quyền hoặc “tự đóng” quyết định còn mở. Chủ dự án nghiệm thu kế hoạch trước khi cấp giai đoạn tiếp theo.
