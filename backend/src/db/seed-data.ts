export const seedCategories = [
  {
    id: 'category-workspace',
    slug: 'workspace',
    name: 'Workspace',
    description:
      'Products that help people build comfortable and productive desks.',
    imageUrl: '/images/products/ergonomic-stand.png',
  },
  {
    id: 'category-audio',
    slug: 'audio',
    name: 'Audio',
    description: 'Teaching-friendly examples for accessories with variants and pricing.',
    imageUrl: '/images/products/noise-lite.png',
  },
  {
    id: 'category-travel',
    slug: 'travel',
    name: 'Travel',
    description: 'Compact products ideal for showcasing public catalog browsing.',
    imageUrl: '/images/products/field-notes.png',
  },
  {
    id: 'category-learning',
    slug: 'learning-tools',
    name: 'Learning Tools',
    description: 'Small utilities perfect for seed data and admin demos.',
    imageUrl: '/images/products/learning-tools.png',
  },
] as const;

export const seedProducts = [
  {
    id: 'product-ergonomic-stand',
    slug: 'ergonomic-monitor-stand',
    name: 'Ergonomic Monitor Stand',
    shortDescription: 'Raises laptops and monitors while keeping cables organized.',
    description:
      'A clean starter product that demonstrates descriptive catalog copy, category relationships, inventory, and admin editing.',
    price: 79.0,
    inventory: 28,
    status: 'published',
    featured: true,
    categoryId: 'category-workspace',
    learningNotes: [
      'Great example of a featured product rendered on the home page.',
      'Shows how category relationships travel from Prisma to the frontend card.',
    ],
    imageUrl: '/images/products/ergonomic-stand.png',
  },
  {
    id: 'product-noise-lite',
    slug: 'noise-lite-headphones',
    name: 'Noise Lite Headphones',
    shortDescription: 'Comfortable over-ear headphones used to teach pricing and status badges.',
    description:
      'This item is intentionally straightforward so juniors can trace its path from seed script to Prisma to Express JSON and finally into a reusable product card.',
    price: 129.0,
    inventory: 12,
    status: 'published',
    featured: true,
    categoryId: 'category-audio',
    learningNotes: [
      'Good candidate for a dynamic product detail route.',
      'Highlights the difference between mock arrays and backend payloads.',
    ],
    imageUrl: '/images/products/noise-lite.png',
  },
  {
    id: 'product-field-notes-kit',
    slug: 'field-notes-kit',
    name: 'Field Notes Kit',
    shortDescription: 'Portable notebook set used in the travel category.',
    description:
      'A compact physical product that makes category filtering easy to explain during onboarding demos.',
    price: 24.0,
    inventory: 64,
    status: 'published',
    featured: false,
    categoryId: 'category-travel',
    learningNotes: [
      'Useful on category pages because it belongs to a smaller collection.',
      'Keeps the catalog domain simple without adding checkout complexity.',
    ],
    imageUrl: '/images/products/field-notes.png',
  },
  {
    id: 'product-retro-timer',
    slug: 'retro-focus-timer',
    name: 'Retro Focus Timer',
    shortDescription: 'A desk timer that helps explain CRUD mutations in the admin area.',
    description:
      'The admin panel uses this record to demonstrate editing, deleting, and validation feedback without introducing real authentication.',
    price: 42.0,
    inventory: 15,
    status: 'draft',
    featured: false,
    categoryId: 'category-learning',
    learningNotes: [
      'Draft status helps compare public versus admin concerns.',
      'Perfect for showing controlled forms and backend validation errors.',
    ],
    imageUrl: '/images/products/retro-timer.png',
  },
  {
    id: 'product-travel-dock',
    slug: 'travel-dock-mini',
    name: 'Travel Dock Mini',
    shortDescription: 'A mini dock chosen to represent products with richer descriptions.',
    description:
      'This item gives the product detail page enough content to explain route files, server components, and the data-mode toggle in one place.',
    price: 96.0,
    inventory: 7,
    status: 'published',
    featured: true,
    categoryId: 'category-travel',
    learningNotes: [
      'Pairs well with the detail route explanation on /products/[id].',
      'Useful when teaching how metadata could be generated from backend data later.',
    ],
    imageUrl: '/images/products/travel-dock.png',
  },
  {
    id: 'product-wave-microphone',
    slug: 'wave-usb-microphone',
    name: 'Wave USB Microphone',
    shortDescription: 'A classroom-friendly product for audio category filters.',
    description:
      'The microphone rounds out the dataset with a second audio item so developers can practice filtering, grouping, and table displays.',
    price: 149.0,
    inventory: 21,
    status: 'published',
    featured: false,
    categoryId: 'category-audio',
    learningNotes: [
      'Supports category examples and admin table sorting conversations.',
      'Keeps the catalog realistic while remaining easy to reason about.',
    ],
    imageUrl: '/images/products/wave-microphone.png',
  },
] as const;
