import Image from 'next/image'

import Reveal from '@/components/motion/reveal'
import { SectionHeading } from '@/components/ui/section-heading'
import { image } from '@/lib/cms'
import type { AboutPage } from '@/payload-types'

type AboutTeamProps = AboutPage['team'] & {
  members: NonNullable<AboutPage['team']['members']>
}

export default function AboutTeam({ title, subtitle, members }: AboutTeamProps) {
  return (
    <section className="bg-white py-20 md:py-28 lg:py-36">
      <div className="container mx-auto px-4">
        <SectionHeading
          title={title}
          description={subtitle}
          align="center"
          className="mb-14 md:mb-16"
        />

        <Reveal stagger order={1} className="flex flex-wrap justify-center gap-x-6 gap-y-12">
          {members.map((member, index) => {
            const photo = image(member.photo, 'card')
            return (
              <Reveal
                key={member.id ?? index}
                className="w-full max-w-sm sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
              >
                <figure>
                  {photo && (
                    <div className="relative mb-6 aspect-[4/5] overflow-hidden rounded-lg bg-brandInk">
                      <Image
                        src={photo.url}
                        alt={photo.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                      />
                    </div>
                  )}
                  <figcaption>
                    <p className="text-xs font-semibold tracking-[0.2em] text-brandRed uppercase">
                      {member.position}
                    </p>
                    <h3 className="mt-2 text-2xl font-bold text-brandInk">{member.name}</h3>
                    {member.bio && (
                      <p className="mt-3 leading-relaxed text-brandMediumGray">{member.bio}</p>
                    )}
                  </figcaption>
                </figure>
              </Reveal>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}
