/* =====================================================================
   characterProfiles.js — Detailed character profiles for the GOT map
   Extends existing character data with biography, timeline, relationships
   ===================================================================== */

const characterProfiles = {
  jonSnow: {
    id: 'jonSnow',
    name: 'Jon Snow',
    portrait: '', // Can be added later
    house: 'Stark',
    sigil: 'Direwolf',
    titles: ['King in the North', 'Lord Commander of the Night\'s Watch', 'The White Wolf'],
    status: 'Alive',
    allegiance: 'House Stark',
    quickFacts: {
      house: 'House Stark',
      region: 'The North',
      family: 'Stark (bastard)',
      occupation: 'King, Former Lord Commander',
      firstAppearance: 'Season 1, Episode 1',
      lastAppearance: 'Season 8, Episode 6',
      portrayedBy: 'Kit Harington'
    },
    biography: `Jon Snow, born Aegon Targaryen, is the illegitimate son of Rhaegar Targaryen and Lyanna Stark. Raised as Eddard Stark's bastard at Winterfell, he joined the Night's Watch to find his place in the world.

Throughout his journey, Jon rose from a steward to Lord Commander of the Night's Watch, united the Free Folk with the Night's Watch to fight the White Walkers, and was eventually revealed to be the true heir to the Iron Throne. After his resurrection, he played a crucial role in the Battle of Winterfell and the war against Cersei Lannister.

Ultimately, Jon chose duty over love and killed Daenerys Targaryen to prevent her from becoming a tyrant. He was exiled to the Night's Watch and returned beyond the Wall with the Free Folk, finding peace in the true north.`,
    timeline: [
      { event: 'Born at the Tower of Joy', season: 'Backstory' },
      { event: 'Raised at Winterfell as Ned Stark\'s bastard', season: 'Backstory' },
      { event: 'Joins the Night\'s Watch', season: 'S1', episode: 'E1' },
      { event: 'Becomes Lord Commander', season: 'S5', episode: 'E10' },
      { event: 'Killed by his brothers', season: 'S5', episode: 'E10' },
      { event: 'Resurrected by Melisandre', season: 'S6', episode: 'E2' },
      { event: 'Declared King in the North', season: 'S6', episode: 'E10' },
      { event: 'Revealed as Aegon Targaryen', season: 'S7', episode: 'E7' },
      { event: 'Fought at Battle of Winterfell', season: 'S8', episode: 'E3' },
      { event: 'Killed Daenerys Targaryen', season: 'S8', episode: 'E5' },
      { event: 'Exiled to the Night\'s Watch', season: 'S8', episode: 'E6' }
    ],
    relatedLocations: ['Winterfell', 'Castle Black', 'The Wall', 'Dragonstone', 'King\'s Landing'],
    relatedCharacters: {
      family: ['Eddard Stark', 'Catelyn Stark', 'Robb Stark', 'Sansa Stark', 'Arya Stark', 'Bran Stark', 'Rickon Stark'],
      allies: ['Samwell Tarly', 'Tormund Giantsbane', 'Daenerys Targaryen'],
      rivals: ['Cersei Lannister', 'Night King'],
      enemies: ['Night King', 'White Walkers', 'Cersei Lannister']
    },
    hasJourney: true
  },
  
  daenerys: {
    id: 'daenerys',
    name: 'Daenerys Targaryen',
    portrait: '',
    house: 'Targaryen',
    sigil: 'Three-Headed Dragon',
    titles: ['Queen of the Andals, the Rhoynar, and the First Men', 'Protector of the Seven Kingdoms', 'The Unburnt', 'Mother of Dragons'],
    status: 'Deceased',
    allegiance: 'House Targaryen',
    quickFacts: {
      house: 'House Targaryen',
      region: 'Essos / Westeros',
      family: 'Targaryen',
      occupation: 'Queen, Former Khaleesi',
      firstAppearance: 'Season 1, Episode 1',
      lastAppearance: 'Season 8, Episode 5',
      portrayedBy: 'Emilia Clarke'
    },
    biography: `Daenerys Targaryen, born in exile after her father's overthrow, grew up in the Free Cities with her brother Viserys. Sold into marriage to Khal Drogo, she rose from a frightened girl to a powerful leader.

After Drogo's death, she hatched three dragon eggs—the first dragons in centuries—and began her quest to reclaim the Iron Throne. She liberated the cities of Slaver's Bay, gained thousands of followers, and eventually sailed to Westeros.

Daenerys conquered King's Landing but descended into madness after the death of her dragon Rhaegal and her advisor Missandei. She burned the city and its civilians, leading to her death at the hands of Jon Snow, the man she loved.`,
    timeline: [
      { event: 'Born in exile', season: 'Backstory' },
      { event: 'Married to Khal Drogo', season: 'S1', episode: 'E1' },
      { event: 'Hatched dragon eggs', season: 'S1', episode: 'E10' },
      { event: 'Liberated Astapor', season: 'S3', episode: 'E4' },
      { event: 'Conquered Meereen', season: 'S4', episode: 'E3' },
      { event: 'Flew away on Drogon', season: 'S5', episode: 'E9' },
      { event: 'Sailed to Westeros', season: 'S7', episode: 'E2' },
      { event: 'Captured the Iron Fleet', season: 'S7', episode: 'E4' },
      { event: 'Beyond the Wall expedition', season: 'S7', episode: 'E6' },
      { event: 'Conquered King\'s Landing', season: 'S8', episode: 'E5' },
      { event: 'Killed by Jon Snow', season: 'S8', episode: 'E5' }
    ],
    relatedLocations: ['Dragonstone', 'Meereen', 'King\'s Landing', 'Valyria', 'Pentos'],
    relatedCharacters: {
      family: ['Rhaegar Targaryen', 'Viserys Targaryen', 'Jon Snow'],
      allies: ['Tyrion Lannister', 'Jorah Mormont', 'Missandei', 'Grey Worm'],
      rivals: ['Cersei Lannister', 'Euron Greyjoy'],
      enemies: ['Cersei Lannister', 'Night King']
    },
    hasJourney: true
  },
  
  aryaStark: {
    id: 'aryaStark',
    name: 'Arya Stark',
    portrait: '',
    house: 'Stark',
    sigil: 'Direwolf',
    titles: ['No One', 'Princess', 'Lady of Winterfell'],
    status: 'Alive',
    allegiance: 'House Stark',
    quickFacts: {
      house: 'House Stark',
      region: 'The North / Braavos',
      family: 'Stark',
      occupation: 'Assassin, Explorer',
      firstAppearance: 'Season 1, Episode 1',
      lastAppearance: 'Season 8, Episode 6',
      portrayedBy: 'Maisie Williams'
    },
    biography: `Arya Stark, the youngest daughter of Eddard and Catelyn Stark, never fit the role of a lady. From childhood, she preferred swordplay and adventure to needlework. After her father's execution, she embarked on a journey across Westeros and Essos.

Trained by the Faceless Men in Braavos, Arya became a skilled assassin. She completed her training by killing those on her list, including Walder Frey and Meryn Trant. She returned to Winterfell and fought in the Battle of Winterfell, dealing the killing blow to the Night King.

After the war, Arya declined to marry Gendry and chose to explore what lies west of Westeros, setting sail on a ship to discover the unknown.`,
    timeline: [
      { event: 'Born at Winterfell', season: 'Backstory' },
      { event: 'Received Needle', season: 'S1', episode: 'E3' },
      { event: 'Witnessed father\'s execution', season: 'S1', episode: 'E9' },
      { event: 'Traveled with the Brotherhood', season: 'S3', episode: 'E2' },
      { event: 'Captured by the Hound', season: 'S3', episode: 'E5' },
      { event: 'Arrived in Braavos', season: 'S4', episode: 'E10' },
      { event: 'Became a Faceless Man', season: 'S5', episode: 'E5' },
      { event: 'Killed Walder Frey', season: 'S7', episode: 'E1' },
      { event: 'Returned to Winterfell', season: 'S7', episode: 'E7' },
      { event: 'Killed the Night King', season: 'S8', episode: 'E3' },
      { event: 'Sailed west of Westeros', season: 'S8', episode: 'E6' }
    ],
    relatedLocations: ['Winterfell', 'King\'s Landing', 'Braavos', 'The Twins', 'Harrenhal'],
    relatedCharacters: {
      family: ['Eddard Stark', 'Catelyn Stark', 'Jon Snow', 'Sansa Stark', 'Bran Stark'],
      allies: ['The Hound', 'Gendry', 'Jaime Lannister'],
      rivals: ['Cersei Lannister', 'Petyr Baelish'],
      enemies: ['Cersei Lannister', 'Walder Frey', 'Night King']
    },
    hasJourney: true
  },
  
  tyrion: {
    id: 'tyrion',
    name: 'Tyrion Lannister',
    portrait: '',
    house: 'Lannister',
    sigil: 'Lion',
    titles: ['Hand of the Queen', 'Hand of the King', 'Lord of Casterly Rock'],
    status: 'Alive',
    allegiance: 'House Targaryen',
    quickFacts: {
      house: 'House Lannister',
      region: 'The Westerlands / King\'s Landing',
      family: 'Lannister',
      occupation: 'Hand of the King/Queen',
      firstAppearance: 'Season 1, Episode 1',
      lastAppearance: 'Season 8, Episode 6',
      portrayedBy: 'Peter Dinklage'
    },
    biography: `Tyrion Lannister, the youngest son of Tywin Lannister, was born a dwarf and faced prejudice throughout his life. Despite his family's contempt, he proved to be intelligent, cunning, and politically astute.

He served as Hand of the King to Joffrey Baratheon and later to Daenerys Targaryen. Tyrion survived the Battle of Blackwater, escaped execution after being falsely accused of Joffrey's murder, and traveled to Meereen to serve Daenerys.

After Daenerys's death, Tyrion was pardoned by Bran Stark and appointed as Hand of the King, serving as an advisor to help rebuild the realm.`,
    timeline: [
      { event: 'Born at Casterly Rock', season: 'Backstory' },
      { event: 'Captured by Catelyn Stark', season: 'S1', episode: 'E2' },
      { event: 'Became Hand of the King', season: 'S2', episode: 'E3' },
      { event: 'Survived Battle of Blackwater', season: 'S2', episode: 'E9' },
      { event: 'Accused of Joffrey\'s murder', season: 'S4', episode: 'E2' },
      { event: 'Killed Tywin Lannister', season: 'S4', episode: 'E10' },
      { event: 'Traveled to Meereen', season: 'S5', episode: 'E5' },
      { event: 'Met Daenerys Targaryen', season: 'S5', episode: 'E6' },
      { event: 'Sailed to Westeros', season: 'S7', episode: 'E2' },
      { event: 'Imprisoned by Daenerys', season: 'S8', episode: 'E5' },
      { event: 'Appointed Hand of the King', season: 'S8', episode: 'E6' }
    ],
    relatedLocations: ['Casterly Rock', 'King\'s Landing', 'Meereen', 'The Wall', 'Dragonstone'],
    relatedCharacters: {
      family: ['Tywin Lannister', 'Cersei Lannister', 'Jaime Lannister'],
      allies: ['Daenerys Targaryen', 'Jon Snow', 'Varys'],
      rivals: ['Cersei Lannister', 'Petyr Baelish'],
      enemies: ['Cersei Lannister']
    },
    hasJourney: true
  },
  
  jaime: {
    id: 'jaime',
    name: 'Jaime Lannister',
    portrait: '',
    house: 'Lannister',
    sigil: 'Lion',
    titles: ['Kingslayer', 'Lord Commander of the Kingsguard'],
    status: 'Deceased',
    allegiance: 'House Lannister',
    quickFacts: {
      house: 'House Lannister',
      region: 'The Westerlands / King\'s Landing',
      family: 'Lannister',
      occupation: 'Kingsguard Knight',
      firstAppearance: 'Season 1, Episode 1',
      lastAppearance: 'Season 8, Episode 5',
      portrayedBy: 'Nikolaj Coster-Waldau'
    },
    biography: `Jaime Lannister, the eldest son of Tywin Lannister, was a knight of the Kingsguard known as the Kingslayer for killing the Mad King Aerys II Targaryen. For years, he was defined by his incestuous relationship with his twin sister Cersei and his role as her protector.

Captured by Robb Stark, Jaime lost his hand but began a journey of redemption. He formed a bond with Brienne of Tarth and returned to King's Landing to fight against the White Walkers. In the end, Jaime chose to return to Cersei and died with her during the destruction of King's Landing.`,
    timeline: [
      { event: 'Born at Casterly Rock', season: 'Backstory' },
      { event: 'Killed the Mad King', season: 'Backstory' },
      { event: 'Pushed Bran from the tower', season: 'S1', episode: 'E1' },
      { event: 'Captured by Robb Stark', season: 'S1', episode: 'E9' },
      { event: 'Lost his hand', season: 'S3', episode: 'E3' },
      { event: 'Traveled with Brienne', season: 'S3', episode: 'E5' },
      { event: 'Returned to King\'s Landing', season: 'S4', episode: 'E5' },
      { event: 'Left Cersei to fight in the North', season: 'S7', episode: 'E5' },
      { event: 'Fought at Battle of Winterfell', season: 'S8', episode: 'E3' },
      { event: 'Returned to Cersei', season: 'S8', episode: 'E4' },
      { event: 'Died in King\'s Landing', season: 'S8', episode: 'E5' }
    ],
    relatedLocations: ['Casterly Rock', 'King\'s Landing', 'Riverrun', 'Winterfell', 'The Reach'],
    relatedCharacters: {
      family: ['Tywin Lannister', 'Cersei Lannister', 'Tyrion Lannister'],
      allies: ['Brienne of Tarth', 'Bronn'],
      rivals: ['Ned Stark', 'Catelyn Stark'],
      enemies: ['Ned Stark', 'Daenerys Targaryen']
    },
    hasJourney: true
  },
  
  bran: {
    id: 'bran',
    name: 'Bran Stark',
    portrait: '',
    house: 'Stark',
    sigil: 'Direwolf',
    titles: ['King of the Six Kingdoms', 'The Three-Eyed Raven', 'Lord of Winterfell'],
    status: 'Alive',
    allegiance: 'House Stark',
    quickFacts: {
      house: 'House Stark',
      region: 'The North',
      family: 'Stark',
      occupation: 'King, Greenseer',
      firstAppearance: 'Season 1, Episode 1',
      lastAppearance: 'Season 8, Episode 6',
      portrayedBy: 'Isaac Hempstead Wright'
    },
    biography: `Bran Stark, the fourth child of Eddard and Catelyn Stark, was pushed from a tower by Jaime Lannister after witnessing his incest with Cersei. Paralyzed from the waist down, Bran discovered he had magical abilities as a greenseer.

Traveled beyond the Wall with the Reeds, Bran trained under the Three-Eyed Raven and learned to see through time and space. He became the new Three-Eyed Raven after his teacher's death. After the Great War, Bran was chosen as King of the Six Kingdoms due to his wisdom and lack of desire for power.`,
    timeline: [
      { event: 'Born at Winterfell', season: 'Backstory' },
      { event: 'Pushed from the tower', season: 'S1', episode: 'E2' },
      { event: 'Became paralyzed', season: 'S1', episode: 'E2' },
      { event: 'Dreamed of the Three-Eyed Raven', season: 'S2', episode: 'E5' },
      { event: 'Traveled beyond the Wall', season: 'S4', episode: 'E10' },
      { event: 'Met the Three-Eyed Raven', season: 'S4', episode: 'E10' },
      { event: 'Became the Three-Eyed Raven', season: 'S6', episode: 'E5' },
      { event: 'Returned to Winterfell', season: 'S7', episode: 'E3' },
      { event: 'Revealed Jon\'s parentage', season: 'S7', episode: 'E7' },
      { event: 'Chosen as King', season: 'S8', episode: 'E6' }
    ],
    relatedLocations: ['Winterfell', 'Beyond the Wall', 'The Wall', 'King\'s Landing'],
    relatedCharacters: {
      family: ['Eddard Stark', 'Catelyn Stark', 'Jon Snow', 'Sansa Stark', 'Arya Stark'],
      allies: ['Meera Reed', 'Jojen Reed', 'Theon Greyjoy'],
      rivals: ['Petyr Baelish'],
      enemies: ['Night King']
    },
    hasJourney: true
  },
  
  theHound: {
    id: 'theHound',
    name: 'Sandor Clegane',
    portrait: '',
    house: 'Clegane',
    sigil: 'Dogs',
    titles: ['The Hound', 'Member of the Kingsguard'],
    status: 'Deceased',
    allegiance: 'None',
    quickFacts: {
      house: 'House Clegane',
      region: 'The Westerlands',
      family: 'Clegane',
      occupation: 'Mercenary, Former Kingsguard',
      firstAppearance: 'Season 1, Episode 1',
      lastAppearance: 'Season 8, Episode 5',
      portrayedBy: 'Rory McCann'
    },
    biography: `Sandor Clegane, known as the Hound, was the younger brother of Gregor Clegane (the Mountain). Severely burned as a child by his brother, Sandor developed a fear of fire but became a fierce warrior.

He served as Joffrey Baratheon's personal guard but abandoned his post during the Battle of Blackwater. Sandor traveled with Arya Stark, forming an unlikely bond with her. After being left for dead, he was rescued by the Brotherhood and eventually fought his brother in the ruins of King's Landing, dying together as they fell from the Red Keep.`,
    timeline: [
      { event: 'Born at Clegane Keep', season: 'Backstory' },
      { event: 'Burned by Gregor', season: 'Backstory' },
      { event: 'Became Joffrey\'s guard', season: 'S1', episode: 'E1' },
      { event: 'Abandoned during Blackwater', season: 'S2', episode: 'E9' },
      { event: 'Captured by the Brotherhood', season: 'S3', episode: 'E5' },
      { event: 'Traveled with Arya', season: 'S4', episode: 'E1' },
      { event: 'Left for dead', season: 'S4', episode: 'E8' },
      { event: 'Rescued by the Brotherhood', season: 'S6', episode: 'E7' },
      { event: 'Fought at Battle of Winterfell', season: 'S8', episode: 'E3' },
      { event: 'Killed Gregor Clegane', season: 'S8', episode: 'E5' }
    ],
    relatedLocations: ['King\'s Landing', 'The Riverlands', 'Winterfell', 'The Vale'],
    relatedCharacters: {
      family: ['Gregor Clegane'],
      allies: ['Arya Stark', 'Thoros of Myr'],
      rivals: ['Gregor Clegane', 'Beric Dondarrion'],
      enemies: ['Gregor Clegane', 'Cersei Lannister']
    },
    hasJourney: true
  },
  
  sansa: {
    id: 'sansa',
    name: 'Sansa Stark',
    portrait: '',
    house: 'Stark',
    sigil: 'Direwolf',
    titles: ['Lady of Winterfell', 'Queen in the North'],
    status: 'Alive',
    allegiance: 'House Stark',
    quickFacts: {
      house: 'House Stark',
      region: 'The North / King\'s Landing',
      family: 'Stark',
      occupation: 'Queen, Lady of Winterfell',
      firstAppearance: 'Season 1, Episode 1',
      lastAppearance: 'Season 8, Episode 6',
      portrayedBy: 'Sophie Turner'
    },
    biography: `Sansa Stark, the eldest daughter of Eddard and Catelyn Stark, was raised to be a lady. Initially naive and dreaming of a fairytale marriage to Joffrey Baratheon, she suffered greatly after her father's execution.

Held captive in King's Landing, Sansa learned to survive through political intrigue. She was married to Tyrion Lannister and later Ramsay Bolton, enduring abuse at the hands of the latter. After escaping Winterfell, Sansa reunited with her family and reclaimed her home. She grew into a cunning leader and was declared Queen in the North after the Great War.`,
    timeline: [
      { event: 'Born at Winterfell', season: 'Backstory' },
      { event: 'Engaged to Joffrey', season: 'S1', episode: 'E1' },
      { event: 'Witnessed father\'s execution', season: 'S1', episode: 'E9' },
      { event: 'Married to Tyrion', season: 'S3', episode: 'E8' },
      { event: 'Married to Ramsay Bolton', season: 'S5', episode: 'E6' },
      { event: 'Escaped Winterfell', season: 'S6', episode: 'E9' },
      { event: 'Reunited with Jon', season: 'S6', episode: 'E9' },
      { event: 'Reclaimed Winterfell', season: 'S6', episode: 'E10' },
      { event: 'Survived Battle of Winterfell', season: 'S8', episode: 'E3' },
      { event: 'Declared Queen in the North', season: 'S8', episode: 'E6' }
    ],
    relatedLocations: ['Winterfell', 'King\'s Landing', 'The Eyrie', 'The Vale'],
    relatedCharacters: {
      family: ['Eddard Stark', 'Catelyn Stark', 'Jon Snow', 'Arya Stark', 'Bran Stark'],
      allies: ['Jon Snow', 'Brienne of Tarth', 'Tyrion Lannister'],
      rivals: ['Cersei Lannister', 'Petyr Baelish'],
      enemies: ['Cersei Lannister', 'Ramsay Bolton', 'Petyr Baelish']
    },
    hasJourney: true
  },

  // Additional profiles for characters referenced in loreData and mapData
  nedStark: {
    id: 'nedStark',
    name: 'Eddard Stark',
    aliases: ['Ned Stark'],
    portrait: '',
    house: 'Stark',
    sigil: 'Direwolf',
    titles: ['Lord of Winterfell', 'Warden of the North', 'Hand of the King'],
    status: 'Deceased',
    allegiance: 'House Stark',
    quickFacts: {
      house: 'House Stark',
      region: 'The North',
      family: 'Stark',
      occupation: 'Lord, Former Hand of the King',
      firstAppearance: 'Season 1, Episode 1',
      lastAppearance: 'Season 1, Episode 9',
      portrayedBy: 'Sean Bean'
    },
    biography: `Eddard Stark, known as Ned, was the Lord of Winterfell and Warden of the North. A man of honor and duty, he was asked by his friend Robert Baratheon to serve as Hand of the King.

In King's Landing, Ned discovered the truth about Cersei's children and Robert's true heir. His refusal to compromise his honor led to his imprisonment and execution on the orders of Joffrey Baratheon. His death sparked the War of the Five Kings and changed the fate of the realm forever.`,
    timeline: [
      { event: 'Born at Winterfell', season: 'Backstory' },
      { event: 'Fought in Robert\'s Rebellion', season: 'Backstory' },
      { event: 'Became Lord of Winterfell', season: 'Backstory' },
      { event: 'Traveled to King\'s Landing', season: 'S1', episode: 'E2' },
      { event: 'Became Hand of the King', season: 'S1', episode: 'E4' },
      { event: 'Discovered Cersei\'s secret', season: 'S1', episode: 'E7' },
      { event: 'Imprisoned by the Lannisters', season: 'S1', episode: 'E8' },
      { event: 'Executed at the Great Sept', season: 'S1', episode: 'E9' }
    ],
    relatedLocations: ['Winterfell', 'King\'s Landing', 'The Eyrie'],
    relatedCharacters: {
      family: ['Catelyn Stark', 'Robb Stark', 'Sansa Stark', 'Arya Stark', 'Bran Stark', 'Rickon Stark', 'Jon Snow'],
      allies: ['Robert Baratheon', 'Catelyn Stark'],
      rivals: ['Cersei Lannister', 'Petyr Baelish'],
      enemies: ['Cersei Lannister', 'Joffrey Baratheon']
    },
    hasJourney: false
  },

  catelynStark: {
    id: 'catelynStark',
    name: 'Catelyn Stark',
    portrait: '',
    house: 'Stark',
    sigil: 'Direwolf',
    titles: ['Lady of Winterfell'],
    status: 'Deceased',
    allegiance: 'House Stark',
    quickFacts: {
      house: 'House Stark',
      region: 'The North',
      family: 'Stark (born Tully)',
      occupation: 'Lady of Winterfell',
      firstAppearance: 'Season 1, Episode 1',
      lastAppearance: 'Season 3, Episode 9',
      portrayedBy: 'Michelle Fairley'
    },
    biography: `Catelyn Stark, born Catelyn Tully, was the wife of Eddard Stark and Lady of Winterfell. A devoted mother and skilled politician, she worked tirelessly to protect her family after Ned's capture.

She captured Tyrion Lannister, believing him responsible for an assassination attempt on Bran. Later, she traveled to the Riverlands to seek alliances for her son Robb's cause. She was murdered at the Red Wedding alongside Robb, a tragedy that devastated the Stark family.`,
    timeline: [
      { event: 'Born at Riverrun', season: 'Backstory' },
      { event: 'Married Eddard Stark', season: 'Backstory' },
      { event: 'Captured Tyrion Lannister', season: 'S1', episode: 'E5' },
      { event: 'Traveled to the Riverlands', season: 'S2', episode: 'E1' },
      { event: 'Witnessed Robb\'s coronation', season: 'S2', episode: 'E3' },
      { event: 'Released Jaime Lannister', season: 'S3', episode: 'E3' },
      { event: 'Attended the Red Wedding', season: 'S3', episode: 'E9' },
      { event: 'Murdered at the Red Wedding', season: 'S3', episode: 'E9' }
    ],
    relatedLocations: ['Winterfell', 'Riverrun', 'The Twins'],
    relatedCharacters: {
      family: ['Eddard Stark', 'Robb Stark', 'Sansa Stark', 'Arya Stark', 'Bran Stark', 'Rickon Stark'],
      allies: ['Robb Stark', 'Brienne of Tarth'],
      rivals: ['Tywin Lannister', 'Walder Frey'],
      enemies: ['Tywin Lannister', 'Walder Frey']
    },
    hasJourney: false
  },

  robbStark: {
    id: 'robbStark',
    name: 'Robb Stark',
    portrait: '',
    house: 'Stark',
    sigil: 'Direwolf',
    titles: ['King in the North'],
    status: 'Deceased',
    allegiance: 'House Stark',
    quickFacts: {
      house: 'House Stark',
      region: 'The North',
      family: 'Stark',
      occupation: 'King in the North',
      firstAppearance: 'Season 1, Episode 1',
      lastAppearance: 'Season 3, Episode 9',
      portrayedBy: 'Richard Madden'
    },
    biography: `Robb Stark was the eldest son of Eddard and Catelyn Stark. After his father's execution, he was declared King in the North by the Northern lords.

Robb proved to be a brilliant military commander, winning every battle he fought. However, his political mistakes—including breaking his marriage pact with the Freys—led to his downfall. He was betrayed and murdered at the Red Wedding alongside his mother and most of his army.`,
    timeline: [
      { event: 'Born at Winterfell', season: 'Backstory' },
      { event: 'Became heir to Winterfell', season: 'Backstory' },
      { event: 'Called the banners after Ned\'s capture', season: 'S1', episode: 'E9' },
      { event: 'Declared King in the North', season: 'S2', episode: 'E3' },
      { event: 'Won Battle of Oxcross', season: 'S2', episode: 'E6' },
      { event: 'Married Talisa Maegyr', season: 'S2', episode: 'E10' },
      { event: 'Lost the Karstarks', season: 'S3', episode: 'E5' },
      { event: 'Attended the Red Wedding', season: 'S3', episode: 'E9' },
      { event: 'Murdered at the Red Wedding', season: 'S3', episode: 'E9' }
    ],
    relatedLocations: ['Winterfell', 'Riverrun', 'The Twins'],
    relatedCharacters: {
      family: ['Eddard Stark', 'Catelyn Stark', 'Sansa Stark', 'Arya Stark', 'Bran Stark', 'Rickon Stark'],
      allies: ['Theon Greyjoy', 'Talisa Maegyr'],
      rivals: ['Tywin Lannister', 'Walder Frey'],
      enemies: ['Tywin Lannister', 'Walder Frey', 'Roose Bolton']
    },
    hasJourney: false
  },

  rickonStark: {
    id: 'rickonStark',
    name: 'Rickon Stark',
    portrait: '',
    house: 'Stark',
    sigil: 'Direwolf',
    titles: ['Young Stark Heir'],
    status: 'Deceased',
    allegiance: 'House Stark',
    quickFacts: {
      house: 'House Stark',
      region: 'The North',
      family: 'Stark',
      occupation: 'Heir to Winterfell',
      firstAppearance: 'Season 1, Episode 1',
      lastAppearance: 'Season 6, Episode 3',
      portrayedBy: 'Art Parkinson'
    },
    biography: `Rickon Stark was the youngest son of Eddard and Catelyn Stark. After his father's death, he was separated from his siblings and fled with his brother Bran and the Reeds beyond the Wall.

Rickon eventually ended up at Last Hearth with House Umber. He was handed over to Ramsay Bolton as a hostage and killed during the Battle of the Bastards when Jon Snow arrived to reclaim Winterfell.`,
    timeline: [
      { event: 'Born at Winterfell', season: 'Backstory' },
      { event: 'Fled with Bran beyond the Wall', season: 'S3', episode: 'E10' },
      { event: 'Separated from Bran', season: 'S4', episode: 'E8' },
      { event: 'Taken to Last Hearth', season: 'S6', episode: 'E2' },
      { event: 'Handed to Ramsay Bolton', season: 'S6', episode: 'E2' },
      { event: 'Killed at Battle of the Bastards', season: 'S6', episode: 'E9' }
    ],
    relatedLocations: ['Winterfell', 'Last Hearth', 'Beyond the Wall'],
    relatedCharacters: {
      family: ['Eddard Stark', 'Catelyn Stark', 'Robb Stark', 'Sansa Stark', 'Arya Stark', 'Bran Stark', 'Jon Snow'],
      allies: ['Bran Stark', 'Osha'],
      rivals: ['Ramsay Bolton'],
      enemies: ['Ramsay Bolton']
    },
    hasJourney: false
  },

  cerseiLannister: {
    id: 'cerseiLannister',
    name: 'Cersei Lannister',
    portrait: '',
    house: 'Lannister',
    sigil: 'Lion',
    titles: ['Queen of the Seven Kingdoms'],
    status: 'Deceased',
    allegiance: 'House Lannister',
    quickFacts: {
      house: 'House Lannister',
      region: 'The Westerlands / King\'s Landing',
      family: 'Lannister',
      occupation: 'Queen',
      firstAppearance: 'Season 1, Episode 1',
      lastAppearance: 'Season 8, Episode 5',
      portrayedBy: 'Lena Headey'
    },
    biography: `Cersei Lannister was the eldest daughter of Tywin Lannister and twin sister of Jaime Lannister. After Robert Baratheon's death, she became Queen Regent and ruthlessly eliminated her enemies.

Her reign was marked by cruelty and paranoia. She destroyed the Great Sept of Baelor, killing hundreds including her enemies. After Daenerys Targaryen arrived in Westeros, Cersei refused to surrender and burned King's Landing with wildfire. She died when the Red Keep collapsed around her.`,
    timeline: [
      { event: 'Born at Casterly Rock', season: 'Backstory' },
      { event: 'Married Robert Baratheon', season: 'Backstory' },
      { event: 'Became Queen Regent', season: 'S1', episode: 'E5' },
      { event: 'Imprisoned by the Faith', season: 'S5', episode: 'E5' },
      { event: 'Walk of Atonement', season: 'S5', episode: 'E10' },
      { event: 'Destroyed the Great Sept', season: 'S6', episode: 'E10' },
      { event: 'Became Queen of the Seven Kingdoms', season: 'S7', episode: 'E3' },
      { event: 'Refused to surrender', season: 'S8', episode: 'E5' },
      { event: 'Died in the Red Keep', season: 'S8', episode: 'E5' }
    ],
    relatedLocations: ['Casterly Rock', 'King\'s Landing', 'The Red Keep'],
    relatedCharacters: {
      family: ['Tywin Lannister', 'Jaime Lannister', 'Tyrion Lannister'],
      allies: ['Jaime Lannister', 'Qyburn', 'Gregor Clegane'],
      rivals: ['Tyrion Lannister', 'Daenerys Targaryen'],
      enemies: ['Tyrion Lannister', 'Daenerys Targaryen', 'Olenna Tyrell']
    },
    hasJourney: false
  },

  tywinLannister: {
    id: 'tywinLannister',
    name: 'Tywin Lannister',
    portrait: '',
    house: 'Lannister',
    sigil: 'Lion',
    titles: ['Lord of Casterly Rock', 'Hand of the King'],
    status: 'Deceased',
    allegiance: 'House Lannister',
    quickFacts: {
      house: 'House Lannister',
      region: 'The Westerlands',
      family: 'Lannister',
      occupation: 'Lord, Hand of the King',
      firstAppearance: 'Season 1, Episode 1',
      lastAppearance: 'Season 4, Episode 10',
      portrayedBy: 'Charles Dance'
    },
    biography: `Tywin Lannister was the Lord of Casterly Rock and Hand of the King to three monarchs. A ruthless and brilliant strategist, he built the Lannister family into the most powerful house in Westeros.

Despite his contempt for his son Tyrion, Tywin relied on his intelligence. He was murdered by Tyrion on the chamber pot, a humiliating end for a man who valued legacy above all else.`,
    timeline: [
      { event: 'Born at Casterly Rock', season: 'Backstory' },
      { event: 'Sacked King\'s Landing', season: 'Backstory' },
      { event: 'Became Hand to Aerys II', season: 'Backstory' },
      { event: 'Became Hand to Joffrey', season: 'S1', episode: 'E3' },
      { event: 'Won Battle of Blackwater', season: 'S2', episode: 'E9' },
      { event: 'Resigned as Hand', season: 'S3', episode: 'E10' },
      { event: 'Returned to King\'s Landing', season: 'S4', episode: 'E5' },
      { event: 'Murdered by Tyrion', season: 'S4', episode: 'E10' }
    ],
    relatedLocations: ['Casterly Rock', 'King\'s Landing', 'Harrenhal'],
    relatedCharacters: {
      family: ['Cersei Lannister', 'Jaime Lannister', 'Tyrion Lannister'],
      allies: ['Cersei Lannister', 'Jaime Lannister'],
      rivals: ['Tyrion Lannister', 'Tyrells'],
      enemies: ['Tyrion Lannister']
    },
    hasJourney: false
  },

  nightKing: {
    id: 'nightKing',
    name: 'The Night King',
    portrait: '',
    house: 'White Walkers',
    sigil: 'Ice',
    titles: ['King of the White Walkers'],
    status: 'Deceased',
    allegiance: 'White Walkers',
    quickFacts: {
      house: 'White Walkers',
      region: 'Beyond the Wall',
      family: 'None',
      occupation: 'King of the Dead',
      firstAppearance: 'Season 4, Episode 4',
      lastAppearance: 'Season 8, Episode 3',
      portrayedBy: 'Richard Brake / Vladimir Furdik'
    },
    biography: `The Night King was the leader of the White Walkers and the Army of the Dead. Created by the Children of the Forest thousands of years ago as a weapon against men, he turned against his creators and sought to erase all life from Westeros.

He led the White Walkers south, destroying everything in their path. At the Battle of Winterfell, he was killed by the Valyrian steel dagger of Arya Stark, ending the threat of the Long Night forever.`,
    timeline: [
      { event: 'Created by the Children', season: 'Backstory' },
      { event: 'Marked Bran Stark', season: 'S6', episode: 'E5' },
      { event: 'Attacked Hardhome', season: 'S5', episode: 'E8' },
      { event: 'Brought down the Wall', season: 'S7', episode: 'E7' },
      { event: 'Arrived at Winterfell', season: 'S8', episode: 'E2' },
      { event: 'Killed by Arya Stark', season: 'S8', episode: 'E3' }
    ],
    relatedLocations: ['Beyond the Wall', 'Hardhome', 'Winterfell', 'The Wall'],
    relatedCharacters: {
      family: [],
      allies: ['White Walkers', 'Wights'],
      rivals: ['Jon Snow', 'Bran Stark'],
      enemies: ['Jon Snow', 'Bran Stark', 'Daenerys Targaryen', 'Arya Stark']
    },
    hasJourney: false
  },

  stannisBaratheon: {
    id: 'stannisBaratheon',
    name: 'Stannis Baratheon',
    portrait: '',
    house: 'Baratheon',
    sigil: 'Stag',
    titles: ['Lord of Dragonstone', 'King of the Andals'],
    status: 'Deceased',
    allegiance: 'House Baratheon',
    quickFacts: {
      house: 'House Baratheon',
      region: 'The Stormlands',
      family: 'Baratheon',
      occupation: 'King Claimant',
      firstAppearance: 'Season 2, Episode 1',
      lastAppearance: 'Season 5, Episode 10',
      portrayedBy: 'Stephen Dillane'
    },
    biography: `Stannis Baratheon was the younger brother of Robert Baratheon and Lord of Dragonstone. After Robert's death, he discovered the truth about Cersei's children and claimed the Iron Throne as his right.

Influenced by the red priestess Melisandre, Stannis embraced the Lord of Light. He burned his own daughter Shireen as a sacrifice, a decision that destroyed his army. He was killed by Brienne of Tarth during the Battle of Winterfell.`,
    timeline: [
      { event: 'Born at Storm\'s End', season: 'Backstory' },
      { event: 'Held Storm\'s End during siege', season: 'Backstory' },
      { event: 'Claimed the Iron Throne', season: 'S2', episode: 'E1' },
      { event: 'Sailed to Blackwater Bay', season: 'S2', episode: 'E9' },
      { event: 'Defeated at Blackwater', season: 'S2', episode: 'E9' },
      { event: 'Traveled to the Wall', season: 'S4', episode: 'E9' },
      { event: 'Burned Shireen', season: 'S5', episode: 'E9' },
      { event: 'Killed at Winterfell', season: 'S5', episode: 'E10' }
    ],
    relatedLocations: ['Dragonstone', 'Storm\'s End', 'The Wall', 'Winterfell'],
    relatedCharacters: {
      family: ['Robert Baratheon', 'Renly Baratheon', 'Shireen Baratheon'],
      allies: ['Melisandre', 'Davos Seaworth'],
      rivals: ['Renly Baratheon', 'Daenerys Targaryen'],
      enemies: ['Renly Baratheon', 'Daenerys Targaryen']
    },
    hasJourney: false
  },

  manceRayder: {
    id: 'manceRayder',
    name: 'Mance Rayder',
    portrait: '',
    house: 'Free Folk',
    sigil: 'Broken Chains',
    titles: ['King-Beyond-the-Wall'],
    status: 'Deceased',
    allegiance: 'Free Folk',
    quickFacts: {
      house: 'Free Folk',
      region: 'Beyond the Wall',
      family: 'None',
      occupation: 'King of the Free Folk',
      firstAppearance: 'Season 3, Episode 1',
      lastAppearance: 'Season 5, Episode 3',
      portrayedBy: 'Ciarán Hinds'
    },
    biography: `Mance Rayder was a former member of the Night's Watch who abandoned his post to unite the Free Folk. Known as the King-Beyond-the-Wall, he led the wildlings in an attempt to breach the Wall and escape the White Walkers.

Captured by Stannis Baratheon after the Battle of Castle Black, Mance refused to bend the knee and was burned alive by Melisandre. His legacy lived on through Jon Snow, who continued his work uniting the Free Folk with the Night's Watch.`,
    timeline: [
      { event: 'Joined the Night\'s Watch', season: 'Backstory' },
      { event: 'Abandoned the Watch', season: 'Backstory' },
      { event: 'United the Free Folk', season: 'Backstory' },
      { event: 'Attacked Castle Black', season: 'S4', episode: 'E9' },
      { event: 'Captured by Stannis', season: 'S5', episode: 'E1' },
      { event: 'Refused to bend the knee', season: 'S5', episode: 'E2' },
      { event: 'Burned alive', season: 'S5', episode: 'E3' }
    ],
    relatedLocations: ['Beyond the Wall', 'Castle Black', 'The Wall'],
    relatedCharacters: {
      family: [],
      allies: ['Tormund Giantsbane', 'Jon Snow'],
      rivals: ['Stannis Baratheon'],
      enemies: ['Stannis Baratheon']
    },
    hasJourney: false
  },

  samwellTarly: {
    id: 'samwellTarly',
    name: 'Samwell Tarly',
    portrait: '',
    house: 'Tarly',
    sigil: 'Strider',
    titles: ['Maester', 'Grand Maester'],
    status: 'Alive',
    allegiance: 'Night\'s Watch',
    quickFacts: {
      house: 'House Tarly',
      region: 'The Reach',
      family: 'Tarly',
      occupation: 'Maester',
      firstAppearance: 'Season 1, Episode 5',
      lastAppearance: 'Season 8, Episode 6',
      portrayedBy: 'John Bradley'
    },
    biography: `Samwell Tarly was sent to the Night's Watch by his father, who considered him a coward. At Castle Black, he became Jon Snow's closest friend and proved his bravery time and again.

Sam discovered the weakness of the White Walkers and helped cure Jorah Mormont of greyscale. He later became Grand Maester to King Bran Stark, using his knowledge to help rebuild the realm.`,
    timeline: [
      { event: 'Born at Horn Hill', season: 'Backstory' },
      { event: 'Sent to the Night\'s Watch', season: 'Backstory' },
      { event: 'Became Jon Snow\'s friend', season: 'S1', episode: 'E5' },
      { event: 'Killed a White Walker', season: 'S1', episode: 'E8' },
      { event: 'Discovered dragonglass', season: 'S2', episode: 'E5' },
      { event: 'Met Gilly at Craster\'s Keep', season: 'S3', episode: 'E1' },
      { event: 'Traveled to Oldtown', season: 'S6', episode: 'E6' },
      { event: 'Became a Maester', season: 'S7', episode: 'E2' },
      { event: 'Cured Jorah Mormont', season: 'S7', episode: 'E5' },
      { event: 'Named Grand Maester', season: 'S8', episode: 'E6' }
    ],
    relatedLocations: ['Castle Black', 'The Wall', 'Horn Hill', 'Oldtown'],
    relatedCharacters: {
      family: ['Randyll Tarly', 'Dickon Tarly'],
      allies: ['Jon Snow', 'Gilly', 'Gilly\'s Son'],
      rivals: ['Randyll Tarly'],
      enemies: ['White Walkers']
    },
    hasJourney: false
  },

  greyWorm: {
    id: 'greyWorm',
    name: 'Grey Worm',
    portrait: '',
    house: 'Unsullied',
    sigil: 'Spear',
    titles: ['Commander of the Unsullied'],
    status: 'Alive',
    allegiance: 'Daenerys Targaryen',
    quickFacts: {
      house: 'Unsullied',
      region: 'Essos',
      family: 'None',
      occupation: 'Commander',
      firstAppearance: 'Season 3, Episode 3',
      lastAppearance: 'Season 8, Episode 6',
      portrayedBy: 'Jacob Anderson'
    },
    biography: `Grey Worm was a commander of the Unsullied, the elite warrior army of Astapor. Freed by Daenerys Targaryen, he became one of her most loyal commanders and developed a forbidden romance with Missandei.

After Daenerys's death, Grey Worm led the Unsullied to Naath to protect the island from slavers, honoring Missandei's memory and Daenerys's final command.`,
    timeline: [
      { event: 'Trained as Unsullied', season: 'Backstory' },
      { event: 'Freed by Daenerys', season: 'S3', episode: 'E4' },
      { event: 'Became Commander', season: 'S3', episode: 'E4' },
      { event: 'Conquered Meereen', season: 'S4', episode: 'E3' },
      { event: 'Fell in love with Missandei', season: 'S5' },
      { event: 'Sailed to Westeros', season: 'S7', episode: 'E2' },
      { event: 'Captured Casterly Rock', season: 'S7', episode: 'E3' },
      { event: 'Witnessed Missandei\'s death', season: 'S8', episode: 'E4' },
      { event: 'Left for Naath', season: 'S8', episode: 'E6' }
    ],
    relatedLocations: ['Astapor', 'Meereen', 'Dragonstone', 'King\'s Landing', 'Naath'],
    relatedCharacters: {
      family: [],
      allies: ['Daenerys Targaryen', 'Missandei', 'Tyrion Lannister'],
      rivals: ['Cersei Lannister'],
      enemies: ['Cersei Lannister']
    },
    hasJourney: false
  },

  missandei: {
    id: 'missandei',
    name: 'Missandei',
    portrait: '',
    house: 'None',
    sigil: 'Dove',
    titles: ['Advisor to Daenerys'],
    status: 'Deceased',
    allegiance: 'Daenerys Targaryen',
    quickFacts: {
      house: 'None',
      region: 'Essos',
      family: 'Naathi',
      occupation: 'Advisor, Translator',
      firstAppearance: 'Season 3, Episode 4',
      lastAppearance: 'Season 8, Episode 5',
      portrayedBy: 'Nathalie Emmanuel'
    },
    biography: `Missandei was a Naathi slave who served as a translator in Astapor. Freed by Daenerys Targaryen, she became one of her closest advisors and confidantes.

She fell in love with Grey Worm and helped Daenerys rule Meereen. During the war for Westeros, Missandei was captured by Cersei Lannister and executed on the walls of King's Landing, an act that pushed Daenerys toward madness.`,
    timeline: [
      { event: 'Born in Naath', season: 'Backstory' },
      { event: 'Enslaved in Astapor', season: 'Backstory' },
      { event: 'Freed by Daenerys', season: 'S3', episode: 'E4' },
      { event: 'Became advisor', season: 'S3', episode: 'E4' },
      { event: 'Fell in love with Grey Worm', season: 'S5' },
      { event: 'Traveled to Westeros', season: 'S7', episode: 'E2' },
      { event: 'Captured by Cersei', season: 'S8', episode: 'E4' },
      { event: 'Executed at King\'s Landing', season: 'S8', episode: 'E5' }
    ],
    relatedLocations: ['Astapor', 'Meereen', 'Dragonstone', 'King\'s Landing'],
    relatedCharacters: {
      family: [],
      allies: ['Daenerys Targaryen', 'Grey Worm', 'Tyrion Lannister'],
      rivals: ['Cersei Lannister'],
      enemies: ['Cersei Lannister']
    },
    hasJourney: false
  },

  jorahMormont: {
    id: 'jorahMormont',
    name: 'Jorah Mormont',
    portrait: '',
    house: 'Mormont',
    sigil: 'Bear',
    titles: ['Knight', 'Exiled Lord'],
    status: 'Deceased',
    allegiance: 'Daenerys Targaryen',
    quickFacts: {
      house: 'House Mormont',
      region: 'The North',
      family: 'Mormont',
      occupation: 'Knight, Advisor',
      firstAppearance: 'Season 1, Episode 2',
      lastAppearance: 'Season 8, Episode 5',
      portrayedBy: 'Iain Glen'
    },
    biography: `Jorah Mormont was the exiled Lord of Bear Island. After selling slaves, he was exiled and fled to Essos, where he fell in love with Daenerys Targaryen and became her most loyal protector.

Cured of greyscale by Samwell Tarly, Jorah fought alongside Daenerys in the Great War and the final battle for King's Landing. He died defending her during the attack on King's Landing, finally at peace with his redemption.`,
    timeline: [
      { event: 'Born at Bear Island', season: 'Backstory' },
      { event: 'Became Lord of Bear Island', season: 'Backstory' },
      { event: 'Exiled for slavery', season: 'Backstory' },
      { event: 'Met Daenerys', season: 'S1', episode: 'E2' },
      { event: 'Saved Daenerys from assassination', season: 'S1', episode: 'E4' },
      { event: 'Spied on Daenerys', season: 'S1', episode: 'E9' },
      { event: 'Exiled again', season: 'S4', episode: 'E10' },
      { event: 'Contracted greyscale', season: 'S6', episode: 'E5' },
      { event: 'Cured by Samwell Tarly', season: 'S7', episode: 'E5' },
      { event: 'Died at King\'s Landing', season: 'S8', episode: 'E5' }
    ],
    relatedLocations: ['Bear Island', 'Meereen', 'Dragonstone', 'Winterfell', 'King\'s Landing'],
    relatedCharacters: {
      family: ['Jeor Mormont'],
      allies: ['Daenerys Targaryen', 'Jon Snow'],
      rivals: ['Khal Drogo', 'Daario Naharis'],
      enemies: ['Khal Drogo']
    },
    hasJourney: false
  },

  jaqenHghar: {
    id: 'jaqenHghar',
    name: 'Jaqen H\'ghar',
    portrait: '',
    house: 'Faceless Men',
    sigil: 'Mask',
    titles: ['Faceless Man'],
    status: 'Unknown',
    allegiance: 'House of Black and White',
    quickFacts: {
      house: 'Faceless Men',
      region: 'Braavos',
      family: 'None',
      occupation: 'Assassin',
      firstAppearance: 'Season 2, Episode 2',
      lastAppearance: 'Season 5, Episode 10',
      portrayedBy: 'Tom Wlaschiha'
    },
    biography: `Jaqen H'ghar was a Faceless Man from Braavos. Imprisoned at Harrenhal, he was freed by Arya Stark and repaid her by helping her escape and teaching her about the Faceless Men's philosophy.

He later became one of Arya's trainers at the House of Black and White, testing her dedication and teaching her the art of assassination. His true identity remains a mystery, as Faceless Men can change their faces at will.`,
    timeline: [
      { event: 'Trained as Faceless Man', season: 'Backstory' },
      { event: 'Imprisoned at Harrenhal', season: 'S2', episode: 'E2' },
      { event: 'Freed by Arya Stark', season: 'S2', episode: 'E2' },
      { event: 'Killed for Arya', season: 'S2', episode: 'E8' },
      { event: 'Left Harrenhal', season: 'S2', episode: 'E10' },
      { event: 'Trained Arya at Braavos', season: 'S5', episode: 'E5' },
      { event: 'Became No One', season: 'S5', episode: 'E10' }
    ],
    relatedLocations: ['Harrenhal', 'Braavos', 'The House of Black and White'],
    relatedCharacters: {
      family: [],
      allies: ['Arya Stark'],
      rivals: [],
      enemies: []
    },
    hasJourney: false
  },

  // Additional profiles for characters referenced in relationships
  littlefinger: {
    id: 'littlefinger',
    name: 'Petyr Baelish',
    aliases: ['Littlefinger'],
    portrait: '',
    house: 'Baelish',
    sigil: 'Mockingbird',
    titles: ['Master of Coin', 'Lord of Harrenhal'],
    status: 'Deceased',
    allegiance: 'None',
    quickFacts: {
      house: 'House Baelish',
      region: 'The Vale',
      family: 'Baelish',
      occupation: 'Master of Coin, Lord of Harrenhal',
      firstAppearance: 'Season 1, Episode 1',
      lastAppearance: 'Season 7, Episode 7',
      portrayedBy: 'Aidan Gillen'
    },
    biography: `Petyr Baelish, known as Littlefinger, was a master of political intrigue who rose from a minor lordling to become one of the most powerful men in Westeros. He orchestrated the War of the Five Kings and manipulated events from the shadows.

His obsession with Catelyn Stark and later Sansa Stark led to his downfall. After arranging the marriage of Sansa to Ramsay Bolton, he tried to manipulate Sansa against her sister Arya. Sansa saw through his schemes and sentenced him to death, executed by Arya.`,
    timeline: [
      { event: 'Born in the Fingers', season: 'Backstory' },
      { event: 'Became Master of Coin', season: 'Backstory' },
      { event: 'Betrayed Ned Stark', season: 'S1', episode: 'E7' },
      { event: 'Arranged Sansa\'s marriage to Tyrion', season: 'S3', episode: 'E6' },
      { event: 'Killed Joffrey Baratheon', season: 'S4', episode: 'E2' },
      { event: 'Married Lysa Arryn', season: 'S4', episode: 'E6' },
      { event: 'Killed Lysa Arryn', season: 'S4', episode: 'E7' },
      { event: 'Became Lord of Harrenhal', season: 'S5', episode: 'E3' },
      { event: 'Arranged Sansa\'s marriage to Ramsay', season: 'S5', episode: 'E6' },
      { event: 'Executed by Arya Stark', season: 'S7', episode: 'E7' }
    ],
    relatedLocations: ['King\'s Landing', 'The Eyrie', 'Harrenhal', 'Winterfell'],
    relatedCharacters: {
      family: [],
      allies: [],
      rivals: ['Varys', 'Olenna Tyrell'],
      enemies: ['Ned Stark', 'Sansa Stark', 'Arya Stark']
    },
    hasJourney: false
  },

  ramsayBolton: {
    id: 'ramsayBolton',
    name: 'Ramsay Bolton',
    portrait: '',
    house: 'Bolton',
    sigil: 'Flayed Man',
    titles: ['Lord of Winterfell', 'Bastard of Bolton'],
    status: 'Deceased',
    allegiance: 'House Bolton',
    quickFacts: {
      house: 'House Bolton',
      region: 'The North',
      family: 'Bolton (bastard)',
      occupation: 'Lord of Winterfell',
      firstAppearance: 'Season 3, Episode 2',
      lastAppearance: 'Season 6, Episode 9',
      portrayedBy: 'Iwan Rheon'
    },
    biography: `Ramsay Bolton was the bastard son of Roose Bolton. Known for his cruelty and sadism, he was legitimized by his father and became Lord of Winterfell after the betrayal of Robb Stark.

Ramsay tortured Theon Greyjoy into submission and married Sansa Stark, subjecting her to abuse. He was defeated by Jon Snow and the Stark forces at the Battle of the Bastards, killed by his own dogs after being fed to them.`,
    timeline: [
      { event: 'Born as a bastard', season: 'Backstory' },
      { event: 'Captured Theon Greyjoy', season: 'S3', episode: 'E2' },
      { event: 'Tortured Theon', season: 'S3', episode: 'E10' },
      { event: 'Legitimized by Roose Bolton', season: 'S5', episode: 'E3' },
      { event: 'Married Sansa Stark', season: 'S5', episode: 'E6' },
      { event: 'Killed Roose Bolton', season: 'S6', episode: 'E2' },
      { event: 'Became Lord of Winterfell', season: 'S6', episode: 'E2' },
      { event: 'Defeated at Battle of the Bastards', season: 'S6', episode: 'E9' },
      { event: 'Killed by his dogs', season: 'S6', episode: 'E9' }
    ],
    relatedLocations: ['Winterfell', 'The Dreadfort', 'Castle Black'],
    relatedCharacters: {
      family: ['Roose Bolton'],
      allies: ['Roose Bolton'],
      rivals: ['Jon Snow', 'Sansa Stark'],
      enemies: ['Jon Snow', 'Sansa Stark', 'Theon Greyjoy']
    },
    hasJourney: false
  },

  brienneOfTarth: {
    id: 'brienneOfTarth',
    name: 'Brienne of Tarth',
    portrait: '',
    house: 'Tarth',
    sigil: 'Sun and Moon',
    titles: ['Knight', 'Lady of Tarth'],
    status: 'Alive',
    allegiance: 'House Stark',
    quickFacts: {
      house: 'House Tarth',
      region: 'The Stormlands',
      family: 'Tarth',
      occupation: 'Knight',
      firstAppearance: 'Season 2, Episode 3',
      lastAppearance: 'Season 8, Episode 6',
      portrayedBy: 'Gwendoline Christie'
    },
    biography: `Brienne of Tarth was a skilled warrior who defied gender norms to become a knight. After serving Renly Baratheon, she swore an oath to Catelyn Stark to return her daughters to safety.

She traveled with Jaime Lannister and developed a complex relationship with him. Brienne eventually became a knight and served Sansa Stark as the commander of her guards. She fulfilled her oath to Catelyn by protecting Sansa and Arya.`,
    timeline: [
      { event: 'Born at Tarth', season: 'Backstory' },
      { event: 'Won Renly\'s tournament', season: 'S2', episode: 'E3' },
      { event: 'Swore oath to Catelyn Stark', season: 'S2', episode: 'E8' },
      { event: 'Traveled with Jaime Lannister', season: 'S3', episode: 'E5' },
      { event: 'Captured by the Boltons', season: 'S4', episode: 'E7' },
      { event: 'Escaped with Podrick', season: 'S4', episode: 'E10' },
      { event: 'Found Sansa Stark', season: 'S5', episode: 'E3' },
      { event: 'Became a knight', season: 'S8', episode: 'E2' },
      { event: 'Commander of Sansa\'s guards', season: 'S8', episode: 'E6' }
    ],
    relatedLocations: ['Tarth', 'King\'s Landing', 'The Riverlands', 'Winterfell'],
    relatedCharacters: {
      family: [],
      allies: ['Catelyn Stark', 'Jaime Lannister', 'Sansa Stark', 'Podrick Payne'],
      rivals: [],
      enemies: ['Ramsay Bolton']
    },
    hasJourney: false
  },

  theonGreyjoy: {
    id: 'theonGreyjoy',
    name: 'Theon Greyjoy',
    portrait: '',
    house: 'Greyjoy',
    sigil: 'Kraken',
    titles: ['Prince of Winterfell', 'Reek'],
    status: 'Alive',
    allegiance: 'House Stark',
    quickFacts: {
      house: 'House Greyjoy',
      region: 'The Iron Islands',
      family: 'Greyjoy',
      occupation: 'Prince, Reformed Reek',
      firstAppearance: 'Season 1, Episode 1',
      lastAppearance: 'Season 8, Episode 6',
      portrayedBy: 'Alfie Allen'
    },
    biography: `Theon Greyjoy was the son of Balon Greyjoy, raised as a ward at Winterfell after his father's rebellion. Torn between his two families, he initially betrayed the Starks and captured Winterfell.

Tortured and broken by Ramsay Bolton into becoming "Reek," Theon eventually regained his identity and helped Sansa escape Winterfell. He redeemed himself by defending Bran Stark during the Battle of Winterfell and was killed by the Night King while protecting him.`,
    timeline: [
      { event: 'Born at Pyke', season: 'Backstory' },
      { event: 'Ward at Winterfell', season: 'Backstory' },
      { event: 'Returned to Pyke', season: 'S2', episode: 'E1' },
      { event: 'Betrayed the Starks', season: 'S2', episode: 'E6' },
      { event: 'Captured Winterfell', season: 'S2', episode: 'E6' },
      { event: 'Captured by Ramsay Bolton', season: 'S3', episode: 'E7' },
      { event: 'Became Reek', season: 'S3', episode: 'E7' },
      { event: 'Helped Sansa escape', season: 'S6', episode: 'E7' },
      { event: 'Redeemed himself', season: 'S7', episode: 'E3' },
      { event: 'Died protecting Bran', season: 'S8', episode: 'E3' }
    ],
    relatedLocations: ['Pyke', 'Winterfell', 'The Iron Islands', 'Dreadfort'],
    relatedCharacters: {
      family: ['Balon Greyjoy', 'Yara Greyjoy'],
      allies: ['Robb Stark', 'Sansa Stark', 'Bran Stark'],
      rivals: ['Ramsay Bolton'],
      enemies: ['Ramsay Bolton', 'Night King']
    },
    hasJourney: false
  },

  melisandre: {
    id: 'melisandre',
    name: 'Melisandre',
    portrait: '',
    house: 'None',
    sigil: 'Lord of Light',
    titles: ['Red Priestess'],
    status: 'Deceased',
    allegiance: 'Lord of Light',
    quickFacts: {
      house: 'None',
      region: 'Asshai',
      family: 'None',
      occupation: 'Red Priestess',
      firstAppearance: 'Season 2, Episode 1',
      lastAppearance: 'Season 8, Episode 5',
      portrayedBy: 'Carice van Houten'
    },
    biography: `Melisandre was a red priestess of R'hllor, the Lord of Light. She believed Stannis Baratheon was the prophesied prince and manipulated him into burning enemies alive.

After Stannis's defeat, she served Jon Snow and resurrected him after his death. Her visions led her to believe Arya Stark would kill the Night King. After the Battle of Winterfell, having fulfilled her purpose, she died of old age in the snow.`,
    timeline: [
      { event: 'Born in Asshai', season: 'Backstory' },
      { event: 'Met Stannis Baratheon', season: 'S2', episode: 'E1' },
      { event: 'Became advisor to Stannis', season: 'S2', episode: 'E1' },
      { event: 'Gave Renly the shadow', season: 'S2', episode: 'E5' },
      { event: 'Resurrected Jon Snow', season: 'S6', episode: 'E2' },
      { event: 'Traveled to Dragonstone', season: 'S7', episode: 'E2' },
      { event: 'Met Arya Stark', season: 'S7', episode: 'E3' },
      { event: 'Predicted Arya\'s role', season: 'S8', episode: 'E2' },
      { event: 'Died of old age', season: 'S8', episode: 'E5' }
    ],
    relatedLocations: ['Dragonstone', 'The Wall', 'Winterfell'],
    relatedCharacters: {
      family: [],
      allies: ['Stannis Baratheon', 'Jon Snow', 'Davos Seaworth'],
      rivals: ['Davos Seaworth'],
      enemies: []
    },
    hasJourney: false
  },

  davosSeaworth: {
    id: 'davosSeaworth',
    name: 'Davos Seaworth',
    portrait: '',
    house: 'Seaworth',
    sigil: 'Onion Ship',
    titles: ['Knight', 'Hand of the King'],
    status: 'Alive',
    allegiance: 'House Stark',
    quickFacts: {
      house: 'House Seaworth',
      region: 'The Stormlands',
      family: 'Seaworth',
      occupation: 'Knight, Hand',
      firstAppearance: 'Season 2, Episode 1',
      lastAppearance: 'Season 8, Episode 6',
      portrayedBy: 'Liam Cunningham'
    },
    biography: `Davos Seaworth was a smuggler knighted by Stannis Baratheon for smuggling food past the blockade during Robert's Rebellion. He became Stannis's most trusted advisor and moral compass.

After Stannis's death, Davos served Jon Snow and later became Hand of the King to Bran Stark. Known for his wisdom and loyalty, he helped rebuild the realm and advised the new king.`,
    timeline: [
      { event: 'Born in Flea Bottom', season: 'Backstory' },
      { event: 'Smuggled food past siege', season: 'Backstory' },
      { event: 'Knighted by Stannis', season: 'Backstory' },
      { event: 'Became advisor to Stannis', season: 'S2', episode: 'E1' },
      { event: 'Saved Gendry', season: 'S3', episode: 'E6' },
      { event: 'Opposed burning Shireen', season: 'S5', episode: 'E9' },
      { event: 'Served Jon Snow', season: 'S7', episode: 'E3' },
      { event: 'Traveled to Dragonstone', season: 'S7', episode: 'E2' },
      { event: 'Named Hand of the King', season: 'S8', episode: 'E6' }
    ],
    relatedLocations: ['Dragonstone', 'The Wall', 'King\'s Landing'],
    relatedCharacters: {
      family: [],
      allies: ['Stannis Baratheon', 'Jon Snow', 'Gendry'],
      rivals: ['Melisandre'],
      enemies: []
    },
    hasJourney: false
  },

  tormund: {
    id: 'tormund',
    name: 'Tormund Giantsbane',
    portrait: '',
    house: 'Free Folk',
    sigil: 'Broken Chains',
    titles: ['Leader of the Free Folk'],
    status: 'Alive',
    allegiance: 'Free Folk',
    quickFacts: {
      house: 'Free Folk',
      region: 'Beyond the Wall',
      family: 'None',
      occupation: 'Warrior Leader',
      firstAppearance: 'Season 3, Episode 1',
      lastAppearance: 'Season 8, Episode 6',
      portrayedBy: 'Kristofer Hivju'
    },
    biography: `Tormund Giantsbane was a legendary wildling warrior known for his strength and loyalty. Initially an enemy of the Night's Watch, he became Jon Snow's closest ally among the Free Folk.

He fought alongside Jon at Hardhome and the Battle of Winterfell. After the Great War, Tormund led the Free Folk back north of the Wall, living freely as they had before.`,
    timeline: [
      { event: 'Born beyond the Wall', season: 'Backstory' },
      { event: 'Became a legendary warrior', season: 'Backstory' },
      { event: 'Met Jon Snow', season: 'S3', episode: 'E1' },
      { event: 'Attacked Castle Black', season: 'S4', episode: 'E9' },
      { event: 'Joined forces with Jon', season: 'S5', episode: 'E1' },
      { event: 'Survived Hardhome', season: 'S5', episode: 'E8' },
      { event: 'Fought at Battle of Winterfell', season: 'S8', episode: 'E3' },
      { event: 'Led Free Folk north', season: 'S8', episode: 'E6' }
    ],
    relatedLocations: ['Beyond the Wall', 'Castle Black', 'Winterfell'],
    relatedCharacters: {
      family: [],
      allies: ['Jon Snow', 'Mance Rayder', 'Brienne of Tarth'],
      rivals: [],
      enemies: ['Night King']
    },
    hasJourney: false
  },

  gendry: {
    id: 'gendry',
    name: 'Gendry',
    portrait: '',
    house: 'Baratheon',
    sigil: 'Stag',
    titles: ['Lord of Storm\'s End'],
    status: 'Alive',
    allegiance: 'House Baratheon',
    quickFacts: {
      house: 'House Baratheon',
      region: 'The Stormlands',
      family: 'Baratheon (bastard)',
      occupation: 'Blacksmith, Lord',
      firstAppearance: 'Season 1, Episode 4',
      lastAppearance: 'Season 8, Episode 6',
      portrayedBy: 'Joe Dempsie'
    },
    biography: `Gendry was the bastard son of Robert Baratheon and a blacksmith by trade. He traveled with Arya Stark and became her close friend. After being sold to the Red Woman, he was rescued by Davos Seaworth.

During the Great War, Gendry fought at Winterfell and was legitimized by Daenerys Targaryen as Lord of Storm's End. He proposed to Arya, who declined, and remained in the Stormlands as the new lord.`,
    timeline: [
      { event: 'Born in King\'s Landing', season: 'Backstory' },
      { event: 'Became a blacksmith', season: 'Backstory' },
      { event: 'Traveled with Arya Stark', season: 'S2', episode: 'E2' },
      { event: 'Sold to the Red Woman', season: 'S3', episode: 'E3' },
      { event: 'Rescued by Davos', season: 'S3', episode: 'E6' },
      { event: 'Rowed to Dragonstone', season: 'S7', episode: 'E5' },
      { event: 'Fought at Winterfell', season: 'S8', episode: 'E3' },
      { event: 'Legitimized by Daenerys', season: 'S8', episode: 'E4' },
      { event: 'Became Lord of Storm\'s End', season: 'S8', episode: 'E6' }
    ],
    relatedLocations: ['King\'s Landing', 'Dragonstone', 'Storm\'s End', 'Winterfell'],
    relatedCharacters: {
      family: ['Robert Baratheon'],
      allies: ['Arya Stark', 'Davos Seaworth', 'Jon Snow'],
      rivals: [],
      enemies: []
    },
    hasJourney: false
  },

  // Additional profiles for characters referenced in relationships
  robertBaratheon: {
    id: 'robertBaratheon',
    name: 'Robert Baratheon',
    portrait: '',
    house: 'Baratheon',
    sigil: 'Stag',
    titles: ['King of the Seven Kingdoms'],
    status: 'Deceased',
    allegiance: 'House Baratheon',
    quickFacts: {
      house: 'House Baratheon',
      region: 'The Stormlands',
      family: 'Baratheon',
      occupation: 'King',
      firstAppearance: 'Season 1, Episode 1',
      lastAppearance: 'Season 1, Episode 1',
      portrayedBy: 'Mark Addy'
    },
    biography: `Robert Baratheon was the King of the Seven Kingdoms who overthrew the Targaryen dynasty. A legendary warrior in his youth, he became a gluttonous and negligent ruler.

He asked his friend Eddard Stark to serve as Hand of the King after the death of Jon Arryn. Robert died during a hunting trip, his death triggering the War of the Five Kings and revealing the truth about his children's parentage.`,
    timeline: [
      { event: 'Born at Storm\'s End', season: 'Backstory' },
      { event: 'Won Battle of the Trident', season: 'Backstory' },
      { event: 'Became King', season: 'Backstory' },
      { event: 'Married Cersei Lannister', season: 'Backstory' },
      { event: 'Asked Ned to be Hand', season: 'S1', episode: 'E1' },
      { event: 'Died hunting boar', season: 'S1', episode: 'E1' }
    ],
    relatedLocations: ['King\'s Landing', 'Storm\'s End', 'Winterfell'],
    relatedCharacters: {
      family: ['Stannis Baratheon', 'Renly Baratheon', 'Gendry'],
      allies: ['Eddard Stark'],
      rivals: ['Cersei Lannister'],
      enemies: ['Cersei Lannister']
    },
    hasJourney: false
  },

  joffreyBaratheon: {
    id: 'joffreyBaratheon',
    name: 'Joffrey Baratheon',
    portrait: '',
    house: 'Lannister',
    sigil: 'Lion',
    titles: ['King of the Seven Kingdoms'],
    status: 'Deceased',
    allegiance: 'House Lannister',
    quickFacts: {
      house: 'House Lannister',
      region: 'The Crownlands',
      family: 'Lannister (born Baratheon)',
      occupation: 'King',
      firstAppearance: 'Season 1, Episode 1',
      lastAppearance: 'Season 4, Episode 2',
      portrayedBy: 'Jack Gleeson'
    },
    biography: `Joffrey Baratheon was the eldest son of Cersei Lannister and Jaime Lannister, though believed to be Robert's heir. A cruel and sadistic boy, he took pleasure in tormenting others.

As king, he ordered Ned Stark's execution and abused Sansa Stark. He was poisoned at his own wedding feast by Olenna Tyrell and Petyr Baelish, ending his brief and bloody reign.`,
    timeline: [
      { event: 'Born at King\'s Landing', season: 'Backstory' },
      { event: 'Became heir apparent', season: 'Backstory' },
      { event: 'Became King', season: 'S1', episode: 'E1' },
      { event: 'Ordered Ned Stark\'s execution', season: 'S1', episode: 'E9' },
      { event: 'Abused Sansa Stark', season: 'S2' },
      { event: 'Married Margaery Tyrell', season: 'S4', episode: 'E2' },
      { event: 'Poisoned at wedding', season: 'S4', episode: 'E2' }
    ],
    relatedLocations: ['King\'s Landing', 'The Red Keep'],
    relatedCharacters: {
      family: ['Cersei Lannister', 'Jaime Lannister', 'Tommen Baratheon', 'Myrcella Baratheon'],
      allies: ['Cersei Lannister'],
      rivals: ['Tyrion Lannister', 'Sansa Stark'],
      enemies: ['Tyrion Lannister', 'Sansa Stark']
    },
    hasJourney: false
  },

  walderFrey: {
    id: 'walderFrey',
    name: 'Walder Frey',
    portrait: '',
    house: 'Frey',
    sigil: 'Towers',
    titles: ['Lord of the Crossing'],
    status: 'Deceased',
    allegiance: 'House Frey',
    quickFacts: {
      house: 'House Frey',
      region: 'The Riverlands',
      family: 'Frey',
      occupation: 'Lord',
      firstAppearance: 'Season 1, Episode 8',
      lastAppearance: 'Season 7, Episode 1',
      portrayedBy: 'David Bradley'
    },
    biography: `Walder Frey was the Lord of the Crossing and head of House Frey. Known for his many children and grandchildren, he was a bitter and vengeful old man.

After Robb Stark broke his marriage pact, Walder orchestrated the Red Wedding, murdering Robb, Catelyn Stark, and thousands of Northern soldiers. Years later, he was killed by Arya Stark, who slaughtered his entire house in revenge.`,
    timeline: [
      { event: 'Born at the Twins', season: 'Backstory' },
      { event: 'Became Lord of the Crossing', season: 'Backstory' },
      { event: 'Allowed Robb Stark passage', season: 'S1', episode: 'E8' },
      { event: 'Robb broke marriage pact', season: 'S3', episode: 'E3' },
      { event: 'Orchestrated Red Wedding', season: 'S3', episode: 'E9' },
      { event: 'Killed by Arya Stark', season: 'S7', episode: 'E1' }
    ],
    relatedLocations: ['The Twins', 'The Riverlands'],
    relatedCharacters: {
      family: ['House Frey'],
      allies: ['Tywin Lannister', 'Roose Bolton'],
      rivals: ['Robb Stark', 'Catelyn Stark'],
      enemies: ['Robb Stark', 'Catelyn Stark', 'Arya Stark']
    },
    hasJourney: false
  },

  rooseBolton: {
    id: 'rooseBolton',
    name: 'Roose Bolton',
    portrait: '',
    house: 'Bolton',
    sigil: 'Flayed Man',
    titles: ['Lord of the Dreadfort', 'Warden of the North'],
    status: 'Deceased',
    allegiance: 'House Bolton',
    quickFacts: {
      house: 'House Bolton',
      region: 'The North',
      family: 'Bolton',
      occupation: 'Lord, Warden of the North',
      firstAppearance: 'Season 1, Episode 5',
      lastAppearance: 'Season 6, Episode 2',
      portrayedBy: 'Michael McElhatton'
    },
    biography: `Roose Bolton was the Lord of the Dreadfort and a cunning strategist. He served Robb Stark as a military commander but secretly betrayed him to the Lannisters.

After the Red Wedding, Roose was named Warden of the North and legitimatized his bastard Ramsay. He was killed by Ramsay, who wanted to be the sole Lord of Winterfell.`,
    timeline: [
      { event: 'Born at the Dreadfort', season: 'Backstory' },
      { event: 'Became Lord of the Dreadfort', season: 'Backstory' },
      { event: 'Joined Robb Stark', season: 'S1', episode: 'E5' },
      { event: 'Betrayed Robb at Red Wedding', season: 'S3', episode: 'E9' },
      { event: 'Became Warden of the North', season: 'S4', episode: 'E1' },
      { event: 'Legitimized Ramsay', season: 'S5', episode: 'E3' },
      { event: 'Killed by Ramsay', season: 'S6', episode: 'E2' }
    ],
    relatedLocations: ['The Dreadfort', 'Winterfell'],
    relatedCharacters: {
      family: ['Ramsay Bolton'],
      allies: ['Tywin Lannister', 'Walder Frey'],
      rivals: ['Robb Stark', 'Jon Snow'],
      enemies: ['Robb Stark', 'Jon Snow']
    },
    hasJourney: false
  },

  varys: {
    id: 'varys',
    name: 'Varys',
    portrait: '',
    house: 'None',
    sigil: 'Spider',
    titles: ['Master of Whisperers'],
    status: 'Deceased',
    allegiance: 'The Realm',
    quickFacts: {
      house: 'None',
      region: 'Essos',
      family: 'None',
      occupation: 'Spy, Master of Whisperers',
      firstAppearance: 'Season 1, Episode 1',
      lastAppearance: 'Season 8, Episode 5',
      portrayedBy: 'Conleth Hill'
    },
    biography: `Varys was the Master of Whisperers, a spymaster who served the realm rather than any individual ruler. Born a slave in Essos, he was castrated and sold to a sorcerer.

He worked to protect the realm from chaos, initially supporting Daenerys Targaryen. When Daenerys began burning cities, Varys betrayed her and was executed by dragonfire for his treason.`,
    timeline: [
      { event: 'Born in Lys', season: 'Backstory' },
      { event: 'Sold to sorcerer', season: 'Backstory' },
      { event: 'Became Master of Whisperers', season: 'Backstory' },
      { event: 'Helped Ned Stark', season: 'S1', episode: 'E5' },
      { event: 'Helped Tyrion escape', season: 'S4', episode: 'E10' },
      { event: 'Traveled to Meereen', season: 'S5', episode: 'E5' },
      { event: 'Served Daenerys', season: 'S7', episode: 'E2' },
      { event: 'Betrayed Daenerys', season: 'S8', episode: 'E4' },
      { event: 'Executed by dragonfire', season: 'S8', episode: 'E5' }
    ],
    relatedLocations: ['King\'s Landing', 'Meereen', 'Dragonstone'],
    relatedCharacters: {
      family: [],
      allies: ['Tyrion Lannister', 'Daenerys Targaryen', 'Ned Stark'],
      rivals: ['Petyr Baelish', 'Cersei Lannister'],
      enemies: ['Cersei Lannister']
    },
    hasJourney: false
  },

  olennaTyrell: {
    id: 'olennaTyrell',
    name: 'Olenna Tyrell',
    portrait: '',
    house: 'Tyrell',
    sigil: 'Rose',
    titles: ['Queen of Thorns'],
    status: 'Deceased',
    allegiance: 'House Tyrell',
    quickFacts: {
      house: 'House Tyrell',
      region: 'The Reach',
      family: 'Tyrell',
      occupation: 'Matriarch',
      firstAppearance: 'Season 3, Episode 2',
      lastAppearance: 'Season 7, Episode 3',
      portrayedBy: 'Diana Rigg'
    },
    biography: `Olenna Tyrell, known as the Queen of Thorns, was the sharp-tongued matriarch of House Tyrell. A master of political maneuvering, she protected her family through wit and ruthlessness.

She orchestrated Joffrey Baratheon's assassination to save her granddaughter Margaery. After the destruction of her house by Cersei Lannister, Olenna was captured and drank poison rather than beg for mercy.`,
    timeline: [
      { event: 'Born at Highgarden', season: 'Backstory' },
      { event: 'Became matriarch of Tyrell', season: 'Backstory' },
      { event: 'Arrived at King\'s Landing', season: 'S3', episode: 'E2' },
      { event: 'Married Margaery to Joffrey', season: 'S3', episode: 'E6' },
      { event: 'Poisoned Joffrey', season: 'S4', episode: 'E2' },
      { event: 'Traveled to Dorne', season: 'S5', episode: 'E6' },
      { event: 'Joined Daenerys', season: 'S7', episode: 'E2' },
      { event: 'Captured at Highgarden', season: 'S7', episode: 'E3' },
      { event: 'Drank poison', season: 'S7', episode: 'E3' }
    ],
    relatedLocations: ['Highgarden', 'King\'s Landing', 'Dorne'],
    relatedCharacters: {
      family: ['Mace Tyrell', 'Margaery Tyrell', 'Loras Tyrell'],
      allies: ['Petyr Baelish', 'Daenerys Targaryen'],
      rivals: ['Cersei Lannister'],
      enemies: ['Cersei Lannister']
    },
    hasJourney: false
  },

  gregorClegane: {
    id: 'gregorClegane',
    name: 'Gregor Clegane',
    aliases: ['The Mountain'],
    portrait: '',
    house: 'Clegane',
    sigil: 'Dogs',
    titles: ['Ser Gregor Clegane', 'The Mountain'],
    status: 'Deceased',
    allegiance: 'House Lannister',
    quickFacts: {
      house: 'House Clegane',
      region: 'The Westerlands',
      family: 'Clegane',
      occupation: 'Knight, Enforcer',
      firstAppearance: 'Season 1, Episode 5',
      lastAppearance: 'Season 8, Episode 5',
      portrayedBy: 'Conan Stevens / Ian Whyte / Hafþór Júlíus Björnsson'
    },
    biography: `Gregor Clegane, known as the Mountain, was a massive and cruel knight in service to House Lannister. He burned his brother Sandor's face as a child and committed numerous atrocities.

Gregor was mortally wounded by Oberyn Martell in trial by combat but was resurrected by Qyburn as an undead servant. He became Cersei Lannister's personal enforcer and died fighting his brother Sandor during the destruction of King's Landing.`,
    timeline: [
      { event: 'Born at Clegane Keep', season: 'Backstory' },
      { event: 'Burned Sandor', season: 'Backstory' },
      { event: 'Became knight', season: 'Backstory' },
      { event: 'Killed Elia Martell', season: 'Backstory' },
      { event: 'Fought Oberyn Martell', season: 'S4', episode: 'E8' },
      { event: 'Resurrected by Qyburn', season: 'S6', episode: 'E7' },
      { event: 'Became Cersei\'s enforcer', season: 'S7', episode: 'E3' },
      { event: 'Killed by Sandor', season: 'S8', episode: 'E5' }
    ],
    relatedLocations: ['Clegane Keep', 'King\'s Landing'],
    relatedCharacters: {
      family: ['Sandor Clegane'],
      allies: ['Cersei Lannister', 'Qyburn'],
      rivals: ['Sandor Clegane'],
      enemies: ['Sandor Clegane', 'Oberyn Martell']
    },
    hasJourney: false
  },

  meeraReed: {
    id: 'meeraReed',
    name: 'Meera Reed',
    portrait: '',
    house: 'Reed',
    sigil: 'Lizard Lion',
    titles: ['Crannogman'],
    status: 'Alive',
    allegiance: 'House Reed',
    quickFacts: {
      house: 'House Reed',
      region: 'The North',
      family: 'Reed',
      occupation: 'Warrior',
      firstAppearance: 'Season 3, Episode 2',
      lastAppearance: 'Season 7, Episode 3',
      portrayedBy: 'Ellie Kendrick'
    },
    biography: `Meera Reed was the daughter of Howland Reed and a skilled warrior from the crannogmen. She protected Bran Stark during his journey beyond the Wall.

After Jojen Reed's death, Meera continued to care for Bran through his transformation into the Three-Eyed Raven. She returned Bran to Winterfell and then returned home to Greywater Watch, exhausted from her years of service.`,
    timeline: [
      { event: 'Born at Greywater Watch', season: 'Backstory' },
      { event: 'Traveled to Winterfell', season: 'S3', episode: 'E2' },
      { event: 'Protected Bran beyond the Wall', season: 'S4', episode: 'E10' },
      { event: 'Witnessed Jojen\'s death', season: 'S4', episode: 'E10' },
      { event: 'Helped Bran become Three-Eyed Raven', season: 'S6', episode: 'E5' },
      { event: 'Returned Bran to Winterfell', season: 'S7', episode: 'E3' },
      { event: 'Returned to Greywater Watch', season: 'S7', episode: 'E3' }
    ],
    relatedLocations: ['Greywater Watch', 'Winterfell', 'Beyond the Wall'],
    relatedCharacters: {
      family: ['Howland Reed', 'Jojen Reed'],
      allies: ['Bran Stark', 'Hodor'],
      rivals: [],
      enemies: ['White Walkers']
    },
    hasJourney: false
  },

  jojenReed: {
    id: 'jojenReed',
    name: 'Jojen Reed',
    portrait: '',
    house: 'Reed',
    sigil: 'Lizard Lion',
    titles: ['Greenseer'],
    status: 'Deceased',
    allegiance: 'House Reed',
    quickFacts: {
      house: 'House Reed',
      region: 'The North',
      family: 'Reed',
      occupation: 'Greenseer',
      firstAppearance: 'Season 3, Episode 2',
      lastAppearance: 'Season 4, Episode 10',
      portrayedBy: 'Thomas Brodie-Sangster'
    },
    biography: `Jojen Reed was the son of Howland Reed and a greenseer who could see glimpses of the future. He guided Bran Stark to the Three-Eyed Raven.

Jojen knew he would die at the cave of the Three-Eyed Raven. During a White Walker attack, he sacrificed himself to save Bran, fulfilling his vision and allowing Bran to continue his journey.`,
    timeline: [
      { event: 'Born at Greywater Watch', season: 'Backstory' },
      { event: 'Discovered greenseeing abilities', season: 'Backstory' },
      { event: 'Traveled to Winterfell', season: 'S3', episode: 'E2' },
      { event: 'Guided Bran beyond the Wall', season: 'S4', episode: 'E10' },
      { event: 'Reached the cave', season: 'S4', episode: 'E10' },
      { event: 'Sacrificed himself', season: 'S4', episode: 'E10' }
    ],
    relatedLocations: ['Greywater Watch', 'Winterfell', 'Beyond the Wall'],
    relatedCharacters: {
      family: ['Howland Reed', 'Meera Reed'],
      allies: ['Bran Stark', 'Hodor'],
      rivals: [],
      enemies: ['White Walkers']
    },
    hasJourney: false
  }
};

// Character name aliases for matching
const characterAliases = {
  'ned stark': 'eddard stark',
  'ned': 'eddard stark',
  'littlefinger': 'petyr baelish',
  'the hound': 'sandor clegane',
  'the mountain': 'gregor clegane',
  'three-eyed raven': 'bran stark',
  'daenerys': 'daenerys targaryen',
  'dany': 'daenerys targaryen',
  'khaleesi': 'daenerys targaryen',
  'tormund': 'tormund giantsbane',
  'robert': 'robert baratheon',
  'joffrey': 'joffrey baratheon',
  'varys': 'varys'
};

// Helper function to get character profile by name
function getCharacterProfile(characterName) {
  const nameLower = characterName.toLowerCase().trim();
  
  // Check aliases first
  if (characterAliases[nameLower]) {
    nameLower = characterAliases[nameLower];
  }
  
  // Try exact match first
  for (const [id, profile] of Object.entries(characterProfiles)) {
    if (profile.name.toLowerCase() === nameLower) {
      return profile;
    }
    if (profile.aliases && profile.aliases.some(alias => alias.toLowerCase() === nameLower)) {
      return profile;
    }
  }
  
  // Try partial match
  for (const [id, profile] of Object.entries(characterProfiles)) {
    if (profile.name.toLowerCase().includes(nameLower) || nameLower.includes(profile.name.toLowerCase())) {
      return profile;
    }
    if (profile.aliases && profile.aliases.some(alias => alias.toLowerCase().includes(nameLower) || nameLower.includes(alias.toLowerCase()))) {
      return profile;
    }
  }
  
  return null;
}

// Helper function to get character profile by ID
function getCharacterProfileById(id) {
  return characterProfiles[id] || null;
}

// Validation function to audit character references
function validateCharacterProfiles() {
  const report = {
    profiles: [],
    missingProfiles: [],
    brokenLinks: [],
    duplicateAliases: [],
    validationDate: new Date().toISOString()
  };
  
  // List all profiles
  Object.values(characterProfiles).forEach(profile => {
    report.profiles.push(profile.name);
  });
  
  // Check for broken links in related characters
  Object.values(characterProfiles).forEach(profile => {
    if (profile.relatedCharacters) {
      Object.values(profile.relatedCharacters).forEach(characters => {
        characters.forEach(charName => {
          const linkedProfile = getCharacterProfile(charName);
          if (!linkedProfile) {
            report.brokenLinks.push(`${profile.name} -> ${charName}`);
          }
        });
      });
    }
  });
  
  // Check for duplicate aliases
  const aliasMap = {};
  Object.entries(characterAliases).forEach(([alias, target]) => {
    if (aliasMap[target]) {
      aliasMap[target].push(alias);
    } else {
      aliasMap[target] = [alias];
    }
  });
  
  Object.entries(aliasMap).forEach(([target, aliases]) => {
    if (aliases.length > 1) {
      report.duplicateAliases.push(`${target}: ${aliases.join(', ')}`);
    }
  });
  
  return report;
}

// Function to generate and display validation report
function generateValidationReport() {
  const report = validateCharacterProfiles();
  console.log('=== CHARACTER DATABASE AUDIT ===\n');
  
  console.log('Character Profiles:');
  report.profiles.sort().forEach(name => {
    console.log(`✔ ${name}`);
  });
  
  console.log('\nMissing Profiles:');
  if (report.missingProfiles.length === 0) {
    console.log('None');
  } else {
    report.missingProfiles.forEach(name => {
      console.log(`✗ ${name}`);
    });
  }
  
  console.log('\nBroken Links:');
  if (report.brokenLinks.length === 0) {
    console.log('None');
  } else {
    report.brokenLinks.forEach(link => {
      console.log(`✗ ${link}`);
    });
  }
  
  console.log('\nDuplicate Aliases:');
  if (report.duplicateAliases.length === 0) {
    console.log('None');
  } else {
    report.duplicateAliases.forEach(dup => {
      console.log(`⚠ ${dup}`);
    });
  }
  
  console.log('\n=== END AUDIT ===');
  return report;
}


