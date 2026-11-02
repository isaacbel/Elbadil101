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
    ar: '[اسم المرشح]',
    fr: '[Nom du Candidat]',
    en: '[Candidate Name]',
  },
  role: {
    ar: '[مهندس معماري · عضو منتخب بالمجلس الشعبي الولائي]',
    fr: '[Architecte · Élu à l’Assemblée Populaire de Wilaya]',
    en: '[Architect · Elected Member of the Provincial Assembly]',
  },
  place: {
    ar: '[البلدية، الولاية]',
    fr: '[Commune, Wilaya]',
    en: '[Town, Wilaya]',
  },
  slogan: {
    ar: 'صوت مسؤول وقريب من انشغالاتكم اليومية',
    fr: 'Une voix responsable, engagée au cœur du quotidien',
    en: 'A responsible voice, close to everyday life',
  },
  party: {
    ar: '[اسم الحزب أو القائمة الحرة المستقلة]',
    fr: '[Nom du parti ou liste indépendante]',
    en: '[Party or Independent List]',
  },
  shortBio: {
    ar: 'مهندس معماري وناشط في التنمية المحلية والحضرية، ملتزم بالعمل المؤسساتي المسؤول والإنصات المباشر لانشغالات المواطنين عبر بلديات الولاية.',
    fr: 'Architecte et acteur engagé du développement local et urbain, dédié à un travail institutionnel intègre et à l’écoute directe des citoyens de la wilaya.',
    en: 'Architect and dedicated local advocate for balanced urban development, committed to principled public service and direct citizen dialogue across all communes.',
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
  imagePlaceholder: string;
  location: { ar: string; fr: string; en: string };
}

export const activities: Activity[] = [
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
