import React, { useState, useMemo } from 'react';
import { Search, Volume2, Mic, ChevronDown, ChevronUp, Sparkles, Filter } from 'lucide-react';
import { SINAMA_VOCABULARY, SINAMA_CATEGORIES, SinamaWord } from '../data/sinamaData';
import { playAcousticPhonetic } from '../utils/audioEngine';

interface VocabularyExplorerProps {
  onSelectForStudio: (word: SinamaWord) => void;
}

export const VocabularyExplorer: React.FC<VocabularyExplorerProps> = ({ onSelectForStudio }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [playingWordId, setPlayingWordId] = useState<string | null>(null);
  const [activeSyllable, setActiveSyllable] = useState<{ wordId: string; index: number } | null>(null);
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  const filteredWords = useMemo(() => {
    return SINAMA_VOCABULARY.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.sinama.toLowerCase().includes(q) ||
        item.english.toLowerCase().includes(q) ||
        item.phoneticGuide.toLowerCase().includes(q) ||
        item.culturalContext.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handlePlayAudio = async (word: SinamaWord) => {
    if (playingWordId) return;
    setPlayingWordId(word.id);
    setActiveSyllable({ wordId: word.id, index: 0 });

    try {
      await playAcousticPhonetic(word.sinama, playbackSpeed, (sylIdx) => {
        setActiveSyllable({ wordId: word.id, index: sylIdx });
      });
    } finally {
      setPlayingWordId(null);
      setActiveSyllable(null);
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedCardId(expandedCardId === id ? null : id);
  };

  return (
    <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="text-xs font-semibold text-teal-800 uppercase tracking-wider mb-1">
            Lexicon & Pronunciation
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 font-display">
            Sinama Vocabulary & Phonetic Guides
          </h2>
          <p className="text-stone-600 text-sm mt-1">
            Tap the speaker on any phrase to hear authentic syllable stresses and glottal closures.
          </p>
        </div>

        {/* Speed Selector */}
        <div className="flex items-center gap-2 self-start md:self-auto bg-stone-200/70 p-1 rounded-lg text-xs font-medium">
          <span className="text-stone-600 px-2">Speed:</span>
          <button
            onClick={() => setPlaybackSpeed(1.0)}
            className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap ${
              playbackSpeed === 1.0
                ? 'bg-white text-stone-900 shadow-sm font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            1.0x Normal
          </button>
          <button
            onClick={() => setPlaybackSpeed(0.75)}
            className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap ${
              playbackSpeed === 0.75
                ? 'bg-white text-stone-900 shadow-sm font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            0.75x Slow (Learner)
          </button>
        </div>
      </div>

      {/* Controls Bar: Search & Category Segments */}
      <div className="space-y-4 mb-8">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Sinama word, English meaning, or phonetic phrase..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-stone-200 rounded-lg text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600 px-1"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Category Tabs (Segmented control button row) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          <Filter className="w-3.5 h-3.5 text-stone-400 shrink-0 ml-1 mr-0.5" />
          {SINAMA_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-teal-800 text-white shadow-sm'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Vocabulary Cards Grid */}
      {filteredWords.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-stone-200 p-8">
          <p className="text-stone-600 text-base font-medium">No Sinama words match your search.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="mt-3 text-xs font-semibold text-teal-800 hover:underline"
          >
            Reset all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredWords.map((word) => {
            const isPlaying = playingWordId === word.id;
            const isExpanded = expandedCardId === word.id;

            return (
              <div
                key={word.id}
                className="bg-white rounded-xl border border-stone-200/90 hover:border-teal-700/40 transition-all shadow-sm flex flex-col justify-between overflow-hidden"
              >
                {/* Card Top */}
                <div className="p-5">
                  {/* Clean unboxed metadata with separators */}
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                    <div className="flex items-center gap-1.5 capitalize">
                      <span>{word.category.replace('_', ' ')}</span>
                      {word.glottalStops && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="text-teal-800 font-medium">Glottal catch ʔ</span>
                        </>
                      )}
                      {word.geminates && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="text-amber-800 font-medium">Geminate</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Main Word Title & Audio */}
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-stone-900 tracking-tight font-display">
                        {word.sinama}
                      </h3>
                      <div className="text-xs font-mono text-stone-500 mt-0.5">
                        {word.ipa}
                      </div>
                    </div>

                    <button
                      onClick={() => handlePlayAudio(word)}
                      disabled={isPlaying}
                      className={`p-2.5 rounded-lg transition-colors flex items-center justify-center shrink-0 ${
                        isPlaying
                          ? 'bg-teal-700 text-white animate-pulse'
                          : 'bg-stone-100 text-stone-700 hover:bg-teal-800 hover:text-white'
                      }`}
                      aria-label={`Listen to pronunciation for ${word.sinama}`}
                      title="Play authentic pronunciation"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Phonetic Pronunciation Guide */}
                  <div className="bg-stone-50 rounded-lg p-2.5 mb-3 border border-stone-100">
                    <div className="text-[11px] text-stone-500 font-medium mb-1">Pronunciation guide:</div>
                    <div className="text-xs font-semibold text-teal-900 tracking-wide font-mono">
                      {word.phoneticGuide}
                    </div>

                    {/* Syllable Progression Highlights */}
                    <div className="flex flex-wrap items-center gap-1 mt-2">
                      {word.syllables.map((syl, sIdx) => {
                        const isActive =
                          activeSyllable?.wordId === word.id && activeSyllable.index === sIdx;
                        return (
                          <span
                            key={syl + sIdx}
                            className={`text-[11px] px-1.5 py-0.5 rounded transition-colors ${
                              isActive
                                ? 'bg-teal-700 text-white font-bold'
                                : 'bg-white text-stone-600 border border-stone-200'
                            }`}
                          >
                            {syl}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {/* English Translation */}
                  <div className="text-sm font-semibold text-stone-800 mb-3">
                    {word.english}
                  </div>

                  {/* Example Sentence Preview */}
                  <div className="text-xs border-t border-stone-100 pt-3 text-stone-600 space-y-1">
                    <div className="italic text-stone-800 font-medium">"{word.exampleSentence.sinama}"</div>
                    <div className="text-stone-500 text-[11px]">"{word.exampleSentence.english}"</div>
                  </div>

                  {/* Expandable Cultural Context */}
                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t border-stone-100 text-xs text-stone-600 leading-relaxed bg-amber-50/50 p-2.5 rounded-lg border border-amber-100/60">
                      <div className="font-semibold text-stone-800 mb-1 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-700" />
                        <span>Cultural Insight</span>
                      </div>
                      <p>{word.culturalContext}</p>
                    </div>
                  )}
                </div>

                {/* Card Actions Footer */}
                <div className="px-5 py-3 bg-stone-50/80 border-t border-stone-100 flex items-center justify-between text-xs">
                  <button
                    onClick={() => toggleExpand(word.id)}
                    className="text-stone-600 hover:text-stone-900 font-medium flex items-center gap-1 transition-colors"
                  >
                    <span>{isExpanded ? 'Less info' : 'Cultural lore'}</span>
                    {isExpanded ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </button>

                  <button
                    onClick={() => onSelectForStudio(word)}
                    className="flex items-center gap-1.5 text-teal-800 hover:text-teal-900 font-semibold transition-colors"
                  >
                    <Mic className="w-3.5 h-3.5" />
                    <span>Practice Voice</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
