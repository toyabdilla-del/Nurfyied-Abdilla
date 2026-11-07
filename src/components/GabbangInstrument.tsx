import React, { useState, useEffect } from 'react';
import { Volume2, Play, Music, Sparkles } from 'lucide-react';
import { GABBANG_KEYS, TRADITIONAL_RHYTHMS } from '../data/sinamaData';
import { playGabbangNote, playAcousticPhonetic } from '../utils/audioEngine';

export const GabbangInstrument: React.FC = () => {
  const [activeKeyIdx, setActiveKeyIdx] = useState<number | null>(null);
  const [isPlayingRhythm, setIsPlayingRhythm] = useState(false);
  const [rhythmName, setRhythmName] = useState<string | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Keyboard controls (Keys 1-7)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const num = parseInt(e.key, 10);
      if (num >= 1 && num <= 7) {
        strikeKey(num - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const strikeKey = (index: number) => {
    const key = GABBANG_KEYS[index];
    if (!key) return;

    setActiveKeyIdx(index);
    playGabbangNote(key.freq, 1.2);
    setTimeout(() => {
      setActiveKeyIdx(null);
    }, 150);
  };

  const handlePlayRhythm = async (rhythmId: string) => {
    if (isPlayingRhythm) return;
    const rhythm = TRADITIONAL_RHYTHMS.find((r) => r.id === rhythmId);
    if (!rhythm) return;

    setIsPlayingRhythm(true);
    setRhythmName(rhythm.name);

    for (let i = 0; i < rhythm.sequence.length; i++) {
      const keyIndex = rhythm.sequence[i];
      strikeKey(keyIndex);
      await new Promise((resolve) => setTimeout(resolve, rhythm.tempoMs));
    }

    setIsPlayingRhythm(false);
    setRhythmName(null);
  };

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
    <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
      {/* Header */}
      <div className="p-6 border-b border-stone-200 bg-stone-50/50">
        <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 uppercase tracking-wide mb-1">
          <Music className="w-3.5 h-3.5" />
          <span>Living Music Heritage · Bamboo Acoustics</span>
        </div>
        <h3 className="text-2xl font-bold text-stone-900 font-display">
          Playable Sama Gabbang Bamboo Xylophone
        </h3>
        <p className="text-sm text-stone-600 mt-1 max-w-3xl leading-relaxed">
          The Gabbang is the melodic heartbeat of the Sama people. Strike the bamboo keys (or press keys 1–7 on your keyboard) to create resonant acoustic tones, or play traditional ostinato rhythms.
        </p>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Playable Instrument Stage */}
        <div className="lg:col-span-7 space-y-6">
          {/* Status Bar */}
          <div className="flex items-center justify-between text-xs font-medium text-stone-600">
            <div>
              Status:{' '}
              <span className="font-bold text-teal-900">
                {isPlayingRhythm ? `Playing ${rhythmName}...` : 'Ready for free play (Press 1–7)'}
              </span>
            </div>
            <div className="text-stone-400 font-mono">Web Audio Bamboo Timbre</div>
          </div>

          {/* Gabbang Physical Frame Sandbox */}
          <div className="relative bg-gradient-to-b from-amber-950 to-stone-900 p-6 sm:p-8 rounded-2xl shadow-xl border-4 border-amber-900/90">
            {/* Ukkil Carving Ornamental Border Top & Bottom */}
            <div className="text-[10px] uppercase font-mono tracking-widest text-amber-500/70 text-center mb-4">
              ◈ Ukkil Resonant Soundbox ◈
            </div>

            {/* Bamboo Keys Row */}
            <div className="flex items-end justify-between gap-1.5 sm:gap-2.5 h-64 sm:h-72 px-2 pb-4">
              {GABBANG_KEYS.map((k, idx) => {
                const isPressed = activeKeyIdx === idx;
                // Height tapers from lower pitch (longer bamboo) to higher pitch (shorter bamboo)
                const heightPercent = 95 - idx * 7;

                return (
                  <button
                    key={k.keyNum}
                    onClick={() => strikeKey(idx)}
                    style={{ height: `${heightPercent}%` }}
                    className={`flex-1 rounded-lg flex flex-col justify-between items-center py-3 px-1 transition-all focus:outline-none relative group select-none ${
                      isPressed
                        ? 'bg-amber-300 text-amber-950 scale-95 shadow-inner'
                        : 'bg-gradient-to-t from-amber-800 via-amber-700 to-amber-600 hover:from-amber-700 hover:to-amber-500 text-amber-100 shadow-md'
                    }`}
                  >
                    {/* Bamboo Grain / Texture lines */}
                    <div className="w-full flex justify-center gap-1 opacity-25">
                      <div className="w-[1px] h-6 bg-stone-950" />
                      <div className="w-[1px] h-6 bg-stone-950" />
                    </div>

                    {/* Middle Note Name */}
                    <div className="text-center">
                      <div className="text-xs sm:text-sm font-bold font-display">{k.note}</div>
                      <div className="text-[10px] opacity-80">{k.label}</div>
                    </div>

                    {/* Bottom Key Number indicator */}
                    <div className="w-5 h-5 rounded-full bg-amber-950/40 flex items-center justify-center text-[10px] font-mono font-bold">
                      {k.keyNum}
                    </div>

                    {/* Mallet Strike Animation Ripple */}
                    {isPressed && (
                      <span className="absolute -top-3 w-4 h-4 rounded-full bg-amber-200 animate-ping" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="text-[10px] text-amber-300/60 text-center mt-2 font-mono">
              Lower Pitch (Longer Bamboo) ────► Higher Pitch (Shorter Bamboo)
            </div>
          </div>

          {/* Preset Traditional Rhythms (Titik) */}
          <div className="bg-stone-50 p-4 rounded-xl border border-stone-200">
            <div className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-3 flex items-center gap-1.5">
              <Play className="w-3.5 h-3.5 text-teal-800" />
              <span>Autoplay Traditional Rhythms (Titik):</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {TRADITIONAL_RHYTHMS.map((rhythm) => (
                <div
                  key={rhythm.id}
                  className="p-3 bg-white rounded-lg border border-stone-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="text-xs font-bold text-stone-900">{rhythm.name}</div>
                    <div className="text-[11px] text-stone-500 mt-0.5 leading-relaxed">
                      {rhythm.desc}
                    </div>
                  </div>
                  <button
                    onClick={() => handlePlayRhythm(rhythm.id)}
                    disabled={isPlayingRhythm}
                    className="mt-3 px-3 py-1.5 rounded-md bg-teal-800 hover:bg-teal-700 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Play className="w-3 h-3" />
                    <span>Play Rhythm</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Cultural Photo & Context */}
        <div className="lg:col-span-5 space-y-5">
          <div className="relative rounded-xl overflow-hidden border border-stone-200 shadow-sm">
            <img
              src="/src/assets/images/cultural_gabbang_music_1794036626564.jpg"
              alt="Hand-carved wooden Gabbang xylophone with padded beaters and okir motifs"
              className="w-full h-52 object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="p-3 bg-stone-900 text-stone-200 text-xs">
              Traditional carved Gabbang with rubber-padded wooden mallets resting on woven mats.
            </div>
          </div>

          {/* Lexicon of Sama Music */}
          <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-3">
            <div className="text-xs font-bold text-stone-900 flex items-center justify-between">
              <span>Sama Musical Terminology</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            </div>

            <div className="flex items-center justify-between text-xs py-1 border-b border-stone-200">
              <div>
                <span className="font-bold text-stone-900">Gabbang</span>
                <span className="text-stone-500 font-mono ml-1.5">/gab.baŋ/</span>
                <div className="text-[11px] text-stone-600">Bamboo xylophone with soundbox</div>
              </div>
              <button
                onClick={() => handlePlayWord('Gabbang')}
                disabled={isPlayingAudio}
                className="p-1.5 rounded-md hover:bg-stone-200 text-teal-800 transition-colors"
                title="Hear pronunciation"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center justify-between text-xs py-1 border-b border-stone-200">
              <div>
                <span className="font-bold text-stone-900">Titik</span>
                <span className="text-stone-500 font-mono ml-1.5">/ti.tik/</span>
                <div className="text-[11px] text-stone-600">Percussive rhythmic composition</div>
              </div>
              <button
                onClick={() => handlePlayWord('Titik')}
                disabled={isPlayingAudio}
                className="p-1.5 rounded-md hover:bg-stone-200 text-teal-800 transition-colors"
                title="Hear pronunciation"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center justify-between text-xs py-1">
              <div>
                <span className="font-bold text-stone-900">Igal</span>
                <span className="text-stone-500 font-mono ml-1.5">/ʔi.gal/</span>
                <div className="text-[11px] text-stone-600">Traditional wave-like dance</div>
              </div>
              <button
                onClick={() => handlePlayWord('Igal')}
                disabled={isPlayingAudio}
                className="p-1.5 rounded-md hover:bg-stone-200 text-teal-800 transition-colors"
                title="Hear pronunciation"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="text-xs text-stone-600 leading-relaxed bg-amber-50/60 p-3.5 rounded-xl border border-amber-200/60">
            <strong>The Igal Connection:</strong> The syncopated rhythm of the Gabbang guides dancers performing the <em>Igal</em>. Dancers wear elongated metallic fingernails (<em>sula kuku</em>) and move their wrists in continuous fluid waves reflecting water ripples.
          </div>
        </div>
      </div>
    </div>
  );
};
