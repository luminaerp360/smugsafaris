export interface TourPackage {
  id: string;
  title: string;
  tagline: string;
  duration: string;
  durationDays: number;
  destinations: string[];
  style: 'Wildlife & Big Five' | 'Great Migration' | 'Bush & Beach' | 'Luxury Flying Safari' | 'Family & Group' | 'Honeymoon';
  tier: 'Budget Camping' | 'Mid-Range Comfort' | 'Luxury Tented Camp';
  priceUSD: number;
  originalPriceUSD?: number;
  featured: boolean;
  bestSeller?: boolean;
  heroImage: string;
  galleryImages: string[];
  overview: string;
  highlights: string[];
  maxGroupSize: number;
  physicalRating: 'Easy' | 'Moderate' | 'Active';
  bestMonths: string;
  included: string[];
  excluded: string[];
  itinerary: {
    day: number;
    title: string;
    description: string;
    meals: string;
    accommodation: string;
  }[];
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  tagline: string;
  description: string;
  image: string;
  bestTimeToVisit: string;
  keyWildlife: string[];
  highlights: string[];
  relatedTourIds: string[];
}

export interface Review {
  id: string;
  author: string;
  country: string;
  countryCode: string;
  date: string;
  rating: number;
  tourTaken: string;
  comment: string;
  avatarBg: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: 'Travel Tips' | 'Migration Guide' | 'Wildlife Insights' | 'Planning';
  readTime: string;
  publishDate: string;
  author: string;
  summary: string;
  content: string[];
  image: string;
}

export interface TravelService {
  id: string;
  title: string;
  tagline: string;
  description: string;
  iconName: string;
  features: string[];
}

export const TOURS_DATA: TourPackage[] = [
  {
    id: 'classic-kenya-big-five',
    title: '7-Day Classic Kenya Big Five Safari',
    tagline: 'Maasai Mara, Lake Nakuru & Amboseli with Mt. Kilimanjaro Views',
    duration: '7 Days / 6 Nights',
    durationDays: 7,
    destinations: ['Maasai Mara', 'Lake Nakuru', 'Amboseli'],
    style: 'Wildlife & Big Five',
    tier: 'Mid-Range Comfort',
    priceUSD: 1850,
    originalPriceUSD: 2100,
    featured: true,
    bestSeller: true,
    heroImage: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=800&q=80',
    ],
    overview: 'Our flagship 7-day Kenya safari journeys through the country’s most iconic reserves: the world-renowned Maasai Mara for predators and plains game, Lake Nakuru for rhinos and flamingos, and Amboseli where massive elephant herds graze beneath the majestic snow peak of Mount Kilimanjaro.',
    highlights: [
      'Search for all Big Five (Lion, Leopard, Elephant, Rhino, Cape Buffalo)',
      'Magnificent views of snow-capped Mt. Kilimanjaro at sunrise',
      'Visit both Black and White Rhino sanctuaries at Lake Nakuru',
      'Optional dawn Hot Air Balloon Safari with champagne breakfast over the Mara',
      'Exclusive travel in customized 4x4 Safari Land Cruisers with pop-up roofs',
    ],
    maxGroupSize: 7,
    physicalRating: 'Easy',
    bestMonths: 'Year-Round (Best Jul-Oct & Jan-Mar)',
    included: [
      'All national park entry and conservation fees',
      '6 nights premium safari lodge / tented camp accommodation',
      'Full board meals (Breakfast, Lunch, Dinner) on safari',
      'Private 4x4 Safari Land Cruiser with pop-up roof & unlimited game drives',
      'Professional KPSGA-certified English-speaking safari driver-guide',
      'Bottled mineral water inside the vehicle throughout the tour',
      'Complimentary airport transfers in Nairobi',
      'Flying Doctors emergency medical evacuation cover',
    ],
    excluded: [
      'International flights and Kenya eVisa fees',
      'Optional hot air balloon flight over Maasai Mara ($450 per person)',
      'Maasai cultural village visit fee ($25-30 per person)',
      'Gratuities and tips for safari driver-guide & camp staff',
      'Personal travel insurance and alcoholic beverages',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Nairobi to Amboseli National Park',
        description: 'Morning pickup from your Nairobi hotel or airport. Journey south through picturesque Maasai plains to Amboseli National Park. Arrive in time for lunch at your lodge, followed by an afternoon game drive seeking large elephant herds with Kilimanjaro in the backdrop.',
        meals: 'Lunch, Dinner',
        accommodation: 'Amboseli Serena Safari Lodge or Kilima Safari Camp',
      },
      {
        day: 2,
        title: 'Full Day Game Drives in Amboseli',
        description: 'Early morning game drive to catch clear views of Mt. Kilimanjaro before cloud cover gathers. Visit the Observation Hill for a panoramic view of swamps teeming with hippos and water birds. Spend the afternoon tracking cheetahs, lions, and giraffes.',
        meals: 'Breakfast, Lunch, Dinner',
        accommodation: 'Amboseli Serena Safari Lodge or Kilima Safari Camp',
      },
      {
        day: 3,
        title: 'Amboseli to Lake Nakuru National Park',
        description: 'Depart Amboseli after an early breakfast, traveling northwest through the Great Rift Valley escarpment. Arrive at Lake Nakuru in the afternoon for a game drive around the soda lake, famous for rhinos, Rothschild giraffes, and waterbirds.',
        meals: 'Breakfast, Lunch, Dinner',
        accommodation: 'Lake Nakuru Sopa Lodge or Sarova Lion Hill',
      },
      {
        day: 4,
        title: 'Lake Nakuru to Maasai Mara National Reserve',
        description: 'Morning drive south into the world-famous Maasai Mara Game Reserve. Enter the park with a game drive en route to your camp. Enjoy a late afternoon sunset safari in search of the resident pride of lions.',
        meals: 'Breakfast, Lunch, Dinner',
        accommodation: 'Mara Serena Safari Lodge or Ashnil Mara Camp',
      },
      {
        day: 5,
        title: 'Full Day Wildlife Tracking in Maasai Mara',
        description: 'A full day exploring the endless savannah plains with picnic lunches near the Mara River. Watch out for hippos, giant Nile crocodiles, leopards resting in acacia branches, and vast herds of zebras and gazelles.',
        meals: 'Breakfast, Picnic Lunch, Dinner',
        accommodation: 'Mara Serena Safari Lodge or Ashnil Mara Camp',
      },
      {
        day: 6,
        title: 'Second Full Day in Maasai Mara or Optional Balloon Safari',
        description: 'Optional pre-dawn hot air balloon flight over the reserve followed by bush champagne breakfast. Continue game drives focusing on cheetah hunts, elephant herds, and an optional afternoon visit to an authentic Maasai Manyatta village.',
        meals: 'Breakfast, Lunch, Dinner',
        accommodation: 'Mara Serena Safari Lodge or Ashnil Mara Camp',
      },
      {
        day: 7,
        title: 'Maasai Mara to Nairobi Departure',
        description: 'Final early morning sunrise game drive in the Mara. Return to camp for breakfast, check out, and scenic drive back to Nairobi. Drop-off at your hotel or Jomo Kenyatta International Airport for your flight home.',
        meals: 'Breakfast, Lunch en route',
        accommodation: 'Departure (End of Safari)',
      },
    ],
  },
  {
    id: 'maasai-mara-great-migration',
    title: '4-Day Maasai Mara Great Migration Spectacle',
    tagline: 'Witness the Greatest Wildlife Wonder on Earth at the Mara River',
    duration: '4 Days / 3 Nights',
    durationDays: 4,
    destinations: ['Maasai Mara National Reserve'],
    style: 'Great Migration',
    tier: 'Luxury Tented Camp',
    priceUSD: 1380,
    originalPriceUSD: 1550,
    featured: true,
    bestSeller: true,
    heroImage: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=800&q=80',
    ],
    overview: 'An intensive safari focused entirely on the world-renowned Maasai Mara. Designed to put you at the heart of predator-prey dynamics, spectacular wildebeest river crossings, and endless golden savannah skies.',
    highlights: [
      'Front-row positioning near key Mara River crossing points',
      'Encounter huge lion prides, cheetah coalitions, and stealthy leopards',
      'Stay in luxury tented camps situated along migratory corridors',
      'Sunrise and golden-hour sunset game drives for prime wildlife photography',
      'Custom 4x4 with 360-degree pop-up roof and individual window seats',
    ],
    maxGroupSize: 6,
    physicalRating: 'Easy',
    bestMonths: 'July to October (Peak Migration), Dec-Mar (Green Season)',
    included: [
      'All Maasai Mara park and conservation fees',
      '3 nights luxury tented camp accommodation',
      'Full board gourmet dining (Breakfast, Lunch, Dinner)',
      'Dedicated 4x4 Safari Land Cruiser with experienced wildlife tracker-guide',
      'Unlimited game drives across the reserve',
      'Flying Doctors emergency medical cover',
      'Round-trip private transport from Nairobi',
    ],
    excluded: [
      'Hot air balloon safari ($450 pp)',
      'Maasai cultural village fee ($30 pp)',
      'Driver-guide and camp staff gratuities',
      'Beverages not specified and laundry',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Nairobi to Maasai Mara Reserve',
        description: 'Depart Nairobi early morning, descending down the dramatic Great Rift Valley viewpoint. Arrive at Maasai Mara in time for an exquisite lunch. Embark on an afternoon game drive seeking the famous Mara lion prides.',
        meals: 'Lunch, Dinner',
        accommodation: 'Entim Mara Camp or Mara Bush Camp',
      },
      {
        day: 2,
        title: 'Mara River Crossings & Predator Action',
        description: 'Full day in the reserve with packed gourmet picnic. Station near the Mara and Talek Rivers where tens of thousands of wildebeest gather before leaping into crocodile-infested waters.',
        meals: 'Breakfast, Picnic Lunch, Dinner',
        accommodation: 'Entim Mara Camp or Mara Bush Camp',
      },
      {
        day: 3,
        title: 'Plains Wildlife, Cheetah Territory & Sunsets',
        description: 'Explore the rolling Mara plains, hunting grounds for cheetahs and servals. In the afternoon, enjoy sundowners overlooking the golden savannah before heading back for campfire storytelling.',
        meals: 'Breakfast, Lunch, Dinner',
        accommodation: 'Entim Mara Camp or Mara Bush Camp',
      },
      {
        day: 4,
        title: 'Sunrise Game Drive & Return to Nairobi',
        description: 'Final sunrise game drive when predators are most active. After breakfast, journey back to Nairobi with a stop for lunch en route, arriving late afternoon.',
        meals: 'Breakfast, Lunch',
        accommodation: 'Drop-off Nairobi',
      },
    ],
  },
  {
    id: 'amboseli-tsavo-kilimanjaro',
    title: '6-Day Amboseli & Tsavo Kilimanjaro Views',
    tagline: 'Land of Giants: Red Elephants of Tsavo and Kilimanjaro Footprints',
    duration: '6 Days / 5 Nights',
    durationDays: 6,
    destinations: ['Amboseli National Park', 'Tsavo West', 'Tsavo East'],
    style: 'Wildlife & Big Five',
    tier: 'Mid-Range Comfort',
    priceUSD: 1490,
    originalPriceUSD: 1680,
    featured: true,
    bestSeller: false,
    heroImage: 'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=800&q=80',
    ],
    overview: 'Traverse southern Kenya’s dramatic volcanic landscapes, from Amboseli’s famous elephant tusker families beneath Kilimanjaro to the legendary red-dust elephants and Mzima Springs hippo sanctuary of Tsavo.',
    highlights: [
      'Unsurpassed sunrise vistas of Mount Kilimanjaro',
      'Famous red-dusted elephants of Tsavo',
      'Underwater viewing chamber at Mzima Springs with hippos and fish',
      'Explore the Shetani Lava flows and volcanic craters',
      'Rhino tracking in the protected Ngulia Rhino Sanctuary',
    ],
    maxGroupSize: 7,
    physicalRating: 'Easy',
    bestMonths: 'Year-Round (Best Jun-Oct & Dec-Feb)',
    included: [
      'All park entry fees for Amboseli, Tsavo West & Tsavo East',
      '5 nights quality lodge / tented camp accommodation',
      'All meals on safari (Full Board)',
      '4x4 Land Cruiser transport with pop-up roof',
      'Professional KPSGA guide',
      'Bottled drinking water in vehicle',
      'Emergency medical evacuation insurance',
    ],
    excluded: [
      'International airfares and Kenya eVisa',
      'Alcoholic drinks and personal items',
      'Guide tips',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Nairobi to Amboseli National Park',
        description: 'Morning departure to Amboseli. Check-in, lunch, and late afternoon game drive searching for elephants and lions with Kilimanjaro dominating the skyline.',
        meals: 'Lunch, Dinner',
        accommodation: 'Amboseli Serena Lodge',
      },
      {
        day: 2,
        title: 'Full Day in Amboseli Swamp & Plains',
        description: 'Full day tracking big tuskers, buffaloes, zebras, and over 400 species of birds in the wetlands.',
        meals: 'Breakfast, Lunch, Dinner',
        accommodation: 'Amboseli Serena Lodge',
      },
      {
        day: 3,
        title: 'Amboseli to Tsavo West National Park',
        description: 'Cross into the dramatic volcanic wilderness of Tsavo West. Visit Shetani Lava flow and the crystal-clear Mzima Springs.',
        meals: 'Breakfast, Lunch, Dinner',
        accommodation: 'Kilaguni Serena Safari Lodge',
      },
      {
        day: 4,
        title: 'Tsavo West to Tsavo East National Park',
        description: 'Morning game drive in Tsavo West, then transition across into the vast open savannah of Tsavo East.',
        meals: 'Breakfast, Lunch, Dinner',
        accommodation: 'Ashnil Aruba Lodge',
      },
      {
        day: 5,
        title: 'Full Day in Tsavo East & Galana River',
        description: 'Search for the red elephants of Tsavo, lion prides along the Galana River, and herds of oryx and kudu.',
        meals: 'Breakfast, Lunch, Dinner',
        accommodation: 'Ashnil Aruba Lodge',
      },
      {
        day: 6,
        title: 'Tsavo East to Nairobi or Mombasa Coast',
        description: 'Morning game drive and departure either back to Nairobi or onwards to the tropical beaches of Diani/Mombasa.',
        meals: 'Breakfast, Lunch',
        accommodation: 'Drop-off Nairobi or Coast',
      },
    ],
  },
  {
    id: 'kenya-tanzania-serengeti-odyssey',
    title: '8-Day Kenya & Tanzania Serengeti Odyssey',
    tagline: 'Maasai Mara, Serengeti Plains & Ngorongoro Crater Expedition',
    duration: '8 Days / 7 Nights',
    durationDays: 8,
    destinations: ['Maasai Mara', 'Serengeti', 'Ngorongoro Crater'],
    style: 'Wildlife & Big Five',
    tier: 'Luxury Tented Camp',
    priceUSD: 2950,
    originalPriceUSD: 3300,
    featured: true,
    bestSeller: false,
    heroImage: 'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80',
    ],
    overview: 'The definitive East African safari linking the world’s two greatest wildlife habitats: Maasai Mara and the endless Serengeti, capped by descent into the breathtaking UNESCO World Heritage Ngorongoro Crater.',
    highlights: [
      'Seamless cross-border safari between Kenya and Tanzania',
      'Experience both the Maasai Mara and the legendary Serengeti National Park',
      'Descend 600m into Ngorongoro Crater, the world’s largest intact caldera',
      'Unrivaled big cat concentrations (Lions, Leopards, Cheetahs)',
      'Luxury tented camp accommodations with gourmet cuisine',
    ],
    maxGroupSize: 6,
    physicalRating: 'Moderate',
    bestMonths: 'Year-Round (Jul-Oct for Migration, Jan-Mar for Calving)',
    included: [
      'All cross-border transit & park fees for Kenya & Tanzania',
      '7 nights luxury accommodation',
      'Full board meals',
      'Custom 4x4 Safari Land Cruisers in both countries',
      'KPSGA and Tanzania national park certified guides',
      'Ngorongoro Crater service fee',
      'Medical evacuation coverage',
    ],
    excluded: [
      'Tanzania & Kenya visa fees',
      'International flights',
      'Hot air balloon safari',
      'Staff tips',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Nairobi to Maasai Mara Reserve',
        description: 'Morning pickup in Nairobi, drive to Maasai Mara, afternoon safari drive.',
        meals: 'Lunch, Dinner',
        accommodation: 'Mara Ashnil Camp',
      },
      {
        day: 2,
        title: 'Full Day Maasai Mara Wildlife',
        description: 'Full day tracking big cats, elephants, and plains game.',
        meals: 'Breakfast, Lunch, Dinner',
        accommodation: 'Mara Ashnil Camp',
      },
      {
        day: 3,
        title: 'Maasai Mara to Isebania Border to Serengeti',
        description: 'Cross the Kenya-Tanzania border at Isebania, entering the northern Serengeti with game viewing en route.',
        meals: 'Breakfast, Lunch, Dinner',
        accommodation: 'Serengeti Serena Safari Lodge',
      },
      {
        day: 4,
        title: 'Central Serengeti & Seronera Valley',
        description: 'Search for leopards in acacia trees and lion prides lounging on granite kopjes.',
        meals: 'Breakfast, Lunch, Dinner',
        accommodation: 'Serengeti Serena Safari Lodge',
      },
      {
        day: 5,
        title: 'Serengeti to Ngorongoro Conservation Area',
        description: 'Scenic game drive across Serengeti plains, ascending the lush crater highlands of Ngorongoro.',
        meals: 'Breakfast, Lunch, Dinner',
        accommodation: 'Ngorongoro Serena Safari Lodge',
      },
      {
        day: 6,
        title: 'Ngorongoro Crater Floor Safari',
        description: 'Early morning descent into the crater floor for an unforgettable 6-hour safari seeing black rhinos, flamingo flocks, and giant bull elephants.',
        meals: 'Breakfast, Picnic Lunch, Dinner',
        accommodation: 'Ngorongoro Serena Safari Lodge',
      },
      {
        day: 7,
        title: 'Ngorongoro to Lake Manyara / Tarangire',
        description: 'Drive to Lake Manyara or Tarangire for baobab tree scenery and tree-climbing lions.',
        meals: 'Breakfast, Lunch, Dinner',
        accommodation: 'Tarangire Sopa Lodge',
      },
      {
        day: 8,
        title: 'Arusha / Kilimanjaro Airport Departure',
        description: 'Transfer to Arusha or Kilimanjaro International Airport (JRO) for departure.',
        meals: 'Breakfast, Lunch',
        accommodation: 'Departure',
      },
    ],
  },
  {
    id: 'luxury-flying-safari-mara-samburu',
    title: '5-Day Luxury Flying Safari: Mara & Samburu',
    tagline: 'Skip the Dusty Roads: Scenic Bush Flights and Ultra-Luxury Tents',
    duration: '5 Days / 4 Nights',
    durationDays: 5,
    destinations: ['Samburu Reserve', 'Maasai Mara'],
    style: 'Luxury Flying Safari',
    tier: 'Luxury Tented Camp',
    priceUSD: 2450,
    originalPriceUSD: 2750,
    featured: false,
    bestSeller: false,
    heroImage: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=800&q=80',
    ],
    overview: 'Fly directly between Kenya’s contrasting wilderness ecosystems: the semi-arid northern frontier of Samburu, home to rare species like the Grevy’s zebra and gerenuk, and the fertile green plains of Maasai Mara.',
    highlights: [
      'Scenic domestic bush flights with aerial views of Mt. Kenya and Rift Valley',
      'Spot the "Samburu Special Five" found only in northern Kenya',
      'Ultra-luxury tented camps with butler service and plunge pools',
      'Night game drives and guided walking safaris with native Samburu warriors',
      'Zero hours spent on long bumpy road transfers',
    ],
    maxGroupSize: 4,
    physicalRating: 'Easy',
    bestMonths: 'Year-Round (Best Jun-Oct & Dec-Mar)',
    included: [
      'All scheduled domestic bush flights (Wilson - Samburu - Mara - Wilson)',
      '4 nights ultra-luxury tented camp accommodation',
      'All gourmet meals, select wines, and local spirits',
      'Shared open-sided 4x4 game viewing vehicles with guide',
      'Samburu & Maasai Mara conservation fees',
      'Laundry services at camps',
    ],
    excluded: [
      'Premium champagne and cellar wines',
      'Gratuities',
      'Optional hot air balloon ($450 pp)',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Fly Nairobi to Samburu National Reserve',
        description: 'Board bush flight from Wilson Airport to Samburu airstrip. Game drive en route to camp, lunch, and afternoon game drive along the Ewaso Nyiro river.',
        meals: 'Lunch, Dinner',
        accommodation: 'Elephant Bedroom Camp or Saruni Samburu',
      },
      {
        day: 2,
        title: 'Full Day Exploring Samburu Special Five',
        description: 'Track Grevy’s zebras, reticulated giraffes, Beisa oryx, Somali ostriches, and long-necked gerenuks.',
        meals: 'Breakfast, Lunch, Dinner',
        accommodation: 'Elephant Bedroom Camp or Saruni Samburu',
      },
      {
        day: 3,
        title: 'Scenic Flight from Samburu to Maasai Mara',
        description: 'Scenic flight over Mt. Kenya across to Maasai Mara. Land directly in the reserve. Afternoon safari with big cats.',
        meals: 'Breakfast, Lunch, Dinner',
        accommodation: 'Governors’ Camp or Karen Blixen Camp',
      },
      {
        day: 4,
        title: 'Maasai Mara Big Cat Tracking',
        description: 'Morning and evening drives in open 4x4 vehicles with sundowner cocktails in the bush.',
        meals: 'Breakfast, Lunch, Dinner',
        accommodation: 'Governors’ Camp or Karen Blixen Camp',
      },
      {
        day: 5,
        title: 'Sunrise Safari & Flight Back to Nairobi',
        description: 'Morning drive, breakfast, and mid-morning flight back to Wilson Airport Nairobi.',
        meals: 'Breakfast',
        accommodation: 'Drop-off Nairobi',
      },
    ],
  },
  {
    id: 'bush-and-beach-mara-zanzibar',
    title: '10-Day Bush & Beach Safari: Mara & Zanzibar',
    tagline: 'The Ultimate African Honeymoon & Holiday: Big Five Safari to Indian Ocean Spice Isle',
    duration: '10 Days / 9 Nights',
    durationDays: 10,
    destinations: ['Maasai Mara', 'Lake Naivasha', 'Zanzibar Archipelago'],
    style: 'Bush & Beach',
    tier: 'Luxury Tented Camp',
    priceUSD: 2890,
    originalPriceUSD: 3250,
    featured: true,
    bestSeller: true,
    heroImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=800&q=80',
    ],
    overview: 'Combine thrilling Big Five savannah game drives in Kenya’s Maasai Mara and peaceful boat cruises on Lake Naivasha with barefoot luxury on the powdery white sand beaches and turquoise waters of Zanzibar.',
    highlights: [
      '5 Days wildlife safari in Maasai Mara & Great Rift Valley',
      'Boat safari on Lake Naivasha & walking safari on Crescent Island among giraffes',
      'Flight to Zanzibar with 4 nights in a 5-star beachfront resort',
      'Sunset dhow cruise, Stone Town heritage tour, and spice farm excursion',
      'Perfect blend of wilderness thrills and tropical island relaxation',
    ],
    maxGroupSize: 6,
    physicalRating: 'Easy',
    bestMonths: 'Year-Round (Best Jun-Oct & Dec-Mar)',
    included: [
      'All safari transport in 4x4 Land Cruiser',
      'Flight from Nairobi to Zanzibar',
      '5 nights safari lodge/tented camp & 4 nights Zanzibar beachfront resort',
      'All meals on safari and half-board / all-inclusive in Zanzibar',
      'Park fees, boat cruise, and Stone Town guided tour',
      'Airport and resort transfers',
    ],
    excluded: [
      'International flights arriving in Kenya and departing Zanzibar',
      'Visas for Kenya & Tanzania',
      'Personal water sports and spa treatments',
      'Gratuities',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Nairobi to Lake Naivasha',
        description: 'Drive down the Great Rift Valley. Afternoon boat safari seeing hippos and walk on Crescent Island.',
        meals: 'Lunch, Dinner',
        accommodation: 'Lake Naivasha Sopa Resort',
      },
      {
        day: 2,
        title: 'Lake Naivasha to Maasai Mara',
        description: 'Travel into the legendary Maasai Mara. Afternoon game drive.',
        meals: 'Breakfast, Lunch, Dinner',
        accommodation: 'Ashnil Mara Camp',
      },
      {
        day: 3,
        title: 'Full Day Maasai Mara Safari',
        description: 'Vast plains game viewing, tracking lions, cheetahs, and elephants.',
        meals: 'Breakfast, Lunch, Dinner',
        accommodation: 'Ashnil Mara Camp',
      },
      {
        day: 4,
        title: 'Second Full Day in Maasai Mara',
        description: 'Deep game drive to the Mara River with sundowner drinks.',
        meals: 'Breakfast, Lunch, Dinner',
        accommodation: 'Ashnil Mara Camp',
      },
      {
        day: 5,
        title: 'Maasai Mara to Nairobi - Flight to Zanzibar',
        description: 'Morning drive to Nairobi and afternoon flight to the tropical spice island of Zanzibar.',
        meals: 'Breakfast, Dinner',
        accommodation: 'Bluebay Beach Resort & Spa, Zanzibar',
      },
      {
        day: 6,
        title: 'Zanzibar Beach Relaxation & Ocean Views',
        description: 'Relax on powdery coral sands, swim in warm Indian Ocean waters, and indulge in spa treatments.',
        meals: 'Breakfast, Dinner',
        accommodation: 'Bluebay Beach Resort & Spa',
      },
      {
        day: 7,
        title: 'Stone Town & Spice Farm Heritage Excursion',
        description: 'Explore the carved wooden doors, narrow alleys, and historic markets of UNESCO Stone Town.',
        meals: 'Breakfast, Dinner',
        accommodation: 'Bluebay Beach Resort & Spa',
      },
      {
        day: 8,
        title: 'Traditional Sunset Dhow Cruise',
        description: 'Sail the turquoise coastal waters on a wooden dhow with fresh fruit and Swahili hors d’oeuvres.',
        meals: 'Breakfast, Dinner',
        accommodation: 'Bluebay Beach Resort & Spa',
      },
      {
        day: 9,
        title: 'Snorkeling at Mnemba Atoll & Beachfront Dinner',
        description: 'Optional marine excursion to Mnemba Atoll reef to swim with sea turtles and colorful reef fish.',
        meals: 'Breakfast, Dinner',
        accommodation: 'Bluebay Beach Resort & Spa',
      },
      {
        day: 10,
        title: 'Zanzibar Departure',
        description: 'Check out and transfer to Zanzibar International Airport for your return flight home.',
        meals: 'Breakfast',
        accommodation: 'Departure',
      },
    ],
  },
];

export const DESTINATIONS_DATA: Destination[] = [
  {
    id: 'maasai-mara',
    name: 'Maasai Mara National Reserve',
    country: 'Kenya',
    tagline: 'The Jewel of African Wildlife & Great Migration Stage',
    description: 'Universally acclaimed as one of the world’s greatest wildlife sanctuaries. Maasai Mara offers breathtaking rolling savannahs, year-round Big Five encounters, and from July to October, the thundering drama of the Great Wildebeest Migration river crossings.',
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1000&q=80',
    bestTimeToVisit: 'July to October (Migration), December to March (Predator spotting & clear skies)',
    keyWildlife: ['Lions', 'Cheetahs', 'Leopards', 'Wildebeest', 'Elephants', 'Nile Crocodiles'],
    highlights: [
      'Annual Great Migration river crossings',
      'Highest density of big cats in East Africa',
      'Hot air balloon safaris over golden plains at dawn',
      'Rich cultural encounters with Maasai pastoral communities',
    ],
    relatedTourIds: ['classic-kenya-big-five', 'maasai-mara-great-migration', 'kenya-tanzania-serengeti-odyssey', 'bush-and-beach-mara-zanzibar'],
  },
  {
    id: 'amboseli',
    name: 'Amboseli National Park',
    country: 'Kenya',
    tagline: 'Land of African Giants with Mt. Kilimanjaro Views',
    description: 'Set against the unforgettable backdrop of snow-capped Mount Kilimanjaro (Africa’s highest peak), Amboseli is celebrated for having the most famous, habituated elephant herds studied by world-renowned researchers for over 50 years.',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1000&q=80',
    bestTimeToVisit: 'June to October and January to February',
    keyWildlife: ['Giant African Elephants', 'Lions', 'Cheetahs', 'Hippos', 'Giraffes', 'Over 400 Bird Species'],
    highlights: [
      'Unobstructed postcard views of Mt. Kilimanjaro',
      'Massive tuskers wading through lush Enkongo Narok swamps',
      'Observation Hill picnic spot overlooking the entire reserve',
      'Guaranteed close-range elephant encounters',
    ],
    relatedTourIds: ['classic-kenya-big-five', 'amboseli-tsavo-kilimanjaro'],
  },
  {
    id: 'serengeti',
    name: 'Serengeti National Park',
    country: 'Tanzania',
    tagline: 'The Endless Plains & Ancient Predator Kingdom',
    description: 'Spanning nearly 15,000 square kilometers, the Serengeti is legendary for its open horizons, towering granite kopjes where lions survey their realm, and millions of migratory ungulates traversing ancient circular paths.',
    image: 'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=1000&q=80',
    bestTimeToVisit: 'June to October (Grumeti/Mara crossings), January to March (Southern Ndutu calving season)',
    keyWildlife: ['Lions', 'Leopards', 'Cheetahs', 'Wildebeest', 'Spotted Hyenas', 'Topi'],
    highlights: [
      'UNESCO World Heritage ecosystem with unbroken natural balance',
      'Seronera Valley leopard haven',
      'Spectacular granite kopjes dotted with predator prides',
    ],
    relatedTourIds: ['kenya-tanzania-serengeti-odyssey'],
  },
  {
    id: 'ngorongoro',
    name: 'Ngorongoro Conservation Area',
    country: 'Tanzania',
    tagline: 'The Eighth Wonder of the World & Eden of Africa',
    description: 'A colossal intact volcanic caldera 600 meters deep and 20 kilometers wide. The crater floor shelters over 25,000 large mammals, including rare black rhinos, giant bull elephants, and dense lion prides.',
    image: 'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&w=1000&q=80',
    bestTimeToVisit: 'Year-Round (Permanent water supply keeps wildlife resident)',
    keyWildlife: ['Black Rhinos', 'Black-maned Lions', 'Flamingos', 'Golden Jackals', 'Zebras'],
    highlights: [
      'Highest density of mammalian predators in Africa',
      'Rare haven to spot endangered Black Rhinos in the wild',
      'Stunning caldera rim panoramic lookouts',
    ],
    relatedTourIds: ['kenya-tanzania-serengeti-odyssey'],
  },
  {
    id: 'samburu',
    name: 'Samburu National Reserve',
    country: 'Kenya',
    tagline: 'The Rugged Northern Frontier & Samburu Special Five',
    description: 'Bisected by the palm-fringed Ewaso Nyiro River, Samburu presents a semi-arid landscape of dramatic doum palms, red dust hills, and rare northern species found nowhere else in southern Kenya.',
    image: 'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1000&q=80',
    bestTimeToVisit: 'December to March and June to October',
    keyWildlife: ['Grevy’s Zebra', 'Reticulated Giraffe', 'Beisa Oryx', 'Gerenuk', 'Somali Ostrich', 'Leopards'],
    highlights: [
      'Spot the Samburu Special 5 species',
      'Frequent leopard sightings in riverine acacia forests',
      'Authentic Samburu cultural immersion',
    ],
    relatedTourIds: ['luxury-flying-safari-mara-samburu'],
  },
  {
    id: 'zanzibar',
    name: 'Zanzibar Archipelago',
    country: 'Tanzania',
    tagline: 'The Spice Island & Turquoise Indian Ocean Sanctuary',
    description: 'The idyllic finale to any safari adventure. Zanzibar dazzles with powder-white coral beaches, fragrant clove and nutmeg plantations, rich Swahili and Omani architecture in Stone Town, and vibrant coral reefs.',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80',
    bestTimeToVisit: 'June to October and December to February',
    keyWildlife: ['Bottlenose Dolphins', 'Green Sea Turtles', 'Red Colobus Monkeys', 'Tropical Reef Fish'],
    highlights: [
      'UNESCO World Heritage Stone Town walking tour',
      'Snorkeling at Mnemba Atoll coral marine park',
      'Sunset traditional wooden dhow cruises',
    ],
    relatedTourIds: ['bush-and-beach-mara-zanzibar'],
  },
];

export const SERVICES_DATA: TravelService[] = [
  {
    id: 'hotel-and-resort-bookings',
    title: 'Hotel, Lodge & Resort Bookings',
    tagline: 'Negotiated rates across premier hotels, beach resorts & luxury safari lodges',
    description: 'We secure guaranteed reservations and exclusive preferred-partner rates across East Africa. From 5-star city business hotels in Nairobi and Eldoret (Serena, Sarova, Hemingsways, Radisson) to tropical beach resorts in Diani/Watamu and world-class safari lodges, enjoy complimentary room upgrades, flexible booking conditions, and group discounts.',
    iconName: 'Building2',
    features: ['Contracted operator rates', 'City transit & boutique hotels', 'Beachfront villas & resorts', 'Corporate & group discounts'],
  },
  {
    id: 'safari-land-cruisers',
    title: 'Custom 4x4 Safari Land Cruisers',
    tagline: 'Purpose-built for photographic safaris and rough terrain',
    description: 'Our fleet of customized Toyota Land Cruisers feature full 360-degree pop-up game-viewing roofs, onboard charging inverters (USB/220V), mini-refrigerators for cold drinks, high-frequency two-way radios, and guaranteed individual window seating for every traveler.',
    iconName: 'Compass',
    features: ['Pop-up viewing roof', 'Guaranteed window seat', 'Cold drink fridge', 'USB & camera charging ports'],
  },
  {
    id: 'airport-vip-transfers',
    title: 'Airport VIP Transfers & Chauffeur Services',
    tagline: 'Punctual meet & greet across all major East African airports',
    description: 'Seamless private transfers connecting Jomo Kenyatta International (JKIA), Wilson Airport, Eldoret International Airport (EDL), Mombasa (MBA), and Kilimanjaro (JRO). Enjoy flight tracking, professional uniformed chauffeurs, luggage assistance, and air-conditioned executive vehicles.',
    iconName: 'Car',
    features: ['Meet & greet terminal protocol', 'JKIA, Eldoret & Wilson transfers', 'Executive sedans & luxury vans', 'Live flight delay monitoring'],
  },
  {
    id: 'bush-flights',
    title: 'Domestic Bush Flights & Air Charters',
    tagline: 'Seamless connections to airstrips inside national parks',
    description: 'Save valuable safari time with scheduled flights from Wilson Airport (Nairobi) directly to bush airstrips in Maasai Mara, Amboseli, Samburu, and Serengeti, as well as private air charters tailored to your group schedule.',
    iconName: 'Plane',
    features: ['Wilson Airport departures', 'Bush airstrip transfers', 'Baggage assistance', 'Private charter options'],
  },
  {
    id: 'luxury-camp-booking',
    title: 'Luxury Tented Camps & Safari Lodges',
    tagline: 'Direct partnerships with leading eco-lodges and luxury camps',
    description: 'Enjoy exclusive rates and VIP room allocations across East Africa’s most distinguished safari properties, from vintage Hemingway-style tented camps to 5-star cliffside safari lodges with private plunge pools.',
    iconName: 'Hotel',
    features: ['Best rate guarantee', 'Handpicked eco-lodges', 'Romantic bush dinners', 'Family suites available'],
  },
  {
    id: 'corporate-mice-retreats',
    title: 'Corporate Retreats, Conferences & MICE',
    tagline: 'Memorable corporate escapes, team building & executive conferences',
    description: 'We organize end-to-end Meetings, Incentives, Conferences, and Exhibitions (MICE) in inspiring safari locations. From lakeside conference venues in Naivasha and team building in the Rift Valley to exclusive corporate retreats in the Maasai Mara, we handle transport, audiovisual, accommodation, and curated team activities.',
    iconName: 'Users',
    features: ['Full event logistics & transport', 'Team-building facilitators', 'Conference hall reservations', 'Curated group bush dinners'],
  },
  {
    id: 'balloon-safaris',
    title: 'Hot Air Balloon Safaris & Bush Breakfasts',
    tagline: 'Glide over the waking savannah at golden sunrise',
    description: 'Experience the magic of drifting silently above herds of grazing elephants and galloping zebras at dawn, concluding with an unforgettable champagne breakfast served right in the middle of the savannah.',
    iconName: 'Sunrise',
    features: ['Sunrise launch', '1-hour panoramic flight', 'Champagne bush breakfast', 'Flight certificate'],
  },
  {
    id: 'photography-filming-logistics',
    title: 'Wildlife Photography & Film Crew Logistics',
    tagline: 'Custom vehicle setups, equipment support & filming permits',
    description: 'Tailored for professional wildlife photographers, documentary crews, and camera enthusiasts. We provide modified open-sided or hatch Land Cruisers with specialized gimbal mounts, beanbag supports, low-angle doors, camera charging inverters, and Kenya Film Commission permit handling.',
    iconName: 'Camera',
    features: ['Low-angle photo shoot doors', 'Heavy-duty lens beanbags', 'Drone & film permit clearance', 'Photographer-trained driver-guides'],
  },
  {
    id: 'honeymoons-celebrations',
    title: 'Romantic Honeymoons & Bush Celebrations',
    tagline: 'Unforgettable milestone moments under the African sky',
    description: 'Elevate your special moments with private candlelight dinners in the middle of the savannah, romantic ridge-top sundowner cocktails with panoramic views, surprise champagne celebrations, and personalized honeymoon turndowns with fresh flowers and sparkling wine.',
    iconName: 'Heart',
    features: ['Private candlelit bush dinners', 'Sunset ridge sundowners', 'Honeymoon suite perks & gifts', 'Surprise celebration planning'],
  },
  {
    id: 'tailor-made-safaris',
    title: '100% Tailor-Made Private Itineraries',
    tagline: 'Crafted around your travel style, pace, and interests',
    description: 'Whether you are planning a once-in-a-lifetime honeymoon, multi-generational family holiday, photography workshop, or private corporate retreat, our safari specialists design bespoke routes with zero cookie-cutter compromises.',
    iconName: 'MapPin',
    features: ['Flexible daily pacing', 'Personalized wildlife focus', 'Private vehicle & guide', 'Dedicated concierge'],
  },
  {
    id: 'visa-and-flying-doctors',
    title: 'Travel Insurance & Flying Doctors Evac',
    tagline: 'Peace of mind on every game drive in remote wilderness',
    description: 'Every Smugsafaris guest is automatically covered with AMREF Flying Doctors emergency aero-medical evacuation coverage throughout Kenya, backed by our pre-departure Kenya eVisa/ETA guidance.',
    iconName: 'ShieldCheck',
    features: ['AMREF Flying Doctors included', 'eVisa / ETA assistance', '24/7 emergency response', 'Pre-trip packing consult'],
  },
];

export const REVIEWS_DATA: Review[] = [
  {
    id: 'rev-1',
    author: 'Sarah & Michael Jenkins',
    country: 'United Kingdom',
    countryCode: 'GB',
    date: 'August 2026',
    rating: 5,
    tourTaken: '7-Day Classic Kenya Big Five Safari',
    comment: 'Smugsafaris organized the holiday of our lives! Our guide David was exceptional — his knowledge of animal behavior helped us witness a leopard stalking an impala and a family of 30 elephants right by our Land Cruiser in Amboseli. Flawless logistics from start to finish.',
    avatarBg: 'bg-emerald-700',
  },
  {
    id: 'rev-2',
    author: 'Dr. Alexander von Berg',
    country: 'Germany',
    countryCode: 'DE',
    date: 'July 2026',
    rating: 5,
    tourTaken: '4-Day Maasai Mara Great Migration Spectacle',
    comment: 'As a passionate wildlife photographer, vehicle positioning and guide patience are everything. Smugsafaris exceeded all expectations. We witnessed three separate Mara River crossings without being crowded out. The pop-up roof in the 4x4 Cruiser was pristine.',
    avatarBg: 'bg-amber-600',
  },
  {
    id: 'rev-3',
    author: 'Claire & Liam O’Connor',
    country: 'Australia',
    countryCode: 'AU',
    date: 'September 2026',
    rating: 5,
    tourTaken: '10-Day Bush & Beach Safari: Mara & Zanzibar',
    comment: 'The transition from the thrill of the Mara savannah to the tranquility of our Zanzibar beach resort was pure perfection. The team accommodated our dietary preferences effortlessly, and having Flying Doctors coverage gave us total peace of mind.',
    avatarBg: 'bg-teal-700',
  },
  {
    id: 'rev-4',
    author: 'The Campbell Family (5 pax)',
    country: 'United States',
    countryCode: 'US',
    date: 'June 2026',
    rating: 5,
    tourTaken: '8-Day Kenya & Tanzania Serengeti Odyssey',
    comment: 'Traveling with kids aged 11 and 14, we needed an engaging guide who could keep them fascinated. Joseph at Smugsafaris was a hero! He taught them how to identify animal footprints, bird calls, and tree species. Truly unforgettable memories.',
    avatarBg: 'bg-orange-600',
  },
  {
    id: 'rev-5',
    author: 'Elena Rossi & Marco Conti',
    country: 'Italy',
    countryCode: 'IT',
    date: 'August 2026',
    rating: 5,
    tourTaken: '7-Day Classic Kenya Big Five Safari',
    comment: 'Seeing Kilimanjaro rise behind grazing elephants at 6:30 AM in Amboseli was a spiritual experience. Thank you Smugsafaris for making our honeymoon dream come true with such warmth and elegance!',
    avatarBg: 'bg-green-700',
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'packing-list-east-africa',
    title: 'The Essential Packing List for an East African Safari',
    slug: 'essential-packing-list-safari',
    category: 'Travel Tips',
    readTime: '6 min read',
    publishDate: 'August 14, 2026',
    author: 'Jackson K., Lead Safari Director',
    summary: 'Everything you need to know about neutral clothing colors, bush flight baggage weight limits (15kg soft duffels), camera gear, and sun protection.',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80',
    content: [
      'Packing for an East African safari requires balancing comfort, functionality, and strict airline weight limits. If taking domestic bush flights (such as Wilson Airport to Maasai Mara), luggage is strictly capped at 15kg (33 lbs) per passenger in soft-sided duffel bags without rigid frames.',
      'Stick to neutral khaki, beige, tan, olive, and brown earth tones. Avoid bright white (which draws dust and spooks wildlife) and dark navy or black (which attract tsetse flies in certain wooded reserve pockets). Pure camouflage pattern clothing is restricted for military personnel in Kenya.',
      'Mornings and evenings on the open savannah are surprisingly crisp (often 12°C to 15°C / 54°F to 59°F). Layering is essential: pack a light fleece or windbreaker jacket, breathable long-sleeve cotton shirts for sun and mosquito protection, comfortable safari trousers, and sturdy walking shoes.',
      'Bring extra camera batteries and SD cards. While our 4x4 Land Cruisers provide USB and standard inverter charging plugs, cold early mornings drain battery life faster during intensive wildlife shoots.',
    ],
  },
  {
    id: 'great-migration-timing',
    title: 'Great Migration Calendar: When to Catch the Mara River Crossings',
    slug: 'great-migration-timing-guide',
    category: 'Migration Guide',
    readTime: '8 min read',
    publishDate: 'July 28, 2026',
    author: 'Jackson K., Lead Safari Director',
    summary: 'A month-by-month breakdown of the circular 1,800-mile journey undertaken by 1.5 million wildebeest, zebras, and gazelles across Kenya and Tanzania.',
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80',
    content: [
      'The Great Migration is not a single annual event, but a continuous circular movement driven by rainfall patterns and fresh grass growth across the Serengeti-Mara ecosystem.',
      'July to October represents the peak drama in Kenya’s Maasai Mara. Massive herds converge at the steep banks of the Mara River, gathering courage before plunging into the current amidst lurking Nile crocodiles.',
      'January to March sees the herds in the southern Serengeti and Ndutu plains of Tanzania for the calving season, where over 8,000 wildebeest calves are born daily, attracting immense predator action from lions and cheetahs.',
      'To maximize your chances of witnessing a crossing, we recommend at least 3 to 4 nights stationed inside the Maasai Mara reserve rather than staying outside the gates.',
    ],
  },
  {
    id: 'kenya-vs-tanzania-safari',
    title: 'Kenya vs. Tanzania: Which Safari Destination is Right for You?',
    slug: 'kenya-vs-tanzania-comparison',
    category: 'Planning',
    readTime: '5 min read',
    publishDate: 'June 19, 2026',
    author: 'Jackson K., Lead Safari Director',
    summary: 'Comparing flight connectivity, accommodation costs, scenery, and wildlife densities to help you choose the ideal itinerary.',
    image: 'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=800&q=80',
    content: [
      'Kenya offers exceptional accessibility, world-class tourism infrastructure, and shorter transfer distances between highlights like Maasai Mara, Lake Nakuru, and Amboseli. It is often more cost-effective for families and first-time safari travelers.',
      'Tanzania offers immense scale, fewer vehicles in remote southern circuits, and natural wonders like the Ngorongoro Crater floor and vast Serengeti plains.',
      'Can’t decide? Our 8-Day Kenya & Tanzania Odyssey connects the best of both worlds with seamless border logistics at Isebania or Namanga.',
    ],
  },
];

export const FAQS_DATA = [
  {
    category: 'Booking & Payments',
    question: 'How do I book a safari with Smugsafaris and what deposit is required?',
    answer: 'Booking is simple: browse our packages or submit a custom inquiry via our form or WhatsApp (+1 (256) 947-7516 / +254 741 938127). A 30% deposit secures your safari vehicle, driver-guide, and lodge reservations. The remaining 70% balance is payable 30 days prior to departure via bank transfer, credit card (Visa/Mastercard), or secure online payment link.',
  },
  {
    category: 'Booking & Payments',
    question: 'What is your cancellation and refund policy?',
    answer: 'We understand travel plans can shift. Cancellations made 45+ days before departure receive a full refund minus a modest 5% administrative fee. Between 30 to 44 days, 70% of the tour cost is refundable. Inside 30 days, lodge penalty fees apply; however, we gladly allow free postponement of your travel dates for up to 12 months with no penalty.',
  },
  {
    category: 'Health & Safety',
    question: 'Do I need vaccinations or malaria tablets for Kenya and Tanzania?',
    answer: 'A Yellow Fever vaccination certificate is mandatory if arriving from or transiting through an endemic country. Malaria prophylaxis (such as Malarone or Doxycycline) is recommended for game reserve areas; consult your travel physician 4 to 6 weeks before travel. High-grade DEET insect repellent, long evening clothing, and screened luxury tents keep you well protected.',
  },
  {
    category: 'Health & Safety',
    question: 'What is AMREF Flying Doctors evacuation coverage?',
    answer: 'Every Smugsafaris guest is automatically registered with AMREF Flying Doctors Tourist Evacuation cover. In the unlikely event of a medical emergency during your safari, specialized aero-medical aircraft with intensive care doctors are dispatched directly to the nearest bush airstrip to evacuate you to a leading private hospital in Nairobi.',
  },
  {
    category: 'Visas & Travel Logistics',
    question: 'Do I need a visa to enter Kenya?',
    answer: 'Kenya has transitioned to the Electronic Travel Authorization (eTA) system. All international travelers must apply online at least 3 to 5 days prior to departure at the official government portal (www.etakenya.go.ke). We provide full step-by-step assistance and lodge verification letters for your application.',
  },
  {
    category: 'Safari Life & Gear',
    question: 'What type of vehicles do you use on game drives?',
    answer: 'We exclusively deploy customized 4x4 Toyota Land Cruisers engineered specifically for East African terrain. Every cruiser features a pop-up roof for 360° unobstructed photography, guaranteed window seats for all guests, USB & AC charging ports for cameras and phones, a mini-fridge with chilled mineral water, and long-range HF two-way wildlife radios.',
  },
  {
    category: 'Safari Life & Gear',
    question: 'What is the tipping etiquette for safari guides and camp staff?',
    answer: 'Tipping is customary in East Africa as a token of appreciation for dedicated service. We recommend tipping your safari driver-guide approximately $15 to $20 USD per day from the entire traveling group. At lodges and tented camps, a communal staff tip box is usually available where $10 to $15 USD per room per night can be placed.',
  },
];

export const COMPANY_STATS = [
  { value: '12+', label: 'Years Guiding Safaris', detail: 'Native East African leadership' },
  { value: '4,850+', label: 'Delighted Travelers', detail: 'From 42 countries worldwide' },
  { value: '28+', label: 'National Parks & Reserves', detail: 'Across Kenya & Tanzania' },
  { value: '100%', label: 'Tailor-Made Flexibility', detail: 'No forced cookie-cutter routes' },
  { value: '4.9/5', label: 'Guest Satisfaction', detail: 'Over 650 verified reviews' },
];

export const TEAM_MEMBERS = [
  {
    name: 'Jackson Kirui',
    role: 'Founder & Head of Safari Operations',
    experience: '16 Years Experience',
    bio: 'Born in the Great Rift Valley, Jackson is a licensed KPSGA Gold-level naturalist guide who has led over 500 expeditions across Maasai Mara, Serengeti, and Samburu.',
    avatar: '/images/team/jackson-kirui.jpg',
  },
  {
    name: 'David Ole Nkoitoi',
    role: 'Senior Maasai Naturalist & Cultural Liaison',
    experience: '12 Years Experience',
    bio: 'A native of the Maasai Mara ecosystem with an extraordinary instinct for big cat behavior and ancient tracking techniques, David turns every game drive into a wildlife masterclass.',
    avatar: '/images/team/david-nkoitoi.jpg',
  },
  {
    name: 'Beatrice Wanjiku',
    role: 'Guest Experience & Safari Concierge Manager',
    experience: '9 Years Experience',
    bio: 'Beatrice oversees seamless luxury accommodations, dietary requests, bush flight logistics, and 24/7 guest communications from our Eldoret headquarters.',
    avatar: '/images/team/beatrice-wanjiku.jpg',
  },
];
