import React, { useState } from 'react';
import { Anchor, Palette, Music, BookOpen, Volume2, Sparkles } from 'lucide-react';
import { CULTURAL_LESSONS } from '../data/sinamaData';
import { LepaExplorer } from './LepaExplorer';
import { TepoWeavingSimulator } from './TepoWeavingSimulator';
import { GabbangInstrument } from './GabbangInstrument';
import { playAcousticPhonetic } from '../utils/audioEngine';

interface CulturalSectionProps {
  initialModule?: 'lepa' | 'tepo' | 'gabbang' | 'lore';
}

export const CulturalSection: React.FC<CulturalSectionProps> = ({ initialModule = 'lepa' }) => {
  const [activeModule, setActiveModule] = useState<'lepa' | 'tepo' | 'gabbang' | 'lore'>(initialModule);
  const [selectedArticleId, setSelectedArticleId] = useState<string>('lepa-houseboat');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const selectedArticle =
    CULTURAL_LESSONS.find((a) => a.id === selectedArticleId) || CULTURAL_LESSONS[0];

  const handlePlayWord = async (text: string) => {
    if (isPlayingAudio) return;
    setIsPlayingAudio(true);
    try {
      await playAcousticPhonetic(text, 1.0);
    } finally {
      setIsPlayingAudio(false);
    }
  };

  return (
    <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Section Header */}
      <div>
        <div className="text-xs font-semibold text-teal-800 uppercase tracking-wider mb-1">
          Living Heritage & Ancestral Arts
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 font-display">
          Interactive Cultural Lessons
        </h2>
        <p className="text-stone-600 text-sm mt-1 max-w-2xl">
          Language cannot be separated from the ocean, the craftsmanship, and the musical pulse of the Sama-Bajau. Explore interactive simulations of living cultural treasures.
        </p>

        {/* Module Switcher Tabs (Segmented control) */}
        <div className="flex items-center gap-2 mt-6 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setActiveModule('lepa')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 ${
              activeModule === 'lepa'
                ? 'bg-teal-800 text-white shadow-sm'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
            }`}
          >
            <Anchor className="w-3.5 h-3.5" />
            <span>The Lepa Houseboat</span>
          </button>

          <button
            onClick={() => setActiveModule('tepo')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 ${
              activeModule === 'tepo'
                ? 'bg-teal-800 text-white shadow-sm'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Tepo Mat Weaving</span>
          </button>

          <button
            onClick={() => setActiveModule('gabbang')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 ${
              activeModule === 'gabbang'
                ? 'bg-teal-800 text-white shadow-sm'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
            }`}
          >
            <Music className="w-3.5 h-3.5" />
            <span>Gabbang Instrument</span>
          </button>

          <button
            onClick={() => setActiveModule('lore')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 ${
              activeModule === 'lore'
                ? 'bg-teal-800 text-white shadow-sm'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Maritime Lore & Epics</span>
          </button>
        </div>
      </div>

      {/* Dynamic Interactive Stage */}
      {activeModule === 'lepa' && <LepaExplorer />}
      {activeModule === 'tepo' && <TepoWeavingSimulator />}
      {activeModule === 'gabbang' && <GabbangInstrument />}
      {activeModule === 'lore' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Article Selector List */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-semibold text-stone-500 uppercase tracking-wide">
              Documentary Readings:
            </div>
            {CULTURAL_LESSONS.map((art) => {
              const isSelected = selectedArticleId === art.id;
              return (
                <button
                  key={art.id}
                  onClick={() => setSelectedArticleId(art.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    isSelected
                      ? 'border-teal-800 bg-white shadow-sm'
                      : 'border-stone-200 bg-stone-50/60 hover:bg-white'
                  }`}
                >
                  <div className="text-xs text-stone-500 font-medium mb-1 flex items-center justify-between">
                    <span>{art.tag}</span>
                    <span className="font-mono text-[11px]">{art.readTime}</span>
                  </div>
                  <div className="text-sm font-bold text-stone-900 leading-snug">
                    {art.title}
                  </div>
                  <div className="text-xs text-teal-800 font-medium mt-1 font-mono">
                    {art.sinamaTitle}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Article Detailed Reader */}
          <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-sm space-y-6">
            <div className="relative rounded-xl overflow-hidden border border-stone-200">
              <img
                src={selectedArticle.coverImage}
                alt={selectedArticle.title}
                className="w-full h-64 object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div>
              <div className="text-xs text-stone-500 font-medium mb-1">
                {selectedArticle.tag} · {selectedArticle.readTime}
              </div>
              <h3 className="text-2xl font-bold text-stone-900 font-display">
                {selectedArticle.title}
              </h3>
              <div className="text-sm font-semibold text-teal-800 mt-1">
                {selectedArticle.sinamaTitle}
              </div>
            </div>

            <div className="space-y-4 text-sm text-stone-700 leading-relaxed">
              {selectedArticle.content.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Key Vocabulary in Context */}
            <div className="mt-6 pt-6 border-t border-stone-200 bg-stone-50 p-4 rounded-xl">
              <div className="text-xs font-bold text-stone-900 mb-3 flex items-center justify-between">
                <span>Key Sinama Terms in this Lesson:</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {selectedArticle.keyVocabulary.map((kv) => (
                  <div
                    key={kv.word}
                    className="p-2.5 bg-white rounded-lg border border-stone-200 flex items-center justify-between"
                  >
                    <div>
                      <span className="font-bold text-stone-900">{kv.word}</span>
                      <div className="text-[11px] text-stone-500">{kv.meaning}</div>
                    </div>
                    <button
                      onClick={() => handlePlayWord(kv.word)}
                      disabled={isPlayingAudio}
                      className="p-1 rounded text-teal-800 hover:bg-stone-100 transition-colors"
                      title="Listen"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
