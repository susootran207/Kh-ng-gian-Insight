# Q1 — chuẩn bị Cloudflare Pages Direct Upload

Đây là checklist, không có hosting, tài khoản, DNS, token, GitHub App hoặc deployment nào được tạo. RELEASE BLOCKED cho tới khi đủ F0 và nghiệm thu riêng. Mô hình: repository phát triển private → build production sạch đã duyệt → Direct Upload chỉ thư mục dist. Không upload checkout/preview, không dùng noindex làm bảo mật. Chưa kiểm response Cloudflare thực.

## Kiến trúc hiện tại

- Vite `base: './'`, HashRouter; URL ổn định dạng `https://<project>.pages.dev/#/bai-viet/<slug>`. Fragment không gửi tới server; reload lấy index. Không đổi slug đã gửi giảng viên.
- Production suite kiểm dưới `/Kho-ng-gian-Insight/` bằng server không SPA fallback. Local root Python static server đã PASS route/reload/assets/1920/HTTP audit; Cloudflare cần smoke riêng sau khi có chỉ thị; không suy local prefix thành Cloudflare PASS.
- Font/artwork local; SVG bài chỉ được emit sau F0/hash/rights. Artifact hiện không có 29 SVG bài vì chưa đủ quyền. Fixture public tổng hợp kiểm pipeline, không là giấy phép thật.
- HTML đang có `noindex, nofollow`. Chưa có header host X-Robots-Tag. Không có thông báo tác giả/tiểu luận cá nhân cụ thể trong UI: chủ dự án cần cung cấp tên/định danh được phép hiển thị, môn/lớp nếu muốn và quyết định câu chữ trước bản nộp. Không suy tên tài khoản GitHub thành tên tác giả.
- Lịch build-time: website tĩnh không tự chuyển tuần. Chỉ rebuild/deploy tại hoặc sau mốc, kiểm snapshot +07:00. Không đưa snapshot tương lai lên host trước hạn.

## Trước khi được phép triển khai

- [ ] Đủ 29/29 eligibility, 29/29 assetRights và proof đúng revision/hash; 10 topic/lịch thật và proof riêng được người có thẩm quyền xác nhận.
- [ ] Xử lý các mục NOT TESTED/BLOCKED trong REVIEW; chủ dự án nghiệm thu Draft Q1.
- [ ] Có chỉ thị riêng đổi repository private (Q1 GitHub API xác nhận visibility=public); rà collaborators, branch protection/main review/required CI, quyền tối thiểu, fork và lịch sử công khai. Private không thu hồi các bản đã sao chép.
- [ ] Giữ secrets/proofs nhạy cảm ngoài source public; không ghi token vào git, ảnh, log hoặc bundle. GitHub App hosting không cần cho Direct Upload.
- [ ] Chốt tên project, người sở hữu, người thay thế, thời gian duy trì link ít nhất qua chấm bài, bản nộp cố định và cách thông báo cập nhật. Không xóa/tạo lại project khiến đổi link.
- [ ] Kiểm lại tài liệu/gói/giới hạn Cloudflare tại thời điểm thực hiện: [Direct Upload](https://developers.cloudflare.com/pages/get-started/direct-upload/), [headers](https://developers.cloudflare.com/pages/configuration/headers/), [cache](https://developers.cloudflare.com/pages/configuration/serving-pages/). Q1 không xác minh tài khoản/quota. Direct Upload không chuyển trực tiếp sang Git integration; cần kế hoạch migration nếu đổi mô hình.

## Tạo và nghiệm thu artifact (sau chỉ thị riêng)

1. Checkout SHA được duyệt, lockfile nguyên vẹn; `npm ci --ignore-scripts`, manifest --check, F0–W2, typecheck và browser QA theo báo cáo.
2. Xóa riêng dist cũ, chạy `npm run build`, `npm run test:content`. Scanner/canary/graph phải PASS, không nới guard. Lưu SHA, snapshot, file list, SHA-256 từng file và tổng dung lượng.
3. Kiểm thực tế số public 29 bài/29 SVG, chuyên đề theo snapshot; direct routes/search/flow/weekly/related/return. Bất kỳ bài thiếu quyền: dừng.
4. Kiểm không có dossier/manifest/proof/raw MD/TS/registry/preview module/source map/test fixtures hoặc dữ liệu nội bộ. Không copy public/ hay preview sau scanner. Nếu thêm `_headers`/`_redirects` cần PR thay đổi có kiểm guard rõ ràng, không tự bỏ scanner cho file mới.
5. Kiểm root lẫn prefix, MIME `.js` text/javascript, CSS text/css, SVG image/svg+xml, woff2 font/woff2, WebP image/webp; không response HTML thay JS/asset lỗi. Q1 phát hiện và sửa MIME favicon SVG trong helper prefix local; audit sau sửa trả image/svg+xml. Root Python cũng trả đúng; không chứng minh MIME SVG trên host.
6. Local test servers không trả Cache-Control; chưa là cấu hình cache host. Cache index phù hợp cập nhật; hash assets có thể immutable; kiểm cache HTML/404/noindex ở host thật, không dựa vào tên file. Không cache preview: preview không lên host.
7. Chỉ upload dist đã ký digest, không rebuild khác SHA ở bước upload. Lưu bản artifact đủ quyền để rollback; không rollback về quyền đã thu hồi.

## Sau deploy được cấp phép — chưa thực hiện

- [ ] HTTPS production URL/root/# routes/direct reload/Back/Forward/404/recovery hoạt động; mọi asset có MIME đúng, không mixed content/console errors.
- [ ] Kiểm noindex HTML và header nếu cấu hình; noindex không chặn truy cập/chia sẻ. Không bật analytics/form/telemetry ngoài phạm vi.
- [ ] 29 bài/hình, weekly snapshot, form canary không request/storage; menu/TOC/dialog/keyboard/zoom/mobile hoạt động trên URL thật.
- [ ] Rà mọi deployment URL/alias cũ để tránh công bố bản thiếu quyền. Link public có thể được chuyển tiếp; Access nếu cần là quyết định riêng và phải bảo vệ mọi hostname/asset.
- [ ] Ghi URL ổn định vào bản nộp chỉ sau smoke PASS; lưu SHA/digest/ngày giờ Việt Nam và người thực hiện, có người duy trì link/rollback.

Không dùng preview29 để gửi giảng viên khi F0 còn thiếu. Báo cáo Q1 và screenshot nội bộ không phải production artifact hoặc publication proof.
