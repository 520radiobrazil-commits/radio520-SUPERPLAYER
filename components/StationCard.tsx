import React from 'react';
import { Station } from '../types';
import { Play, Pause } from 'lucide-react';

interface StationCardProps {
  station: Station;
  isActive: boolean;
  isPlaying: boolean;
  onPlay: (station: Station) => void;
}

const StationCard: React.FC<StationCardProps> = ({ station, isActive, isPlaying, onPlay }) => {
  return (
    <div 
      onClick={() => onPlay(station)}
      className={`
        relative flex items-center gap-4 p-3.5 mb-3 rounded-2xl border transition-all duration-300 active:scale-[0.98]
        ${isActive 
          ? 'bg-radio-800/80 border-radio-accent/50 shadow-[0_4px_20px_-8px_rgba(255,102,0,0.3)]' 
          : 'bg-radio-900/40 border-white/5 hover:bg-radio-800/60 hover:border-white/10'
        }
      `}
    >
      {/* Thumbnail */}
      <div className={`relative h-16 w-16 shrink-0 rounded-xl overflow-hidden border ${isActive ? 'border-radio-accent/30' : 'border-white/5'}`}>
        <img 
          src={station.imageUrl} 
          alt={station.name}
          className={`h-full w-full object-cover transition-all duration-500 ${isActive && isPlaying ? 'opacity-50 scale-110' : 'opacity-100 scale-100'}`}
          loading="lazy"
        />
        {isActive && isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[1px]">
             <div className="flex gap-1 items-end h-5">
                <div className="w-1 bg-radio-accent rounded-full animate-equalizer" style={{animationDuration: '0.6s'}}></div>
                <div className="w-1.5 bg-radio-accent rounded-full animate-equalizer" style={{animationDuration: '0.8s'}}></div>
                <div className="w-1 bg-radio-accent rounded-full animate-equalizer" style={{animationDuration: '0.5s'}}></div>
             </div>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 flex flex-col justify-center gap-0.5">
        <h3 className={`font-bold text-[15px] truncate leading-tight ${isActive ? 'text-radio-accent' : 'text-white'}`}>
          {station.name}
        </h3>
        <p className="text-xs text-blue-200/50 truncate font-medium">
          {station.description}
        </p>
      </div>

      {/* Action Button */}
      <div className={`
        h-10 w-10 flex items-center justify-center rounded-full transition-all duration-300
        ${isActive 
          ? 'bg-radio-accent text-white shadow-lg shadow-orange-500/30' 
          : 'bg-radio-800 text-gray-400 border border-white/5'
        }
      `}>
         {isActive && isPlaying ? (
          <Pause className="h-4 w-4 fill-current" />
        ) : (
          <Play className="h-4 w-4 fill-current ml-0.5" />
        )}
      </div>
    </div>
  );
};

export default StationCard;