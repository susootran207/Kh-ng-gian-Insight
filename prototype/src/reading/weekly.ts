import view from 'virtual:weekly'
export const weeklyView = view
export const currentWeekly = view.topics.find(t => t.id === view.currentId)
