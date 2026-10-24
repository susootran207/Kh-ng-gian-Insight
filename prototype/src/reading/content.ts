import catalogue from 'virtual:editorial'
export type { Article, Topic } from '../../editorial/schema'
export const {articles, topics} = catalogue
export function normalizeVietnamese(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/Đ/g,'D').toLocaleLowerCase('vi').trim()
}
export const statusLabel = {draft:'Bản nháp',in_review:'Đang chờ duyệt',approved:'Đã duyệt · Chưa xuất bản',published:'Đã xuất bản'}
