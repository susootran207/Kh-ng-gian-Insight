import { isAcademicShowcase } from './AcademicNotice'
import catalogue from 'virtual:editorial'
export type { Article, Topic } from '../../editorial/schema'
export const {articles, topics} = catalogue
export function normalizeVietnamese(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/Đ/g,'D').toLocaleLowerCase('vi').trim()
}
export const statusLabel = {draft:isAcademicShowcase?'Bài đọc học thuật':'Bản nháp',in_review:isAcademicShowcase?'Bài đọc học thuật':'Đang chờ duyệt',approved:isAcademicShowcase?'Bài đọc học thuật':'Đã duyệt · Chưa xuất bản',published:isAcademicShowcase?'Bài đọc học thuật':'Đã xuất bản'}
