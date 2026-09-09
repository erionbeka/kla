import type { ArchiveCategory, ArchiveItem, Lang, Scene } from './content'

type Glob = Record<string, string>

const files: Glob = import.meta.glob('../assets/archive/**/*.{jpg,jpeg,png,webp,gif,mp4,webm,mov}', {
  eager: true,
  as: 'url',
})

const manifests: unknown[] = (function pull() {
  const m = import.meta.glob('../assets/archive/**/manifest.json', { eager: true, import: 'default' })
  const out: unknown[] = []
  for (const key of Object.keys(m)) {
    if (key.endsWith('/manifest.json')) out.push(m[key])
  }
  return out
})()

interface ManifestEntry {
  file: string
  cat?: ArchiveCategory
  title?: Lang
  date?: Lang
  loc?: Lang
  source?: Lang
  desc?: Lang
}

interface Manifest {
  items?: ManifestEntry[]
}

const CAT_HINTS: Array<[RegExp, ArchiveCategory]> = [
  [/haga|hage|hagë|dënimi|gjykata|vlac|court/i, 'HAGA'],
  [/fjal(i|im)|mikro|speech/i, 'FJALIME'],
  [/korn|kron|marsh|rend|kane|protest/i, 'KRONOLOGJI'],
  [/akt|let|dok|urdher|vendim|skoc/i, 'DOKUMENTE'],
  [/foto|fot|gjend|muze|portret/i, 'FOTOGRAFI'],
]

const SCENE_HINTS: Array<[RegExp, string]> = [
  [/konvo|ik|larg/i, 'refugee'],
  [/shtep|trupa|roje|prit/i, 'house'],
  [/gjyk|court|sall|bank/i, 'court'],
  [/fjal|mikro|platform/i, 'mic'],
  [/dok|akt|let|urdher|skoc/i, 'paper'],
  [/marsh|kane|crowd|protest/i, 'crowd'],
  [/portret|fytyr/i, 'portrait'],
  [/luft|front|zjar|betej/i, 'ruins'],
  [/flam|flag/i, 'flag'],
]

function slugLabel(file: string): string {
  const base = file.split('/').pop() || file
  const name = base.replace(/\.[a-z0-9]+$/i, '').replace(/^\d{4}[-_]?/, '')
  const words = name.split(/[-_]+/).filter(Boolean)
  return words
    .map((s) => (s.length > 0 ? s[0].toUpperCase() + s.slice(1) : s))
    .join(' ')
    .trim()
}

function isVideo(file: string): boolean {
  return /\.(mp4|webm|mov)$/i.test(file)
}

function hintCat(file: string): ArchiveCategory {
  const base = '/' + (file.split('/').pop() || '')
  for (const [re, cat] of CAT_HINTS) if (re.test(base)) return cat
  return isVideo(file) ? 'FOTOGRAFI' : 'FOTOGRAFI'
}

function hintSceneKind(file: string): string {
  const base = '/' + (file.split('/').pop() || '')
  for (const [re, kind] of SCENE_HINTS) if (re.test(base)) return kind
  return 'landscape'
}

export function getRealItems(): ArchiveItem[] {
  const manifest: Manifest = (manifests[0] as Manifest) || {}
  const byFile = new Map<string, ManifestEntry>()
  for (const e of manifest.items || []) byFile.set(e.file, e)

  const out: ArchiveItem[] = []
  const entries = Object.entries(files).filter(([path]) => !path.endsWith('/manifest.json'))
  for (const [path, url] of entries) {
    const base = path.split('/').pop() || path
    const meta = byFile.get(base)
    const year = base.match(/^\d{4}/)?.[0] ?? ''
    const title = meta?.title || { sq: slugLabel(base), en: slugLabel(base) }
    const placeholder: Lang = { sq: 'Material i ruajtur', en: 'Preserved material' }
    out.push({
      id: `r${out.length + 1}`,
      cat: (meta?.cat || hintCat(base)) as ArchiveCategory,
      title,
      date: meta?.date || { sq: year || '———', en: year || '———' },
      loc: meta?.loc || { sq: '—', en: '—' },
      source: meta?.source || placeholder,
      desc:
        meta?.desc ||
        ({ sq: 'Material i ruajtur në arkivin lokal. Detajet e kreditimit duhet të plotësohen nga burime të licensuara.', en: 'Material preserved in the local archive. Credit details should be completed from licensed sources.' } as Lang),
      scene: {
        kind: hintSceneKind(base) as Scene['kind'],
        label: title,
        source: placeholder,
        placeholder: false,
      },
      kind: 'image' as const,
      media: { url, isVideo: isVideo(base) },
    })
  }
  return out.sort((a, b) => (a.date.sq < b.date.sq ? -1 : 1))
}