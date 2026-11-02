'use client';

import React from 'react';
import { useI18n } from '@/lib/i18n';
import { candidate } from '@/data/content';
import LanguageSwitcher from '@/components/shared/LanguageSwitcher';
import { ArrowLeft, Scale } from 'lucide-react';

export default function LegalPage() {
  const { locale, dir } = useI18n();

  return (
    <div className={`min-h-screen bg-sand text-ink py-12 px-4 sm:px-6 lg:px-8 ${dir === 'rtl' ? 'font-naskh' : ''}`}>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-line">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-teal hover:text-teal-light transition-colors"
          >
            <ArrowLeft className={`w-4 h-4 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
            <span>{locale === 'ar' ? 'العودة إلى الموقع الرئيسي' : 'Retour au site officiel'}</span>
          </a>
          <LanguageSwitcher />
        </div>

        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-card border border-line space-y-6 text-start">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-teal/10 text-teal flex items-center justify-center">
              <Scale className="w-6 h-6" />
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-teal">
              {locale === 'ar' ? 'الإشعار القانوني والمعلومات الرسمية' : 'Mentions Légales & Informations Officielles'}
            </h1>
            <p className="text-xs text-muted">
              {locale === 'ar' ? 'حملة الانتخابات الرسمية 2026 · البديل · القائمة الحرّة 101' : 'Campagne électorale officielle 2026 · ALBADIL 101'}
            </p>
          </div>

          <div className="prose max-w-none space-y-6 text-sm sm:text-base text-ink/80 leading-relaxed">
            {locale === 'ar' ? (
              <>
                <p>
                  <b>الجهة المشرفة:</b> مكتب الحملة الانتخابية والنيابية الرسمية — البديل · القائمة الحرّة 101 ({candidate.name.ar}).
                </p>
                <p>
                  <b>المقر والمداومة:</b> {candidate.contact.officeAddress.ar}.
                </p>
                <p>
                  <b>مدير النشر والموقع:</b> مدير الإعلام والاتصال بلجنة الحملة.
                </p>
                <p>
                  <b>الاتصال الإلكتروني:</b> <a href={`mailto:${candidate.contact.email}`} className="text-teal underline">{candidate.contact.email}</a> · الهاتف: {candidate.contact.phone}.
                </p>
                <p>
                  <b>الملكية الفكرية:</b> جميع المحتويات والنصوص والبيانات وشعار البديل المنشورة على هذا الموقع مخصصة لأغراض التعريف بالقائمة وبرنامجها الانتخابي.
                </p>
              </>
            ) : (
              <>
                <p>
                  <b>Éditeur du site :</b> Bureau officiel de campagne d&apos;ALBADIL 101 ({candidate.name.fr}).
                </p>
                <p>
                  <b>Permanence officielle :</b> {candidate.contact.officeAddress.fr}.
                </p>
                <p>
                  <b>Directeur de publication :</b> Direction de la communication de campagne.
                </p>
                <p>
                  <b>Contact :</b> <a href={`mailto:${candidate.contact.email}`} className="text-teal underline">{candidate.contact.email}</a> · Tél : {candidate.contact.phone}.
                </p>
                <p>
                  <b>Propriété et droits :</b> L&apos;ensemble des contenus, textes et repères de marque ALBADIL sont réservés à l&apos;usage civique et démocratique de la candidature.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
