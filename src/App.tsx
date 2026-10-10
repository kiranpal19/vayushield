import React, { useState, useMemo } from 'react';
import { INITIAL_DELHI_STATIONS, getDelhiAverageAqi, getAqiCategory, getGrapStage } from './services/aqiDataService';
import { StationData } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MissionCards } from './components/MissionCards';
import { InteractiveSuite } from './components/InteractiveSuite';
import { InitiativesSection } from './components/InitiativesSection';
import { Footer } from './components/Footer';
import { AwsArchitectureModal } from './components/AwsArchitectureModal';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('hero');
  const [selectedEpisode, setSelectedEpisode] = useState<string>('winter_severe');
  const [isAwsModalOpen, setIsAwsModalOpen] = useState<boolean>(false);
  const [selectedStationId, setSelectedStationId] = useState<string>('rohini-bawana');

  // Compute stations modified by scenario episode
  const currentStations: StationData[] = useMemo(() => {
    return INITIAL_DELHI_STATIONS.map((station) => {
      let multiplier = 1.0;
      if (selectedEpisode === 'stubble_spike') {
        multiplier = station.zone === 'North' || station.zone === 'West' ? 1.15 : 1.08;
      } else if (selectedEpisode === 'moderate_breeze') {
        multiplier = 0.38;
      }

      const calculatedAqi = Math.min(500, Math.round(station.aqi * multiplier));
      const calculatedPm25 = Math.min(480, Math.round(station.pm25 * multiplier));
      const calculatedPm10 = Math.min(750, Math.round(station.pm10 * multiplier));

      return {
        ...station,
        aqi: calculatedAqi,
        pm25: calculatedPm25,
        pm10: calculatedPm10,
        category: getAqiCategory(calculatedAqi),
        grapStage: getGrapStage(calculatedAqi),
      };
    });
  }, [selectedEpisode]);

  const selectedStation = useMemo(() => {
    return currentStations.find((s) => s.id === selectedStationId) || currentStations[0];
  }, [currentStations, selectedStationId]);

  const delhiSummary = useMemo(() => {
    return getDelhiAverageAqi(currentStations);
  }, [currentStations]);

  const scrollToSuite = (tabId: string) => {
    setActiveTab(tabId);
    const element = document.getElementById('interactive-suite');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfb] text-gray-900 flex flex-col font-sans selection:bg-emerald-200 selection:text-emerald-900">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        delhiAverageAqi={delhiSummary.averageAqi}
        dominantGrapStage={delhiSummary.dominantGrapStage}
        selectedEpisode={selectedEpisode}
        setSelectedEpisode={setSelectedEpisode}
        onOpenAwsModal={() => setIsAwsModalOpen(true)}
        onScrollToTool={(toolId) => {
          if (toolId === 'hero') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            scrollToSuite(toolId);
          }
        }}
      />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <HeroSection
          stations={currentStations}
          onSelectStation={(stId) => setSelectedStationId(stId)}
          onExploreSuite={(tabId) => scrollToSuite(tabId)}
          onOpenAwsModal={() => setIsAwsModalOpen(true)}
        />

        {/* 2. Mission & 3 Tall Feature Cards */}
        <MissionCards
          onSelectFeature={(tabId) => scrollToSuite(tabId)}
          onOpenAwsModal={() => setIsAwsModalOpen(true)}
        />

        {/* 3. Interactive Air Intelligence Suite */}
        <InteractiveSuite
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          stations={currentStations}
          selectedStation={selectedStation}
          onSelectStation={(s) => setSelectedStationId(s.id)}
        />

        {/* 4. Initiatives & Lime Subscription Section */}
        <InitiativesSection />
      </main>

      {/* 5. Footer */}
      <Footer
        onOpenAwsModal={() => setIsAwsModalOpen(true)}
        onNavigate={(tabId) => scrollToSuite(tabId)}
      />

      {/* AWS Architecture & Compliance Modal */}
      <AwsArchitectureModal
        isOpen={isAwsModalOpen}
        onClose={() => setIsAwsModalOpen(false)}
      />
    </div>
  );
};

export default App;
