declare module 'virtual:r1-fixture' {
  import type { ReaderDocument } from '../../src/reading/markdown/model'
  const fixture: { fixtureId: string; title: string; description: string; document: ReaderDocument }
  export default fixture
}
