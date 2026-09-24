import { spawnSync } from 'node:child_process'

const [baseURL = process.env.PLAYWRIGHT_BASE_URL, ...playwrightArgs] = process.argv.slice(2)

if (!baseURL) {
  console.error('Usage: pnpm test:e2e:remote <url> [playwright args]')
  process.exit(1)
}

const result = spawnSync('pnpm', ['exec', 'playwright', 'test', ...playwrightArgs], {
  stdio: 'inherit',
  env: { ...process.env, PLAYWRIGHT_BASE_URL: baseURL },
})

process.exit(result.status ?? 1)
