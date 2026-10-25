# C17 — Bàn giao c17-draft-r1

Ngày 25/10/2026. Nhánh `phase-3-2b-3-c17-draft`; chỉ 3.2B-3/KGNT-C17, slug dành sẵn `dem-dai-minh-chua-ngu`.

## Căn cứ và giới hạn ủy quyền
PR #7 đã merge vào main lúc 05:17:26 UTC, 25/10/2026. Main được đọc tại `61a43c9d66e15a2e6deda82938d1590f36ca0faa`, chính là merge commit PR #7. Người dùng nghiệm thu C01-r2/C05-r2 làm tham khảo quy trình, không xác nhận chuyên môn/xuất bản.
Đã đọc PRODUCT/DESIGN/AGENTS; PLAN/MATRIX/STANDARDS/TEMPLATES; toàn bộ research/C17; C01-r2/C05-r2 và hồ sơ nguồn/claim/Bloom/hình/biên tập. Các giới hạn lịch sử trong tài liệu nền được hiểu theo ủy quyền mới chỉ cho C17; không sửa lại các quyết định/tài liệu đã có.
Chỉ thêm bảy tệp trong `docs/phase-3/drafts/C17/`; không sửa research/nguồn đã duyệt, C01/C05/E05 hoặc mã ứng dụng.

## Tệp và trạng thái
[ARTICLE](ARTICLE.md), [REFERENCES](REFERENCES.md), [CLAIM-AUDIT](CLAIM-AUDIT.md), [BLOOM-REVIEW](BLOOM-REVIEW.md), [VISUAL-REVIEW](VISUAL-REVIEW.md), [sleep-context.svg](sleep-context.svg), báo cáo này.
Bản nháp để duyệt, chưa approved/expert_reviewed/published; không tạo người duyệt hoặc hồ sơ phê duyệt giả. Bản nháp trong repository công khai có thể đọc được, chưa tích hợp vào website.

## Quyết định nội dung
- Lan 14 tuổi, phụ dọn hàng, học trong phòng dùng chung, xem tin nhắn rồi khó vào giấc và phải dậy sớm. Ghi rõ giả định, không xác định một nguyên nhân từ tình huống.
- Giải thích nhu cầu theo tuổi trước thuật ngữ; giữ hai nhóm AASM, thường xuyên mỗi 24 giờ, không áp cho 19+. Không dùng khoảng giờ để trách nỗ lực hoặc chẩn đoán.
- Cơ chế chỉ ở mức khái niệm chung từ NHLBI: nhịp sinh học khác áp lực ngủ, có tương tác; xu hướng tuổi thiếu niên không là đo cá nhân.
- Không chi tiết nội tiết, nguồn gốc mô hình, đường cong hoặc thí nghiệm phát triển chưa kiểm. Không biến một đêm thành chẩn đoán hay phủ nhận nhu cầu trợ giúp.
- Bảng dùng cho Hiểu; hình giúp hình dung; một dòng ví dụ chỉ hướng bước 1; phiếu ba bước và câu 3 phục vụ Vận dụng; phản hồi tiêu chí, không chép phiếu mẫu.
- Không yêu cầu lịch/nhật ký hay sức khỏe thật. Có quyền bỏ qua, nhiều lựa chọn phù hợp. Không giả định phòng riêng, lịch tự chủ, người thay việc ngay hoặc tham vấn viên ở mọi trường.
- Không thuốc, melatonin, liệu pháp ánh sáng, ngưỡng tự sàng lọc hoặc cam kết chữa mất ngủ. Không gọi phiếu là CBT/công cụ điều trị.

## Kết quả xử lý Carskadon (2011)
**Chưa truy cập được thân bài để gỡ pending.** Đã tìm PubMed/PMC, PDF UVM, kho Adelaide và Europe PMC. PMC captcha; UVM timeout/không truy cập; Adelaide mở không có nội dung đọc được; Europe PMC 403. Có metadata và trích đoạn tìm kiếm, không có mục/trang cơ chế đã đọc. Không báo đã đọc toàn văn.
Chi tiết đường tìm, quyền truy cập và phần loại ở [REFERENCES](REFERENCES.md). Không sử dụng S07 trong bài hoặc thư mục nguồn thực dùng. Bổ sung trang NHLBI “What makes you sleep?” cho khái niệm nhập môn; đây là nguồn hướng dẫn có phạm vi hẹp, không tổng quan tương đương hoặc xác minh gián tiếp Carskadon. Bỏ phần phát triển cơ chế chi tiết và sơ đồ sinh học.

## Kiểm tra thực tế
- Nguồn: mở và đọc lại PDF AASM tr. 785–786; NHLBI Healthy Sleep Habits, What Is Insomnia?, Diagnosis và What Makes You Sleep? theo các mục ở REFERENCES. Bốn nguồn thực dùng, một nguồn đọc nền không đưa vào thư mục ARTICLE, S07 vẫn pending.
- Đối chiếu Q1–Q6 với vị trí nguồn; tách P1/P2 là biên tập. Không coi link sống hoặc kiểm chuỗi ký tự là xác minh khoa học; không tuyên bố kiểm mọi nghiên cứu nền hoặc toàn bộ cập nhật lĩnh vực.
- Kiểm cấu trúc tài liệu tự động PASS: đủ bảy tệp, liên kết nội bộ, ba cặp hậu tố NHLBI và Paruthi giữa citation–references; ba câu hỏi/ba phản hồi; hai nhóm tuổi/đơn vị; nhãn c17-draft-r1.
- Rà Bloom bằng nhiệm vụ và tiêu chí, gồm nhân vật 12/14 tuổi, giải thích giới hạn và thực hiện mẫu có ràng buộc. Chỉ alignment, chưa chứng minh kết quả học.
- SVG XML/title/desc; không script, foreignObject, image, tài nguyên ngoài, mũi tên hoặc marker. Alt/caption/mô tả chữ đối chiếu với ARTICLE. Sáu khối gồm ba bối cảnh và ba bước, không sáu thành phần sinh học.
- Inkscape render mới 320px và 640px, xem cả hai: chữ Việt, sáu vùng và footer hiện đủ, không thấy cắt chữ. Có warning Pango/GTK/font cache/profile read-only, lệnh vẫn xuất PNG thành công. PNG kiểm tra giữ ở thư mục work, không đưa vào repo hoặc website.
- Tính tương phản tĩnh chữ #333e32 trên nền kem/giấy/sage/tím; tỷ lệ lần lượt 10,10:1 / 11,01:1 / 8,51:1 / 8,84:1 (kiểm từ mã màu). Không coi đây là chứng nhận accessibility.
- Kiểm danh sách bàn giao chỉ có bảy tệp C17; đối chiếu tree GitHub trước commit/PR để xác nhận mọi tệp cũ giữ SHA. Kết quả đối chiếu cuối được ghi tại PR, không coi kiểm thư mục cục bộ là bằng chứng Git.

## Chưa thực hiện và điểm cần duyệt
Chưa có reviewer chuyên môn thực tế, người đọc THCS/THPT hoặc giáo viên thử hoạt động; chưa kiểm screen reader, reader tích hợp, thiết bị vật lý, Safari/Firefox. Không chạy runtime/build/Playwright/Axe toàn website vì không thay mã ứng dụng; không tuyên bố đã kiểm giao diện đọc trên mobile từ riêng SVG.
Nguồn NHLBI công chúng chưa thay thế thẩm định nhi khoa; giải thích cơ chế, đoạn tìm hỗ trợ và mức phù hợp tuổi còn cần rà soát chuyên môn. Chưa chốt giấy phép công bố asset hoặc xác minh dịch vụ địa phương; bài không đưa thông tin dịch vụ ấy.
Cần người dùng duyệt giọng văn/độ dài, tình huống phòng chung–việc nhà, mức thu hẹp khi thiếu Carskadon, bảng tuổi, hoạt động/đáp án mở và hình. Nghiệm thu bản nháp, rà soát chuyên môn và quyền xuất bản là các quyết định riêng.

## Điểm dừng
Tạo PR C17 riêng vào main để xem xét; không merge. Không C17-r2 tự động, E05/bài khác, schema/catalogue/router/publication guard, tích hợp website, deploy/publish hoặc 3.2B-4. Dừng sau bàn giao chờ người dùng duyệt.
