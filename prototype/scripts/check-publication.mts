import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { loadManifest, selectSourceView, requireThat } from '../build/content-contract.ts'
import { repositoryRoot, selectContent } from '../build/editorial.ts'
import { assertArtifact, createBoundary, scanProduction, FIXTURE_SENTINEL } from '../build/publication-scan.ts'
import { selectWeekly } from '../build/weekly.ts'
import type { Catalogue } from '../editorial/schema.ts'

const catalogue: Catalogue = JSON.parse(readFileSync(resolve(repositoryRoot, 'prototype/editorial/catalogue.json'), 'utf8'))
const manifest = loadManifest(repositoryRoot)
const publicView = selectSourceView(manifest, repositoryRoot, { kind: 'public' })
const legacy = selectContent(catalogue, false)
const weekly = selectWeekly(JSON.parse(readFileSync(resolve(repositoryRoot, 'prototype/editorial/weekly.json'), 'utf8')), catalogue, repositoryRoot)
const boundary = createBoundary(repositoryRoot, manifest, catalogue)
// A negative test of the actual scanner, not a count over an empty catalogue.
const canary = FIXTURE_SENTINEL + 'SCANNER_CANARY'
let detected = false
try { assertArtifact(Buffer.from(canary), 'canary.js', boundary) } catch { detected = true }
requireThat(detected, 'publication scanner did not detect the canary')
const result = scanProduction(repositoryRoot, resolve(repositoryRoot, 'prototype/dist'), manifest, catalogue)
console.log(JSON.stringify({ ...result, sourceView: publicView.kind, publicSourceArticles: publicView.articles.length, publicLegacyArticles: legacy.articles.length, publicLegacyTopics: legacy.topics.length, publicWeeklyTopics: weekly.topics.length, publicWeeklyArticles: weekly.articles.length, currentWeeklyId: weekly.currentId, canary: 'detected' }))
