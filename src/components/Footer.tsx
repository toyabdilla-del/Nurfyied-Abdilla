import React from 'react';
import { Anchor, Heart, Sparkles } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: 'translator' | 'lexicon' | 'studio' | 'culture' | 'gabbang' | 'practice') => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand & Purpose */}
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-teal-700 text-white flex items-center justify-center font-bold text-sm">
                S
              </div>
              <div>
                <span className="text-lg font-bold text-white font-display tracking-tight block">
                  Sama Translator
                </span>
                <span className="text-xs text-amber-400 font-medium flex items-center gap-1">
                  <Sparkles className="w-3 h-3 inline" />
                  <span>by Nurfyied P. Abdilla</span>
                </span>
              </div>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed max-w-md">
              A comprehensive language bridge and cultural archive celebrating Bahasa Sinama and the maritime, musical, and artisanal heritage of the Sama-Bajau people across Tawi-Tawi, Sulu, Basilan, Zamboanga, Sabah, and Eastern Indonesia.
            </p>
            <div className="flex items-center gap-1.5 text-[11px] text-stone-400">
              <Anchor className="w-3.5 h-3.5 text-teal-400" />
              <span>Ancestral seafaring culture of the Sulu Archipelago</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-stone-100 font-display">
              Modules
            </div>
            <ul className="space-y-1.5 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => onSelectTab('translator')}
                  className="hover:text-white transition-colors text-left"
                >
                  Sama Translator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('lexicon')}
                  className="hover:text-white transition-colors text-left"
                >
                  Vocabulary & Phonetics
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('studio')}
                  className="hover:text-white transition-colors text-left"
                >
                  Pronunciation Lab
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('culture')}
                  className="hover:text-white transition-colors text-left"
                >
                  Lepa Houseboat Craft
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('gabbang')}
                  className="hover:text-white transition-colors text-left"
                >
                  Gabbang Bamboo Music
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('practice')}
                  className="hover:text-white transition-colors text-left"
                >
                  Listening Quiz & Drills
                </button>
              </li>
            </ul>
          </div>

          {/* Cultural Respect & Attribution */}
          <div className="md:col-span-3 space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-stone-100 font-display">
              Linguistic Notes
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Bahasa Sinama includes several dialects (Central, Southern, Northern, and Pangutaran). Phonetic audio models in this app emphasize universal Sama phonology: glottal stops, geminate consonants, and penultimate syllable stress.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div>
            © {new Date().getFullYear()} Sama Translator by Nurfyied P. Abdilla. Magsukul.
          </div>
          <div className="flex items-center gap-1 text-stone-400">
            <span>Preserving indigenous Austronesian heritage with</span>
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500 inline" />
          </div>
        </div>
      </div>
    </footer>
  );
};
