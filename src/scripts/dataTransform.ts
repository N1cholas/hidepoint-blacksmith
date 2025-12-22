import { resolve } from 'node:path'
import jsonfile from 'jsonfile'
import { type AffixFamily } from '../utils/factory/createAffixFamily'
import { fileURLToPath } from 'node:url'
import { resolve as r, normalize } from 'node:path'
import transformRawAffixData from './transformRawAffixData'
import transformRawEssenceData, { type EssenceGroup } from './transformRawEssenceData'
import type { Affix, RawNormalAffix } from '@/utils/factory/createAffix'
import type { RawEssenceAffix } from '@/utils/factory/createEssenceAffix'
import type { RawDesecratedAffix } from '@/utils/factory/createDesecratedAffix'
import transformRawDesecratedData from './transformRawDesecrated'

export type RawDataFile = {
  normal: RawNormalAffix[]
  essence: RawEssenceAffix[]
  desecrated: RawDesecratedAffix[]
}

export interface DataFile {
  normal: AffixFamily[]
  essence: EssenceGroup[]
  desecrated: Affix[]
}

interface Options {
  input?: string
  output?: string
  spaces?: number
  atomic?: boolean
}

const errorHandler = (err: unknown) => {
  if (err instanceof Error) {
    console.error('[normalAffixesProcessor] Error:', err.message)
    console.error(err.stack)
  } else {
    console.error('[normalAffixesProcessor] Unknown error:', err)
  }
}

async function writeAtomic(path: string, data: DataFile, spaces = 2) {
  const tmp = `${path}.tmp`
  await jsonfile.writeFile(tmp, data, { spaces })
  await fsPromisesRename(tmp, path)
}

async function fsPromisesRename(from: string, to: string) {
  const fs = await import('node:fs/promises')
  await fs.rename(from, to)
}

export async function processMods(opts: Options = {}) {
  const { input, output, spaces, atomic } = opts
  const inputPath = resolve(input!)
  const outputPath = resolve(output!)

  try {
    const raw = (await jsonfile.readFile(inputPath)) as RawDataFile
    const fileContent: DataFile = {
      normal: transformRawAffixData(raw),
      essence: transformRawEssenceData(raw),
      desecrated: transformRawDesecratedData(raw),
    }

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
