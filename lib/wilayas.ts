export interface Wilaya {
  code: string;
  ar: string;
  fr: string;
  en: string;
}

export const wilayasList: Wilaya[] = [
  { code: '01', ar: 'أدرار', fr: 'Adrar', en: 'Adrar' },
  { code: '02', ar: 'الشلف', fr: 'Chlef', en: 'Chlef' },
  { code: '03', ar: 'الأغواط', fr: 'Laghouat', en: 'Laghouat' },
  { code: '04', ar: 'أم البواقي', fr: 'Oum El Bouaghi', en: 'Oum El Bouaghi' },
  { code: '05', ar: 'باتنة', fr: 'Batna', en: 'Batna' },
  { code: '06', ar: 'بجاية', fr: 'Béjaïa', en: 'Bejaia' },
  { code: '07', ar: 'بسكرة', fr: 'Biskra', en: 'Biskra' },
  { code: '08', ar: 'بشار', fr: 'Béchar', en: 'Bechar' },
  { code: '09', ar: 'البليدة', fr: 'Blida', en: 'Blida' },
  { code: '10', ar: 'البويرة', fr: 'Bouira', en: 'Bouira' },
  { code: '11', ar: 'تمنراست', fr: 'Tamanrasset', en: 'Tamanrasset' },
  { code: '12', ar: 'تبسة', fr: 'Tébessa', en: 'Tebessa' },
  { code: '13', ar: 'تلمسان', fr: 'Tlemcen', en: 'Tlemcen' },
  { code: '14', ar: 'تيارت', fr: 'Tiaret', en: 'Tiaret' },
  { code: '15', ar: 'تيزي وزو', fr: 'Tizi Ouzou', en: 'Tizi Ouzou' },
  { code: '16', ar: 'الجزائر', fr: 'Alger', en: 'Algiers' },
  { code: '17', ar: 'الجلفة', fr: 'Djelfa', en: 'Djelfa' },
  { code: '18', ar: 'جيجل', fr: 'Jijel', en: 'Jijel' },
  { code: '19', ar: 'سطيف', fr: 'Sétif', en: 'Setif' },
  { code: '20', ar: 'سعيدة', fr: 'Saïda', en: 'Saida' },
  { code: '21', ar: 'سكيكدة', fr: 'Skikda', en: 'Skikda' },
  { code: '22', ar: 'سيدي بلعباس', fr: 'Sidi Bel Abbès', en: 'Sidi Bel Abbes' },
  { code: '23', ar: 'عنابة', fr: 'Annaba', en: 'Annaba' },
  { code: '24', ar: 'قالمة', fr: 'Guelma', en: 'Guelma' },
  { code: '25', ar: 'قسنطينة', fr: 'Constantine', en: 'Constantine' },
  { code: '26', ar: 'المدية', fr: 'Médéa', en: 'Medea' },
  { code: '27', ar: 'مستغانم', fr: 'Mostaganem', en: 'Mostaganem' },
  { code: '28', ar: 'المسيلة', fr: 'M’Sila', en: 'MSila' },
  { code: '29', ar: 'معسكر', fr: 'Mascara', en: 'Mascara' },
  { code: '30', ar: 'ورقلة', fr: 'Ouargla', en: 'Ouargla' },
  { code: '31', ar: 'وهران', fr: 'Oran', en: 'Oran' },
  { code: '32', ar: 'البيض', fr: 'El Bayadh', en: 'El Bayadh' },
  { code: '33', ar: 'إليزي', fr: 'Illizi', en: 'Illizi' },
  { code: '34', ar: 'برج بوعريريج', fr: 'Bordj Bou Arréridj', en: 'Bordj Bou Arreridj' },
  { code: '35', ar: 'بومرداس', fr: 'Boumerdès', en: 'Boumerdes' },
  { code: '36', ar: 'الطارف', fr: 'El Tarf', en: 'El Tarf' },
  { code: '37', ar: 'تندوف', fr: 'Tindouf', en: 'Tindouf' },
  { code: '38', ar: 'تسمسيلت', fr: 'Tissemsilt', en: 'Tissemsilt' },
  { code: '39', ar: 'الوادي', fr: 'El Oued', en: 'El Oued' },
  { code: '40', ar: 'خنشلة', fr: 'Khenchela', en: 'Khenchela' },
  { code: '41', ar: 'سوق أهراس', fr: 'Souk Ahras', en: 'Souk Ahras' },
  { code: '42', ar: 'تيبازة', fr: 'Tipaza', en: 'Tipaza' },
  { code: '43', ar: 'ميلة', fr: 'Mila', en: 'Mila' },
  { code: '44', ar: 'عين الدفلى', fr: 'Aïn Defla', en: 'Ain Defla' },
  { code: '45', ar: 'النعامة', fr: 'Naâma', en: 'Naama' },
  { code: '46', ar: 'عين تموشنت', fr: 'Aïn Témouchent', en: 'Ain Temouchent' },
  { code: '47', ar: 'غرداية', fr: 'Ghardaïa', en: 'Ghardaia' },
  { code: '48', ar: 'غليزان', fr: 'Relizane', en: 'Relizane' },
  { code: '49', ar: 'تيميمون', fr: 'Timimoun', en: 'Timimoun' },
  { code: '50', ar: 'برج باجي مختار', fr: 'Bordj Badji Mokhtar', en: 'Bordj Badji Mokhtar' },
  { code: '51', ar: 'أولاد جلال', fr: 'Ouled Djellal', en: 'Ouled Djellal' },
  { code: '52', ar: 'بني عباس', fr: 'Béni Abbès', en: 'Beni Abbes' },
  { code: '53', ar: 'عين صالح', fr: 'In Salah', en: 'In Salah' },
  { code: '54', ar: 'عين قزام', fr: 'In Guezzam', en: 'In Guezzam' },
  { code: '55', ar: 'تقرت', fr: 'Touggourt', en: 'Touggourt' },
  { code: '56', ar: 'جانت', fr: 'Djanet', en: 'Djanet' },
  { code: '57', ar: 'المغير', fr: 'El M’Ghair', en: 'El MGhair' },
  { code: '58', ar: 'المنيعة', fr: 'El Meniaa', en: 'El Meniaa' },
];

export const wilayas = wilayasList.map(w => `${w.code} - ${w.fr}`);

export function getWilayaLabel(codeOrName: string, locale: 'ar' | 'fr' | 'en' = 'ar'): string {
  if (!codeOrName) return '';
  const item = wilayasList.find(w => w.code === codeOrName || w.fr === codeOrName || `${w.code} - ${w.fr}` === codeOrName || w.ar === codeOrName || w.en === codeOrName);
  if (!item) return codeOrName;
  if (locale === 'ar') return `${item.code} - ${item.ar}`;
  if (locale === 'fr') return `${item.code} - ${item.fr}`;
  return `${item.code} - ${item.en}`;
}
