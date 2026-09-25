import { spawn } from 'node:child_process'

import { devDb, devEnv, runSeed, startLocalDb } from './local-db.ts'

const db = await startLocalDb(devDb)
const env = devEnv(db.uri)

if (db.created && !runSeed(env)) {
  await db.stop()
  process.exit(1)
}

const server = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'dev'], {
  env,
  stdio: 'inherit',
})

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
