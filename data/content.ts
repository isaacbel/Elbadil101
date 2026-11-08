/**
 * CANDIDATE CONFIGURATION & VERIFIED CONTENT FILE
 * ===============================================
 * Replace the bracketed placeholders [NAME], [ROLE], etc. with the candidate's verified information.
 * Any figures, quotes, or achievements must be verified by the campaign committee.
 */

export interface CandidateContent {
  name: { ar: string; fr: string; en: string };
  role: { ar: string; fr: string; en: string };
  place: { ar: string; fr: string; en: string };
  slogan: { ar: string; fr: string; en: string };
  party: { ar: string; fr: string; en: string };
  shortBio: { ar: string; fr: string; en: string };
  fullBio: { ar: string; fr: string; en: string };
  contact: {
    email: string;
    phone: string;
    officeAddress: { ar: string; fr: string; en: string };
    hours: { ar: string; fr: string; en: string };
  };
  social: {
    facebook: string;
    x: string;
    instagram: string;
    youtube: string;
  };
}

export const candidate: CandidateContent = {
  name: {
    ar: 'القائمة الحرة البديل 101',
    fr: 'Liste Libre Al-Badil 101',
    en: 'Free List Al-Badil 101',
  },
  role: {
    ar: 'القائمة الحرة البديل 101',
    fr: 'Liste Libre Al-Badil 101',
    en: 'Free List Al-Badil 101',
  },
  place: {
    ar: 'بلدية الطاهير، ولاية جيجل',
    fr: 'Commune de Taher, Wilaya de Jijel',
    en: 'Taher Municipality, Jijel',
  },
  slogan: {
    ar: 'نواصل المسيرة ... ونصنع البديل',
    fr: 'Nous poursuivons le chemin... et construisons l’alternative',
    en: 'We continue the journey... and build the alternative',
  },
  party: {
    ar: 'القائمة الحرة البديل 101',
    fr: 'Liste Libre Al-Badil 101',
    en: 'Free List Al-Badil 101',
  },
  shortBio: {
    ar: 'تنمية عادلة وشاملة لبلدية الطاهير وسكانها.',
    fr: 'Un développement juste et inclusif pour la commune de Taher et ses habitants.',
    en: 'Fair and inclusive development for Taher municipality and its residents.',
  },
  fullBio: {
    ar: 'على مدار سنوات من العمل الميداني في الهندسة المعمارية والتهيئة العمرانية ثم في التمثيل المحلي، راكمت تجربة عميقة في فهم تحديات التنمية المحلية، السكن، وتحديث المرافق العمومية. أؤمن بأن المسؤولية العامة أمانة تتطلب الشفافية، الصدق، والتواجد المستمر في الميدان.',
    fr: 'Au fil d’années d’exercice professionnel dans l’architecture et l’aménagement du territoire, puis au sein du conseil local, j’ai acquis une compréhension intime des priorités de nos communes : dignité économique, qualité des services publics et accompagnement de la jeunesse. L’action publique doit être fondée sur la transparence et l’exigence.',
    en: 'Through years of professional practice in architecture, spatial planning, and local council representation, I have gained deep practical insight into the challenges facing our communities: balanced public investment, modern utilities, and empowering the youth. Public service is a trust that demands transparency, proximity, and unwavering accountability.',
  },
  contact: {
    email: 'contact@bureau-candidat.dz',
    phone: '+213 (0) 550 00 00 00',
    officeAddress: {
      ar: 'المكتب البرلماني والمحلي، وسط المدينة، الجزائر',
      fr: 'Permanence locale et parlementaire, Centre-ville, Algérie',
      en: 'Local Liaison Office, City Center, Algeria',
    },
    hours: {
      ar: 'من الأحد إلى الخميس: 09:00 - 17:00',
      fr: 'Dimanche au Jeudi : 09h00 - 17h00',
      en: 'Sunday to Thursday: 09:00 - 17:00',
    },
  },
  social: {
    facebook: 'https://facebook.com',
    x: 'https://x.com',
    instagram: 'https://instagram.com',
    youtube: 'https://youtube.com',
  },
};

export interface VisionPriority {
  id: string;
  icon: 'ShieldCheck' | 'Building2' | 'GraduationCap' | 'Eye';
  title: { ar: string; fr: string; en: string };
  description: { ar: string; fr: string; en: string };
  points: { ar: string[]; fr: string[]; en: string[] };
}

export const visionPriorities: VisionPriority[] = [
  {
    id: 'economic-dignity',
    icon: 'ShieldCheck',
    title: {
      ar: 'الكرامة الاقتصادية والقدرة الشرائية',
      fr: 'Dignité économique & Pouvoir d’achat',
      en: 'Economic Dignity & Purchasing Power',
    },
    description: {
      ar: 'حماية القدرة الشرائية للأسر، دعم الإنتاج الوطني، وخلق فرص عمل مستدامة لأبناء المنطقة.',
      fr: 'Protéger le pouvoir d’achat des ménages, stimuler la production nationale et ouvrir de réelles opportunités économiques locales.',
      en: 'Safeguarding household purchasing power, fostering national production, and creating sustainable local economic opportunities.',
    },
    points: {
      ar: [
        'دعم المبادرات المحلية والتعاونيات الإنتاجية',
        'تسهيل الإجراءات أمام المؤسسات المصغرة والناشئة',
        'مراقبة وضمان عدالة توزيع المشاريع الاقتصادية',
      ],
      fr: [
        'Soutien aux coopératives et initiatives artisanales locales',
        'Allègement des démarches pour les TPE et auto-entrepreneurs',
        'Contrôle de l’équité d’accès aux opportunités de développement',
      ],
      en: [
        'Support for local cooperatives and productive initiatives',
        'Streamlining regulations for small enterprises and entrepreneurs',
        'Ensuring equitable distribution of development investments',
      ],
    },
  },
  {
    id: 'local-development',
    icon: 'Building2',
    title: {
      ar: 'التنمية المحلية والتوازن الإقليمي',
      fr: 'Développement local & Équilibre territorial',
      en: 'Local Development & Regional Balance',
    },
    description: {
      ar: 'تنمية متوازنة وشاملة بين مختلف البلديات، فك العزلة عن المناطق المعزولة، وتعزيز صلاحيات المجالس المنتخبة.',
      fr: 'Développement harmonieux entre toutes les communes, désenclavement des zones isolées et renforcement des institutions de proximité.',
      en: 'Balanced investment across all municipalities, connecting underserved areas, and strengthening responsive local governance.',
    },
    points: {
      ar: [
        'إعطاء الأولوية للتهيئة الحضرية وشبكات المياه والطرق',
        'تعزيز الميزانيات المخصصة للمناطق ذات الاحتياجات الملحة',
        'الارتقاء بجودة الخدمات البلدية وتيسير الإجراءات',
      ],
      fr: [
        'Priorité aux voiries, réseaux d’assainissement et accès à l’eau',
        'Rééquilibrage des allocations budgétaires vers les zones fragiles',
        'Modernisation du service public communal et de l’état civil',
      ],
      en: [
        'Prioritizing water systems, road networks, and municipal maintenance',
        'Targeted infrastructure funding for underserved communities',
        'Modernizing communal services and public administration',
      ],
    },
  },
  {
    id: 'youth-education',
    icon: 'GraduationCap',
    title: {
      ar: 'الشباب، التكوين والتعليم العصري',
      fr: 'Jeunesse, Éducation & Avenir',
      en: 'Youth, Modern Education & Opportunity',
    },
    description: {
      ar: 'مرافقة حقيقية للشباب، تحديث المدارس ومراكز التكوين المهني، وتوفير بيئة ملهمة للإبداع والابتكار.',
      fr: 'Accompagner la jeunesse par un enseignement modernisé, des filières de formation qualifiantes et des espaces d’entrepreneuriat.',
      en: 'Investing in high-quality schooling, practical vocational training, and supportive environments for youth entrepreneurship.',
    },
    points: {
      ar: [
        'ربط مراكز التكوين المهني باحتياجات سوق العمل الحقيقية',
        'توفير فضاءات رقمية ورياضية في كل بلدية',
        'مرافقة أصحاب المشاريع وحاملي الأفكار الشابة',
      ],
      fr: [
        'Adéquation de la formation professionnelle avec le marché réel',
        'Création d’espaces d’étude, de numérique et de sport dans chaque commune',
        'Accompagnement technique et financier des porteurs de projets',
      ],
      en: [
        'Aligning vocational curricula with real regional employment needs',
        'Creating accessible digital hubs and recreation facilities in every town',
        'Mentorship and micro-grants for emerging innovators',
      ],
    },
  },
  {
    id: 'transparency-responsibility',
    icon: 'Eye',
    title: {
      ar: 'الشفافية والمسؤولية المؤسساتية',
      fr: 'Transparence & Responsabilité publique',
      en: 'Transparency & Institutional Accountability',
    },
    description: {
      ar: 'ترسيخ مبدأ المحاسبة والمساءلة، فتح قنوات الاتصال الدائم، وحق المواطن في النفاذ إلى المعلومة العمومية.',
      fr: 'Consacrer l’éthique de responsabilité, le devoir de rendre compte et l’accès fluide des citoyens aux décisions publiques.',
      en: 'Strengthening public accountability, institutional oversight, and citizens’ fundamental right to transparent public information.',
    },
    points: {
      ar: [
        'نشر تقارير دورية حول نشاط المكتب والمقترحات المرفوعة',
        'استقبال المواطنين بانتظام ومتابعة شكاويهم بدقة',
        'التصدي للبيروقراطية وتكريس الرقمنة في التعاملات',
      ],
      fr: [
        'Publication de comptes-rendus réguliers d’activité parlementaire',
        'Permanences régulières d’écoute citoyenne et suivi rigoureux',
        'Lutte contre la lourdeur administrative par la numérisation',
      ],
      en: [
        'Periodic public reports detailing legislative work and inquiries',
        'Regular office hours and systematic tracking of citizen petitions',
        'Combatting bureaucracy through transparent digital workflows',
      ],
    },
  },
];

export interface Milestone {
  year: string;
  title: { ar: string; fr: string; en: string };
  description: { ar: string; fr: string; en: string };
  tag?: { ar: string; fr: string; en: string };
}

export const timelineMilestones: Milestone[] = [
  {
    year: '2015',
    title: {
      ar: 'التخرج في الهندسة المعمارية وبداية المسار المهني',
      fr: 'Diplôme d’architecte et début de carrière',
      en: 'Architecture Degree & Early Practice',
    },
    description: {
      ar: 'إطلاق مسار مهني متخصص في الهندسة المعمارية، دراسات التهيئة الحضرية ومشاريع المرافق العامة.',
      fr: 'Lancement d’une activité professionnelle axée sur la conception architecturale, l’urbanisme durable et les équipements collectifs.',
      en: 'Started professional practice specializing in sustainable architecture, municipal urban planning, and civic infrastructure.',
    },
    tag: { ar: 'المسار المهني', fr: 'Parcours Pro', en: 'Professional' },
  },
  {
    year: '2019',
    title: {
      ar: 'تأسيس مبادرات مجتمعية للحفاظ على التراث الحضري',
      fr: 'Initiatives citoyennes pour le patrimoine urbain',
      en: 'Civic Initiatives for Urban Heritage',
    },
    description: {
      ar: 'المساهمة في تنسيق حملات تطوعية وحلقات حوار مع المجتمع المدني والشباب حول إحياء الفضاءات العامة.',
      fr: 'Coordination d’actions collectives et d’ateliers participatifs avec la société civile pour la valorisation des espaces de vie.',
      en: 'Coordinated volunteer working groups and participatory forums on public spaces and municipal revitalisation.',
    },
    tag: { ar: 'المجتمع المدني', fr: 'Société Civile', en: 'Civil Society' },
  },
  {
    year: '2021',
    title: {
      ar: 'انتخاب عضواً بالمجلس الشعبي الولائي',
      fr: 'Élection à l’Assemblée Populaire de Wilaya',
      en: 'Elected to the Provincial Assembly',
    },
    description: {
      ar: 'تولي مسؤولية تمثيل المواطنين، والتركيز على لجان التعمير، السكن، والتنمية المحلية.',
      fr: 'Prise de mandat électif avec un investissement prioritaire dans les commissions d’urbanisme, de l’habitat et du développement territorial.',
      en: 'Began elected mandate, prioritizing committee leadership in urban development, housing standards, and balanced budget allocations.',
    },
    tag: { ar: 'الانتداب الانتخابي', fr: 'Mandat Électif', en: 'Elected Mandate' },
  },
  {
    year: '2024',
    title: {
      ar: 'إطلاق منصة الإنصات والتواصل الميداني المباشر',
      fr: 'Lancement des consultations citoyennes de terrain',
      en: 'Launch of Grassroots Consultation Tours',
    },
    description: {
      ar: 'تنظيم زيارات ميدانية لجميع بلديات الولاية دون استثناء للاستماع المباشر لانشغالات الساكنة وإعداد تقارير مفصلة.',
      fr: 'Tournée exhaustive de concertation dans les communes pour recueillir directement les besoins des résidents.',
      en: 'Organized thorough consultative tours across all provincial communes to log constituent grievances and priorities directly.',
    },
    tag: { ar: 'العمل الميداني', fr: 'Action Terrain', en: 'Grassroots' },
  },
  {
    year: '2026',
    title: {
      ar: 'تقديم برنامج الحملة الانتخابية الشامل',
      fr: 'Présentation du programme de candidature 2026',
      en: 'Presentation of the 2026 Campaign Agenda',
    },
    description: {
      ar: 'بلورة برنامج متكامل نابع من الميدان يرتكز على الكرامة الاقتصادية، الشفافية، وتمكين الكفاءات المحلية.',
      fr: 'Synthèse d’un projet politique concret, nourri par cinq années d’écoute et de rigueur institutionnelle.',
      en: 'Formulated a comprehensive policy platform rooted in grassroots listening, institutional ethics, and local economic dignity.',
    },
    tag: { ar: 'الحملة الحالية', fr: 'Campagne 2026', en: 'Current Campaign' },
  },
];

export interface Activity {
  id: string;
  category: { ar: string; fr: string; en: string };
  year: string;
  title: { ar: string; fr: string; en: string };
  description: { ar: string; fr: string; en: string };
  imagePlaceholder?: string;
  location: { ar: string; fr: string; en: string };
  image?: string;
  images?: string[];
  imageAlt?: { ar: string; fr: string; en: string };
}

export const activities: Activity[] = [
  {
    id: 'act-bouachir',
    category: {
      ar: 'تجمع شعبي',
      fr: 'Rassemblement Populaire',
      en: 'Public Rally',
    },
    year: '2026',
    title: {
      ar: 'أول تجمع شعبي ببوعشير',
      fr: 'Premier rassemblement populaire à Bouachir',
      en: 'First Public Rally in Bouachir',
    },
    description: {
      ar: `بوعشير تشهد أول تجمع شعبي للقائمة الحرة البديل في اطار الحملة الانتخابية المحلية نوفمبر 2026.

من القلب، شكراً لأهالي بوعشير على حسن الاستقبال وكرم الضيافة. ❤️

سعدنا بلقائكم والاستماع إليكم ومشاركة هذه اللحظات معكم خلال أول تجمع شعبي لنا في المنطقة.

شكراً لكل من حضر، ولكل من خصّص من وقته ليكون معنا. استقبالكم الطيب وكلماتكم الصادقة محل تقدير واعتزاز.

بوعشير، شكراً على هذه البداية الجميلة. 🇩🇿

«القائمة الحرة البديل رقم 101» 🌿`,
      fr: `Bouachir accueille le premier rassemblement populaire de la Liste Libre Al-Badil dans le cadre de la campagne électorale locale de novembre 2026.

Du fond du cœur, merci aux habitants de Bouachir pour leur accueil chaleureux et leur généreuse hospitalité. ❤️

Nous avons été ravis de vous rencontrer, de vous écouter et de partager ces moments avec vous lors de notre premier rassemblement populaire dans la région.

Merci à toutes celles et ceux qui ont assisté, et à chacun qui a consacré de son temps pour être à nos côtés. Votre accueil chaleureux et vos paroles sincères sont une source de fierté et de profonde gratitude.

Bouachir, merci pour ce magnifique départ. 🇩🇿

« Liste Libre Al-Badil N° 101 » 🌿`,
      en: `Bouachir hosts the first public rally of the Free List Al-Badil as part of the local election campaign, November 2026.

From the bottom of our hearts, thank you to the people of Bouachir for the warm welcome and generous hospitality. ❤️

We were delighted to meet you, listen to your concerns, and share these moments with you during our first public gathering in the area.

Thank you to everyone who attended, and to everyone who dedicated their time to be with us. Your kind reception and sincere words are a source of great pride and gratitude.

Bouachir, thank you for this wonderful beginning. 🇩🇿

« Free List Al-Badil No. 101 » 🌿`,
    },
    image: '/images/tajamo3at/WhatsApp Image 2026-11-06 at 08.26.15.jpeg',
    imageAlt: {
      ar: 'أول تجمع شعبي للقائمة الحرة البديل ببوعشير',
      fr: 'Premier rassemblement populaire de la Liste Libre Al-Badil à Bouachir',
      en: 'First public rally of the Free List Al-Badil in Bouachir',
    },
    imagePlaceholder: 'Bouachir Public Rally',
    location: { ar: 'بوعشير', fr: 'Bouachir', en: 'Bouachir' },
  },
  {
    id: 'act-bni-metran',
    category: {
      ar: 'مداومة انتخابية',
      fr: 'Permanence Électorale',
      en: 'Campaign Office',
    },
    year: '2026',
    title: {
      ar: 'افتتاح مداومة بني متران',
      fr: 'Inauguration de la permanence de Beni Metrane',
      en: 'Inauguration of Beni Metrane Campaign Office',
    },
    description: {
      ar: `افتتاح مداومة #بني_متران بحضور المترشحين، أعضاء مديرية الحملة والمواطنين.

🌿 القائمة الحرة البديل 101
#البديل
#القائمة_الحرة_البديل_101
#انتخابات_المجلس_الشعبي_لبلدية_الطاهير
#بوشرقة #الطاهير`,
      fr: `Inauguration de la permanence de #بني_متران en présence des candidats, des membres de la direction de campagne et des citoyens.

🌿 Liste Libre Al-Badil 101
#البديل
#القائمة_الحرة_البديل_101
#انتخابات_المجلس_الشعبي_لبلدية_الطاهير
#بوشرقة #الطاهير`,
      en: `Inauguration of #بني_متران campaign office in the presence of candidates, campaign directorate members, and citizens.

🌿 Free List Al-Badil 101
#البديل
#القائمة_الحرة_البديل_101
#انتخابات_المجلس_الشعبي_لبلدية_الطاهير
#بوشرقة #الطاهير`,
    },
    image: '/images/tajamo3at/bni_metran.jpeg',
    imageAlt: {
      ar: 'افتتاح مداومة بني متران',
      fr: 'Inauguration de la permanence de Beni Metrane',
      en: 'Inauguration of Beni Metrane Campaign Office',
    },
    imagePlaceholder: 'Beni Metrane Campaign Office',
    location: { ar: 'بني متران', fr: 'Beni Metrane', en: 'Beni Metrane' },
  },
  {
    id: 'act-bouchareka',
    category: {
      ar: 'مداومة انتخابية',
      fr: 'Permanence Électorale',
      en: 'Campaign Office',
    },
    year: '2026',
    title: {
      ar: 'افتتاح مداومة بوشرقة السفلى الفيرمة',
      fr: 'Inauguration de la permanence de Bouchareka Essoufla El-Firma',
      en: 'Inauguration of Lower Bouchareka El-Firma Campaign Office',
    },
    description: {
      ar: `افتتاح مداومة #بوشرقة_السفلى_الفيرمة بحضور المترشحين، أعضاء مديرية الحملة والمواطنين.

🌿 القائمة الحرة البديل 101
#البديل
#القائمة_الحرة_البديل_101
#انتخابات_المجلس_الشعبي_لبلدية_الطاهير
#بوشرقة #الطاهير`,
      fr: `Inauguration de la permanence de #بوشرقة_السفلى_الفيرمة en présence des candidats, des membres de la direction de campagne et des citoyens.

🌿 Liste Libre Al-Badil 101
#البديل
#القائمة_الحرة_البديل_101
#انتخابات_المجلس_الشعبي_لبلدية_الطاهير
#بوشرقة #الطاهير`,
      en: `Inauguration of #بوشرقة_السفلى_الفيرمة campaign office in the presence of candidates, campaign directorate members, and citizens.

🌿 Free List Al-Badil 101
#البديل
#القائمة_الحرة_البديل_101
#انتخابات_المجلس_الشعبي_لبلدية_الطاهير
#بوشرقة #الطاهير`,
    },
    image: '/images/tajamo3at/bouchareka_soufla_firma.jpeg',
    imageAlt: {
      ar: 'افتتاح مداومة بوشرقة السفلى الفيرمة',
      fr: 'Inauguration de la permanence de Bouchareka Essoufla El-Firma',
      en: 'Inauguration of Lower Bouchareka El-Firma Campaign Office',
    },
    imagePlaceholder: 'Bouchareka Campaign Office',
    location: { ar: 'بوشرقة السفلى - الفيرمة', fr: 'Bouchareka Essoufla - El Firma', en: 'Lower Bouchareka - El Firma' },
  },
  {
    id: 'act-tacifet',
    category: {
      ar: 'مداومة انتخابية',
      fr: 'Permanence Électorale',
      en: 'Campaign Office',
    },
    year: '2026',
    title: {
      ar: 'افتتاح مداومة تاسيفت الكبرى',
      fr: 'Inauguration de la permanence de Tassift El-Koubra',
      en: 'Inauguration of Greater Tassift Campaign Office',
    },
    description: {
      ar: `افتتاح مداومة #تاسيفت_الكبرى بحضور المترشحين، أعضاء مديرية الحملة والمواطنين.

🌿 القائمة الحرة البديل 101

#البديل
#القائمة_الحرة_البديل_101
#انتخابات_المجلس_الشعبي_لبلدية_الطاهير
#تاسيفت #الطاهير`,
      fr: `Inauguration de la permanence de #تاسيفت_الكبرى en présence des candidats, des membres de la direction de campagne et des citoyens.

🌿 Liste Libre Al-Badil 101

#البديل
#القائمة_الحرة_البديل_101
#انتخابات_المجلس_الشعبي_لبلدية_الطاهير
#تاسيفت #الطاهير`,
      en: `Inauguration of #تاسيفت_الكبرى campaign office in the presence of candidates, campaign directorate members, and citizens.

🌿 Free List Al-Badil 101

#البديل
#القائمة_الحرة_البديل_101
#انتخابات_المجلس_الشعبي_لبلدية_الطاهير
#تاسيفت #الطاهير`,
    },
    image: '/images/tajamo3at/tacifet_elkoubra.jpeg',
    imageAlt: {
      ar: 'افتتاح مداومة تاسيفت الكبرى',
      fr: 'Inauguration de la permanence de Tassift El-Koubra',
      en: 'Inauguration of Greater Tassift Campaign Office',
    },
    imagePlaceholder: 'Tassift Campaign Office',
    location: { ar: 'تاسيفت الكبرى', fr: 'Tassift El-Koubra', en: 'Greater Tassift' },
  },
  {
    id: 'act-1',
    category: {
      ar: 'التهيئة الحضرية',
      fr: 'Aménagement Urbain',
      en: 'Urban Planning',
    },
    year: '2026',
    title: {
      ar: 'جولة استماع ميدانية مع سكان الأحياء السكنية الجديدة',
      fr: 'Visite d’écoute citoyenne dans les nouveaux quartiers',
      en: 'Listening Tour with Residents of New Neighborhoods',
    },
    description: {
      ar: 'لقاء مفتوح لمناقشة نقائص النقل العمومي، المرافق المدرسية والمساحات الخضراء في المجمعات السكنية الحديثة.',
      fr: 'Échanges ouverts autour du désenclavement, des lignes de transport, des écoles et des espaces verts dans les nouveaux ensembles.',
      en: 'Open public dialogue on public transit access, primary school capacity, and green spaces in newly developed residential sectors.',
    },
    imagePlaceholder: 'Urban Development & Public Spaces',
    location: { ar: 'البلدية المركزية', fr: 'Commune Centrale', en: 'Central Commune' },
  },
  {
    id: 'act-2',
    category: {
      ar: 'الشباب وريادة الأعمال',
      fr: 'Jeunesse & Entrepreneuriat',
      en: 'Youth & Innovation',
    },
    year: '2026',
    title: {
      ar: 'طاولة مستديرة حول فرص العمل والتكوين المهني للشباب',
      fr: 'Table ronde sur l’emploi et la formation qualifiante',
      en: 'Roundtable on Youth Employment & Technical Skills',
    },
    description: {
      ar: 'جلسة عمل مع خريجي الجامعات ومراكز التكوين لمناقشة آليات دعم المشاريع الناشئة وتجاوز العراقيل البيروقراطية.',
      fr: 'Session de travail avec les diplômés et jeunes porteurs de projets autour des mécanismes d’accompagnement et de financement.',
      en: 'Working session with university and vocational graduates exploring seed support mechanisms and administrative simplification.',
    },
    imagePlaceholder: 'Youth Engagement & Opportunity',
    location: { ar: 'المنطقة الصناعية', fr: 'Zone d’Activité', en: 'Economic Zone' },
  },
  {
    id: 'act-3',
    category: {
      ar: 'مشاركة المرأة',
      fr: 'Participation Féminine',
      en: 'Women’s Participation',
    },
    year: '2026',
    title: {
      ar: 'ملتقى حول المبادرات النسوية المنتجة في الوسط الريفي',
      fr: 'Rencontre sur les initiatives productives des femmes rurales',
      en: 'Symposium on Rural Women’s Economic Cooperatives',
    },
    description: {
      ar: 'الوقوف على تجارب رائدات الأعمال في الصناعات التقليدية والفلاحة العائلية، وبحث سبل التسويق والدعم المالي.',
      fr: 'Valorisation des initiatives d’artisanat et de valorisation agricole menées par des coopératives féminines en milieu rural.',
      en: 'Highlighting artisanal cooperatives and agro-food enterprises led by women, exploring market access and credit solutions.',
    },
    imagePlaceholder: 'Women in Local Economy',
    location: { ar: 'البلديات الريفية', fr: 'Communes Rurales', en: 'Rural Communes' },
  },
  {
    id: 'act-4',
    category: {
      ar: 'العمل المجتمعي',
      fr: 'Action Sociale',
      en: 'Community Outreach',
    },
    year: '2025',
    title: {
      ar: 'يوم تطوعي لتهيئة فضاء ترفيهي وتربوي للأطفال',
      fr: 'Journée citoyenne pour la réhabilitation d’un espace de loisirs',
      en: 'Civic Day Revitalizing Children’s Community Park',
    },
    description: {
      ar: 'مشاركة شباب وجمعيات الحي في غرس الأشجار وتجهيز مساحة ألعاب آمنة للأطفال والبيئة المحلية.',
      fr: 'Action conjointe avec les comités de quartier et les associations de jeunes pour l’aménagement d’une aire de jeux sécurisée.',
      en: 'Collaborative initiative with neighborhood committees planting trees and installing safe play infrastructure for children.',
    },
    imagePlaceholder: 'Community Volunteer Action',
    location: { ar: 'حي السلام', fr: 'Quartier Essalam', en: 'Essalam District' },
  },
  {
    id: 'act-5',
    category: {
      ar: 'الحوار المؤسساتي',
      fr: 'Concertation Locale',
      en: 'Local Governance',
    },
    year: '2025',
    title: {
      ar: 'جلسة تشاورية مع فعاليات المجتمع المدني والجمعيات',
      fr: 'Concertation ouverte avec les associations locales',
      en: 'Consultative Assembly with Civil Society Organizations',
    },
    description: {
      ar: 'عرض حصيلة مقترحات المجلس الشعبي الولائي وجمع أولويات الجمعيات المحلية لإدراجها في خطة العمل القادمة.',
      fr: 'Présentation du bilan des questions et requêtes soumises, et recueil des doléances prioritaires du tissu associatif.',
      en: 'Presentation of assembly legislative submissions and compiling civil society priorities for the forthcoming legislative agenda.',
    },
    imagePlaceholder: 'Civic Assembly & Consultation',
    location: { ar: 'دار الثقافة', fr: 'Maison de la Culture', en: 'Cultural Center' },
  },
];

/**
 * Section 5.7: Verified Achievements
 * Leave empty (`[]`) by default so the section cleanly self-omits without empty blocks.
 * To activate, add verified milestones or statistics.
 */
export interface Achievement {
  stat: string;
  label: { ar: string; fr: string; en: string };
  detail?: { ar: string; fr: string; en: string };
}

export const verifiedAchievements: Achievement[] = [
  // Leave empty until verified figures are provided by the campaign:
  // {
  //   stat: '100+',
  //   label: { ar: 'جلسة استماع بلدية', fr: 'Séances d’écoute', en: 'Townhall Sessions' }
  // }
];
