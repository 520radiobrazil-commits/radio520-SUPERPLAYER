import React, { useState } from 'react';
import { Sparkles, Loader2, ArrowRight } from 'lucide-react';
import { getStationRecommendation } from '../services/geminiService';
import { Station } from '../types';
import { STATIONS } from '../constants';

interface MoodTunerProps {
  onRecommendation: (station: Station, message: string) => void;
}

const MoodTuner: React.FC<MoodTunerProps> = ({ onRecommendation }) => {
  const [mood, setMood] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mood.trim()) return;

    setIsThinking(true);
    // Hide keyboard on mobile
    (document.activeElement as HTMLElement)?.blur();
    
    try {
      const recommendation = await getStationRecommendation(mood);
      if (recommendation) {
        const station = STATIONS.find(s => s.id === recommendation.stationId);
        if (station) {
          onRecommendation(station, recommendation.djIntro);
          setMood(''); 
        }
      }
    } catch (err) {
      console.error("Failed to tune", err);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="w-full mb-6">
      <div className="relative group rounded-2xl">
        {/* Glow effect behind */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-radio-accent rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
        
        <div className="relative bg-radio-900 border border-radio-700/50 flex items-center p-1.5 shadow-xl rounded-2xl">
          <form onSubmit={handleSubmit} className="flex items-center w-full">
            <div className="pl-3 text-radio-accent">
              {isThinking ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Sparkles className="h-5 w-5 fill-current" />
              )}
            </div>
            
            <input
              type="text"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              disabled={isThinking}
              className="w-full bg-transparent border-none text-white placeholder-blue-300/30 py-3.5 pl-3 pr-14 focus:ring-0 focus:outline-none text-sm font-medium tracking-wide"
              placeholder="Qual a sua vibe hoje?"
              style={{ caretColor: '#ff6600' }}
            />

            <button
              type="submit"
              disabled={!mood.trim() || isThinking}
              className={`
                absolute right-1.5 top-1.5 bottom-1.5 w-10 flex items-center justify-center rounded-xl transition-all duration-300
                ${!mood.trim() || isThinking 
                  ? 'bg-radio-800 text-gray-600' 
                  : 'bg-radio-accent text-white shadow-lg shadow-orange-500/30 rotate-0 hover:scale-105'
                }
              `}
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MoodTuner;