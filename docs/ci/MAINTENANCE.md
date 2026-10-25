# Bảo trì GitHub Actions CI

Workflow: `.github/workflows/ci.yml`. Chỉ kiểm thử; không deploy, publish hoặc upload artifact.

## Môi trường và các kiểm tra

- PR hướng vào main, push main và workflow_dispatch. Không dùng pull_request_target hoặc bộ lọc đường dẫn khiến required check bị bỏ qua.
- Job ổn định: **Verify prototype**; Ubuntu 24.04, timeout 20 phút, quyền duy nhất contents: read, checkout không lưu credential.
- Node **24.19.0 LTS** phù hợp Vite 7.3.7 trong lockfile (Node ^20.19.0 hoặc >=22.12.0), @types/node 24 và lệnh strip-types F0.
- checkout v4.2.2 và setup-node v4.4.0 pin SHA đầy đủ, đã đối chiếu tag chính thức khi thiết lập.
- npm ci trong prototype; cache chỉ kho tải npm theo prototype/package-lock.json, không cache node_modules hoặc dist.
- Theo thứ tự: manifest --check; test:f0 (bao gồm baseline 29); tsc -b; xóa dist rồi npm run build; npm run test:content trên dist vừa tạo.
- Build gốc đã gồm typecheck và scanner. Việc chạy scanner riêng sau build là chủ ý để có bước nghiệm thu rõ ràng. Không thay script ứng dụng.
- Scanner F0 kiểm draft/source, dossier nội bộ, fixture, asset chưa được phép, raw source và source map; CLI có negative canary. Đây là phạm vi phát hiện của guard F0, không phải chứng minh chống mọi phép biến đổi tùy ý.
- Summary ghi PASS khi bước thành công, FAIL khi bước lỗi, BLOCKED khi skipped/cancelled. Workflow không dùng continue-on-error. Bước phụ thuộc bị chặn không được diễn giải là PASS. Nếu runner không khởi động hoặc bị hủy cứng, summary có thể không được tạo; xem trạng thái run.

## Chủ dự án cần cấu hình

Main được GitHub trả về protected=false tại lúc thiết lập. Chủ dự án nên bật branch protection/ruleset: yêu cầu PR và required status check **Verify prototype** (app GitHub Actions), cân nhắc yêu cầu nhánh cập nhật theo main và review trước merge. Chọn tên check chính xác sau khi run đầu xuất hiện; không đổi tên job tùy tiện. CI không tự bật các chính sách này.

Cho phép Actions và hai action đã pin trong chính sách repository/organization nếu đang hạn chế. Không cần secrets, Pages, quyền ghi token hoặc environment deploy. workflow_dispatch trên giao diện mặc định chỉ khả dụng sau khi workflow có trên default branch; Draft PR vẫn chạy qua pull_request.

## Quy trình bảo trì

1. Nâng Node hoặc action pin bằng PR riêng, xác minh SHA/tag từ repository chính thức, đọc thay đổi và chạy đầy đủ CI. Không dùng latest. Theo dõi bản vá và thời hạn hỗ trợ Node/runner/action.
2. Chỉ cập nhật dependency/lockfile trong công việc được cấp phép riêng. Khi cache lỗi, xóa cache hoặc đổi key/cấu hình cache; không bỏ npm ci.
3. Khi manifest/test/build/scanner lỗi: đọc bước đầu tiên lỗi. Lỗi network/setup là BLOCKED về khả năng nghiệm thu; GitHub có thể hiển thị job failure. Lỗi ứng dụng phải báo file/nguyên nhân và sửa trong PR riêng, không giảm guard hoặc đổi publication status để xanh.
4. Không tự sinh lại manifest nhằm né --check. Việc đổi nguồn/revision/quyền xuất bản thuộc quy trình biên tập riêng.
5. Không upload dist theo mặc định: output lỗi guard có thể chứa nội dung chưa công bố. Mọi bổ sung artifact/log phải được đánh giá dữ liệu trước. Không in nội dung bài hoặc hồ sơ vào summary.
6. Kiểm lại CI sau thay đổi scripts, scanner hoặc cấu trúc prototype. Mở rộng test trình duyệt cần phạm vi riêng; CI này chưa chạy Playwright/browser/accessibility.

## Nền và giới hạn nghiệm thu ban đầu

F0 PR #18 đã merge vào main `1304bb32f73da50fe931c2197d641370e2bf202a` (25/10/2026 21:28 Asia/Saigon). Nhánh CI tạo trực tiếp từ SHA đó sau khi kiểm lại main. Git fetch tại Codex lỗi proxy:8080; nội dung package.json, toàn bộ lockfile, cấu hình và publication guard được đọc qua GitHub connector tại SHA cố định, không dùng checkout cũ để suy kết quả.

Kiểm cục bộ: parse YAML, triggers, quyền read-only, action SHA 40 ký tự và bash -n cho các run block đã PASS. Chưa có actionlint trong môi trường. Kết quả ứng dụng/build phải lấy từ run GitHub Actions của đúng PR/head SHA; không suy PASS từ kiểm cú pháp. Xem báo cáo run trong Draft PR. Không sửa R1, nội dung, thiết kế, publication status hoặc dependency.
