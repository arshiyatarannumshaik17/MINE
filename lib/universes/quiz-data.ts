import { QuizQuestion, UniverseId } from "@/lib/types";

export const UNIVERSES_QUIZ_DATA: Record<UniverseId, QuizQuestion[]> = {
  // =========================================================================
  // 1. PAPPA (ABBU) — 12 PURE NATURAL TELUGU QUESTIONS
  // =========================================================================
  abbu: [
    {
      id: "abbu-1",
      type: "multiple_choice",
      question: "అబ్బుని చూసినప్పుడు అర్షియాకి అత్యంత ఆనందాన్ని ఇచ్చే క్షణం ఏది?",
      teluguQuestion: "అబ్బుని చూసినప్పుడు అర్షియాకి అత్యంత ఆనందాన్ని ఇచ్చే క్షణం ఏది?",
      options: [
        { text: "అబ్బు కళ్ళలో కనిపించే గర్వం మరియు చిరునవ్వు", isCorrect: true, reaction: "అవును నాన్న. మీ కళ్ళలో కనిపించే ఆ గర్వమే నా జీవితానికి అత్యంత విలువైన ఆస్తి!" },
        { text: "సమీర్ ని గట్టిగా తిట్టినప్పుడు", isCorrect: false, reaction: "హాహా, అది సరదాగా ఉంటుంది కానీ మీ సంతోషమే నాకు ముఖ్యం!" },
        { text: "ఉదయాన్నే వేడి టీ తాగే సమయంలో", isCorrect: false, reaction: "టీ బావుంటుంది కానీ మీ ప్రశాంతతే నాకు సర్వస్వం." },
      ],
      explanation: "అబ్బు కళ్ళలో శాంతి, సంతృప్తి మరియు గర్వం చూడటమే అర్షియాకు పరమానందం.",
    },
    {
      id: "abbu-2",
      type: "multiple_choice",
      question: "రోజంతా జరిగిన విషయాలను అర్షియా ఎవరితో పంచుకోవడానికి అమితంగా ఇష్టపడుతుంది?",
      teluguQuestion: "రోజంతా జరిగిన విషయాలను అర్షియా ఎవరితో పంచుకోవడానికి అమితంగా ఇష్టపడుతుంది?",
      options: [
        { text: "తన మొదటి హీరో అయిన నాన్నతో (అబ్బు)", isCorrect: true, reaction: "ఎల్లప్పుడూ మీతోనే నాన్న! మీతో పంచుకుంటేనే నా మనసు తేలికవుతుంది." },
        { text: "సోషల్ మీడియా స్నేహితులతో", isCorrect: false, reaction: "కుటుంబమే ముఖ్యం, ముఖ్యంగా అబ్బు!" },
        { text: "డైరీలో రాసుకుంటుంది", isCorrect: false, reaction: "అబ్బుతో నేరుగా పంచుకోవడమే తనకిష్టం." },
      ],
      explanation: "తన తండ్రితో రోజూ ప్రతి చిన్న అనుభవాన్ని పంచుకోవడం అర్షియాకు ఎంతో ఇష్టం.",
    },
    {
      id: "abbu-3",
      type: "true_false",
      question: "నిజమా / అబద్ధమా: అర్షియా తన జీవిత భాగస్వామి ఎంపిక విషయంలో అబ్బు గౌరవాన్ని మరియు ఆశీర్వాదాన్ని అన్నిటికంటే మిన్నగా భావిస్తుంది?",
      teluguQuestion: "నిజమా / అబద్ధమా: అర్షియా తన వివాహ నిర్ణయంలో అబ్బు గౌరవాన్ని మరియు ఆశీర్వాదాన్ని అన్నిటికంటే మిన్నగా భావిస్తుంది?",
      options: [
        { text: "నిజం (True) — అబ్బు గౌరవం మరియు ఆశీర్వాదమే ప్రథమం", isCorrect: true, reaction: "శతశాతం నిజం! మీ తల ఎప్పుడూ దించను నాన్న, మీ ఆశీస్సులతోనే అంతా జరుగుతుంది." },
        { text: "అబద్ధం (False)", isCorrect: false, reaction: "తప్పు, తండ్రి గౌరవమే అర్షియాకు మొదటి ప్రాధాన్యత." },
      ],
      explanation: "తండ్రి గౌరవాన్ని, ఆశీర్వాదాన్ని అత్యున్నతంగా కాపాడుకోవడమే అర్షియా జీవిత సూత్రం.",
    },
    {
      id: "abbu-4",
      type: "fill_blank",
      question: "ఖాళీని పూరించండి: 'నా ప్రతి అడుగు వెనుక ఉన్న ధైర్యం... నా ______'",
      teluguQuestion: "ఖాళీని పూరించండి: 'నా ప్రతి అడుగు వెనుక ఉన్న ధైర్యం... నా ______'",
      options: [
        { text: "అబ్బు (నాన్న)", isCorrect: true, reaction: "ఖచ్చితంగా! మీరే నా ధైర్యం, నా కొండంత అండ." },
        { text: "స్నేహితులు", isCorrect: false, reaction: "స్నేహితులు ఉన్నారు కానీ అబ్బే నా పునాది." },
        { text: "అదృష్టం", isCorrect: false, reaction: "అదృష్టం కాదు, నాన్న కష్టమే నా బలం!" },
      ],
      explanation: "అర్షియా ప్రతి విజయానికి, ధైర్యానికి ఆమె తండ్రే నిలువెత్తు ఆధారం.",
    },
    {
      id: "abbu-5",
      type: "memory_challenge",
      question: "సమీర్ ఇంట్లో అల్లరి వేషాలు వేసినప్పుడు అబ్బు మరియు అర్షియా కలిసి చేసే సరదా పని ఏమిటి?",
      teluguQuestion: "సమీర్ ఇంట్లో అల్లరి వేషాలు వేసినప్పుడు అబ్బు మరియు అర్షియా కలిసి చేసే సరదా పని ఏమిటి?",
      options: [
        { text: "సమీర్ అమాయకత్వంపై సరదా జోకులు వేసుకుని నవ్వుకోవడం", isCorrect: true, reaction: "హాహా! అవును నాన్న! వాడిని ఆటపట్టిస్తూ మనం నవ్వుకునే క్షణాలు ఎంతో ప్రత్యేకం!" },
        { text: "సమీర్ కి బహుమతి ఇవ్వడం", isCorrect: false, reaction: "అల్లరికి బహుమతా? జోకులే బహుమతి!" },
        { text: "రోజంతా మౌనంగా ఉండటం", isCorrect: false, reaction: "మనం నవ్వులతో ఇల్లు నింపేస్తాం!" },
      ],
      explanation: "సమీర్ చేసే అల్లరి పనులపై తండ్రీకూతుళ్ళు కలిసి సరదాగా నవ్వుకుంటారు.",
    },
    {
      id: "abbu-6",
      type: "multiple_choice",
      question: "అర్షియా ఎప్పుడైనా మనసు బాగోలేనప్పుడు లేదా బాధలో ఉన్నప్పుడు చేసే మొదటి పవిత్రమైన పని ఏమిటి?",
      teluguQuestion: "అర్షియా ఎప్పుడైనా మనసు బాగోలేనప్పుడు చేసే మొదటి పవిత్రమైన పని ఏమిటి?",
      options: [
        { text: "నమాజ్ చదువుకుని, ప్రియమైనవారితో మాట్లాడటం", isCorrect: true, reaction: "అవును నాన్న. నమాజ్ లోనే నాకు మనశ్శాంతి లభిస్తుంది." },
        { text: "షాపింగ్ మాల్ కి వెళ్ళడం", isCorrect: false, reaction: "ప్రార్థనే అర్షియాకు నిజమైన సాంత్వన." },
        { text: "భయానక సినిమాలు చూడటం", isCorrect: false, reaction: "అర్షియాకి హారర్ సినిమాలు అసలే నచ్చవు!" },
      ],
      explanation: "నమాజ్ మరియు కుటుంబ సభ్యుల ప్రేమే అర్షియాకు సాంత్వన చేకూరుస్తాయి.",
    },
    {
      id: "abbu-7",
      type: "multiple_choice",
      question: "అర్షియాకి అత్యంత ఇష్టమైన భోజనం ఏమిటి?",
      teluguQuestion: "అర్షియాకి అత్యంత ఇష్టమైన భోజనం ఏమిటి?",
      options: [
        { text: "ఘుమఘుమలాడే బిర్యానీ మరియు నూడుల్స్", isCorrect: true, reaction: "మీకు బాగా తెలుసు నాన్న! బిర్యానీ మరియు నూడుల్స్ అంటే నాకు ప్రాణం!" },
        { text: "చేదు కాకరకాయ కూర", isCorrect: false, reaction: "అమ్మో! కాకరకాయ వద్దు బాబోయ్!" },
        { text: "ఉడకబెట్టిన పచ్చి కూరగాయలు", isCorrect: false, reaction: "రుచికరమైన బిర్యానీ మాత్రమే!" },
      ],
      explanation: "బిర్యానీ మరియు నూడుల్స్ అర్షియాకు ఎంతో ఇష్టమైన ఆహారాలు.",
    },
    {
      id: "abbu-8",
      type: "multiple_choice",
      question: "అర్షియాకి అత్యంత ఇష్టమైన రంగులు ఏవి?",
      teluguQuestion: "అర్షియాకి అత్యంత ఇష్టమైన రంగులు ఏవి?",
      options: [
        { text: "నలుపు మరియు తెలుపు (Black & White)", isCorrect: true, reaction: "కరెక్ట్ నాన్న! క్లాసిక్ బ్లాక్ అండ్ వైట్ నా ఎవర్ గ్రీన్ ఫేవరెట్!" },
        { text: "మెరిసే ఆకుపచ్చ రంగు", isCorrect: false, reaction: "బావుంటుంది కానీ నలుపు-తెలుపే ఇష్టం." },
        { text: "ముదురు నారింజ రంగు", isCorrect: false, reaction: "బ్లాక్ & వైట్ మాత్రమే!" },
      ],
      explanation: "నలుపు మరియు తెలుపు రంగులు అర్షియా వ్యక్తిగత శైలికి నిదర్శనం.",
    },
    {
      id: "abbu-9",
      type: "true_false",
      question: "నిజమా / అబద్ధమా: 'ప్రియమైనవారి కోసం ఖర్చు పెడితే సంపద తగ్గదు, మరింత పెరుగుతుంది' అనేది అర్షియా నమ్మే ముఖ్యమైన సూత్రం?",
      teluguQuestion: "నిజమా / అబద్ధమా: 'ప్రియమైనవారి కోసం ఖర్చు పెడితే సంపద తగ్గదు' అనేది అర్షియా నమ్మకం?",
      options: [
        { text: "నిజం (True) — ఇవ్వడంలోనే అసలైన ఆనందం ఉంది", isCorrect: true, reaction: "నిజం నాన్న. ఇచ్చే గుణం మీ పెంపకం నుండే నాకు వచ్చింది." },
        { text: "అబద్ధం (False)", isCorrect: false, reaction: "అర్షియా ఎల్లప్పుడూ ఇవ్వడానికే ప్రాధాన్యత ఇస్తుంది." },
      ],
      explanation: "ప్రేమతో ఇచ్చే గుణం సంపదను, ఆశీర్వాదాన్ని పెంచుతుందని ఆమె నమ్ముతుంది.",
    },
    {
      id: "abbu-10",
      type: "memory_challenge",
      question: "అర్షియా ఇంట్లో వాళ్ళని నవ్వించడానికి చేసే ఒక సహజమైన సరదా అలవాటు ఏమిటి?",
      teluguQuestion: "అర్షియా ఇంట్లో వాళ్ళని నవ్వించడానికి చేసే సరదా అలవాటు ఏమిటి?",
      options: [
        { text: "ఇతరుల హావభావాలను ఇమిటేట్ చేస్తూ అనుకరించడం", isCorrect: true, reaction: "హాహా! అవును నాన్న, అందరినీ నవ్వించడం నాకిష్టం!" },
        { text: "సైలెంట్ గా కూర్చోవడం", isCorrect: false, reaction: "అర్షియా ఉన్నచోట నవ్వులు ఉండాల్సిందే!" },
        { text: "వంటగదిలో గిన్నెలు పగలగొట్టడం", isCorrect: false, reaction: "అలాంటి పనులు చేయదు!" },
      ],
      explanation: "ఇతరులను ఇమిటేట్ చేస్తూ ఇంట్లో నవ్వులు పూయించడం అర్షియా హాబీ.",
    },
    {
      id: "abbu-11",
      type: "multiple_choice",
      question: "అర్షియా జీవితంలో దేనికంటే ఎక్కువగా దేనికి అత్యున్నత విలువనిస్తుంది?",
      teluguQuestion: "అర్షియా జీవితంలో దేనికి అత్యున్నత విలువనిస్తుంది?",
      options: [
        { text: "గౌరవం మరియు మర్యాద (Respect)", isCorrect: true, reaction: "గౌరవమే సర్వస్వం నాన్న. అగౌరవాన్ని నేను ఎప్పటికీ భరించలేను." },
        { text: "ఆడంబరాలు", isCorrect: false, reaction: "ఆడంబరాలు కాదు, ఆత్మాభిమానమే ముఖ్యం." },
        { text: "ధన వ్యామోహం", isCorrect: false, reaction: "విలువలకే మొదటి స్థానం." },
      ],
      explanation: "గౌరవం మరియు ఆత్మాభిమానానికి అర్షియా అత్యున్నత స్థానం ఇస్తుంది.",
    },
    {
      id: "abbu-12",
      type: "memory_challenge",
      question: "అబ్బు ఎప్పుడూ అర్షియాకి ధైర్యం చెబుతూ పలికే చిరస్మరణీయమైన మాట ఏది?",
      teluguQuestion: "అబ్బు ఎప్పుడూ అర్షియాకి ధైర్యం చెబుతూ పలికే మాట ఏది?",
      options: [
        { text: "'నేను ఉన్నాను కదా బేటా... భయం ఎందుకు?'", isCorrect: true, reaction: "ఆ మాట వింటే చాలు నాన్న... ఎంతటి కష్టమైనా దూదిపింజలా ఎగిరిపోతుంది!" },
        { text: "'త్వరగా వెళ్లి నిద్రపో'", isCorrect: false, reaction: "హాహా, అది కామన్ డైలాగ్!" },
        { text: "'టీవీ రిమోట్ ఎక్కడ?'", isCorrect: false, reaction: "అది నాన్న సరదా ప్రశ్న!" },
      ],
      explanation: "తండ్రి పలికే ఆ ఒక్క భరోసా అర్షియా జీవితానికి కొండంత ధైర్యం.",
    },
  ],

  // =========================================================================
  // 2. AFRID (OFFU GA) — 12 DEEPLY PERSONAL ROMANTIC & VALUE QUESTIONS
  // =========================================================================
  afrid: [
    {
      id: "afrid-1",
      type: "multiple_choice",
      question: "Which iconic long drive holds our most sacred, unforgettable memories ('IYKYK')?",
      options: [
        { text: "Sunkesla Road (IYKYK!)", isCorrect: true, reaction: "You know it, Offu ga! Sunkesla Road is our sacred sanctuary of twilight peace." },
        { text: "Highway toll plaza", isCorrect: false, reaction: "Not romantic at all!" },
        { text: "Mall basement parking", isCorrect: false, reaction: "No way, Sunkesla Road holds the magic!" },
      ],
      explanation: "Sunkesla Road twilight drives are their signature intimate memory.",
    },
    {
      id: "afrid-2",
      type: "memory_challenge",
      question: "Which sequence of special landmarks marks our beautiful seven-year journey?",
      options: [
        { text: "Rollapadu, Darga, City Forest, Belum Caves & Sunkesla Road", isCorrect: true, reaction: "Every single landmark etched deeply into our hearts forever!" },
        { text: "Airport waiting lounges only", isCorrect: false, reaction: "Our spots are far more adventurous and scenic!" },
        { text: "Exam halls and libraries", isCorrect: false, reaction: "Those gave us stress, our spots gave us peace!" },
      ],
      explanation: "Their shared trips to Rollapadu, Darga, City Forest, Belum Caves, and Sunkesla Road.",
    },
    {
      id: "afrid-3",
      type: "memory_challenge",
      question: "What is Arshiya's signature affectionate teasing nickname reserved only for Afrid?",
      options: [
        { text: "Offu ga", isCorrect: true, reaction: "Offu ga! Said with a pout and infinite affection!" },
        { text: "Professor", isCorrect: false, reaction: "Too formal!" },
        { text: "Stranger", isCorrect: false, reaction: "You are her entire universe!" },
      ],
      explanation: "Her trademark affectionate nickname 'Offu ga'.",
    },
    {
      id: "afrid-4",
      type: "true_false",
      question: "True or False: Arshiya is deeply sensitive to words, replays sentences in her mind, and sometimes creates imagined stories about loved ones and cries at night.",
      options: [
        { text: "True — Her heart is deeply tender and cares beyond measure", isCorrect: true, reaction: "You understand my soul, Afrid. I feel things so deeply, especially from those I love." },
        { text: "False — She forgets words instantly", isCorrect: false, reaction: "Incorrect, Arshiya replays words and cares with immense depth." },
      ],
      explanation: "She is emotionally perceptive, replays words, and cares deeply for her loved ones.",
    },
    {
      id: "afrid-5",
      type: "fill_blank",
      question: "Complete Arshiya's forever vow to Afrid: 'Seven years down. A lifetime together, _______.'",
      options: [
        { text: "In Sha Allah", isCorrect: true, reaction: "In Sha Allah! May Allah bless our home with barakah, peace, and endless love." },
        { text: "Maybe someday", isCorrect: false, reaction: "Never 'maybe', always In Sha Allah!" },
        { text: "Only on weekends", isCorrect: false, reaction: "Forever and always!" },
      ],
      explanation: "Her future-oriented commitment anchored in faith: In Sha Allah.",
    },
    {
      id: "afrid-6",
      type: "multiple_choice",
      question: "What is Arshiya's greatest emotional fear when it comes to the people she loves?",
      options: [
        { text: "People leaving her or people thinking badly of her", isCorrect: true, reaction: "You know my deepest vulnerability, Afrid. Losing people or being misunderstood hurts the most." },
        { text: "Missing a train", isCorrect: false, reaction: "Trains come and go, but loved ones matter most." },
        { text: "Running out of battery", isCorrect: false, reaction: "It's all about the heart, not gadgets." },
      ],
      explanation: "Her core vulnerability is the fear of abandonment and being misunderstood.",
    },
    {
      id: "afrid-7",
      type: "multiple_choice",
      question: "What sacred dream does Arshiya hold close to her heart for her future?",
      options: [
        { text: "Moving to Saudi Arabia, studying Islamic studies, and learning about supernatural creations", isCorrect: true, reaction: "Spot on! That spiritual dream is one of my greatest aspirations." },
        { text: "Opening a bowling alley in Las Vegas", isCorrect: false, reaction: "Haha, not even close!" },
        { text: "Living on a deserted cruise ship", isCorrect: false, reaction: "Her heart belongs to sacred studies." },
      ],
      explanation: "Her aspiration: moving to Saudi Arabia and pursuing Islamic and supernatural studies.",
    },
    {
      id: "afrid-8",
      type: "multiple_choice",
      question: "Which Bollywood icons' songs does Arshiya love listening to during drives?",
      options: [
        { text: "Salman Khan and Shah Rukh Khan songs", isCorrect: true, reaction: "Yes! Classic SRK and Salman tracks on loop while we drive!" },
        { text: "Heavy metal rock music", isCorrect: false, reaction: "Way too noisy for romantic drives!" },
        { text: "Opera concertos in Italian", isCorrect: false, reaction: "Bollywood nostalgia only!" },
      ],
      explanation: "Arshiya loves Salman Khan and Shah Rukh Khan songs.",
    },
    {
      id: "afrid-9",
      type: "multiple_choice",
      question: "What are Arshiya's two signature favorite colors?",
      options: [
        { text: "Black and White", isCorrect: true, reaction: "Classic, elegant, and timeless — Black and White!" },
        { text: "Neon Pink and Orange", isCorrect: false, reaction: "Too loud for her aesthetic." },
        { text: "Brown and Grey", isCorrect: false, reaction: "Black and white always!" },
      ],
      explanation: "Her favorite colors are black and white.",
    },
    {
      id: "afrid-10",
      type: "funny_habit",
      question: "What is Arshiya's hilarious habit that never fails to make Afrid laugh?",
      options: [
        { text: "Imitating people's expressions and gestures with playful accuracy", isCorrect: true, reaction: "Haha! You've seen my mimicry in action so many times!" },
        { text: "Speaking like an auctioneer", isCorrect: false, reaction: "Mimicry is her real talent!" },
        { text: "Singing opera in the car", isCorrect: false, reaction: "Imitating people is her comedic specialty." },
      ],
      explanation: "Her habit of imitating people to spread laughter.",
    },
    {
      id: "afrid-11",
      type: "true_false",
      question: "True or False: Arshiya loves watching scary horror films in the dark.",
      options: [
        { text: "False — Horror movies are not preferred and she avoids movies", isCorrect: true, reaction: "True! Horror films are strictly off limits for me!" },
        { text: "True — She is a horror film superfan", isCorrect: false, reaction: "No way, she dislikes horror completely." },
      ],
      explanation: "Arshiya does not like horror movies and generally does not watch movies.",
    },
    {
      id: "afrid-12",
      type: "core_values",
      question: "What is Arshiya's golden core value when it comes to love and giving?",
      options: [
        { text: "Respect matters more than anything, and spending on loved ones never decreases wealth", isCorrect: true, reaction: "A promise written in my heart, Afrid. Respect and selfless giving are everything." },
        { text: "Keep a strict ledger of all expenses", isCorrect: false, reaction: "Love doesn't keep accounting ledgers." },
        { text: "Only give when someone gives first", isCorrect: false, reaction: "She believes in giving before taking." },
      ],
      explanation: "Her philosophy: give before taking, respect above all, and spending on loved ones never decreases wealth.",
    },
  ],

  // =========================================================================
  // 3. SAMEER (SAMEERBASHA) — 12 SIBLING BANTER & INSIDE JOKE QUESTIONS
  // =========================================================================
  sameer: [
    {
      id: "sameer-1",
      type: "multiple_choice",
      question: "What is Sameer's legendary dialogue threat whenever Arshiya complains about him?",
      options: [
        { text: "'Kottinan anukoo tirgutav barre!' 🐮", isCorrect: true, reaction: "BINGO! Delivered with 100% dramatic sibling power!" },
        { text: "'I will write a formal apology letter'", isCorrect: false, reaction: "Apology? From Sameer? Never in this universe!" },
        { text: "'Let's peacefully discuss our feelings'", isCorrect: false, reaction: "Haha, not his style at all!" },
      ],
      explanation: "His trademark dialogue 'Kottinan anukoo tirgutav barre!'.",
    },
    {
      id: "sameer-2",
      type: "memory_challenge",
      question: "Which fridge heist incident literally caused Arshiya to burst into real tears?",
      options: [
        { text: "The cold water bottle incident from the fridge", isCorrect: true, reaction: "YES! The legendary cold water tragedy that made Arshiya tear up!" },
        { text: "Losing a game of ludo", isCorrect: false, reaction: "Ludo is nothing compared to cold water theft!" },
        { text: "Spilling tea on the rug", isCorrect: false, reaction: "The water bottle heist was top tier sibling drama!" },
      ],
      explanation: "The iconic cold water bottle battle where Arshiya cried.",
    },
    {
      id: "sameer-3",
      type: "multiple_choice",
      question: "Which of the following is NOT one of Sameer's official teasing names for Arshiya?",
      options: [
        { text: "Royal Silent Empress 👑", isCorrect: true, reaction: "Correct! Sameer only calls her Bot, Hippo, Barre, Pandhi, and Konda!" },
        { text: "Barre 🐮", isCorrect: false, reaction: "That's his favorite roast!" },
        { text: "Bot 🤖", isCorrect: false, reaction: "He calls her Bot all the time!" },
      ],
      explanation: "His nicknames for Arshiya: Bot, Hippo, Barre, Pandhi, Konda.",
    },
    {
      id: "sameer-4",
      type: "fill_blank",
      question: "Complete Sameer's legal house defense: 'Actually... 1, 2, 3! I am the _____ of this house!'",
      options: [
        { text: "HR 📋", isCorrect: true, reaction: "Guilty! Sameer thinks he runs the HR department of the home!" },
        { text: "President", isCorrect: false, reaction: "No, he specifically claims to be HR!" },
        { text: "Chef", isCorrect: false, reaction: "He doesn't cook, he just raids the fridge!" },
      ],
      explanation: "His catchphrases: 'Actually', '1 2 3', and 'HR'.",
    },
    {
      id: "sameer-5",
      type: "true_false",
      question: "True or False: When Sameer sneaks a pinch in the hallway, he immediately accepts the crime and apologizes.",
      options: [
        { text: "False — He claims 'your arm hit my fingers' or runs away shouting", isCorrect: true, reaction: "Exactly! He never admits it and calls it 'reflex testing'!" },
        { text: "True — He bows down with remorse", isCorrect: false, reaction: "Never has Sameer apologized for pinching!" },
      ],
      explanation: "Sameer never admits to pinching; he invents hilarious justifications.",
    },
    {
      id: "sameer-6",
      type: "funny_habit",
      question: "What is Arshiya's funny habit that Sameer witnesses most often at home?",
      options: [
        { text: "Imitating family members' dialogues and making everyone laugh", isCorrect: true, reaction: "You've seen me imitate everyone at the dinner table!" },
        { text: "Doing karate kicks in the kitchen", isCorrect: false, reaction: "Mimicry is her true power!" },
        { text: "Counting stars all night", isCorrect: false, reaction: "She makes everyone laugh by imitating them." },
      ],
      explanation: "Her habit of imitating people to create laughter.",
    },
    {
      id: "sameer-7",
      type: "emotional",
      question: "What is Arshiya's heartfelt prayer regarding Sameer's personality?",
      options: [
        { text: "That her future child will have Sameer's exact fun, caring, joyful vibes, inshaAllah", isCorrect: true, reaction: "InshaAllah! Beneath the roasts, I adore your spirit and heart." },
        { text: "That he moves to a silent monastery", isCorrect: false, reaction: "Life would be too boring without his noise!" },
        { text: "That he stops eating food", isCorrect: false, reaction: "He needs his food!" },
      ],
      explanation: "Her prayer: hoping her future child inherits his vibrant, fun vibes inshaAllah.",
    },
    {
      id: "sameer-8",
      type: "multiple_choice",
      question: "What are Arshiya's two ultimate comfort foods?",
      options: [
        { text: "Biryani and Noodles", isCorrect: true, reaction: "You've shared so many plates of biryani and noodles with me!" },
        { text: "Boiled spinach and bitter gourd", isCorrect: false, reaction: "Sameer knows she hates bitter gourd!" },
        { text: "Plain oats with water", isCorrect: false, reaction: "Biryani is supreme!" },
      ],
      explanation: "Biryani and noodles are Arshiya's favorite foods.",
    },
    {
      id: "sameer-9",
      type: "multiple_choice",
      question: "What brings Arshiya genuine emotional peace when she is upset?",
      options: [
        { text: "Reading namaz and talking heart-to-heart with loved ones", isCorrect: true, reaction: "Yes, Sameer. Prayer and talking with family heals my heart." },
        { text: "Pinching Sameer back 50 times", isCorrect: false, reaction: "Tempting, but namaz comes first!" },
        { text: "Running a marathon", isCorrect: false, reaction: "Prayer and heartfelt conversations bring peace." },
      ],
      explanation: "Reading namaz and talking to loved ones.",
    },
    {
      id: "sameer-10",
      type: "true_false",
      question: "True or False: Arshiya's favorite colors are Black and White.",
      options: [
        { text: "True — Black and white are her undisputed favorites", isCorrect: true, reaction: "Correct! Black and white, simple and elegant." },
        { text: "False — She prefers rainbow glitter", isCorrect: false, reaction: "Her wardrobe is dominated by black and white." },
      ],
      explanation: "Her favorite colors are black and white.",
    },
    {
      id: "sameer-11",
      type: "core_values",
      question: "What is the fastest way to make Arshiya genuinely angry?",
      options: [
        { text: "Disrespect (Gauravam lekapovadam)", isCorrect: true, reaction: "Disrespect is the one line that can never be crossed." },
        { text: "Drinking normal room temperature water", isCorrect: false, reaction: "Only empty cold bottles bother her!" },
        { text: "Losing the TV remote", isCorrect: false, reaction: "Disrespect is her non-negotiable trigger." },
      ],
      explanation: "Disrespect is her primary anger trigger.",
    },
    {
      id: "sameer-12",
      type: "memory_challenge",
      question: "What is the true secret behind Sameer's non-stop roasts and teasing?",
      options: [
        { text: "He roasts the most because he cares the deepest and protects his sister fiercely", isCorrect: true, reaction: "I know it, Sameerbasha. You would fight the whole world for me." },
        { text: "He is auditioning for Tollywood villains", isCorrect: false, reaction: "Haha, hero at heart!" },
        { text: "He has no emotions", isCorrect: false, reaction: "Beneath the roasts is pure brotherly loyalty." },
      ],
      explanation: "Beneath his jokes is deep loyalty, protection, and love.",
    },
  ],

  // =========================================================================
  // 4. JHANSI — 12 B.TECH, ADVENTURE & SISTERHOOD QUESTIONS
  // =========================================================================
  jhansi: [
    {
      id: "jhansi-1",
      type: "memory_challenge",
      question: "What was our ultimate signature activity during final year B.Tech?",
      options: [
        { text: "Exploring random parks, random places, and dump-fellow adventures with fast food", isCorrect: true, reaction: "YES! Engineering was just an excuse for our epic food quests!" },
        { text: "Sitting silently in the front row of every lecture", isCorrect: false, reaction: "We would have fallen asleep in 2 minutes!" },
        { text: "Drinking bitter green tea in the canteen", isCorrect: false, reaction: "Fast food and street food only!" },
      ],
      explanation: "Spontaneous park visits, dump-fellow adventures, and fast food runs.",
    },
    {
      id: "jhansi-2",
      type: "multiple_choice",
      question: "What is Jhansi's superpower that kept Arshiya laughing through engineering?",
      options: [
        { text: "Her dramatic facial expressions that communicate everything across a room", isCorrect: true, reaction: "One look across the classroom and we both knew the whole tea!" },
        { text: "Typing 150 words per minute", isCorrect: false, reaction: "Her facial expressions are legendary!" },
        { text: "Never talking in class", isCorrect: false, reaction: "Silence is not our thing!" },
      ],
      explanation: "Her expressive faces and bold reactions.",
    },
    {
      id: "jhansi-3",
      type: "multiple_choice",
      question: "Which fast food debate causes the most stubborn stare-down between us?",
      options: [
        { text: "Crispy Panipuri vs Spicy Noodles & Momos", isCorrect: true, reaction: "Every single time! And in the end, we order both anyway!" },
        { text: "Salad vs Soup", isCorrect: false, reaction: "We never order salad!" },
        { text: "Oatmeal vs Cereal", isCorrect: false, reaction: "Street food only!" },
      ],
      explanation: "Street food choices between panipuri, noodles, and fast food.",
    },
    {
      id: "jhansi-4",
      type: "true_false",
      question: "True or False: Arshiya loves watching late-night horror movies alone in dark rooms.",
      options: [
        { text: "False — Horror movies are strictly disliked and she avoids movies", isCorrect: true, reaction: "True! No horror movies in our friendship circle!" },
        { text: "True — She loves ghosts and jumpscares", isCorrect: false, reaction: "She completely avoids horror." },
      ],
      explanation: "Arshiya dislikes horror movies and generally avoids movies.",
    },
    {
      id: "jhansi-5",
      type: "fill_blank",
      question: "Complete the Food Queens' slogan: 'Stubborn together, _____ forever.'",
      options: [
        { text: "Fearless", isCorrect: true, reaction: "Fearless! Nothing can stop two stubborn best friends!" },
        { text: "Sleepy", isCorrect: false, reaction: "We have food to eat!" },
        { text: "Quiet", isCorrect: false, reaction: "We are anything but quiet!" },
      ],
      explanation: "Their motto: 'Stubborn together, fearless forever.'",
    },
    {
      id: "jhansi-6",
      type: "core_values",
      question: "What is Arshiya's non-negotiable core value in any relationship?",
      options: [
        { text: "Respect (Gauravam) matters more than anything", isCorrect: true, reaction: "Respect is the bedrock of our bond, Jhansi." },
        { text: "Flattery and fake compliments", isCorrect: false, reaction: "She values raw honesty and respect." },
        { text: "Gossiping 24/7", isCorrect: false, reaction: "Respect is everything." },
      ],
      explanation: "Respect is her highest non-negotiable value.",
    },
    {
      id: "jhansi-7",
      type: "emotional",
      question: "What is a misunderstood trait of Arshiya that her true friends know the truth about?",
      options: [
        { text: "People may think she doesn't think about them, but she actually cares deeply and replays conversations", isCorrect: true, reaction: "You know my heart, Jhansi. I care so deeply about the people in my life." },
        { text: "She is completely unemotional", isCorrect: false, reaction: "She feels things deeply." },
        { text: "She forgets her friends easily", isCorrect: false, reaction: "She treasures her true friends forever." },
      ],
      explanation: "Though sometimes seen as detached, she cares deeply and replays conversations.",
    },
    {
      id: "jhansi-8",
      type: "multiple_choice",
      question: "What are Arshiya's two favorite comfort meals in the world?",
      options: [
        { text: "Biryani and Noodles", isCorrect: true, reaction: "You've eaten enough noodles and biryani with me to know this by heart!" },
        { text: "Plain curd rice with no salt", isCorrect: false, reaction: "Not our style!" },
        { text: "Boiled cabbage", isCorrect: false, reaction: "Biryani and noodles forever!" },
      ],
      explanation: "Biryani and noodles.",
    },
    {
      id: "jhansi-9",
      type: "memory_challenge",
      question: "What sacred dream does Arshiya envision for her future?",
      options: [
        { text: "Moving to Saudi Arabia, studying Islamic studies, and exploring supernatural creations", isCorrect: true, reaction: "That dream is deeply rooted in my heart, Jhansi." },
        { text: "Becoming a professional pilot", isCorrect: false, reaction: "Her heart belongs to sacred studies." },
        { text: "Opening a bowling alley", isCorrect: false, reaction: "Moving to Saudi Arabia and studying." },
      ],
      explanation: "Moving to Saudi Arabia, studying Islamic studies and supernatural creations.",
    },
    {
      id: "jhansi-10",
      type: "true_false",
      question: "True or False: Arshiya believes that spending money on treats for best friends decreases her wealth.",
      options: [
        { text: "False — Spending on loved ones never decreases wealth", isCorrect: true, reaction: "True! Giving and treating friends brings barakah and joy!" },
        { text: "True — She keeps an exact coin ledger", isCorrect: false, reaction: "She believes in giving before taking." },
      ],
      explanation: "Her rule: spending on loved ones does not decrease wealth.",
    },
    {
      id: "jhansi-11",
      type: "funny_habit",
      question: "What funny habit does Arshiya often show when discussing professors or friends?",
      options: [
        { text: "Imitating their voices, expressions, and body language to make people laugh", isCorrect: true, reaction: "Haha! You've laughed at my college impressions a hundred times!" },
        { text: "Drawing caricature stick figures on the board", isCorrect: false, reaction: "Mimicry is her talent!" },
        { text: "Speaking in Morse code", isCorrect: false, reaction: "She imitates people's quirks." },
      ],
      explanation: "Her habit of imitating people to spread laughter.",
    },
    {
      id: "jhansi-12",
      type: "multiple_choice",
      question: "What are Arshiya's two signature favorite colors?",
      options: [
        { text: "Black and White", isCorrect: true, reaction: "Black and White! Classic, timeless, and chic." },
        { text: "Neon Yellow and Purple", isCorrect: false, reaction: "Too flashy!" },
        { text: "Grey and Khaki", isCorrect: false, reaction: "Black and white always." },
      ],
      explanation: "Black and white.",
    },
  ],

  // =========================================================================
  // 5. AWEZ (BANAGRAM) — 12 SIBLING LOYALTY & AFFECTION QUESTIONS
  // =========================================================================
  awez: [
    {
      id: "awez-1",
      type: "memory_challenge",
      question: "Which iconic collection of nicknames belongs uniquely to Awez in our family?",
      options: [
        { text: "Arshad bhaii, Shadaaoonn, Kaalu Kutte, Awez Mallu, and Banagram", isCorrect: true, reaction: "Every single one of them! You are our multi-titled legend!" },
        { text: "Captain America and Thor", isCorrect: false, reaction: "Banagram is way more legendary!" },
        { text: "Secret Agent 007", isCorrect: false, reaction: "Shadaaoonn wins every time!" },
      ],
      explanation: "His nicknames: Arshad bhaii, Shadaaoonn, Kaalu Kutte, Awez Mallu, and Banagram.",
    },
    {
      id: "awez-2",
      type: "memory_challenge",
      question: "What is the famous shared family joke memory we always laugh about together?",
      options: [
        { text: "The legendary aunty-joke memory that had us in stitches", isCorrect: true, reaction: "Unforgettable! We laughed until our stomachs hurt!" },
        { text: "A boring news broadcast", isCorrect: false, reaction: "Never boring around us!" },
        { text: "A math homework equation", isCorrect: false, reaction: "Pure family humor only!" },
      ],
      explanation: "The hilarious aunty-joke family memory.",
    },
    {
      id: "awez-3",
      type: "true_false",
      question: "True or False: Arshiya's love and support for Awez depends on whether they always agree on everything.",
      options: [
        { text: "False — Her love is unconditional; she stands behind him forever", isCorrect: true, reaction: "Always and forever, Banagram! Disagreements change nothing." },
        { text: "True — One disagreement cancels the sibling bond", isCorrect: false, reaction: "Never! Unconditional sisterly love." },
      ],
      explanation: "Her unconditional sisterly commitment to stand behind him.",
    },
    {
      id: "awez-4",
      type: "fill_blank",
      question: "Complete Awez's signature family shout: 'Arshad bhaii! _______!'",
      options: [
        { text: "Shadaaoonn!", isCorrect: true, reaction: "SHADAAOONN! Echoing through the whole house!" },
        { text: "Silence please!", isCorrect: false, reaction: "Awez never calls for silence!" },
        { text: "Good evening sir!", isCorrect: false, reaction: "Shadaaoonn is his battle cry!" },
      ],
      explanation: "His signature line: 'Arshad bhaii! Shadaaoonn!'.",
    },
    {
      id: "awez-5",
      type: "core_values",
      question: "What is Arshiya's financial philosophy regarding siblings and loved ones?",
      options: [
        { text: "Spending on loved ones never decreases wealth — give before taking", isCorrect: true, reaction: "True generosity is a blessing from Allah, Banagram." },
        { text: "Keep a receipt for every rupee spent on family", isCorrect: false, reaction: "Never with family!" },
        { text: "Only spend on yourself", isCorrect: false, reaction: "Giving to family brings barakah." },
      ],
      explanation: "Spending on loved ones does not decrease wealth.",
    },
    {
      id: "awez-6",
      type: "emotional",
      question: "What sensitive thing does Arshiya sometimes do at night when she overthinks?",
      options: [
        { text: "Makes up imagined stories about loved ones and cries because she cares so deeply", isCorrect: true, reaction: "You understand how sensitive my heart is, Awez." },
        { text: "Plays loud video games all night", isCorrect: false, reaction: "Her heart gets emotional over loved ones." },
        { text: "Plans world conquest", isCorrect: false, reaction: "She feels deeply for family." },
      ],
      explanation: "She is deeply sensitive and sometimes cries over imagined stories about loved ones.",
    },
    {
      id: "awez-7",
      type: "multiple_choice",
      question: "What is Arshiya's cherished life dream for her future?",
      options: [
        { text: "Moving to Saudi Arabia, studying Islamic studies, and learning about supernatural creations", isCorrect: true, reaction: "Yes, Awez. My heart is set on that sacred path." },
        { text: "Becoming a Formula 1 racecar driver", isCorrect: false, reaction: "Her dream is spiritual and academic." },
        { text: "Living in a submarine", isCorrect: false, reaction: "Moving to Saudi Arabia and studying." },
      ],
      explanation: "Moving to Saudi Arabia and studying Islamic studies.",
    },
    {
      id: "awez-8",
      type: "multiple_choice",
      question: "What are Arshiya's top comfort foods that she loves sharing at family meals?",
      options: [
        { text: "Biryani and Noodles", isCorrect: true, reaction: "Biryani and noodles, always our family favorites!" },
        { text: "Boiled bitter gourd", isCorrect: false, reaction: "No way!" },
        { text: "Plain bread crusts", isCorrect: false, reaction: "Biryani is supreme!" },
      ],
      explanation: "Biryani and noodles.",
    },
    {
      id: "awez-9",
      type: "funny_habit",
      question: "What hilarious habit does Arshiya bring out during family gatherings?",
      options: [
        { text: "Imitating people's voices and making everyone laugh", isCorrect: true, reaction: "Haha! You've laughed at my impressions so many times!" },
        { text: "Doing sudden magic card tricks", isCorrect: false, reaction: "Mimicry is her signature comedy!" },
        { text: "Speaking in whispering rhymes", isCorrect: false, reaction: "She makes people laugh with mimicry." },
      ],
      explanation: "Imitating people to make them laugh.",
    },
    {
      id: "awez-10",
      type: "true_false",
      question: "True or False: Arshiya loves watching 5 horror movies every weekend.",
      options: [
        { text: "False — Horror movies are not preferred and she avoids movies", isCorrect: true, reaction: "True! No horror movies for Arshiya Baji!" },
        { text: "True — She loves horror films", isCorrect: false, reaction: "She avoids horror completely." },
      ],
      explanation: "She does not watch horror movies.",
    },
    {
      id: "awez-11",
      type: "multiple_choice",
      question: "What is Arshiya's instant anger trigger in any situation?",
      options: [
        { text: "Disrespect (Bina izzat ki baat)", isCorrect: true, reaction: "Respect is non-negotiable in our family, Awez." },
        { text: "A cloudy morning", isCorrect: false, reaction: "Weather doesn't bother her." },
        { text: "Slow internet", isCorrect: false, reaction: "Disrespect is her true trigger." },
      ],
      explanation: "Disrespect triggers her anger.",
    },
    {
      id: "awez-12",
      type: "memory_challenge",
      question: "What is Arshiya's lifetime promise to Awez as his elder sister?",
      options: [
        { text: "To always stand right behind him, supporting his dreams and cheering for his success", isCorrect: true, reaction: "Always and forever, Banagram. I will always have your back." },
        { text: "To make him do all the house chores", isCorrect: false, reaction: "Haha, only occasionally!" },
        { text: "To ignore his calls", isCorrect: false, reaction: "Always here for my younger brother." },
      ],
      explanation: "Her lifetime promise to stand behind him through every season.",
    },
  ],

  // =========================================================================
  // 6. MANOHAR (BARRESHIYA) — 12 COMEDY, CURRY & REAL LOYALTY QUESTIONS
  // =========================================================================
  manohar: [
    {
      id: "manohar-1",
      type: "multiple_choice",
      question: "What is Manohar's instant hilarious response whenever Arshiya calls his phone?",
      options: [
        { text: "'Nduk phn chesnave phn pettey office lo unna!' 📞", isCorrect: true, reaction: "EVERY SINGLE TIME! The dramatic office rush is legendary!" },
        { text: "'Good afternoon, how may I assist your call?'", isCorrect: false, reaction: "Never in a million years would Manohar say this!" },
        { text: "Total silence for 5 minutes", isCorrect: false, reaction: "Silence is scientifically impossible for Manohar!" },
      ],
      explanation: "His trademark dialogue: 'Nduk phn chesnave phn pettey office lo unna!'.",
    },
    {
      id: "manohar-2",
      type: "memory_challenge",
      question: "What outrageous thing did Manohar do to Arshiya's homemade chicken curry?",
      options: [
        { text: "Put his whole hand directly into the curry bowl without waiting for a spoon", isCorrect: true, reaction: "YES! Zero patience, zero spoons, pure direct curry attack!" },
        { text: "Refused to eat it because it was too spicy", isCorrect: false, reaction: "He devoured it in seconds!" },
        { text: "Poured it into a blender", isCorrect: false, reaction: "He ate it with his bare hands straight from the bowl!" },
      ],
      explanation: "The legendary story of him plunging his hand into Arshiya's chicken curry.",
    },
    {
      id: "manohar-3",
      type: "multiple_choice",
      question: "Which trio of hilarious nicknames and roasts connects Arshiya and Manohar?",
      options: [
        { text: "Barreshiya, AMBAAA (cow joke), and Bot", isCorrect: true, reaction: "The holy trinity of our comedic friendship!" },
        { text: "Sir and Madam", isCorrect: false, reaction: "Way too formal!" },
        { text: "Colleague A and Colleague B", isCorrect: false, reaction: "Pure comedy duo!" },
      ],
      explanation: "Barreshiya, AMBAAA, cow jokes, and Bot.",
    },
    {
      id: "manohar-4",
      type: "fill_blank",
      question: "Complete Manohar's iconic megaphone yell: '_______!! Barreshiya has arrived!'",
      options: [
        { text: "AMBAAA!", isCorrect: true, reaction: "AMBAAAAA! Echoing across the entire cosmos!" },
        { text: "Hello world!", isCorrect: false, reaction: "Not dramatic enough!" },
        { text: "Silence in court!", isCorrect: false, reaction: "Only AMBAAA will do!" },
      ],
      explanation: "His trademark comedic yell: 'AMBAAA!'.",
    },
    {
      id: "manohar-5",
      type: "true_false",
      question: "True or False: Manohar rehearses his comedy timing in front of a mirror with a script for 5 hours a day.",
      options: [
        { text: "False — 100% natural, spontaneous madness that no script could ever invent", isCorrect: true, reaction: "True! Pure spontaneous comedic genius!" },
        { text: "True — He uses a comedy textbook", isCorrect: false, reaction: "No textbook could teach his timing!" },
      ],
      explanation: "His comedy is 100% spontaneous and natural.",
    },
    {
      id: "manohar-6",
      type: "funny_habit",
      question: "What is Arshiya's funny habit that rivals Manohar's humor?",
      options: [
        { text: "Imitating people's exact mannerisms and speech to make everyone burst into laughter", isCorrect: true, reaction: "You know I can imitate people just as crazily as you!" },
        { text: "Juggling 5 oranges", isCorrect: false, reaction: "Mimicry is her specialty!" },
        { text: "Speaking in rhymes only", isCorrect: false, reaction: "Imitations and roasts!" },
      ],
      explanation: "Her habit of imitating people to spread laughter.",
    },
    {
      id: "manohar-7",
      type: "multiple_choice",
      question: "What is Arshiya's absolute favorite food in the universe?",
      options: [
        { text: "Biryani and Noodles", isCorrect: true, reaction: "Biryani and noodles! As long as you don't put your hand in it!" },
        { text: "Plain boiled cabbage", isCorrect: false, reaction: "Never!" },
        { text: "Bitter gourd juice", isCorrect: false, reaction: "Biryani reigns supreme!" },
      ],
      explanation: "Biryani and noodles.",
    },
    {
      id: "manohar-8",
      type: "emotional",
      question: "What is the sensitive reality beneath Arshiya's cheerful personality?",
      options: [
        { text: "She is deeply sensitive to words, replays sentences in her mind, and cares immensely for loyal friends", isCorrect: true, reaction: "Spot on, Manohar. Behind the banter, I value loyal friends deeply." },
        { text: "She never cares about what anyone says", isCorrect: false, reaction: "She is deeply sensitive." },
        { text: "She is a robot with no feelings", isCorrect: false, reaction: "She has a tender heart." },
      ],
      explanation: "She is deeply sensitive to words and deeply loyal to genuine friends.",
    },
    {
      id: "manohar-9",
      type: "core_values",
      question: "What is the one thing that will instantly ruin Arshiya's mood and trigger her anger?",
      options: [
        { text: "Disrespect (Maryada lekapovadam)", isCorrect: true, reaction: "Disrespect is the ultimate dealbreaker." },
        { text: "A bad joke", isCorrect: false, reaction: "She laughs at bad jokes too!" },
        { text: "Rainy weather", isCorrect: false, reaction: "Disrespect is her true trigger." },
      ],
      explanation: "Disrespect triggers her anger.",
    },
    {
      id: "manohar-10",
      type: "true_false",
      question: "True or False: Arshiya's sacred dream is to move to Saudi Arabia and study Islamic studies.",
      options: [
        { text: "True — Moving to Saudi Arabia, studying Islamic studies and supernatural creations", isCorrect: true, reaction: "Yes, that spiritual journey is my true dream, Manohar." },
        { text: "False — She wants to become a wrestler", isCorrect: false, reaction: "That sacred dream is her true aspiration." },
      ],
      explanation: "Moving to Saudi Arabia and studying Islamic studies.",
    },
    {
      id: "manohar-11",
      type: "multiple_choice",
      question: "What are Arshiya's two signature favorite colors?",
      options: [
        { text: "Black and White", isCorrect: true, reaction: "Black and White! Classic and timeless." },
        { text: "Hot Pink and Neon Green", isCorrect: false, reaction: "Too loud!" },
        { text: "Mud Brown and Beige", isCorrect: false, reaction: "Black and white always." },
      ],
      explanation: "Black and white.",
    },
    {
      id: "manohar-12",
      type: "memory_challenge",
      question: "What is the secret truth of Manohar's friendship with Arshiya?",
      options: [
        { text: "He roasts the most because he cares the deepest and is fiercely loyal", isCorrect: true, reaction: "Under all the AMBAAA yells is a rock-solid friend for life." },
        { text: "He is only looking for free chicken curry", isCorrect: false, reaction: "Curry is a bonus, but friendship is real!" },
        { text: "He is practicing for a stand-up audition", isCorrect: false, reaction: "Pure genuine friendship." },
      ],
      explanation: "His comedy is his language of loyalty and caring.",
    },
  ],

  // =========================================================================
  // 7. MUBEENA (PUDEENA) — 12 DANCE, VADINA & SISTERHOOD QUESTIONS
  // =========================================================================
  mubeena: [
    {
      id: "mubeena-1",
      type: "memory_challenge",
      question: "What unbelievable mechanical sound can Mubeena Didi effortlessly dance to?",
      options: [
        { text: "The humming vibration of a water pump motor! 🌊", isCorrect: true, reaction: "YES! If it vibrates, you have a choreography ready for it!" },
        { text: "Only classical symphony orchestras", isCorrect: false, reaction: "Motor beats beat classical symphony any day!" },
        { text: "Complete pin-drop silence", isCorrect: false, reaction: "Even in silence you invent a rhythm!" },
      ],
      explanation: "Her incredible ability to dance to anything, even a water pump motor.",
    },
    {
      id: "mubeena-2",
      type: "nickname",
      question: "Which set of affectionate names connects Arshiya and Mubeena in the family?",
      options: [
        { text: "Vadina, Pudeena, and Mubeena Didi", isCorrect: true, reaction: "Pure sisterhood and love in every single name!" },
        { text: "Teacher and Student", isCorrect: false, reaction: "We are soul sisters!" },
        { text: "Boss and Assistant", isCorrect: false, reaction: "Partners in dance and crime!" },
      ],
      explanation: "Vadina, Pudeena, and Mubeena Didi.",
    },
    {
      id: "mubeena-3",
      type: "multiple_choice",
      question: "Which Bollywood superstars' songs do Arshiya and Mubeena love dancing to?",
      options: [
        { text: "Salman Khan and Shah Rukh Khan songs", isCorrect: true, reaction: "Salman and SRK hits are our ultimate dance jams!" },
        { text: "Heavy metal death metal", isCorrect: false, reaction: "Bollywood beats only!" },
        { text: "Opera ballads", isCorrect: false, reaction: "Bollywood high energy!" },
      ],
      explanation: "Salman Khan and Shah Rukh Khan songs.",
    },
    {
      id: "mubeena-4",
      type: "fill_blank",
      question: "Complete our dance reel motto: 'Give us any beat, and we will turn the room into a _______!'",
      options: [
        { text: "Dance Floor 💃", isCorrect: true, reaction: "Every room is a dance floor when we are together!" },
        { text: "Library", isCorrect: false, reaction: "We are way too energetic for a library!" },
        { text: "Boardroom", isCorrect: false, reaction: "Pure dance celebration!" },
      ],
      explanation: "Turning any room into a dance floor.",
    },
    {
      id: "mubeena-5",
      type: "true_false",
      question: "True or False: When music starts playing near Arshiya and Mubeena, they sit quietly and read textbooks.",
      options: [
        { text: "False — Instant impromptu dance performance and reel recording session!", isCorrect: true, reaction: "True! No beat is safe from us!" },
        { text: "True — They sit with folded hands", isCorrect: false, reaction: "We start grooving immediately!" },
      ],
      explanation: "Their shared passion for dance and celebratory energy.",
    },
    {
      id: "mubeena-6",
      type: "funny_habit",
      question: "What is Arshiya's funny habit that makes Mubeena Didi laugh during kitchen chats?",
      options: [
        { text: "Imitating Sameer and other family members' dramatic excuses", isCorrect: true, reaction: "Haha! You know my Sameer imitations are 100% accurate!" },
        { text: "Speaking backwards in French", isCorrect: false, reaction: "Mimicry of family members!" },
        { text: "Juggling spoons", isCorrect: false, reaction: "Making everyone laugh with mimicry." },
      ],
      explanation: "Imitating family members.",
    },
    {
      id: "mubeena-7",
      type: "emotional",
      question: "When Arshiya is feeling emotionally overwhelmed or low, what helps her recover her peace?",
      options: [
        { text: "Reading namaz and heart-to-heart conversations with loved ones", isCorrect: true, reaction: "Yes, Didi. Prayer and heartfelt talks bring peace back to my soul." },
        { text: "Cleaning the garage alone", isCorrect: false, reaction: "Prayer and talking with loved ones." },
        { text: "Watching horror films", isCorrect: false, reaction: "She avoids horror films completely." },
      ],
      explanation: "Reading namaz and talking to loved ones.",
    },
    {
      id: "mubeena-8",
      type: "multiple_choice",
      question: "What is Arshiya's favorite celebration food of all time?",
      options: [
        { text: "Biryani and Noodles", isCorrect: true, reaction: "You've shared so many plates of biryani with me at home!" },
        { text: "Raw celery salad", isCorrect: false, reaction: "Not our celebration style!" },
        { text: "Plain porridge", isCorrect: false, reaction: "Biryani and noodles always!" },
      ],
      explanation: "Biryani and noodles.",
    },
    {
      id: "mubeena-9",
      type: "personality",
      question: "What sacred future dream does Arshiya hold close to her heart?",
      options: [
        { text: "Moving to Saudi Arabia, studying Islamic studies, and supernatural creations", isCorrect: true, reaction: "Yes, Mubeena Didi. That spiritual aspiration is very dear to me." },
        { text: "Opening a bowling alley in Europe", isCorrect: false, reaction: "Her dream is spiritual and academic." },
        { text: "Living in a treehouse", isCorrect: false, reaction: "Moving to Saudi Arabia and studying." },
      ],
      explanation: "Moving to Saudi Arabia, studying Islamic studies and supernatural creations.",
    },
    {
      id: "mubeena-10",
      type: "true_false",
      question: "True or False: Arshiya loves watching scary horror movies late at night.",
      options: [
        { text: "False — Horror movies are not preferred and she avoids movies", isCorrect: true, reaction: "True! Horror is strictly canceled in our house!" },
        { text: "True — She loves horror jumpscares", isCorrect: false, reaction: "She dislikes horror completely." },
      ],
      explanation: "She does not like horror movies.",
    },
    {
      id: "mubeena-11",
      type: "core_values",
      question: "What is Arshiya's core value regarding love and spending on family?",
      options: [
        { text: "Spending on loved ones does not decrease wealth — give before taking", isCorrect: true, reaction: "A core value I learned from family: love grows when shared." },
        { text: "Count every rupee and never share treats", isCorrect: false, reaction: "Never in our sisterhood!" },
        { text: "Only give when forced", isCorrect: false, reaction: "Generosity and respect are her pillars." },
      ],
      explanation: "Spending on loved ones does not decrease wealth.",
    },
    {
      id: "mubeena-12",
      type: "memory_challenge",
      question: "Why is Mubeena Didi so deeply cherished in Arshiya's life?",
      options: [
        { text: "Because she is not just a Vadina, but a true soul sister, dance partner, and safe haven", isCorrect: true, reaction: "Truly, you brought endless sunshine, laughter, and sisterhood into our home." },
        { text: "Because she brings mint chutney only", isCorrect: false, reaction: "Pudeena jokes aside, your heart is pure gold!" },
        { text: "Because she lends her shoes", isCorrect: false, reaction: "Sisterhood is forever." },
      ],
      explanation: "Her warmth, humor, and true sisterly bond.",
    },
  ],

  // =========================================================================
  // 8. QURAYBA (AGE 5–6) — 12 CHILD-FRIENDLY & SWEET DOODLE QUESTIONS
  // (CRITICAL: ZERO mention of Saudi Arabia, Islamic studies, or supernatural creations)
  // =========================================================================
  qurayba: [
    {
      id: "qurayba-1",
      type: "multiple_choice",
      question: "What is Qurayba's favorite creative activity whenever she sits with Arshiya?",
      options: [
        { text: "Drawing colorful doodles and designs on Arshiya's hands with pens! ✍️", isCorrect: true, reaction: "Yes! Arshiya's hands are Qurayba's official coloring canvas!" },
        { text: "Writing official office reports", isCorrect: false, reaction: "She is 5-6 years old, coloring is way more fun!" },
        { text: "Reading a giant dictionary", isCorrect: false, reaction: "Doodles, stars, and giggles only!" },
      ],
      explanation: "Drawing on Arshiya's hands with pens.",
    },
    {
      id: "qurayba-2",
      type: "memory_challenge",
      question: "What happens the moment Arshiya visits and walks through the door?",
      options: [
        { text: "Qurayba runs across the room to give her a giant, loving bear hug! 🫂", isCorrect: true, reaction: "The best feeling in the entire world! You run straight into my arms!" },
        { text: "She hides behind a door forever", isCorrect: false, reaction: "She runs straight for hugs!" },
        { text: "She ignores her completely", isCorrect: false, reaction: "Instant excitement and giggles!" },
      ],
      explanation: "Her joyful running hugs when Arshiya visits.",
    },
    {
      id: "qurayba-3",
      type: "nickname",
      question: "Which adorable nicknames does Arshiya call Qurayba with infinite love?",
      options: [
        { text: "Chulbuli, Pilla Pichuka, Ashi Shaitaan, and My First Little Jaan 👑", isCorrect: true, reaction: "Every single one of them was made with infinite love for you!" },
        { text: "Grandmother", isCorrect: false, reaction: "You are our cute little princess!" },
        { text: "Stranger", isCorrect: false, reaction: "You are our first Jaan!" },
      ],
      explanation: "Chulbuli, Pilla Pichuka, Ashi Shaitaan, and First Little Jaan.",
    },
    {
      id: "qurayba-4",
      type: "fill_blank",
      question: "Complete the phrase: 'Qurayba is Arshiya Khala's #1 Little _______!'",
      options: [
        { text: "Princess (Jaan) 👑", isCorrect: true, reaction: "Always and forever, my number one little princess!" },
        { text: "Robot", isCorrect: false, reaction: "You are a real princess!" },
        { text: "Neighbor", isCorrect: false, reaction: "You are precious family!" },
      ],
      explanation: "Arshiya's first little princess and Jaan.",
    },
    {
      id: "qurayba-5",
      type: "true_false",
      question: "True or False: When Little Queen Qurayba asks for sweets, Khala says no and gives her bitter medicine.",
      options: [
        { text: "False — Khala melts and gives her delicious chocolates and treats!", isCorrect: true, reaction: "True! Khala can never say no to your cute little face!" },
        { text: "True — Khala is super strict with chocolates", isCorrect: false, reaction: "You get all the chocolates and sweets!" },
      ],
      explanation: "Khala spoils Qurayba with treats.",
    },
    {
      id: "qurayba-6",
      type: "multiple_choice",
      question: "What do Arshiya and Qurayba love watching together on the phone?",
      options: [
        { text: "Funny cartoons, colorful rhymes, and silly videos 📱", isCorrect: true, reaction: "Yes! Curled up together watching our favorite videos!" },
        { text: "News about the stock market", isCorrect: false, reaction: "Cartoons are way more fun!" },
        { text: "Math lectures", isCorrect: false, reaction: "Only fun videos for us!" },
      ],
      explanation: "Watching cartoons and rhymes together on the phone.",
    },
    {
      id: "qurayba-7",
      type: "multiple_choice",
      question: "What are Arshiya Khala's two favorite colors in the whole world?",
      options: [
        { text: "Black and White", isCorrect: true, reaction: "Correct! Black and White, just like a cute panda!" },
        { text: "Brown and Grey", isCorrect: false, reaction: "Black and white are her favorites!" },
        { text: "Neon Orange", isCorrect: false, reaction: "Black and white always!" },
      ],
      explanation: "Black and white.",
    },
    {
      id: "qurayba-8",
      type: "funny_habit",
      question: "What funny thing does Arshiya Khala do to make Qurayba giggle?",
      options: [
        { text: "Makes funny faces, funny voices, and imitates silly sounds", isCorrect: true, reaction: "Haha! Watching you giggle makes Khala the happiest!" },
        { text: "Stands completely frozen like a statue", isCorrect: false, reaction: "She makes funny faces to make you laugh!" },
        { text: "Speaks like a robot", isCorrect: false, reaction: "Silly voices and giggles!" },
      ],
      explanation: "Making funny voices and faces to create laughter.",
    },
    {
      id: "qurayba-9",
      type: "multiple_choice",
      question: "What yummy celebration food does Khala love the most?",
      options: [
        { text: "Delicious Biryani and Noodles 🍛🍜", isCorrect: true, reaction: "Yum! Biryani and noodles are Khala's absolute favorites!" },
        { text: "Bitter vegetables", isCorrect: false, reaction: "Yuck! No bitter vegetables!" },
        { text: "Plain dry toast", isCorrect: false, reaction: "Biryani and noodles only!" },
      ],
      explanation: "Biryani and noodles.",
    },
    {
      id: "qurayba-10",
      type: "true_false",
      question: "True or False: Qurayba is allowed to color all over Khala's hands with markers.",
      options: [
        { text: "True — Khala's hands are Qurayba's official drawing book!", isCorrect: true, reaction: "Draw as many stars, flowers, and hearts as you want, my Jaan!" },
        { text: "False — Khala never lets her draw", isCorrect: false, reaction: "Khala loves your drawings on her hands!" },
      ],
      explanation: "Drawing doodles on Khala's hands.",
    },
    {
      id: "qurayba-11",
      type: "memory_challenge",
      question: "What sacred title does Qurayba hold forever in Arshiya's heart?",
      options: [
        { text: "My Very First Little Jaan who made me a Khala 💖", isCorrect: true, reaction: "Always you, Qurayba. You hold that special first place in my heart." },
        { text: "A cartoon friend", isCorrect: false, reaction: "You are real family!" },
        { text: "A classmate", isCorrect: false, reaction: "You are my first little Jaan!" },
      ],
      explanation: "Her first niece who made her an aunt.",
    },
    {
      id: "qurayba-12",
      type: "emotional",
      question: "How much does Arshiya Khala love Qurayba?",
      options: [
        { text: "More than all the stars in the night sky! ✨", isCorrect: true, reaction: "To the stars, to the moon, and back forever! Khala loves you endlessly!" },
        { text: "Only a tiny bit", isCorrect: false, reaction: "Khala loves you infinitely!" },
        { text: "Just for one day", isCorrect: false, reaction: "Forever and ever without end!" },
      ],
      explanation: "Infinite love for her first little princess.",
    },
  ],

  // =========================================================================
  // 9. WAFEEQA (BABY ANGEL) — 12 CHILD-FRIENDLY & ANGELIC QUESTIONS
  // (CRITICAL: ZERO mention of Saudi Arabia, Islamic studies, or supernatural creations)
  // =========================================================================
  wafeeqa: [
    {
      id: "wafeeqa-1",
      type: "multiple_choice",
      question: "What is Wafeeqa's special title in Arshiya Khala's heart?",
      options: [
        { text: "My Another Little Jaan (Sweet Baby Angel) 👼", isCorrect: true, reaction: "Always and forever, our sweet little angel!" },
        { text: "A neighbor", isCorrect: false, reaction: "You are our precious family!" },
        { text: "A stranger", isCorrect: false, reaction: "You are another little Jaan!" },
      ],
      explanation: "Her title as 'Another Little Jaan'.",
    },
    {
      id: "wafeeqa-2",
      type: "memory_challenge",
      question: "What is completely irresistible about baby Wafeeqa?",
      options: [
        { text: "Her round chubby cheeks, sweet innocent giggles, and cuddly hugs", isCorrect: true, reaction: "Those cheeks and giggles could melt any heart instantly!" },
        { text: "Her ability to do taxes", isCorrect: false, reaction: "Haha, she is an innocent child!" },
        { text: "Her typing speed on a keyboard", isCorrect: false, reaction: "Cuddles only!" },
      ],
      explanation: "Her chubby cheeks and sweet giggles.",
    },
    {
      id: "wafeeqa-3",
      type: "nickname",
      question: "What sweet name does Khala use to describe Wafeeqa's gentle presence?",
      options: [
        { text: "Sweet Baby Angel 🌸", isCorrect: true, reaction: "You brought so much gentle light and peace into our home!" },
        { text: "Troublemaker", isCorrect: false, reaction: "Too pure and sweet for trouble!" },
        { text: "Strict Boss", isCorrect: false, reaction: "Our sweet baby angel!" },
      ],
      explanation: "Sweet Baby Angel.",
    },
    {
      id: "wafeeqa-4",
      type: "fill_blank",
      question: "Complete the cuddle phrase: 'Wafeeqa's hugs are like warm rays of _______!'",
      options: [
        { text: "Sunshine ☀️", isCorrect: true, reaction: "Warm, gentle, and comforting like morning sunshine!" },
        { text: "Rain", isCorrect: false, reaction: "Pure bright sunshine!" },
        { text: "Snow", isCorrect: false, reaction: "Warm sunshine always!" },
      ],
      explanation: "Her hugs are like sunshine.",
    },
    {
      id: "wafeeqa-5",
      type: "true_false",
      question: "True or False: Wafeeqa has soft round chubby cheeks that Khala loves squishing with kisses.",
      options: [
        { text: "True — Completely irresistible chubby cheeks!", isCorrect: true, reaction: "Yes! Those cheeks are made for endless squishy cuddles!" },
        { text: "False — She doesn't have cheeks", isCorrect: false, reaction: "Her chubby cheeks are the sweetest!" },
      ],
      explanation: "Her adorable chubby cheeks.",
    },
    {
      id: "wafeeqa-6",
      type: "multiple_choice",
      question: "What does Arshiya Khala love doing when playing with Wafeeqa?",
      options: [
        { text: "Making her giggle with gentle peek-a-boo and warm cuddles", isCorrect: true, reaction: "Watching your sweet baby smile is my favorite moment!" },
        { text: "Teaching her calculus equations", isCorrect: false, reaction: "Let the baby play and cuddle!" },
        { text: "Taking away her toys", isCorrect: false, reaction: "Khala gives all the soft toys!" },
      ],
      explanation: "Gentle games and cuddles.",
    },
    {
      id: "wafeeqa-7",
      type: "multiple_choice",
      question: "What are Arshiya Khala's two favorite colors?",
      options: [
        { text: "Black and White", isCorrect: true, reaction: "Black and White! Simple, elegant, and classic." },
        { text: "Dark Purple", isCorrect: false, reaction: "Black and white are her favorites!" },
        { text: "Brown and Mustard", isCorrect: false, reaction: "Black and white always." },
      ],
      explanation: "Black and white.",
    },
    {
      id: "wafeeqa-8",
      type: "funny_habit",
      question: "How does Arshiya make baby Wafeeqa smile during playtime?",
      options: [
        { text: "By making cute funny sounds, gentle tickles, and waving tiny hands", isCorrect: true, reaction: "Your toothless giggles are the best sound in the world!" },
        { text: "By giving a formal lecture", isCorrect: false, reaction: "Funny sounds and tickles!" },
        { text: "By wearing a scary mask", isCorrect: false, reaction: "Gentle loving smiles only!" },
      ],
      explanation: "Making cute sounds to make the baby laugh.",
    },
    {
      id: "wafeeqa-9",
      type: "multiple_choice",
      question: "What delicious celebration food does Khala love the most?",
      options: [
        { text: "Biryani and Noodles", isCorrect: true, reaction: "Yes! Delicious biryani and noodles!" },
        { text: "Bitter melon soup", isCorrect: false, reaction: "Never bitter soup!" },
        { text: "Plain boiled rice with no flavor", isCorrect: false, reaction: "Biryani and noodles always!" },
      ],
      explanation: "Biryani and noodles.",
    },
    {
      id: "wafeeqa-10",
      type: "true_false",
      question: "True or False: Wafeeqa is Khala's precious angel whom she will protect and love forever.",
      options: [
        { text: "True — A permanent angel in our family constellation", isCorrect: true, reaction: "A promise written in the stars for my sweet angel!" },
        { text: "False — She is only family for a week", isCorrect: false, reaction: "Forever and always family!" },
      ],
      explanation: "Lifelong love and protection.",
    },
    {
      id: "wafeeqa-11",
      type: "memory_challenge",
      question: "What fluttering garden creatures appear in Wafeeqa's mini-game meadow?",
      options: [
        { text: "Pastel Butterflies 🦋", isCorrect: true, reaction: "Gentle butterflies landing softly on her flower crown!" },
        { text: "Giant Dragons", isCorrect: false, reaction: "Only sweet pastel butterflies!" },
        { text: "Buzzing Wasps", isCorrect: false, reaction: "Beautiful gentle butterflies!" },
      ],
      explanation: "Pastel butterflies in the meadow game.",
    },
    {
      id: "wafeeqa-12",
      type: "emotional",
      question: "What does Arshiya Khala pray for baby Wafeeqa as she grows up?",
      options: [
        { text: "A life filled with vibrant health, pure joy, peace, and loving protection", isCorrect: true, reaction: "Aameen! May your life always be blessed, peaceful, and bright!" },
        { text: "That she eats baby cereal forever", isCorrect: false, reaction: "She will enjoy delicious food soon!" },
        { text: "That she never learns to run", isCorrect: false, reaction: "May she grow up strong and happy!" },
      ],
      explanation: "Prayers for health, joy, and divine protection.",
    },
  ],

  // =========================================================================
  // 10. SHAHID (SHAHID PAPPA) — 12 BOOMING VOICE, MENTOR & VALUE QUESTIONS
  // =========================================================================
  shahid: [
    {
      id: "shahid-1",
      type: "multiple_choice",
      question: "What is Shahid Pappa's iconic greeting delivered in that booming deep bass voice?",
      options: [
        { text: "'Pappa says: Aan Beta... Haa Beta... Kaise ho?' 🎙️", isCorrect: true, reaction: "Delivered in that deep, unmistakable 70s radio frequency!" },
        { text: "'Good morning, here is your 10-page weekly report'", isCorrect: false, reaction: "Audio voice note with deep bass wins every time!" },
        { text: "Total silence", isCorrect: false, reaction: "Silence is not in his vocabulary!" },
      ],
      explanation: "His legendary greeting: 'Pappa says: Aan Beta... Haa Beta...'.",
    },
    {
      id: "shahid-2",
      type: "memory_challenge",
      question: "What atmosphere best describes Shahid Pappa's presence according to Arshiya?",
      options: [
        { text: "A comforting, teddy-like warmth mixed with protective fatherly guidance", isCorrect: true, reaction: "Pure fatherly warmth, big heart, and reliable advice!" },
        { text: "Strict military boot-camp", isCorrect: false, reaction: "Haha, he is all warmth and humor!" },
        { text: "Cold indifference", isCorrect: false, reaction: "He treats Arshiya with total paternal love." },
      ],
      explanation: "His teddy-bear warmth and paternal guidance.",
    },
    {
      id: "shahid-3",
      type: "core_values",
      question: "What is Arshiya's supreme core value that she and Shahid Pappa both deeply respect?",
      options: [
        { text: "Respect (Izzat) matters more than anything — disrespect triggers immediate anger", isCorrect: true, reaction: "Respect is the foundation of our bond, Shahid Pappa." },
        { text: "Having the most expensive gadgets", isCorrect: false, reaction: "Character matters, not gadgets." },
        { text: "Winning arguments at any cost", isCorrect: false, reaction: "Dignity and respect above all." },
      ],
      explanation: "Respect matters more than anything.",
    },
    {
      id: "shahid-4",
      type: "fill_blank",
      question: "Complete Shahid Pappa's classic advice: 'Decisions dil se lo, niyat saaf rakho, aur _____ ko bhool jao.'",
      options: [
        { text: "Darr (Fear)", isCorrect: true, reaction: "Fear has no place when your intentions are pure!" },
        { text: "Family", isCorrect: false, reaction: "Family is always first!" },
        { text: "Dinner", isCorrect: false, reaction: "Forget fear, stand tall!" },
      ],
      explanation: "His advice: 'Decisions dil se lo, niyat saaf rakho, aur darr ko bhool jao.'",
    },
    {
      id: "shahid-5",
      type: "true_false",
      question: "True or False: Arshiya loves watching late-night horror movies alone in dark rooms.",
      options: [
        { text: "False — Horror movies are strictly avoided and she generally doesn't watch movies", isCorrect: true, reaction: "True! No horror movies for Arshiya!" },
        { text: "True — She is a horror movie fanatic", isCorrect: false, reaction: "She avoids horror completely." },
      ],
      explanation: "She does not watch horror movies.",
    },
    {
      id: "shahid-6",
      type: "emotional",
      question: "What does Arshiya do when she feels emotionally heavy or upset?",
      options: [
        { text: "Reads namaz and has heart-to-heart talks with loved ones", isCorrect: true, reaction: "Yes, Shahid Pappa. Prayer and speaking with family grounds my soul." },
        { text: "Throws her phone out the window", isCorrect: false, reaction: "Prayer and patience bring peace." },
        { text: "Sleeps for 48 hours straight", isCorrect: false, reaction: "Spiritual connection and family conversations." },
      ],
      explanation: "Reading namaz and talking to loved ones.",
    },
    {
      id: "shahid-7",
      type: "personality",
      question: "What is Arshiya's cherished life dream that she hopes to fulfill?",
      options: [
        { text: "Moving to Saudi Arabia, studying Islamic studies, and learning about supernatural creations", isCorrect: true, reaction: "Yes, Shahid Pappa. That spiritual path is deeply important to me." },
        { text: "Becoming a professional pop rockstar", isCorrect: false, reaction: "Her heart belongs to sacred studies." },
        { text: "Living in a casino in Monaco", isCorrect: false, reaction: "Moving to Saudi Arabia and studying." },
      ],
      explanation: "Moving to Saudi Arabia, studying Islamic studies and supernatural creations.",
    },
    {
      id: "shahid-8",
      type: "multiple_choice",
      question: "What are Arshiya's favorite comfort foods of choice?",
      options: [
        { text: "Biryani and Noodles", isCorrect: true, reaction: "Biryani and noodles, always and forever!" },
        { text: "Boiled green beans with no seasoning", isCorrect: false, reaction: "No flavor, no way!" },
        { text: "Dry crackers", isCorrect: false, reaction: "Delicious biryani and noodles only!" },
      ],
      explanation: "Biryani and noodles.",
    },
    {
      id: "shahid-9",
      type: "funny_habit",
      question: "What is Arshiya's natural funny habit that brings humor to conversations?",
      options: [
        { text: "Imitating people's speech patterns and gestures to make them laugh", isCorrect: true, reaction: "Haha! You know my mimicry skills always make you smile!" },
        { text: "Speaking like a radio robot", isCorrect: false, reaction: "Imitating people's quirks is her gift!" },
        { text: "Whistling bird calls", isCorrect: false, reaction: "Spontaneous mimicry!" },
      ],
      explanation: "Imitating people to make them laugh.",
    },
    {
      id: "shahid-10",
      type: "true_false",
      question: "True or False: Arshiya believes that giving love or money to loved ones makes a person poorer.",
      options: [
        { text: "False — Give before taking; spending on loved ones never decreases wealth", isCorrect: true, reaction: "True! Giving from the heart only multiplies blessings." },
        { text: "True — Keeping every penny makes you richer", isCorrect: false, reaction: "She believes generosity brings barakah." },
      ],
      explanation: "Spending on loved ones does not decrease wealth.",
    },
    {
      id: "shahid-11",
      type: "multiple_choice",
      question: "What are Arshiya's two signature favorite colors?",
      options: [
        { text: "Black and White", isCorrect: true, reaction: "Black and White! Classic, elegant, and timeless." },
        { text: "Neon Orange and Teal", isCorrect: false, reaction: "Too loud!" },
        { text: "Olive Green and Grey", isCorrect: false, reaction: "Black and white always." },
      ],
      explanation: "Black and white.",
    },
    {
      id: "shahid-12",
      type: "memory_challenge",
      question: "Why does Arshiya value having Shahid as an adoptive father-figure?",
      options: [
        { text: "Because his reliable mentorship, booming warmth, and paternal belief are rare life treasures", isCorrect: true, reaction: "A deeply respected bond in my life, Shahid Pappa." },
        { text: "Because he gives free microphones", isCorrect: false, reaction: "His wisdom and fatherly care are priceless." },
        { text: "Because he knows movie trivia", isCorrect: false, reaction: "His paternal heart and guidance mean the world." },
      ],
      explanation: "His paternal role, life advice, and affectionate guidance.",
    },
  ],

  // =========================================================================
  // 11. MUSKAN (DUBBI) — 12 TWIN EXPRESSIONS, DUBBI/HIPPO & FRIENDSHIP QUESTIONS
  // =========================================================================
  muskan: [
    {
      id: "muskan-1",
      type: "personality",
      question: "What spooky telepathic superpower do Muskan and Arshiya share across a room?",
      options: [
        { text: "Identical facial expressions and telepathic laughing with a single raised eyebrow", isCorrect: true, reaction: "YES! One look across the room and both of us are dying of laughter!" },
        { text: "Predicting stock market fluctuations", isCorrect: false, reaction: "Haha, laughter and memes only!" },
        { text: "Speaking in Morse code", isCorrect: false, reaction: "Our facial expressions speak louder than words!" },
      ],
      explanation: "Their identical expressions and unspoken telepathic humor.",
    },
    {
      id: "muskan-2",
      type: "nickname",
      question: "What are our affectionate, body-positive inside nicknames for each other?",
      options: [
        { text: "Dubbi and Hippo (pure love and cuteness!) 🦛🧁", isCorrect: true, reaction: "Dubbi & Hippo forever! Said with infinite love and zero insecurity!" },
        { text: "Robot 1 and Robot 2", isCorrect: false, reaction: "Too mechanical!" },
        { text: "Solemn Scholars", isCorrect: false, reaction: "We are the Queens of Cute Chaos!" },
      ],
      explanation: "Their fond inside nicknames 'Dubbi and Hippo'.",
    },
    {
      id: "muskan-3",
      type: "memory_challenge",
      question: "How long does a strict diet resolution typically last between Muskan and Arshiya?",
      options: [
        { text: "Approximately 18 minutes until waffles, boba, or noodles appear! 🧇", isCorrect: true, reaction: "Every single time! Healthy happiness over diet stress always!" },
        { text: "A full calendar year without cheating", isCorrect: false, reaction: "Not in this universe!" },
        { text: "6 whole months", isCorrect: false, reaction: "18 minutes is our world record!" },
      ],
      explanation: "Canceling diets for waffles, boba, and noodles.",
    },
    {
      id: "muskan-4",
      type: "fill_blank",
      question: "Complete our bestie motto: 'We eat together, we laugh together, we _____ the world!'",
      options: [
        { text: "Conquer ✨", isCorrect: true, reaction: "Conquer! Nothing can stop two besties with matching chaotic energy!" },
        { text: "Ignore", isCorrect: false, reaction: "We conquer together!" },
        { text: "Confuse", isCorrect: false, reaction: "Conquer with laughter!" },
      ],
      explanation: "Their bestie motto: conquer together.",
    },
    {
      id: "muskan-5",
      type: "true_false",
      question: "True or False: Arshiya is thick-skinned and never overthinks what anyone says.",
      options: [
        { text: "False — She is deeply sensitive to words, replays sentences, and makes up stories about loved ones", isCorrect: true, reaction: "You understand my soul, Muski. I feel things so deeply and care so much." },
        { text: "True — Words roll off her with zero effect", isCorrect: false, reaction: "She is tender-hearted and deeply sensitive." },
      ],
      explanation: "She is deeply sensitive, replays sentences, and imagines stories about loved ones.",
    },
    {
      id: "muskan-6",
      type: "multiple_choice",
      question: "Which Bollywood superstars' songs do Arshiya and Muskan love jamming to?",
      options: [
        { text: "Salman Khan and Shah Rukh Khan songs", isCorrect: true, reaction: "Classic SRK and Salman tracks! Unfiltered car jam sessions!" },
        { text: "Heavy speed metal", isCorrect: false, reaction: "Too loud for bestie talks!" },
        { text: "Opera concertos in Latin", isCorrect: false, reaction: "Bollywood nostalgia always!" },
      ],
      explanation: "Salman Khan and Shah Rukh Khan songs.",
    },
    {
      id: "muskan-7",
      type: "multiple_choice",
      question: "What is Arshiya's ultimate comfort meal of choice?",
      options: [
        { text: "Biryani and Noodles", isCorrect: true, reaction: "You've witnessed me craving biryani and noodles countless times!" },
        { text: "Boiled raw broccoli", isCorrect: false, reaction: "Broccoli is canceled!" },
        { text: "Dry whole wheat crackers", isCorrect: false, reaction: "Biryani and noodles forever!" },
      ],
      explanation: "Biryani and noodles.",
    },
    {
      id: "muskan-8",
      type: "funny_habit",
      question: "What funny habit does Arshiya always pull on Muskan during conversations?",
      options: [
        { text: "Imitating people's voices and expressions until Muskan cries laughing", isCorrect: true, reaction: "Haha! Watching you laugh till tears come out is my favorite hobby!" },
        { text: "Balancing spoons on her nose", isCorrect: false, reaction: "Mimicry is her superpower!" },
        { text: "Doing silent mime routines", isCorrect: false, reaction: "Hilarious impressions of people!" },
      ],
      explanation: "Imitating people to make her bestie laugh.",
    },
    {
      id: "muskan-9",
      type: "personality",
      question: "What is Arshiya's sacred future dream that she shares with her closest circle?",
      options: [
        { text: "Moving to Saudi Arabia, studying Islamic studies, and supernatural creations", isCorrect: true, reaction: "Yes, Muski. That spiritual journey is my deepest dream." },
        { text: "Becoming an astronaut on Mars", isCorrect: false, reaction: "Her dream is spiritual and academic." },
        { text: "Living on a deserted cruise ship", isCorrect: false, reaction: "Moving to Saudi Arabia and studying." },
      ],
      explanation: "Moving to Saudi Arabia, studying Islamic studies and supernatural creations.",
    },
    {
      id: "muskan-10",
      type: "true_false",
      question: "True or False: Arshiya's favorite movie genre to watch with Muskan is gory horror films.",
      options: [
        { text: "False — She strictly dislikes horror movies and generally avoids movies", isCorrect: true, reaction: "True! No horror movies, only dessert cafe reels!" },
        { text: "True — She loves haunted house jumpscares", isCorrect: false, reaction: "Horror is strictly forbidden!" },
      ],
      explanation: "She does not like horror movies.",
    },
    {
      id: "muskan-11",
      type: "core_values",
      question: "What is Arshiya's immediate anger trigger in any relationship?",
      options: [
        { text: "Disrespect (Tadaka / Izzat ki kami)", isCorrect: true, reaction: "Disrespect is the one line that destroys trust." },
        { text: "Someone eating the last french fry", isCorrect: false, reaction: "We share fries happily!" },
        { text: "Rainy days", isCorrect: false, reaction: "Disrespect is her non-negotiable trigger." },
      ],
      explanation: "Disrespect triggers her anger.",
    },
    {
      id: "muskan-12",
      type: "memory_challenge",
      question: "Why is Muskan Arshiya's indispensable mirror soul?",
      options: [
        { text: "Because with Muskan there is zero judgment, shared food passions, and pure laughter", isCorrect: true, reaction: "You make every difficult day light, Muski. Love you endlessly!" },
        { text: "Because she drives sports cars", isCorrect: false, reaction: "Her pure heart and laughter are what matter." },
        { text: "Because she lends hair clips", isCorrect: false, reaction: "Our soul sisterhood is irreplaceable." },
      ],
      explanation: "Her judgment-free acceptance, shared humor, and twin-flame bond.",
    },
  ],

  // =========================================================================
  // 12. SANA — 12 BOUNDARIES, WISDOM & SISTERHOOD OF STRENGTH QUESTIONS
  // =========================================================================
  sana: [
    {
      id: "sana-1",
      type: "core_values",
      question: "What is Sana's golden boundary advice that Arshiya cherishes and lives by?",
      options: [
        { text: "'Draw a line if you don't like it.' 🕊️", isCorrect: true, reaction: "Words of pure wisdom that reshaped how I protect my peace and self-worth!" },
        { text: "'Always stay silent even if people disrespect you'", isCorrect: false, reaction: "Sana teaches self-respect and clear boundaries!" },
        { text: "'Agree with everyone to avoid drama'", isCorrect: false, reaction: "Kindness and firmness go hand in hand." },
      ],
      explanation: "Her unforgettable advice: 'Draw a line if you don't like it.'.",
    },
    {
      id: "sana-2",
      type: "personality",
      question: "What does Arshiya instinctively do when something feels unusual or when facing a tough decision?",
      options: [
        { text: "Turns to Sana for her thoughtful, grounded counsel and wisdom", isCorrect: true, reaction: "Your clarity clears all mental fog instantly, Sana." },
        { text: "Flips a coin in the dark", isCorrect: false, reaction: "Sana's wisdom beats any coin flip!" },
        { text: "Asks a random internet forum", isCorrect: false, reaction: "Sana's trusted sisterhood is supreme." },
      ],
      explanation: "Seeking Sana's opinions and grounded counsel whenever something feels unusual.",
    },
    {
      id: "sana-3",
      type: "emotional",
      question: "What is a deeply sensitive trait of Arshiya that she confides in Sana?",
      options: [
        { text: "She replays sentences in her mind many times and deeply cares about what loved ones think", isCorrect: true, reaction: "You understand how deeply I feel things, Sana. Words stay with me." },
        { text: "She never cares about anyone's words", isCorrect: false, reaction: "She is emotionally perceptive and sensitive." },
        { text: "She forgets conversations after 5 minutes", isCorrect: false, reaction: "She replays sentences and cares immensely." },
      ],
      explanation: "She is sensitive to words, replays sentences, and cares deeply.",
    },
    {
      id: "sana-4",
      type: "fill_blank",
      question: "Complete Sana's poise philosophy: 'True strength never needs to _____ to command respect.'",
      options: [
        { text: "Shout / Raise its voice", isCorrect: true, reaction: "Poise over noise. Dignity speaks louder than shouting." },
        { text: "Smile", isCorrect: false, reaction: "Strength can be gentle and smiling." },
        { text: "Think", isCorrect: false, reaction: "Thoughtfulness is strength." },
      ],
      explanation: "True strength never needs to raise its voice.",
    },
    {
      id: "sana-5",
      type: "true_false",
      question: "True or False: Arshiya believes that compromising on dignity is okay as long as everyone stays quiet.",
      options: [
        { text: "False — Respect and dignity matter more than anything; disrespect is a dealbreaker", isCorrect: true, reaction: "True! Dignity and respect are non-negotiable." },
        { text: "True — Dignity doesn't matter much", isCorrect: false, reaction: "Respect is her supreme core value." },
      ],
      explanation: "Respect and dignity are non-negotiable.",
    },
    {
      id: "sana-6",
      type: "personality",
      question: "What is Arshiya's sacred dream for her future journey?",
      options: [
        { text: "Moving to Saudi Arabia, studying Islamic studies, and understanding supernatural creations", isCorrect: true, reaction: "Yes, Sana. That spiritual and academic path is my true aspiration." },
        { text: "Becoming a runway model in Milan", isCorrect: false, reaction: "Her heart belongs to sacred studies." },
        { text: "Living in a casino resort", isCorrect: false, reaction: "Moving to Saudi Arabia and studying." },
      ],
      explanation: "Moving to Saudi Arabia, studying Islamic studies and supernatural creations.",
    },
    {
      id: "sana-7",
      type: "multiple_choice",
      question: "When Arshiya is overwhelmed, where does she find emotional grounding and solace?",
      options: [
        { text: "Reading namaz and having thoughtful conversations with wise loved ones", isCorrect: true, reaction: "Prayer and talking with grounded souls like you restores my peace." },
        { text: "Going to loud rave parties", isCorrect: false, reaction: "Peace and prayer bring solace." },
        { text: "Watching horror movies", isCorrect: false, reaction: "Horror is strictly avoided." },
      ],
      explanation: "Reading namaz and thoughtful conversations with loved ones.",
    },
    {
      id: "sana-8",
      type: "multiple_choice",
      question: "What are Arshiya's two signature favorite colors?",
      options: [
        { text: "Black and White", isCorrect: true, reaction: "Black and White! Timeless, serene, and elegant." },
        { text: "Electric Lime and Neon Yellow", isCorrect: false, reaction: "Too loud for her calm aesthetic." },
        { text: "Rust Orange and Olive", isCorrect: false, reaction: "Black and white always." },
      ],
      explanation: "Black and white.",
    },
    {
      id: "sana-9",
      type: "multiple_choice",
      question: "What are Arshiya's favorite comfort foods of choice?",
      options: [
        { text: "Biryani and Noodles", isCorrect: true, reaction: "Biryani and noodles, simple comfort food classics." },
        { text: "Cold cabbage soup", isCorrect: false, reaction: "Never!" },
        { text: "Plain dry crackers", isCorrect: false, reaction: "Biryani and noodles always." },
      ],
      explanation: "Biryani and noodles.",
    },
    {
      id: "sana-10",
      type: "true_false",
      question: "True or False: Arshiya watches horror films to relax and unwind.",
      options: [
        { text: "False — Horror movies are strictly disliked and she avoids movies generally", isCorrect: true, reaction: "True! She avoids horror films completely." },
        { text: "True — She loves horror films", isCorrect: false, reaction: "She strictly avoids horror." },
      ],
      explanation: "She does not watch horror movies.",
    },
    {
      id: "sana-11",
      type: "core_values",
      question: "What is Arshiya's philosophy on generosity and sisterhood?",
      options: [
        { text: "Give before taking, and spending on loved ones never decreases wealth", isCorrect: true, reaction: "Selfless generosity and respect build unbreakable sisterhood." },
        { text: "Calculate every expense before smiling", isCorrect: false, reaction: "Love doesn't calculate ledgers." },
        { text: "Keep secrets and distance", isCorrect: false, reaction: "Trust and generosity always." },
      ],
      explanation: "Give before taking, and spending on loved ones never decreases wealth.",
    },
    {
      id: "sana-12",
      type: "memory_challenge",
      question: "What is the true anchor of Arshiya and Sana's sister-like bond?",
      options: [
        { text: "Deep unspoken trust, emotional maturity, respectful boundaries, and sisterly wisdom", isCorrect: true, reaction: "A sacred bond that stands strong through every season, sister Sana." },
        { text: "Superficial daily gossip", isCorrect: false, reaction: "Our bond is rooted deep in character." },
        { text: "Social media likes", isCorrect: false, reaction: "Real sisterhood needs no algorithms." },
      ],
      explanation: "Deep trust, emotional maturity, and mutual respect.",
    },
  ],
};
