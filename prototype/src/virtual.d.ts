/// <reference types="vite/client" />
declare module 'virtual:editorial' {
  const content: import('../editorial/schema').Catalogue
  export default content
}

declare module 'virtual:weekly' {
  const view: import('../editorial/weekly-contract').WeeklyView
  export default view
}
