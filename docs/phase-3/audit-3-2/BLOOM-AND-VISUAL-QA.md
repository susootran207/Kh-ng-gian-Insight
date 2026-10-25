# Kiểm Bloom và hình — audit-r1

25/10/2026. Đọc bản văn/đáp án/hồ sơ trên main nền; kiểm thiết kế, không thử nghiệm học tập. Bằng chứng riêng ở BLOOM-REVIEW và VISUAL-REVIEW trong từng thư mục bài.

## Alignment thực chất

| Bài | Nhớ | Hiểu | Vận dụng và giới hạn kiểm |
|---|---|---|---|
| [C01](../drafts/C01/BLOOM-REVIEW.md) | Nhận diện lo/vui/buồn giữa hành vi, tín hiệu và dự đoán | Giải thích khác biệt các vùng ở An; phản ví dụ chạy cầu thang không dùng như giải thích y khoa | Mẫu bốn vùng sang Bình, dữ kiện thiếu lời kể cảm xúc; giữ chưa biết/có thể và câu hỏi mở. Có đổi tình huống; chưa đo chuyển giao thực tế |
| [C05](../drafts/C05/BLOOM-REVIEW.md) | Hai nguồn áp lực và người/việc hỗ trợ | Vì sao Minh–Hà cùng lịch thi nhưng kế hoạch khác, không kết luận chăm chỉ/năng lực | Dùng mẫu cho Minh khi trông em kéo dài; hành động cụ thể, nghỉ/ngủ, sửa hoặc nhờ. Là biến thể trong cùng case, không bài đo transfer độc lập |
| [C17](../drafts/C17/BLOOM-REVIEW.md) | Hai tuổi 12/14, đúng khoảng 9–12/8–10 giờ mỗi 24 giờ thường xuyên, yếu tố bối cảnh | Vì sao một đêm/điện thoại không đủ kết luận bệnh hoặc nguyên nhân duy nhất | Lan: biết/chưa biết → việc khả thi → hỗ trợ/điều chỉnh khi gia đình chưa đổi được. Chưa chứng minh khả năng dùng thủ tục ngoài tình huống này |
| [E05](../drafts/E05/BLOOM-REVIEW.md) | Nhận diện lời sở thích và lời khẳng định hiệu quả | Cần so cả hai phương thức mỗi nhóm, lợi thế đổi theo nhóm; tên thống kê không bắt buộc THCS | Hai nhiệm vụ Huy: mục tiêu, cách thử tiếp cận được, phản hồi, điều chỉnh. Ví dụ đã gợi hướng; chưa đo độc lập hoặc xác định năng lực/kiểu người đọc |

Mỗi bài có ba câu hỏi và ba phản hồi với lý do, có thể dùng lời khác có căn cứ. Không phiếu chấm sức khỏe hoặc dữ liệu riêng; cho phép bỏ qua. Bảng cho thấy cơ hội thực hiện Nhớ/Hiểu/Vận dụng, không kết luận “đạt Bloom” chỉ vì đếm đủ nhãn. Với C05/C17/E05, ràng buộc/nhiệm vụ được thêm vào tình huống đã học; nên thử đọc và cân nhắc bài chuyển giao nếu được phép sửa sau này.

## Hình: chức năng, mô hình và quyền

| Bài / asset | Cách đọc và nguồn | Revision/giới hạn |
|---|---|---|
| [C01 — experience-map](../drafts/C01/experience-map.svg) | Bối cảnh + bốn vùng ghi dữ kiện, nét đứt không đầu mũi tên; tham khảo Scherer nhưng không tái tạo mô hình năm thành phần | Hình sửa r2; cần người học phân biệt sơ đồ sư phạm với mô hình gốc |
| [C05 — study-plan](../drafts/C05/study-plan.svg) | Năm vùng kế hoạch, không mốc phút; nghiên cứu học/áp lực/ngủ là các căn cứ riêng, không bằng chứng hiệu quả cả phiếu | Asset/credit r1 vẫn được r2 dùng nguyên trạng có giải thích; không ép nhãn r2 giả |
| [C17 — sleep-context](../drafts/C17/sleep-context.svg) | Nhóm A bối cảnh, B thao tác, sáu khối; không cơ chế/dữ liệu Carskadon | Hình V2/r2, không nhịp sinh học đo cho Lan |
| [E05 — claim-to-practice](../drafts/E05/claim-to-practice.svg) | Bốn khối đọc lời khẳng định; logic tương tác được bổ sung bằng chữ/phần sâu, không đồ thị g | Hình V2/r2, không test hay phân loại VAK |

Cả bốn có caption, alt, mô tả bằng chữ và hồ sơ nguồn/quyền, tự biên soạn hình học/chữ, không ảnh/chân dung hoặc tài nguyên ngoài. Chủ dự án chưa chốt quyền công bố cuối; tính tự biên soạn không cho phép audit tự gán giấy phép hoặc cam kết độc quyền.

## Kiểm mới bằng mã và render

Lệnh tái kiểm cấu trúc trong checkout đầy đủ:

```sh
python3 docs/phase-3/audit-3-2/validate.py
```

Trong work đã chạy với `--root /workspace/work/audit32/baseline` và audit-dir mặc định là thư mục chứa script mới. Script chỉ đọc tệp; không cài gói, mạng, cập nhật trạng thái hoặc cấp quyền. Kiểm link của audit và 24 hồ sơ Markdown của bốn bài, ID/revision so ma trận, cặp dẫn–thư mục theo danh mục nguồn xác định, DOI/URL trong REFERENCES, ba câu hỏi/phản hồi, alt/caption/mô tả và XML SVG. Đếm/khớp chuỗi không là thẩm định APA toàn diện hay đọc nguồn, nên phần nhận định/giới hạn đã rà thủ công riêng.

Render đợt này dùng mẫu lệnh:

```sh
inkscape <asset.svg> --export-type=png --export-width=320 --export-filename=<work-preview.png>
inkscape <asset.svg> --export-type=png --export-width=640 --export-filename=<work-preview.png>
```

Đã chạy tám lệnh cho đúng bốn asset trên main, exit 0 và PNG được tạo; xem cả tám ảnh không thấy cắt chữ, thiếu khối hoặc mất dấu tiếng Việt. Có stderr cảnh báo môi trường; không coi warning là render thất bại. PNG chỉ ở work, không thêm vào repo hoặc website.

| Asset | ViewBox | Cỡ chữ quy đổi khi ảnh rộng 320px | Nhận xét mới |
|---|---|---|---|
| C01 | 640 × 1140 | 11–15px theo các text node | Không thấy cắt chữ; chữ chú thích nhỏ, cần reader/zoom và thử đọc |
| C05 | 640 × 1450 | 12–15px | Không thấy cắt chữ; dài/chữ nhỏ, không coi sắc nét vector là dễ đọc |
| C17 | 320 × 1270 | 14–21px | Hai nhóm phân biệt bằng tiêu đề/khung, không chỉ màu |
| E05 | 320 × 876 | 15–21px | Bốn khối, chữ khối bằng chứng ngắn, thông tin sâu ở bản văn |

Tính tương phản chữ mực #333e32 với các nền trong asset: mức thấp nhất 8,51:1, cao nhất 11,01:1. Đây là tính màu tĩnh, không kiểm nền reader, zoom, cỡ chữ thực tế trên thiết bị, tất cả đường viền hoặc chứng nhận WCAG. Kích thước trên là phép quy đổi từ SVG, không số đo DOM/browser.

## Chưa chạy
Chưa reader/browser/keyboard/focus/zoom/screen reader, thiết bị vật lý, Safari/Firefox, build/dist/hồi quy toàn website hoặc thử với học sinh/giáo viên. Các lần Chromium lỗi trong hồ sơ C01 là lịch sử, không phải lỗi chạy lại ở audit. Chưa reviewer chuyên môn độc lập. Phải ghi các kết quả này khi được phép tích hợp; không đổi trạng thái từ render riêng.
