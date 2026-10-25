# Bàn giao C01 — c01-draft-r1, 25/10/2026

## Phạm vi
PR #5 đã merge; main nền aeda83df1ec7f0e6d66fe0014e699c2dcf81d41f. Đọc PRODUCT/DESIGN/AGENTS, PLAN/MATRIX/STANDARDS/TEMPLATES, toàn bộ research/C01 và schema/build editorial.
Ủy quyền chỉ 3.2B-1/C01. Chỉ thêm bản nháp trong docs/phase-3/drafts/C01; không sửa hồ sơ đã duyệt, catalogue hay website.
Nhánh phase-3-2b-1-c01-draft. Không nội dung C05/C17/E05 hoặc 25 bài khác, không 3.2B-2.
Bản nháp draft, chưa approved/published; chưa có người rà soát chuyên môn. Không tạo approval metadata.

## Tệp bàn giao
[ARTICLE](ARTICLE.md); [REFERENCES](REFERENCES.md); [CLAIM-AUDIT](CLAIM-AUDIT.md);
[BLOOM-REVIEW](BLOOM-REVIEW.md); [VISUAL-REVIEW](VISUAL-REVIEW.md); [SVG](experience-map.svg); báo cáo này.

## Lựa chọn biên tập
- Giữ tình huống mở An và chuỗi đọc của đề cương, thêm mô tả hình, đáp án và phần tìm hiểu sâu cho THPT.
- Chuyển xu hướng “muốn tránh” thành hành vi có dữ kiện “đặt vở xuống/chưa vào tập”, giữ sự phân biệt ý định–hành vi ở phần sâu.
- Bốn vùng là cách tổ chức bài tập, không là bốn thành phần gốc, không chép Table 1.
- Không dùng S03 hoặc kết quả theo tuổi. Nguồn đã dùng: Scherer 2005, Nook 2021; thêm NIMH revised 2024 cho chỉ dẫn hỗ trợ.
- Câu hỏi Nhớ dùng lo/vui/buồn để bớt nhập nhằng; mong chờ vẫn trong lời An, không khẳng định bộ từ chuẩn hóa.
- Bình chưa có lời kể cảm xúc: đáp án chấp nhận “chưa biết”, không buộc suy ra từ cơ thể/hành vi.
- Hình xếp dọc bốn vùng để hỗ trợ đọc hẹp, mỗi vùng nối riêng cùng bối cảnh. Không ảnh ngoài hoặc phông nhúng; chưa quyết giấy phép công bố thay chủ dự án.

## Kiểm tra đã thực hiện
1. Đối chiếu lại các mục nguồn trực tiếp bằng web: S01 pp.697–699 và 706–707; S02 Carving the Subject Matter và giới hạn Introduction; NIMH các mục dấu hiệu/tìm hỗ trợ, revised2024/số xuất bản.
2. Tự rà câu chuyên môn và diễn giải sư phạm trong CLAIM-AUDIT; đối chiếu ba trích dẫn với ba mục APA cuối bài và REFERENCES; không trích nguyên văn học thuật.
3. Tự rà khái niệm, từ ngữ mơ hồ, nhãn bệnh/tính cách, dữ kiện giả định, lời hứa hiệu quả. Không tuyên bố gọi tên là điều trị hoặc chắc giảm triệu chứng. Không yêu cầu thông tin cá nhân.
4. Rà alignment thực chất bằng câu hỏi/đáp án; ghi khác biệt THCS/THPT. Đây là kiểm thiết kế, chưa kết quả học.
5. XML SVG hợp lệ và kiểm không script/foreignObject/tài nguyên nhúng ngoài; kiểm liên kết tài liệu.
6. Render Inkscape thành PNG ở 640px và 320px trong thư mục work, xem trực tiếp cả hai: chữ tiếng Việt và bốn vùng hiển thị, đường nối/caption hiện đủ, không thấy cắt chữ ở bản render. Không đưa PNG vào production/repo.
7. Đã thử Chromium qua Playwright, không khởi chạy được: crashpad setsockopt Operation not permitted/SIGTRAP. Vì vậy không báo PASS kiểm bounding/overflow bằng trình duyệt. ImageMagick thiếu delegate rsvg-convert; chuyển sang Inkscape render thành công (có warning Pango/GTK).
8. Đối chiếu tree GitHub trước commit để xác nhận chỉ thêm C01 và giữ nguyên toàn bộ tệp có sẵn.

Kiểm tra tự động cục bộ đã chạy: PASS 7 tệp bàn giao, XML/title/desc và không tài nguyên ngoài, link nội bộ, 3 cặp dẫn–thư mục, 3 câu hỏi, loại S03, nhãn draft. ARTICLE có 1.673 mục tách theo khoảng trắng, gồm đáp án và thư mục; đây không phải thước đo độ khó tiếng Việt.

## Chưa thực hiện / giới hạn
Chưa chuyên gia/giáo viên hoặc học sinh đọc thử; chưa kiểm độ đọc bằng mẫu người thật, Safari/Firefox, screen reader hoặc hiển thị trong reader.
Chưa chạy build/Playwright hồi quy website/Axe; không đổi runtime để phục vụ bản nháp.
Chưa có giấy phép xuất bản asset do chủ dự án quyết định; không cam kết độc quyền pháp lý.
Không biến tự kiểm tra nguồn thành duyệt chuyên môn. Dữ liệu nguồn công khai và bản nháp trong repository vẫn có thể đọc được, dù không vào website.

## Cần người dùng duyệt
1. Giọng văn/độ dài, từ “mong chờ” trong ví dụ và bộ thẻ cảm xúc.
2. Mức giản lược khung Scherer; giữ bảng bốn vùng và phần đọc sâu hay rút gọn.
3. Độ khó tình huống Bình, đáp án “chưa biết”, cách mời hỏi mà không ép chia sẻ.
4. Bố cục hình dọc, caption/alt/mô tả chữ và điều kiện sử dụng asset cuối.
5. Đoạn tìm hỗ trợ cùng nguồn NIMH; cách thích ứng Việt Nam nếu bổ sung dịch vụ.
6. Người và phạm vi rà soát chuyên môn thực tế; duyệt biên tập và xuất bản là quyết định riêng.

## Trước dùng làm bài mẫu chuẩn
Ưu tiên người dùng duyệt nội dung; rà soát chuyên môn về giản lược cảm xúc và lời mời tìm hỗ trợ;
giáo viên/người đọc mục tiêu xem độ dài/từ vựng; kiểm reader/alt ở giao diện khi có quyền tích hợp;
chốt quyền hình và version sau sửa rồi đối chiếu claim/citation lại. Chưa mở rộng sang bài khác.
Dừng sau PR, không merge/deploy/publish hoặc chuyển đợt.
