import AboutCta from '@/components/about/about-cta'
import AboutStory from '@/components/about/about-story'
import AboutTeam from '@/components/about/about-team'
import AboutValues from '@/components/about/about-values'
import { PageHero } from '@/components/layout/page-hero'
import SiteFooter from '@/components/layout/site-footer'
import SiteHeader from '@/components/layout/site-header'
import { getGlobal } from '@/lib/cms'
import { pageMetadata } from '@/lib/metadata'

export const generateMetadata = () => pageMetadata('about-page', '/about')

export default async function Page() {
  const { hero, story, values, team, cta } = await getGlobal('about-page')

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <SiteHeader />
      <main className="flex flex-1 flex-col">
        <PageHero {...hero} />
        <AboutStory {...story} />
        <AboutValues {...values} />
        {team.members && team.members.length > 0 && <AboutTeam {...team} members={team.members} />}
        <AboutCta {...cta} />
      </main>
      <SiteFooter />
    </div>
  )
}
