import view from 'virtual:weekly'
import type {WeeklyTopicView} from '../../editorial/weekly-contract'
export const weeklyView = view
export const currentWeekly = view.topics.find(t => t.id === view.currentId)
export function weeklyLabel(topic: WeeklyTopicView) {
  if(view.upcoming?.some(t=>t.id===topic.id))return 'Sắp tới · chỉ xem nội bộ'
  if(topic.id===view.currentId)return view.reason==='fallback'?'Chuyên đề gần nhất':'Chuyên đề đang mở'
  return 'Đã qua · có thể đọc lại'
}
export function weeklyPeriod(topic:WeeklyTopicView) {
  const format=new Intl.DateTimeFormat('vi-VN',{timeZone:'Asia/Ho_Chi_Minh',day:'2-digit',month:'2-digit',year:'numeric'})
  return format.format(new Date(topic.startsAt))+' – trước '+format.format(new Date(topic.endsAt))+' (UTC+07:00)'
}
