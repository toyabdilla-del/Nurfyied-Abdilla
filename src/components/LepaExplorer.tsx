import React, { useState } from 'react';
import { Volume2, Anchor, Compass, Info, Check } from 'lucide-react';
import { LEPA_HOTSPOTS } from '../data/sinamaData';
import { playAcousticPhonetic } from '../utils/audioEngine';

export const LepaExplorer: React.FC = () => {
  const [activeHotspotId, setActiveHotspotId] = useState<string>(LEPA_HOTSPOTS[0].id);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const activeHotspot = LEPA_HOTSPOTS.find((h) => h.id === activeHotspotId) || LEPA_HOTSPOTS[0];

  const handlePlayPronunciation = async (text: string) => {
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
      {/* Top Description */}
      <div className="p-6 border-b border-stone-200 bg-stone-50/50">
        <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 uppercase tracking-wide mb-1">
          <Anchor className="w-3.5 h-3.5" />
          <span>Living Heritage · Maritime Architecture</span>
        </div>
        <h3 className="text-2xl font-bold text-stone-900 font-display">
          Anatomy of the Sama Lepa Houseboat
        </h3>
        <p className="text-sm text-stone-600 mt-1 max-w-3xl leading-relaxed">
          Crafted by master boatbuilders (magpanday lepa) without a single iron nail, the Lepa is an architectural wonder that housed entire families across Sulu waters. Click the interactive hotspots to discover each component's Sinama name and nautical purpose.
        </p>
      </div>

      {/* Interactive Visual Blueprint Stage */}
      <div className="relative bg-stone-950 aspect-[16/9] max-h-[460px] overflow-hidden">
        <img
          src="/src/assets/images/hero_lepa_houseboat_1794036626701.jpg"
          alt="Traditional Lepa Houseboat on Sulu waters"
          className="w-full h-full object-cover opacity-85 hover:opacity-95 transition-opacity duration-500"
          referrerPolicy="no-referrer"
        />

        {/* Hotspot Pins */}
        {LEPA_HOTSPOTS.map((spot) => {
          const isSelected = spot.id === activeHotspotId;
          return (
            <button
              key={spot.id}
              onClick={() => setActiveHotspotId(spot.id)}
              style={{ left: spot.x, top: spot.y }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 z-10 focus:outline-none ${
                isSelected ? 'scale-125' : 'hover:scale-110'
              }`}
              title={spot.name}
            >
              <div className="relative flex items-center justify-center">
                <span
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg transition-colors ${
                    isSelected
                      ? 'bg-amber-500 ring-4 ring-amber-300/60'
                      : 'bg-teal-700/90 hover:bg-teal-600 ring-2 ring-white/80'
                  }`}
                >
                  {isSelected ? <Check className="w-4 h-4" /> : <Compass className="w-3.5 h-3.5" />}
                </span>
                <span className="sr-only">{spot.name}</span>
              </div>
            </button>
          );
        })}

        {/* Floating Blueprint Guide Bar */}
        <div className="absolute bottom-3 left-3 right-3 bg-stone-900/90 backdrop-blur-md text-white p-3 rounded-xl border border-stone-700/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-teal-400 shrink-0" />
            <span>Click any glowing marker on the boat hull to inspect</span>
          </div>
          <div className="flex items-center gap-1 overflow-x-auto">
            {LEPA_HOTSPOTS.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveHotspotId(s.id)}
                className={`px-2 py-1 rounded transition-colors whitespace-nowrap ${
                  s.id === activeHotspotId
                    ? 'bg-amber-500 text-stone-950 font-bold'
                    : 'bg-stone-800 text-stone-300 hover:text-white'
                }`}
              >
                {s.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Detail Inspector Deck */}
      <div className="p-6 bg-stone-50 border-t border-stone-200">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-stone-500">Inspecting Component:</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-teal-100 text-teal-900 font-semibold">
                {activeHotspot.sinamaName}
              </span>
            </div>
            <h4 className="text-2xl font-bold text-stone-900 font-display">
              {activeHotspot.name}
            </h4>
            <p className="text-sm text-stone-700 leading-relaxed max-w-3xl">
              {activeHotspot.desc}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <button
              onClick={() => handlePlayPronunciation(activeHotspot.sinamaName)}
              disabled={isPlayingAudio}
              className={`px-4 py-2.5 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
                isPlayingAudio
                  ? 'bg-teal-700 text-white animate-pulse'
                  : 'bg-teal-800 hover:bg-teal-700 text-white shadow-sm'
              }`}
            >
              <Volume2 className="w-4 h-4" />
              <span>Pronounce: "{activeHotspot.sinamaName.split(' ')[0]}"</span>
            </button>
          </div>
        </div>

        {/* Architectural Knowledge Notes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-stone-200 text-xs text-stone-600">
          <div className="bg-white p-3.5 rounded-lg border border-stone-200">
            <div className="font-bold text-stone-900 mb-1">Mortise & Dowel Joining</div>
            Timbers are pinned with molave wood dowels (patuk). Seawater causes the wood to swell, naturally caulking and tightening seams.
          </div>
          <div className="bg-white p-3.5 rounded-lg border border-stone-200">
            <div className="font-bold text-stone-900 mb-1">Ukkil Maritime Iconography</div>
            The prow carvings depict ferns, coral crests, and sea birds, symbolizing swift sailing and peaceful homeward returns.
          </div>
          <div className="bg-white p-3.5 rounded-lg border border-stone-200">
            <div className="font-bold text-stone-900 mb-1">Living Hearth (Baonan)</div>
            At the stern, a sandbox fireplace called baonan safe-held open flame for cooking cassava and boiling morning tea over open water.
          </div>
        </div>
      </div>
    </div>
  );
};
