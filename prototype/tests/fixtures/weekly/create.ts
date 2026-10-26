import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { resolve } from 'node:path'
import type { Article, Catalogue } from '../../../editorial/schema.ts'
import type { WeeklyRegistry, WeeklyTopic } from '../../../editorial/weekly-contract.ts'
import type { ReviewKind, PublicationEvidence } from '../../../editorial/source-contract.ts'
import { REVIEW_KINDS, legacyHashes, sha256 } from '../../../build/content-contract.ts'

export const fixtureNow = Date.parse('2026-10-21T12:00:00+07:00')
export function createWeeklyFixture() {
  const root = mkdtempSync(resolve(tmpdir(),'kgnt-w1-'))
  function published<T extends Article | WeeklyTopic>(input: T): T {
    const hash = legacyHashes(input as unknown as Record<string,unknown>), revision='w1-fixture-r1'
    const records = Object.fromEntries(REVIEW_KINDS.map((kind: ReviewKind) => {
      const record={kind,subjectId:input.slug,revision,...hash,decision:'approved' as const,by:'SYNTHETIC TEST ONLY — no real reviewer',at:'2026-09-01T00:00:00Z'}
      const path='docs/phase-3/publication-records/'+input.slug+'-'+kind+'.json', bytes=JSON.stringify(record)
      mkdirSync(resolve(root,path,'..'),{recursive:true});writeFileSync(resolve(root,path),bytes)
      return [kind,{...record,evidence:{path,sha256:sha256(bytes)}}]
    })) as unknown as PublicationEvidence
    return {...input,status:'published',publishedAt:'2026-09-02T00:00:00Z',publication:{revision,...hash,records,assets:[]}}
  }
  const makeArticle=(slug:string,title:string,season:string):Article=>({slug,title,description:'F0_FIXTURE_ONLY_W1 — trang giả lập để kiểm thứ tự và điều hướng, không phải nội dung tâm lý được duyệt.',topic:'Nhóm đọc giả lập',season,keywords:['trang sách','giả lập'],status:'draft',updated:'2026-09-01',readingMinutes:1,sections:[{id:'thu-doc',heading:'Một trang kiểm thử',paragraphs:['Nội dung giả lập phục vụ kiểm thử giao diện và liên kết. Không có bản nháp đã nghiệm thu nào được chép vào đây.']}],sources:[]})
  const alpha=published(makeArticle('w1-fixture-alpha','Trang sách mở đầu','Đầu năm')),beta=published(makeArticle('w1-fixture-beta','Một trang để đọc tiếp','Mùa thi')),draft=makeArticle('w1-fixture-draft','Trang giả lập chưa có quyền','Mùa thi')
  const makeTopic=(id:string,slug:string,title:string,start:string,end:string,articleSlugs:string[]):WeeklyTopic=>({id,slug,title,description:'Một chuyên đề giả lập để kiểm thứ tự trang đọc và đường quay lại thư viện.',articleSlugs,startsAt:start+'T00:00:00+07:00',endsAt:end+'T00:00:00+07:00',status:'draft'})
  const topics=[published(makeTopic('KGNT-W001','w1-fixture-previous','Nhìn lại nhịp đọc','2026-10-05','2026-10-12',[alpha.slug])),published(makeTopic('KGNT-W002','w1-fixture-current','Một khoảng dừng cùng trang sách','2026-10-19','2026-10-26',[beta.slug,draft.slug,alpha.slug])),published(makeTopic('KGNT-W003','w1-fixture-future','Trang thử của tuần sau','2026-11-02','2026-11-09',[alpha.slug]))]
  const registry:WeeklyRegistry={schemaVersion:1,topics},catalogue:Catalogue={articles:[alpha,beta,draft],topics:[]}
  return {root,registry,catalogue,publish:published,close:()=>rmSync(root,{recursive:true,force:true})}
}
