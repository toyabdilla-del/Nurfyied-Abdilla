export interface SinamaWord {
  id: string;
  sinama: string;
  ipa: string;
  phoneticGuide: string;
  english: string;
  category: 'greetings' | 'sea_navigation' | 'kinship' | 'daily_life' | 'numbers' | 'proverbs';
  culturalContext: string;
  exampleSentence: {
    sinama: string;
    english: string;
  };
  syllables: string[];
  glottalStops?: boolean;
  geminates?: boolean;
}

export interface CulturalLesson {
  id: string;
  title: string;
  sinamaTitle: string;
  summary: string;
  coverImage: string;
  tag: string;
  readTime: string;
  content: string[];
  keyVocabulary: { word: string; meaning: string }[];
}

export const SINAMA_CATEGORIES = [
  { id: 'all', name: 'All Topics', count: 32 },
  { id: 'greetings', name: 'Greetings (Pag-ilam)', count: 8 },
  { id: 'sea_navigation', name: 'Sea & Navigation (Tahik)', count: 10 },
  { id: 'kinship', name: 'Kinship & Elders (Mabarakat)', count: 5 },
  { id: 'daily_life', name: 'Daily Life & Craft (Kalluman)', count: 5 },
  { id: 'numbers', name: 'Numerals (Pag-itungan)', count: 10 },
  { id: 'proverbs', name: 'Wisdom & Lore (Parabbasan)', count: 4 },
];

export const SINAMA_VOCABULARY: SinamaWord[] = [
  // Greetings & Essentials
  {
    id: 'malingkat-subu',
    sinama: 'Malingkat subu',
    ipa: '/ma.liŋ.kat su.buʔ/',
    phoneticGuide: 'mah-LEENG-kaht SOO-boo',
    english: 'Good morning',
    category: 'greetings',
    culturalContext: 'Used when fishermen prepare their nets at sunrise or greet neighbors in stilt villages (kamung). "Malingkat" signifies beauty, grace, and blessed abundance.',
    exampleSentence: {
      sinama: 'Malingkat subu, mma\'. Maingge kita subu itu?',
      english: 'Good morning, father. Where are we heading this morning?'
    },
    syllables: ['Ma', 'ling', 'kat', 'su', 'bu'],
    glottalStops: true
  },
  {
    id: 'malingkat-kohap',
    sinama: 'Malingkat kohap',
    ipa: '/ma.liŋ.kat ko.hap/',
    phoneticGuide: 'mah-LEENG-kaht KO-hahp',
    english: 'Good afternoon',
    category: 'greetings',
    culturalContext: 'Spoken during midday to sunset as boats return with the day\'s catch or when resting under the sapaw (boat roof).',
    exampleSentence: {
      sinama: 'Malingkat kohap ma ka\'am kemon!',
      english: 'Good afternoon to all of you!'
    },
    syllables: ['Ma', 'ling', 'kat', 'ko', 'hap']
  },
  {
    id: 'malingkat-sangom',
    sinama: 'Malingkat sangom',
    ipa: '/ma.liŋ.kat sa.ŋom/',
    phoneticGuide: 'mah-LEENG-kaht SAH-ngohm',
    english: 'Good evening / Peaceful night',
    category: 'greetings',
    culturalContext: 'Sangom refers to nightfall. Sama fishers observe celestial constellations (bintang) for tides and navigation after dark.',
    exampleSentence: {
      sinama: 'Malingkat sangom. Tulog na kita.',
      english: 'Peaceful night. Let us sleep now.'
    },
    syllables: ['Ma', 'ling', 'kat', 'sa', 'ngom']
  },
  {
    id: 'magsukul',
    sinama: 'Magsukul',
    ipa: '/mag.su.kul/',
    phoneticGuide: 'mahg-SOO-kool',
    english: 'Thank you (deep gratitude)',
    category: 'greetings',
    culturalContext: 'Derived from acknowledging grace and divine bounty (shukr). Sama culture values communal reciprocity (magtabang-tabang) deeply.',
    exampleSentence: {
      sinama: 'Magsukul ma daing pinaparanu itu.',
      english: 'Thank you for this fish you shared with me.'
    },
    syllables: ['Mag', 'su', 'kul']
  },
  {
    id: 'arukop',
    sinama: 'Arukop',
    ipa: '/ʔa.ru.kop/',
    phoneticGuide: 'ah-ROO-kohp',
    english: 'Welcome / Embraced in hospitality',
    category: 'greetings',
    culturalContext: 'Rooted in opening one’s hearth and lepa houseboat to relatives and travelers traversing the Sulu sea corridors.',
    exampleSentence: {
      sinama: 'Arukop kam ma luma\' kami.',
      english: 'You are welcome into our home.'
    },
    syllables: ['A', 'ru', 'kop'],
    glottalStops: true
  },
  {
    id: 'ingge-kok',
    sinama: 'Ingge kok?',
    ipa: '/ʔiŋ.ge kok/',
    phoneticGuide: 'EENG-geh kohk',
    english: 'How are you? (How goes it?)',
    category: 'greetings',
    culturalContext: 'A very common, warm everyday conversational opener among Sama friends and village elders.',
    exampleSentence: {
      sinama: 'Ingge kok, si\'? Hāp da?',
      english: 'How are you, friend? Doing well?'
    },
    syllables: ['Ing', 'ge', 'kok'],
    glottalStops: true
  },
  {
    id: 'hap-da',
    sinama: 'Hāp da',
    ipa: '/haːp da/',
    phoneticGuide: 'HAHP dah',
    english: 'Just fine / All is good',
    category: 'greetings',
    culturalContext: '"Hāp" has an elongated vowel meaning goodness, soundness, and calm seas.',
    exampleSentence: {
      sinama: 'Hāp da aku, magsukul.',
      english: 'I am doing well, thank you.'
    },
    syllables: ['Hāp', 'da']
  },
  {
    id: 'palahi-na-aku',
    sinama: 'Palahi na aku',
    ipa: '/pa.la.hi na ʔa.kuʔ/',
    phoneticGuide: 'pah-LAH-hee nah ah-KOO',
    english: 'I am taking my leave / Farewell',
    category: 'greetings',
    culturalContext: 'Polite leave-taking phrase when paddling away or stepping off a neighbor\'s boardwalk.',
    exampleSentence: {
      sinama: 'Palahi na aku, mbo\'. Magkita kita balik.',
      english: 'I am leaving now, grandmother. We will meet again.'
    },
    syllables: ['Pa', 'la', 'hi', 'na', 'a', 'ku']
  },

  // Sea, Boats & Navigation
  {
    id: 'tahik',
    sinama: 'Tahik',
    ipa: '/ta.hik/',
    phoneticGuide: 'TAH-heek',
    english: 'The Sea / Ocean',
    category: 'sea_navigation',
    culturalContext: 'The core of Sama identity. For Sama Dilaut, the sea is not merely water, but home, burial sanctuary, pantry, and spiritual horizon.',
    exampleSentence: {
      sinama: 'Malingkat tahik ma Tawi-Tawi.',
      english: 'The sea is clear and beautiful in Tawi-Tawi.'
    },
    syllables: ['Ta', 'hik']
  },
  {
    id: 'lepa',
    sinama: 'Lepa',
    ipa: '/le.paʔ/',
    phoneticGuide: 'LEH-pah',
    english: 'Traditional carved houseboat',
    category: 'sea_navigation',
    culturalContext: 'The iconic cultural heirloom vessel of the Sama. Built without nails using wooden dowels (patuk) and adorned with intricate ukkil scroll carvings.',
    exampleSentence: {
      sinama: 'Bang nia\' Regatta, magdayandayan kemon lepa.',
      english: 'During the Regatta festival, all the houseboats are adorned in splendor.'
    },
    syllables: ['Le', 'pa'],
    glottalStops: true
  },
  {
    id: 'sangkayan',
    sinama: 'Sangkayan',
    ipa: '/saŋ.ka.jan/',
    phoneticGuide: 'sahng-KAH-yahn',
    english: 'Outrigger stabilizer (bamboo float)',
    category: 'sea_navigation',
    culturalContext: 'The dual bamboo or light-wood outriggers that keep Sama boats stable even in tempestuous ocean swells.',
    exampleSentence: {
      sinama: "Pabakkat sangkayan bang ma'as alun.",
      english: 'Fasten the outriggers tightly when the swells grow heavy.'
    },
    syllables: ['Sang', 'ka', 'yan']
  },
  {
    id: 'bohe',
    sinama: 'Bohe\'',
    ipa: '/bo.heʔ/',
    phoneticGuide: 'boh-HEHʔ',
    english: 'Fresh drinking water',
    category: 'sea_navigation',
    culturalContext: 'Critical for maritime nomads. Sama voyagers historically knew natural freshwater springs emerging under reefs or at mountain-adjacent islands.',
    exampleSentence: {
      sinama: 'Nia\' bohe\' marayaw ma lalom gusi.',
      english: 'There is sweet fresh water inside the water jar.'
    },
    syllables: ['Bo', 'he'],
    glottalStops: true
  },
  {
    id: 'hunas',
    sinama: 'Hunas',
    ipa: '/hu.nas/',
    phoneticGuide: 'HOO-nahs',
    english: 'Low tide (exposed reef)',
    category: 'sea_navigation',
    culturalContext: 'The golden hour for foraging (mag-anod or mag-kima). Families walk the shallow flats gathering shellfish, sea urchins (tihe-tihe), and edible algae.',
    exampleSentence: {
      sinama: 'Subay kita palahi bang hunas.',
      english: 'We should set out to gather when the tide is low.'
    },
    syllables: ['Hu', 'nas']
  },
  {
    id: 'taik',
    sinama: 'Ta\'ik',
    ipa: '/ta.ʔik/',
    phoneticGuide: 'TAH-ʔeek',
    english: 'High tide (flooding waters)',
    category: 'sea_navigation',
    culturalContext: 'When water levels rise high enough for loaded houseboats to float over coral barriers into the protected lagoon.',
    exampleSentence: {
      sinama: 'Ta\'ik na tahik, pabaong na kita.',
      english: 'High tide has arrived; let us float the boat inland.'
    },
    syllables: ['Ta', 'ik'],
    glottalStops: true
  },
  {
    id: 'daing',
    sinama: 'Daing',
    ipa: '/da.ʔiŋ/',
    phoneticGuide: 'DAH-eeng',
    english: 'Fish',
    category: 'sea_navigation',
    culturalContext: 'Primary sustenance and trading currency. Sama fishers recognize dozens of distinct reef and pelagic fish species by swimming sound and shadow.',
    exampleSentence: {
      sinama: 'Daa kam daing mbalat ma luma\'.',
      english: 'Bring fresh fish back home to the house.'
    },
    syllables: ['Da', 'ing']
  },
  {
    id: 'kima',
    sinama: 'Kima',
    ipa: '/ki.maʔ/',
    phoneticGuide: 'KEE-mah',
    english: 'Giant clam (Tridacna)',
    category: 'sea_navigation',
    culturalContext: 'Venerated marine delicacy. Its thick shell has historically served as food bowls, lime sources for betel nut, and ceremonial decor.',
    exampleSentence: {
      sinama: 'Malingkat kima itu ma karang.',
      english: 'This giant clam on the reef is magnificent.'
    },
    syllables: ['Ki', 'ma'],
    glottalStops: true
  },
  {
    id: 'ambalung',
    sinama: 'Ambalung',
    ipa: '/ʔam.ba.luŋ/',
    phoneticGuide: 'ahm-BAH-loong',
    english: 'Pearl oyster / Mother-of-pearl',
    category: 'sea_navigation',
    culturalContext: 'Sama freedivers are legendary for diving without breathing apparatus to harvest prized mother-of-pearl and natural South Sea pearls.',
    exampleSentence: {
      sinama: 'Padiyom sigam nganda ambalung.',
      english: 'They freedive deep into the deep blue searching for pearl oysters.'
    },
    syllables: ['Am', 'ba', 'lung']
  },
  {
    id: 'layar',
    sinama: 'Layar',
    ipa: '/la.jar/',
    phoneticGuide: 'LAH-yahr',
    english: 'Sail (of a boat)',
    category: 'sea_navigation',
    culturalContext: 'The vibrant rectangular or lateen sails of Sama lepa, often woven or stitched with bold geometric patterns visible miles offshore.',
    exampleSentence: {
      sinama: 'Pahadja\' layar, nia\' anging marayaw.',
      english: 'Raise the sail; a favorable wind has arrived.'
    },
    syllables: ['La', 'yar']
  },

  // Kinship & Elders
  {
    id: 'mma',
    sinama: 'Mma\'',
    ipa: '/mːaʔ/',
    phoneticGuide: 'm-MAHʔ (geminate m)',
    english: 'Father',
    category: 'kinship',
    culturalContext: 'Notice the double initial consonant (geminate "mm") and crisp glottal catch at the end. Fathers teach boat navigation, celestial steering, and fishing.',
    exampleSentence: {
      sinama: 'Mma\', tulungan ta ka magpabakkat lepa.',
      english: 'Father, let me help you repair the houseboat.'
    },
    syllables: ['M', 'ma'],
    glottalStops: true,
    geminates: true
  },
  {
    id: 'ina',
    sinama: 'Ina\'',
    ipa: '/ʔi.naʔ/',
    phoneticGuide: 'ee-NAHʔ',
    english: 'Mother',
    category: 'kinship',
    culturalContext: 'Mothers are the keepers of home wisdom, food preparation, mat weaving (tepo), and oral epics (kata-kata).',
    exampleSentence: {
      sinama: 'Ina\', malingkat tepo pinenan nu.',
      english: 'Mother, the pandan mat you woven is gorgeous.'
    },
    syllables: ['I', 'na'],
    glottalStops: true
  },
  {
    id: 'anak',
    sinama: 'Anak',
    ipa: '/ʔa.nak/',
    phoneticGuide: 'AH-nahk',
    english: 'Child / Son or Daughter',
    category: 'kinship',
    culturalContext: 'Children learn to swim and paddle small canoes (bangka-bangka) before they can run on land.',
    exampleSentence: {
      sinama: 'Anak-anak maglingkod ma lepa.',
      english: 'The children are sitting happily on the houseboat.'
    },
    syllables: ['A', 'nak']
  },
  {
    id: 'si',
    sinama: 'Si\'',
    ipa: '/siʔ/',
    phoneticGuide: 'SEEʔ',
    english: 'Younger sibling / Companion / Dear friend',
    category: 'kinship',
    culturalContext: 'An affectionate term of endearment used among siblings and cherished companions.',
    exampleSentence: {
      sinama: 'Panoho\' aku ma si\'ku.',
      english: 'I sent word to my dear younger companion.'
    },
    syllables: ['Si'],
    glottalStops: true
  },
  {
    id: 'mbo',
    sinama: 'Mbo\'',
    ipa: '/mboʔ/',
    phoneticGuide: 'm-BOHʔ',
    english: 'Grandparent / Revered ancestor',
    category: 'kinship',
    culturalContext: 'Ancestral veneration is paramount. The wisdom of Mbo\' guides maritime boundaries and spiritual harmony with the waters.',
    exampleSentence: {
      sinama: 'Mbo\' kami mag-ampon kemon kata-kata.',
      english: 'Our grandfather holds all the ancient tales and epics.'
    },
    syllables: ['Mbo'],
    glottalStops: true
  },

  // Daily Life, Cuisine & Craft
  {
    id: 'tepo',
    sinama: 'Tepo',
    ipa: '/te.poʔ/',
    phoneticGuide: 'TEH-poh',
    english: 'Handwoven pandan mat',
    category: 'daily_life',
    culturalContext: 'Famous traditional mats woven from spiny pandan (pandanus) leaves by Sama women of Simunul, Laminusa, and Tandubas. Rich in geometric motifs.',
    exampleSentence: {
      sinama: 'Pahadja\' tepo ma luma\' bang nia\' liyu.',
      english: 'Spread the woven pandan mat when honored guests arrive.'
    },
    syllables: ['Te', 'po'],
    glottalStops: true
  },
  {
    id: 'gabbang',
    sinama: 'Gabbang',
    ipa: '/gab.baŋ/',
    phoneticGuide: 'GAHB-bahng',
    english: 'Bamboo xylophone',
    category: 'daily_life',
    culturalContext: 'A trapezoidal wooden box resonator mounted with calibrated bamboo keys. Played with rubber-padded wooden mallets during celebrations and courting.',
    exampleSentence: {
      sinama: 'Gabbang itu marayaw pamalihan titik.',
      english: 'This gabbang xylophone produces melodic traditional rhythm.'
    },
    syllables: ['Gab', 'bang'],
    geminates: true
  },
  {
    id: 'panggi-panggi',
    sinama: 'Panggi-panggi',
    ipa: '/paŋ.gi paŋ.gi/',
    phoneticGuide: 'PAHNG-gee PAHNG-gee',
    english: 'Cassava (staple food) / Sweet cassava ring',
    category: 'daily_life',
    culturalContext: 'Cassava (panggi) steamed into conical cakes called puto or grated into golden cakes forms the dietary backbone alongside fish.',
    exampleSentence: {
      sinama: 'Mangan kita panggi-panggi maka kape.',
      english: 'Let us eat cassava delicacies with hot coffee.'
    },
    syllables: ['Pang', 'gi', 'pang', 'gi']
  },
  {
    id: 'panyam',
    sinama: 'Panyam',
    ipa: '/pa.ɲam/',
    phoneticGuide: 'PAHN-yahm',
    english: 'Traditional festive rice pancake',
    category: 'daily_life',
    culturalContext: 'Golden-fried rice cake sweetened with dark brown sugar or coconut sap, prepared during weddings and religious gatherings (maulud).',
    exampleSentence: {
      sinama: 'Magsari\' panyam ma pagti\'an.',
      english: 'Serve sweet panyam at the joyous wedding celebration.'
    },
    syllables: ['Pan', 'yam']
  },
  {
    id: 'ukkil',
    sinama: 'Ukkil',
    ipa: '/ʔuk.kil/',
    phoneticGuide: 'OOK-keel',
    english: 'Carved leaf, wave, and floral scrollwork',
    category: 'daily_life',
    culturalContext: 'The distinctive maritime carving tradition embellishing lepa prow carvings, grave markers (sunduk), and musical instruments.',
    exampleSentence: {
      sinama: 'Ukkil ma lepa itu tando\' kalasigan.',
      english: 'The carving on this boat represents joy and good fortune.'
    },
    syllables: ['Uk', 'kil'],
    geminates: true
  },

  // Numerals
  {
    id: 'isa',
    sinama: 'Isa',
    ipa: '/ʔi.sa/',
    phoneticGuide: 'EE-sah',
    english: 'One (1)',
    category: 'numbers',
    culturalContext: 'Used for counting items, boats, or hours.',
    exampleSentence: {
      sinama: 'Isa da lepa palahi ma tahik.',
      english: 'One single boat is sailing on the open water.'
    },
    syllables: ['I', 'sa']
  },
  {
    id: 'duwa',
    sinama: 'Duwa',
    ipa: '/du.wa/',
    phoneticGuide: 'DOO-wah',
    english: 'Two (2)',
    category: 'numbers',
    culturalContext: 'Dual forms also appear in "duwa-duwa" (hesitation / two minds).',
    exampleSentence: {
      sinama: 'Duwa daing binli ku ma tinda.',
      english: 'I purchased two fish at the market stall.'
    },
    syllables: ['Du', 'wa']
  },
  {
    id: 'tllu',
    sinama: 'Tllu',
    ipa: '/tːluʔ/',
    phoneticGuide: 'T-LOO',
    english: 'Three (3)',
    category: 'numbers',
    culturalContext: 'Notice the geminate initial cluster; pronounced with tongue held firm behind the teeth.',
    exampleSentence: {
      sinama: 'Tllu sangpuk tahun na umurku.',
      english: 'I am thirty years of age.'
    },
    syllables: ['T', 'llu'],
    geminates: true
  },
  {
    id: 'mpat',
    sinama: 'Mpat',
    ipa: '/m.pat/',
    phoneticGuide: 'm-PAHT',
    english: 'Four (4)',
    category: 'numbers',
    culturalContext: 'Four cardinal sea directions (subangan, seddopan, uttara, timur).',
    exampleSentence: {
      sinama: 'Mpat kami magkabilahan.',
      english: 'Four of us are paddling together.'
    },
    syllables: ['M', 'pat']
  },
  {
    id: 'lima',
    sinama: 'Lima',
    ipa: '/li.ma/',
    phoneticGuide: 'LEE-mah',
    english: 'Five (5)',
    category: 'numbers',
    culturalContext: 'Cognate with "hand" (lima) across many Austronesian languages.',
    exampleSentence: {
      sinama: 'Lima anak mag-igal ma pantan.',
      english: 'Five young ones are dancing the igal on the bridge.'
    },
    syllables: ['Li', 'ma']
  },
  {
    id: 'nnam',
    sinama: 'Nnam',
    ipa: '/nːam/',
    phoneticGuide: 'n-NAHM',
    english: 'Six (6)',
    category: 'numbers',
    culturalContext: 'Spoken with a prolonged nasal "nn".',
    exampleSentence: {
      sinama: 'Nnam gusi bohe\' ma dambua\' lepa.',
      english: 'Six jars of fresh water are placed on one boat.'
    },
    syllables: ['N', 'nam'],
    geminates: true
  },
  {
    id: 'pitu',
    sinama: 'Pitu',
    ipa: '/pi.tu/',
    phoneticGuide: 'PEE-too',
    english: 'Seven (7)',
    category: 'numbers',
    culturalContext: 'Seven bamboo keys on the classical Gabbang instrument; seven days of ceremonial gatherings.',
    exampleSentence: {
      sinama: 'Pitu bātuk gabbang itu.',
      english: 'This gabbang xylophone has seven calibrated keys.'
    },
    syllables: ['Pi', 'tu']
  },
  {
    id: 'walu',
    sinama: 'Walu',
    ipa: '/wa.lu/',
    phoneticGuide: 'WAH-loo',
    english: 'Eight (8)',
    category: 'numbers',
    culturalContext: 'Commonly counted when weaving rows of geometric diamond patterns.',
    exampleSentence: {
      sinama: 'Walu kata\'an kami ma bilik.',
      english: 'There are eight of us gathered in the room.'
    },
    syllables: ['Wa', 'lu']
  },
  {
    id: 'siyam',
    sinama: 'Siyam',
    ipa: '/si.jam/',
    phoneticGuide: 'SEE-yahm',
    english: 'Nine (9)',
    category: 'numbers',
    culturalContext: 'Close to the full ten-count.',
    exampleSentence: {
      sinama: 'Siyam na bulan na pag-anod kami.',
      english: 'We have voyaged for nine months now.'
    },
    syllables: ['Si', 'yam']
  },
  {
    id: 'sangpuk',
    sinama: 'Sangpuk',
    ipa: '/saŋ.puk/',
    phoneticGuide: 'SAHNG-pook',
    english: 'Ten (10)',
    category: 'numbers',
    culturalContext: 'Foundation of decimal counts in Sinama. 11 is "sangpuk tag-isa", 20 is "duwampuk".',
    exampleSentence: {
      sinama: 'Sangpuk kima binli sigam.',
      english: 'They purchased ten giant clams.'
    },
    syllables: ['Sang', 'puk']
  },

  // Proverbs & Wisdom
  {
    id: 'proverb-tahik-alun',
    sinama: 'Bang nia\' hunas, nia\' da ta\'ik.',
    ipa: '/baŋ ni.ʔaʔ hu.nas, ni.ʔaʔ da ta.ʔik/',
    phoneticGuide: 'Bahng NEE-ahʔ HOO-nahs, NEE-ahʔ dah TAH-ʔeek',
    english: 'If there is low tide, there will surely be high tide.',
    category: 'proverbs',
    culturalContext: 'The foundational maritime philosophy of the Sama people. Hardship and scarcity are cyclical and temporary; patience and steady seamanship will be rewarded by incoming abundance.',
    exampleSentence: {
      sinama: 'Sabar kita, bang nia\' hunas, nia\' da ta\'ik.',
      english: 'Let us be patient: where there is low tide, high tide will surely follow.'
    },
    syllables: ['Bang', 'nia', 'hu', 'nas', 'nia', 'da', 'ta', 'ik'],
    glottalStops: true
  },
  {
    id: 'proverb-angin',
    sinama: 'In tahik ma\'as, duma\'in duwa\'a bang biluk anging.',
    ipa: '/ʔin ta.hik ma.ʔas, du.ma.ʔin du.wa.ʔa baŋ bi.luk ʔa.ŋiŋ/',
    phoneticGuide: 'Een TAH-heek MAH-ahs, doo-MAH-een doo-WAH-ah bahng BEE-look AH-ngeeng',
    english: 'The ocean is vast; do not be unsettled when winds shift.',
    category: 'proverbs',
    culturalContext: 'Sama boat-masters (maglalaot) understand that currents and gusts constantly alter courses. Adaptability and calm resolve steer the family through life.',
    exampleSentence: {
      sinama: 'In tahik ma\'as, biluk anging subay tatarang.',
      english: 'The sea is wide; when winds shift, one must stay calm and alert.'
    },
    syllables: ['In', 'ta', 'hik', 'ma', 'as', 'du', 'ma', 'in', 'du', 'wa', 'a', 'bang', 'bi', 'luk', 'a', 'nging'],
    glottalStops: true
  }
];

export const CULTURAL_LESSONS: CulturalLesson[] = [
  {
    id: 'lepa-houseboat',
    title: 'The Lepa: Floating Sanctuary of the Sulu Archipelago',
    sinamaTitle: 'In Lepa maka Kalluman ma Tahik',
    summary: 'Explore the architectural masterpiece of the Sama-Bajau people—a wooden houseboat built without iron nails, adorned with ukkil wood carvings and navigated by ancestral stellar memory.',
    coverImage: '/src/assets/images/hero_lepa_houseboat_1794036626701.jpg',
    tag: 'Maritime Architecture',
    readTime: '5 min read',
    content: [
      'For centuries, the Sama Dilaut (sea-dwelling Sama) lived their entire lifetimes aboard the Lepa. From birth to passage, the wooden hull was kitchen, bedroom, cradle, and trading vessel.',
      'Unlike western boats, a traditional Lepa is assembled without iron nails. Instead, artisans utilize durable hardwood dowels (patuk) made of molave or ipil wood, which expand in seawater to lock timbers into an impenetrable, flexible bond that flexes with breaking waves.',
      'The bow and stern are adorned with "Ukkil"—delicate curvilinear carvings resembling unfurling fern fronds and ocean crests. These are not purely ornamental; they are spiritual protective talismans invoking calm passages from the spirits of the deep (mbo\' tahik).',
      'Today, the annual Regatta Lepa festival in Tawi-Tawi and Semporna brings hundreds of houseboats together, their sails fluttering like bright butterflies across crystal shallows.'
    ],
    keyVocabulary: [
      { word: 'Lepa', meaning: 'Traditional carved houseboat' },
      { word: 'Sangkayan', meaning: 'Bamboo stabilizing outriggers' },
      { word: 'Pangahuk', meaning: 'Carved prow projection' },
      { word: 'Ukkil', meaning: 'Flowing maritime scroll carving' },
      { word: 'Sapaw', meaning: 'Detachable nipa thatch boat roof' }
    ]
  },
  {
    id: 'tepo-weaving',
    title: 'Tepo Mat Weaving: Geometry of Sun, Sea & Pandan',
    sinamaTitle: 'Pag-ani maka Papan Tepo Sinama',
    summary: 'Discover how master Sama weavers transform thorny wild pandan leaves into kaleidoscope geometric sleeping mats and sacred ceremonial heirlooms.',
    coverImage: '/src/assets/images/cultural_tepo_weaving_1794036626601.jpg',
    tag: 'Textile & Living Craft',
    readTime: '4 min read',
    content: [
      'In the island municipalities of Simunul, Laminusa, and Tandubas in Tawi-Tawi, women carry on one of Southeast Asia\'s most mathematically sophisticated weaving traditions: the Tepo.',
      'Preparation takes weeks. Spiny pandan leaves are stripped of thorns, slit into uniform strands using a multi-blade bamboo comb (jjangat), sun-bleached on wooden bridges, and boiled in vibrant natural or mineral pigments—saffron yellows, crimson reds, cobalt blues, and emerald greens.',
      'Master weavers calculate intricate motifs entirely in their heads without paper diagrams. Favorite patterns include "Alun-alun" (undulating sea swells), "Bintang" (constellations), and "Sekko" (zigzagging reef corridors).',
      'A bride\'s dowry often includes a stack of layered Tepo mats. The topmost mat is for the newlyweds, while lower layers honor grandparents and guests, reflecting kinship and ancestral warmth.'
    ],
    keyVocabulary: [
      { word: 'Tepo', meaning: 'Traditional woven pandan mat' },
      { word: 'Jjangat', meaning: 'Bamboo claw tool for stripping pandan' },
      { word: 'Alun-alun', meaning: 'Sea wave geometric motif' },
      { word: 'Bintang', meaning: 'Starlight pattern' },
      { word: 'Pamalihan', meaning: 'Loom-less hand plaiting process' }
    ]
  },
  {
    id: 'gabbang-music',
    title: 'Gabbang & Igal: The Sonic Rhythm of the Tides',
    sinamaTitle: 'In Gabbang maka Igal Pagkanduli',
    summary: 'Listen to the wooden resonant tones of the Gabbang bamboo xylophone, accompanied by the gentle sway of the Igal wave-dance.',
    coverImage: '/src/assets/images/cultural_gabbang_music_1794036626564.jpg',
    tag: 'Music & Movement',
    readTime: '4 min read',
    content: [
      'The Gabbang is the heart and voice of Sama celebrations. Constructed from five to seven calibrated slabs of mature bamboo suspended over a carved resonant wooden soundbox, it produces warm, woody percussive melodies.',
      'Musicians hold two wooden beaters wrapped in cloth or natural rubber, striking rhythmic ostinatos known as "Titik". Fast syncopated rolls accompany dancers performing the "Igal"—the classical dance of the Sulu archipelago.',
      'In the Igal, dancers use articulated wrist rotations, supple finger extensions, and arched torsos to mirror the seamless motion of sea anemones, eagle rays, and drifting sea foam.',
      'Unlike staged theatrical pieces, music among the Sama is communal. Anyone resting in the stilt houses may take up the mallets or join in vocal improv (lele) honoring the family and ancestors.'
    ],
    keyVocabulary: [
      { word: 'Gabbang', meaning: 'Bamboo xylophone with soundbox' },
      { word: 'Titik', meaning: 'Percussive melodic rhythm' },
      { word: 'Igal', meaning: 'Traditional fluid sea-wave dance' },
      { word: 'Titik Tabawan', meaning: 'Celebratory festival rhythm' },
      { word: 'Palu-palu', meaning: 'Padded wooden playing mallet' }
    ]
  }
];

export const LEPA_HOTSPOTS = [
  {
    id: 'sangkayan',
    name: 'Sangkayan (Outrigger Float)',
    sinamaName: 'Sangkayan lepa',
    desc: 'Dual buoyant bamboo or lightweight wood stabilizers lashed securely with rattan cords. Keeps the lepa upright across towering monsoonal swells without capsizing.',
    x: '18%',
    y: '72%'
  },
  {
    id: 'pangahuk',
    name: 'Pangahuk (Carved Prow / Bow)',
    sinamaName: 'Pangahuk ukkil',
    desc: 'Intricately sculptured bow extending forward like an ocean bird’s beak. Features flowing floral and wave ukkil motifs designed to deflect surf.',
    x: '30%',
    y: '50%'
  },
  {
    id: 'layar',
    name: 'Layar (Lateen Sail)',
    sinamaName: 'Layar pasak',
    desc: 'Triangular or rectangular sail rigged to a sturdy bamboo mast. Stitched with contrasting bold fabric strips, enabling quick tacking against shifting trade winds.',
    x: '46%',
    y: '22%'
  },
  {
    id: 'sapaw',
    name: 'Sapaw (Roof Living Quarters)',
    sinamaName: 'Sapaw nipa',
    desc: 'Arched, demountable roof woven of nipa palm leaves. Shelters the family hearth, sleeping tepo mats, freshwater jars, and newborn infants from scorching sun and salt rain.',
    x: '68%',
    y: '48%'
  },
  {
    id: 'pang-itaan',
    name: 'Pang-ita\'an (Rudder & Steering Oar)',
    sinamaName: 'Pang-ita\'an ta\'ik',
    desc: 'Long wooden steering sweep fixed at the stern. The boat captain guides the craft by sensing changes in current resistance through their fingertips.',
    x: '86%',
    y: '64%'
  }
];

export const GABBANG_KEYS = [
  { note: 'Do', freq: 261.63, sinamaName: 'Isa (Key 1)', keyNum: '1', label: 'C4' },
  { note: 'Re', freq: 293.66, sinamaName: 'Duwa (Key 2)', keyNum: '2', label: 'D4' },
  { note: 'Mi', freq: 329.63, sinamaName: 'Tllu (Key 3)', keyNum: '3', label: 'E4' },
  { note: 'Fa', freq: 349.23, sinamaName: 'Mpat (Key 4)', keyNum: '4', label: 'F4' },
  { note: 'Sol', freq: 392.00, sinamaName: 'Lima (Key 5)', keyNum: '5', label: 'G4' },
  { note: 'La', freq: 440.00, sinamaName: 'Nnam (Key 6)', keyNum: '6', label: 'A4' },
  { note: 'Ti', freq: 493.88, sinamaName: 'Pitu (Key 7)', keyNum: '7', label: 'B4' },
];

export const TRADITIONAL_RHYTHMS = [
  {
    id: 'titik-tabawan',
    name: 'Titik Tabawan',
    desc: 'Lively celebratory rhythm played at regattas, weddings, and welcoming dignitaries.',
    sequence: [0, 2, 4, 2, 0, 4, 3, 1, 0, 2, 4, 6, 4, 2, 0],
    tempoMs: 260
  },
  {
    id: 'titik-limbayan',
    name: 'Titik Limbayan',
    desc: 'Gentle cadence mimicking rolling coastal tides, accompanying evening lullabies.',
    sequence: [0, 1, 2, 4, 3, 2, 1, 0, 2, 3, 5, 4, 2, 0],
    tempoMs: 380
  }
];
