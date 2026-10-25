// Build-side data only. The browser still consumes the existing Catalogue.
// R1 may attach a GFM AST; F0 never imports Markdown into the application.
export type EditorialStatus = 'draft' | 'in_review' | 'approved' | 'published'
export type FileReference = { path: string; sha256: string }
export type ReviewKind = 'editorialApproval' | 'expertReview' | 'readerQA' | 'learnerReview' | 'publicationAuthorization' | 'assetRights'
export interface ReviewRecord {
  kind: ReviewKind
  subjectId: string
  revision: string
  contentHash: string
  revisionHash: string
  decision: 'approved'
  by: string
  at: string
  evidence: FileReference
}
export interface PublicationEvidence {
  editorialApproval: ReviewRecord
  expertReview: ReviewRecord
  readerQA: ReviewRecord
  learnerReview: ReviewRecord
  publicationAuthorization: ReviewRecord
}
export type DossierName = 'REFERENCES' | 'CLAIM-AUDIT' | 'BLOOM-REVIEW' | 'VISUAL-REVIEW' | 'EDITORIAL-REVIEW'
export interface SourceAsset extends FileReference {
  id: string
  revision: string
  alt: string
  rights: ReviewRecord | null
}
export interface SourceMetadata {
  title: string
  collection: 'core' | 'extension'
  topic: string
  season: 'Đầu năm' | 'Giữa học kỳ' | 'Mùa thi' | 'Sau thi'
  keywords: string[]
  audience: ('THCS' | 'THPT')[]
  bloom: { remember: string; understand: string; apply: string }
  topicIds: string[]
  relatedArticleIds: string[]
}
export interface SourceArticle {
  id: string
  slug: string
  revision: string
  source: FileReference
  contentHash: string
  revisionHash: string
  metadata: SourceMetadata
  referenceUrls: string[]
  dossiers: Record<DossierName, FileReference>
  assets: SourceAsset[]
  status: EditorialStatus
  publication: PublicationEvidence | null
  publishedAt: string | null
}
export interface SourceManifest {
  schemaVersion: 1
  sourceCommit: string
  topicRegistry: { id: string; articleIds: string[] }[]
  articles: SourceArticle[]
}
export interface PreviewView {
  kind: 'preview'
  host: '127.0.0.1'
  articles: SourceArticle[]
}
export interface PublicDescriptor {
  id: string
  slug: string
  revision: string
  metadata: SourceMetadata
  source: FileReference
  assets: Pick<SourceAsset, 'id' | 'path' | 'sha256' | 'alt'>[]
}
export interface PublicView {
  kind: 'public'
  articles: PublicDescriptor[]
}
// Optional on legacy UI samples; mandatory, verified records for published items.
export interface LegacyPublication {
  revision: string
  contentHash: string
  revisionHash: string
  records: PublicationEvidence
  assets: SourceAsset[]
}
