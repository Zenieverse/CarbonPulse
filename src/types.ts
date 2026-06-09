export interface CarbonFootprint {
  transportation: number; // km per week
  transportType: 'electric-car' | 'gas-car' | 'public-transit' | 'bike-walk';
  flights: number; // short-haul flights per year (under 3h)
  flightsLong: number; // long-haul flights per year (over 3h)
  electricity: number; // kWh per month
  water: number; // liters per day
  diet: 'meat-heavy' | 'balanced' | 'vegetarian' | 'vegan';
  shopping: 'heavy' | 'moderate' | 'minimal';
  waste: 'unrecycled' | 'moderate-recycling' | 'zero-waste';
  digital: number; // hours of streaming/day
}

export interface EmissionBreakdown {
  transport: number; // kg CO2e
  food: number;
  home: number;
  shopping: number;
  travel: number;
  digital: number;
  total: number;
}

export interface UserProfile {
  email: string;
  name: string;
  tier: 'free' | 'premium' | 'business' | 'enterprise';
  greenPoints: number;
  xp: number;
  streak: number;
  level: number;
  levelName: 'Eco Starter' | 'Green Explorer' | 'Climate Champion' | 'Carbon Warrior' | 'Net Zero Hero';
  isInnovator?: boolean;
  badge?: string;
  avatar?: string;
}

export interface ActivityFeedItem {
  id: string;
  user: string;
  avatar: string;
  action: string;
  type: 'positive' | 'negative';
  impact: number; // kg CO2e saved or added
  timestamp: string;
  reactions: { type: string; count: number; users: string[] }[];
  comments: { id: string; user: string; text: string; timestamp: string }[];
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  category: 'transport' | 'food' | 'energy' | 'waste';
  difficulty: 'easy' | 'medium' | 'hard';
  pointsReward: number;
  xpReward: number;
  duration: string;
  participants: number;
  joined: boolean;
  progress: number; // 0 to 100
  target: string;
}

export interface OffsetProject {
  id: string;
  name: string;
  category: 'reforestation' | 'renewable' | 'ocean' | 'biodiversity';
  description: string;
  location: string;
  rating: string;
  pricePerTon: number; // USD
  availableTons: number;
  co2eAvoided: number; // total kg or tons
  transparencyScore: number; // 0-100
  image: string;
}

export interface ESGMetrics {
  companyName: string;
  employeeCount: number;
  totalEmissions: number; // tons CO2e
  baselineComparison: number; // percentage decrease
  participationRate: number; // % employees
  scope1: number; // direct
  scope2: number; // indirect (electricity)
  scope3: number; // supply chain
  byDepartment: { name: string; emissions: number; members: number }[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
  isPdfBillAnalysis?: boolean;
}
