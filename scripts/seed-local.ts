import { devDb, devEnv, isListening, runSeed, startLocalDb } from './local-db.ts'

const uri = `postgres://postgres:postgres@localhost:${String(devDb.port)}/${devDb.database}`

if (await isListening(devDb.port)) {
  process.exit(runSeed(devEnv(uri)) ? 0 : 1)
}

const db = await startLocalDb(devDb)
const ok = runSeed(devEnv(db.uri))
await db.stop()
process.exit(ok ? 0 : 1)
