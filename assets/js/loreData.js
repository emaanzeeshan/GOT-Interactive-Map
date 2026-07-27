/* =====================================================================
   loreData.js — Interconnected lore relationships for the GOT map
   Defines relationships between locations, houses, characters, battles, and dragons
   ===================================================================== */

const loreRelationships = {
  // Location relationships
  winterfell: {
    breadcrumb: ['Westeros', 'The North', 'Winterfell'],
    relatedHouses: ['Stark', 'Bolton'],
    relatedCharacters: ['Jon Snow', 'Eddard Stark', 'Arya Stark', 'Sansa Stark', 'Bran Stark', 'Rickon Stark'],
    relatedBattles: ['Battle of the Bastards', 'Sack of Winterfell'],
    relatedDragons: [],
    relatedLocations: ['The Wall', 'Castle Black', 'Riverrun', 'King\'s Landing'],
    didYouKnow: 'Winterfell has stood for over 8,000 years and was built by Brandon the Builder, who also constructed the Wall.'
  },
  kingsLanding: {
    breadcrumb: ['Westeros', 'The Crownlands', 'King\'s Landing'],
    relatedHouses: ['Baratheon', 'Lannister', 'Targaryen'],
    relatedCharacters: ['Daenerys Targaryen', 'Tyrion Lannister', 'Jaime Lannister', 'Cersei Lannister', 'Jon Snow'],
    relatedBattles: ['Battle of the Blackwater', 'Sack of King\'s Landing', 'Battle of King\'s Landing'],
    relatedDragons: ['Drogon', 'Rhaegal', 'Viserion'],
    relatedLocations: ['Dragonstone', 'The Red Keep', 'The Great Sept of Baelor'],
    didYouKnow: 'King\'s Landing was built on the ruins of Oldtown by Aegon the Conqueror after his dragon melted the hills into the shape of a crown.'
  },
  theWall: {
    breadcrumb: ['Westeros', 'The North', 'The Wall'],
    relatedHouses: ['Stark', 'Night\'s Watch'],
    relatedCharacters: ['Jon Snow', 'Mance Rayder', 'Samwell Tarly', 'The Night King'],
    relatedBattles: ['Battle of Castle Black', 'Battle of Winterfell'],
    relatedDragons: [],
    relatedLocations: ['Castle Black', 'Hardhome', 'Eastwatch'],
    didYouKnow: 'The Wall is 300 miles long and over 700 feet tall, made of ice and protected by ancient magic.'
  },
  dragonstone: {
    breadcrumb: ['Westeros', 'The Crownlands', 'Dragonstone'],
    relatedHouses: ['Targaryen', 'Baratheon'],
    relatedCharacters: ['Daenerys Targaryen', 'Stannis Baratheon', 'Jon Snow'],
    relatedBattles: ['Battle of Dragonstone'],
    relatedDragons: ['Drogon', 'Rhaegal', 'Viserion'],
    relatedLocations: ['King\'s Landing', 'Driftmark', 'Valyria'],
    didYouKnow: 'Dragonstone was the westernmost outpost of the Valyrian Freehold and the birthplace of dragons.'
  },
  casterlyRock: {
    breadcrumb: ['Westeros', 'The Westerlands', 'Casterly Rock'],
    relatedHouses: ['Lannister'],
    relatedCharacters: ['Tyrion Lannister', 'Jaime Lannister', 'Cersei Lannister', 'Tywin Lannister'],
    relatedBattles: [],
    relatedDragons: [],
    relatedLocations: ['King\'s Landing', 'Lannisport', 'The Golden Tooth'],
    didYouKnow: 'Casterly Rock is a massive fortress carved from a rocky hill overlooking the sea, said to contain gold mines that have made House Lannister incredibly wealthy.'
  },
  highgarden: {
    breadcrumb: ['Westeros', 'The Reach', 'Highgarden'],
    relatedHouses: ['Tyrell'],
    relatedCharacters: ['Margaery Tyrell', 'Olenna Tyrell', 'Loras Tyrell'],
    relatedBattles: ['Siege of Highgarden'],
    relatedDragons: [],
    relatedLocations: ['Oldtown', 'The Reach', 'King\'s Landing'],
    didYouKnow: 'Highgarden is the seat of House Tyrell and is known for its beautiful gardens and the famous Green Sept.'
  },
  oldtown: {
    breadcrumb: ['Westeros', 'The Reach', 'Oldtown'],
    relatedHouses: ['Hightower', 'Tyrell'],
    relatedCharacters: ['Samwell Tarly', 'Maester Aemon'],
    relatedBattles: [],
    relatedDragons: [],
    relatedLocations: ['Highgarden', 'The Citadel', 'The Hightower'],
    didYouKnow: 'Oldtown is the oldest city in Westeros and home to the Citadel, where maesters train for years to serve the realm.'
  },
  riverrun: {
    breadcrumb: ['Westeros', 'The Riverlands', 'Riverrun'],
    relatedHouses: ['Tully', 'Frey'],
    relatedCharacters: ['Catelyn Stark', 'Edmure Tully', 'Walder Frey'],
    relatedBattles: ['Red Wedding', 'Siege of Riverrun'],
    relatedDragons: [],
    relatedLocations: ['Winterfell', 'The Twins', 'King\'s Landing'],
    didYouKnow: 'Riverrun is a triangular fortress built at the confluence of the Tumblestone and Red Fork rivers, making it nearly impregnable.'
  },
  theTwins: {
    breadcrumb: ['Westeros', 'The Riverlands', 'The Twins'],
    relatedHouses: ['Frey'],
    relatedCharacters: ['Walder Frey', 'Robb Stark', 'Catelyn Stark'],
    relatedBattles: ['Red Wedding'],
    relatedDragons: [],
    relatedLocations: ['Riverrun', 'The Trident', 'King\'s Landing'],
    didYouKnow: 'The Twins are two identical castles connected by a massive bridge, the only crossing point over the Trident for hundreds of miles.'
  },
  pyke: {
    breadcrumb: ['Westeros', 'The Iron Islands', 'Pyke'],
    relatedHouses: ['Greyjoy'],
    relatedCharacters: ['Theon Greyjoy', 'Yara Greyjoy', 'Euron Greyjoy', 'Balon Greyjoy'],
    relatedBattles: ['Battle of Pyke'],
    relatedDragons: [],
    relatedLocations: ['The Iron Islands', 'Harlaw', 'King\'s Landing'],
    didYouKnow: 'Pyke is the stronghold of House Greyjoy, built on sea stacks connected by rope bridges that sway in the harsh ocean winds.'
  },
  harrenhal: {
    breadcrumb: ['Westeros', 'The Riverlands', 'Harrenhal'],
    relatedHouses: ['Hoare', 'Strong'],
    relatedCharacters: ['Arya Stark', 'Tywin Lannister'],
    relatedBattles: [],
    relatedDragons: ['Balerion'],
    relatedLocations: ['Riverrun', 'King\'s Landing', 'The Trident'],
    didYouKnow: 'Harrenhal is the largest castle in Westeros but is cursed - every family that has held it has met a tragic end.'
  },
  valyria: {
    breadcrumb: ['Essos', 'Valyria'],
    relatedHouses: ['Targaryen', 'Velaryon'],
    relatedCharacters: ['Daenerys Targaryen'],
    relatedBattles: [],
    relatedDragons: ['Balerion', 'Vhagar', 'Meraxes'],
    relatedLocations: ['Dragonstone', 'Old Valyria', 'Slaver\'s Bay'],
    didYouKnow: 'Valyria was once the greatest civilization in the world, destroyed by a cataclysmic volcanic event known as the Doom.'
  },
  meereen: {
    breadcrumb: ['Essos', 'Slaver\'s Bay', 'Meereen'],
    relatedHouses: [],
    relatedCharacters: ['Daenerys Targaryen', 'Grey Worm', 'Missandei', 'Jorah Mormont'],
    relatedBattles: ['Battle of Meereen', 'Siege of Meereen'],
    relatedDragons: ['Drogon', 'Rhaegal', 'Viserion'],
    relatedLocations: ['Astapor', 'Yunkai', 'Dragonstone'],
    didYouKnow: 'Meereen is the largest of the three slaver cities in Slaver\'s Bay, famous for its great pyramid and fighting pits.'
  },
  braavos: {
    breadcrumb: ['Essos', 'Braavos'],
    relatedHouses: [],
    relatedCharacters: ['Arya Stark', 'Jaqen H\'ghar'],
    relatedBattles: [],
    relatedDragons: [],
    relatedLocations: ['The House of Black and White', 'The Iron Bank', 'King\'s Landing'],
    didYouKnow: 'Braavos is the wealthiest and most powerful of the Free Cities, home to the Iron Bank of Braavos and the Faceless Men.'
  },
  beyondTheWall: {
    breadcrumb: ['Westeros', 'Beyond the Wall'],
    relatedHouses: ['Night\'s Watch', 'Free Folk'],
    relatedCharacters: ['Jon Snow', 'Mance Rayder', 'The Night King', 'Bran Stark'],
    relatedBattles: ['Battle of Hardhome', 'Battle of Winterfell'],
    relatedDragons: ['Viserion'],
    relatedLocations: ['The Wall', 'Hardhome', 'The Fist of the First Men'],
    didYouKnow: 'Beyond the Wall lies the land of always winter, where the White Walkers have been gathering their army for thousands of years.'
  }
};

// Helper function to get lore data for a location
function getLoreData(locationId) {
  // Convert location name to ID format
  const id = locationId.toLowerCase().replace(/[^a-z0-9]/g, '');
  return loreRelationships[id] || null;
}

// Helper function to get location ID from name
function getLocationId(locationName) {
  return locationName.toLowerCase().replace(/[^a-z0-9]/g, '');
}
