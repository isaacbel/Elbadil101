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
    image: '/images/WhatsApp Image 2026-11-06 at 02.45.32 (4).jpeg',
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
    image: '/images/WhatsApp Image 2026-11-06 at 02.45.32 (5).jpeg',
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
    image: '/images/WhatsApp Image 2026-11-06 at 02.45.33.jpeg',
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
    image: '/images/WhatsApp Image 2026-11-06 at 02.45.33 (1).jpeg',
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
    image: '/images/WhatsApp Image 2026-11-06 at 02.45.33 (2).jpeg',
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
  {
    id: 'candidate-6',
    number: 6,
    name: {
      ar: 'المترشح 6',
      fr: 'Candidat 6',
      en: 'Candidate 6',
    },
    profession: {
      ar: '',
      fr: '',
      en: '',
    },
    commune: {
      ar: 'بلدية الطاهير',
      fr: 'Commune de Taher',
      en: 'Taher Municipality',
    },
    bio: {
      ar: '',
      fr: '',
      en: '',
    },
    image: '/images/WhatsApp Image 2026-11-06 at 02.45.33 (3).jpeg',
  },
  {
    id: 'candidate-7',
    number: 7,
    name: {
      ar: 'المترشح 7',
      fr: 'Candidat 7',
      en: 'Candidate 7',
    },
    profession: {
      ar: '',
      fr: '',
      en: '',
    },
    commune: {
      ar: 'بلدية الطاهير',
      fr: 'Commune de Taher',
      en: 'Taher Municipality',
    },
    bio: {
      ar: '',
      fr: '',
      en: '',
    },
    image: '/images/WhatsApp Image 2026-11-06 at 02.45.33 (4).jpeg',
  },
  {
    id: 'candidate-8',
    number: 8,
    name: {
      ar: 'المترشح 8',
      fr: 'Candidat 8',
      en: 'Candidate 8',
    },
    profession: {
      ar: '',
      fr: '',
      en: '',
    },
    commune: {
      ar: 'بلدية الطاهير',
      fr: 'Commune de Taher',
      en: 'Taher Municipality',
    },
    bio: {
      ar: '',
      fr: '',
      en: '',
    },
    image: '/images/WhatsApp Image 2026-11-06 at 02.45.33 (5).jpeg',
  },
  {
    id: 'candidate-9',
    number: 9,
    name: {
      ar: 'المترشح 9',
      fr: 'Candidat 9',
      en: 'Candidate 9',
    },
    profession: {
      ar: '',
      fr: '',
      en: '',
    },
    commune: {
      ar: 'بلدية الطاهير',
      fr: 'Commune de Taher',
      en: 'Taher Municipality',
    },
    bio: {
      ar: '',
      fr: '',
      en: '',
    },
    image: '/images/WhatsApp Image 2026-11-06 at 02.45.33 (6).jpeg',
  },
  {
    id: 'candidate-10',
    number: 10,
    name: {
      ar: 'المترشح 10',
      fr: 'Candidat 10',
      en: 'Candidate 10',
    },
    profession: {
      ar: '',
      fr: '',
      en: '',
    },
    commune: {
      ar: 'بلدية الطاهير',
      fr: 'Commune de Taher',
      en: 'Taher Municipality',
    },
    bio: {
      ar: '',
      fr: '',
      en: '',
    },
    image: '/images/WhatsApp Image 2026-11-06 at 02.45.33 (7).jpeg',
  },
  {
    id: 'candidate-11',
    number: 11,
    name: {
      ar: 'المترشح 11',
      fr: 'Candidat 11',
      en: 'Candidate 11',
    },
    profession: {
      ar: '',
      fr: '',
      en: '',
    },
    commune: {
      ar: 'بلدية الطاهير',
      fr: 'Commune de Taher',
      en: 'Taher Municipality',
    },
    bio: {
      ar: '',
      fr: '',
      en: '',
    },
    image: '/images/WhatsApp Image 2026-11-06 at 02.45.33 (8).jpeg',
  },
  {
    id: 'candidate-12',
    number: 12,
    name: {
      ar: 'المترشح 12',
      fr: 'Candidat 12',
      en: 'Candidate 12',
    },
    profession: {
      ar: '',
      fr: '',
      en: '',
    },
    commune: {
      ar: 'بلدية الطاهير',
      fr: 'Commune de Taher',
      en: 'Taher Municipality',
    },
    bio: {
      ar: '',
      fr: '',
      en: '',
    },
    image: '/images/WhatsApp Image 2026-11-06 at 02.45.34.jpeg',
  },
  {
    id: 'candidate-13',
    number: 13,
    name: {
      ar: 'المترشح 13',
      fr: 'Candidat 13',
      en: 'Candidate 13',
    },
    profession: {
      ar: '',
      fr: '',
      en: '',
    },
    commune: {
      ar: 'بلدية الطاهير',
      fr: 'Commune de Taher',
      en: 'Taher Municipality',
    },
    bio: {
      ar: '',
      fr: '',
      en: '',
    },
    image: '/images/WhatsApp Image 2026-11-06 at 02.45.34 (1).jpeg',
  },
  {
    id: 'candidate-14',
    number: 14,
    name: {
      ar: 'المترشح 14',
      fr: 'Candidat 14',
      en: 'Candidate 14',
    },
    profession: {
      ar: '',
      fr: '',
      en: '',
    },
    commune: {
      ar: 'بلدية الطاهير',
      fr: 'Commune de Taher',
      en: 'Taher Municipality',
    },
    bio: {
      ar: '',
      fr: '',
      en: '',
    },
    image: '/images/WhatsApp Image 2026-11-06 at 02.45.34 (2).jpeg',
  },
  {
    id: 'candidate-15',
    number: 15,
    name: {
      ar: 'المترشح 15',
      fr: 'Candidat 15',
      en: 'Candidate 15',
    },
    profession: {
      ar: '',
      fr: '',
      en: '',
    },
    commune: {
      ar: 'بلدية الطاهير',
      fr: 'Commune de Taher',
      en: 'Taher Municipality',
    },
    bio: {
      ar: '',
      fr: '',
      en: '',
    },
    image: '/images/WhatsApp Image 2026-11-06 at 02.45.34 (3).jpeg',
  },
  {
    id: 'candidate-16',
    number: 16,
    name: {
      ar: 'المترشح 16',
      fr: 'Candidat 16',
      en: 'Candidate 16',
    },
    profession: {
      ar: '',
      fr: '',
      en: '',
    },
    commune: {
      ar: 'بلدية الطاهير',
      fr: 'Commune de Taher',
      en: 'Taher Municipality',
    },
    bio: {
      ar: '',
      fr: '',
      en: '',
    },
    image: '/images/WhatsApp Image 2026-11-06 at 02.45.34 (4).jpeg',
  },
  {
    id: 'candidate-17',
    number: 17,
    name: {
      ar: 'المترشح 17',
      fr: 'Candidat 17',
      en: 'Candidate 17',
    },
    profession: {
      ar: '',
      fr: '',
      en: '',
    },
    commune: {
      ar: 'بلدية الطاهير',
      fr: 'Commune de Taher',
      en: 'Taher Municipality',
    },
    bio: {
      ar: '',
      fr: '',
      en: '',
    },
    image: '/images/WhatsApp Image 2026-11-06 at 02.45.34 (5).jpeg',
  },
  {
    id: 'candidate-18',
    number: 18,
    name: {
      ar: 'المترشح 18',
      fr: 'Candidat 18',
      en: 'Candidate 18',
    },
    profession: {
      ar: '',
      fr: '',
      en: '',
    },
    commune: {
      ar: 'بلدية الطاهير',
      fr: 'Commune de Taher',
      en: 'Taher Municipality',
    },
    bio: {
      ar: '',
      fr: '',
      en: '',
    },
    image: '/images/WhatsApp Image 2026-11-06 at 02.45.34 (6).jpeg',
  },
  {
    id: 'candidate-19',
    number: 19,
    name: {
      ar: 'المترشح 19',
      fr: 'Candidat 19',
      en: 'Candidate 19',
    },
    profession: {
      ar: '',
      fr: '',
      en: '',
    },
    commune: {
      ar: 'بلدية الطاهير',
      fr: 'Commune de Taher',
      en: 'Taher Municipality',
    },
    bio: {
      ar: '',
      fr: '',
      en: '',
    },
    image: '/images/WhatsApp Image 2026-11-06 at 02.45.34 (7).jpeg',
  },
  {
    id: 'candidate-20',
    number: 20,
    name: {
      ar: 'المترشح 20',
      fr: 'Candidat 20',
      en: 'Candidate 20',
    },
    profession: {
      ar: '',
      fr: '',
      en: '',
    },
    commune: {
      ar: 'بلدية الطاهير',
      fr: 'Commune de Taher',
      en: 'Taher Municipality',
    },
    bio: {
      ar: '',
      fr: '',
      en: '',
    },
    image: '/images/WhatsApp Image 2026-11-06 at 02.45.34 (8).jpeg',
  },
  {
    id: 'candidate-21',
    number: 21,
    name: {
      ar: 'المترشح 21',
      fr: 'Candidat 21',
      en: 'Candidate 21',
    },
    profession: {
      ar: '',
      fr: '',
      en: '',
    },
    commune: {
      ar: 'بلدية الطاهير',
      fr: 'Commune de Taher',
      en: 'Taher Municipality',
    },
    bio: {
      ar: '',
      fr: '',
      en: '',
    },
    image: '/images/WhatsApp Image 2026-11-06 at 02.45.34 (9).jpeg',
  },
  {
    id: 'candidate-22',
    number: 22,
    name: {
      ar: 'المترشح 22',
      fr: 'Candidat 22',
      en: 'Candidate 22',
    },
    profession: {
      ar: '',
      fr: '',
      en: '',
    },
    commune: {
      ar: 'بلدية الطاهير',
      fr: 'Commune de Taher',
      en: 'Taher Municipality',
    },
    bio: {
      ar: '',
      fr: '',
      en: '',
    },
    image: '/images/WhatsApp Image 2026-11-06 at 02.45.34 (10).jpeg',
  },
  {
    id: 'candidate-23',
    number: 23,
    name: {
      ar: 'المترشح 23',
      fr: 'Candidat 23',
      en: 'Candidate 23',
    },
    profession: {
      ar: '',
      fr: '',
      en: '',
    },
    commune: {
      ar: 'بلدية الطاهير',
      fr: 'Commune de Taher',
      en: 'Taher Municipality',
    },
    bio: {
      ar: '',
      fr: '',
      en: '',
    },
    image: '/images/WhatsApp Image 2026-11-06 at 02.45.34 (11).jpeg',
  },
  {
    id: 'candidate-24',
    number: 24,
    name: {
      ar: 'المترشح 24',
      fr: 'Candidat 24',
      en: 'Candidate 24',
    },
    profession: {
      ar: '',
      fr: '',
      en: '',
    },
    commune: {
      ar: 'بلدية الطاهير',
      fr: 'Commune de Taher',
      en: 'Taher Municipality',
    },
    bio: {
      ar: '',
      fr: '',
      en: '',
    },
    image: '/images/WhatsApp Image 2026-11-06 at 02.45.34 (12).jpeg',
  },
  {
    id: 'candidate-25',
    number: 25,
    name: {
      ar: 'المترشح 25',
      fr: 'Candidat 25',
      en: 'Candidate 25',
    },
    profession: {
      ar: '',
      fr: '',
      en: '',
    },
    commune: {
      ar: 'بلدية الطاهير',
      fr: 'Commune de Taher',
      en: 'Taher Municipality',
    },
    bio: {
      ar: '',
      fr: '',
      en: '',
    },
    image: '/images/WhatsApp Image 2026-11-06 at 02.45.34 (13).jpeg',
  },
  {
    id: 'candidate-26',
    number: 26,
    name: {
      ar: 'المترشح 26',
      fr: 'Candidat 26',
      en: 'Candidate 26',
    },
    profession: {
      ar: '',
      fr: '',
      en: '',
    },
    commune: {
      ar: 'بلدية الطاهير',
      fr: 'Commune de Taher',
      en: 'Taher Municipality',
    },
    bio: {
      ar: '',
      fr: '',
      en: '',
    },
    image: '/images/WhatsApp Image 2026-11-06 at 02.45.34 (14).jpeg',
  },
  {
    id: 'candidate-27',
    number: 27,
    name: {
      ar: 'المترشح 27',
      fr: 'Candidat 27',
      en: 'Candidate 27',
    },
    profession: {
      ar: '',
      fr: '',
      en: '',
    },
    commune: {
      ar: 'بلدية الطاهير',
      fr: 'Commune de Taher',
      en: 'Taher Municipality',
    },
    bio: {
      ar: '',
      fr: '',
      en: '',
    },
    image: '/images/WhatsApp Image 2026-11-06 at 02.45.34 (15).jpeg',
  },
  {
    id: 'candidate-28',
    number: 28,
    name: {
      ar: 'المترشح 28',
      fr: 'Candidat 28',
      en: 'Candidate 28',
    },
    profession: {
      ar: '',
      fr: '',
      en: '',
    },
    commune: {
      ar: 'بلدية الطاهير',
      fr: 'Commune de Taher',
      en: 'Taher Municipality',
    },
    bio: {
      ar: '',
      fr: '',
      en: '',
    },
    image: '/images/WhatsApp Image 2026-11-06 at 02.45.34 (16).jpeg',
  },
  {
    id: 'candidate-29',
    number: 29,
    name: {
      ar: 'المترشح 29',
      fr: 'Candidat 29',
      en: 'Candidate 29',
    },
    profession: {
      ar: '',
      fr: '',
      en: '',
    },
    commune: {
      ar: 'بلدية الطاهير',
      fr: 'Commune de Taher',
      en: 'Taher Municipality',
    },
    bio: {
      ar: '',
      fr: '',
      en: '',
    },
    image: '/images/WhatsApp Image 2026-11-06 at 02.45.34 (17).jpeg',
  },
  {
    id: 'candidate-30',
    number: 30,
    name: {
      ar: 'المترشح 30',
      fr: 'Candidat 30',
      en: 'Candidate 30',
    },
    profession: {
      ar: '',
      fr: '',
      en: '',
    },
    commune: {
      ar: 'بلدية الطاهير',
      fr: 'Commune de Taher',
      en: 'Taher Municipality',
    },
    bio: {
      ar: '',
      fr: '',
      en: '',
    },
    image: '/images/WhatsApp Image 2026-11-06 at 02.45.34 (18).jpeg',
  },
  {
    id: 'candidate-31',
    number: 31,
    name: {
      ar: 'المترشح 31',
      fr: 'Candidat 31',
      en: 'Candidate 31',
    },
    profession: {
      ar: '',
      fr: '',
      en: '',
    },
    commune: {
      ar: 'بلدية الطاهير',
      fr: 'Commune de Taher',
      en: 'Taher Municipality',
    },
    bio: {
      ar: '',
      fr: '',
      en: '',
    },
    image: '/images/WhatsApp Image 2026-11-06 at 02.45.34 (19).jpeg',
  },
  {
    id: 'candidate-32',
    number: 32,
    name: {
      ar: 'المترشح 32',
      fr: 'Candidat 32',
      en: 'Candidate 32',
    },
    profession: {
      ar: '',
      fr: '',
      en: '',
    },
    commune: {
      ar: 'بلدية الطاهير',
      fr: 'Commune de Taher',
      en: 'Taher Municipality',
    },
    bio: {
      ar: '',
      fr: '',
      en: '',
    },
    image: '/images/WhatsApp Image 2026-11-06 at 02.45.34 (20).jpeg',
  },
  {
    id: 'candidate-33',
    number: 33,
    name: {
      ar: 'المترشح 33',
      fr: 'Candidat 33',
      en: 'Candidate 33',
    },
    profession: {
      ar: '',
      fr: '',
      en: '',
    },
    commune: {
      ar: 'بلدية الطاهير',
      fr: 'Commune de Taher',
      en: 'Taher Municipality',
    },
    bio: {
      ar: '',
      fr: '',
      en: '',
    },
    image: '/images/WhatsApp Image 2026-11-06 at 02.45.34 (21).jpeg',
  },
  {
    id: 'candidate-34',
    number: 34,
    name: {
      ar: 'المترشح 34',
      fr: 'Candidat 34',
      en: 'Candidate 34',
    },
    profession: {
      ar: '',
      fr: '',
      en: '',
    },
    commune: {
      ar: 'بلدية الطاهير',
      fr: 'Commune de Taher',
      en: 'Taher Municipality',
    },
    bio: {
      ar: '',
      fr: '',
      en: '',
    },
    image: '/images/WhatsApp Image 2026-11-06 at 02.45.34 (22).jpeg',
  },
  {
    id: 'candidate-35',
    number: 35,
    name: {
      ar: 'المترشح 35',
      fr: 'Candidat 35',
      en: 'Candidate 35',
    },
    profession: {
      ar: '',
      fr: '',
      en: '',
    },
    commune: {
      ar: 'بلدية الطاهير',
      fr: 'Commune de Taher',
      en: 'Taher Municipality',
    },
    bio: {
      ar: '',
      fr: '',
      en: '',
    },
    image: '/images/WhatsApp Image 2026-11-06 at 02.45.34 (23).jpeg',
  },
  {
    id: 'candidate-36',
    number: 36,
    name: {
      ar: 'المترشح 36',
      fr: 'Candidat 36',
      en: 'Candidate 36',
    },
    profession: {
      ar: '',
      fr: '',
      en: '',
    },
    commune: {
      ar: 'بلدية الطاهير',
      fr: 'Commune de Taher',
      en: 'Taher Municipality',
    },
    bio: {
      ar: '',
      fr: '',
      en: '',
    },
    image: '/images/WhatsApp Image 2026-11-06 at 02.45.34 (24).jpeg',
  },
  {
    id: 'candidate-37',
    number: 37,
    name: {
      ar: 'المترشح 37',
      fr: 'Candidat 37',
      en: 'Candidate 37',
    },
    profession: {
      ar: '',
      fr: '',
      en: '',
    },
    commune: {
      ar: 'بلدية الطاهير',
      fr: 'Commune de Taher',
      en: 'Taher Municipality',
    },
    bio: {
      ar: '',
      fr: '',
      en: '',
    },
    image: '/images/WhatsApp Image 2026-11-06 at 02.45.32.jpeg',
  },
  {
    id: 'candidate-38',
    number: 38,
    name: {
      ar: 'المترشح 38',
      fr: 'Candidat 38',
      en: 'Candidate 38',
    },
    profession: {
      ar: '',
      fr: '',
      en: '',
    },
    commune: {
      ar: 'بلدية الطاهير',
      fr: 'Commune de Taher',
      en: 'Taher Municipality',
    },
    bio: {
      ar: '',
      fr: '',
      en: '',
    },
    image: '/images/WhatsApp Image 2026-11-06 at 02.45.32 (1).jpeg',
  },
  {
    id: 'candidate-39',
    number: 39,
    name: {
      ar: 'المترشح 39',
      fr: 'Candidat 39',
      en: 'Candidate 39',
    },
    profession: {
      ar: '',
      fr: '',
      en: '',
    },
    commune: {
      ar: 'بلدية الطاهير',
      fr: 'Commune de Taher',
      en: 'Taher Municipality',
    },
    bio: {
      ar: '',
      fr: '',
      en: '',
    },
    image: '/images/WhatsApp Image 2026-11-06 at 02.45.32 (2).jpeg',
  },
  {
    id: 'candidate-40',
    number: 40,
    name: {
      ar: 'المترشح 40',
      fr: 'Candidat 40',
      en: 'Candidate 40',
    },
    profession: {
      ar: '',
      fr: '',
      en: '',
    },
    commune: {
      ar: 'بلدية الطاهير',
      fr: 'Commune de Taher',
      en: 'Taher Municipality',
    },
    bio: {
      ar: '',
      fr: '',
      en: '',
    },
    image: '/images/WhatsApp Image 2026-11-06 at 02.45.32 (3).jpeg',
  },
];
