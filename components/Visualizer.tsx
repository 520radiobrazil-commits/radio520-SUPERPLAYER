import React from 'react';

interface VisualizerProps {
  isPlaying: boolean;
}

const Visualizer: React.FC<VisualizerProps> = ({ isPlaying }) => {
  // We use a simulated visualizer because real-time WebAudio API analysis 
  // on cross-origin streams (radio) often faces CORS blocks unless proxying.
  // This provides the aesthetic without the breakage.
  
  const bars = Array.from({ length: 12 });

  return (
    <div className="flex items-end justify-center gap-1 h-8 w-16 opacity-80">
      {bars.map((_, index) => (
        <div
          key={index}
          className={`w-1 bg-radio-accent rounded-t-sm transition-all duration-300 ${
            isPlaying ? 'animate-equalizer' : 'h-1'
          }`}
          style={{
            animationDelay: `${index * 0.1}s`,
            animationDuration: `${0.8 + Math.random() * 0.5}s`,
            opacity: isPlaying ? 0.8 : 0.3
          }}
        />
      ))}
    </div>
  );
};

export default Visualizer;
