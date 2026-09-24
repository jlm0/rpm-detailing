import { spawnSync, type SpawnSyncOptions } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import { parseEnv } from 'node:util'

const target = process.argv[2]

if (target !== 'preview' && target !== 'production') {
  console.error('Usage: node scripts/deploy.ts <preview|production>')
  process.exit(1)
}

if (!existsSync('.vercel/project.json')) {
  console.error('This checkout is not linked to Vercel. Run `pnpm exec vercel link` first.')
  process.exit(1)
}

const prodFlag = target === 'production' ? ['--prod'] : []

function run(command: string, args: string[], options: SpawnSyncOptions = {}) {
  console.log(`\n▶ ${command} ${args.join(' ')}`)
  const result = spawnSync(command, args, { stdio: 'inherit', ...options })
  if (result.status !== 0) {
    console.error(`\n✖ ${command} ${args.join(' ')} failed`)
    process.exit(result.status ?? 1)
  }
  return result
}

run('pnpm', ['check'])
run('pnpm', ['test:e2e'])

run('pnpm', ['exec', 'vercel', 'pull', '--yes', `--environment=${target}`])
const targetEnv = {
  ...process.env,
  ...parseEnv(readFileSync(`.vercel/.env.${target}.local`, 'utf8')),
}

run('pnpm', ['payload', 'migrate'], { env: targetEnv })
run('pnpm', ['exec', 'vercel', 'build', ...prodFlag])

const deploy = run('pnpm', ['exec', 'vercel', 'deploy', '--prebuilt', ...prodFlag], {
  stdio: ['inherit', 'pipe', 'inherit'],
  encoding: 'utf8',
})
const url = String(deploy.stdout).trim().split('\n').at(-1)

if (!url?.startsWith('https://')) {
  console.error(`\n✖ Could not read the deployment URL from Vercel output:\n${deploy.stdout}`)
  process.exit(1)
}

run('node', ['scripts/e2e-remote.ts', url], { env: targetEnv })

console.log(`\n✔ ${target} deployed and verified: ${url}`)
