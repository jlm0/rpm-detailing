import type { Payload, RequestContext } from 'payload'

import type { Service } from '@/payload-types'

import { localAccounts } from './accounts'
import { photo, socialCard, wordmark } from './images'

const context: RequestContext = { disableRevalidate: true }
const published = { _status: 'published' } as const

const richText = (...paragraphs: string[]): Service['description'] => ({
  root: {
    type: 'root',
    version: 1,
    direction: 'ltr',
    format: '',
    indent: 0,
    children: paragraphs.map((text) => ({
      type: 'paragraph',
      version: 1,
      direction: 'ltr',
      format: '',
      indent: 0,
      textFormat: 0,
      textStyle: '',
      children: [
        { type: 'text', version: 1, text, format: 0, style: '', mode: 'normal', detail: 0 },
      ],
    })),
  },
})

const link = (label: string, url: string) => ({ label, url })

async function upsertUsers(payload: Payload) {
  for (const account of [localAccounts.admin, localAccounts.editor]) {
    const { docs } = await payload.find({
      collection: 'users',
      where: { email: { equals: account.email } },
      limit: 1,
      context,
    })
    const existing = docs[0]
    if (existing) {
      await payload.update({ collection: 'users', id: existing.id, data: account, context })
    } else {
      await payload.create({ collection: 'users', data: account, context })
    }
  }
}

async function clearContent(payload: Payload) {
  for (const collection of ['services', 'testimonials', 'brands', 'media'] as const) {
    await payload.delete({ collection, where: { id: { exists: true } }, trash: true, context })
  }
}

export async function seed(payload: Payload) {
  payload.logger.info('Seeding local accounts')
  await upsertUsers(payload)

  payload.logger.info('Clearing content')
  await clearContent(payload)

  payload.logger.info('Uploading photos')
  const upload = async (
    name: string,
    alt: string,
    file: Promise<{ data: Buffer; mimetype: string }>,
  ) => {
    const { data, mimetype } = await file
    const extension = mimetype === 'image/png' ? 'png' : 'jpg'
    const doc = await payload.create({
      collection: 'media',
      data: { alt },
      file: { data, mimetype, name: `${name}.${extension}`, size: data.length },
      context,
    })
    return doc.id
  }

  const [
    logo,
    shareImage,
    heroBackground,
    aboutImage,
    galleryWash,
    galleryPolish,
    galleryCoating,
    restoreImage,
    protectImage,
    maintainImage,
    stepWash,
    stepCorrection,
    stepInterior,
    stepProtection,
    servicesHero,
    aboutHero,
    storyImage,
    teamLead,
  ] = await Promise.all([
    upload('rpm-logo', 'RPM Detailing', wordmark('RPM DETAILING', '#ffffff')),
    upload(
      'share-image',
      'A freshly detailed black sedan in the RPM Detailing studio',
      socialCard('hero'),
    ),
    upload('hero', 'A freshly detailed black sedan gleaming under studio lights', photo('hero')),
    upload(
      'about',
      'Detailer hand-finishing glossy black paint with a microfibre cloth',
      photo('about'),
    ),
    upload('gallery-wash', 'Snow foam hand wash on a black sports car', photo('gallery-wash')),
    upload(
      'gallery-polish',
      'Machine polisher removing swirl marks from black paint',
      photo('gallery-polish'),
    ),
    upload(
      'gallery-coating',
      'Ceramic coating being applied to a car hood',
      photo('gallery-coating'),
    ),
    upload('restore', 'Before-and-after paint correction on a car door', photo('restore')),
    upload('protect', 'Water beading on a ceramic-coated red car hood', photo('protect')),
    upload('maintain', 'A spotless black SUV after a maintenance wash', photo('maintain')),
    upload('step-wash', 'Pressure washing snow foam off a black coupe', photo('step-wash')),
    upload(
      'step-correction',
      'Detailer machine polishing the side of a black sports car',
      photo('step-correction'),
    ),
    upload('step-interior', 'Detailer brushing clean a leather car seat', photo('step-interior')),
    upload(
      'step-protection',
      'Paint protection film being applied to a front bumper',
      photo('step-protection'),
    ),
    upload(
      'services-hero',
      'A detailed black coupe in the RPM Detailing studio',
      photo('services-hero'),
    ),
    upload('about-hero', 'The RPM Detailing garage at dusk', photo('about-hero')),
    upload('story', 'Detailer inspecting paint with a swirl-finder light', photo('story')),
    upload('team-lead', 'Portrait of the lead detailer', photo('team-lead')),
  ])

  payload.logger.info('Creating services, testimonials and brands')
  const restore = await payload.create({
    collection: 'services',
    context,
    data: {
      ...published,
      title: 'Restore',
      price: '$299',
      duration: '4-6 hours',
      summary:
        "Our restoration process goes beyond surface cleaning—it's a meticulous, multi-stage transformation designed to bring your vehicle back to its original beauty, or better.",
      description: richText(
        "Our restoration process goes beyond surface cleaning—it's a meticulous, multi-stage transformation designed to bring your vehicle back to its original beauty, or better. We use advanced techniques and premium products to reverse years of wear and damage.",
      ),
      features: [
        'Multi-stage paint correction',
        'Deep interior cleaning and conditioning',
        'Engine bay detailing',
        'Headlight restoration',
        'Trim and plastic restoration',
        'Full vehicle decontamination',
      ].map((feature) => ({ feature })),
      image: restoreImage,
    },
  })
  const protect = await payload.create({
    collection: 'services',
    context,
    data: {
      ...published,
      title: 'Protect',
      price: '$599',
      duration: '6-8 hours',
      summary:
        'At RPM, we use only the highest-quality protective products to ensure your vehicle looks its best and stays that way. Our detailing solutions offer superior resistance against UV rays, road grime, water spots, and environmental contaminants.',
      description: richText(
        'At RPM, we use only the highest-quality protective products to ensure your vehicle looks its best and stays that way. Our protective solutions offer superior resistance against UV rays, road grime, water spots, and environmental contaminants.',
      ),
      features: [
        'Ceramic coating application',
        'Paint protection film (PPF)',
        'Interior protection coating',
        'Glass coating for improved visibility',
        'Wheel and caliper coating',
        '2-5 year warranty options',
      ].map((feature) => ({ feature })),
      image: protectImage,
    },
  })
  const maintain = await payload.create({
    collection: 'services',
    context,
    data: {
      ...published,
      title: 'Maintain — RPM+',
      price: '$99/month',
      duration: '2-3 hours per visit',
      summary: 'RPM+ (Subscription service – more to come)',
      description: richText(
        'Our exclusive RPM+ subscription service ensures your vehicle maintains its showroom condition year-round. Regular maintenance is key to preserving your investment and extending the life of protective coatings.',
      ),
      features: [
        'Monthly maintenance washes',
        'Quarterly deep cleaning',
        'Priority booking',
        'Member-only pricing on additional services',
        'Annual coating inspection and touch-up',
        'Complimentary interior refreshers',
      ].map((feature) => ({ feature })),
      image: maintainImage,
    },
  })

  for (const testimonial of [
    {
      name: 'Mark Farell',
      title: 'Client of Company',
      review:
        "The team at RPM is meticulous. My car hasn't looked this good since it left the showroom. The paint correction was flawless.",
    },
    {
      name: 'Jessica Block',
      title: 'Satisfied Customer',
      review:
        'Very impressed. Friendly, very efficient and knowledgeable. The interior detail was extremely thorough. Will call on them again.',
    },
    {
      name: 'Nelly Popins',
      title: 'Regular Client',
      review:
        "I'm on the RPM+ maintenance plan and it's worth every penny. My car always looks pristine, and the convenience is unbeatable.",
    },
  ]) {
    await payload.create({
      collection: 'testimonials',
      context,
      data: { ...published, ...testimonial },
    })
  }

  for (const make of ['Porsche', 'BMW', 'Audi', 'Mercedes', 'Tesla', 'Ford']) {
    const logoId = await upload(
      `brand-${make.toLowerCase()}`,
      make,
      wordmark(make.toUpperCase(), '#ffffff', 400, 120),
    )
    await payload.create({
      collection: 'brands',
      context,
      data: { ...published, name: make, logo: logoId },
    })
  }

  payload.logger.info('Publishing site settings, header and footer')
  await payload.updateGlobal({
    slug: 'site-settings',
    context,
    data: {
      ...published,
      business: {
        name: 'RPM Detailing',
        phone: '(425) 345-3564',
        email: 'support@rpm-detailing.com',
        address: 'Boise, ID, USA',
        hours: [
          { days: 'Mon - Fri', time: '8:00 am - 6:00 pm' },
          { days: 'Saturday', time: '9:00 am - 4:00 pm' },
          { days: 'Sunday', time: 'Closed' },
        ],
        yearsOfExperience: 5,
      },
      branding: { logo, brandColor: '#D9232D' },
      seo: {
        siteUrl: process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://localhost:3000',
        titleSuffix: '| RPM Detailing',
        description:
          "Transform your vehicle with RPM Detailing's premium auto detailing services in Boise. Ceramic coating, paint correction, and full interior/exterior detailing.",
        keywords:
          'auto detailing, car detailing, ceramic coating, paint correction, Boise, Idaho, RPM Detailing',
        image: shareImage,
      },
      notFound: {
        title: 'Page Not Found',
        message: "The page you're looking for doesn't exist or has been moved.",
        buttonLabel: 'Back to Homepage',
      },
    },
  })

  await payload.updateGlobal({
    slug: 'header',
    context,
    data: {
      ...published,
      navItems: [
        { label: 'Home', type: 'link', url: '/' },
        { label: 'Services', type: 'link', url: '/services' },
        { label: 'About', type: 'link', url: '/about' },
        { label: 'Testimonials', type: 'link', url: '/#testimonials' },
        { label: 'Contact', type: 'contact' },
      ],
      showCta: true,
      cta: link('Book Now', '/booking'),
      mobileMenu: {
        title: 'Menu',
        openLabel: 'Toggle mobile menu',
        closeLabel: 'Close mobile menu',
      },
      contactPopup: {
        title: 'Get In Touch',
        contactHeading: 'Contact Info',
        hoursHeading: 'Opening Hours',
        ctaHeading: 'Need Help?',
        ctaText: 'Ready for a showroom shine? Book your car detailing appointment today!',
        ctaButton: link('Book Now', '/booking'),
        closeLabel: 'Close contact details',
      },
    },
  })

  await payload.updateGlobal({
    slug: 'footer',
    context,
    data: {
      ...published,
      description:
        "Your trusted partner for premium car detailing services. We restore and protect your vehicle's beauty with meticulous care.",
      contactHeading: 'Contact Info',
      hoursHeading: 'Opening Hours',
      cta: {
        heading: 'Need Help?',
        text: 'Ready for a showroom shine? Book your car detailing appointment today!',
        button: link('Book Now', '/booking'),
      },
      copyright: '© {year} RPM Detailing. All rights reserved.',
    },
  })

  payload.logger.info('Publishing pages')
  await payload.updateGlobal({
    slug: 'home-page',
    context,
    data: {
      ...published,
      hero: {
        slides: [
          {
            eyebrow: '// PREMIUM CAR DETAILING',
            title: 'Advanced Detailing Solutions for Your Prized Automobile',
          },
          {
            eyebrow: '// CERAMIC COATING & PPF',
            title: 'Protect Your Investment with Expert Care',
          },
          { eyebrow: '// PAINT CORRECTION', title: 'Restore Your Vehicle to Showroom Condition' },
        ],
        backgroundImage: heroBackground,
        cta: link('Book Now', '/booking'),
        showPhone: true,
        phoneLabel: 'Call Us:',
        showAddress: true,
      },
      servicesBar: {
        items: [
          { label: 'Exterior Wash', icon: 'SprayCan' },
          { label: 'Interior Detail', icon: 'Car' },
          { label: 'Paint Correction', icon: 'Sparkles' },
          { label: 'Ceramic Coating', icon: 'ShieldCheck' },
          { label: 'Wheel & Tire Care', icon: 'Palette' },
          { label: 'Odor Removal', icon: 'Wind' },
        ],
      },
      about: {
        eyebrow: '// WHY CHOOSE RPM DETAILING',
        title: 'Expert Car Detailing Since 2020',
        body: "Modern vehicle finishes and interiors require specialized care. Our detailing service excels by combining advanced techniques, premium products, and highly skilled technicians to restore and protect your vehicle's beauty. Trust RPM Detailing for meticulous attention to detail.",
        image: aboutImage,
        badgeLabel: 'Years of Experience',
        cta: link('Book Now', '/booking'),
      },
      transformation: {
        eyebrow: '// COMPLETE TRANSFORMATION',
        title: 'We Offer Comprehensive Detailing for Your Car',
        body: "From a meticulous hand wash to full paint correction and ceramic coatings, we provide a complete suite of detailing services. We're the preferred choice for discerning car owners who value quality and lasting results.",
        features: [
          'Premium hand wash and decontamination',
          'Multi-stage paint correction and polishing',
          'Durable ceramic coatings and paint protection',
        ].map((feature) => ({ feature })),
        gallery: [galleryWash, galleryPolish, galleryCoating],
      },
      packages: {
        eyebrow: 'OUR DETAILING PACKAGES',
        title: 'Transform Your Vehicle with Our Expert Detailing',
        services: [restore.id, protect.id, maintain.id],
        cardButton: link('Book Now', '/booking'),
        viewAll: link('View All Services', '/services'),
      },
      ctaBanner: {
        eyebrow: '// EXPERIENCE THE DIFFERENCE',
        heading: "Rediscover Your Car's Beauty, Hassle-Free",
        steps: [
          {
            title: 'Choose Your Package',
            description:
              'Select from our range of detailing packages or tell us your specific needs for a custom quote.',
            icon: 'Car',
          },
          {
            title: 'Schedule Your Detail',
            description:
              'Pick a convenient date and time. We offer flexible scheduling, including mobile services at your location.',
            icon: 'CalendarDays',
          },
          {
            title: 'Enjoy a Pristine Car',
            description:
              'Our experts will meticulously detail your vehicle, leaving it looking and feeling brand new. Satisfaction guaranteed!',
            icon: 'Wrench',
          },
        ],
        button: link('Book Now', '/booking'),
      },
      process: {
        eyebrow: '// OUR DETAILING METHOD',
        title: 'Our Meticulous Detailing Process',
        steps: [
          { title: 'Wash & Decon', image: stepWash },
          { title: 'Paint Correction', image: stepCorrection },
          { title: 'Interior Finishing', image: stepInterior },
          { title: 'Protection', image: stepProtection },
        ],
        stats: [
          { value: '858', label: 'Happy Clients', icon: 'Users' },
          { value: '984', label: 'Vehicles Detailed', icon: 'Car' },
          { value: '29', label: 'Years of Detailing', icon: 'Settings2' },
          { value: '55', label: 'Detailing Awards', icon: 'Award' },
        ],
      },
      testimonials: {
        eyebrow: 'CLIENT LOVE',
        title: 'What Our Clients Say About Our Detailing',
      },
      brands: {
        title: 'We Detail All Makes and Models',
        button: link('Book Your Make', '/booking'),
      },
    },
  })

  await payload.updateGlobal({
    slug: 'services-page',
    context,
    data: {
      ...published,
      hero: {
        title: 'Our Premium Detailing Services',
        subtitle: 'Professional auto detailing services tailored to your needs',
        image: servicesHero,
      },
      labels: {
        includes: 'Service Includes:',
        price: 'Starting at',
        bookButton: link('Book This Service', '/booking'),
      },
      cta: {
        title: 'Ready to Transform Your Vehicle?',
        text: 'Schedule your detailing service today and experience the RPM difference.',
        button: link('Book Now', '/booking'),
      },
    },
  })

  await payload.updateGlobal({
    slug: 'about-page',
    context,
    data: {
      ...published,
      hero: {
        title: 'About RPM Detailing',
        subtitle: 'Your trusted partner in premium auto detailing',
        image: aboutHero,
      },
      story: {
        title: 'Our Story',
        content: richText(
          'RPM Detailing was founded with a passion for excellence and a commitment to providing the highest quality auto detailing services.',
        ),
        image: storyImage,
      },
      values: {
        title: 'Our Core Values',
        subtitle: 'These principles guide everything we do and define who we are as a company',
        items: [
          {
            title: 'Quality',
            description: 'We never compromise on the quality of our work',
            icon: 'Shield',
          },
          {
            title: 'Experience',
            description: 'Years of professional auto detailing expertise',
            icon: 'Award',
          },
          {
            title: 'Customer Focus',
            description: 'Your satisfaction is our top priority',
            icon: 'Heart',
          },
        ],
      },
      team: {
        title: 'Meet Our Team',
        subtitle: 'Dedicated professionals passionate about auto detailing',
        members: [
          {
            name: 'Lead Detailer',
            position: 'Founder',
            bio: 'Leads every detail with passion and expertise.',
            photo: teamLead,
          },
        ],
      },
      cta: {
        title: "Let's Work Together",
        button: link('Book Now', '/booking'),
      },
    },
  })

  await payload.updateGlobal({
    slug: 'booking-page',
    context,
    data: {
      ...published,
      calendar: { enabled: true, calLink: 'rpm-detailing' },
      content: {
        backLabel: 'Back to Home',
        title: 'Book Your Detailing Service',
        intro:
          "Schedule your professional car detailing appointment with {business}. Choose a convenient time and we'll take care of the rest.",
        loadingText: 'Loading booking calendar...',
        helpText: 'Having trouble booking? Contact us directly:',
        phoneLabel: 'Phone:',
        emailLabel: 'Email:',
      },
      calendarError: {
        title: 'Unable to load the booking calendar',
        message: 'Please try again, or give us a call and we will book you in.',
        retryLabel: 'Try Again',
        callLabel: 'Or call us directly:',
      },
      unavailable: {
        title: 'Online booking is currently unavailable',
        message: 'Please call us at {phone} to schedule your detailing service.',
        buttonLabel: 'Go Back Home',
      },
    },
  })

  payload.logger.info('Seed complete')
}
