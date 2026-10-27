# Academic Showcase Release — Không Gian Nội Tâm

Bản trưng bày học thuật phi thương mại được chủ dự án cho phép riêng, với 29 bài, 29 SVG đúng phiên bản đã nghiệm thu và 10 chuyên đề minh họa. Không tuyên bố chuyên gia chứng nhận hoặc đã thẩm định toàn diện. Lịch 2027 là mô phỏng của tiểu luận, không phải lịch triển khai tại một trường học.

## Hai lệnh build độc lập

```sh
cd prototype
npm ci
npm run build             # STANDARD VERIFIED RELEASE, F0; dist/
npm run build:academic    # ACADEMIC SHOWCASE RELEASE; dist-academic/
```

`npm run build:academic` chạy typecheck, kiểm thử chính sách showcase, build Vite và scanner showcase. Cấu hình academic chỉ dùng cho build production, không có dev server hoặc preview fixture. Mặc định `vite.config.ts` vẫn sử dụng guard/scanner F0 nguyên bản. `--mode` hoặc query URL không cấp quyền đưa bài vào standard build.

`editorial/academic-showcase-policy.json` là allowlist chỉ dùng phía build: khóa ID/slug/contentHash/revisionHash của đúng 29 bài, từng SVG, hash registry 10 chuyên đề, tài sản tĩnh và 107 record bảo toàn. Compiler kiểm hash nguồn, quyền tài sản và biên tập đã ghi nhận. Không đổi `publication`, `publishedAt`, review hoặc trạng thái bản gốc. DTO giữ trạng thái draft, giao diện ghi “Bài đọc học thuật”.

Scanner showcase kiểm artifact đủ 29/29/10, đúng bytes SVG, không sourcemap/raw dossier/record/manifest nội bộ/fixture/module dev; scanner và validator standard được giữ nguyên. Hồ sơ tham chiếu trong nguyên bản chỉ trỏ tới ghi chú giải thích, không xuất tài liệu nội bộ. Trích dẫn, bảng và hình trong ARTICLE được giữ qua compiler Reader dùng chung. Font và artwork cũ được giữ.

## Kiểm thử artifact thật

```sh
npm run test:academic:browser
```

Dùng Chromium tại `CHROMIUM_PATH` hoặc `/usr/bin/chromium`; server chỉ phục vụ `dist-academic/` trên loopback, không phục vụ repository và không có SPA fallback. Kiểm tất cả 29 Reader, 10 chuyên đề và các route chính tại 320/390/768/1440px; đối chiếu node AST/DOM, 25 bảng, hình, anchor, tải font/JS/CSS/SVG, search/filter, Back/Forward/reload, Dòng chảy, hình phóng lớn và quyền riêng tư. Đây là kiểm Chromium headless với viewport mô phỏng; không phải kiểm thiết bị thật, screen reader hoặc review chuyên môn.

## Cloudflare Pages Direct Upload

1. Dùng ZIP artifact sạch đã bàn giao, hoặc thư mục `dist-academic/` vừa build và scan.
2. Trong Cloudflare: **Workers & Pages → Create application → Pages → Use direct upload / Upload assets**.
3. Đặt tên dự án; upload ZIP (có `index.html` ngay gốc) hoặc kéo thư mục chứa `index.html` và `assets/`. Không upload repository.
4. **Deploy site**, mở URL `https://<tên-dự-án>.pages.dev`, rồi vào `/#/thu-vien` để kiểm 29 bài và `/#/chuyen-de` để kiểm 10 chuyên đề.

Artifact dùng HashRouter và asset tương đối, không cần rewrite, build trên Cloudflare hoặc token trong chat. Giữ `noindex, nofollow`; URL vẫn có thể chia sẻ. Không có dữ liệu tài khoản hay lời viết Góc tâm tình được lưu/gửi đi. Không dùng repository công khai làm nguồn deploy thay thế.
