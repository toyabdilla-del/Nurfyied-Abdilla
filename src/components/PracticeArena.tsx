import React, { useState } from 'react';
import { Volume2, CheckCircle2, XCircle, Award, RotateCcw, ArrowRight, Shuffle } from 'lucide-react';
import { SINAMA_VOCABULARY, SinamaWord } from '../data/sinamaData';
import { playAcousticPhonetic } from '../utils/audioEngine';

export const PracticeArena: React.FC = () => {
  const [practiceMode, setPracticeMode] = useState<'listening' | 'flashcards' | 'sentence'>('listening');
  const [pearlsCount, setPearlsCount] = useState<number>(0);
  const [streakCount, setStreakCount] = useState<number>(0);

  // Mode 1: Listening Quiz state
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Mode 2: Flashcards state
  const [cardIndex, setCardIndex] = useState(0);
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  // Mode 3: Sentence Builder state
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [selectedTiles, setSelectedTiles] = useState<string[]>([]);
  const [isSentenceVerified, setIsSentenceVerified] = useState<boolean | null>(null);

  // Filter pool
  const quizWords = SINAMA_VOCABULARY.slice(0, 15);
  const currentQuizWord = quizWords[quizIndex % quizWords.length];

  // Generate 4 multiple-choice options for listening quiz
  const quizOptions = React.useMemo(() => {
    const correct = currentQuizWord.english;
    const distractors = SINAMA_VOCABULARY.filter((w) => w.id !== currentQuizWord.id)
      .map((w) => w.english)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    return [correct, ...distractors].sort(() => 0.5 - Math.random());
  }, [currentQuizWord]);

  // Sentence builder pool
  const sentenceQuestions = [
    {
      target: 'Malingkat subu, mma\'.',
      english: 'Good morning, father.',
      tiles: ['subu,', 'Malingkat', 'mma\'.']
    },
    {
      target: 'Bang nia\' hunas, nia\' da ta\'ik.',
      english: 'If there is low tide, there will surely be high tide.',
      tiles: ['hunas,', 'Bang', 'nia\'', 'nia\'', 'da', 'ta\'ik.']
    },
    {
      target: 'Nia\' bohe\' marayaw ma loma\'.',
      english: 'There is sweet fresh water in the home.',
      tiles: ['bohe\'', 'Nia\'', 'marayaw', 'loma\'.', 'ma']
    }
  ];
  const currentSentence = sentenceQuestions[sentenceIndex % sentenceQuestions.length];

  const handlePlayQuizAudio = async () => {
    if (isPlayingAudio) return;
    setIsPlayingAudio(true);
    try {
      await playAcousticPhonetic(currentQuizWord.sinama, 1.0);
    } finally {
      setIsPlayingAudio(false);
    }
  };

  const handleSelectAnswer = (option: string) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswer(option);
    setIsAnswerSubmitted(true);

    if (option === currentQuizWord.english) {
      setPearlsCount((p) => p + 1);
      setStreakCount((s) => s + 1);
    } else {
      setStreakCount(0);
    }
  };

  const handleNextQuiz = () => {
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setQuizIndex((prev) => prev + 1);
  };

  // Flashcards Handlers
  const currentCard: SinamaWord = SINAMA_VOCABULARY[cardIndex % SINAMA_VOCABULARY.length];

  const handleNextCard = () => {
    setIsCardFlipped(false);
    setCardIndex((prev) => prev + 1);
  };

  const handlePrevCard = () => {
    setIsCardFlipped(false);
    setCardIndex((prev) => (prev > 0 ? prev - 1 : SINAMA_VOCABULARY.length - 1));
  };

  // Sentence Builder Handlers
  const handleTileClick = (word: string, indexInAvailable: number) => {
    setSelectedTiles((prev) => [...prev, word]);
  };

  const handleRemoveTile = (indexInSelected: number) => {
    setSelectedTiles((prev) => prev.filter((_, i) => i !== indexInSelected));
    setIsSentenceVerified(null);
  };

  const verifySentence = async () => {
    const assembled = selectedTiles.join(' ').trim();
    const isCorrect = assembled.toLowerCase() === currentSentence.target.replace(/[.,]/g, '').toLowerCase() ||
                      assembled === currentSentence.target;
    setIsSentenceVerified(isCorrect);
    if (isCorrect) {
      setPearlsCount((p) => p + 2);
      setStreakCount((s) => s + 1);
      await playAcousticPhonetic(currentSentence.target, 1.0);
    } else {
      setStreakCount(0);
    }
  };

  const nextSentence = () => {
    setSelectedTiles([]);
    setIsSentenceVerified(null);
    setSentenceIndex((prev) => prev + 1);
  };

  return (
    <section className="py-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Top Banner with Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
        <div>
          <div className="text-xs font-semibold text-teal-800 uppercase tracking-wider mb-1">
            Practice Arena
          </div>
          <h2 className="text-2xl font-bold text-stone-900 font-display">
            Test Your Sinama Skills
          </h2>
        </div>

        {/* Gamified Badges */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold">
            <Award className="w-4 h-4 text-amber-600" />
            <span>{pearlsCount} Mutiara (Pearls)</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-50 border border-teal-200 text-teal-900 text-xs font-bold">
            <span>🔥 {streakCount} Streak</span>
          </div>
        </div>
      </div>

      {/* Mode Switcher */}
      <div className="flex items-center gap-2 p-1 bg-stone-100 rounded-xl max-w-md mx-auto">
        <button
          onClick={() => setPracticeMode('listening')}
          className={`flex-1 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap text-center ${
            practiceMode === 'listening'
              ? 'bg-white text-stone-900 shadow-sm font-bold'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Listening Quiz
        </button>
        <button
          onClick={() => setPracticeMode('flashcards')}
          className={`flex-1 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap text-center ${
            practiceMode === 'flashcards'
              ? 'bg-white text-stone-900 shadow-sm font-bold'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Flashcard Deck
        </button>
        <button
          onClick={() => setPracticeMode('sentence')}
          className={`flex-1 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap text-center ${
            practiceMode === 'sentence'
              ? 'bg-white text-stone-900 shadow-sm font-bold'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Sentence Builder
        </button>
      </div>

      {/* Mode 1: Listening Quiz */}
      {practiceMode === 'listening' && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between text-xs text-stone-500">
            <span>Challenge #{quizIndex + 1}</span>
            <span>Listen carefully & select the translation</span>
          </div>

          {/* Audio Playback Box */}
          <div className="text-center py-6 bg-stone-50 rounded-xl border border-stone-200/80">
            <button
              onClick={handlePlayQuizAudio}
              disabled={isPlayingAudio}
              className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center transition-all shadow-md ${
                isPlayingAudio
                  ? 'bg-teal-700 text-white animate-pulse'
                  : 'bg-teal-800 hover:bg-teal-700 text-white hover:scale-105 active:scale-95'
              }`}
              title="Click to hear phrase"
            >
              <Volume2 className="w-8 h-8" />
            </button>
            <div className="text-xs text-stone-600 font-medium mt-3">
              {isPlayingAudio ? 'Voicing Sinama audio...' : 'Click to hear the Sinama pronunciation'}
            </div>
            <div className="text-sm font-mono text-stone-400 mt-1">
              {currentQuizWord.ipa}
            </div>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {quizOptions.map((opt) => {
              const isSelected = selectedAnswer === opt;
              const isCorrect = opt === currentQuizWord.english;

              let btnStyle = 'bg-stone-50 border-stone-200 text-stone-800 hover:bg-stone-100';
              if (isAnswerSubmitted) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold';
                } else if (isSelected && !isCorrect) {
                  btnStyle = 'bg-rose-50 border-rose-500 text-rose-950 font-bold';
                } else {
                  btnStyle = 'bg-stone-50 border-stone-200 text-stone-400 opacity-60';
                }
              }

              return (
                <button
                  key={opt}
                  onClick={() => handleSelectAnswer(opt)}
                  disabled={isAnswerSubmitted}
                  className={`p-4 rounded-xl border text-left text-sm transition-all flex items-center justify-between ${btnStyle}`}
                >
                  <span>{opt}</span>
                  {isAnswerSubmitted && isCorrect && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  )}
                  {isAnswerSubmitted && isSelected && !isCorrect && (
                    <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback & Next Button */}
          {isAnswerSubmitted && (
            <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-xs">
                <span className="font-bold text-stone-900">Word in Sinama: </span>
                <span className="text-teal-900 font-bold text-sm">{currentQuizWord.sinama}</span>
                <span className="text-stone-500 ml-2">({currentQuizWord.phoneticGuide})</span>
              </div>

              <button
                onClick={handleNextQuiz}
                className="px-5 py-2.5 bg-teal-800 hover:bg-teal-700 text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <span>Next Question</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Mode 2: Flashcard Deck */}
      {practiceMode === 'flashcards' && (
        <div className="space-y-6">
          <div
            onClick={() => setIsCardFlipped(!isCardFlipped)}
            className="cursor-pointer min-h-[300px] bg-white rounded-2xl border-2 border-stone-200 hover:border-teal-700/60 p-8 shadow-sm flex flex-col justify-between transition-all select-none"
          >
            <div className="flex items-center justify-between text-xs text-stone-500">
              <span className="capitalize">{currentCard.category.replace('_', ' ')}</span>
              <span className="font-mono">Card {cardIndex + 1} of {SINAMA_VOCABULARY.length}</span>
            </div>

            <div className="text-center py-6">
              {!isCardFlipped ? (
                <>
                  <h3 className="text-4xl font-bold text-stone-900 font-display mb-2">
                    {currentCard.sinama}
                  </h3>
                  <div className="text-sm font-mono text-stone-500 mb-2">
                    {currentCard.ipa}
                  </div>
                  <div className="text-xs font-semibold text-teal-800 font-mono">
                    {currentCard.phoneticGuide}
                  </div>
                  <div className="text-xs text-stone-400 mt-6">
                    Tap to flip and reveal English meaning & cultural note
                  </div>
                </>
              ) : (
                <>
                  <div className="text-2xl font-bold text-stone-900 mb-2">
                    {currentCard.english}
                  </div>
                  <div className="text-xs text-stone-600 max-w-md mx-auto leading-relaxed mt-3 bg-amber-50/70 p-3 rounded-lg border border-amber-200/60">
                    {currentCard.culturalContext}
                  </div>
                  <div className="text-xs text-stone-400 mt-6">
                    Tap to flip back
                  </div>
                </>
              )}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-stone-100">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  playAcousticPhonetic(currentCard.sinama, 1.0);
                }}
                className="p-2 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Volume2 className="w-4 h-4" />
                <span>Audio</span>
              </button>

              <span className="text-xs text-stone-400">Click card to turn</span>
            </div>
          </div>

          {/* Flashcard Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={handlePrevCard}
              className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-lg transition-colors"
            >
              Previous
            </button>
            <button
              onClick={handleNextCard}
              className="px-4 py-2 bg-teal-800 hover:bg-teal-700 text-white text-xs font-semibold rounded-lg transition-colors"
            >
              Next Card
            </button>
          </div>
        </div>
      )}

      {/* Mode 3: Sentence Order Builder */}
      {practiceMode === 'sentence' && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
          <div className="text-xs text-stone-500 flex items-center justify-between">
            <span>Sentence Order Construction</span>
            <span className="font-mono">Exercise {sentenceIndex + 1} of {sentenceQuestions.length}</span>
          </div>

          <div>
            <div className="text-xs text-stone-400 uppercase font-semibold">Translate:</div>
            <div className="text-xl font-bold text-stone-900 mt-1">
              "{currentSentence.english}"
            </div>
          </div>

          {/* Assembled Sentence Box */}
          <div className="min-h-[70px] bg-stone-50 rounded-xl p-3 border-2 border-dashed border-stone-300 flex flex-wrap items-center gap-2">
            {selectedTiles.length === 0 ? (
              <span className="text-xs text-stone-400">Tap word tiles below to form the Sinama sentence...</span>
            ) : (
              selectedTiles.map((tile, i) => (
                <button
                  key={tile + i}
                  onClick={() => handleRemoveTile(i)}
                  className="px-3 py-1.5 rounded-lg bg-teal-800 text-white text-xs font-semibold shadow-sm hover:bg-teal-700 transition-colors flex items-center gap-1"
                >
                  <span>{tile}</span>
                  <span className="text-[10px] text-teal-300">×</span>
                </button>
              ))
            )}
          </div>

          {/* Available Word Tiles */}
          <div>
            <div className="text-xs text-stone-500 font-semibold mb-2">Available Words:</div>
            <div className="flex flex-wrap items-center gap-2">
              {currentSentence.tiles.map((tile, i) => {
                const isUsed = selectedTiles.includes(tile);
                return (
                  <button
                    key={tile + i}
                    onClick={() => handleTileClick(tile, i)}
                    disabled={isUsed}
                    className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-all ${
                      isUsed
                        ? 'bg-stone-100 text-stone-300 border-stone-200 cursor-not-allowed'
                        : 'bg-white text-stone-800 border-stone-300 hover:border-teal-700 hover:bg-teal-50'
                    }`}
                  >
                    {tile}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Verification Status */}
          {isSentenceVerified !== null && (
            <div
              className={`p-3.5 rounded-xl border text-xs flex items-center justify-between ${
                isSentenceVerified
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-semibold'
                  : 'bg-rose-50 border-rose-300 text-rose-950 font-semibold'
              }`}
            >
              <span>
                {isSentenceVerified
                  ? '✨ Excellent grammar! That matches the natural Sinama word order.'
                  : 'Not quite. Check the placement of the subject and verbal markers.'}
              </span>
            </div>
          )}

          {/* Action Row */}
          <div className="flex items-center justify-between pt-4 border-t border-stone-200">
            <button
              onClick={() => {
                setSelectedTiles([]);
                setIsSentenceVerified(null);
              }}
              className="text-xs text-stone-500 hover:text-stone-800 flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Tiles</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={verifySentence}
                disabled={selectedTiles.length === 0}
                className="px-4 py-2 bg-teal-800 hover:bg-teal-700 text-white rounded-lg text-xs font-semibold transition-colors"
              >
                Check Sentence
              </button>
              {isSentenceVerified && (
                <button
                  onClick={nextSentence}
                  className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5"
                >
                  <span>Next</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
