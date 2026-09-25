import { spawn, spawnSync } from 'node:child_process'
import { rm } from 'node:fs/promises'

import EmbeddedPostgres from 'embedded-postgres'

const appPort = 3100
const dbPort = 54329
const databaseDir = '.tmp/e2e-db'

await rm(databaseDir, { recursive: true, force: true })

const db = new EmbeddedPostgres({
  databaseDir,
  port: dbPort,
  user: 'postgres',
  password: 'postgres',
  persistent: false,
  onLog: () => undefined,
})

await db.initialise()
await db.start()
await db.createDatabase('rpm_e2e')

const env = {
  ...process.env,
  DATABASE_URI: `postgres://postgres:postgres@localhost:${dbPort}/rpm_e2e`,
  PAYLOAD_SECRET: 'e2e-payload-secret-not-for-production',
  NEXT_PUBLIC_SERVER_URL: `http://localhost:${appPort}`,
}

for (const args of [['migrate'], ['run', 'scripts/e2e-seed.ts']]) {
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
