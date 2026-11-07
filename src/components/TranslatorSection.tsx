import React, { useState, useEffect } from 'react';
import { Volume2, ArrowRightLeft, Copy, Check, Sparkles, BookOpen, Clock, Trash2 } from 'lucide-react';
import { translateText, TranslationResult } from '../data/translatorData';
import { playAcousticPhonetic } from '../utils/audioEngine';

interface TranslatorSectionProps {
  onLearnMore?: () => void;
}

export const TranslatorSection: React.FC<TranslatorSectionProps> = ({ onLearnMore }) => {
  const [inputText, setInputText] = useState('Good morning');
  const [direction, setDirection] = useState<'en-to-sinama' | 'sinama-to-en' | 'tl-to-sinama'>('en-to-sinama');
  const [translationResult, setTranslationResult] = useState<TranslationResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [history, setHistory] = useState<TranslationResult[]>([]);

  // Instant translate effect
  useEffect(() => {
    if (!inputText.trim()) {
      setTranslationResult(null);
      return;
    }
    const res = translateText(inputText, direction);
    setTranslationResult(res);
  }, [inputText, direction]);

  const handleSwapDirection = () => {
    if (direction === 'en-to-sinama') {
      setDirection('sinama-to-en');
      if (translationResult) {
        setInputText(translationResult.translatedText);
      }
    } else if (direction === 'sinama-to-en') {
      setDirection('en-to-sinama');
      if (translationResult) {
        setInputText(translationResult.translatedText);
      }
    } else {
      setDirection('sinama-to-en');
    }
  };

  const handleCopy = () => {
    if (!translationResult) return;
    navigator.clipboard.writeText(translationResult.translatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePlayAudio = async () => {
    if (!translationResult || isPlayingAudio) return;
    setIsPlayingAudio(true);
    const textToSpeak =
      direction === 'sinama-to-en' ? translationResult.sourceText : translationResult.translatedText;
    try {
      await playAcousticPhonetic(textToSpeak, 1.0);
    } finally {
      setIsPlayingAudio(false);
    }
  };

  const handleSaveToHistory = () => {
    if (!translationResult) return;
    setHistory((prev) => {
      const filtered = prev.filter((h) => h.sourceText !== translationResult.sourceText);
      return [translationResult, ...filtered].slice(0, 6);
    });
  };

  const presetPhrases = [
    { label: 'Sinama Language', text: 'Sinama', dir: 'en-to-sinama' as const },
    { label: 'Sama Dilaut (Sea Bajau)', text: 'Sama Dilaut', dir: 'en-to-sinama' as const },
    { label: 'Speak Sinama', text: 'Speak Sinama', dir: 'en-to-sinama' as const },
    { label: 'Good morning', text: 'Good morning', dir: 'en-to-sinama' as const },
    { label: 'Thank you very much', text: 'Thank you very much', dir: 'en-to-sinama' as const },
    { label: 'How are you?', text: 'How are you', dir: 'en-to-sinama' as const },
    { label: 'Where do you live?', text: 'Where is your home', dir: 'en-to-sinama' as const },
    { label: 'Safe voyage', text: 'Safe voyage', dir: 'en-to-sinama' as const },
    { label: 'I am from Tawi-Tawi', text: 'I am from Tawi-Tawi', dir: 'en-to-sinama' as const },
    { label: 'Magsukul landu\' (Sinama)', text: 'Magsukul landu\'', dir: 'sinama-to-en' as const },
  ];

  return (
    <section className="py-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Title & Creator Attribution */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/80 text-xs font-semibold text-teal-800">
          <Sparkles className="w-3.5 h-3.5 text-teal-700" />
          <span>Sama Translator</span>
          <span aria-hidden="true">·</span>
          <span className="font-medium text-stone-600">by Nurfyied P. Abdilla</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight font-display">
          Sama Translator
        </h2>
        <p className="text-sm text-stone-600 max-w-2xl mx-auto">
          Translate seamlessly between English, Tagalog, and Bahasa Sinama (Central, Southern, & Sama Dilaut dialects) with authentic glottal audio pronunciation guides.
        </p>
      </div>

      {/* Main Translation Card */}
      <div className="bg-white rounded-2xl border border-stone-200/90 shadow-sm overflow-hidden">
        {/* Language Controls Header */}
        <div className="p-4 border-b border-stone-200/80 bg-stone-50 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-medium">
            {/* Direction Selector */}
            <div className="flex items-center gap-1 bg-stone-200/70 p-1 rounded-lg">
              <button
                onClick={() => setDirection('en-to-sinama')}
                className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                  direction === 'en-to-sinama'
                    ? 'bg-white text-stone-900 shadow-sm font-bold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                English → Sinama
              </button>
              <button
                onClick={() => setDirection('tl-to-sinama')}
                className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                  direction === 'tl-to-sinama'
                    ? 'bg-white text-stone-900 shadow-sm font-bold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Tagalog → Sinama
              </button>
              <button
                onClick={() => setDirection('sinama-to-en')}
                className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                  direction === 'sinama-to-en'
                    ? 'bg-white text-stone-900 shadow-sm font-bold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Sinama → English
              </button>
            </div>

            <button
              onClick={handleSwapDirection}
              className="p-2 rounded-lg bg-stone-200/70 hover:bg-stone-300 text-stone-700 transition-colors"
              title="Swap language direction"
            >
              <ArrowRightLeft className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="text-xs text-stone-500 font-mono hidden sm:block">
            Curated by Nurfyied P. Abdilla
          </div>
        </div>

        {/* Translation Split View (Input / Output) */}
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-stone-200">
          {/* Input Side */}
          <div className="p-6 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">
                <span>
                  {direction === 'sinama-to-en'
                    ? 'Sinama (Bahasa Sama)'
                    : direction === 'tl-to-sinama'
                    ? 'Tagalog / Filipino'
                    : 'English'}
                </span>
                {inputText && (
                  <button
                    onClick={() => setInputText('')}
                    className="text-stone-400 hover:text-stone-600 text-[11px] normal-case"
                  >
                    Clear text
                  </button>
                )}
              </div>

              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={
                  direction === 'sinama-to-en'
                    ? 'Enter Sinama phrase (e.g., Malingkat subu, Magsukul, Tahik)...'
                    : 'Type phrase or sentence in English or Tagalog...'
                }
                rows={5}
                className="w-full text-lg sm:text-xl text-stone-900 placeholder-stone-300 resize-none focus:outline-none bg-transparent"
              />
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-stone-100 text-xs text-stone-400 font-mono">
              <span>{inputText.length} characters</span>
              <span className="text-teal-800 font-sans font-medium">Instant Live Translate</span>
            </div>
          </div>

          {/* Output Side */}
          <div className="p-6 bg-stone-50/50 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">
                <span>
                  {direction === 'sinama-to-en' ? 'English Translation' : 'Sinama (Bahasa Sama)'}
                </span>

                {translationResult && (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={handleCopy}
                      className="p-1.5 rounded-md hover:bg-stone-200 text-stone-600 transition-colors"
                      title="Copy to clipboard"
                    >
                      {copied ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                )}
              </div>

              {translationResult ? (
                <div className="space-y-3">
                  <div className="text-2xl sm:text-3xl font-bold text-stone-900 font-display">
                    {translationResult.translatedText}
                  </div>

                  {/* Phonetics & IPA */}
                  <div className="space-y-1">
                    <div className="text-xs font-mono text-stone-500">
                      {translationResult.ipa}
                    </div>
                    <div className="text-xs font-semibold text-teal-900 font-mono">
                      Phonetic reading: {translationResult.phoneticGuide}
                    </div>
                  </div>

                  {/* Cultural Lore / Usage Note */}
                  {translationResult.culturalNote && (
                    <div className="text-xs text-stone-600 leading-relaxed bg-amber-50/70 p-3 rounded-lg border border-amber-200/60 mt-2">
                      <div className="font-semibold text-stone-800 text-[11px] uppercase tracking-wide mb-0.5">
                        Linguistic & Cultural Context:
                      </div>
                      <p>{translationResult.culturalNote}</p>
                    </div>
                  )}

                  {/* Morpheme Breakdown */}
                  {translationResult.breakdown && translationResult.breakdown.length > 0 && (
                    <div className="pt-2">
                      <div className="text-[11px] font-semibold text-stone-500 uppercase tracking-wide mb-1.5">
                        Word-by-word Breakdown:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {translationResult.breakdown.map((item, idx) => (
                          <div
                            key={item.word + idx}
                            className="text-xs px-2 py-1 rounded bg-white border border-stone-200 shadow-2xs"
                          >
                            <span className="font-bold text-stone-900">{item.word}</span>
                            <span className="text-stone-400 mx-1">→</span>
                            <span className="text-stone-600">{item.meaning}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="py-8 text-stone-400 text-sm">
                  Type something above to see the Sinama translation...
                </div>
              )}
            </div>

            {/* Audio & Action Bar */}
            {translationResult && (
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-stone-200">
                <button
                  onClick={handlePlayAudio}
                  disabled={isPlayingAudio}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold text-white transition-all flex items-center gap-2 shadow-sm ${
                    isPlayingAudio
                      ? 'bg-teal-700 animate-pulse'
                      : 'bg-teal-800 hover:bg-teal-700 active:scale-95'
                  }`}
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>{isPlayingAudio ? 'Voicing...' : 'Play Audio Pronunciation'}</span>
                </button>

                <button
                  onClick={handleSaveToHistory}
                  className="text-xs text-stone-500 hover:text-stone-800 flex items-center gap-1 font-medium transition-colors"
                >
                  <Clock className="w-3 h-3" />
                  <span>Pin to History</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Phrase Prompts */}
      <div className="space-y-3">
        <div className="text-xs font-semibold text-stone-500 uppercase tracking-wide flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5 text-teal-800" />
          <span>Quick Phrases & Common Expressions:</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {presetPhrases.map((phrase) => (
            <button
              key={phrase.label}
              onClick={() => {
                setDirection(phrase.dir);
                setInputText(phrase.text);
              }}
              className="px-3 py-1.5 text-xs font-medium rounded-lg bg-white hover:bg-teal-50 hover:text-teal-900 text-stone-700 border border-stone-200 hover:border-teal-300 transition-colors shadow-2xs"
            >
              {phrase.label}
            </button>
          ))}
        </div>
      </div>

      {/* Pinned / Recent Translations History */}
      {history.length > 0 && (
        <div className="bg-white rounded-xl p-5 border border-stone-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-teal-800" />
              <span>Saved Translation History</span>
            </div>
            <button
              onClick={() => setHistory([])}
              className="text-xs text-stone-400 hover:text-rose-600 flex items-center gap-1"
            >
              <Trash2 className="w-3 h-3" />
              <span>Clear</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {history.map((item, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setDirection(item.direction);
                  setInputText(item.sourceText);
                }}
                className="p-3 rounded-lg border border-stone-200 hover:border-teal-700/50 hover:bg-stone-50 cursor-pointer transition-all flex items-center justify-between"
              >
                <div>
                  <div className="text-stone-500 text-[11px]">{item.sourceText}</div>
                  <div className="font-bold text-stone-900 mt-0.5">{item.translatedText}</div>
                </div>
                <div className="text-[10px] text-teal-800 font-mono uppercase font-semibold">
                  {item.direction === 'en-to-sinama' ? 'EN → SAMA' : 'SAMA → EN'}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* About Bahasa Sinama / Linguistic Guide */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200/90 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-4">
          <div>
            <div className="text-xs font-semibold text-teal-800 uppercase tracking-wider mb-1">
              Linguistic Profile & Heritage
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-stone-900 font-display">
              About Bahasa Sinama (The Sama Language)
            </h3>
          </div>
          <button
            onClick={() => {
              setDirection('en-to-sinama');
              setInputText('Sinama');
            }}
            className="self-start sm:self-auto px-3.5 py-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-900 border border-teal-200 text-xs font-semibold transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-teal-700" />
            <span>Translate "Sinama"</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-stone-600 leading-relaxed">
          <div className="space-y-2 bg-stone-50 p-4 rounded-xl border border-stone-100">
            <div className="font-bold text-stone-900 text-sm">Etymology & Meaning</div>
            <p>
              The word <strong className="text-teal-950 font-semibold">"Sinama"</strong> is constructed from the ethnolinguistic root <strong className="text-stone-800">Sama</strong> plus the productive Austronesian infix <strong className="text-teal-800 font-mono">-in-</strong>. It literally translates to <em>"in the manner or speech of the Sama people."</em>
            </p>
          </div>

          <div className="space-y-2 bg-stone-50 p-4 rounded-xl border border-stone-100">
            <div className="font-bold text-stone-900 text-sm">Geographic Scope</div>
            <p>
              Spoken by over <strong className="text-stone-900">1 million people</strong> throughout the Sulu Archipelago (Tawi-Tawi, Sulu, Basilan), the Zamboanga Peninsula, Palawan, Sabah (Malaysia), and Sulawesi (Indonesia), forming an ancient maritime network.
            </p>
          </div>

          <div className="space-y-2 bg-stone-50 p-4 rounded-xl border border-stone-100">
            <div className="font-bold text-stone-900 text-sm">Key Phonological Traits</div>
            <p>
              Features prominent glottal stops <strong className="text-teal-800 font-mono">/ʔ/</strong> written as an apostrophe (e.g. <em>bohe'</em> water, <em>ina'</em> mother), geminate prolonged consonants (e.g. <em>mma'</em> father, <em>tllu</em> three), and natural penultimate syllable stress.
            </p>
          </div>
        </div>

        {/* Dialect Clusters */}
        <div className="pt-2">
          <div className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-3">
            Major Sinama Dialect Clusters:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-lg border border-stone-200 bg-white">
              <div className="font-bold text-stone-900">Central Sinama</div>
              <div className="text-[11px] text-teal-800 mt-0.5">Sama Dilaut & Sama Bihing</div>
              <div className="text-stone-500 mt-1 text-[11px]">Spoken by sea-dwelling communities across Bongao and Siasi.</div>
            </div>

            <div className="p-3 rounded-lg border border-stone-200 bg-white">
              <div className="font-bold text-stone-900">Southern Sinama</div>
              <div className="text-[11px] text-teal-800 mt-0.5">Simunul, Sibutu & Tandubas</div>
              <div className="text-stone-500 mt-1 text-[11px]">Renowned for pandan weaving traditions (Tepo) and boat carving.</div>
            </div>

            <div className="p-3 rounded-lg border border-stone-200 bg-white">
              <div className="font-bold text-stone-900">Northern Sinama</div>
              <div className="text-[11px] text-teal-800 mt-0.5">Sama Balanguingui / Bangingi'</div>
              <div className="text-stone-500 mt-1 text-[11px]">Historic master seafarers of the northern Sulu seas and Zamboanga.</div>
            </div>

            <div className="p-3 rounded-lg border border-stone-200 bg-white">
              <div className="font-bold text-stone-900">Pangutaran Sinama</div>
              <div className="text-[11px] text-teal-800 mt-0.5">Pangutaran Island</div>
              <div className="text-stone-500 mt-1 text-[11px]">Spoken on the coral atoll of Pangutaran with distinct lexical forms.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
