
import React from 'react';
import { useApp } from '../store';
import { Language } from '../types';

export const LanguageToggle: React.FC = () => {
  const { state, setLanguage } = useApp();

  return (
    <button
      onClick={() => setLanguage(state.language === Language.EN ? Language.BN : Language.EN)}
      className="flex items-center space-x-1 px-3 py-1.5 rounded-full border border-gray-200 hover:bg-gray-100 transition-colors text-sm font-medium"
    >
      <span className={state.language === Language.EN ? 'text-blue-600' : 'text-gray-400'}>EN</span>
      <span className="text-gray-300">|</span>
      <span className={`${state.language === Language.BN ? 'text-green-600' : 'text-gray-400'} bangla-font`}>বাংলা</span>
    </button>
  );
};
