/// <reference types="vite/client" />
declare module 'virtual:editorial' {
  const content: import('../editorial/schema').Catalogue
  export default content
}
