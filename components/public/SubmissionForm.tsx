'use client';

import React, { useState, useMemo } from 'react';
import { useI18n } from '@/lib/i18n';
import { wilayasList } from '@/lib/wilayas';
import { algerianPhoneRegex, requestTypes } from '@/lib/validations';
import {
  FileText,
  AlertCircle,
  CheckCircle2,
  Copy,
  Check,
  ChevronDown,
  Loader2,
  Lock,
  Lightbulb,
  ShieldAlert,
} from 'lucide-react';

export default function SubmissionForm() {
  const { locale, t } = useI18n();

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    wilaya: '',
    commune: '',
    organization: '',
    type: 'General Information' as (typeof requestTypes)[number],
    subject: '',
    description: '',
    priority: 'Medium' as 'Low' | 'Medium' | 'High',
    consent: false,
    website: '', // honeypot
    // Complaint fields
    complaintCategory: 'public_services',
    concernedParty: '',
    incidentDate: '',
    confidential: false,
    // Suggestion fields
    suggestionTitle: '',
    expectedImprovement: '',
  });

  const [wilayaSearch, setWilayaSearch] = useState('');
  const [wilayaDropdownOpen, setWilayaDropdownOpen] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [referenceId, setReferenceId] = useState('');
  const [copiedRef, setCopiedRef] = useState(false);

  // Filtered Wilayas
  const filteredWilayas = useMemo(() => {
    if (!wilayaSearch.trim()) return wilayasList;
    const q = wilayaSearch.toLowerCase().trim();
    return wilayasList.filter(
      (w) =>
        w.code.includes(q) ||
        w.ar.toLowerCase().includes(q) ||
        w.fr.toLowerCase().includes(q) ||
        w.en.toLowerCase().includes(q)
    );
  }, [wilayaSearch]);

  const selectedWilayaObj = useMemo(() => {
    return wilayasList.find((w) => `${w.code} - ${w.fr}` === formData.wilaya || w.code === formData.wilaya);
  }, [formData.wilaya]);

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

    if (!formData.fullName.trim() || formData.fullName.trim().length < 3) {
      errors.fullName = locale === 'ar' ? 'يرجى إدخال الاسم واللقب (3 أحرف على الأقل)' : 'Veuillez saisir votre nom complet (min. 3 caractères)';
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = locale === 'ar' ? 'عنوان بريد إلكتروني غير صالح' : 'Adresse email invalide';
    }
    if (!formData.phone.trim() || !algerianPhoneRegex.test(formData.phone.trim())) {
      errors.phone = locale === 'ar' ? 'رقم هاتف جزائري غير صالح (05 / 06 / 07)' : 'Numéro algérien invalide (05 / 06 / 07)';
    }
    if (!formData.wilaya) {
      errors.wilaya = locale === 'ar' ? 'يرجى اختيار الولاية' : 'Veuillez sélectionner la wilaya';
    }
    if (!formData.subject.trim() || formData.subject.trim().length < 3) {
      errors.subject = locale === 'ar' ? 'يرجى إدخال موضوع الطلب' : 'Objet du dossier obligatoire';
    }
    if (!formData.description.trim() || formData.description.trim().length < 10) {
      errors.description = locale === 'ar' ? 'يرجى كتابة وصف تفصيلي (10 أحرف على الأقل)' : 'Description détaillée obligatoire (min. 10 caractères)';
    }
    if (!formData.consent) {
      errors.consent = locale === 'ar' ? 'الموافقة على المعالجة القانونية إلزامية' : 'Consentement obligatoire';
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
          idempotencyKey,
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
      fullName: '',
      email: '',
      phone: '',
      wilaya: '',
      commune: '',
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
      confidential: false,
      suggestionTitle: '',
      expectedImprovement: '',
    });
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-sand text-ink scroll-mt-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-teal/10 text-teal font-semibold text-xs tracking-wider uppercase mb-3">
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
            /* Success View with Human-Readable Unique Reference ID */
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

              <p className="text-xs text-muted max-w-sm mx-auto">
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

              {/* Honeypot field */}
              <div className="hidden" aria-hidden="true">
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.website}
                  onChange={handleInputChange}
                />
              </div>

              {/* SECTION A: Personal Information */}
              <div className="space-y-5">
                <div className="border-b border-line pb-3">
                  <h3 className="font-serif text-lg font-bold text-teal flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-brand" />
                    <span>{t('citizenForm.sectionA')}</span>
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {/* Full Name */}
                  <div className="sm:col-span-2 lg:col-span-1">
                    <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-2">
                      {t('citizenForm.fullName')} <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder={locale === 'ar' ? 'الاسم واللقب' : 'Nom et Prénom'}
                      className={`w-full px-4 py-3 rounded-xl border ${
                        fieldErrors.fullName ? 'border-red-500 ring-1 ring-red-500' : 'border-line'
                      } focus:outline-none focus:ring-2 focus:ring-teal bg-white text-ink transition-all text-sm`}
                    />
                    {fieldErrors.fullName && (
                      <p className="mt-1.5 text-xs text-red-600 font-medium">{fieldErrors.fullName}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-2">
                      {t('citizenForm.email')} <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      dir="ltr"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="nom@example.org"
                      className={`w-full px-4 py-3 rounded-xl border ${
                        fieldErrors.email ? 'border-red-500 ring-1 ring-red-500' : 'border-line'
                      } focus:outline-none focus:ring-2 focus:ring-teal bg-white text-ink text-start transition-all text-sm`}
                    />
                    {fieldErrors.email && (
                      <p className="mt-1.5 text-xs text-red-600 font-medium">{fieldErrors.email}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-2">
                      {t('citizenForm.phone')} <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      inputMode="tel"
                      dir="ltr"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="05XXXXXXXX / +213"
                      className={`w-full px-4 py-3 rounded-xl border ${
                        fieldErrors.phone ? 'border-red-500 ring-1 ring-red-500' : 'border-line'
                      } focus:outline-none focus:ring-2 focus:ring-teal bg-white text-ink text-start transition-all text-sm`}
                    />
                    {fieldErrors.phone && (
                      <p className="mt-1.5 text-xs text-red-600 font-medium">{fieldErrors.phone}</p>
                    )}
                  </div>

                  {/* Wilaya Searchable Dropdown */}
                  <div className="relative">
                    <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-2">
                      {t('citizenForm.wilaya')} <span className="text-red-600">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setWilayaDropdownOpen(!wilayaDropdownOpen)}
                      className={`w-full px-4 py-3 rounded-xl border ${
                        fieldErrors.wilaya ? 'border-red-500 ring-1 ring-red-500' : 'border-line'
                      } flex items-center justify-between bg-white text-start text-sm focus:outline-none focus:ring-2 focus:ring-teal transition-all`}
                    >
                      <span className={formData.wilaya ? 'text-ink font-medium' : 'text-muted'}>
                        {selectedWilayaObj
                          ? `${selectedWilayaObj.code} - ${selectedWilayaObj[locale]}`
                          : t('supportForm.selectWilaya')}
                      </span>
                      <ChevronDown className="w-4 h-4 text-muted" />
                    </button>

                    {wilayaDropdownOpen && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-line z-40 max-h-60 overflow-hidden flex flex-col">
                        <div className="p-2 border-b border-line bg-sand/40">
                          <input
                            type="text"
                            value={wilayaSearch}
                            onChange={(e) => setWilayaSearch(e.target.value)}
                            placeholder={t('supportForm.searchWilaya')}
                            className="w-full px-3 py-2 text-xs rounded-lg border border-line focus:outline-none focus:ring-1 focus:ring-teal bg-white"
                            autoFocus
                          />
                        </div>
                        <div className="overflow-y-auto flex-1 p-1">
                          {filteredWilayas.map((w) => (
                            <button
                              key={w.code}
                              type="button"
                              onClick={() => {
                                setFormData((prev) => ({ ...prev, wilaya: `${w.code} - ${w.fr}` }));
                                setWilayaDropdownOpen(false);
                                setWilayaSearch('');
                                if (fieldErrors.wilaya) {
                                  setFieldErrors((prev) => {
                                    const n = { ...prev };
                                    delete n.wilaya;
                                    return n;
                                  });
                                }
                              }}
                              className={`w-full px-3 py-2 text-start text-xs rounded-md transition-colors flex items-center justify-between ${
                                formData.wilaya === `${w.code} - ${w.fr}`
                                  ? 'bg-teal/10 text-teal font-semibold'
                                  : 'hover:bg-sand/60 text-ink'
                              }`}
                            >
                              <span>
                                {w.code} - {w[locale]}
                              </span>
                              <span className="text-[10px] text-muted">({w.fr})</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    {fieldErrors.wilaya && (
                      <p className="mt-1.5 text-xs text-red-600 font-medium">{fieldErrors.wilaya}</p>
                    )}
                  </div>

                  {/* Commune (optional) */}
                  <div>
                    <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-2">
                      {t('citizenForm.commune')} <span className="text-muted font-normal">({t('common.optional')})</span>
                    </label>
                    <input
                      type="text"
                      name="commune"
                      value={formData.commune}
                      onChange={handleInputChange}
                      placeholder={locale === 'ar' ? 'البلدية' : 'Commune'}
                      className="w-full px-4 py-3 rounded-xl border border-line focus:outline-none focus:ring-2 focus:ring-teal bg-white text-ink transition-all text-sm"
                    />
                  </div>

                  {/* Organization (optional) */}
                  <div>
                    <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-2">
                      {t('citizenForm.organization')} <span className="text-muted font-normal">({t('common.optional')})</span>
                    </label>
                    <input
                      type="text"
                      name="organization"
                      value={formData.organization}
                      onChange={handleInputChange}
                      placeholder={locale === 'ar' ? 'اسم الهيئة أو الجمعية' : 'Association / Organisme'}
                      className="w-full px-4 py-3 rounded-xl border border-line focus:outline-none focus:ring-2 focus:ring-teal bg-white text-ink transition-all text-sm"
                    />
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

                {/* Detailed Description with Live Counter and Mandatory TEXT ONLY Note */}
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

                  {/* Strict Notice: TEXT ONLY */}
                  <div className="mt-2 p-3 rounded-xl bg-sand/70 border border-line text-xs text-ink/80 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-teal flex-shrink-0" />
                    <span>{t('citizenForm.notice')}</span>
                  </div>

                  {fieldErrors.description && (
                    <p className="mt-1.5 text-xs text-red-600 font-medium">{fieldErrors.description}</p>
                  )}
                </div>
              </div>

              {/* SECTION D: Complaint-Only Fields */}
              {formData.type === 'Complaint' && (
                <div className="p-6 rounded-2xl bg-sand/60 border border-line space-y-5 animate-fade-in">
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

                    {/* Person or Department */}
                    <div>
                      <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-2">
                        {t('citizenForm.concernedParty')}
                      </label>
                      <input
                        type="text"
                        name="concernedParty"
                        value={formData.concernedParty}
                        onChange={handleInputChange}
                        placeholder={locale === 'ar' ? 'مثال: مديرية الأشغال، بلدية...' : 'Direction / Service concerné'}
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

                  {/* Confidentiality Choice */}
                  <div className="pt-2">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="confidential"
                        checked={formData.confidential}
                        onChange={handleInputChange}
                        className="w-4 h-4 rounded text-teal focus:ring-teal border-line"
                      />
                      <span className="text-xs sm:text-sm font-medium text-ink flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5 text-red-600" />
                        <span>{t('citizenForm.confidential')} ({formData.confidential ? t('citizenForm.confidentialYes') : t('citizenForm.confidentialNo')})</span>
                      </span>
                    </label>
                  </div>
                </div>
              )}

              {/* SECTION E: Suggestion-Only Fields */}
              {formData.type === 'Suggestion' && (
                <div className="p-6 rounded-2xl bg-sand/60 border border-line space-y-5 animate-fade-in">
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

              {/* Consent Checkbox */}
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
                    {t('citizenForm.consent')}{' '}
                    <a href="/privacy" className="text-teal hover:underline font-semibold" target="_blank" rel="noreferrer">
                      ({t('supportForm.privacyLink')})
                    </a>
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
