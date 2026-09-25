import { AboutSection } from '@/components/home/about-section'
import { BrandsSection } from '@/components/home/brands-section'
import { CtaBannerSection } from '@/components/home/cta-banner-section'
import { HeroSection } from '@/components/home/hero-section'
import { PackagesSection } from '@/components/home/packages-section'
import { ProcessSection } from '@/components/home/process-section'
import { ServicesBar } from '@/components/home/services-bar'
import { TestimonialsSection } from '@/components/home/testimonials-section'
import SiteFooter from '@/components/layout/site-footer'
import SiteHeader from '@/components/layout/site-header'
import { getContent, getGlobal, populated } from '@/lib/cms'
import { pageMetadata } from '@/lib/metadata'

export const generateMetadata = () => pageMetadata('home-page', '/')

export default async function Home() {
  const [home, settings, testimonials, brands] = await Promise.all([
    getGlobal('home-page'),
    getGlobal('site-settings'),
    getContent('testimonials'),
    getContent('brands'),
  ])
  const services = await populated(home.packages.services)
  const servicesBarItems = home.servicesBar.items

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <SiteHeader />
      <main id="main-content" className="flex flex-1 flex-col">
        <HeroSection hero={home.hero} business={settings.business} />
        {servicesBarItems.length > 0 && <ServicesBar items={servicesBarItems} />}
        <AboutSection
          about={home.about}
          transformation={home.transformation}
          yearsOfExperience={settings.business.yearsOfExperience}
        />
        <PackagesSection packages={home.packages} services={services} />
        <CtaBannerSection ctaBanner={home.ctaBanner} />
        <ProcessSection process={home.process} />
        {testimonials.length > 0 && (
          <TestimonialsSection section={home.testimonials} testimonials={testimonials} />
        )}
        {brands.length > 0 && <BrandsSection section={home.brands} brands={brands} />}
      </main>
      <SiteFooter />
    </div>
  )
}
