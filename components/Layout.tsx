
import React from 'react';
import { useApp } from '../store';
import { LanguageToggle } from './LanguageToggle';
import { TRANSLATIONS } from '../constants';

export const Layout: React.FC<{ children: React.ReactNode, onNavigate: (page: string) => void }> = ({ children, onNavigate }) => {
  const { state, logout } = useApp();
  const t = TRANSLATIONS[state.language];

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center cursor-pointer" onClick={() => onNavigate('home')}>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">AISub BD</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => onNavigate('home')} className="text-gray-600 hover:text-blue-600 font-medium">{t.tools}</button>
              {state.user ? (
                <>
                  <button onClick={() => onNavigate('dashboard')} className="text-gray-600 hover:text-blue-600 font-medium">{t.dashboard}</button>
                  {state.user.role === 'admin' && (
                    <button onClick={() => onNavigate('admin')} className="text-gray-600 hover:text-blue-600 font-medium">{t.admin}</button>
                  )}
                  <button onClick={logout} className="text-red-500 hover:text-red-600 font-medium">Logout</button>
                </>
              ) : (
                <>
                  <button onClick={() => onNavigate('login')} className="text-gray-600 hover:text-blue-600 font-medium">{t.login}</button>
                  <button onClick={() => onNavigate('register')} className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-all font-medium">
                    {t.register}
                  </button>
                </>
              )}
              <LanguageToggle />
            </div>

            {/* Mobile menu toggle simplified for demo */}
            <div className="md:hidden flex items-center space-x-2">
              <LanguageToggle />
              <button className="p-2 text-gray-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-gray-900 text-white py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="text-2xl font-bold mb-4">AISub BD</div>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">{t.heroSub}</p>
          <div className="flex justify-center space-x-6 mb-8">
            <span className="text-gray-300 hover:text-white cursor-pointer">Facebook</span>
            <span className="text-gray-300 hover:text-white cursor-pointer">Telegram</span>
            <span className="text-gray-300 hover:text-white cursor-pointer">WhatsApp</span>
          </div>
          <div className="border-t border-gray-800 pt-8 text-sm text-gray-500">
            &copy; {new Date().getFullYear()} AISub BD. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};
