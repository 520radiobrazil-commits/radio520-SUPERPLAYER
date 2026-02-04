import React, { useMemo } from 'react';
import { Calendar, Clock, Music, Star } from 'lucide-react';
import { PROGRAMMING_SCHEDULE } from '../constants';
import { ProgramSlot } from '../types';

const SLOGANS: Record<string, string> = {
  "LOVE HITS": "O amor está no ar com as melhores baladas.",
  "SUPERSEQUÊNCIA": "Uma sequência incrível de sucessos sem parar.",
  "RADIO520 CLASSIC HITS": "Os grandes clássicos que marcaram época.",
  "REPÓRTER520": "A informação precisa, dinâmica e em tempo real.",
  "ZIRIGUIDUM": "O melhor do samba, pagode e alegria.",
  "BR520": "A música brasileira em primeiro lugar.",
  "A ERA DO ROCK": "Atitude, guitarras e os maiores clássicos do Rock.",
  "ZONA MISTA": "Uma mistura de ritmos para todos os gostos.",
  "TOP BILLBOARD": "As músicas mais tocadas nas paradas mundiais.",
  "INSÔNIA": "A sua melhor companhia para virar a noite.",
  "GIRO520": "Giro de notícias e a melhor seleção musical.",
  "CAFEÍNA": "Energia pura e música boa para começar o dia.",
  "VIBE520": "A trilha sonora perfeita para elevar o seu astral.",
  "MARATONA520": "Música sem parar, do jeito que você gosta.",
  "MIX520 - MUNDO": "Conectando você com os hits globais.",
  "BUSINESS ROCK": "Rock e negócios em perfeita sintonia.",
  "BEATS520": "As batidas eletrônicas que movem o mundo.",
  "RÁDIO520 - TOP20": "As 20 mais pedidas da nossa programação.",
  "MÚSICA DO DIA": "O destaque especial selecionado para hoje.",
  "RÁDIO520 VIVA MELHOR": "Dicas de saúde e músicas para viver bem.",
  "RÁDIO520 - DANCE CLUB": "Transforme sua casa na melhor pista de dança.",
  "VERSUS520 - BATALHA MUSICAL": "Dois hits, uma escolha. Quem vence essa batalha?",
  "HORA DA AVE MARIA": "Um momento de fé e reflexão."
};

const FeaturedProgram: React.FC = () => {
  // Memoize the random selection so it doesn't change on every re-render
  const randomProgram = useMemo(() => {
    const allSlots: { day: number; slot: ProgramSlot }[] = [];
    
    // Flatten the schedule
    Object.entries(PROGRAMMING_SCHEDULE).forEach(([dayStr, slots]) => {
      const day = parseInt(dayStr);
      slots.forEach(slot => {
        // Filter out very short segments if desired, or keep all
        if (slot.name !== "REPÓRTER 520" && slot.name !== "REPÓRTER520") {
             allSlots.push({ day, slot });
        }
      });
    });

    if (allSlots.length === 0) return null;

    // Pick random
    const randomIndex = Math.floor(Math.random() * allSlots.length);
    return allSlots[randomIndex];
  }, []);

  if (!randomProgram) return null;

  const { slot } = randomProgram;
  const slogan = SLOGANS[slot.name] || "A melhor programação do rádio web.";
  
  // Helper to format day name if needed, though simple time is often cleaner
  // For this design, we focus on the time range.

  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-gradient-to-br from-radio-900 via-radio-800 to-black border border-white/10 shadow-lg group">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-radio-accent/20 rounded-full blur-2xl group-hover:bg-radio-accent/30 transition-colors duration-500"></div>
      <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-32 h-32 bg-blue-900/20 rounded-full blur-3xl"></div>

      <div className="relative p-5 flex flex-col gap-3">
        
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2 bg-white/5 px-2 py-1 rounded-lg border border-white/5">
            <Star className="h-3 w-3 text-yellow-400 fill-current" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-300">Destaque da Grade</span>
          </div>
          <Music className="h-5 w-5 text-radio-700 group-hover:text-radio-accent transition-colors duration-300" />
        </div>

        {/* Program Name & Slogan */}
        <div className="mt-1">
          <h3 className="text-xl font-black text-white leading-tight uppercase tracking-tight mb-1 group-hover:text-radio-accent transition-colors duration-300">
            {slot.name}
          </h3>
          <p className="text-sm text-blue-200/70 font-medium leading-snug">
            {slogan}
          </p>
        </div>

        {/* Time Info */}
        <div className="mt-3 pt-3 border-t border-white/5 flex items-center gap-4">
          <div className="flex items-center gap-2 text-gray-400">
            <Clock className="h-4 w-4 text-radio-accent" />
            <span className="text-xs font-mono font-bold text-white">
              {slot.start} - {slot.end}
            </span>
          </div>
          
          <div className="flex items-center gap-1.5 text-gray-500">
            <Calendar className="h-3.5 w-3.5" />
            <span className="text-[10px] uppercase font-bold tracking-wide">
              Confira na Programação
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FeaturedProgram;