/**
 * Comprehensive Sinama (Sama) Translation Corpus & Grammar Engine
 * Curated for Sama Translator by Nurfyied P. Abdilla
 */

export interface TranslationEntry {
  sinama: string;
  english: string[];
  tagalog?: string[];
  ipa: string;
  phoneticGuide: string;
  partOfSpeech: string;
  culturalNote?: string;
  breakdown?: { word: string; meaning: string }[];
}

export const SINAMA_DICTIONARY: TranslationEntry[] = [
  // Identity & Language
  {
    sinama: 'Sinama',
    english: ['sinama', 'sinama language', 'sama language', 'language of the sama', 'the sinama language'],
    tagalog: ['wikang sinama', 'salitang sama', 'sinama', 'sama'],
    ipa: '/si.na.maʔ/',
    phoneticGuide: 'see-NAH-mah',
    partOfSpeech: 'noun / language',
    culturalNote: 'Formed from root "Sama" + Austronesian infix "-in-", meaning "the language, tongue, or custom of the Sama people". It is spoken by over 1 million people across Tawi-Tawi, Sulu, Basilan, Zamboanga, Sabah, and Sulawesi.',
    breakdown: [
      { word: 'Sama', meaning: 'The Sama-Bajau people' },
      { word: '-in-', meaning: 'Infix signifying language / way of' }
    ]
  },
  {
    sinama: 'Bahasa Sinama',
    english: ['bahasa sinama', 'the sinama tongue', 'sama speech'],
    tagalog: ['wikang sinama', 'salitang sama'],
    ipa: '/ba.ha.sa si.na.maʔ/',
    phoneticGuide: 'bah-HAH-sah see-NAH-mah',
    partOfSpeech: 'noun phrase',
    culturalNote: '"Bahasa" (language/tongue) paired with "Sinama" formally refers to the entire dialect network including Central Sinama, Southern Sinama, Northern Sinama, and Pangutaran.',
    breakdown: [
      { word: 'Bahasa', meaning: 'Language / Speech' },
      { word: 'Sinama', meaning: 'Of the Sama people' }
    ]
  },
  {
    sinama: 'Sama Dilaut',
    english: ['sama dilaut', 'sea sama', 'sea bajau', 'badjao', 'ocean nomads'],
    tagalog: ['sama dilaut', 'badjao', 'mga sama sa dagat'],
    ipa: '/sa.ma di.la.ʔut/',
    phoneticGuide: 'SAH-mah dee-LAH-oot',
    partOfSpeech: 'proper noun',
    culturalNote: 'Literally "Sama of the Sea". The traditional sea-dwelling, boat-dwelling nomadic navigators of the Sulu Sea who master freediving and celestial navigation.',
    breakdown: [
      { word: 'Sama', meaning: 'The people' },
      { word: 'di-', meaning: 'Of / At' },
      { word: 'laut', meaning: 'Deep open ocean' }
    ]
  },
  {
    sinama: 'Mag-sinama',
    english: ['speak sinama', 'speaking sinama', 'to speak sinama'],
    tagalog: ['magsalita ng sinama', 'mag-sinama'],
    ipa: '/mag.si.na.maʔ/',
    phoneticGuide: 'mahg-see-NAH-mah',
    partOfSpeech: 'verb',
    culturalNote: 'Verbal prefix "mag-" + "Sinama": to converse or communicate using the Sama language.',
    breakdown: [
      { word: 'mag-', meaning: 'Verbal prefix (to perform an action)' },
      { word: 'Sinama', meaning: 'The Sama tongue' }
    ]
  },
  // Greetings & Courtesies
  {
    sinama: 'Malingkat subu',
    english: ['good morning', 'morning', 'beautiful morning'],
    tagalog: ['magandang umaga', 'magandang umaga po'],
    ipa: '/ma.liŋ.kat su.buʔ/',
    phoneticGuide: 'mah-LEENG-kaht SOO-boo',
    partOfSpeech: 'phrase',
    culturalNote: 'Common greeting across Sulu and Tawi-Tawi. "Malingkat" means beautiful/graceful; "subu" is sunrise/morning.',
    breakdown: [
      { word: 'Malingkat', meaning: 'Beautiful / Good / Blessed' },
      { word: 'subu', meaning: 'Morning / Sunrise' }
    ]
  },
  {
    sinama: 'Malingkat kohap',
    english: ['good afternoon', 'afternoon'],
    tagalog: ['magandang hapon', 'magandang tanghali'],
    ipa: '/ma.liŋ.kat ko.hap/',
    phoneticGuide: 'mah-LEENG-kaht KO-hahp',
    partOfSpeech: 'phrase',
    culturalNote: 'Used from midday until sunset when fishermen return from reefs.',
    breakdown: [
      { word: 'Malingkat', meaning: 'Beautiful' },
      { word: 'kohap', meaning: 'Afternoon / Late day' }
    ]
  },
  {
    sinama: 'Malingkat sangom',
    english: ['good evening', 'good night', 'peaceful night'],
    tagalog: ['magandang gabi'],
    ipa: '/ma.liŋ.kat sa.ŋom/',
    phoneticGuide: 'mah-LEENG-kaht SAH-ngohm',
    partOfSpeech: 'phrase',
    culturalNote: 'Spoken as families settle into their lepa houseboats or stilt houses.',
    breakdown: [
      { word: 'Malingkat', meaning: 'Beautiful' },
      { word: 'sangom', meaning: 'Night' }
    ]
  },
  {
    sinama: 'Magsukul',
    english: ['thank you', 'thanks', 'thank you very much'],
    tagalog: ['salamat', 'maraming salamat'],
    ipa: '/mag.su.kul/',
    phoneticGuide: 'mahg-SOO-kool',
    partOfSpeech: 'interjection',
    culturalNote: 'A deep expression of reciprocal gratitude in Sama society.',
    breakdown: [
      { word: 'mag-', meaning: 'Verbal prefix of expressing/doing' },
      { word: 'sukul', meaning: 'Gratitude / Thanksgiving' }
    ]
  },
  {
    sinama: 'Magsukul landu\'',
    english: ['thank you very much', 'many thanks', 'thank you so much'],
    tagalog: ['maraming salamat talaga', 'maraming salamat'],
    ipa: '/mag.su.kul lan.duʔ/',
    phoneticGuide: 'mahg-SOO-kool LAHN-dooʔ',
    partOfSpeech: 'phrase',
    culturalNote: '"Landu\'" functions as an intensifier meaning "very" or "exceedingly".',
    breakdown: [
      { word: 'Magsukul', meaning: 'Thank you' },
      { word: 'landu\'', meaning: 'Very / Immensely' }
    ]
  },
  {
    sinama: 'Arukop',
    english: ['welcome', 'welcome home', 'embraced'],
    tagalog: ['maligayang pagdating', 'tuloy po kayo'],
    ipa: '/ʔa.ru.kop/',
    phoneticGuide: 'ah-ROO-kohp',
    partOfSpeech: 'interjection',
    culturalNote: 'Traditional expression of coastal hospitality welcoming sea travelers.',
    breakdown: [{ word: 'Arukop', meaning: 'Embrace / Welcome' }]
  },
  {
    sinama: 'Ingge kok?',
    english: ['how are you', 'how are you doing', 'how is it going', 'how is life'],
    tagalog: ['kumusta', 'kumusta ka', 'anong balita'],
    ipa: '/ʔiŋ.ge kok/',
    phoneticGuide: 'EENG-geh kohk',
    partOfSpeech: 'phrase',
    culturalNote: 'The most ubiquitous informal and friendly conversational check-in.',
    breakdown: [
      { word: 'Ingge', meaning: 'How / Where' },
      { word: 'kok', meaning: 'State / Condition / Head' }
    ]
  },
  {
    sinama: 'Hāp da',
    english: ['fine', 'i am fine', 'just fine', 'good', 'all is well'],
    tagalog: ['mabuti naman', 'ayos lang', 'mabuti'],
    ipa: '/haːp da/',
    phoneticGuide: 'HAHP dah',
    partOfSpeech: 'phrase',
    culturalNote: '"Hāp" has an elongated vowel meaning goodness, calm and well-being.',
    breakdown: [
      { word: 'Hāp', meaning: 'Good / Well' },
      { word: 'da', meaning: 'Just / Simply (particle)' }
    ]
  },
  {
    sinama: 'Ay ngannu?',
    english: ['what is your name', 'what\'s your name', 'your name'],
    tagalog: ['anong pangalan mo', 'ano ang iyong pangalan'],
    ipa: '/ʔaj ŋan.nu/',
    phoneticGuide: 'eye NGAHN-noo',
    partOfSpeech: 'phrase',
    culturalNote: 'Question marker "Ay" + "ngan" (name) + "-nu" (second person pronoun "your").',
    breakdown: [
      { word: 'Ay', meaning: 'What' },
      { word: 'ngan', meaning: 'Name' },
      { word: '-nu', meaning: 'Your' }
    ]
  },
  {
    sinama: 'Nganku si Nurfyied',
    english: ['my name is nurfyied', 'i am nurfyied'],
    tagalog: ['ang pangalan ko ay nurfyied', 'ako si nurfyied'],
    ipa: '/ŋan.ku si nur.fjid/',
    phoneticGuide: 'NGAHN-koo see noor-fee-yehd',
    partOfSpeech: 'phrase',
    breakdown: [
      { word: 'Ngan', meaning: 'Name' },
      { word: '-ku', meaning: 'My' },
      { word: 'si', meaning: 'Personal name marker' }
    ]
  },
  {
    sinama: 'Maingge luma\'nu?',
    english: ['where is your house', 'where is your home', 'where do you live'],
    tagalog: ['saan ang bahay mo', 'taga saan ka'],
    ipa: '/ma.ʔiŋ.ge lu.maʔ.nu/',
    phoneticGuide: 'mah-EENG-geh LOO-mahʔ-noo',
    partOfSpeech: 'phrase',
    breakdown: [
      { word: 'Maingge', meaning: 'Where' },
      { word: 'luma\'', meaning: 'House / Home' },
      { word: '-nu', meaning: 'Your' }
    ]
  },
  {
    sinama: 'Aha\'ku min si Tawi-Tawi',
    english: ['i am from tawi-tawi', 'i come from tawi-tawi'],
    tagalog: ['taga tawi-tawi ako', 'galing ako sa tawi-tawi'],
    ipa: '/ʔa.haʔ.ku min si ta.wi ta.wi/',
    phoneticGuide: 'ah-HAHʔ-koo meen see TAH-wee TAH-wee',
    partOfSpeech: 'phrase',
    breakdown: [
      { word: 'Aha\'', meaning: 'Origin / Native inhabitant' },
      { word: '-ku', meaning: 'I / My' },
      { word: 'min', meaning: 'From' },
      { word: 'si', meaning: 'Place/personal marker' }
    ]
  },
  {
    sinama: 'Palahi na aku',
    english: ['i am leaving', 'goodbye', 'i will go now', 'farewell'],
    tagalog: ['aalis na ako', 'paalam na', 'lalakad na ako'],
    ipa: '/pa.la.hi na ʔa.kuʔ/',
    phoneticGuide: 'pah-LAH-hee nah ah-KOO',
    partOfSpeech: 'phrase',
    culturalNote: 'Respectful leave-taking phrase when stepping away from boats or houses.',
    breakdown: [
      { word: 'Palahi', meaning: 'To depart / Leave' },
      { word: 'na', meaning: 'Now / Already' },
      { word: 'aku', meaning: 'I / Me' }
    ]
  },
  {
    sinama: 'Pasiddal',
    english: ['excuse me', 'pardon me', 'sorry', 'forgive me'],
    tagalog: ['patawad', 'paumanhin', 'makikiraan'],
    ipa: '/pa.sid.dal/',
    phoneticGuide: 'pah-SEED-dahl',
    partOfSpeech: 'interjection',
    breakdown: [{ word: 'Pasiddal', meaning: 'Forgive / Excuse' }]
  },

  // Marine, Sea & Travel
  {
    sinama: 'Tahik',
    english: ['sea', 'ocean', 'saltwater'],
    tagalog: ['dagat', 'karagatan'],
    ipa: '/ta.hik/',
    phoneticGuide: 'TAH-heek',
    partOfSpeech: 'noun',
    culturalNote: 'The center of Sama cosmology and identity.',
    breakdown: [{ word: 'Tahik', meaning: 'Sea' }]
  },
  {
    sinama: 'Bohe\'',
    english: ['water', 'fresh water', 'drinking water'],
    tagalog: ['tubig', 'inuming tubig'],
    ipa: '/bo.heʔ/',
    phoneticGuide: 'boh-HEHʔ',
    partOfSpeech: 'noun',
    culturalNote: 'Notice the sharp glottal stop catch at the end.',
    breakdown: [{ word: 'Bohe\'', meaning: 'Water' }]
  },
  {
    sinama: 'Lepa',
    english: ['houseboat', 'boat', 'canoe', 'vessel'],
    tagalog: ['bangka', 'bahay-bangka', 'lepa'],
    ipa: '/le.paʔ/',
    phoneticGuide: 'LEH-pah',
    partOfSpeech: 'noun',
    breakdown: [{ word: 'Lepa', meaning: 'Traditional carved houseboat' }]
  },
  {
    sinama: 'Sangkayan',
    english: ['outrigger', 'float', 'stabilizer'],
    tagalog: ['katig', 'katig ng bangka'],
    ipa: '/saŋ.ka.jan/',
    phoneticGuide: 'sahng-KAH-yahn',
    partOfSpeech: 'noun',
    breakdown: [{ word: 'Sangkayan', meaning: 'Bamboo outrigger float' }]
  },
  {
    sinama: 'Hunas',
    english: ['low tide', 'ebb tide', 'shallow reef'],
    tagalog: ['kati', 'mababaw na tubig', 'hunas'],
    ipa: '/hu.nas/',
    phoneticGuide: 'HOO-nahs',
    partOfSpeech: 'noun',
    culturalNote: 'The primary foraging time when Sama families gather mollusks.',
    breakdown: [{ word: 'Hunas', meaning: 'Low tide' }]
  },
  {
    sinama: 'Ta\'ik',
    english: ['high tide', 'flood tide', 'deep water'],
    tagalog: ['taob', 'mataas na tubig'],
    ipa: '/ta.ʔik/',
    phoneticGuide: 'TAH-ʔeek',
    partOfSpeech: 'noun',
    breakdown: [{ word: 'Ta\'ik', meaning: 'High tide' }]
  },
  {
    sinama: 'Daing',
    english: ['fish', 'fishes'],
    tagalog: ['isda'],
    ipa: '/da.ʔiŋ/',
    phoneticGuide: 'DAH-eeng',
    partOfSpeech: 'noun',
    breakdown: [{ word: 'Daing', meaning: 'Fish' }]
  },
  {
    sinama: 'Pila halga\' daing itu?',
    english: ['how much is this fish', 'how much does the fish cost', 'price of fish'],
    tagalog: ['magkano itong isda', 'magkano ang isda'],
    ipa: '/pi.la hal.gaʔ da.ʔiŋ ʔi.tu/',
    phoneticGuide: 'PEE-lah hahl-GAHʔ DAH-eeng ee-TOO',
    partOfSpeech: 'phrase',
    culturalNote: 'Common in island fish markets across Bongao and Sitangkai.',
    breakdown: [
      { word: 'Pila', meaning: 'How much / How many' },
      { word: 'halga\'', meaning: 'Price / Value' },
      { word: 'daing', meaning: 'Fish' },
      { word: 'itu', meaning: 'This' }
    ]
  },
  {
    sinama: 'Mangan na kita',
    english: ['let us eat', 'let\'s eat', 'come eat', 'time to eat'],
    tagalog: ['kain na tayo', 'kumain na tayo'],
    ipa: '/ma.ŋan na ki.ta/',
    phoneticGuide: 'MAH-ngahn nah KEE-tah',
    partOfSpeech: 'phrase',
    breakdown: [
      { word: 'Mangan', meaning: 'To eat' },
      { word: 'na', meaning: 'Now' },
      { word: 'kita', meaning: 'We / Us (inclusive)' }
    ]
  },
  {
    sinama: 'Malingkat tahik ma Tawi-Tawi',
    english: ['the sea in tawi-tawi is beautiful', 'tawi-tawi has a beautiful sea'],
    tagalog: ['maganda ang dagat sa tawi-tawi'],
    ipa: '/ma.liŋ.kat ta.hik ma ta.wi ta.wi/',
    phoneticGuide: 'mah-LEENG-kaht TAH-heek mah TAH-wee TAH-wee',
    partOfSpeech: 'sentence',
    breakdown: [
      { word: 'Malingkat', meaning: 'Beautiful' },
      { word: 'tahik', meaning: 'Sea' },
      { word: 'ma', meaning: 'In / At' },
      { word: 'Tawi-Tawi', meaning: 'Tawi-Tawi island province' }
    ]
  },

  // Family & People
  {
    sinama: 'Mma\'',
    english: ['father', 'dad', 'papa'],
    tagalog: ['ama', 'tatay', 'itay'],
    ipa: '/mːaʔ/',
    phoneticGuide: 'm-MAHʔ',
    partOfSpeech: 'noun',
    culturalNote: 'Has a double initial consonant (geminate "mm") and crisp glottal catch.',
    breakdown: [{ word: 'Mma\'', meaning: 'Father' }]
  },
  {
    sinama: 'Ina\'',
    english: ['mother', 'mom', 'mama'],
    tagalog: ['ina', 'nanay', 'inay'],
    ipa: '/ʔi.naʔ/',
    phoneticGuide: 'ee-NAHʔ',
    partOfSpeech: 'noun',
    breakdown: [{ word: 'Ina\'', meaning: 'Mother' }]
  },
  {
    sinama: 'Anak',
    english: ['child', 'son', 'daughter', 'kid'],
    tagalog: ['anak', 'bata'],
    ipa: '/ʔa.nak/',
    phoneticGuide: 'AH-nahk',
    partOfSpeech: 'noun',
    breakdown: [{ word: 'Anak', meaning: 'Child' }]
  },
  {
    sinama: 'Si\'',
    english: ['friend', 'companion', 'younger sibling', 'dear'],
    tagalog: ['kaibigan', 'kapatid'],
    ipa: '/siʔ/',
    phoneticGuide: 'SEEʔ',
    partOfSpeech: 'noun',
    breakdown: [{ word: 'Si\'', meaning: 'Cherished friend / Younger sibling' }]
  },
  {
    sinama: 'Mbo\'',
    english: ['grandparent', 'grandfather', 'grandmother', 'ancestor'],
    tagalog: ['lolo', 'lola', 'ninuno'],
    ipa: '/mboʔ/',
    phoneticGuide: 'm-BOHʔ',
    partOfSpeech: 'noun',
    breakdown: [{ word: 'Mbo\'', meaning: 'Grandparent / Revered ancestor' }]
  },

  // Daily Life, Food & Common Words
  {
    sinama: 'Kape',
    english: ['coffee'],
    tagalog: ['kape'],
    ipa: '/ka.pe/',
    phoneticGuide: 'KAH-peh',
    partOfSpeech: 'noun',
    breakdown: [{ word: 'Kape', meaning: 'Coffee' }]
  },
  {
    sinama: 'Panyam',
    english: ['fried rice cake', 'sweet pancake', 'panyam'],
    tagalog: ['panyam', 'kakanin'],
    ipa: '/pa.ɲam/',
    phoneticGuide: 'PAHN-yahm',
    partOfSpeech: 'noun',
    breakdown: [{ word: 'Panyam', meaning: 'Fried sweet rice cake' }]
  },
  {
    sinama: 'Panggi-panggi',
    english: ['cassava', 'cassava cake'],
    tagalog: ['kamoteng kahoy'],
    ipa: '/paŋ.gi paŋ.gi/',
    phoneticGuide: 'PAHNG-gee PAHNG-gee',
    partOfSpeech: 'noun',
    breakdown: [{ word: 'Panggi-panggi', meaning: 'Cassava delicacy' }]
  },
  {
    sinama: 'Luma\'',
    english: ['house', 'home', 'dwelling'],
    tagalog: ['bahay', 'tahanan'],
    ipa: '/lu.maʔ/',
    phoneticGuide: 'LOO-mahʔ',
    partOfSpeech: 'noun',
    breakdown: [{ word: 'Luma\'', meaning: 'House' }]
  },
  {
    sinama: 'Karang',
    english: ['coral', 'reef', 'coral reef'],
    tagalog: ['bahura', 'korales'],
    ipa: '/ka.raŋ/',
    phoneticGuide: 'KAH-rahng',
    partOfSpeech: 'noun',
    breakdown: [{ word: 'Karang', meaning: 'Coral reef' }]
  },
  {
    sinama: 'Anging',
    english: ['wind', 'breeze'],
    tagalog: ['hangin'],
    ipa: '/ʔa.ŋiŋ/',
    phoneticGuide: 'AH-ngeeng',
    partOfSpeech: 'noun',
    breakdown: [{ word: 'Anging', meaning: 'Wind' }]
  },
  {
    sinama: 'Salanat',
    english: ['safe', 'safety', 'peace'],
    tagalog: ['ligtas', 'kapayapaan'],
    ipa: '/sa.la.nat/',
    phoneticGuide: 'sah-LAH-naht',
    partOfSpeech: 'noun',
    breakdown: [{ word: 'Salanat', meaning: 'Safety / Peace' }]
  },
  {
    sinama: 'Salanat paglayag',
    english: ['safe voyage', 'have a safe trip', 'bon voyage', 'smooth sailing'],
    tagalog: ['ingat sa biyahe', 'magandang paglalakbay'],
    ipa: '/sa.la.nat pag.la.jag/',
    phoneticGuide: 'sah-LAH-naht pahg-LAH-yahg',
    partOfSpeech: 'phrase',
    culturalNote: 'A traditional blessing spoken to travelers boarding a boat.',
    breakdown: [
      { word: 'Salanat', meaning: 'Safety' },
      { word: 'paglayag', meaning: 'Voyage / Sailing' }
    ]
  },

  // Pronouns & Grammar Particles
  {
    sinama: 'Aku',
    english: ['i', 'me'],
    tagalog: ['ako'],
    ipa: '/ʔa.kuʔ/',
    phoneticGuide: 'ah-KOO',
    partOfSpeech: 'pronoun',
    breakdown: [{ word: 'Aku', meaning: 'I' }]
  },
  {
    sinama: 'Ka\'am',
    english: ['you all', 'you plural', 'y\'all'],
    tagalog: ['kayo'],
    ipa: '/ka.ʔam/',
    phoneticGuide: 'KAH-ʔahm',
    partOfSpeech: 'pronoun',
    breakdown: [{ word: 'Ka\'am', meaning: 'You (plural)' }]
  },
  {
    sinama: 'Kita',
    english: ['we', 'us (inclusive)', 'all of us'],
    tagalog: ['tayo'],
    ipa: '/ki.ta/',
    phoneticGuide: 'KEE-tah',
    partOfSpeech: 'pronoun',
    breakdown: [{ word: 'Kita', meaning: 'We (inclusive)' }]
  },
  {
    sinama: 'Kami',
    english: ['we', 'us (exclusive)'],
    tagalog: ['kami'],
    ipa: '/ka.mi/',
    phoneticGuide: 'KAH-mee',
    partOfSpeech: 'pronoun',
    breakdown: [{ word: 'Kami', meaning: 'We (exclusive)' }]
  },
  {
    sinama: 'Sigam',
    english: ['they', 'them'],
    tagalog: ['sila'],
    ipa: '/si.gam/',
    phoneticGuide: 'SEE-gahm',
    partOfSpeech: 'pronoun',
    breakdown: [{ word: 'Sigam', meaning: 'They' }]
  },

  // Interrogatives
  {
    sinama: 'Ay',
    english: ['what'],
    tagalog: ['ano'],
    ipa: '/ʔaj/',
    phoneticGuide: 'EYE',
    partOfSpeech: 'interrogative',
    breakdown: [{ word: 'Ay', meaning: 'What' }]
  },
  {
    sinama: 'Sine',
    english: ['who'],
    tagalog: ['sino'],
    ipa: '/si.ne/',
    phoneticGuide: 'SEE-neh',
    partOfSpeech: 'interrogative',
    breakdown: [{ word: 'Sine', meaning: 'Who' }]
  },
  {
    sinama: 'Maingge',
    english: ['where'],
    tagalog: ['saan'],
    ipa: '/ma.ʔiŋ.ge/',
    phoneticGuide: 'mah-EENG-geh',
    partOfSpeech: 'interrogative',
    breakdown: [{ word: 'Maingge', meaning: 'Where' }]
  },
  {
    sinama: 'Sumiyan',
    english: ['when'],
    tagalog: ['kailan'],
    ipa: '/su.mi.jan/',
    phoneticGuide: 'soo-MEE-yahn',
    partOfSpeech: 'interrogative',
    breakdown: [{ word: 'Sumiyan', meaning: 'When' }]
  },
  {
    sinama: 'Pila',
    english: ['how much', 'how many'],
    tagalog: ['ilan', 'magkano'],
    ipa: '/pi.la/',
    phoneticGuide: 'PEE-lah',
    partOfSpeech: 'interrogative',
    breakdown: [{ word: 'Pila', meaning: 'How many / How much' }]
  },

  // Numbers (1 to 10)
  {
    sinama: 'Isa',
    english: ['one', '1'],
    tagalog: ['isa'],
    ipa: '/ʔi.sa/',
    phoneticGuide: 'EE-sah',
    partOfSpeech: 'number',
    breakdown: [{ word: 'Isa', meaning: '1' }]
  },
  {
    sinama: 'Duwa',
    english: ['two', '2'],
    tagalog: ['dalawa'],
    ipa: '/du.wa/',
    phoneticGuide: 'DOO-wah',
    partOfSpeech: 'number',
    breakdown: [{ word: 'Duwa', meaning: '2' }]
  },
  {
    sinama: 'Tllu',
    english: ['three', '3'],
    tagalog: ['tatlo'],
    ipa: '/tːluʔ/',
    phoneticGuide: 'T-LOO',
    partOfSpeech: 'number',
    breakdown: [{ word: 'Tllu', meaning: '3' }]
  },
  {
    sinama: 'Mpat',
    english: ['four', '4'],
    tagalog: ['apat'],
    ipa: '/m.pat/',
    phoneticGuide: 'm-PAHT',
    partOfSpeech: 'number',
    breakdown: [{ word: 'Mpat', meaning: '4' }]
  },
  {
    sinama: 'Lima',
    english: ['five', '5'],
    tagalog: ['lima'],
    ipa: '/li.ma/',
    phoneticGuide: 'LEE-mah',
    partOfSpeech: 'number',
    breakdown: [{ word: 'Lima', meaning: '5' }]
  },
  {
    sinama: 'Nnam',
    english: ['six', '6'],
    tagalog: ['anim'],
    ipa: '/nːam/',
    phoneticGuide: 'n-NAHM',
    partOfSpeech: 'number',
    breakdown: [{ word: 'Nnam', meaning: '6' }]
  },
  {
    sinama: 'Pitu',
    english: ['seven', '7'],
    tagalog: ['pito'],
    ipa: '/pi.tu/',
    phoneticGuide: 'PEE-too',
    partOfSpeech: 'number',
    breakdown: [{ word: 'Pitu', meaning: '7' }]
  },
  {
    sinama: 'Walu',
    english: ['eight', '8'],
    tagalog: ['walo'],
    ipa: '/wa.lu/',
    phoneticGuide: 'WAH-loo',
    partOfSpeech: 'number',
    breakdown: [{ word: 'Walu', meaning: '8' }]
  },
  {
    sinama: 'Siyam',
    english: ['nine', '9'],
    tagalog: ['siyam'],
    ipa: '/si.jam/',
    phoneticGuide: 'SEE-yahm',
    partOfSpeech: 'number',
    breakdown: [{ word: 'Siyam', meaning: '9' }]
  },
  {
    sinama: 'Sangpuk',
    english: ['ten', '10'],
    tagalog: ['sampu'],
    ipa: '/saŋ.puk/',
    phoneticGuide: 'SAHNG-pook',
    partOfSpeech: 'number',
    breakdown: [{ word: 'Sangpuk', meaning: '10' }]
  }
];

export interface TranslationResult {
  translatedText: string;
  sourceText: string;
  direction: 'en-to-sinama' | 'sinama-to-en' | 'tl-to-sinama';
  ipa: string;
  phoneticGuide: string;
  culturalNote?: string;
  breakdown: { word: string; meaning: string }[];
  matchType: 'exact' | 'phrase' | 'gloss' | 'fallback';
}

/**
 * Intelligent client-side translation engine
 */
export function translateText(
  input: string,
  direction: 'en-to-sinama' | 'sinama-to-en' | 'tl-to-sinama' = 'en-to-sinama'
): TranslationResult | null {
  const cleanInput = input.trim().toLowerCase().replace(/[.,!?;:]/g, '');
  if (!cleanInput) return null;

  // 1. Check exact match
  if (direction === 'en-to-sinama') {
    const direct = SINAMA_DICTIONARY.find((item) =>
      item.english.some((e) => e.toLowerCase() === cleanInput)
    );
    if (direct) {
      return {
        translatedText: direct.sinama,
        sourceText: input,
        direction,
        ipa: direct.ipa,
        phoneticGuide: direct.phoneticGuide,
        culturalNote: direct.culturalNote,
        breakdown: direct.breakdown || [{ word: direct.sinama, meaning: direct.english[0] }],
        matchType: 'exact'
      };
    }
  } else if (direction === 'tl-to-sinama') {
    const direct = SINAMA_DICTIONARY.find((item) =>
      item.tagalog?.some((t) => t.toLowerCase() === cleanInput)
    );
    if (direct) {
      return {
        translatedText: direct.sinama,
        sourceText: input,
        direction,
        ipa: direct.ipa,
        phoneticGuide: direct.phoneticGuide,
        culturalNote: direct.culturalNote,
        breakdown: direct.breakdown || [{ word: direct.sinama, meaning: direct.english[0] }],
        matchType: 'exact'
      };
    }
  } else {
    // Sinama to English
    const direct = SINAMA_DICTIONARY.find(
      (item) => item.sinama.toLowerCase().replace(/['ʔ]/g, '') === cleanInput.replace(/['ʔ]/g, '')
    );
    if (direct) {
      return {
        translatedText: direct.english[0],
        sourceText: input,
        direction,
        ipa: direct.ipa,
        phoneticGuide: direct.phoneticGuide,
        culturalNote: direct.culturalNote,
        breakdown: direct.breakdown || [{ word: direct.sinama, meaning: direct.english[0] }],
        matchType: 'exact'
      };
    }
  }

  // 2. Partial substring / phrase search
  if (direction === 'en-to-sinama' || direction === 'tl-to-sinama') {
    const partial = SINAMA_DICTIONARY.find((item) => {
      const targets = direction === 'en-to-sinama' ? item.english : item.tagalog || [];
      return targets.some((t) => cleanInput.includes(t.toLowerCase()) || t.toLowerCase().includes(cleanInput));
    });
    if (partial) {
      return {
        translatedText: partial.sinama,
        sourceText: input,
        direction,
        ipa: partial.ipa,
        phoneticGuide: partial.phoneticGuide,
        culturalNote: partial.culturalNote,
        breakdown: partial.breakdown || [{ word: partial.sinama, meaning: partial.english[0] }],
        matchType: 'phrase'
      };
    }
  } else {
    const partial = SINAMA_DICTIONARY.find((item) =>
      cleanInput.includes(item.sinama.toLowerCase()) || item.sinama.toLowerCase().includes(cleanInput)
    );
    if (partial) {
      return {
        translatedText: partial.english[0],
        sourceText: input,
        direction,
        ipa: partial.ipa,
        phoneticGuide: partial.phoneticGuide,
        culturalNote: partial.culturalNote,
        breakdown: partial.breakdown || [{ word: partial.sinama, meaning: partial.english[0] }],
        matchType: 'phrase'
      };
    }
  }

  // 3. Word-by-word morphemic translation
  const words = cleanInput.split(/\s+/);
  const translatedWords: string[] = [];
  const breakdownList: { word: string; meaning: string }[] = [];

  for (const w of words) {
    if (direction === 'en-to-sinama' || direction === 'tl-to-sinama') {
      const match = SINAMA_DICTIONARY.find((item) => {
        const pool = direction === 'en-to-sinama' ? item.english : item.tagalog || [];
        return pool.some((p) => p.toLowerCase() === w);
      });
      if (match) {
        translatedWords.push(match.sinama);
        breakdownList.push({ word: match.sinama, meaning: w });
      } else {
        translatedWords.push(w);
      }
    } else {
      const match = SINAMA_DICTIONARY.find(
        (item) => item.sinama.toLowerCase().replace(/['ʔ]/g, '') === w.replace(/['ʔ]/g, '')
      );
      if (match) {
        translatedWords.push(match.english[0]);
        breakdownList.push({ word: match.sinama, meaning: match.english[0] });
      } else {
        translatedWords.push(w);
      }
    }
  }

  const resultText = translatedWords.join(' ');
  return {
    translatedText: resultText,
    sourceText: input,
    direction,
    ipa: `/ ${resultText.toLowerCase()} /`,
    phoneticGuide: resultText.toUpperCase(),
    culturalNote: 'Word-by-word morpheme translation from the Sama lexicon.',
    breakdown: breakdownList.length > 0 ? breakdownList : [{ word: input, meaning: resultText }],
    matchType: 'gloss'
  };
}
