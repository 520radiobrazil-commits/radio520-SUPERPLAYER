import React from 'react';
import { Play, Pause } from 'lucide-react';
import { Station, PlayerState } from '../types';

interface PlayerBarProps {
  state: PlayerState;
  onTogglePlay: () => void;
  djMessage?: string;
  onClose?: () => void;
}

const PlayerBar: React.FC<PlayerBarProps> = ({ state, onTogglePlay, djMessage }) => {
  const { currentStation, isPlaying, isLoading, error } = state;

  if (!currentStation) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      
      {/* Loading Progress Line */}
      {isLoading && (
        <div className="h-[2px] w-full bg-radio-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-radio-accent animate-indeterminate-bar w-full origin-left"></div>
        </div>
      )}

      {/* Glass Container */}
      <div className="glass-panel p-4 safe-pb flex items-center gap-4 relative">
        
        {/* Album Art */}
        <div className={`relative h-14 w-14 shrink-0 rounded-xl overflow-hidden bg-radio-900 border border-white/10 shadow-xl ${isPlaying ? 'shadow-orange-500/10' : ''}`}>
           <img 
             src={currentStation.imageUrl} 
             alt="Station" 
             className={`h-full w-full object-cover transition-transform duration-700 ${isPlaying ? 'scale-110' : 'scale-100'}`}
           />
           {/* Overlay Ring */}
           {isPlaying && <div className="absolute inset-0 rounded-xl border-2 border-radio-accent/50 animate-pulse"></div>}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          {djMessage ? (
             <div className="text-[10px] uppercase font-bold text-radio-accent animate-pulse truncate mb-1">
               AI DJ: {djMessage}
             </div>
          ) : (
             <div className="flex items-center gap-2 mb-1">
                <div className={`w-1.5 h-1.5 rounded-full ${isPlaying ? 'bg-radio-accent animate-pulse' : 'bg-gray-600'}`}></div>
                <div className="text-[10px] uppercase font-bold text-blue-300/50 tracking-widest">
                  Tocando Agora
                </div>
             </div>
          )}
          
          <h4 className="text-white font-bold text-sm truncate leading-tight">
            {currentStation.name}
          </h4>
          {error ? (
             <span className="text-[10px] text-red-500 font-bold mt-0.5">Erro de Conexão</span>
          ) : (
             <span className="text-[10px] text-gray-400 truncate mt-0.5">{currentStation.category}</span>
          )}
        </div>

        {/* Controls */}
        <button 
          onClick={onTogglePlay}
          className="h-14 w-14 shrink-0 rounded-full bg-gradient-to-tr from-radio-accent to-orange-500 text-white flex items-center justify-center shadow-lg shadow-orange-500/30 hover:scale-105 active:scale-95 transition-all"
        >
          {isLoading ? (
            <div className="h-6 w-6 border-2 border-white/30 border-t-white animate-spin rounded-full" />
          ) : isPlaying ? (
            <Pause className="h-6 w-6 fill-current" />
          ) : (
            <Play className="h-6 w-6 fill-current ml-1" />
          )}
        </button>

      </div>
    </div>
  );
};

export default PlayerBar;