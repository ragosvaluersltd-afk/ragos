import { createPropertySlug } from "@/lib/mappers/property-slug";
import { PropertyListing } from "@/types";

type PropertySeed = Omit<PropertyListing, "slug">;

const seeds: PropertySeed[] = [
  {
    id: "prop-001",
    title: "Kilimani Skyline Residences - 3 Bedroom Apartment",
    listingType: "for-sale",
    propertyType: "apartment",
    price: 28500000,
    currency: "KES",
    city: "Nairobi",
    location: "Kilimani",
    sublocation: "Kindaruma Road",
    bedrooms: 3,
    bathrooms: 3,
    sizeSqm: 182,
    summary:
      "A refined family apartment with panoramic skyline views, generous natural light, and premium finishes in one of Kilimani's most established addresses.",
    description:
      "Positioned on an upper floor within a professionally managed compound, this residence combines practical family planning with understated luxury. Interiors include a formal lounge, closed fitted kitchen, utility area, and ensuite bedrooms with quality joinery. Residents enjoy a heated pool, landscaped podium, and controlled access lobby suitable for owner-occupiers and long-term investors.",
    features: ["All ensuite bedrooms", "DSQ", "Closed fitted kitchen", "Balcony with skyline views", "Borehole + county water"],
    amenities: ["Heated swimming pool", "Fully equipped gym", "Children's play court", "Backup generator", "24/7 security and CCTV"],
    status: "available",
    featured: true,
    coverImage: {
      url: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80",
      alt: "Exterior view of a premium apartment development in Kilimani"
    },
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1515263487990-61b07816b324?auto=format&fit=crop&w=1200&q=80",
        alt: "Contemporary living room with full-height windows"
      },
      {
        url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
        alt: "Apartment kitchen with fitted cabinetry"
      }
    ],
    referenceCode: "RVEA-S-2410",
    publishedAt: "2026-04-10"
  },
  {
    id: "prop-002",
    title: "Karen Acacia Grove - 5 Bedroom Family House",
    listingType: "for-sale",
    propertyType: "house",
    price: 135000000,
    currency: "KES",
    city: "Nairobi",
    location: "Karen",
    sublocation: "Bogani East Road",
    bedrooms: 5,
    bathrooms: 6,
    sizeSqm: 640,
    summary:
      "An executive standalone residence in a leafy Karen enclave, designed for multi-generational living and elegant entertaining.",
    description:
      "Set on a mature landscaped parcel with indigenous trees, this property offers expansive reception areas, a private study, and a guest wing. The home includes a family kitchen plus prep kitchen, fireplace lounge, and terrace opening to a manicured garden. Suitable for discerning end-users seeking privacy and long-term capital preservation in prime Karen.",
    features: ["Standalone home on mature garden", "Private guest wing", "Family room + study", "Fireplace lounge", "Ample parking + carport"],
    amenities: ["Perimeter electric fencing", "Intercom access", "Solar water heating", "Staff quarters", "High-speed fibre connectivity"],
    status: "available",
    featured: true,
    coverImage: {
      url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80",
      alt: "Luxury family house with driveway and landscaped gardens"
    },
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
        alt: "Family living room with fireplace"
      },
      {
        url: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1200&q=80",
        alt: "Outdoor terrace overlooking lush garden"
      }
    ],
    referenceCode: "RVEA-S-2421",
    publishedAt: "2026-03-28"
  },
  {
    id: "prop-003",
    title: "Lavington Crescent Court - 4 Bedroom Townhouse",
    listingType: "for-rent",
    propertyType: "townhouse",
    price: 420000,
    currency: "KES",
    city: "Nairobi",
    location: "Lavington",
    sublocation: "Gitanga Road",
    bedrooms: 4,
    bathrooms: 5,
    sizeSqm: 360,
    summary:
      "A modern townhouse in a controlled community, ideal for diplomatic and corporate tenancies requiring quality and security.",
    description:
      "This newly refreshed townhouse is arranged over three levels and features bright reception spaces, an open-plan kitchen with island, and ensuite bedrooms. The gated development has low density planning and excellent access to schools, shopping, and major transport links. Lease terms favour long-term corporate occupiers.",
    features: ["Three-level layout", "All bedrooms ensuite", "Family TV lounge", "Private rear garden", "Rooftop terrace"],
    amenities: ["Manned gatehouse", "Backup inverter", "Water storage", "Clubhouse", "Visitor parking"],
    status: "available",
    featured: false,
    coverImage: {
      url: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=80",
      alt: "Stylish townhouse exterior in a gated community"
    },
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80",
        alt: "Townhouse kitchen and dining space"
      },
      {
        url: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
        alt: "Townhouse bedroom with balcony access"
      }
    ],
    referenceCode: "RVEA-L-2278",
    publishedAt: "2026-04-02"
  },
  {
    id: "prop-004",
    title: "Westlands The Atrium - Grade A Office Floor",
    listingType: "for-rent",
    propertyType: "office",
    price: 980000,
    currency: "KES",
    city: "Nairobi",
    location: "Westlands",
    sublocation: "Waiyaki Way",
    bathrooms: 2,
    sizeSqm: 512,
    summary:
      "An efficient Grade A office floor with premium frontage and immediate access to the Nairobi CBD and major arterial routes.",
    description:
      "Offered in shell-and-core ready condition for tenant fit-out, this office floor supports flexible planning for professional firms, regional headquarters, or innovation teams. Building services include destination-controlled lifts, full backup power, and robust parking ratio. Rent excludes service charge and VAT.",
    features: ["Whole floor opportunity", "Raised floor trunking", "Floor-to-ceiling glazing", "On-floor kitchenette provisions", "Dedicated signage rights"],
    amenities: ["100% backup power", "Passenger + service lifts", "High-speed fibre backbone", "Basement parking", "Professional facilities management"],
    status: "available",
    featured: false,
    coverImage: {
      url: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
      alt: "Modern commercial office space with city views"
    },
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=1200&q=80",
        alt: "Open plan office area"
      },
      {
        url: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80",
        alt: "Reception and waiting lounge in office building"
      }
    ],
    referenceCode: "RVEA-L-2336",
    publishedAt: "2026-03-21"
  },
  {
    id: "prop-005",
    title: "Ngong Road Gateway - Mixed Use Development Plot",
    listingType: "for-sale",
    propertyType: "land",
    price: 86000000,
    currency: "KES",
    city: "Nairobi",
    location: "Ngong Road",
    sublocation: "Near Junction Mall",
    sizeSqm: 2023,
    summary:
      "A strategic development parcel with high visibility frontage suitable for mixed-use commercial or institutional schemes.",
    description:
      "The plot benefits from tarmac access, near-flat topography, and established utility connections in the immediate corridor. Planning guidance supports high-intensity mixed use, subject to approvals. This is an excellent acquisition for developers targeting rental income and future value appreciation along the Ngong Road growth axis.",
    features: ["Approx. 0.5 acre", "Main road proximity", "Rectangular shape", "Utility services nearby", "Strong rental catchment"],
    amenities: ["Mature neighborhood infrastructure", "Public transport access", "Retail and hospitality nearby"],
    status: "under-offer",
    featured: true,
    coverImage: {
      url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
      alt: "Open development land parcel near an urban corridor"
    },
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1200&q=80",
        alt: "View of the surrounding green landscape"
      },
      {
        url: "https://images.unsplash.com/photo-1431100348164-4e6165c71b6f?auto=format&fit=crop&w=1200&q=80",
        alt: "Road access adjacent to development site"
      }
    ],
    referenceCode: "RVEA-S-2450",
    publishedAt: "2026-04-14"
  },
  {
    id: "prop-006",
    title: "Kilimani Parkview Suites - 2 Bedroom Apartment",
    listingType: "for-rent",
    propertyType: "apartment",
    price: 165000,
    currency: "KES",
    city: "Nairobi",
    location: "Kilimani",
    sublocation: "Marcus Garvey Road",
    bedrooms: 2,
    bathrooms: 2,
    sizeSqm: 128,
    summary:
      "A smartly furnished two-bedroom apartment tailored for professionals seeking convenience and contemporary comfort.",
    description:
      "Located within walking distance of lifestyle amenities and key office clusters, this apartment offers a bright open-plan lounge, fitted kitchen, and practical utility balcony. The development is professionally managed with quality amenities, making it an ideal residence for executives and expatriate tenants.",
    features: ["Fully furnished option", "Ensuite main bedroom", "Open plan kitchen", "Utility balcony", "High floor unit"],
    amenities: ["Heated pool", "Gym and steam room", "Access control", "Borehole + backup water", "24-hour concierge"],
    status: "available",
    featured: false,
    coverImage: {
      url: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
      alt: "Modern apartment lounge interior"
    },
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
        alt: "Stylish apartment bedroom interior"
      },
      {
        url: "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1200&q=80",
        alt: "Apartment kitchen with contemporary finishes"
      }
    ],
    referenceCode: "RVEA-L-2355",
    publishedAt: "2026-04-16"
  }
];

export const properties: PropertyListing[] = seeds.map((seed) => ({
  ...seed,
  slug: createPropertySlug(`${seed.location}-${seed.title}-${seed.referenceCode}`)
}));
