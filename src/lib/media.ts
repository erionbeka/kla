import type { ArchiveCategory, ArchiveItem, Lang, Scene } from './content'

type Glob = Record<string, string>

const files: Glob = import.meta.glob('../assets/archive/**/*.{jpg,jpeg,png,webp,gif,mp4,webm,mov}', {
  eager: true,
  as: 'url',
})

const memorialFiles: Glob = import.meta.glob('../assets/archive/memorial/**/*.{jpg,jpeg,png,webp,gif,mp4,webm,mov}', {
  eager: true,
  as: 'url',
})

const heroFiles: Glob = import.meta.glob('../assets/archive/hero/**/*.{jpg,jpeg,png,webp,gif,mp4,webm,mov}', {
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

export interface MediaItem {
  url: string
  isVideo: boolean
  credit?: string
}

const PROFILE_FILES: Record<string, string> = {
  thaci: '2020-portret-thaci.jpg',
  veseli: '2020-portret-veseli.jpg',
  krasniqi: '2020-portret-krasniqi.jpg',
}

const byBasename = Object.fromEntries(Object.entries(files).map(([p, u]) => [p.split('/').pop(), u]))

export function getProfilePhoto(id: string): string | null {
  const name = PROFILE_FILES[id]
  return name ? byBasename[name] ?? null : null
}

const MEMORIAL_CREDITS: Record<string, string> = {
  '01-uck.png': 'UÇK · Wikimedia Commons · CC BY-SA 4.0',
  '02-refugees-743.jpg': 'Refugjatë 1999 · H. Kienzle · CC BY 4.0',
  '03-refugees-807.jpg': 'Refugjatë 1999 · H. Kienzle · CC BY 4.0',
  '04-idp-camp.jpg': 'Kampe të zhvendosurve · NATO · Domen publik',
  '05-refugees-808.jpg': 'Refugjatë 1999 · H. Kienzle · CC BY 4.0',
  '06-us-refugees.jpg': 'Refugjatë me zyrtarë të SHBA-së · Domen publik',
}

function toMedia(list: [string, string][]): MediaItem[] {
  return list
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([path, url]) => ({
      url,
      isVideo: /\.(mp4|webm|mov)$/i.test(url),
      credit: MEMORIAL_CREDITS[path.split('/').pop() ?? ''],
    }))
}

export function getMemorialFrames(): MediaItem[] {
  return toMedia(Object.entries(memorialFiles))
}

export function getHeroBackdrop(): string | null {
  const stills = Object.entries(heroFiles).filter(([, u]) => !/\.(mp4|webm|mov)$/i.test(u))
  return stills.length > 0 ? stills[0][1] : null
}

export function getRealItems(): ArchiveItem[] {
  const manifest: Manifest = (manifests[0] as Manifest) || {}
  const byFile = new Map<string, ManifestEntry>()
  for (const e of manifest.items || []) byFile.set(e.file, e)

  const out: ArchiveItem[] = []
  const entries = Object.entries(files).filter(
    ([path]) => !path.endsWith('/manifest.json') && !/\/memorial\//.test(path) && !/\/hero\//.test(path),
  )
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