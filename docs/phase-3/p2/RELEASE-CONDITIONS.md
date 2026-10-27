# Điều kiện còn thiếu trước phát hành công khai

P2 hoàn thiện kỹ thuật theo chỉ thị mới của chủ dự án. **Chấp thuận nội dung 29/29 đã có**, không mở lại P1B.1 hoặc đề nghị duyệt lại nội dung bằng AI. Việc còn thiếu là bằng chứng đúng loại/đúng phạm vi và nghiệm thu phát hành; không được suy chúng từ sự tồn tại của mã, ảnh hay test.

Áp dụng cho từng C01–C24/E01–E05, cùng revision/contentHash/revisionHash/SVG trong [coverage](CONTENT-COVERAGE.json), [inventory P1C](../p1c/INVENTORY.json) và [bảng 29 bài P1C](../p1c/ARTICLE-STATUS.md). Bốn r2 C01/C05/C17/E05, 25 r1; không thay byte nguồn.

| Điều kiện F0 | Hiện trạng / đường hoàn thiện hợp lệ | Người chịu trách nhiệm |
| --- | --- | --- |
| editorialApproval | Quyết định nội dung chủ dự án đã được ghi nhận. Record/proof ràng buộc từng ID/hash còn thiếu; dùng quyết định thật làm căn cứ, xác nhận định danh công khai và thời điểm thật, không lấy ngày lập tài liệu làm ngày ký | Chủ dự án hoặc người được ủy quyền hợp lệ |
| expertReview | Chưa có record/proof thẩm định đúng phạm vi. P1A và review AI không thay người có năng lực; không yêu cầu thêm đợt AI | Người duyệt chuyên môn thực hiện và chịu trách nhiệm thật |
| readerQA | P2 có bằng chứng kỹ thuật mới để tham khảo. Không tự chuyển thành record approved, không giả native zoom/screen reader hoặc thử nghiệm chưa diễn ra | Người chịu trách nhiệm QA xác nhận đúng phạm vi và giải quyết ngoại lệ |
| learnerReview | Chưa có hoạt động/bằng chứng thử đọc hợp lệ; không suy từ Playwright hay phản hồi của chủ dự án | Người tổ chức thử đọc/người tham gia theo quy trình phù hợp, bảo vệ thông tin người học |
| assetRights | 29 SVG còn rights=null; cần xác định nguồn gốc/chủ quyền/điều kiện sử dụng và chứng cứ theo từng hash. Phi thương mại không miễn bản quyền | Chủ quyền/người có thẩm quyền cấp phép và người xác minh quyền |
| publicationAuthorization | Chấp thuận nội dung và yêu cầu viết mã P2 không tự cấp lệnh công bố. Còn record/proof cho xuất bản đúng bản cuối | Chủ dự án/người có thẩm quyền công bố |

Dùng [mẫu P1C](../p1c/EVIDENCE-FORMS.md) và [F0 contract](../integration-plan/F0-CONTRACT.md). Proof phải có hoạt động thật, by/at/decision đúng, evidence file/hash khớp từng phạm vi; không commit thông tin cá nhân/hợp đồng riêng tư. F0 chỉ kiểm tính toàn vẹn/nhất quán, không chứng thực danh tính hoặc giấy phép. Không tạo bundle giả, không đổi status/publishedAt trong P2.

Đường ngắn tiếp theo: tái sử dụng quyết định nội dung và toàn bộ hồ sơ/QA đã có; người chịu trách nhiệm chỉ bổ sung/chốt bằng chứng còn thiếu đúng loại, không viết lại hàng loạt. Khi được cấp phạm vi riêng để ghi các record thật, chạy lại F0/manifest/build/scanner và kiểm đủ29/29 qua adapter này; không sửa tay Thư viện/Dòng chảy hoặc tạo bộ JSON prose. Chuyên đề chọn từ tập đầy đủ này, không cấp quyền và không che bài ở tuần khác.

Ngoài F0 từng bài, còn nghiệm thu Q1/release theo chỉ thị riêng, các quyền thư viện/font/artwork và credit ở phạm vi thực tế, native zoom 200%, screen reader/trình duyệt/thiết bị chưa kiểm, lựa chọn hosting/truy cập/thông tin chủ dự án/thông báo quyền phù hợp. Xem [kế hoạch bảo vệ sản phẩm P1C](../p1c/PRODUCT-PROTECTION.md) và [checklist trước phát hành](../p1c/PRE-RELEASE-CHECKLIST.md). Không chọn hosting hoặc đổi visibility thay chủ dự án.

**Public hiện tại: 0 bài. Release V1.0 phương án A: BLOCKED cho tới đủ 29/29 và các gate thật.** Đây không phải yêu cầu chủ dự án phê duyệt lại chất lượng nội dung. P2 dừng tại Draft PR, không tự bắt đầu W2/Q1 hay deploy/publish.
