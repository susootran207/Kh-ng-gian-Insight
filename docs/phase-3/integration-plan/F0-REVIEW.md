# F0 — Bàn giao và bằng chứng kiểm thử

Ngày 25/10/2026 (Asia/Saigon). Nhánh **phase-3-f0-content-contract**, Draft PR vào main. Chủ dự án cho phép riêng F0 sau nghiệm thu kế hoạch PR #17. [Contract triển khai](F0-CONTRACT.md).

## 1. Điều kiện bắt đầu

PR #17 đã merge lúc **20:46:07 ngày 25/10/2026**, giờ Việt Nam. Main: `498fcf656098aaf4338744f8a289200c01eec26a`; tree `43c593a6d9c22a0f6d48c242641366c17837dc86`.

Git fetch tiếp tục lỗi không kết nối proxy:8080. Đã lấy năm tài liệu kế hoạch qua connector ở SHA cố định, lắp snapshot trong work/f0/repo và so Git blob SHA-1 **539/539 tệp khớp main**, recursive tree không truncated. Local Git HEAD cũ không được dùng làm parent PR. Commit bàn giao kế thừa trực tiếp main trên GitHub.

Đã đọc năm tài liệu integration-plan cùng PRODUCT/DESIGN/AGENTS và mã schema/build/plugin/scanner/catalogue/config/test hiện hành. Không áp dụng engine UI skill hoặc chạy installer upstream. Không sửa giao diện.

## 2. Kiến trúc và tệp thay đổi

| Tệp | Thay đổi |
|---|---|
| prototype/editorial/source-contract.ts (mới) | Types manifest/source/metadata/record/asset/PreviewView/PublicView; chuẩn bị đầu vào R1, không AST renderer |
| prototype/build/content-contract.ts (mới) | Generator/validator, đường dẫn/hash/relations, proof đúng revision và selector/resolver public |
| prototype/editorial/source-manifest.json (mới) | Một manifest 29 mục: metadata/đường/hash; không prose/29 JSON bài độc lập, tất cả draft/null |
| prototype/build/publication-scan.ts (mới) | Scanner dùng chung cho 29 nguồn, asset, legacy và fixture; kiểm cả cây/bundle và encoding phổ biến |
| prototype/build/editorial.ts | Mở rộng plugin hiện tại: kiểm manifest, xác minh publication, lọc topic links, scan trước/sau emit; chỉ serialize catalogue cũ |
| prototype/editorial/schema.ts | Dùng chung EditorialStatus, thêm kiểu publication evidence; giữ API mẫu UI cũ |
| prototype/scripts/generate-manifest.mts (mới) | Sinh/--check manifest; không ghi dữ liệu nguồn; không ghi đè quyền/trạng thái review |
| prototype/scripts/check-publication.mts | Dùng validator/scanner thật, canary âm, báo public counts; không bỏ bước guard sau build |
| prototype/tests/content-contract.test.mts (mới) | Node tests, fixture và record tổng hợp ở thư mục tạm, tự dọn |
| prototype/package.json | Chỉ thêm scripts test:f0 và content:manifest; không đổi dependency |
| prototype/tsconfig.json | Thêm allowImportingTsExtensions cho build-side modules chạy Node strip-types, vẫn noEmit |
| Hai tài liệu F0-CONTRACT/F0-REVIEW (mới) | Contract, hướng bảo trì và kết quả thực tế |

Không thêm dependency/parser, không đổi lockfile. Không sửa năm tài liệu kế hoạch đã nghiệm thu. Manifest là build-side input; không import vào src/ hoặc public/. Không xây ứng dụng/catalogue frontend thứ hai.

## 3. PASS / FAIL / BLOCKED

Môi trường Node **24.19.0**, TypeScript hiện có trong node_modules của môi trường. Chạy test Node với --test-isolation=none để chạy trực tiếp đầy đủ các subtest trong sandbox; không chấp nhận báo cáo chỉ một child process thay cho các test bên trong.

| Kiểm | Kết quả / bằng chứng |
|---|---|
| DATA01 baseline và mở rộng | **PASS**: 29 ID/slug duy nhất; bốn r2/25 r1; fixture thứ 30 sinh/validate cùng cấu trúc; không max 29 |
| DATA02 | **PASS**: 203 ref ARTICLE/dossier/SVG đúng hash; tests không ghi nguồn; manifest thật giữ draft/null |
| npm run content:manifest -- --check | **PASS**: “Source manifest: 29 records; unchanged; no publication grants.” |
| npm run test:f0 | **PASS: 22 tests, 22 pass, 0 fail, 0 skipped**. Test thực thi hàm/validator/scanner và hooks Vite thật với context/output giả lập, không import Vite runtime/khởi động website |
| Typecheck riêng F0 | **PASS**, strict/noUnused/noEmit; gồm contract/types/build/scanner/scripts/test |
| npm run build | **BLOCKED môi trường**: TS2307 thiếu react-router-dom; TS7006 callback type liên quan router. Dừng ở tsc trước Vite và test:content; không kết luận source F0 đã làm hỏng ứng dụng |
| npm ci theo lockfile, --ignore-scripts, cache work, retry0 | **BLOCKED môi trường**: EPERM connect proxy:8080 khi lấy yallist-3.1.1.tgz từ registry.npmjs.org; chạy trong thư mục install riêng, không sửa dependency/lock để né |
| Clean production artifact website / npm run test:content trên build mới | **BLOCKED** theo full build. Không dùng dist lịch sử hoặc artifact giả làm kết quả website thật |
| PUB06 direct route/query/asset trong browser | **BLOCKED** theo build; chỉ xác minh build-side module public rỗng và scanner từ chối bytes/asset bị giữ. Chưa chứng nhận route404/HTTP/browser hiện tại |
| PUB08 preview build thật rồi production build thật | **Chưa triển khai preview**, ngoài F0. **PASS phần F0**: mock hooks và full-tree scan phát hiện output chứa stale preview bytes, clean output riêng qua kiểm |
| Responsive/animation/Axe/screen reader/thiết bị thật | **Chưa chạy lại**, không thay UI; không dùng ảnh/test cũ làm kết quả mới |
| Nghiên cứu nguồn/chuyên môn/thử đọc/quyền công bố thật | Không thực hiện trong F0, không suy từ tests |

Lệnh tái hiện typecheck từ prototype/:

```sh
./node_modules/.bin/tsc --noEmit --strict --skipLibCheck \
  --noUnusedLocals --noUnusedParameters --esModuleInterop \
  --allowImportingTsExtensions --module ESNext --moduleResolution bundler \
  --target ES2022 --types node \
  build/content-contract.ts build/editorial.ts build/publication-scan.ts \
  tests/content-contract.test.mts scripts/check-publication.mts \
  scripts/generate-manifest.mts
```

Không có lỗi F0 chưa xử lý ở lượt kiểm cuối. Trong phát triển, typecheck đã bắt lỗi generic .mts/cast test và test thay đổi nguồn đã bắt việc fixture vô tình khôi phục byte cũ; đã sửa harness để thật sự đổi byte và assert revisionHash thay đổi. Không giảm guard hoặc bỏ test để báo xanh.

## 4. Những vi phạm đã bị chặn trong kiểm thử

- Duplicate ID/slug; revision sai; digest sai; stage/audience/trường metadata lạ; URL không HTTPS; dossier/asset thiếu hoặc sai alt/path/hash; related/topic lạ và membership lệch.
- Traversal thường/encoded/absolute/backslash; symlink và tệp không tồn tại.
- Published thiếu một trong năm review, thiếu quyền asset, record sai subject/revision/contentHash/revisionHash, reviewer rỗng, proof hash sai; proof JSON bị sửa kể cả cập nhật hash nhưng trường mâu thuẫn.
- Ngày không hợp lệ, publication tương lai, review sau ngày publication.
- Đổi ARTICLE/dossier/asset/metadata và tính lại digest vẫn không dùng lại approval cũ.
- Approval legacy cũ đơn lẻ; published topic thiếu proof; link topic lạ; link tới draft bị loại.
- Prose nháp, revision, SVG đổi tên, filename chứa slug nháp, raw MD/JSON/map, fixture sentinel; payload Unicode/HTML/percent/base64/gzip/brotli.
- Copy fragment/metadata/SVG nháp vào public/ không biến chúng thành asset được phép; raster lạ, symlink trong artifact và stale preview bytes bị reject.
- Các test gọi trực tiếp generateBundle và writeBundle đã thấy lỗi thật khi chèn dữ liệu bị giữ, không chỉ assert catalogue đếm bằng 0.

Ca synthetic hợp lệ cũng qua: release có đủ proof/rights được chọn; related chỉ giữ bài eligible; slug legacy trùng bản source đã được cấp quyền không bị blacklist mãi, nhưng prose cũ chưa cấp vẫn bị chặn. Đây là fixture ở tmp, **không phải cấp quyền cho bất kỳ bài thật nào**.

## 5. Bảo toàn

So tree nền trước bàn giao: chỉ năm tệp nền được sửa là build/editorial.ts, editorial/schema.ts, scripts/check-publication.mts, package.json và tsconfig.json. Các tệp nền còn lại giữ cùng blob; tệp mới chỉ thuộc contract/manifest/tests/scripts và hai tài liệu F0. Đối chiếu tree GitHub cuối trong PR để xác nhận phạm vi.

- Giữ nguyên cả 203 tệp bài/hồ sơ/SVG, matrix và catalogue.json.
- Giữ nguyên toàn bộ src/, styles, components Mây/tử đằng B, artwork, HTML gốc, font và public/.
- Giữ nguyên dependency và lockfile; package chỉ thêm scripts.
- Public thực tế trong phép chọn dữ liệu vẫn **0 source articles + 0 legacy articles/0 topic**; không chuyển trạng thái thật.
- Không tạo record xuất bản/chuyên gia/quyền hình thật; không nhập prose vào production catalogue.
- UI được xác nhận **không đổi byte source**, chưa khẳng định render/hiệu năng đã được chạy lại.

## 6. Giới hạn còn lại và điểm dừng

1. Cần chạy clean build, scanner CLI và production browser tests khi registry/proxy và dependency hoạt động; chưa đủ bằng chứng đóng nghiệm thu runtime tổng.
2. PublicView mới là descriptor contract; resolver dùng chung chưa nối module homepage/weekly/stage/related29. Topic registry vẫn planning, không có quyền công bố topic ngầm.
3. PreviewView không phải preview server/access control hoàn chỉnh. R1/C1 còn phải bảo đảm entry/output/graph riêng và loopback; F0 không bắt đầu chúng.
4. Validator proof kiểm consistency/integrity, không xác minh người thật/chuyên môn/chữ ký/giấy phép. Human review vẫn bắt buộc.
5. Scanner không hứa phát hiện mọi mã hóa tùy ý hoặc nội dung bị biến đổi thành hình; full graph review và quyền tài sản vẫn cần. Repo nguồn công khai không trở thành riêng tư.
6. Chưa parse/render GFM hoặc đánh giá caption/APA/Bloom trên UI. Nội dung đã nghiệm thu không bị mở lại vòng viết.

**Dừng tại Draft PR F0 để chủ dự án nghiệm thu. Không merge, deploy, publish hoặc tự bắt đầu R1.**
