import React, { useState, useEffect } from 'react';
import { ShieldCheck, Cookie, Settings, Check, X, ChevronRight } from 'lucide-react';

export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
}

const STORAGE_KEY = 'nipon_cookie_consent';

interface CookieConsentBannerProps {
  lang: 'pt' | 'en';
}

export const applyConsentSignals = (prefs: { analytics: boolean; marketing: boolean }) => {
  const consentUpdate = {
    ad_storage: prefs.marketing ? 'granted' : 'denied',
    analytics_storage: prefs.analytics ? 'granted' : 'denied',
    ad_user_data: prefs.marketing ? 'granted' : 'denied',
    ad_personalization: prefs.marketing ? 'granted' : 'denied'
  };

  // 1. Google Consent Mode v2 update for Google Ads (AW-11073542078) & GA
  if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
    (window as any).gtag('consent', 'update', consentUpdate);
  }

  // 2. Google Tag Manager dataLayer event push
  if (typeof window !== 'undefined') {
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({
      event: 'consent_updated',
      consent_necessary: true,
      consent_analytics: prefs.analytics,
      consent_marketing: prefs.marketing,
      ...consentUpdate
    });
  }

  // 3. Meta Pixel consent integration
  if (typeof window !== 'undefined' && typeof (window as any).fbq === 'function') {
    try {
      (window as any).fbq('consent', prefs.marketing ? 'grant' : 'revoke');
    } catch (e) {
      // Ignore if fbq is not yet ready
    }
  }
};

export const getSavedConsent = (): CookiePreferences | null => {
  if (typeof window === 'undefined') return null;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    // Ignore localStorage parse errors
  }
  return null;
};

export const saveConsent = (analytics: boolean, marketing: boolean): CookiePreferences => {
  const prefs: CookiePreferences = {
    necessary: true,
    analytics,
    marketing,
    timestamp: new Date().toISOString()
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch (e) {
    // LocalStorage quota/access fallback
  }

  applyConsentSignals({ analytics, marketing });
  return prefs;
};

export default function CookieConsentBanner({ lang }: CookieConsentBannerProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState<boolean>(false);
  
  // Custom preferences state for modal
  const [analyticsEnabled, setAnalyticsEnabled] = useState<boolean>(false);
  const [marketingEnabled, setMarketingEnabled] = useState<boolean>(false);

  useEffect(() => {
    // Check if consent has already been chosen
    const existing = getSavedConsent();
    if (!existing) {
      // Delay slightly for smooth initial page entrance
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 700);
      return () => clearTimeout(timer);
    } else {
      setAnalyticsEnabled(existing.analytics);
      setMarketingEnabled(existing.marketing);
      // Ensure current session reflects stored signals
      applyConsentSignals({ analytics: existing.analytics, marketing: existing.marketing });
    }
  }, []);

  // Listen for external trigger to open preferences (e.g. from footer)
  useEffect(() => {
    const handleOpenModal = () => {
      const existing = getSavedConsent();
      if (existing) {
        setAnalyticsEnabled(existing.analytics);
        setMarketingEnabled(existing.marketing);
      } else {
        setAnalyticsEnabled(false);
        setMarketingEnabled(false);
      }
      setIsPreferencesOpen(true);
      setIsVisible(true);
    };

    window.addEventListener('open-cookie-preferences', handleOpenModal);
    (window as any).openCookiePreferences = handleOpenModal;

    return () => {
      window.removeEventListener('open-cookie-preferences', handleOpenModal);
      delete (window as any).openCookiePreferences;
    };
  }, []);

  const handleAcceptAll = () => {
    saveConsent(true, true);
    setAnalyticsEnabled(true);
    setMarketingEnabled(true);
    setIsPreferencesOpen(false);
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    saveConsent(false, false);
    setAnalyticsEnabled(false);
    setMarketingEnabled(false);
    setIsPreferencesOpen(false);
    setIsVisible(false);
  };

  const handleSaveCustom = () => {
    saveConsent(analyticsEnabled, marketingEnabled);
    setIsPreferencesOpen(false);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* 1. Main Bottom Cookie Banner */}
      {!isPreferencesOpen && (
        <div 
          role="dialog"
          aria-live="polite"
          aria-label={lang === 'pt' ? 'Consentimento de Cookies' : 'Cookie Consent'}
          className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-xl z-50 animate-fade-in"
          id="cookie-consent-banner"
        >
          <div className="cookie-consent-card bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.25)] text-left text-gray-900 space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-red/10 border border-brand-red/25 flex items-center justify-center shrink-0 mt-0.5 text-brand-red">
                <Cookie className="w-5 h-5 text-brand-red" />
              </div>
              <div className="space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-h4 text-gray-900 font-bold m-0 p-0">
                    {lang === 'pt' ? 'Respeito pela sua Privacidade' : 'Respect for Your Privacy'}
                  </h3>
                  <span className="text-label-sm text-brand-red bg-red-50 border border-red-200 px-2 py-0.5 rounded-full font-bold">
                    GDPR / RGPD
                  </span>
                </div>
                <p className="text-body-sm text-gray-600 leading-relaxed font-normal">
                  {lang === 'pt' ? (
                    <>
                      Utilizamos cookies essenciais para o funcionamento do nosso templo digital, além de cookies analíticos e de publicidade (Google Ads) para compreender as suas preferências e medir campanhas. Você pode aceitar todos, rejeitar os não essenciais ou personalizar as suas escolhas.
                    </>
                  ) : (
                    <>
                      We use essential cookies to ensure our sanctuary website functions properly, as well as analytical and marketing cookies (Google Ads) to understand user preferences and measure campaign impact. You can accept all, reject non-essential cookies, or manage your preferences.
                    </>
                  )}
                </p>
              </div>
            </div>

            {/* Banner Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => setIsPreferencesOpen(true)}
                className="px-3.5 py-2 rounded-full text-btn-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 border border-gray-300 transition-colors text-center cursor-pointer font-medium"
              >
                {lang === 'pt' ? 'Gerir Preferências' : 'Manage Preferences'}
              </button>

              <button
                type="button"
                onClick={handleRejectAll}
                className="px-4 py-2 rounded-full text-btn-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 border border-gray-300 transition-colors text-center cursor-pointer font-medium"
              >
                {lang === 'pt' ? 'Rejeitar Todos' : 'Reject All'}
              </button>

              <button
                type="button"
                onClick={handleAcceptAll}
                className="px-5 py-2 rounded-full text-btn !text-white bg-brand-red hover:bg-brand-red-hover transition-all duration-200 shadow-md shadow-brand-red/30 text-center cursor-pointer font-bold"
                style={{ color: '#ffffff' }}
              >
                {lang === 'pt' ? 'Aceitar Todos' : 'Accept All'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Detailed Cookie Preferences Modal */}
      {isPreferencesOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-preferences-title"
        >
          <div className="cookie-modal-card bg-white border border-gray-200 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 text-gray-900 space-y-6 shadow-2xl relative">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-gray-200 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-brand-red" />
                  <h3 id="cookie-preferences-title" className="text-h3 text-gray-900 font-bold">
                    {lang === 'pt' ? 'Preferências de Privacidade e Cookies' : 'Privacy & Cookie Preferences'}
                  </h3>
                </div>
                <p className="text-body-sm text-gray-600">
                  {lang === 'pt' 
                    ? 'Configure as categorias de cookies que autoriza durante a sua navegação no Nipon Spa Lisboa.'
                    : 'Configure the categories of cookies you permit while visiting Nipon Spa Lisbon.'}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  // If user has already consented, just close the modal; otherwise return to banner
                  const saved = getSavedConsent();
                  if (saved) {
                    setIsPreferencesOpen(false);
                    setIsVisible(false);
                  } else {
                    setIsPreferencesOpen(false);
                  }
                }}
                className="p-1.5 rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition cursor-pointer"
                aria-label={lang === 'pt' ? 'Fechar' : 'Close'}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cookie Categories List */}
            <div className="space-y-4">
              
              {/* Category 1: Necessary Cookies */}
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-h4 text-gray-900 font-bold">
                      {lang === 'pt' ? 'Cookies Estritamente Necessários' : 'Strictly Necessary Cookies'}
                    </span>
                    <span className="text-label-sm bg-green-100 text-green-800 border border-green-200 px-2 py-0.5 rounded-full font-bold">
                      {lang === 'pt' ? 'Sempre Ativo' : 'Always Active'}
                    </span>
                  </div>
                  <div className="w-11 h-6 bg-gray-300 rounded-full flex items-center justify-end px-1 opacity-80 cursor-not-allowed">
                    <div className="w-4 h-4 bg-white rounded-full shadow-sm"></div>
                  </div>
                </div>
                <p className="text-body-sm text-gray-600 leading-relaxed font-normal">
                  {lang === 'pt'
                    ? 'Essenciais para a segurança, carregamento de páginas, navegação e funcionamento do sistema de agendamento do spa. Não podem ser desativados.'
                    : 'Essential for site security, page navigation, accessibility, and the spa reservation system. Cannot be disabled.'}
                </p>
              </div>

              {/* Category 2: Analytics Cookies */}
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-h4 text-gray-900 font-bold">
                      {lang === 'pt' ? 'Cookies Analíticos & Medição' : 'Analytics & Performance Cookies'}
                    </span>
                    <span className="text-label-sm text-gray-700 bg-gray-200 border border-gray-300 px-2 py-0.5 rounded-full font-semibold">
                      {analyticsEnabled ? (lang === 'pt' ? 'Ativado' : 'Enabled') : (lang === 'pt' ? 'Desativado' : 'Disabled')}
                    </span>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={analyticsEnabled}
                    onClick={() => setAnalyticsEnabled(!analyticsEnabled)}
                    className={`w-11 h-6 rounded-full transition-colors p-1 cursor-pointer flex items-center ${
                      analyticsEnabled ? 'bg-brand-red justify-end' : 'bg-gray-300 justify-start'
                    }`}
                  >
                    <div className="w-4 h-4 bg-white rounded-full shadow-md"></div>
                  </button>
                </div>
                <p className="text-body-sm text-gray-600 leading-relaxed font-normal">
                  {lang === 'pt'
                    ? 'Permitem analisar de forma anónima o tráfego, as páginas mais visitadas e o comportamento de navegação para melhorar continuamente a experiência.'
                    : 'Help us anonymously measure visits and traffic sources to optimize the user journey across treatments and sanctuary stories.'}
                </p>
              </div>

              {/* Category 3: Marketing & Advertising (Google Ads) */}
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-h4 text-gray-900 font-bold">
                      {lang === 'pt' ? 'Cookies de Publicidade & Google Ads' : 'Marketing & Advertising Cookies (Google Ads)'}
                    </span>
                    <span className="text-label-sm text-gray-700 bg-gray-200 border border-gray-300 px-2 py-0.5 rounded-full font-semibold">
                      {marketingEnabled ? (lang === 'pt' ? 'Ativado' : 'Enabled') : (lang === 'pt' ? 'Desativado' : 'Disabled')}
                    </span>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={marketingEnabled}
                    onClick={() => setMarketingEnabled(!marketingEnabled)}
                    className={`w-11 h-6 rounded-full transition-colors p-1 cursor-pointer flex items-center ${
                      marketingEnabled ? 'bg-brand-red justify-end' : 'bg-gray-300 justify-start'
                    }`}
                  >
                    <div className="w-4 h-4 bg-white rounded-full shadow-md"></div>
                  </button>
                </div>
                <p className="text-body-sm text-gray-600 leading-relaxed font-normal">
                  {lang === 'pt'
                    ? 'Utilizados para medição de conversões de anúncios (Google Ads AW-11073542078) e personalização de campanhas. Se desativados, os anúncios não serão personalizados de acordo com os seus interesses.'
                    : 'Used to measure advertising conversions (Google Ads AW-11073542078) and deliver relevant campaign insights. If disabled, ads will not be personalized.'}
                </p>
              </div>

            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2 border-t border-gray-200">
              <button
                type="button"
                onClick={handleRejectAll}
                className="px-4 py-2.5 rounded-full text-btn-sm text-gray-700 hover:text-gray-900 border border-gray-300 hover:bg-gray-100 transition text-center cursor-pointer font-medium"
              >
                {lang === 'pt' ? 'Rejeitar Opcionais' : 'Reject Non-Essential'}
              </button>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleSaveCustom}
                  className="px-5 py-2.5 rounded-full text-btn-sm text-gray-800 bg-gray-100 hover:bg-gray-200 border border-gray-300 transition text-center cursor-pointer font-medium"
                >
                  {lang === 'pt' ? 'Guardar Preferências' : 'Save Preferences'}
                </button>

                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="px-6 py-2.5 rounded-full text-btn !text-white bg-brand-red hover:bg-brand-red-hover transition shadow-lg shadow-brand-red/25 text-center cursor-pointer font-bold"
                  style={{ color: '#ffffff' }}
                >
                  {lang === 'pt' ? 'Aceitar Todos' : 'Accept All'}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
