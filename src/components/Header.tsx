import React from 'react';
import { Volume2 } from 'lucide-react';

interface HeaderProps {
  activeTab: 'translator' | 'lexicon' | 'studio' | 'culture' | 'gabbang' | 'practice';
  setActiveTab: (tab: 'translator' | 'lexicon' | 'studio' | 'culture' | 'gabbang' | 'practice') => void;
  onQuickPractice: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onQuickPractice }) => {
  return (
    <header className="sticky top-0 z-40 bg-stone-50/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand title, one line */}
        <button
          onClick={() => setActiveTab('translator')}
          className="flex items-center gap-2.5 text-left group focus:outline-none"
        >
          <div className="w-9 h-9 rounded-lg bg-teal-800 text-stone-100 flex items-center justify-center font-bold text-lg tracking-wider group-hover:bg-teal-700 transition-colors shrink-0">
            S
          </div>
          <span className="text-xl font-bold tracking-tight text-stone-900 whitespace-nowrap shrink-0 font-display">
            Sama Translator
          </span>
        </button>

        {/* Zone 2: 4–5 single-line nav links with hover underlines */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-600">
          <button
            onClick={() => setActiveTab('translator')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
              activeTab === 'translator'
                ? 'text-teal-900 font-semibold'
                : 'hover:text-stone-900 text-stone-600'
            }`}
          >
            Translator
            {activeTab === 'translator' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-700 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('lexicon')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
              activeTab === 'lexicon'
                ? 'text-teal-900 font-semibold'
                : 'hover:text-stone-900 text-stone-600'
            }`}
          >
            Vocabulary
            {activeTab === 'lexicon' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-700 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('studio')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
              activeTab === 'studio'
                ? 'text-teal-900 font-semibold'
                : 'hover:text-stone-900 text-stone-600'
            }`}
          >
            Pronunciation
            {activeTab === 'studio' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-700 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('culture')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
              activeTab === 'culture'
                ? 'text-teal-900 font-semibold'
                : 'hover:text-stone-900 text-stone-600'
            }`}
          >
            Lepa & Crafts
            {activeTab === 'culture' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-700 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('gabbang')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
              activeTab === 'gabbang'
                ? 'text-teal-900 font-semibold'
                : 'hover:text-stone-900 text-stone-600'
            }`}
          >
            Gabbang
            {activeTab === 'gabbang' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-700 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('practice')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
              activeTab === 'practice'
                ? 'text-teal-900 font-semibold'
                : 'hover:text-stone-900 text-stone-600'
            }`}
          >
            Quiz
            {activeTab === 'practice' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-700 rounded-full" />
            )}
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onQuickPractice}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-teal-800 rounded-lg hover:bg-teal-700 transition-colors shadow-sm whitespace-nowrap shrink-0"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>Practice Audio</span>
          </button>
        </div>
      </div>
    </header>
  );
};
