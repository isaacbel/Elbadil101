'use client';

import React from 'react';
import { useI18n } from '@/lib/i18n';
import { candidate } from '@/data/content';
import LanguageSwitcher from '@/components/shared/LanguageSwitcher';
import { ArrowLeft, Shield } from 'lucide-react';

export default function PrivacyPage() {
  const { locale, dir } = useI18n();

  return (
    <div className={`min-h-screen bg-sand text-ink py-12 px-4 sm:px-6 lg:px-8 ${dir === 'rtl' ? 'font-naskh' : ''}`}>
      <div className="max-w-4xl mx-auto">
        {/* Top Bar */}
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

        {/* Content Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-card border border-line space-y-8 text-start">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-teal/10 text-teal flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-teal">
              {locale === 'ar' ? 'سياسة الخصوصية وحماية المعطيات' : 'Politique de Confidentialité et Protection des Données'}
            </h1>
            <p className="text-xs text-muted">
              {locale === 'ar' ? 'تاريخ التحديث: أكتوبر 2026 · متوافق مع التشريعات المنظمة لحماية المعطيات ذات الطابع الشخصي' : 'Mise à jour : Octobre 2026 · Conforme aux normes de protection des données'}
            </p>
          </div>

          <div className="prose max-w-none space-y-6 text-sm sm:text-base text-ink/80 leading-relaxed">
            {locale === 'ar' ? (
              <>
                <section className="space-y-2">
                  <h2 className="font-serif text-xl font-bold text-teal">1. التزامنا بحماية بياناتكم</h2>
                  <p>
                    تولي حملة القائمة الحرّة البديل 101 أهمية قصوى لحماية خصوصيتكم وحرية معطياتكم الشخصية. تُجمع البيانات حصرياً للتواصل المؤسساتي المشروع، تسجيل رغبات التطوع، ومتابعة الانشغالات والشكاوى المرفوعة إلى المكتب.
                  </p>
                </section>

                <section className="space-y-2">
                  <h2 className="font-serif text-xl font-bold text-teal">2. طبيعة المعطيات المجمعة</h2>
                  <ul className="list-disc pr-5 space-y-1">
                    <li><b>استمارة الدعم والتطوع:</b> الاسم، اللقب، الولاية، رقم الهاتف، البلدية، نية التصويت ونوع المساهمة.</li>
                    <li><b>استمارة المراسلات والشكاوى:</b> الاسم واللقب، البريد الإلكتروني، رقم الهاتف، الولاية، موضوع الطلب وتفاصيل المسألة المكتوبة.</li>
                  </ul>
                </section>

                <section className="space-y-2">
                  <h2 className="font-serif text-xl font-bold text-teal">3. نظام كتابي حصري بدون مرفقات</h2>
                  <p>
                    من أجل الحفاظ على أمن المعطيات والحد من المخاطر الإلكترونية، تعمل هذه المنصة بنظام <b>كتابي حصري (Text-Only)</b>. لا تسمح المنصة بتحميل أو تخزين أي ملفات أو صور أو وثائق إلكترونية (PDF/JPG/DOC).
                  </p>
                </section>

                <section className="space-y-2">
                  <h2 className="font-serif text-xl font-bold text-teal">4. سرية الشكاوى والتظلمات</h2>
                  <p>
                    في حال اختيار خانة «الشكوى السرية»، تُحجب بيانات هوية المشتكي عن موظفي الإدارة العامة وتكون متاحة فقط للأدوار القيادية المخولة (Super Admin) لضمان أقصى درجات الحماية والحياد.
                  </p>
                </section>

                <section className="space-y-2">
                  <h2 className="font-serif text-xl font-bold text-teal">5. حقوقكم والتواصل</h2>
                  <p>
                    يحق لكل مواطن طلب تصحيح أو حذف بياناته المسجلة عبر التواصل مع مسؤول حماية المعطيات عبر البريد الإلكتروني: <a href={`mailto:${candidate.contact.email}`} className="text-teal font-semibold underline">{candidate.contact.email}</a>.
                  </p>
                </section>
              </>
            ) : (
              <>
                <section className="space-y-2">
                  <h2 className="font-serif text-xl font-bold text-teal">1. Notre engagement</h2>
                  <p>
                    Le bureau officiel de campagne d&apos;ALBADIL 101 s&apos;engage à protéger la confidentialité et l&apos;intégrité des données personnelles communiquées par les citoyens et sympathisants.
                  </p>
                </section>

                <section className="space-y-2">
                  <h2 className="font-serif text-xl font-bold text-teal">2. Données collectées</h2>
                  <ul className="list-disc pl-5 space-y-1">
                    <li><b>Formulaire de soutien :</b> Nom, prénom, wilaya, numéro de téléphone, intention de vote et mode de participation.</li>
                    <li><b>Bureau citoyen :</b> Coordonnées, objet de la demande, texte de la requête ou doléance.</li>
                  </ul>
                </section>

                <section className="space-y-2">
                  <h2 className="font-serif text-xl font-bold text-teal">3. Système strictement textuel</h2>
                  <p>
                    Par mesure de sécurité et de sobriété, la plateforme fonctionne en <b>mode strictement textuel</b>. Aucun téléchargement de fichier (PDF, image, document) n&apos;est accepté ni stocké.
                  </p>
                </section>

                <section className="space-y-2">
                  <h2 className="font-serif text-xl font-bold text-teal">4. Confidentialité des doléances</h2>
                  <p>
                    Les réclamations signalées comme confidentielles font l&apos;objet d&apos;un masquage d&apos;identité et ne sont accessibles qu&apos;aux administrateurs habilités.
                  </p>
                </section>

                <section className="space-y-2">
                  <h2 className="font-serif text-xl font-bold text-teal">5. Vos droits</h2>
                  <p>
                    Vous disposez d&apos;un droit d&apos;accès, de rectification et de suppression de vos données sur simple demande par email à : <a href={`mailto:${candidate.contact.email}`} className="text-teal font-semibold underline">{candidate.contact.email}</a>.
                  </p>
                </section>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
