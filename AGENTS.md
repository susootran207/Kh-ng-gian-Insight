# Không Gian Nội Tâm — hướng dẫn UI Skills

## Phạm vi hiện tại

Chỉ chuẩn bị và kiểm tra UI Skills. Chờ người dùng xem kết quả trước khi thiết kế website. Không sửa `Không Gian Nội Tâm.html`; SHA-256 gốc: `4f78efcea9aa8b57f0603261abc4af3a56efb35111646bb7a9fbd7e7c70a4928`.

## Các skill trong repository

Đọc SKILL.md tương ứng trước khi áp dụng, rồi chỉ đọc tài liệu phụ trợ phù hợp. Đây là các bản nguồn được ghim commit; xem `docs/ui-skills/REPORT.md` và `manifest.json` để biết xuất xứ, kiểm tra và giới hạn.

- **Taste Skill** — tên khai báo `$design-taste-frontend`, tại `.agents/skills/design-taste-frontend/SKILL.md`. Dùng để định hướng nghệ thuật, ý tưởng riêng của dự án, màu sắc, typography và thiết kế frontend. Thư mục upstream là `skills/taste-skill/`; thư mục local theo đúng tên khai báo. Giữ nguyên `references/`, `library/`, `assets/`, `scripts/` và `evals/`.
- **NameThatUI** — `$namethatui`, tại `.agents/skills/namethatui/SKILL.md`. Dùng để nhận diện UI pattern và thành phần từ mô tả, ảnh hoặc DOM; phân biệt tên, aliases, hành vi và mức chắc chắn. Đây là bản lịch sử, không phải skill có trên HEAD đã kiểm tra. Bắt đầu với `references/component-families.md`; không truy cập hoặc trả link thuộc `namethatui.com` và subdomain. Khi không chạy helper, dùng taxonomy offline và ghi rõ link chưa kiểm chứng trực tiếp.
- **Impeccable** — `$impeccable`, tại `.agents/skills/impeccable/SKILL.md`. Dùng để hoàn thiện typography (`reference/typeset.md`), bố cục (`layout.md`), responsive (`adapt.md`), animation (`animate.md`), accessibility (`audit.md`) và kiểm tra cuối (`polish.md`). Đọc `reference/craft-floor.md` ngay trước khi sửa UI sau khi được giao thiết kế.

## Cách phối hợp sau khi người dùng giao thiết kế

1. NameThatUI gọi đúng tên pattern nếu chưa rõ; không cần gọi khi thành phần đã rõ tên.
2. Taste Skill định hướng nghệ thuật theo nội dung và đối tượng thực của Không Gian Nội Tâm.
3. Impeccable hoàn thiện chất lượng theo hướng đã chọn. Giữ sự nhất quán thay vì trộn các đề xuất mâu thuẫn. Yêu cầu của người dùng luôn ưu tiên.
4. Kiểm tra bản render ở mobile và desktop, keyboard/focus, contrast, reduced motion và nội dung tiếng Việt. Không tuyên bố đạt accessibility chỉ từ việc đọc skill.

## Thực thi và Codex Cloud

Không tự chạy script upstream, installer, `npx`, launcher, binary hoặc hook. Các tệp script được giữ để không mất phụ thuộc; việc giữ tệp không có nghĩa đã kiểm duyệt hoặc cho phép thực thi. Chỉ cân nhắc chạy sau khi đọc và xác minh mã, mục đích và tác động trong phạm vi tác vụ được giao. Không tự tải hoặc kích hoạt engine Impeccable; launcher có thể tải binary và ghi cache ngoài repository. Chưa cài `.codex/hooks.json`.

Impeccable có nhánh fallback khi không dùng launcher: đọc trực tiếp ngữ cảnh dự án đang có, không bịa PRODUCT.md/DESIGN.md, đọc reference phù hợp và nói rõ context loader chưa chạy. Không chạy `init` hay dựng website chỉ để thử skill.

Mở tác vụ Codex Cloud từ repository này để `.agents/skills/` nằm trong phạm vi tìm skill. Nếu phiên hiện tại chưa tự nhận skill mới, mở lại tác vụ; có thể yêu cầu đọc trực tiếp đường dẫn SKILL.md để áp dụng hướng dẫn. Chỉ xác nhận auto-discovery khi danh sách skill của phiên thực sự có tên tương ứng. Không dùng `/prompts:` thay cho skills.
