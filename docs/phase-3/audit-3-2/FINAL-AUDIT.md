# Tổng kiểm tra 3.2 — hồ sơ trình duyệt, audit-r1

Ngày 25/10/2026. Main nền: `0486a4686d708364bbbeb1352d9dfbed33521f7a`, đúng merge commit [PR #9](https://github.com/susootran207/Kho-ng-gian-Insight/pull/9). Nhánh bàn giao `phase-3-2-final-audit`. Chỉ tài liệu audit; không sửa bốn bài, nghiên cứu 3.2A, PRODUCT/DESIGN/STANDARDS hoặc ứng dụng.

## Kết luận trình người dùng

Bốn bản nháp r2 đã có đủ bản văn, hồ sơ nguồn, đối chiếu nhận định, Bloom, hồ sơ hình và lịch sử biên tập để xem xét quy trình. Có thể dùng chúng làm **ví dụ tham khảo có giới hạn**, không bằng chứng rằng mọi bài đã chính xác chuyên môn, học sinh đạt mục tiêu hoặc sẵn sàng xuất bản. Chưa đóng chính thức 3.2, chưa cho phép 3.3.

| Phạm vi kiểm | Kết quả ở cấp hồ sơ/bản văn | Giới hạn còn mở |
|---|---|---|
| Học thuật | Luận điểm chính có claim map, tác giả–năm và thư mục; tách nguồn với ví dụ tự biên soạn; không lấy hiệu quả nghiên cứu chứng minh phiếu | Đợt audit không mở lại từng tài liệu ngoài hoặc kiểm đính chính toàn lĩnh vực; không rà soát chuyên môn độc lập |
| Sư phạm | Tình huống giả định, lời thường trước thuật ngữ khi phù hợp, phản ví dụ và phần sâu tùy chọn | Chưa thử đọc THCS/THPT; mức đọc và tính khả thi chưa được xác nhận bởi người học |
| Bloom | Mỗi bài ba câu hỏi/ba phản hồi; nhận diện, giải thích và dùng mẫu có điều kiện | Kiểm alignment, chưa đo học tập/chuyển giao; ba bài dùng tiếp tình huống chính, không phải mọi Apply đều là tình huống hoàn toàn mới |
| Hình | Có chức năng học, caption/alt/mô tả, hồ sơ quyền; không đường nhân quả giả hoặc đồ thị dữ liệu bịa | Giấy phép công bố SVG chưa chốt; render riêng không chứng minh reader/screen reader đạt |
| An toàn/quyền riêng tư | Không yêu cầu thông tin riêng/test tâm lý; không chẩn đoán/điều trị; tôn trọng hoàn cảnh, tiếp cận và quyền tìm người khác | Chưa kiểm hành vi UI tích hợp mới; không xác minh thêm dịch vụ địa phương |

“Có” trong bảng là quan sát của trợ lý qua đọc/đối chiếu tài liệu, không reviewer chuyên môn ký duyệt. Không phát hiện mâu thuẫn mới buộc tự sửa bản nháp trong phạm vi này; các khoảng trống được giữ để người dùng quyết định.

## Kết quả kiểm tra mới của đợt audit

- Kiểm bằng mã (PASS_structural_only): 119 liên kết nội bộ, 23 tệp runtime dạng chữ được quét marker/đoạn mở đầu; đủ bốn ID/revision r2 và bộ hồ sơ; liên kết nội bộ; cặp trích dẫn–thư mục theo danh mục xác định; URL/DOI nhất quán giữa hồ sơ, không xác nhận khả dụng HTTP; ba câu hỏi/ba phản hồi; SVG XML, alt/caption/mô tả và không script/tài nguyên ngoài.
- Tổng thư mục thực dùng: **15 lượt theo bài, 12 URL nguồn duy nhất** (C01: 3; ba bài còn lại: 4 mỗi bài). Không cộng nguồn pending/đọc thêm hoặc nguồn Bloom dùng chung thành nguồn thực dùng.
- Render mới cả bốn SVG ở 320px và 640px, tám lệnh Inkscape thành công; đã xem cả tám ảnh, không thấy cắt chữ. Có stderr cảnh báo ở các lệnh render; không đổi asset. C01/C05 có chữ nhỏ hơn C17/E05 khi thu hẹp, cần kiểm độ đọc thật trước xuất bản.
- Đọc tĩnh catalogue, schema, bộ lọc build và các nguồn runtime liên quan; kiểm marker/đoạn văn đặc trưng không được chép từ r2 vào catalogue/runtime đã đọc. Catalogue có bốn bài `draft/in_review`, một topic `draft`, không có mục published. C05/C17 có slug trùng mẫu cũ là ánh xạ dự kiến, không tự là rò bản r2.
- Không chạy build/dist, browser, reader, screen reader, hồi quy giao diện hoặc thử với học sinh. Không báo đã kiểm production bundle/website triển khai. Phân biệt rõ với lịch sử kiểm tra ở từng bài.

[validate.py](validate.py) là kiểm cấu trúc chỉ đọc, không mạng/phê duyệt; cách chạy và giới hạn ở [BLOOM-AND-VISUAL-QA](BLOOM-AND-VISUAL-QA.md). Đối chiếu tree trước commit/PR xác nhận chỉ thêm audit; kết quả cuối ghi trong PR.

## Hồ sơ đọc và đối chiếu

[PRODUCT](../../../PRODUCT.md), [DESIGN](../../../DESIGN.md), [AGENTS](../../../AGENTS.md); [PLAN](../PLAN.md), [STANDARDS](../STANDARDS.md), [TEMPLATES](../TEMPLATES.md), [MATRIX](../MATRIX.md), [ARCHITECTURE](../ARCHITECTURE.md); bốn thư mục drafts đầy đủ; hồ sơ nghiên cứu C01/C05/C17/E05, [METHOD](../research/METHOD.md), [COMPARISON](../research/COMPARISON.md), [REVIEW](../research/REVIEW.md), sources.json. Tài liệu 3.1/3.2A và phần r1 là lịch sử, không tự nâng trạng thái do bản nháp mới đã tồn tại.

## Các quyết định còn chờ

Người dùng xem xét bộ chuẩn tham khảo, xác nhận mức nghiệm thu E05-r2, các gate và thứ tự công việc. C01/C05/C17 đã có lời nghiệm thu định hướng theo revision trong hội thoại; không suy tương tự từ merge E05. Cả bốn chưa có duyệt nội dung cuối/chuyên môn/quyền xuất bản được ghi nhận. Xem ma trận chín trục tại [FOUR-ARTICLE-COMPARISON](FOUR-ARTICLE-COMPARISON.md).

[EVIDENCE-AND-OPEN-ISSUES](EVIDENCE-AND-OPEN-ISSUES.md) phân loại pending; [READINESS-GATES](READINESS-GATES.md) tách trước tích hợp và trước xuất bản; [EDITORIAL-PLAYBOOK](EDITORIAL-PLAYBOOK.md) là đề xuất bổ trợ, chưa thay STANDARDS; [NEXT-PHASE-RECOMMENDATIONS](NEXT-PHASE-RECOMMENDATIONS.md) chỉ đề xuất 3.3 đúng PLAN. Dừng tại PR audit chờ phê duyệt.
