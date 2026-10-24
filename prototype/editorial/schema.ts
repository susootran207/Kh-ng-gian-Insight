export type Status = 'draft' | 'in_review' | 'approved' | 'published'
export interface Article {
  slug: string; title: string; description: string; topic: string; season: string;
  keywords: string[]; status: Status; updated: string; readingMinutes: number;
  sections: {id: string; heading: string; paragraphs: string[]; note?: string}[];
  sources: {title: string; url: string}[];
  approval?: {by: string; at: string; revision: string}; publishedAt?: string;
}
export interface Topic {
  slug: string; title: string; description: string; status: Status;
  articleSlugs: string[]; approval?: Article['approval']; publishedAt?: string;
}
export interface Catalogue {articles: Article[]; topics: Topic[]}
