/* =====================================================================
   mapData.js — structured knowledge base for the Interactive Map
   All text below is written in original wording as a fan-made summary
   of publicly known storylines. No text is copied from HBO, Wikipedia,
   Fandom/wikis, or any other source.
   ===================================================================== */

const mapData = {
  locations: [
    /* ────────────────────────────── WINTERFELL ────────────────────────────── */
    {
      id: "winterfell",
      name: "Winterfell",
      x: 16.5, y: 24.7,
      region: "The North",
      types: ["Castles", "Battles", "Houses", "Characters", "Events", "Coronations"],
      description: "The ancestral seat of House Stark, Winterfell is a sprawling stone keep warmed by natural hot springs beneath its walls, said to have stood since the Age of Heroes.",
      history: [
        "Winterfell has served as the seat of power in the North for thousands of years, first raised by the legendary Bran the Builder in an age so old that most of its true history has passed into legend. Its crypts run deep beneath the castle, holding generations of Stark lords carved in stone, their swords laid across their laps to keep the old kings of winter from walking again.",
        "For centuries the castle stood as the political heart of an independent northern kingdom, only bending the knee to the Iron Throne after Aegon the Conqueror's dragons made resistance futile. Even so, the North kept a distinct identity, worshipping the old gods in Winterfell's godswood long after the rest of the Seven Kingdoms turned to the Faith of the Seven.",
        "In the show's timeline, Winterfell becomes the pivot point for the entire War of the Five Kings and, later, the last defensible stronghold of the living before the War for the Dawn. Its halls pass from Stark hands to Bolton hands and back again, and its walls ultimately hold the line against the army of the dead."
      ],
      strategicImportance: "Winterfell commands the King's Road at the gateway to the North, and its natural hot springs keep its grounds workable even in the depths of winter, making it one of the few places capable of sheltering and provisioning a large army through a long, cold siege.",
      culture: "Northern customs at Winterfell center on the old gods, honor, and blood loyalty. The Stark words, 'Winter is Coming,' reflect a culture built around preparation, endurance, and a deep suspicion of southern politics.",
      events: [
        {
          season: "Season 1", episode: "Episode 1 — Winter Is Coming",
          title: "King Robert's Royal Visit",
          text: "King Robert Baratheon arrives at Winterfell with his court to ask his old friend Eddard Stark to serve as Hand of the King, following the mysterious death of the previous Hand, Jon Arryn. The visit reunites two old comrades from a rebellion years past, but beneath the celebration lies the machinery of a plot that will eventually cost the Starks dearly. That same visit ends with young Bran Stark falling — or being pushed — from a tower window after glimpsing something he was never meant to see.",
          charactersInvolved: ["Eddard Stark", "Catelyn Stark", "Robert Baratheon", "Cersei Lannister", "Jaime Lannister", "Bran Stark"],
          consequences: "Ned's acceptance of the Hand's position sets the entire War of the Five Kings into motion, while Bran's fall begins a private investigation that eventually exposes the Lannister twins' incestuous relationship.",
          importance: "This visit is the true beginning of the series' central conflict, tying the fate of House Stark irrevocably to the intrigue of King's Landing."
        },
        {
          season: "Season 2", episode: "Episode 8 — The Prince of Winterfell",
          title: "Theon Greyjoy's Capture of Winterfell",
          text: "Seeking to prove himself to his estranged father and the Iron Islands, Theon Greyjoy — raised as a ward of the Starks — turns on his adopted family and seizes Winterfell with a small raiding party while its garrison is away. Unable to find Bran and Rickon, who are hiding in the crypts, Theon later parades the burned bodies of two miller's boys as the young princes to preserve his authority.",
          charactersInvolved: ["Theon Greyjoy", "Bran Stark", "Rickon Stark", "Maester Luwin"],
          consequences: "The occupation fractures whatever trust remained between the Starks and the Greyjoys and leaves the North leaderless and vulnerable at the worst possible moment.",
          importance: "It marks Theon's fall from grace and foreshadows the North's coming devastation, while also beginning his long arc toward eventual redemption."
        },
        {
          season: "Season 6", episode: "Episode 9 — Battle of the Bastards",
          title: "The Battle of the Bastards",
          text: "Jon Snow and Sansa Stark lead a scraped-together northern army, reinforced at the last moment by the Knights of the Vale, against Ramsay Bolton's forces outside Winterfell's walls. Jon is nearly crushed and suffocated in a horrific melee of shields and bodies before Sansa's gambit turns the tide, and the castle is retaken from House Bolton once and for all.",
          charactersInvolved: ["Jon Snow", "Sansa Stark", "Ramsay Bolton", "Petyr Baelish", "Wun Wun"],
          consequences: "House Stark reclaims its ancestral home, Ramsay's cruel reign ends, and Jon is proclaimed King in the North by the gathered northern lords.",
          importance: "It stands as one of the most consequential battles of the series, restoring Stark rule to the North just as a far greater threat gathers beyond the Wall."
        },
        {
          season: "Season 8", episode: "Episode 3 — The Long Night",
          title: "The Battle of Winterfell",
          text: "Every surviving ally gathers behind Winterfell's walls for a last stand against the Night King and his army of the dead. Dothraki riders, Unsullied spearmen, and northern soldiers hold the field as dragonfire and trebuchets tear through the ranks of wights, while Arya Stark ultimately ends the battle with a single, decisive strike.",
          charactersInvolved: ["Jon Snow", "Daenerys Targaryen", "Arya Stark", "Bran Stark", "The Night King", "Theon Greyjoy"],
          consequences: "The Night King and his army are destroyed, ending the threat of eternal winter, though the battle costs the defenders heavily, including Theon Greyjoy, Jorah Mormont, and the Night's Watch itself.",
          importance: "It resolves the series' supernatural storyline and clears the way for the final political struggle over the Iron Throne."
        }
      ],
      battles: [
        {
          name: "Battle of the Bastards",
          season: "Season 6", episode: "Episode 9",
          description: "A brutal field battle fought outside Winterfell's gates between Jon Snow's northern coalition and Ramsay Bolton's garrison, decided as much by cavalry timing as by the courage of the men in the shield wall.",
          combatants: "House Stark and allies (Jon Snow, Sansa Stark) versus House Bolton (Ramsay Bolton)",
          winner: "House Stark and the Knights of the Vale",
          casualties: "The bulk of Ramsay's infantry is encircled and slaughtered; Wun Wun the giant dies breaking down the castle gate before succumbing to arrow wounds.",
          strategy: "Ramsay lures Jon's cavalry into a killing field and nearly wins through sheer numbers and encirclement, but Sansa's secret appeal to Petyr Baelish brings the Knights of the Vale in as a decisive flank attack.",
          keyMoments: "Jon Snow is buried alive under a pile of his own soldiers before being pulled free; Ramsay is later fed to his own hounds on Sansa's orders.",
          consequences: "The North is reunited under Stark leadership, and Ramsay's line and cruelty are permanently ended."
        },
        {
          name: "Battle of Winterfell (The Long Night)",
          season: "Season 8", episode: "Episode 3",
          description: "The defense of Winterfell against the Night King's army of the dead, the largest and most desperate battle in the series, fought through a single moonless night.",
          combatants: "The living (Northern, Unsullied, Dothraki, and Free Folk forces) versus the army of the dead",
          winner: "The living",
          casualties: "Heavy losses among the Dothraki and Unsullied; notable deaths include Jorah Mormont, Theon Greyjoy, Beric Dondarrion, Lyanna Mormont, and Melisandre.",
          strategy: "A layered defense using trenches, fire, and dragons is overwhelmed until Arya Stark infiltrates the godswood and kills the Night King directly, instantly destroying the entire army of wights.",
          keyMoments: "Melisandre's fire trench ignition saves the retreating army; Arya's leap and killing blow on the Night King ends the battle in a single stroke.",
          consequences: "The threat beyond the Wall is permanently ended, but the alliance is left exhausted and grieving just as the war for the Iron Throne resumes."
        }
      ],
      characterDeaths: [
        {
          name: "Rodrik Cassel",
          season: "Season 2", episode: "Episode 7",
          cause: "Beheaded",
          killer: "Theon Greyjoy",
          text: "Winterfell's master-at-arms and acting castellan is executed personally by Theon Greyjoy after leading a failed counterattack to retake the castle, a killing Theon botches gruesomely, needing several strikes to finish it.",
          significance: "The death cements Theon's isolation from the Stark household that raised him and signals how far he is willing to go to hold power he cannot actually control."
        },
        {
          name: "Ramsay Bolton",
          season: "Season 6", episode: "Episode 10",
          cause: "Eaten by his own hounds",
          killer: "His starved hunting dogs, on Sansa Stark's orders",
          text: "Having lost the Battle of the Bastards and been recaptured, Ramsay is bound to a chair in his own kennels, where Sansa lets his hounds — starved for a week and unable to recognize their master's scent — tear him apart.",
          significance: "It closes out one of the show's most sadistic antagonists and marks Sansa's transformation into a woman willing to deliver cold, calculated justice."
        }
      ],
      castle: {
        architecture: "A concentric stone fortress ringed by a deep moat and high curtain walls, built above natural hot springs that are channeled through the walls and floors to keep the castle livable through brutal northern winters. A broad godswood with a weirwood heart tree sits at its center.",
        importantEvents: "Robert Baratheon's royal visit, Theon Greyjoy's occupation, the Battle of the Bastards, and the Battle of Winterfell against the army of the dead.",
        sieges: "Taken by trickery and a small raiding party under Theon Greyjoy, later held by House Bolton, and finally retaken by force during the Battle of the Bastards.",
        ownersByEra: {
          "war-of-the-five-kings": "House Stark, then briefly House Greyjoy, then House Bolton",
          "battle-of-bastards": "Retaken by House Stark",
          "game-of-thrones": "House Stark, seat of the King/Queen in the North"
        },
        facts: [
          "The castle's hot springs are said to keep its godswood green even in the deepest snow.",
          "Its crypts hold statues of every Stark Lord of Winterfell going back centuries, including, unknown to most, Lyanna Stark."
        ]
      },
      houses: [
        {
          name: "House Stark",
          sigil: "A grey direwolf on a white field",
          words: "Winter Is Coming",
          founder: "Legend credits Bran the Builder as the founder of both Winterfell and House Stark",
          seat: "Winterfell",
          status: "Restored to power in the North after the War for the Dawn",
          history: "One of the oldest noble houses in Westeros, House Stark ruled the North as independent Kings in the North for thousands of years before bending the knee to Aegon the Conqueror. The family's fortunes collapse catastrophically during the War of the Five Kings, only to be painstakingly rebuilt by the surviving Stark children.",
          importantMembers: ["Eddard Stark", "Catelyn Stark", "Robb Stark", "Sansa Stark", "Arya Stark", "Bran Stark", "Jon Snow"],
          alliances: ["House Tully", "House Arryn (through Sansa and Petyr Baelish)", "The Free Folk"],
          enemies: ["House Bolton", "House Lannister (during the war)", "House Frey"]
        }
      ],
      coronations: [
        {
          crowned: "Jon Snow",
          title: "King in the North",
          season: "Season 6", episode: "Episode 10",
          location: "The Great Hall of Winterfell",
          significance: "The northern lords and the Knights of the Vale acclaim Jon Snow King in the North in the same hall where his father once ruled, formally rejecting the Iron Throne's authority for a second time.",
          before: "Winterfell is freshly retaken from House Bolton following the Battle of the Bastards, leaving a power vacuum among the northern houses.",
          after: "Jon's kingship becomes a central bargaining point when Daenerys Targaryen arrives to ask the North to bend the knee to her instead."
        },
        {
          crowned: "Bran Stark",
          title: "King of the Six Kingdoms",
          season: "Season 8", episode: "Episode 6",
          location: "Dragonpit, King's Landing (decided), enacted across the realm",
          significance: "Though the acclamation itself takes place in King's Landing, the decision reshapes Winterfell's status, as the North alone is granted independence and Sansa Stark is crowned Queen in the North in Winterfell shortly after.",
          before: "The death of Daenerys Targaryen and the fall of Cersei Lannister leave the Seven Kingdoms without a ruler.",
          after: "Sansa's coronation as Queen in the North restores Winterfell to full independence for the first time in centuries."
        }
      ],
      facts: [
        "Winterfell's crypts are considered too sacred and unsettling even for Jon Snow, who admits as a boy that they always frightened him.",
        "The castle's godswood is one of the few in the South still tended with weirwood roots, linking the Starks to the old religion long after most of Westeros converted to the Faith of the Seven."
      ]
    },

    /* ────────────────────────────── THE WALL / CASTLE BLACK ────────────────────────────── */
    {
      id: "the-wall",
      name: "The Wall",
      x: 22.3, y: 16.4,
      region: "Beyond the North",
      types: ["Castles", "Battles", "Houses", "Characters", "Events"],
      description: "A colossal wall of ancient ice, roughly seven hundred feet tall and hundreds of miles long, raised in the Age of Heroes to guard the realms of men from what lies beyond.",
      history: [
        "According to legend the Wall was built by Bran the Builder some eight thousand years before the events of the series, reinforced with old spells to ward off the creatures of the far north. Manned by the Night's Watch, a sworn brotherhood that renounces titles and family to guard the realm, the Wall has stood as the last line of defense against wildlings and, ultimately, the dead for millennia.",
        "By the time of the story the Night's Watch has dwindled to a shadow of its former strength, undermanned and treated as a dumping ground for criminals and disgraced men rather than the elite order it once was. Castle Black, the largest of the Watch's forts along the Wall, becomes the focal point for the order's final, desperate stand against the true enemy the realm had long dismissed as myth."
      ],
      strategicImportance: "The Wall is the single chokepoint between the civilized Seven Kingdoms and the frozen wilderness beyond, making Castle Black one of the most strategically vital — and most neglected — military positions in all of Westeros.",
      culture: "The Night's Watch operates under a strict, ancient oath that forbids marriage, land, and titles, uniting men of every origin, from highborn exiles to convicted criminals, under a single shared purpose.",
      events: [
        {
          season: "Season 1", episode: "Episode 1 — Winter Is Coming",
          title: "First Sighting of the White Walkers",
          text: "A Night's Watch ranging party is slaughtered beyond the Wall by White Walkers, a threat long dismissed as legend by most of the Seven Kingdoms. The lone survivor, Will, is executed by Ned Stark for desertion before he can be fully believed, planting the series' central warning that the true danger to the realm lies not in the south, but in the frozen north.",
          charactersInvolved: ["Waymar Royce", "Gared", "Will", "Eddard Stark"],
          consequences: "The sighting is dismissed by the political powers of Westeros for years, allowing the threat beyond the Wall to grow largely unchecked.",
          importance: "It is the show's cold open and sets up the central dramatic irony of the series: the great game for the Iron Throne is a distraction from an existential threat almost no one takes seriously."
        },
        {
          season: "Season 5", episode: "Episode 8 — Hardhome",
          title: "The Massacre at Hardhome",
          text: "Jon Snow travels beyond the Wall to Hardhome to convince thousands of wildlings to join forces with the Night's Watch against the coming winter. The negotiation is interrupted when the Night King and his army of the dead assault the settlement, slaughtering the wildlings and raising the fallen as wights before Jon's eyes.",
          charactersInvolved: ["Jon Snow", "Tormund Giantsbane", "The Night King"],
          consequences: "The massacre proves the White Walker threat is real and overwhelming, and shows for the first time that Valyrian steel can kill a White Walker.",
          importance: "It is a turning point that finally forces Jon Snow — and the audience — to reckon with the true scale of the threat beyond the Wall."
        },
        {
          season: "Season 8", episode: "Episode 3 — The Long Night",
          title: "The Fall of the Wall",
          text: "Following the Battle of Winterfell, it is revealed that the Night King had already broken through the Wall itself at Eastwatch with the reanimated dragon Viserion, rendering the ancient barrier meaningless before the final battle even began.",
          charactersInvolved: ["The Night King", "Viserion (wight dragon)"],
          consequences: "Thousands of years of northern defense collapse in moments, underscoring how unprepared the realm truly was.",
          importance: "It symbolically ends the era of the Night's Watch as the Seven Kingdoms' last line of defense."
        }
      ],
      battles: [
        {
          name: "Battle of Castle Black",
          season: "Season 4", episode: "Episode 9",
          description: "A two-pronged assault on Castle Black by Mance Rayder's wildling army from the ground and Styr's raiders scaling the Wall itself, defended by a garrison of only a few dozen Night's Watch brothers.",
          combatants: "The Night's Watch versus the wildling army led by Mance Rayder",
          winner: "The Night's Watch, with a decisive last-minute intervention",
          casualties: "Heavy losses on both sides, including the deaths of Ygritte and Grenn.",
          strategy: "The Watch uses fire, boiling oil, and the Wall's own defenses to hold the gate, while a small party cuts down the climbers scaling the ice.",
          keyMoments: "Stannis Baratheon's army arrives at the height of the battle and routs the wildling forces from behind.",
          consequences: "Castle Black survives, and Stannis's arrival draws the Night's Watch and the crown's remaining forces into an uneasy alliance."
        }
      ],
      characterDeaths: [
        {
          name: "Jon Snow (temporarily)",
          season: "Season 5", episode: "Episode 10",
          cause: "Stabbed multiple times",
          killer: "Mutinous Night's Watch officers led by Ser Alliser Thorne",
          text: "Furious at Jon's decision to ally the Watch with the wildlings, a group of his own brothers lure him out into the snow and stab him repeatedly, echoing the ancient betrayal of 'For the Watch.'",
          significance: "Jon's death — and subsequent resurrection by Melisandre — becomes a pivotal turning point that frees him from his Night's Watch vows and repositions him as a central player in the war for the North."
        },
        {
          name: "Ygritte",
          season: "Season 4", episode: "Episode 9",
          cause: "Shot with an arrow",
          killer: "Olly, a young Night's Watch recruit",
          text: "During the wildling assault on Castle Black, Ygritte is fatally struck by an arrow from young Olly while aiming her own bow at Jon Snow, dying in his arms moments later.",
          significance: "Her death devastates Jon and later fuels Olly's own fear and hatred of the wildlings, indirectly contributing to Jon's eventual mutiny and death."
        }
      ],
      castle: {
        architecture: "Castle Black is a sprawling, half-ruined fortress built directly against the base of the Wall, connected to the top by a massive counterweight winch elevator used to move men and supplies to the ice above.",
        importantEvents: "The mustering of the Night's Watch, Jon Snow's rise to Lord Commander, and the eventual abandonment of the Wall as a meaningful barrier.",
        sieges: "Besieged during the wildling invasion under Mance Rayder and effectively rendered obsolete after the Night King's forces breach the Wall itself.",
        ownersByEra: {
          "war-of-the-five-kings": "The Night's Watch",
          "long-night": "Overrun and bypassed by the army of the dead"
        },
        facts: [
          "The elevator cage at Castle Black is one of the few ways to reach the top of the Wall quickly, making it a critical piece of infrastructure during any assault.",
          "By the time of the show, the Night's Watch numbers only a few hundred men, a fraction of the thousands who once guarded the Wall's full length."
        ]
      },
      houses: [],
      coronations: [],
      facts: [
        "The Wall is described as being made of solid ice reinforced with old magic, tall enough that clouds sometimes obscure its top.",
        "Only a handful of gates pierce the Wall's entire length, making Castle Black's gate one of the most strategically vital chokepoints in Westeros."
      ]
    },

    /* ────────────────────────────── KING'S LANDING ────────────────────────────── */
    {
      id: "kings-landing",
      name: "King's Landing",
      x: 28.3, y: 53.8,
      region: "The Crownlands",
      types: ["Castles", "Battles", "Houses", "Characters", "Events", "Coronations", "Dragons"],
      description: "The capital of the Seven Kingdoms, King's Landing sprawls around the Red Keep and the Iron Throne, a crowded, scheming city built where Aegon the Conqueror first landed his dragons.",
      history: [
        "Founded by Aegon Targaryen after his conquest of Westeros, King's Landing grew from a hilltop camp into the largest city in the Seven Kingdoms, dominated by the Red Keep, the seat of whichever house holds the Iron Throne. The throne itself was forged from the melted swords of Aegon's defeated enemies by dragonfire, a literal monument to conquest.",
        "Over the centuries the city has weathered rebellions, sieges, and fires, but nothing compares to the devastation it suffers during the events of the series, first from the Battle of Blackwater and finally from Daenerys Targaryen's assault, which reduces much of the city to ash and rubble."
      ],
      strategicImportance: "As the seat of the Iron Throne and the largest port on the eastern coast of Westeros, control of King's Landing is functionally control of the Seven Kingdoms' government, treasury, and legitimacy.",
      culture: "A dense, cosmopolitan capital where the Faith of the Seven holds official sway, and where court intrigue among the great houses shapes the fate of the realm as much as any battlefield.",
      events: [
        {
          season: "Season 1", episode: "Episode 9 — Baelor",
          title: "The Execution of Eddard Stark",
          text: "Having confessed to treason in a bid to save his daughters, Eddard Stark is publicly beheaded on the steps of the Great Sept of Baelor on the order of the newly crowned King Joffrey, who breaks his mother's plan to spare Ned and send him to the Wall.",
          charactersInvolved: ["Eddard Stark", "Joffrey Baratheon", "Sansa Stark", "Arya Stark", "Cersei Lannister"],
          consequences: "The execution shatters any hope of peace between House Stark and House Lannister and directly ignites the War of the Five Kings.",
          importance: "It is one of the series' most defining moments, establishing early that no character, however central, is safe from sudden and brutal consequence."
        },
        {
          season: "Season 2", episode: "Episode 9 — Blackwater",
          title: "The Battle of Blackwater",
          text: "Stannis Baratheon's fleet and army assault King's Landing by sea, nearly overwhelming the city's defenses before Tyrion Lannister's wildfire trap and the timely arrival of Tywin Lannister's and Highgarden's forces turn the tide.",
          charactersInvolved: ["Tyrion Lannister", "Stannis Baratheon", "Tywin Lannister", "Bronn", "Sandor Clegane"],
          consequences: "Stannis's invasion fails catastrophically, and the Lannister-Tyrell alliance is cemented, propping up the crown for several more years.",
          importance: "It is the show's first large-scale battle and cements Tyrion's reputation as a capable commander, though he receives little credit for it afterward."
        },
        {
          season: "Season 6", episode: "Episode 10 — The Winds of Winter",
          title: "The Destruction of the Great Sept",
          text: "Facing trial before the Faith Militant, Cersei Lannister instead detonates a vast cache of wildfire beneath the Great Sept of Baelor, killing the High Sparrow, the Tyrells, and dozens of nobles and clergy in a single stroke, before crowning herself queen.",
          charactersInvolved: ["Cersei Lannister", "Margaery Tyrell", "The High Sparrow", "Tommen Baratheon"],
          consequences: "The blast eliminates most of Cersei's remaining political rivals in the capital but drives her own son, King Tommen, to suicide, leaving Cersei to seize the throne alone.",
          importance: "It is one of the most consequential single acts in the series, reshaping the political map of Westeros in an instant."
        },
        {
          season: "Season 8", episode: "Episode 5 — The Bells",
          title: "The Sack of King's Landing",
          text: "After the city's bells ring out in surrender, Daenerys Targaryen instead unleashes Drogon in a devastating firestorm across King's Landing, incinerating soldiers and civilians alike in retaliation for the losses she has suffered and her fear of the Iron Throne slipping away.",
          charactersInvolved: ["Daenerys Targaryen", "Jon Snow", "Cersei Lannister", "Jaime Lannister", "Arya Stark"],
          consequences: "Tens of thousands of civilians die, Cersei and Jaime are killed in the collapse of the Red Keep, and Daenerys's actions turn her closest allies against her.",
          importance: "The sack is the series' final, catastrophic turning point, directly leading to Daenerys's death and the reshaping of the Seven Kingdoms' government."
        }
      ],
      battles: [
        {
          name: "Battle of Blackwater",
          season: "Season 2", episode: "Episode 9",
          description: "A naval and siege battle fought in and around Blackwater Bay as Stannis Baratheon attempts to seize King's Landing by force.",
          combatants: "House Lannister and House Baratheon (Stannis) forces",
          winner: "House Lannister, with House Tyrell's timely arrival",
          casualties: "Most of Stannis's fleet is destroyed by wildfire; heavy losses on both sides during the beach and gate fighting.",
          strategy: "Tyrion Lannister uses a single wildfire-laden ship to detonate Stannis's fleet in the bay, then holds the city gates until reinforcements arrive.",
          keyMoments: "The green wildfire explosion in the bay; Tywin Lannister and the Tyrell army arriving from the rear to rout Stannis's forces.",
          consequences: "Stannis's claim to the throne is crippled for years, and the Lannister-Tyrell alliance becomes the dominant power in the realm."
        },
        {
          name: "Sack of King's Landing (The Bells)",
          season: "Season 8", episode: "Episode 5",
          description: "The final assault on the capital, in which Daenerys's dragon and army overwhelm the city's defenses before turning on the surrendering population.",
          combatants: "Daenerys Targaryen's forces versus the remaining Lannister garrison and the city itself",
          winner: "Daenerys Targaryen, at devastating cost",
          casualties: "Tens of thousands of civilians and soldiers; Cersei and Jaime Lannister die in the Red Keep's collapse; Sandor and Gregor Clegane kill each other.",
          strategy: "Euron Greyjoy's fleet and scorpions are destroyed early, allowing Drogon to burn the city's defenses unopposed before the ground assault begins.",
          keyMoments: "The bells ringing for surrender, ignored as Drogon begins the firestorm; the 'Cleganebowl' duel between the Hound and the Mountain.",
          consequences: "The destruction of King's Landing turns Daenerys's own allies against her and directly precipitates her death soon after."
        }
      ],
      characterDeaths: [
        {
          name: "Eddard Stark",
          season: "Season 1", episode: "Episode 9",
          cause: "Beheaded",
          killer: "Ser Ilyn Payne, on Joffrey Baratheon's order",
          text: "Ned is publicly executed on the steps of the Great Sept despite promises he would be sent to the Wall, a decision made impulsively by the newly crowned boy-king Joffrey.",
          significance: "One of television's most famous early deaths, it establishes the show's willingness to kill its ostensible protagonist and reshapes the entire narrative."
        },
        {
          name: "Joffrey Baratheon",
          season: "Season 4", episode: "Episode 2",
          cause: "Poisoned",
          killer: "Olenna Tyrell (with Petyr Baelish's assistance)",
          text: "During his own wedding feast, King Joffrey is poisoned with a substance hidden in his wine, choking to death in front of his horrified court.",
          significance: "The 'Purple Wedding' removes one of the show's most hated antagonists and shifts power toward his younger brother Tommen and the Tyrells."
        },
        {
          name: "Tywin Lannister",
          season: "Season 4", episode: "Episode 10",
          cause: "Shot with a crossbow",
          killer: "Tyrion Lannister",
          text: "After escaping his cell to confront his father, Tyrion finds Tywin in Shae's bed and kills him with a crossbow bolt while he sits on the privy, ending the reign of the Lannister family's most feared patriarch.",
          significance: "The killing frees Tyrion from his family's control but exiles him from Westeros and destabilizes the Lannister regime."
        },
        {
          name: "Cersei and Jaime Lannister",
          season: "Season 8", episode: "Episode 5",
          cause: "Crushed in the collapse of the Red Keep",
          killer: "The city's destruction during Daenerys's assault",
          text: "Trapped as the Red Keep collapses around them while trying to flee through the tunnels beneath the castle, the twins die together in each other's arms.",
          significance: "It closes the decades-long arc of the Lannister twins, ending their story amid the very throne room they had fought so long to control."
        }
      ],
      castle: {
        architecture: "The Red Keep is a massive fortress of pale red stone housing the Iron Throne room, the royal court, and a labyrinth of tunnels and dungeons beneath the city.",
        importantEvents: "The execution of Eddard Stark, the Battle of Blackwater, the Purple Wedding, the destruction of the Great Sept, and the final sack of the city.",
        sieges: "Besieged by Stannis Baratheon at Blackwater Bay and later overwhelmed entirely by Daenerys Targaryen's forces.",
        ownersByEra: {
          "war-of-the-five-kings": "House Baratheon (Lannister-controlled regency)",
          "winds-of-winter": "House Lannister, under Queen Cersei",
          "game-of-thrones-finale": "Governed by a council following the war's end"
        },
        facts: [
          "The Iron Throne was forged from the swords of Aegon's defeated enemies, said to number a thousand, though far fewer swords were actually used.",
          "Beneath the Red Keep lies a network of secret passages used repeatedly throughout the series for escape, murder, and spycraft."
        ]
      },
      houses: [
        {
          name: "House Lannister",
          sigil: "A golden lion on a crimson field",
          words: "Hear Me Roar (rarely spoken; their unofficial motto is 'A Lannister always pays his debts')",
          founder: "Legend credits Lann the Clever as the founder of the house",
          seat: "Casterly Rock, though the family rules from King's Landing for most of the series",
          status: "House Lannister's power collapses by the series' end, with its ruling line extinguished",
          history: "The wealthiest of the great houses thanks to the gold mines of Casterly Rock, House Lannister rises to dominate the Iron Throne through Cersei's regency and Tywin's ruthless statecraft, only to be undone by the very children Tywin sought to control.",
          importantMembers: ["Tywin Lannister", "Cersei Lannister", "Jaime Lannister", "Tyrion Lannister", "Joffrey Baratheon"],
          alliances: ["House Tyrell (through marriage)", "House Frey (temporarily)"],
          enemies: ["House Stark", "House Baratheon (Stannis's branch)", "House Targaryen"]
        }
      ],
      coronations: [
        {
          crowned: "Joffrey Baratheon",
          title: "King of the Andals and the First Men",
          season: "Season 1", episode: "Episode 9",
          location: "The Red Keep, King's Landing",
          significance: "Joffrey's hasty coronation following Robert Baratheon's death installs a cruel, unprepared boy-king whose decisions destabilize the entire realm.",
          before: "Robert Baratheon dies from wounds suffered during a hunt, engineered in part by Cersei Lannister.",
          after: "Joffrey's execution of Eddard Stark directly triggers the War of the Five Kings."
        },
        {
          crowned: "Cersei Lannister",
          title: "Queen of the Andals and the First Men",
          season: "Season 6", episode: "Episode 10",
          location: "The Red Keep, King's Landing",
          significance: "Following the deaths of both her sons and the destruction of her remaining political rivals, Cersei crowns herself ruler in her own right, an unprecedented act for a woman in Westerosi succession.",
          before: "The wildfire destruction of the Great Sept and Tommen's subsequent suicide leave the throne empty.",
          after: "Cersei's reign is short and increasingly isolated, ending with the fall of King's Landing to Daenerys's forces."
        },
        {
          crowned: "Bran Stark",
          title: "King of the Six Kingdoms",
          season: "Season 8", episode: "Episode 6",
          location: "The Dragonpit, King's Landing",
          significance: "In the aftermath of Daenerys's death, the surviving lords of Westeros elect Bran Stark as a compromise ruler, formally ending the hereditary succession that had governed the Iron Throne for centuries.",
          before: "Daenerys Targaryen is killed by Jon Snow after her destruction of King's Landing.",
          after: "The North is granted independence, and a small council is formed to help rebuild the shattered capital."
        }
      ],
      dragons: {
        events: [
          "King's Landing is where Aegon the Conqueror's dragons first established Targaryen rule over Westeros, and centuries later it is where Daenerys's dragon Drogon burns much of the city to the ground.",
          "The Dragonpit, once home to the Targaryen dragons during the height of their dynasty, stands in ruins for most of the series until it is used as the site of the final council that decides the fate of the Seven Kingdoms."
        ],
        battles: ["The Sack of King's Landing, in which Drogon single-handedly destroys the city's defenses and much of its population."],
        deaths: [],
        appearances: ["Drogon's rampage across the city during the Battle of the Bells is the dragon's most destructive appearance in the entire series."]
      }
    },

    /* ────────────────────────────── DRAGONSTONE ────────────────────────────── */
    {
      id: "dragonstone",
      name: "Dragonstone",
      x: 37.3, y: 56.6,
      region: "Crownlands (island)",
      types: ["Castles", "Dragons", "Houses", "Events", "Characters"],
      description: "A brooding volcanic island fortress carved with dragon-motif battlements, Dragonstone was House Targaryen's original seat in Westeros before the conquest and remains steeped in dragon lore.",
      history: [
        "Dragonstone was built by the Valyrian Freehold centuries before the Doom that destroyed Valyria, making it one of the oldest and strangest castles in Westeros, carved directly from black volcanic stone into dragon-shaped towers and gargoyles. It was here that Aegon Targaryen and his sisters launched their conquest of Westeros, and it remained a Targaryen stronghold for generations afterward.",
        "During the series, Dragonstone changes hands repeatedly: from Stannis Baratheon's grim, isolated court, to an abandoned ruin, to Daenerys Targaryen's return to her family's ancestral seat after a lifetime of exile, closing a narrative circle centuries in the making."
      ],
      strategicImportance: "Dragonstone's position guarding the mouth of Blackwater Bay makes it a critical staging point for any invasion of King's Landing, as Daenerys demonstrates when she uses it as her base of operations upon returning to Westeros.",
      culture: "Long associated with the Targaryen dynasty and the worship of R'hllor under Stannis's rule, Dragonstone carries an atmosphere of isolation, ambition, and old magic distinct from the rest of the Crownlands.",
      events: [
        {
          season: "Season 2", episode: "Episode 1 — The North Remembers",
          title: "Stannis Baratheon's War Council",
          text: "Stannis Baratheon, having declared himself the rightful king following revelations about Joffrey's parentage, plans his campaign for the Iron Throne from Dragonstone, guided increasingly by the red priestess Melisandre and her visions of prophecy and fire.",
          charactersInvolved: ["Stannis Baratheon", "Melisandre", "Davos Seaworth"],
          consequences: "Stannis's alliance with Melisandre steers his campaign toward increasingly extreme and ultimately self-destructive choices.",
          importance: "It establishes Dragonstone as a seat of religious fervor and dark bargains throughout the middle seasons of the series."
        },
        {
          season: "Season 7", episode: "Episode 1 — Dragonstone",
          title: "Daenerys Targaryen's Homecoming",
          text: "After a lifetime in exile across the Narrow Sea, Daenerys Targaryen finally returns to Westeros and sets foot on Dragonstone, her family's ancestral seat, declaring her intent to reclaim the Iron Throne from its shores.",
          charactersInvolved: ["Daenerys Targaryen", "Tyrion Lannister", "Varys", "Missandei"],
          consequences: "Dragonstone becomes Daenerys's base for the remainder of the war, and it is here she meets Jon Snow for the first time.",
          importance: "It marks the symbolic return of a Targaryen to Targaryen soil for the first time since Robert's Rebellion."
        }
      ],
      battles: [],
      characterDeaths: [
        {
          name: "Shireen Baratheon",
          season: "Season 5", episode: "Episode 9",
          cause: "Burned at the stake",
          killer: "Stannis Baratheon (ordered) and Melisandre (carried out)",
          text: "Convinced by Melisandre that a king's blood sacrifice is needed to clear the snows blocking his march on Winterfell, Stannis allows his own daughter to be burned alive on Dragonstone's shore.",
          significance: "Considered one of the show's most disturbing moments, it destroys any remaining sympathy for Stannis and precipitates his army's collapse and his own death shortly after."
        }
      ],
      castle: {
        architecture: "A castle of black stone carved with dragon gargoyles and towers shaped like coiled dragons, built atop a still-active volcanic mountain on a remote island in Blackwater Bay.",
        importantEvents: "Stannis Baratheon's war councils, Shireen's sacrifice, and Daenerys Targaryen's return to Westeros.",
        sieges: "Largely uncontested for most of the series, changing hands through succession and abandonment rather than direct siege, until Euron Greyjoy's fleet later raids it.",
        ownersByEra: {
          "war-of-the-five-kings": "House Baratheon, under Stannis",
          "game-of-thrones": "House Targaryen, under Daenerys"
        },
        facts: [
          "A hidden cache of dragonglass is discovered beneath Dragonstone, later proving vital to the war against the White Walkers.",
          "The castle's architecture is unique in Westeros, built in a style found nowhere else outside of old Valyria."
        ]
      },
      houses: [
        {
          name: "House Targaryen",
          sigil: "A three-headed red dragon on a black field",
          words: "Fire and Blood",
          founder: "Aegon the Conqueror's ancestors, who fled the Doom of Valyria and settled on Dragonstone generations before the conquest of Westeros",
          seat: "Originally Dragonstone, later the Red Keep in King's Landing",
          status: "The dynasty's direct line ends with Daenerys's death, though Jon Snow (Aegon Targaryen) survives as her last known relative",
          history: "Descended from the dragonlords of old Valyria, House Targaryen ruled the Seven Kingdoms for nearly three hundred years after Aegon's Conquest, maintained their power through dragons and, at times, ruinous madness, until Robert's Rebellion overthrew the dynasty and scattered its last survivors into exile.",
          importantMembers: ["Aegon the Conqueror", "Aerys II Targaryen (the Mad King)", "Rhaegar Targaryen", "Daenerys Targaryen", "Jon Snow / Aegon Targaryen"],
          alliances: ["The Dothraki (through Daenerys's marriage)", "House Martell (historically)"],
          enemies: ["House Baratheon", "House Lannister (during Robert's Rebellion)"]
        }
      ],
      coronations: [],
      dragons: {
        events: [
          "Dragonstone is where the last of the Targaryen dragon eggs were kept for generations after dragons went extinct, and it is on this island that Daenerys's three dragons — Drogon, Rhaegal, and Viserion — are stabled after their return to Westeros.",
          "The island's volcanic caverns and dragonglass deposits tie it symbolically and materially to the war against the dead, since obsidian mined here becomes one of the few weapons capable of killing White Walkers."
        ],
        battles: [],
        deaths: [],
        appearances: ["Daenerys's dragons circle and roost above Dragonstone throughout Season 7, using the island as their primary base in Westeros."]
      }
    },

    /* ────────────────────────────── CASTERLY ROCK ────────────────────────────── */
    {
      id: "casterly-rock",
      name: "Casterly Rock",
      x: 8.1, y: 55.9,
      region: "The Westerlands",
      types: ["Castles", "Houses", "Events"],
      description: "A colossal fortress carved into a stone headland overlooking the sea, Casterly Rock is the ancestral seat of House Lannister and the source of the family's legendary wealth.",
      history: [
        "According to legend, Casterly Rock was won by Lann the Clever, who is said to have tricked the Casterly family out of their own home through cunning rather than conquest. The Rock's honeycombed gold mines made House Lannister the wealthiest family in Westeros for centuries, funding their rise to political dominance.",
        "In the series, Casterly Rock is left largely undefended as the Lannisters focus their strength on holding King's Landing, a decision that comes back to haunt them when Euron Greyjoy's forces and Daenerys's allies exploit the castle's weakened garrison."
      ],
      strategicImportance: "As the Lannister family's ancestral stronghold and the source of their gold, Casterly Rock is more a symbol of the family's power than a battlefield, which is precisely what makes its eventual capture so humiliating for House Lannister.",
      culture: "The Rock embodies Lannister pride and legacy; its halls and mines are steeped in the family's self-image as the cleverest and wealthiest of the great houses.",
      events: [
        {
          season: "Season 7", episode: "Episode 3 — The Queen's Justice",
          title: "The Fall of Casterly Rock",
          text: "Daenerys's allies, the Unsullied under Grey Worm, launch an amphibious assault to seize Casterly Rock, only to find the castle nearly emptied of its garrison — Jaime Lannister, anticipating the move, had already withdrawn the bulk of his forces to instead strike Highgarden.",
          charactersInvolved: ["Grey Worm", "Jaime Lannister", "Euron Greyjoy"],
          consequences: "The Unsullied capture an essentially hollow prize while Euron's fleet destroys much of Daenerys's Dornish and Ironborn naval support in the same maneuver.",
          importance: "It demonstrates Jaime Lannister's tactical acumen and marks a costly strategic setback for Daenerys's early campaign in Westeros."
        }
      ],
      battles: [],
      characterDeaths: [],
      castle: {
        architecture: "A vast fortress hollowed directly out of a mountain of stone on the western coast, riddled with the mine shafts that made the Lannisters' fortune, considered nearly impregnable by direct assault.",
        importantEvents: "The Unsullied's capture of the largely emptied castle during the war against Cersei Lannister.",
        sieges: "Taken with minimal resistance after Jaime Lannister deliberately withdrew most of its garrison to counterattack elsewhere.",
        ownersByEra: {
          "game-of-thrones": "Captured by Daenerys's Unsullied forces in the final seasons"
        },
        facts: [
          "The Rock's gold mines are said to have run dry by the time of the series, a secret the Lannisters worked hard to conceal to preserve their reputation for bottomless wealth.",
          "It is considered one of the most naturally defensible castles in Westeros, rarely taken by force in its long history."
        ]
      },
      houses: [
        {
          name: "House Lannister",
          sigil: "A golden lion on a crimson field",
          words: "Hear Me Roar",
          founder: "Lann the Clever",
          seat: "Casterly Rock",
          status: "The ruling line is extinguished by the series' end",
          history: "House Lannister's wealth and cunning made it the second most powerful house in Westeros for centuries, a legacy the family leaned on heavily even after its gold mines quietly ran dry.",
          importantMembers: ["Tywin Lannister", "Cersei Lannister", "Jaime Lannister", "Tyrion Lannister"],
          alliances: ["House Tyrell (through marriage)"],
          enemies: ["House Stark", "House Targaryen"]
        }
      ],
      coronations: [],
      facts: [
        "Casterly Rock's capture by the Unsullied is ultimately a hollow victory, as Jaime Lannister's counterattack on Highgarden proves far more strategically valuable to the Lannister cause.",
        "The Rock's tunnels and mine shafts made it notoriously difficult to fully garrison or defend against an enemy familiar with its layout."
      ]
    },

    /* ────────────────────────────── HIGHGARDEN ────────────────────────────── */
    {
      id: "highgarden",
      name: "Highgarden",
      x: 12.1, y: 63.8,
      region: "The Reach",
      types: ["Castles", "Houses", "Battles", "Characters", "Events"],
      description: "A lush, flowering castle at the heart of the fertile Reach, Highgarden is the ancestral seat of House Tyrell, renowned for its gardens, wealth in grain, and political cunning.",
      history: [
        "Highgarden has long been considered one of the most beautiful and prosperous seats in Westeros, its terraced gardens and abundant harvests making House Tyrell one of the wealthiest and most influential families in the Seven Kingdoms. The Tyrells parlayed this wealth into a marriage alliance with the crown, first through Margaery's betrothal to Renly Baratheon, then to Joffrey, and finally to Tommen.",
        "The house's fortunes collapse swiftly in the later seasons: the wildfire destruction of the Great Sept kills Margaery and much of the Tyrell family's standing at court, and Jaime Lannister's subsequent invasion of Highgarden itself brings the family's centuries of power to an abrupt and total end."
      ],
      strategicImportance: "As the breadbasket of the Seven Kingdoms, Highgarden's grain supplies were essential to feeding King's Landing and any army marching through the Reach, making its capture a devastating blow to Cersei's ability to wage war.",
      culture: "Tyrell culture prizes wit, subtlety, and courtly grace, epitomized by Olenna Tyrell's sharp tongue and Margaery's careful political maneuvering.",
      events: [
        {
          season: "Season 7", episode: "Episode 3 — The Queen's Justice",
          title: "Jaime Lannister's Invasion of Highgarden",
          text: "While the Unsullied are diverted to an emptied Casterly Rock, Jaime Lannister leads the Lannister army directly against Highgarden itself, catching the Tyrell forces completely unprepared and seizing the castle along with its vast stores of grain and gold.",
          charactersInvolved: ["Jaime Lannister", "Olenna Tyrell", "Bronn"],
          consequences: "House Tyrell is effectively destroyed as a political and military power, and its wealth is funneled directly into Cersei's war effort.",
          importance: "It is one of the war's most consequential strategic strikes, ending a centuries-old house in a single swift campaign."
        }
      ],
      battles: [
        {
          name: "Fall of Highgarden",
          season: "Season 7", episode: "Episode 3",
          description: "A surprise Lannister assault on the largely undefended Tyrell stronghold, executed while Daenerys's forces were misdirected toward Casterly Rock.",
          combatants: "House Lannister versus House Tyrell",
          winner: "House Lannister",
          casualties: "The Tyrell garrison is overwhelmed with minimal Lannister losses; Olenna Tyrell is captured rather than killed in battle.",
          strategy: "Jaime deliberately allows the Unsullied to take an emptied Casterly Rock while marching the true Lannister army directly on the poorly defended Reach.",
          keyMoments: "Olenna Tyrell's capture and her final poisoned-wine confession to Jaime that she was the one who killed Joffrey.",
          consequences: "House Tyrell's line and power are permanently ended, and its wealth funds Cersei's continued war against Daenerys."
        }
      ],
      characterDeaths: [
        {
          name: "Olenna Tyrell",
          season: "Season 7", episode: "Episode 3",
          cause: "Poison (self-administered)",
          killer: "Jaime Lannister (indirectly, by offering a painless death)",
          text: "Rather than face execution, Olenna Tyrell accepts Jaime's offer of a swift, poisoned death, using her final moments to reveal that she — not Tyrion — was truly responsible for Joffrey's murder at the Purple Wedding.",
          significance: "Her final confession recontextualizes years of the show's plot and gives one of its sharpest characters a defiant, unforgettable exit."
        }
      ],
      castle: {
        architecture: "A castle built amid terraced gardens and orchards, famed throughout Westeros for its beauty and abundance rather than its military fortifications.",
        importantEvents: "The betrothal negotiations of Margaery Tyrell and the eventual Lannister conquest of the castle.",
        sieges: "Taken swiftly by Jaime Lannister's army with little organized resistance.",
        ownersByEra: { "game-of-thrones": "Seized by House Lannister" },
        facts: [
          "Highgarden's grain reserves were considered essential to feeding King's Landing, making its loss a serious blow to whoever controlled the capital.",
          "The Tyrells' rise to prominence came relatively late compared to older houses, built primarily through wealth and calculated marriages rather than ancient lineage."
        ]
      },
      houses: [
        {
          name: "House Tyrell",
          sigil: "A golden rose on a green field",
          words: "Growing Strong",
          founder: "Legend credits the steward Garth Greenhand's line with founding the house's fortunes in the Reach",
          seat: "Highgarden",
          status: "The house's ruling line is entirely extinguished by the war's end",
          history: "Rising to become stewards and eventually lords of the Reach, House Tyrell built immense wealth through Highgarden's fertile lands, leveraging marriage alliances to gain influence at court that ultimately proved fatal when the family became entangled in the war between Lannister and Targaryen.",
          importantMembers: ["Olenna Tyrell", "Margaery Tyrell", "Loras Tyrell", "Mace Tyrell"],
          alliances: ["House Lannister (through marriage)", "House Baratheon (Renly's claim)", "House Martell (briefly)"],
          enemies: ["House Lannister (after Cersei's betrayal)"]
        }
      ],
      coronations: [],
      facts: [
        "The Tyrell rose is worn by many of the family's soldiers and knights as a badge, reflecting the house's emphasis on beauty as much as strength.",
        "Highgarden's fall is considered one of the swiftest and most complete destructions of a great house in the entire series."
      ]
    },

    /* ────────────────────────────── SUNSPEAR ────────────────────────────── */
    {
      id: "sunspear",
      name: "Sunspear",
      x: 15.2, y: 73.8,
      region: "Dorne",
      types: ["Castles", "Houses", "Characters", "Events"],
      description: "The sun-baked capital of Dorne, Sunspear is the seat of House Martell, a region with its own laws, culture, and a fierce independent streak within the Seven Kingdoms.",
      history: [
        "Dorne is unique among the Seven Kingdoms in that it was never conquered by Aegon the Conqueror's dragons, instead joining the realm generations later through marriage rather than war, a fact that shapes Dornish pride and its distinct legal customs, including a more equal treatment of women in matters of succession.",
        "In the series, Sunspear becomes the seat of a bitter revenge plot following the death of Oberyn Martell, as his lover and daughters, the Sand Snakes, seize control from the more cautious Prince Doran, plunging Dorne into political turmoil during a critical period of the wider war."
      ],
      strategicImportance: "Dorne's deserts and mountain passes have historically made it nearly impossible to conquer by force, giving House Martell an outsized independence and bargaining position within the Seven Kingdoms.",
      culture: "Dornish culture blends Rhoynish and Andal traditions, prizing passion, hospitality, and a more relaxed attitude toward marriage, legitimacy, and gender roles than the rest of Westeros.",
      events: [
        {
          season: "Season 5", episode: "Episode 10 — Mother's Mercy",
          title: "The Sand Snakes' Coup",
          text: "Enraged by Prince Doran's refusal to seek vengeance for Oberyn's death, Ellaria Sand and her daughters the Sand Snakes assassinate Doran and his son Trystane, seizing control of Dorne and its military strength for themselves.",
          charactersInvolved: ["Ellaria Sand", "Doran Martell", "Trystane Martell", "The Sand Snakes"],
          consequences: "Dorne's alliance shifts abruptly from a cautious neutrality to open hostility against House Lannister.",
          importance: "It sets up Dorne's later alliance with Daenerys Targaryen, though the storyline is resolved relatively quickly afterward."
        }
      ],
      battles: [],
      characterDeaths: [
        {
          name: "Oberyn Martell",
          season: "Season 4", episode: "Episode 8",
          cause: "Skull crushed in trial by combat",
          killer: "Gregor Clegane (the Mountain)",
          text: "Fighting as Tyrion Lannister's champion to avenge his sister Elia's murder, Oberyn very nearly wins his duel against Gregor Clegane before recklessly taunting his opponent, giving the Mountain the opening to crush his skull with his bare hands.",
          significance: "One of the show's most shocking deaths, it dooms Tyrion's trial and ignites Dorne's furious desire for vengeance against the Lannisters."
        }
      ],
      castle: {
        architecture: "A palace of sun-bleached sandstone and shaded courtyards built for Dorne's arid climate, blending Rhoynish water gardens with traditional Westerosi fortification.",
        importantEvents: "The assassination of Prince Doran Martell and the Sand Snakes' brief seizure of power.",
        sieges: "Not besieged directly in the series; power changes hands through assassination rather than warfare.",
        ownersByEra: { "game-of-thrones": "House Martell, later allied with Daenerys Targaryen" },
        facts: [
          "Dorne is the only region of Westeros never conquered outright by the Targaryen dragons.",
          "Dornish law allows women to inherit and rule equally with men, unlike most of the rest of Westeros."
        ]
      },
      houses: [
        {
          name: "House Martell",
          sigil: "A red sun pierced by a golden spear on an orange field",
          words: "Unbowed, Unbent, Unbroken",
          founder: "Nymeria, a Rhoynish warrior queen who united Dorne through marriage to House Martell",
          seat: "Sunspear",
          status: "Fractured after Doran's assassination; its later fate is largely left unresolved",
          history: "House Martell's founding by the Rhoynish queen Nymeria gives Dorne a distinct cultural heritage from the rest of Westeros, reinforcing its fierce independence and unique legal traditions.",
          importantMembers: ["Doran Martell", "Oberyn Martell", "Ellaria Sand", "Arianne Martell"],
          alliances: ["House Targaryen (historically and again under Daenerys)"],
          enemies: ["House Lannister (after Elia Martell's murder)"]
        }
      ],
      coronations: [],
      facts: [
        "Dorne joined the Seven Kingdoms peacefully through the marriage of Daeron II Targaryen, generations after Aegon's Conquest failed to subdue it militarily.",
        "The Sand Snakes' storyline was significantly compressed in the show compared to the deeper political intrigue given to Dorne in the source novels."
      ]
    },

    /* ────────────────────────────── BRAAVOS ────────────────────────────── */
    {
      id: "braavos",
      name: "Braavos",
      x: 55.4, y: 42.5,
      region: "Essos (Free Cities)",
      types: ["Events", "Characters", "Houses"],
      description: "A proud, watery free city built on a lagoon across the Narrow Sea, Braavos was founded by escaped slaves and is famed for its bank, its warrior-poets, and the shadowy Faceless Men.",
      history: [
        "Braavos was secretly founded by slaves fleeing Valyrian bondage centuries before the story begins, giving the city a fierce cultural opposition to slavery that distinguishes it from many of the other Free Cities. Its massive bronze statue, the Titan of Braavos, straddles the harbor entrance as a symbol of the city's independence and pride.",
        "In the series, Braavos becomes central to Arya Stark's journey, as she trains among the mysterious Faceless Men at the House of Black and White to become an assassin capable of changing her face and identity at will."
      ],
      strategicImportance: "As the wealthiest of the Free Cities and home to the Iron Bank, Braavos holds enormous financial influence over Westerosi politics, with the crown's debts to the Bank shaping major plot decisions throughout the series.",
      culture: "Braavosi culture blends maritime trade, water-dancing swordsmanship, and the secretive worship of the Many-Faced God, a religion centered on the idea that all deaths are part of one god's design.",
      events: [
        {
          season: "Season 5", episode: "Episode 2 — The House of Black and White",
          title: "Arya Stark's Arrival at the House of Black and White",
          text: "Arya Stark arrives in Braavos to begin her training among the Faceless Men, an ancient order of assassins who serve the Many-Faced God and can alter their appearance completely, beginning a years-long arc of trial, hardship, and near loss of her own identity.",
          charactersInvolved: ["Arya Stark", "Jaqen H'ghar", "The Waif"],
          consequences: "Arya's training gives her the skills that later prove decisive in the fight against the Night King and in her revenge against the Freys.",
          importance: "Braavos becomes the crucible where Arya nearly loses herself before ultimately choosing to remain 'no one' only long enough to reclaim who she truly is."
        }
      ],
      battles: [],
      characterDeaths: [
        {
          name: "The Waif",
          season: "Season 6", episode: "Episode 8",
          cause: "Stabbed",
          killer: "Arya Stark",
          text: "After a prolonged pursuit through the streets and catacombs of Braavos, a wounded Arya lures the Waif into a dark room and kills her, finally proving herself ready to leave the Faceless Men behind.",
          significance: "The victory marks the completion of Arya's training and her decisive choice to remain Arya Stark rather than become 'no one.'"
        }
      ],
      castle: {},
      houses: [],
      coronations: [],
      facts: [
        "The Titan of Braavos is one of the largest statues in the known world, straddling the harbor entrance so ships must pass beneath its legs.",
        "The Iron Bank of Braavos is infamous throughout Westeros for its unwavering insistence that all debts be repaid, regardless of the debtor's status."
      ]
    },

    /* ────────────────────────────── PENTOS ────────────────────────────── */
    {
      id: "pentos",
      name: "Pentos",
      x: 60.4, y: 46.6,
      region: "Essos (Free Cities)",
      types: ["Events", "Characters"],
      description: "The Free City closest to Westeros' shores, Pentos is a wealthy trading port governed by an elected prince and long a haven for exiled Westerosi nobility.",
      history: [
        "Pentos has served for years as a refuge for political exiles from Westeros, including, at the start of the series, the last remnants of the Targaryen dynasty, Viserys and Daenerys, sheltered by the wealthy magister Illyrio Mopatis while they plot a return to power.",
        "Unlike Braavos or Volantis, Pentos maintains a fragile independence, forced periodically to pay tribute to the Dothraki hordes that roam nearby to avoid being raided."
      ],
      strategicImportance: "Its position as the closest Free City to Westeros makes Pentos a natural launching point for any invasion or exile plot originating across the Narrow Sea, as demonstrated by both Viserys and Daenerys's early schemes.",
      culture: "Pentos is ruled by an elected prince with largely ceremonial ritual duties, while true power rests with its wealthy merchant magisters, one of whom, Illyrio Mopatis, plays a quiet but significant role in restoring Targaryen fortunes.",
      events: [
        {
          season: "Season 1", episode: "Episode 1 — Winter Is Coming",
          title: "Daenerys's Marriage to Khal Drogo",
          text: "Viserys Targaryen sells his sister Daenerys into marriage with the Dothraki warlord Khal Drogo in exchange for the promise of an army to reclaim the Iron Throne, a transaction arranged in Illyrio Mopatis's mansion in Pentos.",
          charactersInvolved: ["Daenerys Targaryen", "Viserys Targaryen", "Khal Drogo", "Illyrio Mopatis"],
          consequences: "The marriage, initially a source of trauma for Daenerys, gradually becomes the foundation of her own political and personal awakening.",
          importance: "It is the true beginning of Daenerys's independent arc, setting her on a path that eventually leads her back across the Narrow Sea as a conqueror in her own right."
        }
      ],
      battles: [],
      characterDeaths: [],
      castle: {},
      houses: [],
      coronations: [],
      facts: [
        "Pentos's elected princes serve largely symbolic roles and can be ritually killed if their harvests or fortunes fail, a custom that has fallen out of practice by the time of the series.",
        "Illyrio Mopatis's mansion in Pentos serves as the launching point for both Viserys and Daenerys's earliest ambitions to reclaim Westeros."
      ]
    },

    /* ────────────────────────────── VOLANTIS ────────────────────────────── */
    {
      id: "volantis",
      name: "Volantis",
      x: 66.7, y: 63.4,
      region: "Essos (Free Cities)",
      types: ["Events", "Characters"],
      description: "The oldest and once-mightiest of the Free Cities, Volantis is a decaying but still-grand metropolis split between its wealthy 'old blood' elite and a vast enslaved population marked by facial tattoos.",
      history: [
        "Founded directly by the Valyrian Freehold, Volantis considers itself the true heir to Valyria's legacy, its old-blood families still tracing their lineage to the dragonlords of old. Despite its former glory, the city has declined in power relative to its rivals, and remains one of the last Free Cities to still practice slavery openly.",
        "The city plays a supporting role in the series as a waypoint for several characters, including Tyrion Lannister and Varys during their journey to Daenerys, and later as the source of significant naval support for her invasion of Westeros."
      ],
      strategicImportance: "Volantis's large fleet ultimately provides crucial naval reinforcements for Daenerys Targaryen's campaign against King's Landing, arriving at a decisive moment in the war.",
      culture: "Volantene society is rigidly stratified between the old-blood elite descended from Valyria and its enormous slave population, with red priests of R'hllor holding significant religious influence throughout the city.",
      events: [
        {
          season: "Season 5", episode: "Episode 6 — Unbowed, Unbent, Unbroken",
          title: "Tyrion and Varys Pass Through Volantis",
          text: "Traveling incognito toward Daenerys and Meereen, Tyrion Lannister and Varys pass through Volantis, where Tyrion witnesses the fervor of a Red Priestess preaching about Daenerys as a prophesied savior, and is later captured by Malko and Jorah Mormont amid the city's streets.",
          charactersInvolved: ["Tyrion Lannister", "Varys", "Jorah Mormont"],
          consequences: "Tyrion's capture leads directly to his eventual meeting with Daenerys, cementing his role as one of her key advisors.",
          importance: "It highlights the growing religious mythology surrounding Daenerys across Essos even before her return to Westeros."
        }
      ],
      battles: [],
      characterDeaths: [],
      castle: {},
      houses: [],
      coronations: [],
      facts: [
        "Volantene slaves are marked with facial tattoos denoting their occupation, a practice that sets the city apart even among the slaving cities of Essos.",
        "The Volantene fleet later plays a significant role reinforcing Daenerys's naval strength during her campaign against Cersei Lannister."
      ]
    },

    /* ────────────────────────────── MEEREEN ────────────────────────────── */
    {
      id: "meereen",
      name: "Meereen",
      x: 82.7, y: 71.6,
      region: "Slaver's Bay, Essos",
      types: ["Events", "Battles", "Characters", "Dragons"],
      description: "One of the great slaving cities of Slaver's Bay, Meereen becomes the site of Daenerys Targaryen's first true attempt at governing as a queen rather than simply conquering as a liberator.",
      history: ["Meereen, like its sister cities Astapor and Yunkai, built its wealth on the slave trade for centuries before Daenerys Targaryen's arrival, freeing its slaves and attempting, with great difficulty, to govern a city whose economy and social order had been built entirely around bondage.",
        "Her time in Meereen becomes a crucible for Daenerys's growth as a ruler, forcing her to grapple with insurgency, political compromise, and the painful gap between liberating a people and successfully governing them afterward."],
      strategicImportance: "Meereen serves as Daenerys's proving ground as a ruler before her invasion of Westeros, and its harbor and resources become essential staging points for her eventual fleet.",
      culture: "A city built on Valyrian-descended slaving traditions, Meereen's Great Pyramid and fighting pits reflect a culture Daenerys works to dismantle and reform throughout her rule.",
      events: [
        {
          season: "Season 4", episode: "Episode 10 — The Children",
          title: "Daenerys Locks Away Her Dragons",
          text: "After her dragon Drogon is implicated in the death of a Meereenese child, Daenerys makes the painful decision to chain her two remaining dragons, Viserion and Rhaegal, in the catacombs beneath the Great Pyramid to prevent further harm.",
          charactersInvolved: ["Daenerys Targaryen", "Viserion", "Rhaegal", "Drogon"],
          consequences: "The chained dragons remain a lingering vulnerability and symbol of Daenerys's compromised rule for several seasons.",
          importance: "It is one of the clearest illustrations of the tension between Daenerys's power and her responsibility as a ruler."
        },
        {
          season: "Season 5", episode: "Episode 9 — The Dance of Dragons",
          title: "The Fighting Pits and Drogon's Rescue",
          text: "Attending a reinstated fighting-pit exhibition as a political compromise, Daenerys and her court are ambushed by masked Sons of the Harpy insurgents, and are saved only when Drogon bursts through the arena wall to defend her.",
          charactersInvolved: ["Daenerys Targaryen", "Tyrion Lannister", "Drogon", "The Sons of the Harpy"],
          consequences: "Daenerys flies off on Drogon's back, leaving her city in the hands of her advisors and setting up her temporary absence among the Dothraki.",
          importance: "It is one of the series' most striking dragon set-pieces and marks Drogon's full return as Daenerys's protector."
        }
      ],
      battles: [
        {
          name: "Battle of Meereen",
          season: "Season 6", episode: "Episode 9",
          description: "The defense of Meereen's harbor against the combined slaver fleets of Astapor and Yunkai, seeking to retake the city and restore slavery.",
          combatants: "Daenerys's forces (Unsullied, Dothraki, and dragons) versus the Masters' slaver fleets",
          winner: "Daenerys Targaryen",
          casualties: "The slaver fleet is almost entirely destroyed by dragonfire and Dothraki cavalry.",
          strategy: "Daenerys returns astride Drogon at the height of the siege, with all three dragons unleashed to burn the attacking ships while Dothraki riders and Unsullied troops crush the remaining ground forces.",
          keyMoments: "Daenerys's dramatic return on dragonback after her time with the Dothraki; the full deployment of all three dragons together for the first time.",
          consequences: "The slaver cities' threat to Meereen is permanently broken, freeing Daenerys to focus her full attention on Westeros."
        }
      ],
      characterDeaths: [],
      castle: {},
      houses: [],
      coronations: [],
      dragons: {
        events: [
          "Meereen is where Daenerys is forced to chain two of her dragons for the safety of the city's people, and it is also where all three of her dragons fight together for the first time to break the siege of the Masters' fleets.",
        ],
        battles: ["The Battle of Meereen, in which Drogon, Rhaegal, and Viserion together incinerate the attacking slaver fleet."],
        deaths: [],
        appearances: ["Drogon's dramatic rescue of Daenerys during the fighting-pit ambush is one of the show's most memorable dragon sequences."]
      }
    },

    /* ────────────────────────────── VAES DOTHRAK ────────────────────────────── */
    {
      id: "vaes-dothrak",
      name: "Vaes Dothrak",
      x: 81.0, y: 53.4,
      region: "The Dothraki Sea, Essos",
      types: ["Events", "Characters", "Houses"],
      description: "The sacred, half-permanent city of the Dothraki horselords, Vaes Dothrak is ruled not by a single king but by whichever khal currently holds the greatest khalasar, under the watchful authority of the Dosh Khaleen.",
      history: [
        "Vaes Dothrak serves as a sacred gathering point for the nomadic Dothraki, a city without walls where violence is forbidden by ancient custom, home to the Dosh Khaleen, a council of widowed khaleesi who interpret prophecy and preside over Dothraki spiritual life.",
        "Daenerys Targaryen's arc brings her to Vaes Dothrak twice: first as Khal Drogo's bride learning the customs of her new people, and later as a widow expected to join the Dosh Khaleen, an expectation she violently rejects, walking unburned from a fire that kills every khal in the city and emerging as the sole ruler of a unified Dothraki horde."
      ],
      strategicImportance: "Whoever commands the unified Dothraki horde at Vaes Dothrak gains access to the single largest cavalry force in the known world, a decisive strategic asset that Daenerys ultimately claims for herself.",
      culture: "Dothraki culture prizes horsemanship, physical strength, and open-air worship of the Great Stallion, with all violence forbidden within Vaes Dothrak's sacred boundaries as a matter of ancient law.",
      events: [
        {
          season: "Season 1", episode: "Episode 10 — Fire and Blood",
          title: "The Birth of Daenerys's Dragons",
          text: "Following Khal Drogo's death, Daenerys builds his funeral pyre and, in an act long thought impossible, walks into the flames with her three dragon eggs, emerging unburned at dawn with three newborn dragons — Drogon, Rhaegal, and Viserion — clinging to her.",
          charactersInvolved: ["Daenerys Targaryen", "Khal Drogo", "Mirri Maz Duur"],
          consequences: "The birth of the dragons instantly transforms Daenerys from a grieving widow into one of the most powerful figures in the known world.",
          importance: "It is one of the series' defining images and the moment dragons truly return to the world after generations of extinction."
        },
        {
          season: "Season 6", episode: "Episode 4 — Book of the Stranger",
          title: "The Burning of the Khals",
          text: "Brought before the assembled khals as a captive expected to join the Dosh Khaleen, Daenerys instead sets the great wooden temple ablaze with herself and the khals inside, walking out unburned once again, and claims their combined khalasar as her own.",
          charactersInvolved: ["Daenerys Targaryen", "Khal Moro", "Jorah Mormont", "Daario Naharis"],
          consequences: "Daenerys gains command of the largest unified Dothraki horde in generations, dramatically strengthening her position ahead of her invasion of Westeros.",
          importance: "It cements Daenerys's identity as 'the Unburnt' and gives her the massive cavalry force that later proves decisive at the Battle of Winterfell."
        }
      ],
      battles: [],
      characterDeaths: [],
      castle: {},
      houses: [],
      coronations: [],
      dragons: {
        events: ["Vaes Dothrak is the birthplace of dragons in the modern era of the series, as Drogon, Rhaegal, and Viserion hatch from Daenerys's eggs on Khal Drogo's funeral pyre."],
        battles: [],
        deaths: [],
        appearances: ["The hatching of the three dragons at Drogo's pyre is the very first dragon appearance in the entire series."]
      },
      facts: [
        "Vaes Dothrak has no walls, relying instead on ancient taboo and the sheer size of any gathered khalasar to protect it from outside attack.",
        "The city's central feature, the Mother of Mountains and the Womb of the World, are considered sacred sites central to Dothraki religious practice."
      ]
    }
  ]
};

/* Category metadata: icons, labels, and marker styling keys used by mapMarkers.js */
const CATEGORY_META = {
  all:          { icon: "📍", label: "All",          field: null },
  Events:       { icon: "📍", label: "Events",       field: "events" },
  Battles:      { icon: "⚔",  label: "Battles",      field: "battles" },
  Characters:   { icon: "☠",  label: "Characters",   field: "characterDeaths" },
  Dragons:      { icon: "🐉", label: "Dragons",      field: "dragons" },
  Castles:      { icon: "🏰", label: "Castles",      field: "castle" },
  Houses:       { icon: "🛡",  label: "Houses",       field: "houses" },
  Coronations:  { icon: "👑", label: "Coronations",  field: "coronations" },
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = { mapData, CATEGORY_META };
}