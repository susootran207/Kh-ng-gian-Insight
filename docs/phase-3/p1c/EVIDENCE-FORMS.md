# P1C — Mẫu thu thập bằng chứng còn thiếu

**Mẫu trống, chưa có phê duyệt F0.** Sao chép phần phù hợp cho từng ID/hash trong [INVENTORY.json](INVENTORY.json). Không có tên, chữ ký, ngày review, giấy phép hoặc kết quả thử nghiệm nào được điền thay. Chỉ tạo proof/record thật trong đợt được cấp quyền sau khi nhận/xác minh chứng cứ thật; không chép mẫu này vào publication-records để qua guard.

## Thông tin chung cho mỗi xác nhận

| Trường cần người có trách nhiệm hoàn thiện | Cách ghi |
|---|---|
| ID và loại xác nhận | Chọn đúng một kind F0; scope từng ID trong inventory; ghi rõ bài hay asset |
| Revision / contentHash / revisionHash | Lấy full giá trị đúng bài; asset dùng quy tắc riêng bên dưới; không nhập lại prose |
| Người xác nhận / vai trò / căn cứ thẩm quyền hoặc năng lực | **Để trống** cho người thật cung cấp; định danh đủ truy xuất được và được phép công khai. Không yêu cầu đăng dữ liệu cá nhân nhạy cảm |
| Ngày giờ xác nhận thực / múi giờ | **Để trống**; ISO8601 có offset, không lấy ngày lập P1C làm ngày thử nghiệm hoặc ngày ký |
| Việc đã thực hiện / phạm vi / bằng chứng | **Để trống**; dẫn đúng báo cáo/đoạn/log/phiên bản, tách lịch sử và mới; nêu phần không kiểm |
| Vấn đề còn mở / lý do / người xử lý | **Để trống**; ghi UNVERIFIED/BLOCKED nếu thiếu, không mặc định không có lỗi |
| Kết luận thực tế | **Để trống**; xác nhận / cần xử lý / chưa xác minh có căn cứ. Không mặc định approved |
| Cho phép công khai bằng chứng tối thiểu | **Để trống**; không đưa hợp đồng riêng tư, danh tính trẻ hoặc dữ liệu tâm lý lên repo |
| Người xác minh tính xác thực / thời điểm / phạm vi | **Để trống**; không dùng riêng validator thay xác minh con người |

Đây là bảng thu thập thông tin, không phải schema ReviewRecord. Khi hoàn thiện thật, ánh xạ sang đúng trường F0 và hash proof; dữ liệu không đạt hoặc chưa đầy đủ không được serialize thành approved.

## A — Chủ dự án: hoàn thiện căn cứ editorialApproval

- ID/revision/contentHash/revisionHash được xác nhận: **để trống**, chọn từng dòng trong 29 bài; có thể dùng phụ lục 29 dòng đã đối chiếu và kết luận rõ cho từng ID.
- Nguồn quyết định đã có: [OWNER-DECISION.md](OWNER-DECISION.md), trích chỉ thị P1C; không phải yêu cầu kiểm toán AI hoặc nghiệm thu nháp lại.
- Định danh công khai của người xác nhận, vai trò biên tập/thẩm quyền, cách truy xuất xác nhận và quyền công khai: **để trống**.
- Thời điểm xác nhận thực đối với scope/hash; điều kiện hoặc vấn đề biên tập chưa đóng: **để trống**.
- Xác nhận đây là chấp thuận nội dung/biên tập, không tuyên bố đã làm chuyên môn/learnerQA/quyền hình: **để trống** cho người xác nhận.

## B — Người có chuyên môn: expertReview

- Người/năng lực thực phù hợp trẻ/vị thành niên và các trục cụ thể của bài, phạm vi/độc lập, ngày thực: **để trống**.
- Claim/đoạn nào đã kiểm, nguồn/bản/trang/mục/tuổi/bối cảnh; trực tiếp/thứ cấp/abstract; metadata/corrections/retractions và giới hạn: **để trống**.
- Ngôn ngữ/an toàn/không chẩn đoán/không ép bộc lộ, quyền bỏ qua và đường tìm hỗ trợ; Bloom/phản hồi: **để trống**.
- Kết luận về các ghi nhận riêng P1A có liên quan và blocker chung, bằng chứng đóng hoặc còn BLOCKED: **để trống**.

Tái dùng 29 phiếu P1A và 13 ghi nhận có vị trí, không tạo đợt AI mới. C03/chênh DOI, C21/C22/E02/bản đọc và E05/số liệu nguồn cần kết luận có căn cứ. Các ghi chú provenance đã giải thích không buộc sửa bài; nguồn không dùng không phải lý do thêm nội dung mới. Chuyên môn chưa kiểm trực tiếp phải nói rõ, không chuyển nguyên kết luận AI thành expertReview.

## C — Người phụ trách kỹ thuật/tiếp cận: readerQA

- Người thực hiện và xác nhận, ngày, commit/revision/hash, Reader/compiler/browser/OS/version/thiết bị: **để trống**.
- Bằng chứng C1/R1 nào còn dùng được vì nguồn và phần mềm liên quan không đổi; phần nào mới thực sự kiểm: **để trống**.
- Từng bài: đủ source/AST/DOM, APA/Bloom/bảng/SVG/alt/caption/mô tả/credit, TOC/focus/hash/return, 320/390/768/1440 và keyboard: **để trống**.
- Native zoom 200%, screen reader thật/tổ hợp version, thiết bị và browser theo gate; bước chưa làm/issue/bằng chứng xử lý: **để trống**.
- Kết luận có phạm vi cụ thể, không gọi kết quả Node là browser hoặc zoom CSS là native: **để trống**.

## D — Người tổ chức thử đọc: learnerReview

- Người chịu trách nhiệm, hoạt động thực, ngày, phạm vi 29 bài/THCS/THPT và điều kiện tiếp cận: **để trống**.
- Cách tổ chức tự nguyện, quyền bỏ qua/dùng nhân vật; không yêu cầu dữ liệu tâm lý thật; cách bảo vệ thông tin người tham gia: **để trống**.
- Kết quả quan sát cụ thể về hiểu thuật ngữ, câu hỏi/phản hồi Bloom, tải đọc/hiểu nhầm và xử lý: **để trống**.
- Giới hạn, phần chưa thử và kết luận: **để trống**. Không điền tên trẻ/sức khỏe/địa chỉ trong repository; giữ phần tóm tắt vô danh đã được phép công khai.

## E — Người có quyền/người xác minh quyền: assetRights

- AssetId/path/SVG sha256/asset revision và article revisionHash: **để trống**, lấy đúng 29 asset trong inventory. `subjectId` là assetId; `contentHash` là SVG sha256, không article contentHash.
- Người xác nhận/thẩm quyền/quá trình kiểm nguồn gốc và tài sản phái sinh/điều kiện công cụ tạo: **để trống**.
- Căn cứ quyền thật, chủ thể có quyền, phạm vi web công khai/GitHubPages/phân phối repo, sửa đổi, credit, điều kiện thời hạn/lãnh thổ/thu hồi nếu áp dụng: **để trống**.
- Giấy phép hoặc hình thức cho phép thực tế và bằng chứng tối thiểu được phép công khai: **để trống**; không tự ghi CC/độc quyền hoặc sao điều khoản nguồn khoa học sang SVG.
- Điều chưa xác minh/kết luận/ngày thực: **để trống**. Nếu chủ dự án có đủ căn cứ và thẩm quyền cho hình tự tạo, có thể xác nhận phần ấy bằng chứng thật; không buộc dựng giấy phép bên thứ ba khi thực tế không có, cũng không suy hình AI luôn sạch quyền.

## F — Chủ dự án/người được ủy quyền: publicationAuthorization

Chỉ xác nhận sau khi bằng chứng bắt buộc đã được kiểm; quyết định P1C hiện tại chưa làm bước này.

- Người có thẩm quyền và phạm vi được ủy quyền, ngày xác nhận thật: **để trống**.
- Từng ID/revision/contentHash/revisionHash và asset đã đủ quyền, các review/proof thực đã được xem: **để trống**.
- Quyết định cho công bố bản nào, trên bề mặt/kênh/phạm vi nào; điều kiện và giới hạn: **để trống**.
- Xác nhận tất cả vấn đề bắt buộc đã xử lý; phần nào còn BLOCKED: **để trống**. Nếu còn thiếu không ghi approved.
- Việc cho phép tạo/cập nhật record trong manifest và chỉ thị riêng cho P2: **để trống**. Không bao gồm quyền deploy/merge trừ khi có chỉ thị riêng rõ ràng.

## Sau khi có xác nhận thật

Người thực hiện được cấp phạm vi sẽ tạo record/proof đúng F0: kind/subjectId/revision/contentHash/revisionHash/decision/by/at + evidence.path/sha256. Proof JSON có cùng trường scope/quyết định/người/ngày; hash tính từ byte proof cuối. Giữ chứng cứ gốc riêng khi cần, công khai tối thiểu hợp lệ. Tính hash không làm chứng cứ trở thành thật; mỗi loại phải được kiểm đúng ý nghĩa trước khi ghi.

Không phải mọi bản nháp mẫu thu thập đều đủ để cấp quyền. Chưa có dữ kiện hoặc hoạt động thật thì giữ BLOCKED; không cần thêm vòng AI để diễn giải lại điều chưa được thực hiện.
