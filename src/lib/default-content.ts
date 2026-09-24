// Default content for empty arrays in page wrappers

export const defaultValues = [
  {
    title: 'Quality',
    description: 'We never compromise on the quality of our work',
    icon: 'Shield',
  },
  {
    title: 'Experience',
    description: '20+ years of professional auto detailing expertise',
    icon: 'Award',
  },
  {
    title: 'Customer Focus',
    description: 'Your satisfaction is our top priority',
    icon: 'Heart',
  },
]

export const defaultTeamMembers = [
  {
    name: 'John Doe',
    position: 'Lead Detailer',
    bio: 'With over 15 years of experience in auto detailing, John leads our team with passion and expertise.',
    image: undefined,
  },
  {
    name: 'Jane Smith',
    position: 'Detail Specialist',
    bio: 'Jane specializes in paint correction and ceramic coating applications.',
    image: undefined,
  },
]

export const defaultServices = [
  {
    title: 'Basic Detail Package',
    description:
      'Our essential detailing service includes hand wash, interior vacuum, window cleaning, and tire dressing. Perfect for regular maintenance.',
    features: [
      { feature: 'Hand wash and dry' },
      { feature: 'Interior vacuum and wipe down' },
      { feature: 'Window cleaning inside and out' },
      { feature: 'Tire and wheel cleaning' },
    ],
    image: undefined,
    price: 'Starting at $99',
    duration: '2-3 hours',
  },
  {
    title: 'Premium Detail Package',
    description:
      'Our comprehensive detailing service includes everything in the basic package plus clay bar treatment, wax application, and leather conditioning.',
    features: [
      { feature: 'Everything in Basic Package' },
      { feature: 'Clay bar treatment' },
      { feature: 'Premium wax application' },
      { feature: 'Leather/fabric conditioning' },
      { feature: 'Engine bay cleaning' },
    ],
    image: undefined,
    price: 'Starting at $199',
    duration: '4-5 hours',
  },
  {
    title: 'Elite Detail Package',
    description:
      'Our ultimate detailing experience includes paint correction, ceramic coating, and complete interior restoration. The best protection for your vehicle.',
    features: [
      { feature: 'Everything in Premium Package' },
      { feature: 'Paint correction' },
      { feature: 'Ceramic coating application' },
      { feature: 'Complete interior restoration' },
      { feature: 'Headlight restoration' },
      { feature: '1-year warranty' },
    ],
    image: undefined,
    price: 'Starting at $499',
    duration: '8-10 hours',
  },
]
