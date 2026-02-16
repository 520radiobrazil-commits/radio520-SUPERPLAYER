import React, { useMemo } from 'react';
import { Calendar, Clock, Radio, Sparkles, ArrowRight } from 'lucide-react';
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

const DAYS_MAP = [
  "DOMINGO",
  "SEGUNDA-FEIRA",
  "TERÇA-FEIRA",
  "QUARTA-FEIRA",
  "QUINTA-FEIRA",
  "SEXTA-FEIRA",
  "SÁBADO"
];

const FeaturedProgram: React.FC = () => {
  // Memoize the random selection so it doesn't change on every re-render
  const randomProgram = useMemo(() => {
    const allSlots: { day: number; slot: ProgramSlot }[] = [];
    
    // Flatten the schedule
    Object.entries(PROGRAMMING_SCHEDULE).forEach(([dayStr, slots]) => {
      const day = parseInt(dayStr);
      slots.forEach(slot => {
        // Filter out very short segments to focus on main shows
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

  const { day, slot } = randomProgram;
  const slogan = SLOGANS[slot.name] || "A melhor programação do rádio web.";
  const dayName = DAYS_MAP[day];

  return (
    <div className="relative w-full rounded-3xl overflow-hidden bg-radio-900 border border-white/10 shadow-2xl group transition-all duration-300 hover:shadow-orange-500/10 hover:border-radio-accent/30">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-gradient-to-br from-radio-800/50 to-black pointer-events-none"></div>
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-radio-accent/10 rounded-full blur-[50px] group-hover:bg-radio-accent/20 transition-all"></div>
      
      <div className="relative p-5 flex flex-col gap-4">
        
        {/* Header Label */}
        <div className="flex items-center justify-between">
           <div className="flex items-center gap-2 bg-radio-950/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
             <Sparkles className="h-3 w-3 text-radio-accent animate-pulse" />
             <span className="text-[10px] font-black uppercase tracking-widest text-white">Destaque da Grade</span>
           </div>
           <Radio className="h-4 w-4 text-gray-600 group-hover:text-radio-accent transition-colors" />
        </div>

        {/* Program Title & Slogan */}
        <div className="space-y-2">
           <h3 className="text-2xl font-black text-white leading-none uppercase tracking-tight drop-shadow-lg group-hover:scale-[1.02] transition-transform origin-left">
             {slot.name}
           </h3>
           <p className="text-sm text-blue-200/60 font-medium leading-tight max-w-[90%]">
             {slogan}
           </p>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

        {/* Time & Day Grid - VISUALIZAÇÃO MELHORADA */}
        <div className="grid grid-cols-2 gap-3">
          
          {/* Day Box */}
          <div className="bg-radio-950/60 p-3 rounded-2xl border border-white/5 flex flex-col items-start justify-center group-hover:bg-radio-800 transition-colors">
             <div className="flex items-center gap-1.5 mb-1 text-radio-accent">
               <Calendar className="h-3.5 w-3.5" />
               <span className="text-[10px] font-bold uppercase tracking-wider">Dia</span>
             </div>
             <span className="text-sm font-bold text-white uppercase tracking-tight truncate w-full">
               {dayName}
             </span>
          </div>

          {/* Time Box */}
          <div className="bg-radio-950/60 p-3 rounded-2xl border border-white/5 flex flex-col items-start justify-center group-hover:bg-radio-800 transition-colors">
             <div className="flex items-center gap-1.5 mb-1 text-radio-accent">
               <Clock className="h-3.5 w-3.5" />
               <span className="text-[10px] font-bold uppercase tracking-wider">Horário</span>
             </div>
             <span className="text-sm font-bold text-white font-mono tracking-tight">
               {slot.start} às {slot.end}
             </span>
          </div>

        </div>

        {/* CTA Hint */}
        <div className="flex justify-end mt-1">
           <span className="text-[10px] text-gray-500 flex items-center gap-1 group-hover:text-radio-accent transition-colors">
             Não perca <ArrowRight className="h-3 w-3" />
           </span>
        </div>

      </div>
    </div>
  );
};

export default FeaturedProgram;