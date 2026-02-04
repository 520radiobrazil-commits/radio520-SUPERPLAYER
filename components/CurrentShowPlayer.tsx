import React, { useState, useEffect } from 'react';
import { Play, Pause, Radio, Clock } from 'lucide-react';
import { PROGRAMMING_SCHEDULE, MAIN_STATION } from '../constants';
import { Station, PlayerState } from '../types';

interface CurrentShowPlayerProps {
  playerState: PlayerState;
  onPlayStation: (station: Station) => void;
  onTogglePlay: () => void;
}

const HIGHLIGHT_IMAGES = [
  'https://public-rf-upload.minhawebradio.net/249695/ad/2f7dc4cf10eab1c6f431a20fd31ea6d5.jpg',
  'https://public-rf-upload.minhawebradio.net/249695/ad/3ac3d128a28692c7063ce2021d642ca3.png',
  'https://public-rf-upload.minhawebradio.net/249695/ad/67d1c902b44d51e7eb5d26a55d0ed7d6.png'
];

const CurrentShowPlayer: React.FC<CurrentShowPlayerProps> = ({ 
  playerState, 
  onPlayStation, 
  onTogglePlay 
}) => {
  const [currentShow, setCurrentShow] = useState<string>('Rádio 520');
  const [nextShow, setNextShow] = useState<string>('');
  const [progress, setProgress] = useState(0);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  // Helper to convert HH:mm string to minutes from midnight
  const getMinutes = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  };

  // Image Carousel Loop (15 seconds)
  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % HIGHLIGHT_IMAGES.length);
    }, 15000);
    return () => clearInterval(imageInterval);
  }, []);

  useEffect(() => {
    const updateSchedule = () => {
      const now = new Date();
      const day = now.getDay();
      const currentMinutes = now.getHours() * 60 + now.getMinutes();
      
      const todaysSchedule = PROGRAMMING_SCHEDULE[day];
      
      if (!todaysSchedule) return;

      const show = todaysSchedule.find(slot => {
        const start = getMinutes(slot.start);
        const end = getMinutes(slot.end);
        // Handle overlapping or simple ranges
        return currentMinutes >= start && currentMinutes < end;
      });

      if (show) {
        setCurrentShow(show.name);
        
        // Calculate Progress
        const start = getMinutes(show.start);
        const end = getMinutes(show.end);
        const duration = end - start;
        const elapsed = currentMinutes - start;
        setProgress((elapsed / duration) * 100);

        // Find Next Show
        const currentIndex = todaysSchedule.indexOf(show);
        if (currentIndex < todaysSchedule.length - 1) {
          setNextShow(todaysSchedule[currentIndex + 1].name);
        } else {
          setNextShow('Rádio 520 Madrugada');
        }
      } else {
        setCurrentShow('Rádio 520');
        setProgress(0);
      }
    };

    updateSchedule();
    const interval = setInterval(updateSchedule, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const isMainStationActive = playerState.currentStation?.id === MAIN_STATION.id;
  const isPlaying = isMainStationActive && playerState.isPlaying;

  const handlePlayClick = () => {
    if (isMainStationActive) {
      onTogglePlay();
    } else {
      onPlayStation(MAIN_STATION);
    }
  };

  return (
    <div className="w-full mb-6">
      <div className="relative group rounded-3xl overflow-hidden min-h-[220px]">
        
        {/* Background Carousel */}
        {HIGHLIGHT_IMAGES.map((img, index) => (
          <div 
            key={img}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentBgIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img 
              src={img} 
              alt="Destaque" 
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        {/* Dark Overlays for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20"></div>
        <div className={`absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-radio-accent/30 via-transparent to-transparent opacity-60 transition-opacity duration-700 ${isPlaying ? 'animate-pulse' : ''}`}></div>

        {/* Content Container */}
        <div className="relative p-6 flex flex-col gap-4 h-full justify-end z-10">
          
          {/* Top Row: Badge & Next Up */}
          <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
            <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-radio-accent/30 shadow-lg">
              <div className="w-2 h-2 rounded-full bg-radio-accent animate-pulse shadow-[0_0_8px_#ff6600]"></div>
              <span className="text-[10px] font-black tracking-widest text-white uppercase">No Ar Agora</span>
            </div>
            
            <div className="text-right bg-black/40 backdrop-blur-sm p-2 rounded-lg border border-white/5">
               <span className="text-[10px] text-gray-300 font-medium uppercase tracking-wider block">A seguir</span>
               <span className="text-[10px] text-white font-bold truncate max-w-[120px] block">{nextShow}</span>
            </div>
          </div>

          {/* Spacer to push content down since we are using flex-col justify-end isn't enough with absolute top elements */}
          <div className="mt-12"></div>

          {/* Center: Show Title */}
          <div className="mt-2 mb-1">
            <h2 className="text-2xl font-black text-white leading-tight drop-shadow-xl uppercase tracking-tight line-clamp-2">
              {currentShow}
            </h2>
            <div className="h-1 w-12 bg-radio-accent rounded-full mt-3 shadow-[0_0_10px_#ff6600]"></div>
          </div>

          {/* Bottom: Progress & Play */}
          <div className="flex items-center gap-4 mt-2 bg-black/30 backdrop-blur-md p-2 rounded-2xl border border-white/5">
            
            {/* Play Button */}
            <button 
              onClick={handlePlayClick}
              className="h-12 w-12 shrink-0 rounded-full bg-radio-accent text-white flex items-center justify-center shadow-[0_0_20px_rgba(255,102,0,0.4)] hover:scale-105 active:scale-95 transition-all group-hover:shadow-[0_0_30px_rgba(255,102,0,0.6)] z-10"
            >
              {playerState.isLoading && isMainStationActive ? (
                 <div className="h-5 w-5 border-2 border-white/30 border-t-white animate-spin rounded-full" />
              ) : isPlaying ? (
                <Pause className="h-5 w-5 fill-current" />
              ) : (
                <Play className="h-5 w-5 fill-current ml-1" />
              )}
            </button>

            {/* Time Bar */}
            <div className="flex-1 flex flex-col gap-1.5 pr-2">
               <div className="flex justify-between items-end">
                  <span className="text-[10px] text-radio-accent font-bold uppercase tracking-wider flex items-center gap-1">
                    <Radio className="h-3 w-3" /> Ao Vivo
                  </span>
                  <span className="text-[10px] text-gray-300 font-mono drop-shadow-md">
                    {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </span>
               </div>
               <div className="h-1.5 w-full bg-gray-700/50 rounded-full overflow-hidden border border-white/10">
                 <div 
                    className="h-full bg-gradient-to-r from-radio-accent to-orange-400 shadow-[0_0_10px_#ff6600]"
                    style={{ width: `${progress}%` }}
                 ></div>
               </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default CurrentShowPlayer;