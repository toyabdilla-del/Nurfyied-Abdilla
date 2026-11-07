import React, { useState, useRef, useEffect } from 'react';
import { Volume2, Mic, Square, Play, RotateCcw, CheckCircle2, Award } from 'lucide-react';
import { SINAMA_VOCABULARY, SinamaWord } from '../data/sinamaData';
import { playAcousticPhonetic, VoiceRecorder } from '../utils/audioEngine';

interface PronunciationStudioProps {
  initialWord?: SinamaWord;
  onExploreMore?: () => void;
}

export const PronunciationStudio: React.FC<PronunciationStudioProps> = ({
  initialWord,
}) => {
  const [selectedWord, setSelectedWord] = useState<SinamaWord>(
    initialWord || SINAMA_VOCABULARY[0]
  );
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [isPlayingGuide, setIsPlayingGuide] = useState(false);
  const [activeSyllableIdx, setActiveSyllableIdx] = useState<number | null>(null);

  // Recording State
  const [isRecording, setIsRecording] = useState(false);
  const [userAudioUrl, setUserAudioUrl] = useState<string | null>(null);
  const [recordedDuration, setRecordedDuration] = useState<number>(0);
  const [matchScore, setMatchScore] = useState<number | null>(null);
  const [phoneticTip, setPhoneticTip] = useState<string | null>(null);
  const [isPlayingUserAudio, setIsPlayingUserAudio] = useState(false);
  const [micError, setMicError] = useState<string | null>(null);

  const recorderRef = useRef<VoiceRecorder | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const userAudioRef = useRef<HTMLAudioElement | null>(null);

  // Sync when initialWord changes
  useEffect(() => {
    if (initialWord) {
      setSelectedWord(initialWord);
      resetPractice();
    }
  }, [initialWord]);

  const resetPractice = () => {
    setUserAudioUrl(null);
    setMatchScore(null);
    setPhoneticTip(null);
    setMicError(null);
    if (userAudioRef.current) {
      userAudioRef.current.pause();
    }
  };

  const handlePlayGuide = async () => {
    if (isPlayingGuide) return;
    setIsPlayingGuide(true);
    setActiveSyllableIdx(0);

    try {
      await playAcousticPhonetic(selectedWord.sinama, playbackSpeed, (idx) => {
        setActiveSyllableIdx(idx);
      });
    } finally {
      setIsPlayingGuide(false);
      setActiveSyllableIdx(null);
    }
  };

  const startRecording = async () => {
    setMicError(null);
    resetPractice();
    try {
      const recorder = new VoiceRecorder();
      recorderRef.current = recorder;

      await recorder.startRecording((freqData) => {
        // Draw live audio visualizer
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const barWidth = (canvas.width / freqData.length) * 2.2;
        let x = 0;

        for (let i = 0; i < freqData.length; i++) {
          const barHeight = (freqData[i] / 255) * canvas.height * 0.85;
          ctx.fillStyle = '#0f766e';
          ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
          x += barWidth + 1;
        }
      });

      setIsRecording(true);
    } catch (err) {
      console.error(err);
      setMicError('Microphone access was denied or is unavailable. Please allow microphone permissions.');
      setIsRecording(false);
    }
  };

  const stopRecording = async () => {
    if (!recorderRef.current || !isRecording) return;
    setIsRecording(false);

    try {
      const result = await recorderRef.current.stopRecording();
      setUserAudioUrl(result.audioUrl);
      setRecordedDuration(result.durationMs);
      setMatchScore(result.score);
      setPhoneticTip(result.tip);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePlayUserAudio = () => {
    if (!userAudioUrl) return;
    if (userAudioRef.current) {
      userAudioRef.current.currentTime = 0;
      userAudioRef.current.play();
      setIsPlayingUserAudio(true);
      userAudioRef.current.onended = () => setIsPlayingUserAudio(false);
    }
  };

  return (
    <section className="py-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <div className="text-xs font-semibold text-teal-800 uppercase tracking-wider mb-1">
          Audio Pronunciation Lab
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 font-display">
          Interactive Voice & Pronunciation Studio
        </h2>
        <p className="text-stone-600 text-sm mt-1">
          Listen to the native acoustic guide, view phonetic stresses, record your voice, and receive instant pronunciation feedback.
        </p>
      </div>

      {/* Target Word Selector */}
      <div className="bg-white rounded-xl p-5 border border-stone-200 shadow-sm mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <label htmlFor="word-select" className="text-xs font-semibold text-stone-500 uppercase tracking-wide">
            Select Practice Phrase:
          </label>
          <select
            id="word-select"
            value={selectedWord.id}
            onChange={(e) => {
              const found = SINAMA_VOCABULARY.find((w) => w.id === e.target.value);
              if (found) {
                setSelectedWord(found);
                resetPractice();
              }
            }}
            className="px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-teal-700/20 font-medium"
          >
            {SINAMA_VOCABULARY.map((w) => (
              <option key={w.id} value={w.id}>
                {w.sinama} — ({w.english})
              </option>
            ))}
          </select>
        </div>

        {/* Selected Word Showcase */}
        <div className="bg-stone-50 rounded-xl p-6 border border-stone-200/80">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="text-xs text-stone-500 capitalize mb-1">
                Category: {selectedWord.category.replace('_', ' ')}
              </div>
              <h3 className="text-3xl font-bold text-stone-900 font-display">
                {selectedWord.sinama}
              </h3>
              <div className="text-sm font-mono text-stone-500 mt-1">
                {selectedWord.ipa}
              </div>
              <div className="text-base font-semibold text-teal-800 mt-2">
                "{selectedWord.english}"
              </div>
            </div>

            {/* Guide Audio Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="flex items-center gap-1.5 bg-stone-200/80 p-1 rounded-lg self-start sm:self-auto text-xs">
                <button
                  onClick={() => setPlaybackSpeed(1.0)}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    playbackSpeed === 1.0 ? 'bg-white text-stone-900 shadow-sm font-semibold' : 'text-stone-600'
                  }`}
                >
                  1.0x
                </button>
                <button
                  onClick={() => setPlaybackSpeed(0.75)}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    playbackSpeed === 0.75 ? 'bg-white text-stone-900 shadow-sm font-semibold' : 'text-stone-600'
                  }`}
                >
                  0.75x Slow
                </button>
              </div>

              <button
                onClick={handlePlayGuide}
                disabled={isPlayingGuide}
                className={`px-5 py-3 rounded-lg text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-sm ${
                  isPlayingGuide
                    ? 'bg-teal-700 animate-pulse'
                    : 'bg-teal-800 hover:bg-teal-700 active:scale-95'
                }`}
              >
                <Volume2 className="w-4 h-4" />
                <span>{isPlayingGuide ? 'Voicing...' : 'Play Native Guide'}</span>
              </button>
            </div>
          </div>

          {/* Interactive Syllable & Stress Display */}
          <div className="mt-6 pt-5 border-t border-stone-200">
            <div className="text-xs text-stone-500 font-medium mb-2">
              Syllables & Phonetic Stress (Capitalized indicates stress accent):
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {selectedWord.syllables.map((syl, idx) => {
                const isActive = activeSyllableIdx === idx;
                const isStress = idx === selectedWord.syllables.length - 2 || selectedWord.syllables.length === 1;
                return (
                  <div
                    key={syl + idx}
                    className={`px-3 py-2 rounded-lg border text-sm transition-all ${
                      isActive
                        ? 'bg-teal-800 text-white border-teal-800 shadow-md font-bold scale-105'
                        : isStress
                        ? 'bg-amber-50 text-amber-900 border-amber-200 font-semibold'
                        : 'bg-white text-stone-700 border-stone-200'
                    }`}
                  >
                    <span>{syl}</span>
                    {isStress && (
                      <span className="block text-[10px] text-amber-700 font-normal">Stress</span>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="mt-2 text-xs font-mono text-teal-900">
              Guide transcription: <span className="font-bold">{selectedWord.phoneticGuide}</span>
            </div>
          </div>

          {/* Linguistic Notes */}
          {(selectedWord.glottalStops || selectedWord.geminates) && (
            <div className="mt-4 p-3 bg-stone-100 rounded-lg text-xs text-stone-700 space-y-1">
              {selectedWord.glottalStops && (
                <div>
                  <strong className="text-teal-900">Glottal Stop (ʔ / '):</strong> In Sinama, words ending in vowels often feature a distinct glottal catch—an instantaneous closure of the vocal cords similar to the break in "uh-oh".
                </div>
              )}
              {selectedWord.geminates && (
                <div>
                  <strong className="text-amber-900">Geminate Consonants:</strong> The doubled consonants are prolonged and pronounced with greater muscular tension.
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Voice Recorder & Comparison Studio */}
      <div className="bg-white rounded-xl p-6 border border-stone-200 shadow-sm">
        <h4 className="text-lg font-bold text-stone-900 mb-1 font-display">
          Record Your Pronunciation
        </h4>
        <p className="text-xs text-stone-500 mb-4">
          Speak clearly into your microphone to compare your pronunciation with the native guide.
        </p>

        {/* Mic Error */}
        {micError && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700">
            {micError}
          </div>
        )}

        {/* Live Visualizer Canvas */}
        <div className="bg-stone-900 rounded-lg h-24 relative overflow-hidden flex items-center justify-center p-2 mb-4">
          {isRecording ? (
            <canvas ref={canvasRef} width={600} height={96} className="w-full h-full" />
          ) : (
            <div className="text-xs text-stone-400 font-mono flex items-center gap-2">
              <Mic className="w-4 h-4 text-stone-500" />
              <span>Microphone idle. Click "Start Recording" to test your voice.</span>
            </div>
          )}
        </div>

        {/* Recording Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {!isRecording ? (
            <button
              onClick={startRecording}
              className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-2 shadow-sm"
            >
              <Mic className="w-4 h-4" />
              <span>Start Recording</span>
            </button>
          ) : (
            <button
              onClick={stopRecording}
              className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-2 shadow-sm animate-pulse"
            >
              <Square className="w-4 h-4 text-red-400" />
              <span>Stop Recording</span>
            </button>
          )}

          {userAudioUrl && (
            <>
              <button
                onClick={handlePlayUserAudio}
                disabled={isPlayingUserAudio}
                className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-xs font-semibold transition-colors flex items-center gap-2"
              >
                <Play className="w-3.5 h-3.5" />
                <span>{isPlayingUserAudio ? 'Playing...' : 'Play Your Voice'}</span>
              </button>

              <button
                onClick={handlePlayGuide}
                disabled={isPlayingGuide}
                className="px-4 py-2.5 bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 rounded-lg text-xs font-semibold transition-colors flex items-center gap-2"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Play Native Guide</span>
              </button>

              <button
                onClick={resetPractice}
                className="p-2.5 text-stone-400 hover:text-stone-600 rounded-lg text-xs transition-colors"
                title="Reset recording"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </>
          )}
        </div>

        {/* Pronunciation Feedback & Score Meter */}
        {matchScore !== null && (
          <div className="mt-6 pt-5 border-t border-stone-200 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-teal-50/60 p-4 rounded-xl border border-teal-200/80">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-teal-800 text-white rounded-lg shrink-0 mt-0.5">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-stone-900">Pronunciation Match</span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-teal-800 text-white font-bold tabular-nums">
                      {matchScore}%
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    {phoneticTip}
                  </p>
                </div>
              </div>

              <div className="sm:text-right shrink-0">
                <div className="text-[11px] text-stone-500 font-mono">Sample length: ~{recordedDuration}ms</div>
                <div className="flex items-center gap-1 text-xs text-teal-800 font-medium mt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Cadence analyzed</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Hidden Audio Player for User's Voice */}
        {userAudioUrl && (
          <audio
            ref={userAudioRef}
            src={userAudioUrl}
            className="hidden"
            onEnded={() => setIsPlayingUserAudio(false)}
          />
        )}
      </div>
    </section>
  );
};
