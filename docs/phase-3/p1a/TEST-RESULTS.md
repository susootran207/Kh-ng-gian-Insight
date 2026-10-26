# P1A — Kiểm chứng thực chạy và giới hạn

Nền kiểm: `d7a6fa5bb978504df4e318df6049660a23fabd72`, Node24.19.0/npm11.9.0, dependency cài theo lockfile bằng `npm ci --ignore-scripts`. Không đổi dependency, ứng dụng hoặc workflow để làm test xanh. Log trong [verification](verification/).

## Kiểm thực chạy local

Các lệnh npm dưới đây chạy với `--prefix prototype`; validators chạy từ root repository. `content:manifest -- --check` là chế độ chỉ đọc, không sinh lại manifest.

| Lệnh / nội dung | Kết quả | Bằng chứng và giới hạn |
|---|---|---|
| `git fetch origin main`; đối chiếu main GitHub và PR26 | PASS, PR26 merged; main đúng SHA nền | Đọc trạng thái GitHub và cây Git; không dùng báo cáo người dùng thay kiểm |
| Đọc29 ARTICLE +145dossier +29SVG | Hoàn tất đối chiếu nội bộ bằng AI | Phiếu từng bài dẫn dòng ở SHA nền; SVG kiểm chữ/XML, không render mới. Không phải chuyên môn độc lập |
| `python3 docs/phase-3/validate.py` | PASS cấu trúc | [phase3.log](verification/phase3.log),29profiles/ID/slug/relations, growth30 và doc links |
| `python3 docs/phase-3/audit-3-2/validate.py` | PASS_structural_only | [audit32.log](verification/audit32.log), bốn mẫu r2; không xác minh học thuật |
| `python3 docs/phase-3/batches/B01/validate.py` | PASS cấu trúc năm bài | [B01.log](verification/B01.log),98liên kết nội bộ; source/Bloom chỉ cấu trúc |
| `python3 docs/phase-3/batches/B02/validate.py` |818checks,0errors | [B02.log](verification/B02.log); không scientific/expert approval |
| `python3 docs/phase-3/batches/B03/validate.py` |870checks,0errors | [B03.log](verification/B03.log); không scientific/expert approval |
| `python3 docs/phase-3/batches/B04/validate.py` |924checks,0errors | [B04.log](verification/B04.log); không scientific/expert approval |
| `python3 docs/phase-3/batches/B05/validate.py` |1096checks,0errors | [B05.log](verification/B05.log); không scientific/expert approval |
| `npm run content:manifest -- --check` | PASS,29records unchanged; no publication grants | [manifest.log](verification/manifest.log); ID/slug/revision/metadata/URL/asset/dossier và canonical hash qua mã hiện hành |
| `npm run test:f0` | PASS22/22;0skip | [f0.log](verification/f0.log); path traversal/duplicate/hash/proof/rights/date mismatch, fixture30, scanner negative/canary và boundary |
| `npm run test:r1` | PASS12/12;0skip | [r1.log](verification/r1.log); GFM/source map/safety/asset/fixture graph; không browser |
| `npm run test:c1` | PASS34/34;0skip | [c1.log](verification/c1.log);29case bài + compiler/metadata/fidelity và preview guard. Không thay bằng chứng thử đọc/SR |
| `npm run build` | PASS typecheck/Vite + publication scanner | [build.log](verification/build.log);29outputfiles,29withheld,4335markers, source/legacy/weekly public0, canary detected |
| `python3 docs/phase-3/p1a/validate.py` | PASS bộ hồ sơ/toàn vẹn | [p1a.log](verification/p1a.log);29uniqueIDs,4r2/25r1,203hash và756blob nền không đổi; fullhash/line links/manifest/quyền giữ nguyên |
| `git diff --check` / kiểm phạm vi diff | PASS khi bàn giao | Chỉ tệp mới dưới docs/phase-3/p1a; không đổi blob đã có |

Scanner PASS nghĩa artifact fresh được bộ phòng vệ hiện hành chấp nhận, gồm canary âm thực sự bị phát hiện; không chứng minh mọi cách mã hóa/paraphrase/raster tùy ý đều được phát hiện. Không có deploy hoặc upload artifact production.

## Nguồn ngoài: BLOCKED môi trường

[119lượt GET](SOURCE-ACCESS.json) qua proxy/TLS hợp lệ:119 CONNECT403,0retrieved,0direct academic verification. Có71URL bibliography duy nhất trong manifest; các lượt khác là bản đọc và đầu mối hồ sơ, bao gồm nguồn nền/không dùng. Không gọi119 là119nghiên cứu hoặc119nguồn khoa học đã kiểm.

Lỗi thực: `URLError: <urlopen error Tunnel connection failed: 403 Forbidden>`. `httpStatus=null`, `proxyTunnelStatus=403`; chưa nhận response từ nguồn đích. Không sửa DOI/URL hoặc suy nguồn không tồn tại vì lỗi môi trường. Chưa làm được corrections/retractions/update verification và xác minh license bên ngoài. Giữ UNVERIFIED, không PASS bằng suy đoán.

## Chưa chạy trong P1A

Không chạy browser/Axe, native zoom200%, screen reader, Safari/Firefox, thiết bị vật lý, thử học sinh/giáo viên hoặc reviewer chuyên môn/quyền độc lập. Không chụp screenshot mới vì không đổi UI và ảnh không chứng minh học thuật. Không gọi viewport giả lập là thiết bị thật hoặc Nodefidelity là DOM mới. Báo cáo C1/R1/G1 trước đó là lịch sử theo SHA, không ghi lại thành lượt kiểm P1A.

Không chạy W1/D1/G1/N1 browser hoặc toàn suite UI local vì chỉ thêm tài liệu; CI hiện hữu sẽ chạy các gate Node/build/scanner của workflow tại head PR. Kết quả CI và đúng head SHA/run được ghi trong mô tả Draft PR sau khi kiểm GitHub; chưa thấy run kết thúc thì không gọi CI PASS. Workflow không có browser hoặc validator P1A/Python nên local log là bằng chứng của các bước đó, không gán cho CI.

Quyền/chuyên môn/5review/assetRights: chưa có bằng chứng thật đủ trong manifest được kiểm; không tự tạo chứng cứ. Đây là blocker phê duyệt/công bố, không phải test kỹ thuật FAIL. Release theo phương án A vẫn BLOCKED cho tới đủ29/29 và quyền29SVG.
