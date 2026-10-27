import type { Topic, Article } from './schema'
// Uses the existing F0 legacy-catalogue publication records; source articles do
// not inherit eligibility from a matching slug or from the planned T01–T09 registry.
export interface WeeklyTopic extends Topic {
  id: string
  startsAt: string
  endsAt: string
}
export interface WeeklyRegistry { schemaVersion: 1; topics: WeeklyTopic[] }
export interface WeeklyTopicView {
  id: string; slug: string; title: string; description: string
  startsAt: string; endsAt: string; articleSlugs: string[]
}
export interface WeeklyView {
  showcase?: true
  preview?: true
  upcoming?: WeeklyTopicView[]
  selectedAt: string
  reason: 'scheduled' | 'fallback' | 'empty'
  currentId: string | null
  topics: WeeklyTopicView[]
  articles: Article[]
}
