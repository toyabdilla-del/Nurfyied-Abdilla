import React, { useState } from 'react';
import { Volume2, Sparkles, Compass, BookOpen, Languages } from 'lucide-react';
import { playAcousticPhonetic } from '../utils/audioEngine';

interface HeroSectionProps {
  onOpenTranslator: () => void;
  onExploreLessons: () => void;
  onOpenStudio: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenTranslator,
  onExploreLessons,
  onOpenStudio,
}) => {
  const [isPlayingGreeting, setIsPlayingGreeting] = useState(false);
  const [activeSyl, setActiveSyl] = useState<number | null>(null);

  const handlePlayGreeting = async () => {
    if (isPlayingGreeting) return;
    setIsPlayingGreeting(true);
    setActiveSyl(0);
    try {
      await playAcousticPhonetic('Malingkat subu', 1.0, (idx) => {
        setActiveSyl(idx);
      });
    } finally {
      setIsPlayingGreeting(false);
      setActiveSyl(null);
    }
  };

  const syllables = ['Ma', 'ling', 'kat', 'su', 'bu'];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-stone-100 to-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Editorial & Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-teal-800 tracking-wide uppercase">
              <span>Sama Translator</span>
              <span aria-hidden="true">·</span>
              <span className="font-semibold text-stone-700">by Nurfyied P. Abdilla</span>
              <span aria-hidden="true">·</span>
              <span>Bahasa Sinama</span>
              <span aria-hidden="true">·</span>
              <span>Sulu Archipelago</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 leading-[1.15]" style={{ textWrap: 'balance' }}>
              Sama Translator & Cultural Heritage
            </h1>

            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl">
              Created by <span className="font-semibold text-stone-900">Nurfyied P. Abdilla</span> to preserve and celebrate the living language of the Sama-Bajau people of Tawi-Tawi, Sulu, Basilan, and Sabah. Translate phrases, explore authentic audio pronunciation, and discover centuries of maritime boatcraft and music.
            </p>

            {/* Interactive Audio Hero Card */}
            <div className="bg-white rounded-xl p-5 border border-stone-200/90 shadow-sm max-w-xl">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs text-stone-500 font-medium mb-1">
                    Morning Greeting · Pag-ilam
                  </div>
                  <div className="text-2xl font-bold text-stone-900 flex items-baseline gap-3">
                    <span>Malingkat subu</span>
                    <span className="text-sm font-normal text-stone-500 font-mono">/ma.liŋ.kat su.buʔ/</span>
                  </div>
                  <div className="text-sm text-teal-800 font-medium mt-1">
                    "Good morning" (May beauty and abundance grace your day)
                  </div>
                </div>

                <button
                  onClick={handlePlayGreeting}
                  disabled={isPlayingGreeting}
                  className={`p-3.5 rounded-xl transition-all flex items-center justify-center shrink-0 ${
                    isPlayingGreeting
                      ? 'bg-teal-700 text-white animate-pulse'
                      : 'bg-teal-800 text-white hover:bg-teal-700 active:scale-95 shadow-sm'
                  }`}
                  aria-label="Play greeting audio pronunciation"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>

              {/* Syllable Progression Bar */}
              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                <span className="text-xs text-stone-500">Phonetic syllables:</span>
                <div className="flex items-center gap-1.5">
                  {syllables.map((syl, i) => (
                    <span
                      key={syl + i}
                      className={`text-xs px-2 py-0.5 rounded transition-colors ${
                        activeSyl === i
                          ? 'bg-teal-700 text-white font-bold'
                          : 'bg-stone-100 text-stone-700'
                      }`}
                    >
                      {syl}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenTranslator}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-teal-800 hover:bg-teal-700 rounded-lg transition-colors flex items-center gap-2 shadow-sm"
              >
                <Languages className="w-4 h-4" />
                <span>Open Sama Translator</span>
              </button>

              <button
                onClick={onExploreLessons}
                className="px-5 py-2.5 text-sm font-semibold text-stone-800 bg-white hover:bg-stone-100 border border-stone-300 rounded-lg transition-colors flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-teal-700" />
                <span>Explore Lexicon</span>
              </button>

              <button
                onClick={onOpenStudio}
                className="px-5 py-2.5 text-sm font-semibold text-stone-800 bg-white hover:bg-stone-100 border border-stone-300 rounded-lg transition-colors flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-teal-700" />
                <span>Pronunciation Lab</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-stone-200/80 shadow-md bg-stone-900 group">
              <img
                src="/src/assets/images/hero_lepa_houseboat_1794036626701.jpg"
                alt="Traditional Sama Lepa houseboat sailing on turquoise waters with ukkil wood carvings"
                className="w-full h-[380px] object-cover group-hover:scale-102 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent flex flex-col justify-end p-5 text-white">
                <div className="flex items-center gap-2 text-xs font-medium text-teal-200 mb-1">
                  <Compass className="w-3.5 h-3.5" />
                  <span>The Lepa Houseboat · In Lepa ma Tahik</span>
                </div>
                <p className="text-xs text-stone-200 leading-relaxed">
                  Handcrafted with wooden dowels and adorned with floral ukkil carvings, the Lepa was the floating ancestral home of Sama seafaring families.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Feature Highlights Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-stone-200/80 text-stone-700">
          <div>
            <div className="text-xl font-bold text-stone-900">Sama Translator</div>
            <div className="text-xs text-stone-500 mt-0.5">by Nurfyied P. Abdilla</div>
          </div>
          <div>
            <div className="text-xl font-bold text-stone-900">Acoustic Audio</div>
            <div className="text-xs text-stone-500 mt-0.5">Glottal stops & geminates</div>
          </div>
          <div>
            <div className="text-xl font-bold text-stone-900">Voice Matcher</div>
            <div className="text-xs text-stone-500 mt-0.5">Record & compare your pitch</div>
          </div>
          <div>
            <div className="text-xl font-bold text-stone-900">Living Culture</div>
            <div className="text-xs text-stone-500 mt-0.5">Lepa boats, Tepo & Gabbang</div>
          </div>
        </div>
      </div>
    </section>
  );
};
