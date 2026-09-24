'use client'

import Image from 'next/image'

import ScrollAnimate from '@/components/motion/scroll-animate'
import { Card, CardContent } from '@/components/ui/card'

interface TeamMember {
  name: string
  position?: string
  bio?: string
  image?: { url: string; alt?: string }
}

interface AboutTeamProps {
  title: string
  subtitle: string
  members: TeamMember[]
}

export default function AboutTeam({ title, subtitle, members }: AboutTeamProps) {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <ScrollAnimate variantName="fadeInUp" className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-brandDark lg:text-4xl">{title}</h2>
          <p className="mx-auto max-w-2xl text-lg text-brandMediumGray">{subtitle}</p>
        </ScrollAnimate>

        <ScrollAnimate
          variantName="fadeIn"
          staggerChildren={0.1}
          className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        >
          {members.map((member, index) => (
            <ScrollAnimate key={index} variantName="fadeInUp">
              <Card className="h-full min-h-[400px] transition-shadow hover:shadow-lg">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={member.image?.url || '/placeholder.svg'}
                    alt={member.image?.alt || member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="mb-1 text-xl font-semibold text-brandDark">{member.name}</h3>
                  {member.position && (
                    <p className="mb-3 font-medium text-brandRed">{member.position}</p>
                  )}
                  {member.bio && (
                    <p className="line-clamp-3 text-sm text-brandMediumGray">{member.bio}</p>
                  )}
                </CardContent>
              </Card>
            </ScrollAnimate>
          ))}
        </ScrollAnimate>
      </div>
    </section>
  )
}
