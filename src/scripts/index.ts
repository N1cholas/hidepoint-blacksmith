import { readdir } from 'node:fs/promises'
import { resolve, join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { processMods } from './dataTransform'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const rawDataDir = resolve(__dirname, 'rawData')
const dataDir = resolve(__dirname, 'data')

async function processAllFiles() {
  try {
    const files = await readdir(rawDataDir)
    const jsonFiles = files.filter((file) => file.endsWith('.json'))

    for (const file of jsonFiles) {
      const inputPath = join(rawDataDir, file)
      const outputPath = join(dataDir, file)

      console.log(`Processing ${inputPath}...`)
      await processMods({
        input: inputPath,
        output: outputPath,
      })
    }

    console.log('All files processed successfully.')
  } catch (error) {
    console.error('An error occurred during processing:', error)
    process.exit(1)
  }
}

processAllFiles()
