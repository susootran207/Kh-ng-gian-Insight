# Kiến trúc nội dung mở rộng — kiểm tra trên main 0c1f4399c0f995fe7d4395186f767918beb5289f

## Hiện có và tái sử dụng
- React/TypeScript/Vite trong prototype/; HashRouter giữ route bài /bai-viet/:slug và chuyên đề /chuyen-de/:slug.
- editorial/schema.ts dùng mảng Article/Topic, không giới hạn 24/29; mỗi Topic có articleSlugs nên một bài đã có thể xuất hiện trong nhiều chuyên đề.
- src/reading/Router.tsx có reader, breadcrumb, mục lục/focus, bài liên quan, thư viện.
- Tìm kiếm chuẩn hóa dấu và đ/Đ; q/chu-de/giai-doan trong URL; Back/Forward và trở về thư viện giữ trạng thái.
- build/editorial.ts lọc trước bundle, chỉ published; loại liên kết đến bài chưa published khỏi chuyên đề.
- scripts/check-publication.mts kiểm trạng thái/hồ sơ và rò nội dung trong dist; không source map.
- Nền tảng/Dòng chảy/Góc tâm tình hiện là section, không tự dựng trang mới ở 3.1.

## Quyết định 3.1
Không cần migration schema runtime. Giữ nguyên toàn bộ prototype/, catalogue và bộ kiểm tra xuất bản.
matrix.json chỉ phục vụ lập kế hoạch, không import, không sao chép vào public, không đưa vào virtual module.
29 là số mục hiện tại, không phải validation max hay giới hạn sản phẩm; kiểm tổng baseline riêng, bộ kiểm cấu trúc phải nhận mục mới.
ID KGNT-C01…C24 và KGNT-E01…E05 được dành ổn định, không đánh lại số theo vị trí hay xóa để tái sử dụng.
Slug giữ nguyên khi đổi tiêu đề. Bốn mẫu hiện có được ánh xạ dự kiến:
C03 dung-ve-phia-minh, C05 khi-mua-thi-den-gan, C09 o-giua-lop, C17 dem-dai-minh-chua-ngu.
Không kế thừa văn bản, nguồn hoặc trạng thái in_review của mẫu thành duyệt bài mới.
Slug khác mới ở trạng thái dành trong kế hoạch, chưa tạo URL công khai.
Related IDs/topic IDs trong docs là quan hệ dự kiến, không phải link xuất bản.

## Đề xuất cần duyệt trước thay đổi runtime
Ở đợt sau có thể thêm id/collection/topicIds, hồ sơ nguồn/hình/alignment theo revision.
Giữ slug cũ, adapter tương thích topic/season hiện tại, có kế hoạch đổi nhãn/filter và test trước migration.
Hiện article chỉ có một topic/season; nhiều nhãn hoặc nhiều giai đoạn cần đề xuất riêng thay vì đổi âm thầm.
Không thêm giới hạn cứng, không dùng số thứ tự mảng làm ID. Topic mới bổ sung dữ liệu, không hardcode route.
Cần giải quyết độc lập cách reader hiển thị inline citation, figure/alt/credit, nguồn APA, nhãn reviewer;
các việc này có thể ảnh hưởng UI/cổng xuất bản, chưa thực hiện và phải trình duyệt.
Nguồn/hình/duyệt theo revision ở docs chưa được runtime cưỡng chế. Cổng hiện tại không tự đánh giá độ đúng nguồn, quyền hình hay danh tính reviewer.
Trước nhập nội dung thật cần đề xuất nâng guard cho hồ sơ hợp lệ, trạng thái nguồn/hình và revision; duyệt xong mới triển khai, không bỏ guard cũ.
Liên kết homepage, related và chuyên đề sau này phải lấy từ tập published; không nối trực tiếp từ matrix.
Repository công khai: đề cương/nháp có thể đọc trong source; publication boundary không là bảo mật.

## Tăng trưởng
Mảng đã mở; không cần CMS/backend hoặc pagination chỉ vì có 29 mục. Đo hiệu năng thực tế trước tối ưu.
Bộ lọc phân biệt core/extension là đề xuất tương lai, không thêm control hoặc đổi hành vi tìm kiếm ở đây.
