# Kiểm toán website — integration-plan-r1

Ngày 25/10/2026, Asia/Saigon. Phạm vi: kiểm toán và đề xuất, không triển khai chức năng. **29/29 bản nháp đã được chủ dự án nghiệm thu nội bộ theo chỉ thị hiện tại; chưa suy thành phê duyệt chuyên môn, nội dung cuối hay quyền xuất bản.**

## 1. Nền kiểm toán và mức bằng chứng

- [PR #16](https://github.com/susootran207/Kho-ng-gian-Insight/pull/16) đã merge lúc **20:03:05 ngày 25/10/2026**. Điều kiện bắt đầu đạt.
- GitHub main được đọc tại **29510528e0cf465b8d709aed3190d9d5e8608de9**, tree **3397dea42f64cc5286ea4d2c34ca66e13b8bee5c**.
- Checkout môi trường ở 2a8ad5fe7000182935255224fcae68903c43417c. Git fetch thất bại do proxy:8080. Đã lấy 39 tệp bổ sung B05 qua GitHub connector và đối chiếu Git blob SHA-1 **toàn bộ 534 tệp** với recursive tree main: **0 sai lệch**, tree không truncated. Đây là snapshot tệp đồng bộ main để kiểm; **không tuyên bố local Git HEAD đã fast-forward**. Draft PR tài liệu phải kế thừa trực tiếp commit main mới trên GitHub, không dùng HEAD cũ.
- Đã đọc PRODUCT.md, DESIGN.md, AGENTS.md; PLAN, ARCHITECTURE, STANDARDS, TEMPLATES, REVIEW/matrix; sáu tài liệu accelerated-plan; audit-3-2/READINESS-GATES và validator; báo cáo B01–B05; khảo sát trực tiếp toàn bộ src, schema, catalogue, plugin build, guard và test liên quan.
- PRODUCT/AGENTS/PLAN và báo cáo lô có mô tả quyền/trạng thái lịch sử. Chỉ thị hiện tại là căn cứ mới cho kiểm toán này, không sửa lịch sử để biến thành quyền triển khai.
- **S** = kiểm từ mã/dữ liệu; **R** = đã thực thi trong phiên này; **H** = bằng chứng lịch sử, chưa chạy lại; **U** = chưa xác minh hiện tại. Không đánh dấu hoạt động chỉ vì tệp tồn tại.

## 2. Kết luận theo phân hệ

| Phân hệ | Đã có / phần hoàn thiện trong phạm vi cũ | Đã có nhưng còn thiếu / chưa triển khai | Lỗi hoặc rủi ro có căn cứ | Route / tệp / phụ thuộc |
|---|---|---|---|---|
| Trang chủ | S: header/menu, quote, weekly spread, about, timeline, ba preview minh họa DEV, lantern, footer. Mây kéo giới hạn + bàn phím/reset; tử đằng B cố định, không đọc tham số A/C | Chưa nối 29 bài; nội dung tuần và preview cũ còn hardcode. H: Phase 1–2 đã nghiệm thu; U: render hiện tại | Dễ sửa trùng hai nguồn homepage/catalogue. C03 cùng slug nhưng tiêu đề mẫu cũ khác bản nghiệm thu, không được nhận mẫu cũ là bài mới | /; src/App.tsx, content.ts, reading/homepageContent.ts; cần selector nội dung chung và guard trước nối bài |
| Mây / tử đằng / animation | S: CatArt dùng chung; TopCanopy dùng approvedWisteria; mask đo vùng chữ; petal số lượng hữu hạn; pause khi hidden/offscreen/quiet; OS/manual reduction | Không có nhu cầu thiết kế lại. U: độ mượt thiết bị thật, mask sau thay đổi layout mới | Thêm heading/nút có thể thay vùng an toàn của canopy/companion. Không có bằng chứng hiện tại để đổi artwork hoặc timing | components/CatGarden.tsx, CatArt.tsx, ScrollCompanion.tsx, TopCanopy.tsx, wisteriaDesign.ts, GardenAtmosphere.tsx, MotionRegion.tsx; global.css/atmosphere.css là vùng bảo toàn |
| Chuyên đề tuần | S: index/detail, danh sách bài theo articleSlugs, empty state; production loại link bài chưa published | Chưa có lịch, lời dẫn/đơn vị tuần, thứ tự/fallback và selector chung với homepage; T01–T09 mới ở matrix | DEV homepage hardcode /chuyen-de/dem-dai; không tự đồng bộ với danh mục tương lai. Zero published là trạng thái chủ ý, không lỗi thiếu dữ liệu | /chuyen-de, /chuyen-de/:slug, /#chuyen-de; Router.tsx, App.tsx, editorial/schema.ts, catalogue.json, build/editorial.ts; phụ thuộc F0 |
| Nền tảng | S: section “Mỗi người một mùa nở hoa”, liên kết anchor từ hai header | **Chưa có trang riêng** giải thích mục đích, quy trình nguồn/Bloom/hình/duyệt/quyền riêng tư; chưa có route /nen-tang | Không được quảng bá có chuyên gia hay quy trình đã hoàn tất. Việc section tồn tại không chứng minh trang 3.4 đã triển khai | /#nen-tang; App.tsx, ReadingHeader trong Router.tsx; trang mới dự kiến, giữ anchor cũ |
| Dòng chảy | S: bốn disclosure Đầu năm/Giữa học kỳ/Mùa thi/Sau thi, một panel chọn bằng state; library có filter giai-doan | **Chưa có trang riêng**, chưa liên kết chặng → bài/filter, không đồng bộ state timeline với URL | Các nút không chọn vẫn aria-controls tới panel không được render (đọc JSX); cần xác minh với assistive và sửa quan hệ khi mở rộng. Không được gọi đây là tablist hoặc đo tâm trạng | /#dong-chay; App.tsx, content.ts, Library trong Router.tsx; cần stage keys/nhãn/URL chung F0 |
| Góc tâm tình / thả đèn | S: textarea max500, nút chỉ hoạt động khi có chữ, clear state/DOM trước tạo metadata đèn; tối đa4, hết hạn9,5s; status; pagehide và unmount cleanup; không thấy luồng gửi/lưu/log lời viết | Là section, không inbox/trang tư vấn. Chưa có hướng dẫn bỏ qua/đi tiếp tách rõ; U: browser privacy/cleanup hiện tại, expiry dưới reduced motion | Mảng timers giữ handle đã hết hạn tới unmount, tăng theo mỗi lần thả (rủi ro thấp khi phiên dài, không chứa lời viết). Quyền riêng tư nguồn không chứng minh runtime; không hứa xóa vật lý RAM | /#tam-tinh; LanternGarden.tsx, MotionRegion.tsx, global.css, tests/homepage.spec.ts/reading.spec.ts; có thể làm độc lập |
| Thư viện / điều hướng | S: search title/description/keywords chuẩn hóa dấu và đ/Đ, AND từng từ; topic+season kết hợp; URL q/chu-de/giai-doan; empty/reset; Back/Forward và state.from; 404, breadcrumbs, focus route | Chưa nhận 29 bài; một topic/season hiện có, chưa metadata ID/revision/topicIds. Không cần pagination/CMS chỉ vì29 | R: catalogue DEV4 bài/1 topic, production0/0. Không phải 4 bản mẫu đầy đủ r2. C03/C05/C09/C17 trùng slug dự kiến: phải thay nguồn trong preview có chủ đích, không tạo duplicate | /thu-vien, /bai-viet/:slug; Router.tsx, reading/content.ts, editorial/*; phụ thuộc adapter/Reader |
| Article Reader | S: h1/deck/metadata, section h2, paragraphs, note, TOC/focus, HTTPS sources dạng title+url, related và return filter | **Chưa có Markdown renderer**; thiếu h3/lists/bảng/figure/alt/caption/long description, APA nguyên dạng, hoạt động/phản hồi đầy đủ và provenance revision | sections.paragraphs chỉ là chuỗi plain text; chép Markdown vào sẽ không render đúng. Runtime không có trường ID/revision bài, không kiểm approval khớp revision. related có thể liệt kê nhiều bài cùng nhóm khi đủ29 (UX cần giới hạn có lý do) | ArticlePage trong Router.tsx; schema.ts; styles/reading.css; F0 → R1 → C1 |
| Desktop/tablet/mobile | S: local font, CSS media query homepage/reading; reader rail250px sang normal flow <=900, list một cột <=600, menu1100. H: screenshot/test cũ320/390/768/1440 | U: build mới, overflow, zoom, touch, landscape, Safari/Firefox, thiết bị vật lý và assistive; bài dài29 chưa có UI để kiểm | C01/C05 SVG khi rộng320 có chữ nhỏ11–15px theo validator; không được thu nhỏ rồi coi đã đọc tốt. Cần zoom/xem hình lớn và mô tả chữ, giữ nguyên hình nguồn | styles/*.css, tất cả garden components; tests/*, docs/phase-2/REVIEW.md và docs/prototype/REVIEW.md là lịch sử |
| Publication guard | S+R: selectContent loại draft/in_review/approved trong public; published thiếu approval bị từ chối; topic cắt link tới bài bị loại. S: plugin lọc trước serialize, no sourcemap; script scan dist + canary legacy | Chưa phủ29 dossier/Markdown/SVG/fixture; chưa validate review/quyền theo content hash. Guard không xác thực danh tính người duyệt | Scanner chỉ lấy text catalogue cũ + legacy, nên import nhầm nội dung29 từ docs có thể ngoài tập chặn. approval.revision chỉ phải nonempty, chưa so revision thực. Đây là khoảng hở trước tích hợp, **không bằng chứng hiện có rò29 trên production** | build/editorial.ts, scripts/check-publication.mts, vite.config.ts, virtual.d.ts; F0 bắt buộc trước nhập bài |

Trạng thái tổng: nền giao diện/đọc Phase 1–2 đã có và được nghiệm thu lịch sử; **không phân hệ nào được chứng nhận hoàn thiện tích hợp29/runtime hiện tại trong kiểm toán này**. Các route hiện hữu chỉ gồm /, /thu-vien, /bai-viet/:slug, /chuyen-de, /chuyen-de/:slug và wildcard404.

## 3. Kiểm thực thi trong phiên

| Kiểm | Kết quả thực tế | Giới hạn |
|---|---|---|
| Đồng bộ snapshot so GitHub tree | R: 534/534 blob khớp SHA-1; PR16 merged; main SHA nêu trên | Git fetch không chạy được; không đổi local Git HEAD |
| Kho bài + matrix | R:29 ID/29 slug duy nhất, tiêu đề ARTICLE khớp29/29; 6 Markdown+bài hình mỗi ID, tổng203 tệp; không thiếu link nội bộ ARTICLE | Không kiểm lại nội dung khoa học hoặc HTTP nguồn |
| python3 docs/phase-3/validate.py | PASS24+5,29 hồ sơ,9 topic, negative cases và thêm mục30 | Dữ liệu kế hoạch vẫn outline_only lịch sử |
| python3 docs/phase-3/audit-3-2/validate.py | PASS_structural_only cho4 mẫu r2;119 link,23 runtime text files | Không phải browser/nguồn/chuyên môn |
| B01 validator | PASS5 bài;98 link | Chỉ cấu trúc |
| B02/B03/B04/B05 validator | Lần lượt818/870/924/1096 checks,0 errors | Không dùng số check làm điểm chất lượng |
| Quét marker29 trong source runtime | R:24 tệp text ở src/build/public/editorial; không thấy ID, revision hoặc phần mở đầu riêng của29 bản nháp | Không phải kiểm artifact production; slug trùng legacy được xử lý riêng |
| selectContent bằng Node strip-types | PASS: DEV4 bài/1 topic; public0/0;3 status chưa published đều loại; published thiếu approval bị reject | Chạy hàm hiện tại, không chạy bundle/browser, không ghi fixture/phê duyệt vào repo |
| npm run build trong bản sao work | **BLOCKED môi trường**: TS2307 thiếu react-router-dom; TS7006 ở callback phụ thuộc type router | Chưa kết luận lỗi source; dependency install chưa đầy đủ |
| npm ci --offline --ignore-scripts | ENOTCACHED ở yallist3.1.1 | Cài trong bản sao, không đổi package/lock source |
| npm ci qua mạng, cache work, retry0 | EPERM kết nối proxy8080 | Không bypass proxy, không chạy installer/engine UI skill |
| Playwright/Axe/production/current screenshots | **Chưa chạy**: build bị chặn; chuỗi lệnh dừng trước e2e | Không lấy dist cũ có sẵn làm build của main đã kiểm |
| Thiết bị/screen reader/đọc thử/chuyên môn | **Chưa thực hiện** | Cần bằng chứng đúng revision trong đợt được cấp quyền |

## 4. Ưu tiên và ranh giới

1. F0 hợp đồng dữ liệu + guard phủ29 trước adapter; R1 Reader bằng fixture; C1 preview29 riêng. Lý do: cần thấy đúng bài và chặn rò trước khi nối homepage/topic/stage.
2. Weekly W1 và Dòng chảy D1 dựa selector/metadata chung; Nền tảng N1 và Góc tâm tình G1 có thể chuẩn bị độc lập nhưng nhập router/App theo lượt.
3. Q1 tổng kiểm sau mọi tích hợp; từng PR vẫn có QA riêng. Chi tiết [roadmap](IMPLEMENTATION-ROADMAP.md), [nội dung](CONTENT-INTEGRATION.md), [QA](QA-PLAN.md), [quyết định](DECISIONS-NEEDED.md).
4. Bảo toàn HTML gốc, Mây, tử đằng B, artwork/font/palette, global/atmosphere composition và hành vi đang tốt. Không rewrite29 bài, backend, login, test tâm lý, lưu tâm tình, catalogue production/published, merge/deploy/publish.

Dừng ở Draft PR năm tài liệu này; các mã PR tiếp theo chỉ là đề xuất.
