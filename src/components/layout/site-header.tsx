import { getGlobal, image } from '@/lib/cms'

import SiteHeaderClient from './site-header-client'

export default async function SiteHeader() {
  const [header, settings] = await Promise.all([getGlobal('header'), getGlobal('site-settings')])

  return (
    <SiteHeaderClient
      header={header}
      business={settings.business}
      logo={image(settings.branding.logo, 'thumbnail')}
    />
  )
}
