import type { EditorialStatus, LegacyPublication } from './source-contract'
export type Status = EditorialStatus
export interface Article {
  illustration?: number
  id?: string
  revision?: string
  collection?: string
  relatedSlugs?: string[]
  document?: import('../src/reading/markdown/model.ts').ReaderDocument
  slug: string; title: string; description: string; topic: string; season: string;
  keywords: string[]; status: Status; updated: string; readingMinutes: number;
  sections: {id: string; heading: string; paragraphs: string[]; note?: string}[];
  sources: {title: string; url: string}[];
  publication?: LegacyPublication;
  approval?: {by: string; at: string; revision: string}; publishedAt?: string;
}
export interface Topic {
  slug: string; title: string; description: string; status: Status;
  articleSlugs: string[]; publication?: LegacyPublication; approval?: Article['approval']; publishedAt?: string;
}
export interface Catalogue {articles: Article[]; topics: Topic[]}
