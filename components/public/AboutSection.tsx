'use client';

import React from 'react';
import { useI18n } from '@/lib/i18n';

export default function AboutSection() {
  const { locale } = useI18n();

  if (locale === 'ar') {
    return (
      <section id="about" className="py-20 lg:py-28 bg-white text-ink scroll-mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-3.5 py-1 rounded-full bg-teal/10 text-teal font-semibold text-xs tracking-wider uppercase mb-3">
              تعرّف علينا
            </span>
            <h2 className="font-kufam text-3xl sm:text-4xl lg:text-5xl font-bold text-teal mb-4">
              من نحن؟
            </h2>
          </div>

          <div className="space-y-6 text-base sm:text-lg leading-loose text-ink/90 text-right" dir="rtl">
            <p>
              القائمة الحرة البديل هي قائمة تضم 40 مترشحاً للمشاركة في الانتخابات المحلية لشهر نوفمبر 2026، الخاصة بالمجلس الشعبي البلدي لبلدية الطاهير، ولاية جيجل، تحت رقم 101.
            </p>
            <p>
              تجمع القائمة بين مترشحين سبق لهم خوض الانتخابات المحلية الماضية، إلى جانب مترشحين جدد، في إطار يجمع بين الخبرة والتجديد، والاستمرارية وفتح المجال أمام كفاءات وطاقات جديدة للمساهمة في الشأن المحلي.
            </p>
            <p>
              وتأتي مشاركتنا مجدداً امتداداً للمسار الذي بدأناه خلال العهدة البلدية السابقة، ورغبةً في مواصلة العمل الذي تم الشروع فيه خلال السنوات الخمس الماضية، والبناء على ما تحقق، ومواصلة متابعة الملفات والانشغالات المحلية، والعمل على تطوير الأداء وتحسين خدمة المواطن.
            </p>
            <p>
              نؤمن بأن العمل البلدي مسؤولية مستمرة، وأن خدمة بلدية الطاهير وسكانها تتطلب الالتزام، والتعاون، والاستماع لانشغالات المواطنين، والعمل بروح الفريق.
            </p>
            <div className="mt-10 pt-8 border-t border-line text-center">
              <p className="font-kufam text-xl font-bold text-teal">القائمة الحرة البديل – رقم 101</p>
              <p className="text-teal/80 font-medium mt-1">تنمية شاملة وعادلة</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (locale === 'fr') {
    return (
      <section id="about" className="py-20 lg:py-28 bg-white text-ink scroll-mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-3.5 py-1 rounded-full bg-teal/10 text-teal font-semibold text-xs tracking-wider uppercase mb-3">
              À propos
            </span>
            <h2 className="font-kufam text-3xl sm:text-4xl lg:text-5xl font-bold text-teal mb-4">
              Qui sommes-nous ?
            </h2>
          </div>
          <div className="space-y-6 text-base sm:text-lg leading-loose text-ink/90">
            <p>
              La Liste Libre Al-Badil est une liste regroupant 40 candidats pour participer aux élections locales de novembre 2026, pour l&apos;Assemblée Populaire Communale de la commune de Taher, wilaya de Jijel, sous le numéro 101.
            </p>
            <p>
              La liste réunit des candidats ayant déjà participé aux élections locales précédentes, aux côtés de nouveaux candidats, dans un cadre alliant expérience et renouveau, continuité et ouverture à de nouvelles compétences.
            </p>
            <p>
              Notre participation s&apos;inscrit dans la continuité du parcours entamé lors du précédent mandat communal, avec la volonté de poursuivre le travail engagé, de bâtir sur les acquis et d&apos;améliorer le service aux citoyens.
            </p>
            <p>
              Nous croyons que le travail communal est une responsabilité continue, et que servir la commune de Taher requiert engagement, coopération, écoute et esprit d&apos;équipe.
            </p>
            <div className="mt-10 pt-8 border-t border-line text-center">
              <p className="font-kufam text-xl font-bold text-teal">Liste Libre Al-Badil – N° 101</p>
              <p className="text-teal/80 font-medium mt-1">Un développement juste et inclusif</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // English
  return (
    <section id="about" className="py-20 lg:py-28 bg-white text-ink scroll-mt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-3.5 py-1 rounded-full bg-teal/10 text-teal font-semibold text-xs tracking-wider uppercase mb-3">
            About Us
          </span>
          <h2 className="font-kufam text-3xl sm:text-4xl lg:text-5xl font-bold text-teal mb-4">
            Who Are We?
          </h2>
        </div>
        <div className="space-y-6 text-base sm:text-lg leading-loose text-ink/90">
          <p>
            The Free List Al-Badil is a list of 40 candidates participating in the local elections of November 2026 for the Municipal People&apos;s Assembly of Taher, Jijel, under number 101.
          </p>
          <p>
            The list brings together candidates who previously participated in local elections alongside new candidates, combining experience and renewal, continuity and openness to new talent.
          </p>
          <p>
            Our participation continues the path we began during the previous municipal term, with the desire to build on what was achieved and further improve public service for citizens of Taher.
          </p>
          <p>
            We believe municipal work is an ongoing responsibility, and that serving Taher and its residents requires commitment, cooperation, listening, and teamwork.
          </p>
          <div className="mt-10 pt-8 border-t border-line text-center">
            <p className="font-kufam text-xl font-bold text-teal">Free List Al-Badil – No. 101</p>
            <p className="text-teal/80 font-medium mt-1">Fair and Inclusive Development</p>
          </div>
        </div>
      </div>
    </section>
  );
}

