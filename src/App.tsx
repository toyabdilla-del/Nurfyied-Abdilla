/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { TranslatorSection } from './components/TranslatorSection';
import { VocabularyExplorer } from './components/VocabularyExplorer';
import { PronunciationStudio } from './components/PronunciationStudio';
import { CulturalSection } from './components/CulturalSection';
import { GabbangInstrument } from './components/GabbangInstrument';
import { PracticeArena } from './components/PracticeArena';
import { Footer } from './components/Footer';
import { SinamaWord, SINAMA_VOCABULARY } from './data/sinamaData';

export default function App() {
  const [activeTab, setActiveTab] = useState<'translator' | 'lexicon' | 'studio' | 'culture' | 'gabbang' | 'practice'>('translator');
  const [selectedWordForStudio, setSelectedWordForStudio] = useState<SinamaWord>(SINAMA_VOCABULARY[0]);

  const handleSelectWordForStudio = (word: SinamaWord) => {
    setSelectedWordForStudio(word);
    setActiveTab('studio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickPractice = () => {
    setActiveTab('studio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col selection:bg-teal-800 selection:text-white">
      {/* Strict 3-zone Top Bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onQuickPractice={handleQuickPractice}
      />

      {/* Main Content Flow */}
      <main className="flex-1">
        {/* Hero Section shown on the primary view */}
        <HeroSection
          onOpenTranslator={() => {
            setActiveTab('translator');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onExploreLessons={() => {
            setActiveTab('lexicon');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenStudio={() => {
            setActiveTab('studio');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />

        {/* Tab Views */}
        <div id="content-section">
          {activeTab === 'translator' && (
            <TranslatorSection
              onLearnMore={() => {
                setActiveTab('lexicon');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}

          {activeTab === 'lexicon' && (
            <VocabularyExplorer onSelectForStudio={handleSelectWordForStudio} />
          )}

          {activeTab === 'studio' && (
            <PronunciationStudio initialWord={selectedWordForStudio} />
          )}

          {activeTab === 'culture' && (
            <CulturalSection initialModule="lepa" />
          )}

          {activeTab === 'gabbang' && (
            <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <GabbangInstrument />
            </section>
          )}

          {activeTab === 'practice' && (
            <PracticeArena />
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer onSelectTab={(tab) => {
        setActiveTab(tab);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }} />
    </div>
  );
}
