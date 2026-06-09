import { CarbonFootprint, EmissionBreakdown, Challenge, OffsetProject, ActivityFeedItem, ESGMetrics } from '../types';

// Carbon Footprint Calculations
export function calculateEmissions(footprint: CarbonFootprint): EmissionBreakdown {
  // 1. Transportation (weekly km to annual)
  let transportFactor = 0.18; // gas-car
  if (footprint.transportType === 'electric-car') transportFactor = 0.05;
  if (footprint.transportType === 'public-transit') transportFactor = 0.04;
  if (footprint.transportType === 'bike-walk') transportFactor = 0.0;
  const transportAnnual = footprint.transportation * transportFactor * 52;

  // 2. Travel (Flights)
  const travelAnnual = (footprint.flights * 150) + (footprint.flightsLong * 800);

  // 3. Home / Energy (Electricity monthly to annual + Water daily to annual)
  const electricityAnnual = footprint.electricity * 0.38 * 12;
  const waterAnnual = footprint.water * 0.0003 * 365;
  const homeAnnual = electricityAnnual + waterAnnual;

  // 4. Diet/Food (annual)
  let dietAnnual = 1700; // balanced
  if (footprint.diet === 'meat-heavy') dietAnnual = 2500;
  if (footprint.diet === 'vegetarian') dietAnnual = 1100;
  if (footprint.diet === 'vegan') dietAnnual = 700;

  // 5. Shopping (monthly to annual)
  let shoppingFactor = 50; // moderate
  if (footprint.shopping === 'heavy') shoppingFactor = 120;
  if (footprint.shopping === 'minimal') shoppingFactor = 10;
  const shoppingAnnual = shoppingFactor * 12;

  // 6. Digital (daily hours to annual)
  const digitalAnnual = footprint.digital * 0.05 * 365;

  const total = transportAnnual + travelAnnual + homeAnnual + dietAnnual + shoppingAnnual + digitalAnnual;

  return {
    transport: Math.round(transportAnnual),
    travel: Math.round(travelAnnual),
    home: Math.round(homeAnnual),
    food: Math.round(dietAnnual),
    shopping: Math.round(shoppingAnnual),
    digital: Math.round(digitalAnnual),
    total: Math.round(total),
  };
}

export function getCarbonScoreAndGrade(annualEmissionsKg: number): { score: number; grade: 'A' | 'B' | 'C' | 'D' | 'F' } {
  // National Average is usually around 4,500kg - 16,000kg depending on country. Let's benchmark 8,000 kg CO2e as average.
  // 3,000 or below is excellent (A)
  // 5,000 is good (B)
  // 8,000 is average (C)
  // 12,000 is poor (D)
  // Above 15,000 is very high (F)
  
  let score = 100 - Math.min(95, Math.max(5, (annualEmissionsKg / 150)));
  score = Math.round(score);

  let grade: 'A' | 'B' | 'C' | 'D' | 'F' = 'C';
  if (annualEmissionsKg <= 3000) grade = 'A';
  else if (annualEmissionsKg <= 5500) grade = 'B';
  else if (annualEmissionsKg <= 8500) grade = 'C';
  else if (annualEmissionsKg <= 12000) grade = 'D';
  else grade = 'F';

  return { score, grade };
}

// Benchmarks (kg CO2e / year)
export const BENCHMARKS = {
  localAverage: 4800,
  nationalAverage: 8200,
  globalAverage: 4500,
  targetLimit: 2500 // COP Goal
};

// Initial Footprint
export const defaultFootprint: CarbonFootprint = {
  transportation: 120,
  transportType: 'gas-car',
  flights: 2,
  flightsLong: 1,
  electricity: 280,
  water: 150,
  diet: 'balanced',
  shopping: 'moderate',
  waste: 'moderate-recycling',
  digital: 4,
};

// Mock ESG Corporate Data
export const initialESGMetrics: ESGMetrics = {
  companyName: 'Acme Clean Corp',
  employeeCount: 450,
  totalEmissions: 1824, // tons CO2e
  baselineComparison: 18.4, // % reduction
  participationRate: 72,
  scope1: 410,
  scope2: 654,
  scope3: 760,
  byDepartment: [
    { name: 'Engineering', emissions: 312, members: 160 },
    { name: 'Sales & Marketing', emissions: 580, members: 110 },
    { name: 'Operations & Logistics', emissions: 720, members: 80 },
    { name: 'Human Resources', emissions: 92, members: 40 },
    { name: 'Finance & Legal', emissions: 120, members: 60 }
  ]
};

// Offsets Projects list
export const initialOffsetProjects: OffsetProject[] = [
  {
    id: 'proj-1',
    name: 'Amazon Rainforest Protection',
    category: 'reforestation',
    description: 'Saves critical tracts of ancient woodland from logging, helping native tree species stand durable, and providing vital carbon sink reserves.',
    location: 'Pará State, Brazil',
    rating: 'Gold Standard & Verra Verified',
    pricePerTon: 15.00,
    availableTons: 125000,
    co2eAvoided: 1800000,
    transparencyScore: 98,
    image: 'reforestation_amazon'
  },
  {
    id: 'proj-2',
    name: 'Coastal Blue Carbon & Mangroves',
    category: 'ocean',
    description: 'Restores precious tidal mangrove wetlands in Southeast Asia, packing up to 10x more carbon density than terrestrial forests while safeguarding shoreline biomes.',
    location: 'Sumatra, Indonesia',
    rating: 'Verra VCS + CCB standards',
    pricePerTon: 22.50,
    availableTons: 40000,
    co2eAvoided: 520000,
    transparencyScore: 95,
    image: 'mangrove_restoration'
  },
  {
    id: 'proj-3',
    name: 'Sahara Solar Infrastructure',
    category: 'renewable',
    description: 'Supplies sub-Saharan utility grids with clean photon energy, offsetting carbon-heavy diesel generators and supporting rural electrification pathways.',
    location: 'Ouarzazate, Morocco',
    rating: 'UN Clean Development Mechanism',
    pricePerTon: 11.20,
    availableTons: 350000,
    co2eAvoided: 4500000,
    transparencyScore: 91,
    image: 'sahara_solar'
  },
  {
    id: 'proj-4',
    name: 'Coral Reef & Biodiversity Defense',
    category: 'biodiversity',
    description: 'Deploys bio-rock sea arrays to catalyze endangered coral skeletal growths while restoring seagrass fields storing significant carbon.',
    location: 'Great Barrier Reef, Australia',
    rating: 'Marine Alliance Certified',
    pricePerTon: 29.00,
    availableTons: 15000,
    co2eAvoided: 120000,
    transparencyScore: 97,
    image: 'coral_restoration'
  }
];

// Base Challenges
export const initialChallenges: Challenge[] = [
  {
    id: 'chall-1',
    title: 'No Car Week',
    description: 'Zero driving for 7 straight days. Use walking, public trains, or bicycling instead to build healthy stamina.',
    category: 'transport',
    difficulty: 'hard',
    pointsReward: 350,
    xpReward: 150,
    duration: '7 Days',
    participants: 1240,
    joined: false,
    progress: 0,
    target: '0 km driven'
  },
  {
    id: 'chall-2',
    title: 'Plant-Based Weekends',
    description: 'Ditch the red meats and heavy dairy on Saturday & Sunday and enjoy creative climate-safe cuisines.',
    category: 'food',
    difficulty: 'easy',
    pointsReward: 120,
    xpReward: 50,
    duration: '2 Days / wk',
    participants: 2890,
    joined: true,
    progress: 40,
    target: 'Vegan Saturdays & Sundays'
  },
  {
    id: 'chall-3',
    title: 'Vampire Energy Hunt',
    description: 'Locate and unplug standby gadgets (TVs, chargers, coffee makers) before sleeping or heading to work.',
    category: 'energy',
    difficulty: 'easy',
    pointsReward: 80,
    xpReward: 40,
    duration: 'Daily Habit',
    participants: 1420,
    joined: false,
    progress: 0,
    target: 'Zero vampires plugged'
  },
  {
    id: 'chall-4',
    title: 'Zero Single-Use Plastic',
    description: 'Commit to carrying reusable water tumblers, grocery canvas totes, and rejecting plastic cutlery entirely.',
    category: 'waste',
    difficulty: 'medium',
    pointsReward: 200,
    xpReward: 90,
    duration: '30 Days',
    participants: 940,
    joined: false,
    progress: 0,
    target: '0 items thrown'
  }
];

// Activity feed template
export const initialFeedItems: ActivityFeedItem[] = [
  {
    id: 'feed-1',
    user: 'Amelia Chen',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100',
    action: 'bike commuted to work',
    type: 'positive',
    impact: 3.4,
    timestamp: '2 hours ago',
    reactions: [
      { type: '🌿', count: 12, users: ['user-1', 'user-2'] },
      { type: '🔥', count: 4, users: ['user-3'] }
    ],
    comments: [
      { id: 'c-1', user: 'Marcus Vance', text: 'Stellar drive! Riding in this climate is the ultimate high.', timestamp: '1 hour ago' }
    ]
  },
  {
    id: 'feed-2',
    user: 'Liam Peterson',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100',
    action: 'enjoyed a colorful vegan lunch bowl',
    type: 'positive',
    impact: 1.8,
    timestamp: '4 hours ago',
    reactions: [
      { type: '🌿', count: 8, users: ['user-1'] },
      { type: '❤️', count: 15, users: ['user-4', 'user-5'] }
    ],
    comments: []
  },
  {
    id: 'feed-3',
    user: 'Sarah Jenkins',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100',
    action: 'purchased brand items with fast-shipping',
    type: 'negative',
    impact: 4.8,
    timestamp: 'Yesterday',
    reactions: [
      { type: '😢', count: 3, users: ['user-2'] },
      { type: '💡', count: 6, users: ['user-1'] }
    ],
    comments: [
      { id: 'c-2', user: 'Sophia Green', text: 'Could select carbon-neutral slow shipping next cycle to bypass delivery freight intensity! ❤️', timestamp: '18 hours ago' }
    ]
  }
];
