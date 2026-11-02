/**
 * CANDIDATES LIST DATA FOR "القائمة الحرّة البديل 101"
 * ====================================================
 * Single source of truth for all candidates on the list.
 * To add a candidate, simply add an entry to this array and put the portrait photo in /public/candidates/.
 * Any empty optional fields will be automatically hidden in the UI.
 *
 * NOTE: The initial entries below are SAMPLE placeholders pending receipt of verified list details.
 */

export interface Candidate {
  id: string;
  number: number; // Rank number on the list (displayed in Kreon)
  name: {
    ar: string;
    fr: string;
    en: string;
  };
  profession: {
    ar: string;
    fr: string;
    en: string;
  };
  commune: {
    ar: string;
    fr: string;
    en: string;
  };
  bio: {
    ar: string;
    fr: string;
    en: string;
  };
  image: string; // File in /public/candidates/
  extraInfo?: {
    education?: { ar: string; fr: string; en: string };
    experience?: { ar: string; fr: string; en: string };
    focus?: { ar: string; fr: string; en: string };
  };
  social?: {
    facebook?: string;
    x?: string;
    linkedin?: string;
    email?: string;
  };
}

export const candidates: Candidate[] = [
  {
    id: 'candidate-1',
    number: 1,
    name: {
      ar: 'المترشح 01 (متصدر القائمة)',
      fr: 'Candidat 01 (Tête de liste)',
      en: 'Candidate 01 (List Leader)',
    },
    profession: {
      ar: 'مهندس معماري وعمراني',
      fr: 'Architecte-Urbaniste',
      en: 'Architect & Urban Planner',
    },
    commune: {
      ar: 'بلدية الطاهير',
      fr: 'Commune de Taher',
      en: 'Taher Municipality',
    },
    bio: {
      ar: 'إطار تقني وناشط جمعوي محلي، مراكم لسنوات من العمل الميداني في دراسات التهيئة الحضرية، ومدافع عن العدالة التنموية وتحديث المرافق العمومية.',
      fr: 'Cadre technique et acteur associatif local, fort de plusieurs années d’expérience de terrain en urbanisme et engagé pour un développement équilibré.',
      en: 'Technical lead and local civic advocate with extensive field experience in urban planning, committed to balanced regional development and public infrastructure modernization.',
    },
    image: '/candidates/candidate-1.svg',
    extraInfo: {
      education: {
        ar: 'مهندس دولة في الهندسة المعمارية والتعمير',
        fr: 'Ingénieur d’État en Architecture et Urbanisme',
        en: 'State Diploma in Architecture & Urban Planning',
      },
      experience: {
        ar: 'أكثر من 12 سنة خبرة في المشاريع التنموية',
        fr: 'Plus de 12 ans d’expérience dans les projets de développement',
        en: '12+ years of experience in development projects',
      },
      focus: {
        ar: 'التهيئة الحضرية، السكن، وتحديث الخدمات البلدية',
        fr: 'Aménagement urbain, habitat et modernisation des services communaux',
        en: 'Urban development, housing, and municipal service modernization',
      },
    },
    social: {
      facebook: 'https://facebook.com',
      x: 'https://x.com',
      email: 'contact@candidate.dz',
    },
  },
  {
    id: 'candidate-2',
    number: 2,
    name: {
      ar: 'المترشحة 02',
      fr: 'Candidate 02',
      en: 'Candidate 02',
    },
    profession: {
      ar: 'أستاذة جامعية وباحثة في العلوم الاقتصادية',
      fr: 'Enseignante-chercheuse en Sciences Économiques',
      en: 'University Lecturer in Economic Sciences',
    },
    commune: {
      ar: 'بلدية الطاهير',
      fr: 'Commune de Taher',
      en: 'Taher Municipality',
    },
    bio: {
      ar: 'كفاءة أكاديمية متخصصة في المالية والتسيير المحلي، تعمل على مرافقة المشاريع المصغرة وتشجيع روح المبادرة الاقتصادية النسوية والشبابية بالمنطقة.',
      fr: 'Universitaire spécialisée en finances et gestion locale, engagée dans l’accompagnement des micro-entreprises et des initiatives féminines et jeunes.',
      en: 'Academic specialist in local finance and management, actively supporting small enterprises and youth entrepreneurship initiatives.',
    },
    image: '/candidates/candidate-2.svg',
    extraInfo: {
      education: {
        ar: 'دكتوراه في العلوم الاقتصادية والتسيير',
        fr: 'Doctorat en Sciences Économiques et Gestion',
        en: 'PhD in Economics and Management',
      },
      experience: {
        ar: '10 سنوات في التعليم العالي والاستشارات',
        fr: '10 ans dans l’enseignement supérieur et le conseil',
        en: '10 years in higher education & consulting',
      },
      focus: {
        ar: 'التنمية الاقتصادية المحلية وخلق فرص الشغل',
        fr: 'Développement économique local et création d’emplois',
        en: 'Local economic development and job creation',
      },
    },
  },
  {
    id: 'candidate-3',
    number: 3,
    name: {
      ar: 'المترشح 03',
      fr: 'Candidat 03',
      en: 'Candidate 03',
    },
    profession: {
      ar: 'طبيب ممارس بالصحة العمومية',
      fr: 'Médecin praticien de santé publique',
      en: 'Public Health Physician',
    },
    commune: {
      ar: 'بلدية الطاهير',
      fr: 'Commune de Taher',
      en: 'Taher Municipality',
    },
    bio: {
      ar: 'طبيب ميداني ومسؤول عن قوافل طبية تطوعية في المناطق المعزولة، يحمل ملف الرعاية الصحية الأولية والارتقاء بالمراكز الصحية الجوارية.',
      fr: 'Médecin de terrain engagé dans les caravanes médicales et associatives, défenseur de l’accès aux soins de proximité pour tous.',
      en: 'Practicing physician leading community health outreach, dedicated to upgrading primary healthcare clinics and patient services.',
    },
    image: '/candidates/candidate-3.svg',
    extraInfo: {
      education: {
        ar: 'دكتوراه في الطب العام',
        fr: 'Doctorat en Médecine Générale',
        en: 'Doctor of Medicine (MD)',
      },
      focus: {
        ar: 'تحسين المنظومة الصحية الجوارية والوقاية',
        fr: 'Santé de proximité, prévention et accueil des patients',
        en: 'Primary healthcare access and community prevention',
      },
    },
  },
  {
    id: 'candidate-4',
    number: 4,
    name: {
      ar: 'المترشح 04',
      fr: 'Candidat 04',
      en: 'Candidate 04',
    },
    profession: {
      ar: 'مهندس فلاحي وناشط في التنمية الريفية',
      fr: 'Ingénieur agronome & Acteur du monde rural',
      en: 'Agronomist & Rural Development Specialist',
    },
    commune: {
      ar: 'بلدية الطاهير',
      fr: 'Commune de Taher',
      en: 'Taher Municipality',
    },
    bio: {
      ar: 'خبير في تثمين المنتجات الفلاحية المحلية ودعم الفلاحين الصغار والمستثمرات العائلية، مساهم في برامج تشجير وحماية الموارد المائية.',
      fr: 'Expert en valorisation agricole et soutien aux petits exploitants, engagé dans la préservation des ressources en eau et des terroirs.',
      en: 'Specialist in agricultural enhancement and family farm support, active in conservation initiatives and water management.',
    },
    image: '/candidates/candidate-4.svg',
    extraInfo: {
      education: {
        ar: 'مهندس دولة في العلوم الفلاحية',
        fr: 'Ingénieur d’État en Sciences Agronomiques',
        en: 'State Diploma in Agricultural Sciences',
      },
      experience: {
        ar: '8 سنوات في الإرشاد الفلاحي والتنمية الريفية',
        fr: '8 ans en conseil agricole et développement rural',
        en: '8 years in agricultural advisory and rural projects',
      },
      focus: {
        ar: 'دعم الفلاحة، الموارد المائية، والمسالك الفلاحية',
        fr: 'Agriculture, gestion de l’eau et désenclavement rural',
        en: 'Agriculture, water resources, and rural connectivity',
      },
    },
  },
  {
    id: 'candidate-5',
    number: 5,
    name: {
      ar: 'المترشحة 05',
      fr: 'Candidate 05',
      en: 'Candidate 05',
    },
    profession: {
      ar: 'محامية وناشطة حقوقية واجتماعية',
      fr: 'Avocate et militante associative',
      en: 'Attorney & Social Advocate',
    },
    commune: {
      ar: 'بلدية الطاهير',
      fr: 'Commune de Taher',
      en: 'Taher Municipality',
    },
    bio: {
      ar: 'مختصة في قضايا العمل والوساطة المجتمعية، مدافعة عن الشفافية الإدارية وتبسيط الإجراءات القانونية لفائدة المواطنين وحاملي المشاريع.',
      fr: 'Spécialiste du contentieux social et de la médiation, engagée pour la transparence des procédures et la défense des droits des citoyens.',
      en: 'Legal advocate specializing in community mediation and administrative transparency, dedicated to accessible citizen rights.',
    },
    image: '/candidates/candidate-5.svg',
    extraInfo: {
      education: {
        ar: 'شهادة الكفاءة لمهنة المحاماة وماستر قانون',
        fr: 'Certificat d’Aptitude à la Profession d’Avocat (CAPA) & Master en Droit',
        en: 'Bar Certificate & Master in Law',
      },
      focus: {
        ar: 'الشفافية المؤسساتية، الرقابة، وحقوق المواطن',
        fr: 'Transparence institutionnelle, contrôle et droits citoyens',
        en: 'Institutional transparency, oversight, and civil rights',
      },
    },
  },
];
