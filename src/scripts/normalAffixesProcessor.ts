import { resolve } from 'node:path'
import jsonfile from 'jsonfile'
import { groupBy } from 'lodash-es'
import { newAffix, type Affix } from '../utils/factory/newAffix'
import { newAffixFamily, type AffixFamily } from '../utils/factory/newAffixFamily'
import { fileURLToPath } from 'node:url'
import { resolve as r, normalize } from 'node:path'

export type RawNormalAffix = {
  Name: string
  Level: string
  ModGenerationTypeID: string
  ModFamilyList: string[]
  DropChance: string
  str: string
  fossil_no: string[]
  mod_no: string[]
  mod_fossil_item: string[]
  hover: string
}

export type RawFile = {
  normal: RawNormalAffix[]
}

export interface FileContent {
  normal: AffixFamily[]
}

interface Options {
  input?: string
  output?: string
  spaces?: number
  atomic?: boolean
}

const defaultOptions: Options = {
  input: 'src/scripts/rawData/bow.json',
  output: 'src/scripts/data/bow.json',
  spaces: 2,
  atomic: true,
}

const errorHandler = (err: unknown) => {
  if (err instanceof Error) {
    console.error('[normalAffixesProcessor] Error:', err.message)
    console.error(err.stack)
  } else {
    console.error('[normalAffixesProcessor] Unknown error:', err)
  }
}

function transform(raw: RawFile): FileContent {
  if (!raw || !Array.isArray(raw.normal)) {
    throw new Error('Invalid input file: missing "normal" array')
  }

  const affixes: Affix[] = raw.normal.map(newAffix)

  const grouped: Record<string, Affix[]> = groupBy(affixes, 'id')

  const families: AffixFamily[] = Object.values(grouped)
    .map(newAffixFamily)
    .sort((a) => (a.isPrefix ? -1 : 1))

  return { normal: families }
}

async function writeAtomic(path: string, data: FileContent, spaces = 2) {
  const tmp = `${path}.tmp`
  await jsonfile.writeFile(tmp, data, { spaces })
  await fsPromisesRename(tmp, path)
}

async function fsPromisesRename(from: string, to: string) {
  const fs = await import('node:fs/promises')
  await fs.rename(from, to)
}

export async function processMods(opts: Options = {}) {
  const { input, output, spaces, atomic } = { ...defaultOptions, ...opts }
  const inputPath = resolve(input!)
  const outputPath = resolve(output!)

  try {
    const raw = (await jsonfile.readFile(inputPath)) as RawFile
    const fileContent = transform(raw)

    if (atomic) {
      await writeAtomic(outputPath, fileContent, spaces)
    } else {
      await jsonfile.writeFile(outputPath, fileContent, { spaces })
    }

    console.log(`[normalAffixesProcessor] Done: ${outputPath}`)
  } catch (error) {
    errorHandler(error)
    throw error
  }
}

// 直接执行
const isMain =
  process.argv[1] && normalize(fileURLToPath(import.meta.url)) === normalize(r(process.argv[1]!))

if (isMain) {
  processMods().catch(() => (process.exitCode = 1))
}
