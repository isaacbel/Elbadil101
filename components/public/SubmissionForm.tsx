'use client';

import React, { useState, useEffect } from 'react';
import { useI18n } from '@/lib/i18n';
import { requestTypes } from '@/lib/validations';
import { CAMPAIGN_LOCATION } from '@/lib/constants';
import {
  FileText,
  AlertCircle,
  CheckCircle2,
  Copy,
  Check,
  Loader2,
  Lock,
  Lightbulb,
  ShieldAlert,
  MapPin,
  Building,
  Info,
} from 'lucide-react';

export default function SubmissionForm() {
  const { locale, t } = useI18n();

  // Timestamp on mount to detect bot instant submissions
  const [mountTime, setMountTime] = useState<number>(0);

  useEffect(() => {
    setMountTime(Date.now());
  }, []);

  // Form State (NO name, email, phone collected)
  const [formData, setFormData] = useState({
    organization: '',
    type: 'General Information' as (typeof requestTypes)[number],
    subject: '',
    description: '',
    priority: 'Medium' as 'Low' | 'Medium' | 'High',
    consent: false,
    website: '', // honeypot
    // Complaint fields (anonymous)
    complaintCategory: 'public_services',
    concernedParty: '',
    incidentDate: '',
    // Suggestion fields
    suggestionTitle: '',
    expectedImprovement: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [referenceId, setReferenceId] = useState('');
  const [copiedRef, setCopiedRef] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validate = () => {
    const errors: Record<string, string> = {};

    if (!formData.subject.trim() || formData.subject.trim().length < 3) {
      errors.subject =
        locale === 'ar'
          ? 'يرجى إدخال موضوع المراسلة (3 أحرف على الأقل)'
          : locale === 'fr'
          ? 'Objet de la requête obligatoire (min. 3 caractères)'
          : 'Subject is required (min. 3 characters)';
    }
    if (!formData.description.trim() || formData.description.trim().length < 10) {
      errors.description =
        locale === 'ar'
          ? 'يرجى كتابة نص المراسلة بالتفصيل (10 أحرف على الأقل)'
          : locale === 'fr'
          ? 'Description détaillée obligatoire (min. 10 caractères)'
          : 'Detailed description required (min. 10 characters)';
    }
    if (!formData.consent) {
      errors.consent =
        locale === 'ar'
          ? 'الموافقة على شروط المراسلة إلزامية'
          : locale === 'fr'
          ? 'Consentement obligatoire'
          : 'Consent is required';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('loading');
    setErrorMessage('');

    try {
      const idempotencyKey = `sub_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          wilaya: CAMPAIGN_LOCATION.storageWilaya,
          commune: CAMPAIGN_LOCATION.storageCommune,
          idempotencyKey,
          clientDurationMs: mountTime ? Math.max(0, Date.now() - mountTime) : 3000,
          formStartTime: mountTime || Date.now(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || t('common.error'));
        setStatus('error');
        return;
      }

      setReferenceId(data.referenceId);
      setStatus('success');
    } catch {
      setErrorMessage(t('common.error'));
      setStatus('error');
    }
  };

  const copyRefToClipboard = async () => {
    if (!referenceId) return;
    try {
      await navigator.clipboard.writeText(referenceId);
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 3000);
    } catch {
      // fallback
    }
  };

  const resetForm = () => {
    setStatus('idle');
    setReferenceId('');
    setFormData({
      organization: '',
      type: 'General Information',
      subject: '',
      description: '',
      priority: 'Medium',
      consent: false,
      website: '',
      complaintCategory: 'public_services',
      concernedParty: '',
      incidentDate: '',
      suggestionTitle: '',
      expectedImprovement: '',
    });
    setMountTime(Date.now());
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-sand text-ink scroll-mt-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-3.5 py-1 rounded-full bg-teal/10 text-teal font-semibold text-xs tracking-wider uppercase mb-3">
            {t('citizenForm.eyebrow')}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-teal mb-4">
            {t('citizenForm.title')}
          </h2>
          <p className="text-muted text-base leading-relaxed">
            {t('citizenForm.subtitle')}
          </p>
        </div>

        {/* Card Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-12 shadow-editorial border border-line relative">
          {status === 'success' ? (
            /* Success View with Unique Reference ID */
            <div className="text-center py-10 space-y-6">
              <div className="w-16 h-16 rounded-full bg-green-brand/10 text-green-brand flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-teal">
                  {t('citizenForm.successTitle')}
                </h3>
                <p className="text-muted max-w-md mx-auto text-sm sm:text-base">
                  {t('citizenForm.successDesc')}
                </p>
              </div>

              {/* Reference ID Card */}
              <div className="inline-flex flex-col sm:flex-row items-center gap-3 p-4 px-6 rounded-2xl bg-teal/5 border border-teal/20 shadow-sm mx-auto">
                <span className="font-mono text-2xl sm:text-3xl font-bold text-teal tracking-wider select-all">
                  {referenceId}
                </span>
                <button
                  type="button"
                  onClick={copyRefToClipboard}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal hover:bg-deep text-sand text-xs font-semibold transition-all active:scale-95"
                >
                  {copiedRef ? (
                    <>
                      <Check className="w-4 h-4 text-wheat" />
                      <span>{t('citizenForm.copied')}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>{t('citizenForm.copyRef')}</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-xs text-muted max-w-md mx-auto">
                {t('citizenForm.saveRefNotice')}
              </p>

              <div className="pt-6">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 rounded-full border border-line hover:bg-sand/60 text-ink text-sm font-medium transition-colors"
                >
                  {t('citizenForm.newSubmission')}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-10">
              {/* Error Banner */}
              {status === 'error' && errorMessage && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 flex items-start gap-3 text-sm">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-600" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Honeypot field (hidden from screen, protected against browser autofill) */}
              <div
                style={{ display: 'none', position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }}
                aria-hidden="true"
              >
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="new-password"
                  value={formData.website}
                  onChange={handleInputChange}
                />
              </div>

              {/* SECTION A: Fixed Location & Organization */}
              <div className="space-y-5">
                <div className="border-b border-line pb-3 flex items-center justify-between">
                  <h3 className="font-serif text-lg font-bold text-teal flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-brand" />
                    <span>{locale === 'ar' ? 'أ. الدائرة الانتخابية والجهة' : locale === 'fr' ? 'A. Circonscription & Organisation' : 'A. Constituency & Organization'}</span>
                  </h3>
                  <span className="text-[11px] text-muted flex items-center gap-1 bg-sand/60 px-2.5 py-1 rounded-full border border-line">
                    <Lock className="w-3 h-3 text-teal" />
                    <span>{locale === 'ar' ? 'الموقع محدد ومثبت' : locale === 'fr' ? 'Lieu vérifié' : 'Locked Location'}</span>
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Locked Wilaya */}
                  <div>
                    <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-2">
                      {locale === 'ar' ? 'الولاية' : 'Wilaya'}
                    </label>
                    <div className="w-full px-4 py-3 rounded-xl border border-line bg-sand/30 text-ink flex items-center justify-between text-sm select-none">
                      <span className="font-medium flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-teal" />
                        {CAMPAIGN_LOCATION.wilaya[locale]}
                      </span>
                      <Lock className="w-3.5 h-3.5 text-muted opacity-70" />
                    </div>
                  </div>

                  {/* Locked Commune */}
                  <div>
                    <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-2">
                      {locale === 'ar' ? 'البلدية' : 'Commune'}
                    </label>
                    <div className="w-full px-4 py-3 rounded-xl border border-line bg-sand/30 text-ink flex items-center justify-between text-sm select-none">
                      <span className="font-medium flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-teal" />
                        {CAMPAIGN_LOCATION.commune[locale]}
                      </span>
                      <Lock className="w-3.5 h-3.5 text-muted opacity-70" />
                    </div>
                  </div>

                  {/* Optional Organization */}
                  <div>
                    <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-2">
                      {locale === 'ar' ? 'الجمعية / الهيئة' : 'Association / Organisme'}{' '}
                      <span className="text-muted font-normal">({t('common.optional')})</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="organization"
                        value={formData.organization}
                        onChange={handleInputChange}
                        placeholder={locale === 'ar' ? 'اسم الهيئة أو الجمعية (إن وجد)' : 'Nom de l’association (facultatif)'}
                        className="w-full px-4 py-3 rounded-xl border border-line focus:outline-none focus:ring-2 focus:ring-teal bg-white text-ink transition-all text-sm"
                      />
                      <Building className="w-4 h-4 text-muted absolute end-3.5 top-3.5 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION B: Request Type */}
              <div className="space-y-4">
                <div className="border-b border-line pb-3">
                  <h3 className="font-serif text-lg font-bold text-teal flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-brand" />
                    <span>{t('citizenForm.sectionB')}</span> <span className="text-red-600">*</span>
                  </h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {requestTypes.map((reqType) => {
                    const isSelected = formData.type === reqType;
                    return (
                      <button
                        key={reqType}
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, type: reqType }))}
                        className={`p-3 rounded-xl border text-xs font-semibold text-start transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-teal text-sand border-teal shadow-md'
                            : 'bg-white hover:bg-sand/60 text-ink border-line'
                        }`}
                      >
                        <span>{t(`citizenForm.types.${reqType}`)}</span>
                        {reqType === 'Complaint' && <ShieldAlert className="w-3.5 h-3.5 text-wheat" />}
                        {reqType === 'Suggestion' && <Lightbulb className="w-3.5 h-3.5 text-wheat" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* SECTION C: Submission Details */}
              <div className="space-y-5">
                <div className="border-b border-line pb-3">
                  <h3 className="font-serif text-lg font-bold text-teal flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-brand" />
                    <span>{t('citizenForm.sectionC')}</span>
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  {/* Subject */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-2">
                      {t('citizenForm.subject')} <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="subject"
                      required
                      maxLength={160}
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder={t('citizenForm.subjectPlaceholder')}
                      className={`w-full px-4 py-3 rounded-xl border ${
                        fieldErrors.subject ? 'border-red-500 ring-1 ring-red-500' : 'border-line'
                      } focus:outline-none focus:ring-2 focus:ring-teal bg-white text-ink transition-all text-sm`}
                    />
                    {fieldErrors.subject && (
                      <p className="mt-1.5 text-xs text-red-600 font-medium">{fieldErrors.subject}</p>
                    )}
                  </div>

                  {/* Priority */}
                  <div>
                    <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-2">
                      {t('citizenForm.priority')}
                    </label>
                    <select
                      name="priority"
                      value={formData.priority}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-line focus:outline-none focus:ring-2 focus:ring-teal bg-white text-ink transition-all text-sm"
                    >
                      <option value="Medium">{t('citizenForm.priorities.Medium')}</option>
                      <option value="Low">{t('citizenForm.priorities.Low')}</option>
                      <option value="High">{t('citizenForm.priorities.High')}</option>
                    </select>
                  </div>
                </div>

                {/* Detailed Description with Live Counter and Mandatory Anonymity Notice */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-semibold text-ink uppercase tracking-wider">
                      {t('citizenForm.description')} <span className="text-red-600">*</span>
                    </label>
                    <span className="text-xs text-muted">
                      {formData.description.length} / 3000 {t('citizenForm.counter')}
                    </span>
                  </div>

                  <textarea
                    name="description"
                    required
                    rows={5}
                    maxLength={3000}
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder={t('citizenForm.descriptionPlaceholder')}
                    className={`w-full p-4 rounded-xl border ${
                      fieldErrors.description ? 'border-red-500 ring-1 ring-red-500' : 'border-line'
                    } focus:outline-none focus:ring-2 focus:ring-teal bg-white text-ink transition-all text-sm`}
                  />

                  {/* Mandatory Anonymity and No Personal Data Notice */}
                  <div className="mt-2.5 p-3.5 rounded-xl bg-sand/70 border border-line text-xs text-ink/85 flex items-start gap-2.5 leading-relaxed">
                    <Info className="w-4 h-4 text-teal flex-shrink-0 mt-0.5" />
                    <span>
                      {locale === 'ar'
                        ? 'تنبيه: يُرجى عدم كتابة أي معطيات شخصية (مثل الاسم، رقم الهاتف، أو أرقام الهوية) في نص الرسالة. لا تجمع هذه الاستمارة أي بيانات تعريفية، وبالتالي لا يمكن للمكتب الرد الشخصي المباشر.'
                        : locale === 'fr'
                        ? 'Avis : Veuillez ne pas inclure de données personnelles (nom, téléphone, pièces d’identité) dans votre texte. Ce formulaire étant strictement anonyme, aucune réponse directe individuelle ne pourra être transmise.'
                        : 'Notice: Please do not include personal data (name, phone, identity numbers) in your message. As this submission is strictly anonymous, the office cannot send direct individual replies.'}
                    </span>
                  </div>

                  {fieldErrors.description && (
                    <p className="mt-1.5 text-xs text-red-600 font-medium">{fieldErrors.description}</p>
                  )}
                </div>
              </div>

              {/* SECTION D: Complaint-Only Fields (Anonymous) */}
              {formData.type === 'Complaint' && (
                <div className="p-6 rounded-2xl bg-sand/50 border border-line space-y-5 animate-fade-in">
                  <div className="border-b border-line pb-3 flex items-center justify-between">
                    <h3 className="font-serif text-lg font-bold text-teal flex items-center gap-2">
                      <ShieldAlert className="w-5 h-5 text-red-600" />
                      <span>{t('citizenForm.sectionD')}</span>
                    </h3>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-red-600 text-white font-medium">
                      {locale === 'ar' ? 'شكوى رسمية' : 'Doléance'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    {/* Complaint Category */}
                    <div>
                      <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-2">
                        {t('citizenForm.complaintCategory')}
                      </label>
                      <select
                        name="complaintCategory"
                        value={formData.complaintCategory}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-line focus:outline-none focus:ring-2 focus:ring-teal bg-white text-ink transition-all text-sm"
                      >
                        <option value="public_services">{t('citizenForm.complaintCategories.public_services')}</option>
                        <option value="local_infrastructure">{t('citizenForm.complaintCategories.local_infrastructure')}</option>
                        <option value="administrative_delay">{t('citizenForm.complaintCategories.administrative_delay')}</option>
                        <option value="social_housing">{t('citizenForm.complaintCategories.social_housing')}</option>
                        <option value="other">{t('citizenForm.complaintCategories.other')}</option>
                      </select>
                    </div>

                    {/* Department or Entity Concerned */}
                    <div>
                      <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-2">
                        {t('citizenForm.concernedParty')}
                      </label>
                      <input
                        type="text"
                        name="concernedParty"
                        value={formData.concernedParty}
                        onChange={handleInputChange}
                        placeholder={locale === 'ar' ? 'مثال: مديرية الأشغال، مصلحة...' : 'Direction / Service concerné'}
                        className="w-full px-4 py-3 rounded-xl border border-line focus:outline-none focus:ring-2 focus:ring-teal bg-white text-ink transition-all text-sm"
                      />
                    </div>

                    {/* Incident Date */}
                    <div>
                      <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-2">
                        {t('citizenForm.incidentDate')}
                      </label>
                      <input
                        type="date"
                        name="incidentDate"
                        value={formData.incidentDate}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-line focus:outline-none focus:ring-2 focus:ring-teal bg-white text-ink transition-all text-sm"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* SECTION E: Suggestion-Only Fields */}
              {formData.type === 'Suggestion' && (
                <div className="p-6 rounded-2xl bg-sand/50 border border-line space-y-5 animate-fade-in">
                  <div className="border-b border-line pb-3 flex items-center justify-between">
                    <h3 className="font-serif text-lg font-bold text-teal flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-green-brand" />
                      <span>{t('citizenForm.sectionE')}</span>
                    </h3>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-teal text-sand font-medium">
                      {locale === 'ar' ? 'اقتراح بناء' : 'Proposition'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-2">
                        {t('citizenForm.suggestionTitle')}
                      </label>
                      <input
                        type="text"
                        name="suggestionTitle"
                        value={formData.suggestionTitle}
                        onChange={handleInputChange}
                        placeholder={locale === 'ar' ? 'عنوان الاقتراح أو المشروع' : 'Titre du projet / proposition'}
                        className="w-full px-4 py-3 rounded-xl border border-line focus:outline-none focus:ring-2 focus:ring-teal bg-white text-ink transition-all text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-2">
                        {t('citizenForm.expectedImprovement')}
                      </label>
                      <input
                        type="text"
                        name="expectedImprovement"
                        value={formData.expectedImprovement}
                        onChange={handleInputChange}
                        placeholder={locale === 'ar' ? 'الأثر المرجو على البلدية أو المواطنين' : 'Impact attendu'}
                        className="w-full px-4 py-3 rounded-xl border border-line focus:outline-none focus:ring-2 focus:ring-teal bg-white text-ink transition-all text-sm"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Consent Checkbox: Explicitly Notes No Identity Collected */}
              <div>
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleInputChange}
                    className="mt-1 w-4 h-4 rounded text-teal focus:ring-teal border-line"
                  />
                  <span className="text-xs text-ink/80 leading-relaxed">
                    {locale === 'ar'
                      ? 'أؤكد صحة المراسلة وأوافق على دراستها ومتابعتها مؤسساتياً. أعلم أن المنصة لا تجمع اسمي أو هاتفي أو بريدي الإلكتروني وفقاً لـ'
                      : locale === 'fr'
                      ? 'Je confirme l’exactitude de ce message et consens à son examen institutionnel. Je prends acte qu’aucune donnée d’identité n’est collectée, conformément à notre '
                      : 'I certify the authenticity of this submission and consent to its review. I acknowledge that no personal identity is collected, in accordance with our '}
                    <a href="/privacy" className="text-teal hover:underline font-semibold" target="_blank" rel="noreferrer">
                      {locale === 'ar' ? 'سياسة الخصوصية' : locale === 'fr' ? 'politique de confidentialité' : 'privacy policy'}
                    </a>
                    .
                  </span>
                </label>
                {fieldErrors.consent && (
                  <p className="mt-1 text-xs text-red-600 font-medium">{fieldErrors.consent}</p>
                )}
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-4 px-6 rounded-full bg-teal hover:bg-deep text-sand font-semibold text-base transition-all duration-200 shadow-elevated hover:shadow-2xl active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>{t('citizenForm.submitting')}</span>
                    </>
                  ) : (
                    <span>{t('citizenForm.submit')}</span>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
