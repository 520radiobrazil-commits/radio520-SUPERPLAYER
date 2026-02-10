import React, { useState, useRef, useEffect, useCallback } from 'react';
import { STATIONS } from './constants';
import { Station, PlayerState } from './types';
import StationCard from './components/StationCard';
import PlayerBar from './components/PlayerBar';
import CurrentShowPlayer from './components/CurrentShowPlayer';
import FeaturedProgram from './components/FeaturedProgram';
import { Wifi, Radio, MessageCircle, Instagram, Globe, Mic, ExternalLink } from 'lucide-react';

const App: React.FC = () => {
  // State
  const [playerState, setPlayerState] = useState<PlayerState>({
    isPlaying: false,
    currentStation: null,
    volume: 1,
    isLoading: false,
    error: null,
  });
  const [djMessage, setDjMessage] = useState<string>('');

  // Audio Reference
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize Audio
  useEffect(() => {
    audioRef.current = new Audio();
    const audio = audioRef.current;

    const handleWaiting = () => setPlayerState(prev => ({ ...prev, isLoading: true }));
    const handleCanPlay = () => setPlayerState(prev => ({ ...prev, isLoading: false, error: null }));
    const handlePlaying = () => setPlayerState(prev => ({ ...prev, isPlaying: true, isLoading: false }));
    const handlePause = () => setPlayerState(prev => ({ ...prev, isPlaying: false }));
    const handleError = (e: Event) => {
      console.error("Stream Error", e);
      setPlayerState(prev => ({ 
        ...prev, 
        isPlaying: false, 
        isLoading: false, 
        error: "Offline" 
      }));
    };

    audio.addEventListener('waiting', handleWaiting);
    audio.addEventListener('playing', handlePlaying);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('waiting', handleWaiting);
      audio.removeEventListener('playing', handlePlaying);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('error', handleError);
      audio.pause();
      audio.src = '';
    };
  }, []);

  const playStation = useCallback((station: Station, autoPlay: boolean = true) => {
    if (!audioRef.current) return;

    if (playerState.currentStation?.id === station.id) {
      if (playerState.isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.error("Play failed", e));
      }
      return;
    }

    setPlayerState(prev => ({
      ...prev,
      currentStation: station,
      isLoading: true,
      error: null,
      isPlaying: autoPlay
    }));

    audioRef.current.src = station.streamUrl;
    audioRef.current.load();
    
    if (autoPlay) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error("Autoplay prevented", error);
          setPlayerState(prev => ({ ...prev, isPlaying: false }));
        });
      }
    }
  }, [playerState.currentStation, playerState.isPlaying]);

  const togglePlay = useCallback(() => {
    if (!audioRef.current || !playerState.currentStation) return;
    
    if (playerState.isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.error("Resume failed", e));
    }
  }, [playerState.isPlaying, playerState.currentStation]);

  const QuickActionButton = ({ icon: Icon, label, href }: { icon: any, label: string, href: string }) => (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex items-center justify-between p-4 rounded-2xl bg-radio-800/60 border border-white/5 hover:bg-radio-800 transition-all duration-300 active:scale-95 shadow-md"
    >
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-full bg-radio-900 text-radio-accent border border-white/5 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(255,102,0,0.15)]">
          <Icon className="h-5 w-5" />
        </div>
        <span className="font-bold text-sm text-white tracking-wide">{label}</span>
      </div>
      <ExternalLink className="h-3 w-3 text-gray-600 group-hover:text-radio-accent transition-colors" />
    </a>
  );

  return (
    // Mobile Container Constraint - DARK BLUE THEME
    <div className="max-w-md mx-auto min-h-screen bg-radio-950 relative shadow-2xl flex flex-col font-sans text-white">
      
      {/* Background Ambience - Blue & Orange Mix */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[50%] bg-blue-900/20 rounded-full blur-[80px]" />
        <div className="absolute top-[20%] right-[-10%] w-[60%] h-[40%] bg-radio-accent/10 rounded-full blur-[90px]" />
        <div className="absolute bottom-[-10%] left-[10%] w-[70%] h-[40%] bg-blue-800/20 rounded-full blur-[80px]" />
      </div>

      {/* Mobile Header with LOGO */}
      <header className="sticky top-0 z-30 bg-radio-950/90 backdrop-blur-md border-b border-white/5 px-5 py-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center">
          {/* LOGO IMAGE - Large Size - Increased from h-20 to h-28 */}
          <div className="h-28 w-auto relative group">
             {/* Orange glow behind logo */}
             <div className="absolute inset-0 bg-radio-accent blur-xl opacity-15 group-hover:opacity-25 transition-opacity rounded-full"></div>
             <img 
               src="https://public-rf-upload.minhawebradio.net/249695/ad/b6446222f52320d849ecf2331c6ae16d.jpg" 
               alt="Radio 520" 
               className="h-full w-full object-contain relative z-10 drop-shadow-lg"
             />
          </div>
        </div>
        
        {/* Live Indicator - Blue pill with Orange dot */}
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-2 bg-radio-800/80 px-3 py-1.5 rounded-full border border-white/10 shadow-sm backdrop-blur-sm">
             <div className="w-2 h-2 rounded-full bg-radio-accent animate-pulse shadow-[0_0_8px_#ff6600]"></div>
             <span className="text-xs font-bold text-white tracking-wide">AO VIVO</span>
          </div>
        </div>
      </header>

      {/* Main Scrollable Content */}
      <main className="flex-1 px-4 py-6 pb-24 overflow-y-auto z-10">
        
        {/* NEW Main Player / Show Indicator */}
        <section className="mb-2">
          <CurrentShowPlayer 
            playerState={playerState} 
            onPlayStation={playStation}
            onTogglePlay={togglePlay}
          />
        </section>

        {/* Action Buttons Grid */}
        <section className="grid grid-cols-1 gap-3 mb-8">
           <div className="grid grid-cols-2 gap-3">
             <QuickActionButton icon={MessageCircle} label="WhatsApp" href="#" />
             <QuickActionButton icon={Instagram} label="Instagram" href="https://www.instagram.com/channel/AbZotNEFR9O1X6V1/?igsh=OGRtanJybzVvaGgz" />
           </div>
           <div className="grid grid-cols-2 gap-3">
             <QuickActionButton icon={Globe} label="Portal 520" href="https://www.radio520.com.br" />
             <QuickActionButton icon={Mic} label="Podcast" href="https://radio520.com.br/share/match-report-premier-league-numbers-25-26.html" />
           </div>
        </section>

        {/* Featured Program Section (Formerly Stations) */}
        <section className="flex flex-col">
          <div className="flex items-center gap-2 mb-4 px-1">
             <div className="h-4 w-1 bg-radio-accent rounded-full"></div>
             <h2 className="text-white text-sm font-bold uppercase tracking-widest">
               VAI ROLAR POR AQUI
             </h2>
          </div>
          
          <FeaturedProgram />
        </section>

        {/* Footer Credit */}
        <div className="mt-12 text-center pb-8 opacity-40">
           <p className="text-[10px] text-blue-200/50 uppercase tracking-[0.2em]">Radio 520 App</p>
        </div>
      </main>

      {/* Floating Player */}
      <PlayerBar 
        state={playerState}
        djMessage={djMessage}
        onTogglePlay={togglePlay}
      />
    </div>
  );
};

export default App;