# P1C — Đường ngắn nhất để đủ F0 và chuyển sang P2

**Hiện chưa đủ điều kiện bắt đầu P2.** Nội dung đã được chủ dự án chấp thuận 29/29; các bằng chứng F0 còn thiếu nằm trong [ARTICLE-STATUS.md](ARTICLE-STATUS.md) và [F0-GAP-MAP.md](F0-GAP-MAP.md). Không tổ chức lại P1B.1 kiểm toán nguồn AI, không viết lại hàng loạt.

## Những xác nhận chủ dự án cần thực hiện

1. **Hoàn thiện phần biên tập đã quyết định:** cung cấp định danh công khai được phép dùng, cách truy xuất xác nhận, ngày xác nhận thực và phạm vi từng ID/hash của bảng 29 bài. Dùng lại quyết định P1C; không yêu cầu đọc/duyệt nháp lần nữa hoặc ký thành chuyên gia. Đây là đầu vào cho record editorialApproval, chưa phải quyền publication.
2. **Bố trí người có trách nhiệm cho phần còn thiếu:** người có năng lực chuyên môn phù hợp, người phụ trách readerQA/tiếp cận, người tổ chức thử đọc và người xác minh quyền 29 SVG. Chủ dự án có thể đảm nhiệm vai thực sự đủ năng lực/thẩm quyền và đã thực hiện; không tự gán vai bằng một câu xác nhận chung. Không cần 174 người hoặc 174 cuộc họp.
3. **Dùng báo cáo có sẵn, chỉ bổ sung phần chưa có:** giao 29 phiếu P1A và 13 ghi nhận có vị trí cho người chuyên môn; tái sử dụng log C1/R1 còn đúng revision/phần mềm, bổ sung kiểm người thật, zoom, screen reader, thiết bị và quyền chưa xác minh. Người duyệt có thể chấp nhận nguồn thứ cấp/abstract trong đúng phạm vi với căn cứ; không đòi toàn văn nguồn đã loại hoặc thêm nguồn để đủ số. Không gọi AI review là chuyên môn độc lập.
4. **Cung cấp quyền hình thật và chốt credit:** xác nhận theo mẫu E nếu có căn cứ/thẩm quyền, hoặc giao người phù hợp kiểm nguồn gốc/điều kiện quyền. Không tạo hợp đồng/giấy phép bên thứ ba giả cho hình tự tạo; điều chưa xác minh giữ UNVERIFIED. Không đưa tài liệu riêng tư vào repo công khai.
5. **Khi đủ bằng chứng:** người có thẩm quyền xác minh các kết luận và ra publicationAuthorization riêng theo từng ID/hash/phạm vi. Sau đó cấp chỉ thị riêng cho việc tạo/cập nhật record F0 thật và kiểm gate; P1C không thực hiện bước này. Chỉ khi đủ 29/29 bài + 29/29 quyền SVG và P1 được nghiệm thu mới cho phép mở PR P2.

Các mẫu A–F trong [EVIDENCE-FORMS.md](EVIDENCE-FORMS.md) để trống người/ngày/kết quả. Có thể thu báo cáo theo nhóm, dùng một phụ lục 29 dòng với từng kết luận/hash, rồi xuất các record/proof đúng loại bằng công cụ trong phạm vi được cho phép sau này. Không cần nhập lại nội dung ARTICLE hoặc sao chép thành catalogue.

## Điều kiện vào P2 có thể kiểm chứng

| Hạng mục | Cần thấy để đóng | P1C hiện tại |
|---|---|---|
| Bản nguồn cố định | 29 ID/slug, bốn r2/25 r1, full contentHash/revisionHash và 29 SVG hash đúng; hồ sơ phụ thuộc giữ đúng | Đã đối chiếu main/P1A; dữ liệu không đổi |
| Editorial | Ý định chấp thuận thật + đúng người/ngày/scope/proof F0 từng bài | Quyết định đã ghi nhận; record/proof còn thiếu |
| Chuyên môn/an toàn | Reviewer thật phù hợp, nguồn/giới hạn/issue bắt buộc được xử lý, bằng chứng đúng hash | BLOCKED |
| ReaderQA/thử đọc | Bằng chứng thực theo P1 checklist, xử lý giới hạn A11Y/learner và xác nhận đúng bản | BLOCKED |
| Quyền hình | 29 assetRights đúng assetId/revision/SVG hash/article revisionHash, credit/phạm vi thật | BLOCKED |
| Quyền công bố | 29 publicationAuthorization thật; không suy từ chấp thuận nội dung; các proof/người được xác minh | BLOCKED |
| Kiểm F0 trước P2 | Record/proof scope/hash/date hợp lệ; 29 bundle đủ gate, quyền còn hiệu lực; ca âm vẫn chặn | Chưa có bundle để kiểm positive thật; F0 ca âm giữ nguyên |
| Chỉ thị bắt đầu P2 | Chủ dự án nghiệm thu P1 và cấp phạm vi PR tích hợp riêng | Chưa được cấp trong P1C |

Bằng chứng thiếu hoặc chưa đủ không được đổi thành approved để thử adapter. Không đổi status published chỉ để thấy 29 eligible. Trong đợt ghi record thật được phép, người thực hiện phải xét thứ tự/điều kiện status theo contract và chỉ thị được cấp. P1C không tạo grant dùng tạm hoặc bypass cho P2.

## Phạm vi P2 dự kiến — chỉ bàn giao, chưa triển khai

Khi đủ điều kiện và có chỉ thị riêng: tái sử dụng F0 PublicView → compiler GFM/source map C1/R1 → Reader/cards/assets đủ quyền; xử lý bốn slug legacy C03/C05/C09/C17 bằng một nguồn ARTICLE. Toàn Library/search/filter/related/Dòng chảy dùng cùng tập 29 public; weekly chỉ chọn nổi bật, không giới hạn quyền đọc. Không import entry/endpoint/dossier/fixture preview vào production. Kiểm 29 AST/DOM/SVG, direct/query/history/return và scanner âm/dương trước nghiệm thu PR P2.

Không đổi roadmap/checklist/guard hiện hành. Bằng chứng chung có thể tái sử dụng khi hợp phạm vi; “máy test xanh” không chứng minh thử học sinh hoặc quyền pháp lý. Chỉ sửa bài/hồ sơ khi có lỗi thực chất và chỉ thị riêng; khi byte/hash đổi phải rà phần phụ thuộc, không tự kế thừa giấy duyệt cũ.

**P1C dừng tại Draft PR.** Không P2/W2/Q1, không merge/deploy/publish.
