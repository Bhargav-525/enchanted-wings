// Mock butterfly species database for demonstration
const butterflySpecies = [
  {
    species: 'Monarch Butterfly',
    scientificName: 'Danaus plexippus',
    family: 'Nymphalidae',
    characteristics: ['Orange wings', 'Black borders', 'White spots', 'Large size'],
    conservationStatus: 'Vulnerable',
    conservationNotes: 'Population declining due to habitat loss and climate change. Important pollinator species.',
    funFact: 'Monarchs can travel up to 3,000 miles during migration, using magnetic fields and sun position for navigation.',
    habitat: 'Gardens, fields, meadows, and roadsides with milkweed plants',
    flightPeriod: 'March through October, with peak activity in summer'
  },
  {
    species: 'Painted Lady',
    scientificName: 'Vanessa cardui',
    family: 'Nymphalidae',
    characteristics: ['Orange-brown wings', 'Black spots', 'White markings', 'Medium size'],
    conservationStatus: 'Least Concern',
    conservationNotes: 'Stable population with global distribution. Highly adaptable species.',
    funFact: 'One of the most widely distributed butterflies in the world, found on every continent except Antarctica.',
    habitat: 'Open areas including gardens, fields, and disturbed habitats',
    flightPeriod: 'Year-round in warm climates, spring through fall in temperate regions'
  },
  {
    species: 'Red Admiral',
    scientificName: 'Vanessa atalanta',
    family: 'Nymphalidae',
    characteristics: ['Dark wings', 'Red bands', 'White spots', 'Distinctive pattern'],
    conservationStatus: 'Least Concern',
    conservationNotes: 'Common and widespread species with stable populations.',
    funFact: 'Known for their territorial behavior, males will defend favorite perches and chase away intruders.',
    habitat: 'Gardens, parks, woodlands, and areas with nettle plants',
    flightPeriod: 'March through October, with multiple generations per year'
  },
  {
    species: 'Cabbage White',
    scientificName: 'Pieris rapae',
    family: 'Pieridae',
    characteristics: ['White wings', 'Black spots', 'Small size', 'Simple pattern'],
    conservationStatus: 'Least Concern',
    conservationNotes: 'Very common species, sometimes considered a garden pest.',
    funFact: 'Originally from Europe, this butterfly has successfully colonized most of the world.',
    habitat: 'Gardens, agricultural areas, and open spaces with cruciferous plants',
    flightPeriod: 'March through November, with multiple overlapping generations'
  },
  {
    species: 'Eastern Tiger Swallowtail',
    scientificName: 'Papilio glaucus',
    family: 'Papilionidae',
    characteristics: ['Yellow wings', 'Black stripes', 'Large size', 'Tail extensions'],
    conservationStatus: 'Least Concern',
    conservationNotes: 'Common in eastern North America with healthy populations.',
    funFact: 'Females can be either yellow like males or dark brown/black as a form of mimicry.',
    habitat: 'Deciduous forests, parks, and gardens with trees',
    flightPeriod: 'March through November, with two generations per year'
  }
];

export const mockClassify = (imageUrl: string) => {
  // Simulate classification delay and randomly select a species
  const randomSpecies = butterflySpecies[Math.floor(Math.random() * butterflySpecies.length)];
  
  // Simulate confidence score (higher for well-known species)
  const confidence = 0.75 + Math.random() * 0.2; // Between 75% and 95%
  
  return {
    ...randomSpecies,
    confidence,
    imageUrl,
    timestamp: new Date().toISOString()
  };
};

export { butterflySpecies };