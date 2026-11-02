'use client';

import React, { useState, useMemo } from 'react';
import { useI18n } from '@/lib/i18n';
import { wilayasList } from '@/lib/wilayas';
import { algerianPhoneRegex } from '@/lib/validations';
import { CheckCircle2, Share2, AlertCircle, Loader2, ChevronDown, ChevronUp, Check } from 'lucide-react';

export default function SupportForm() {
  const { locale, dir, t } = useI18n();

  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    wilaya: '',
    phone: '',
    commune: '',
    intention: 'definitely',
    participation: 'support',
    message: '',
    consent: false,
    website: '', // honeypot
  });

  const [messageOpen, setMessageOpen] = useState(false);
  const [wilayaSearch, setWilayaSearch] = useState('');
  const [wilayaDropdownOpen, setWilayaDropdownOpen] = useState(false);

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [copiedShare, setCopiedShare] = useState(false);

  // Filtered Wilayas for Searchable Dropdown
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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

    if (!formData.firstName.trim() || formData.firstName.trim().length < 2) {
      errors.firstName = locale === 'ar' ? 'يرجى إدخال الاسم الأول' : 'Veuillez saisir votre prénom';
    }
    if (!formData.lastName.trim() || formData.lastName.trim().length < 2) {
      errors.lastName = locale === 'ar' ? 'يرجى إدخال اللقب' : 'Veuillez saisir votre nom';
    }
    if (!formData.wilaya) {
      errors.wilaya = locale === 'ar' ? 'يرجى اختيار الولاية' : 'Veuillez sélectionner votre wilaya';
    }
    if (!formData.phone.trim() || !algerianPhoneRegex.test(formData.phone.trim())) {
      errors.phone = locale === 'ar' ? 'رقم هاتف جزائري غير صالح (05 / 06 / 07)' : 'Numéro algérien invalide (05 / 06 / 07)';
    }
    if (!formData.consent) {
      errors.consent = locale === 'ar' ? 'الموافقة على الشروط إلزامية' : 'Consentement obligatoire';
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
      const res = await fetch('/api/support', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.code === 'DUPLICATE_PHONE') {
          setErrorMessage(t('supportForm.duplicatePhone'));
        } else {
          setErrorMessage(data.error || t('supportForm.networkError'));
        }
        setStatus('error');
        return;
      }

      setStatus('success');
    } catch {
      setErrorMessage(t('supportForm.networkError'));
      setStatus('error');
    }
  };

  const handleShare = async () => {
    const shareText = t('supportForm.shareText');
    const shareUrl = typeof window !== 'undefined' ? window.location.origin : '';

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'القائمة الحرّة البديل 101',
          text: shareText,
          url: shareUrl,
        });
        return;
      } catch {
        // User cancelled or fallback
      }
    }

    if (navigator.clipboard) {
      await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 3000);
    } else {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`, '_blank');
    }
  };

  return (
    <section id="support" className="py-20 lg:py-28 bg-sand text-ink scroll-mt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-teal/10 text-teal font-semibold text-xs tracking-wider uppercase mb-3">
            {t('supportForm.eyebrow')}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-teal mb-4">
            {t('supportForm.title')}
          </h2>
          <p className="text-muted text-sm sm:text-base leading-relaxed">
            {t('supportForm.description')}
          </p>
        </div>

        {/* Form Container Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-editorial border border-line relative overflow-hidden">
          {status === 'success' ? (
            <div className="text-center py-10 space-y-6">
              <div className="w-16 h-16 rounded-full bg-green-brand/10 text-green-brand flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-teal">
                  {t('supportForm.successTitle')}
                </h3>
                <p className="text-ink/80 max-w-lg mx-auto text-sm sm:text-base">
                  {t('supportForm.successMessage')}
                </p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-4">
                <button
                  type="button"
                  onClick={handleShare}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-teal hover:bg-deep text-sand font-semibold text-sm transition-transform active:scale-95 shadow-md"
                >
                  <Share2 className="w-4 h-4" />
                  <span>{t('supportForm.shareCampaign')}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setStatus('idle');
                    setFormData({
                      firstName: '',
                      lastName: '',
                      wilaya: '',
                      phone: '',
                      commune: '',
                      intention: 'definitely',
                      participation: 'support',
                      message: '',
                      consent: false,
                      website: '',
                    });
                  }}
                  className="w-full sm:w-auto px-5 py-3 rounded-full border border-line hover:bg-sand/60 text-ink text-sm font-medium transition-colors"
                >
                  {locale === 'ar' ? 'تسجيل داعم آخر' : 'Enregistrer un autre soutien'}
                </button>
              </div>

              {copiedShare && (
                <div className="inline-flex items-center gap-1.5 text-xs text-green-brand bg-green-brand/10 px-3 py-1.5 rounded-full">
                  <Check className="w-3.5 h-3.5" />
                  <span>{t('supportForm.copied')}</span>
                </div>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              {/* Top Global Error Banner */}
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

              {/* Row 1: First Name & Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="firstName" className="block text-xs font-semibold text-ink uppercase tracking-wider mb-2">
                    {t('supportForm.firstName')} <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder={locale === 'ar' ? 'الاسم' : 'Prénom'}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      fieldErrors.firstName ? 'border-red-500 ring-1 ring-red-500' : 'border-line'
                    } focus:outline-none focus:ring-2 focus:ring-teal bg-white text-ink transition-all`}
                  />
                  {fieldErrors.firstName && (
                    <p className="mt-1.5 text-xs text-red-600 font-medium">{fieldErrors.firstName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-xs font-semibold text-ink uppercase tracking-wider mb-2">
                    {t('supportForm.lastName')} <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder={locale === 'ar' ? 'اللقب' : 'Nom de famille'}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      fieldErrors.lastName ? 'border-red-500 ring-1 ring-red-500' : 'border-line'
                    } focus:outline-none focus:ring-2 focus:ring-teal bg-white text-ink transition-all`}
                  />
                  {fieldErrors.lastName && (
                    <p className="mt-1.5 text-xs text-red-600 font-medium">{fieldErrors.lastName}</p>
                  )}
                </div>
              </div>

              {/* Row 2: Searchable Wilaya & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Searchable Wilaya Select */}
                <div className="relative">
                  <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-2">
                    {t('supportForm.wilaya')} <span className="text-red-600">*</span>
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

                  {/* Dropdown with search filter */}
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
                        {filteredWilayas.length > 0 ? (
                          filteredWilayas.map((w) => (
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
                          ))
                        ) : (
                          <div className="p-3 text-xs text-muted text-center">
                            {locale === 'ar' ? 'لا توجد ولاية مطابقة' : 'Aucune wilaya trouvée'}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  {fieldErrors.wilaya && (
                    <p className="mt-1.5 text-xs text-red-600 font-medium">{fieldErrors.wilaya}</p>
                  )}
                </div>

                {/* Phone input with Algerian validation */}
                <div>
                  <label htmlFor="phone" className="block text-xs font-semibold text-ink uppercase tracking-wider mb-2">
                    {t('supportForm.phone')} <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    inputMode="tel"
                    dir="ltr"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="05XXXXXXXX / +213"
                    className={`w-full px-4 py-3 rounded-xl border ${
                      fieldErrors.phone ? 'border-red-500 ring-1 ring-red-500' : 'border-line'
                    } focus:outline-none focus:ring-2 focus:ring-teal bg-white text-ink text-start transition-all`}
                  />
                  {fieldErrors.phone && (
                    <p className="mt-1.5 text-xs text-red-600 font-medium">{fieldErrors.phone}</p>
                  )}
                </div>
              </div>

              {/* Row 3: Optional Commune */}
              <div>
                <label htmlFor="commune" className="block text-xs font-semibold text-ink uppercase tracking-wider mb-2">
                  {t('supportForm.commune')}
                </label>
                <input
                  type="text"
                  id="commune"
                  name="commune"
                  value={formData.commune}
                  onChange={handleInputChange}
                  placeholder={locale === 'ar' ? 'اسم البلدية أو الدائرة' : 'Nom de la commune'}
                  className="w-full px-4 py-3 rounded-xl border border-line focus:outline-none focus:ring-2 focus:ring-teal bg-white text-ink transition-all"
                />
              </div>

              {/* Row 4: Voting Intention & Participation Preference */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="intention" className="block text-xs font-semibold text-ink uppercase tracking-wider mb-2">
                    {t('supportForm.intention')}
                  </label>
                  <select
                    id="intention"
                    name="intention"
                    value={formData.intention}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-line focus:outline-none focus:ring-2 focus:ring-teal bg-white text-ink transition-all text-sm"
                  >
                    <option value="definitely">{t('supportForm.intentions.definitely')}</option>
                    <option value="leaning">{t('supportForm.intentions.leaning')}</option>
                    <option value="learn_more">{t('supportForm.intentions.learn_more')}</option>
                    <option value="undecided">{t('supportForm.intentions.undecided')}</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="participation" className="block text-xs font-semibold text-ink uppercase tracking-wider mb-2">
                    {t('supportForm.participation')}
                  </label>
                  <select
                    id="participation"
                    name="participation"
                    value={formData.participation}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-line focus:outline-none focus:ring-2 focus:ring-teal bg-white text-ink transition-all text-sm"
                  >
                    <option value="support">{t('supportForm.participations.support')}</option>
                    <option value="share">{t('supportForm.participations.share')}</option>
                    <option value="volunteer">{t('supportForm.participations.volunteer')}</option>
                    <option value="field_outreach">{t('supportForm.participations.field_outreach')}</option>
                  </select>
                </div>
              </div>

              {/* Collapsible Message Field */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setMessageOpen(!messageOpen)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal hover:text-teal-light transition-colors focus:outline-none"
                >
                  <span>{t('supportForm.message')}</span>
                  {messageOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>

                {messageOpen && (
                  <div className="mt-3 animate-fade-in">
                    <textarea
                      name="message"
                      rows={3}
                      maxLength={1000}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder={t('supportForm.messagePlaceholder')}
                      className="w-full p-4 rounded-xl border border-line focus:outline-none focus:ring-2 focus:ring-teal text-sm text-ink bg-white transition-all"
                    />
                    <div className="text-end text-[11px] text-muted mt-1">
                      {formData.message.length}/1000
                    </div>
                  </div>
                )}
              </div>

              {/* Consent Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleInputChange}
                    className="mt-1 w-4 h-4 rounded text-teal focus:ring-teal border-line"
                  />
                  <span className="text-xs text-ink/80 leading-relaxed">
                    {t('supportForm.consent')}{' '}
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
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-4 px-6 rounded-full bg-teal hover:bg-deep text-sand font-semibold text-base transition-all duration-200 shadow-elevated hover:shadow-2xl active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>{t('supportForm.submitting')}</span>
                    </>
                  ) : (
                    <span>{t('supportForm.submit')}</span>
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
