import { spawn, spawnSync } from 'node:child_process'
import { rm } from 'node:fs/promises'

import { startLocalDb } from './local-db.ts'

const appPort = 3100

const mediaDir = '.tmp/e2e-media'
await Promise.all([
  rm(mediaDir, { recursive: true, force: true }),
  rm('.next/cache/fetch-cache', { recursive: true, force: true }),
])

const db = await startLocalDb({ dir: '.tmp/e2e-db', port: 54329, database: 'rpm_e2e', fresh: true })

const env = {
  ...process.env,
  DATABASE_URI: db.uri,
  PAYLOAD_SECRET: 'e2e-payload-secret-not-for-production',
  NEXT_PUBLIC_SERVER_URL: `http://localhost:${String(appPort)}`,
  PAYLOAD_MEDIA_DIR: mediaDir,
}

for (const args of [['migrate'], ['run', 'scripts/seed.ts']]) {
  const result = spawnSync('pnpm', ['payload', ...args], { env, stdio: 'inherit' })
  if (result.status !== 0) {
    await db.stop()
    process.exit(result.status ?? 1)
  }
}

const server = spawn(
  process.execPath,
  ['node_modules/next/dist/bin/next', 'start', '--port', String(appPort)],
  { env, stdio: ['ignore', 'inherit', 'inherit'] },
)

let stopping = false
const stop = async (code: number) => {
  if (stopping) return
  stopping = true
  server.kill('SIGTERM')
  await db.stop()
  process.exit(code)
}

process.on('SIGINT', () => void stop(0))
process.on('SIGTERM', () => void stop(0))
server.on('exit', (code) => void stop(code ?? 0))
