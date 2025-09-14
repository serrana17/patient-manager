import React from 'react';
import { Globe } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

const LanguageSwitcher: React.FC = () => {
  const { t, changeLanguage, currentLanguage } = useTranslation();

  const handleLanguageChange = () => {
    const newLanguage = currentLanguage === 'en' ? 'es' : 'en';
    changeLanguage(newLanguage);
  };

  return (
    <button
      onClick={handleLanguageChange}
      className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200"
      title={t('language.switchTo')}
    >
      <Globe className="w-4 h-4" />
      <span className="hidden sm:inline">
        {currentLanguage === 'en' ? 'ES' : 'EN'}
      </span>
    </button>
  );
};

export default LanguageSwitcher;
