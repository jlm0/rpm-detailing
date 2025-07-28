"use client";

import Image from "next/image";

import ScrollAnimate from "@/components/motion/scroll-animate";
import { Card, CardContent } from "@/components/ui/card";

interface TeamMember {
  name: string;
  position?: string;
  bio?: string;
  image?: { url: string; alt?: string };
}

interface AboutTeamProps {
  title: string;
  subtitle: string;
  members: TeamMember[];
}

export default function AboutTeam({ title, subtitle, members }: AboutTeamProps) {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <ScrollAnimate variantName="fadeInUp" className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-brandDark mb-4">
            {title}
          </h2>
          <p className="text-lg text-brandMediumGray max-w-2xl mx-auto">
            {subtitle}
          </p>
        </ScrollAnimate>

        <ScrollAnimate
          variantName="fadeIn"
          staggerChildren={0.1}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {members.map((member, index) => (
            <ScrollAnimate key={index} variantName="fadeInUp">
              <Card className="h-full hover:shadow-lg transition-shadow">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={member.image?.url || "/placeholder.svg"}
                    alt={member.image?.alt || member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-brandDark mb-1">
                    {member.name}
                  </h3>
                  {member.position && (
                    <p className="text-brandRed font-medium mb-3">
                      {member.position}
                    </p>
                  )}
                  {member.bio && (
                    <p className="text-brandMediumGray text-sm">
                      {member.bio}
                    </p>
                  )}
                </CardContent>
              </Card>
            </ScrollAnimate>
          ))}
        </ScrollAnimate>
      </div>
    </section>
  );
}