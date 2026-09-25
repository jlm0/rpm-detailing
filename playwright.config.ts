import { defineConfig, devices } from '@playwright/test'

const remoteBaseURL = process.env.PLAYWRIGHT_BASE_URL
const bypassSecret = process.env.VERCEL_AUTOMATION_BYPASS_SECRET

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: true,
  retries: remoteBaseURL ? 1 : 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: remoteBaseURL ?? 'http://localhost:3100',
    trace: 'retain-on-failure',
    extraHTTPHeaders: bypassSecret
      ? { 'x-vercel-protection-bypass': bypassSecret, 'x-vercel-set-bypass-cookie': 'true' }
      : undefined,
  },
  projects: [
    {
      name: 'desktop',
      use: { ...devices['Desktop Chrome'] },
      grepInvert: remoteBaseURL ? /@local|@mobile/ : /@mobile/,
    },
    {
      name: 'mobile',
      use: { ...devices['Pixel 7'] },
      grepInvert: remoteBaseURL ? /@local/ : undefined,
      testIgnore: /(admin|api|cms|headers|seo)\.spec\.ts/,
    },
  ],
  webServer: remoteBaseURL
    ? undefined
    : {
        command: 'node scripts/e2e-server.ts',
        url: 'http://localhost:3100',
        reuseExistingServer: false,
        timeout: 180_000,
      },
})
