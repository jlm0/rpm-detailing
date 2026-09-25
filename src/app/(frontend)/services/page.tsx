import { PageHero } from '@/components/layout/page-hero'
import SiteFooter from '@/components/layout/site-footer'
import SiteHeader from '@/components/layout/site-header'
import ServicesCta from '@/components/services/services-cta'
import ServicesDetail from '@/components/services/services-detail'
import { getContent, getGlobal } from '@/lib/cms'
import { pageMetadata } from '@/lib/metadata'

export const generateMetadata = () => pageMetadata('services-page', '/services')

export default async function Page() {
  const [page, services] = await Promise.all([getGlobal('services-page'), getContent('services')])

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <SiteHeader />
      <main id="main-content" className="flex flex-1 flex-col">
        <PageHero {...page.hero} />
        <ServicesDetail services={services} labels={page.labels} />
        <ServicesCta {...page.cta} />
      </main>
      <SiteFooter />
    </div>
  )
}
