# Kiểm bổ sung bằng người/công cụ thực

Các mục dưới đây NOT TESTED trong Q1 tự động, không ghi PASS từ viewport/Axe. Cần ghi người thực hiện, ngày, OS/model/browser/assistive technology và phiên bản, SHA/artifact, thao tác, expected/actual, ảnh hoặc ghi chú đã ẩn dữ liệu cá nhân. Không tự cấp readerQA/publication record từ tài liệu này.

1. Native zoom 200%: Chrome/Firefox hoặc Safari desktop mở artifact sạch đúng quyền; dùng menu Zoom 200% (không CSS zoom/DPR). Kiểm 320-equivalent nếu có, header/menu, Library/search/reset, Nền tảng/Dòng chảy/weekly, 29 Reader/TOC/bảng/dialog/Đóng, Góc tâm tình. Không mất chữ, focus hay cuộn toàn trang hai chiều; bảng/hình dùng vùng cuộn riêng. Ghi actual zoom UI.
2. NVDA+Firefox hoặc VoiceOver+Safari: đọc landmarks/headings/skip link; menu mở/đóng/focus return; form labels/filter/count/empty/reset; Reader TOC focus, H1, bảng header, alt/caption/mô tả không lặp gây khó hiểu, link tab mới; dialog tên/zoom/status/trap/Escape return; privacy disclosure, counter/release/clear/skip/status không đọc lại lời. Ghi speech/nhận xét thật, không lấy accessibility tree làm speech PASS.
3. iOS Safari và Android Chrome thật, tablet nếu có: model/OS/browser, font tiếng Việt, keyboard ảo 500 ký tự, clear/release/skip, reload/history và pagehide/BFCache native, pinch zoom, touch scroll ngoài Mây, menu/TOC/dialog, reduced motion OS. Viewport headless không thay kết quả này.
4. Lần đọc đầu của học sinh/giảng viên: tìm mục đích/giới hạn, tìm một bài, đổi bộ lọc/xóa lọc, xem nguồn/hình, quay lại, hiểu lịch chỉ giới thiệu và quyền bỏ qua/không người nhận của Góc tâm tình. Ghi quan sát thật và giới hạn mẫu; không đưa lời nội tâm/dữ liệu học sinh vào repository.
5. Sau chỉ thị hosting: smoke URL production, MIME/cache/noindex, nguồn không lộ, canary privacy, direct hash/reload; rollback bằng artifact đủ quyền. Q1 không thực hiện deploy.

Không mở lại kiểm toán nguồn AI hay viết lại 29 bài. Các xác nhận chuyên môn/thử đọc/quyền hình còn thiếu thuộc hồ sơ thật do người có thẩm quyền xử lý.
