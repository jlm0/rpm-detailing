import { spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { rm } from 'node:fs/promises'
import { createConnection } from 'node:net'

import EmbeddedPostgres from 'embedded-postgres'

interface LocalDbOptions {
  dir: string
  port: number
  database: string
  fresh?: boolean
}

export async function startLocalDb({ dir, port, database, fresh = false }: LocalDbOptions) {
  if (fresh) await rm(dir, { recursive: true, force: true })
  const created = !existsSync(dir)

  const db = new EmbeddedPostgres({
    databaseDir: dir,
    port,
    user: 'postgres',
    password: 'postgres',
    persistent: !fresh,
    onLog: () => undefined,
  })

  if (created) await db.initialise()
  await db.start()
  if (created) await db.createDatabase(database)

  return {
    created,
    uri: `postgres://postgres:postgres@localhost:${String(port)}/${database}`,
    stop: () => db.stop(),
  }
}

export const devDb = { dir: '.tmp/dev-db', port: 54328, database: 'rpm_dev' }

export const devEnv = (databaseUri: string) => ({
  ...process.env,
  DATABASE_URI: databaseUri,
  PAYLOAD_SECRET: 'local-dev-payload-secret-not-for-production',
  NEXT_PUBLIC_SERVER_URL: 'http://localhost:3000',
})

export const isListening = (port: number) =>
  new Promise<boolean>((resolve) => {
    const socket = createConnection({ port, host: 'localhost' })
    socket.once('connect', () => {
      socket.end()
      resolve(true)
    })
    socket.once('error', () => {
      resolve(false)
    })
  })

export const runSeed = (env: NodeJS.ProcessEnv) =>
  spawnSync('pnpm', ['payload', 'run', 'scripts/seed.ts'], { env, stdio: 'inherit' }).status === 0
