import React, { useState } from 'react';
import { Volume2, Sparkles, RefreshCw, Palette } from 'lucide-react';
import { playAcousticPhonetic } from '../utils/audioEngine';

const PANDAN_COLORS = [
  { id: 'sapphire', name: 'Tahik Indigo', hex: '#1e3a8a', label: 'Ocean Blue' },
  { id: 'saffron', name: 'Kunig Yellow', hex: '#d97706', label: 'Turmeric Gold' },
  { id: 'crimson', name: 'Kesumba Red', hex: '#b91c1c', label: 'Crimson Dye' },
  { id: 'natural', name: 'Buri Natural', hex: '#e7e5e4', label: 'Natural Pandan' },
];

const GRID_SIZE = 12;

// Traditional Pattern Generators
function generatePattern(type: 'waves' | 'bintang' | 'zigzag' | 'empty'): string[][] {
  const grid: string[][] = Array(GRID_SIZE)
    .fill(null)
    .map(() => Array(GRID_SIZE).fill('#e7e5e4'));

  if (type === 'waves') {
    // Alun-alun: undulating sea waves
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        const offset = Math.floor(Math.sin((c / GRID_SIZE) * Math.PI * 2) * 2);
        if ((r + offset) % 3 === 0) {
          grid[r][c] = '#1e3a8a';
        } else if ((r + offset) % 3 === 1) {
          grid[r][c] = '#d97706';
        } else {
          grid[r][c] = '#b91c1c';
        }
      }
    }
  } else if (type === 'bintang') {
    // Bintang: Starlight diamonds
    const center = Math.floor(GRID_SIZE / 2);
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        const dist = Math.abs(r - center + 0.5) + Math.abs(c - center + 0.5);
        if (dist <= 2) {
          grid[r][c] = '#d97706';
        } else if (dist <= 4) {
          grid[r][c] = '#b91c1c';
        } else if (dist <= 6) {
          grid[r][c] = '#1e3a8a';
        }
      }
    }
  } else if (type === 'zigzag') {
    // Sekko: Zigzag reef paths
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        const val = (r + (c % 4 < 2 ? c : 4 - c)) % 4;
        if (val === 0) grid[r][c] = '#b91c1c';
        else if (val === 1) grid[r][c] = '#1e3a8a';
        else if (val === 2) grid[r][c] = '#d97706';
      }
    }
  }

  return grid;
}

export const TepoWeavingSimulator: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState<string>(PANDAN_COLORS[0].hex);
  const [grid, setGrid] = useState<string[][]>(() => generatePattern('waves'));
  const [activePatternName, setActivePatternName] = useState<string>('Alun-alun (Sea Waves)');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handleCellClick = (r: number, c: number) => {
    setGrid((prev) => {
      const copy = prev.map((row) => [...row]);
      copy[r][c] = selectedColor;
      return copy;
    });
    setActivePatternName('Custom Hand-Weave');
  };

  const applyPresetPattern = (type: 'waves' | 'bintang' | 'zigzag') => {
    setGrid(generatePattern(type));
    if (type === 'waves') setActivePatternName('Alun-alun (Sea Waves)');
    if (type === 'bintang') setActivePatternName('Bintang (Starlight Diamond)');
    if (type === 'zigzag') setActivePatternName('Sekko (Zigzag Reef Pattern)');
  };

  const handleClearGrid = () => {
    setGrid(generatePattern('empty'));
    setActivePatternName('Plain Bleached Pandan');
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
          <Palette className="w-3.5 h-3.5" />
          <span>Interactive Cultural Craft · Textile Art</span>
        </div>
        <h3 className="text-2xl font-bold text-stone-900 font-display">
          Tepo Pandan Mat Weaving Simulator
        </h3>
        <p className="text-sm text-stone-600 mt-1 max-w-3xl leading-relaxed">
          The women of Simunul and Tandubas in Tawi-Tawi are renowned across the archipelago for weaving kaleidoscopic geometric pandan sleeping mats (Tepo). Choose natural dyed strands or load master motifs to explore their mathematical symmetry.
        </p>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Mat Weaving Stage */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-xs font-semibold text-stone-700">
              Current Pattern: <span className="text-teal-800 font-bold">{activePatternName}</span>
            </div>
            <button
              onClick={handleClearGrid}
              className="text-xs text-stone-500 hover:text-stone-800 flex items-center gap-1 font-medium transition-colors"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset Canvas</span>
            </button>
          </div>

          {/* Interactive Woven Loom Grid */}
          <div className="bg-stone-900 p-4 rounded-xl border border-stone-800 shadow-inner flex justify-center">
            <div
              className="grid gap-[2px] bg-stone-950 p-2 rounded-lg shadow-lg"
              style={{
                gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
                maxWidth: '420px',
                width: '100%',
                aspectRatio: '1/1',
              }}
            >
              {grid.map((row, r) =>
                row.map((color, c) => (
                  <button
                    key={`${r}-${c}`}
                    onClick={() => handleCellClick(r, c)}
                    style={{ backgroundColor: color }}
                    className="aspect-square rounded-[1px] transition-transform active:scale-90 hover:brightness-110 focus:outline-none"
                    title={`Row ${r + 1}, Col ${c + 1}`}
                  />
                ))
              )}
            </div>
          </div>

          {/* Dye Strand Color Palette */}
          <div>
            <div className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-2">
              Select Natural Pandan Dye:
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {PANDAN_COLORS.map((c) => {
                const isSelected = selectedColor === c.hex;
                return (
                  <button
                    key={c.id}
                    onClick={() => setSelectedColor(c.hex)}
                    className={`p-2.5 rounded-lg border text-left transition-all flex items-center gap-2.5 ${
                      isSelected
                        ? 'border-stone-900 bg-stone-100 shadow-sm'
                        : 'border-stone-200 bg-white hover:bg-stone-50'
                    }`}
                  >
                    <span
                      className="w-5 h-5 rounded-md border border-stone-300 shrink-0"
                      style={{ backgroundColor: c.hex }}
                    />
                    <div className="truncate">
                      <div className="text-xs font-bold text-stone-900 truncate">{c.name}</div>
                      <div className="text-[10px] text-stone-500 truncate">{c.label}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Preset Motif Buttons */}
          <div className="pt-2">
            <div className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-2">
              Load Master Motifs:
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => applyPresetPattern('waves')}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-900 border border-teal-200 transition-colors"
              >
                🌊 Alun-alun (Sea Waves)
              </button>
              <button
                onClick={() => applyPresetPattern('bintang')}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 transition-colors"
              >
                ⭐ Bintang (Starlight)
              </button>
              <button
                onClick={() => applyPresetPattern('zigzag')}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-200 transition-colors"
              >
                ⚡ Sekko (Reef Zigzag)
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Artisan Documentary Photo & Weaving Knowledge */}
        <div className="lg:col-span-5 space-y-5">
          <div className="relative rounded-xl overflow-hidden border border-stone-200 shadow-sm">
            <img
              src="/src/assets/images/cultural_tepo_weaving_1794036626601.jpg"
              alt="Close-up hands of a Sama master weaver crafting a colorful pandan mat"
              className="w-full h-52 object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="p-3 bg-stone-900 text-stone-200 text-xs">
              Sama master weaver splitting and hand-plaiting colored pandan strands without a mechanical loom.
            </div>
          </div>

          {/* Key Terminology & Pronunciation */}
          <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-3">
            <div className="text-xs font-bold text-stone-900 flex items-center justify-between">
              <span>Sinama Weaving Lexicon</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            </div>

            <div className="flex items-center justify-between text-xs py-1 border-b border-stone-200">
              <div>
                <span className="font-bold text-stone-900">Tepo</span>
                <span className="text-stone-500 font-mono ml-1.5">/te.poʔ/</span>
                <div className="text-[11px] text-stone-600">Handwoven pandan mat</div>
              </div>
              <button
                onClick={() => handlePlayWord('Tepo')}
                disabled={isPlayingAudio}
                className="p-1.5 rounded-md hover:bg-stone-200 text-teal-800 transition-colors"
                title="Hear pronunciation"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center justify-between text-xs py-1 border-b border-stone-200">
              <div>
                <span className="font-bold text-stone-900">Alun-alun</span>
                <span className="text-stone-500 font-mono ml-1.5">/ʔa.lun ʔa.lun/</span>
                <div className="text-[11px] text-stone-600">Ocean swell wave motif</div>
              </div>
              <button
                onClick={() => handlePlayWord('Alun-alun')}
                disabled={isPlayingAudio}
                className="p-1.5 rounded-md hover:bg-stone-200 text-teal-800 transition-colors"
                title="Hear pronunciation"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center justify-between text-xs py-1">
              <div>
                <span className="font-bold text-stone-900">Jjangat</span>
                <span className="text-stone-500 font-mono ml-1.5">/d͡ʒa.ŋat/</span>
                <div className="text-[11px] text-stone-600">Multi-bladed bamboo stripping comb</div>
              </div>
              <button
                onClick={() => handlePlayWord('Jjangat')}
                disabled={isPlayingAudio}
                className="p-1.5 rounded-md hover:bg-stone-200 text-teal-800 transition-colors"
                title="Hear pronunciation"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="text-xs text-stone-600 leading-relaxed bg-amber-50/60 p-3.5 rounded-xl border border-amber-200/60">
            <strong>Heirloom Tradition:</strong> Tepo mats are treasured heirlooms given as wedding dowries and ceremonial seating. Each motif is memorized through oral rhymes passed down from mother to daughter across generations.
          </div>
        </div>
      </div>
    </div>
  );
};
