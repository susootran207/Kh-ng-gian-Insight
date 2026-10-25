# C17 — Hình V2, c17-draft-r2

- Asset: [sleep-context.svg](sleep-context.svg), chỉ trong thư mục bản nháp, không vào catalogue/public.
- Mục tiêu: hỗ trợ Hiểu (nhìn bối cảnh, không quy nguyên nhân) và Vận dụng (dùng mẫu ba bước). Không thay bảng tuổi/phiếu chữ trong ARTICLE.
- Nội dung: ba khối bối cảnh (nhu cầu theo tuổi; lịch học/việc nhà; môi trường dùng chung), ba khối thao tác (dữ kiện/chưa biết; thay đổi khả thi; hỗ trợ/điều chỉnh). Nhóm thao tác đánh số chỉ để hướng dẫn bài tập, không trình tự sinh học. Không đường nối/mũi tên, đồng hồ, thang điểm hoặc số liệu giả.
- Nguồn khoa học: S06, “Consensus Recommendations” và “Discussion”; S09, danh sách thói quen; C17-S11, đánh giá/hỗ trợ. Vị trí và mức truy cập ở [REFERENCES](REFERENCES.md). Không dùng S07 đang pending hoặc hình/mô hình từ nguồn đó.
- Nguồn hình/tác giả: trợ lý biên soạn SVG hình học và chữ mới cho tác vụ C17; không ảnh có sẵn, chân dung, ảnh AI hoặc sơ đồ sao chép. Không URL nguồn hình ngoài vì không dùng hình bên thứ ba.
- Thành phần: màu giấy/kem, xanh mực, sage và tím nhạt theo DESIGN; font hệ thống và fallback, không nhúng/tải font, ảnh/icon ngoài. Không đổi mỹ thuật website.
- Giấy phép/điều kiện sử dụng: chưa gán giấy phép công bố thay chủ dự án, không cam kết quyền độc quyền. Không có giấy phép ảnh bên thứ ba cần giả lập. Chủ dự án quyết định quyền sử dụng cuối trước xuất bản.
- Caption/credit: “Sơ đồ học tập tự biên soạn; tham khảo Paruthi và cộng sự (2016), NHLBI (2022a, 2022b). Không phải sơ đồ cơ chế sinh học, thang sàng lọc hay phác đồ điều trị.”
- Alt: “Sơ đồ gồm nhóm A về bối cảnh ngủ của Lan: nhu cầu ngủ theo tuổi, lịch học và việc nhà, môi trường ngủ dùng chung; nhóm B về bài tập: tách dữ kiện với điều chưa biết, chọn thay đổi khả thi, xác định hỗ trợ hoặc điều chỉnh.”
- Mô tả chữ tương đương: có ngay dưới hình trong ARTICLE; nêu cả hai phần và không có quan hệ nhân quả. Không chỉ phân biệt bằng màu; mỗi vùng có nhãn.
- Bản thiết kế thay đổi từ 3.2A: bỏ dải ngày–đêm và thẻ sinh học chưa đủ nguồn; dùng bối cảnh và thủ tục định tính có căn cứ. Không sơ đồ hai quá trình hoặc đo cá nhân.

## Tình trạng xác minh
Nội dung nhãn đã tự đối chiếu với bản văn và claim; quyền công bố cuối pending, chưa chuyên gia duyệt. Kết quả XML, tương phản và render thực tế được ghi trong [EDITORIAL-REVIEW](EDITORIAL-REVIEW.md), không đánh dấu toàn asset verified trước kiểm tra.
Chưa tích hợp reader, screen reader hoặc thiết bị vật lý. Nếu cỡ chữ hình không phù hợp khi tích hợp sau này, giữ bảng/mẫu chữ làm phương án tương đương và chỉnh hình theo phê duyệt riêng.

## Chỉnh hình r2
Giữ sáu khối, chia vào hai nhóm có khung và tiêu đề riêng: A — Nhìn trong bối cảnh; B — Làm trong bài tập. Khoảng trống 44 đơn vị SVG giữa hai khung; nhãn A/B và tiêu đề vẫn giúp phân biệt khi bỏ màu. Nền sage thống nhất cho ba khối bối cảnh, nền tím cho ba bước; cải thiện chính là nhóm/tiêu đề/khoảng trắng, không chỉ đổi màu.
Nhóm A ghi nhu cầu ngủ theo tuổi, lịch học/việc nhà và môi trường ngủ chung. Nhóm B nêu tách dữ kiện, chọn thay đổi, hỗ trợ/điều chỉnh; lời trong mỗi khối giải thích điều chưa biết, điều kiện và phương án khi chưa làm được. Không thêm cơ chế, số liệu hoặc tài nguyên hình bên thứ ba.
ViewBox 320 × 1270; chữ nội dung 16, tiêu đề thẻ 17, nhãn nhóm 14 và tiêu đề nhóm 21 đơn vị. Bản r1 320 × 1040 giữ trong Git. Có g/title/desc và nhãn truy cập cho hai nhóm; chưa kiểm hiệu quả các nhãn này bằng screen reader.
Đồng bộ alt/desc/mô tả chữ với bố cục mới; caption và nguồn khoa học giữ nguyên vì không đổi phạm vi. Kết quả render và tương phản r2 nằm trong EDITORIAL-REVIEW; giấy phép công bố cuối vẫn pending.
