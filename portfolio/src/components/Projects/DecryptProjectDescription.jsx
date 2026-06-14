import React, { useState, useEffect, useRef } from 'react';
import { cyberSynth } from '../../utils/synth';

const GLYPHS = '0123456789ABCDEF█▓▒░%-+_[]';

export default function DecryptProjectDescription({ text, isHovered, accent }) {
  const [progress, setProgress] = useState(0); // 0 to 100
  
  const chimePlayed = useRef(false);

  // Sync / Reset on text change
  useEffect(() => {
    setProgress(0);
    chimePlayed.current = false;
  }, [text]);

  // Dynamic timer loop using timeouts to automatically start and stop when boundaries are reached
  useEffect(() => {
    let timer = null;

    if (isHovered && progress < 100) {
      timer = setTimeout(() => {
        setProgress(prev => Math.min(prev + 5, 100));
      }, 50);
    } else if (!isHovered && progress > 0) {
      timer = setTimeout(() => {
        setProgress(prev => Math.max(prev - 8, 0));
      }, 40);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isHovered, progress]);

  // Audio side effects triggered on progress state changes
  useEffect(() => {
    if (progress >= 100) {
      if (!chimePlayed.current && isHovered) {
        cyberSynth.playChime();
        chimePlayed.current = true;
      }
    } else if (progress <= 0) {
      chimePlayed.current = false;
    } else {
      // Play tick sounds periodically
      if (progress % 10 === 0) {
        cyberSynth.playTick();
      }
    }
  }, [progress, isHovered]);

  // Generate display text dynamically during render pass
  const safeText = text || '';
  const textLength = safeText.length;
  let displayText = '';
  const resolvedCount = Math.floor((progress / 100) * textLength);

  for (let i = 0; i < textLength; i++) {
    if (i < resolvedCount) {
      displayText += safeText[i];
    } else {
      if (safeText[i] === ' ') {
        displayText += ' ';
      } else {
        displayText += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
    }
  }

  const barLength = 16;
  const filledCount = Math.round((progress / 100) * barLength);
  const barText = '█'.repeat(filledCount) + '░'.repeat(barLength - filledCount);

  return (
    <div className="flex flex-col flex-1 select-none">
      {/* Description paragraph in monospace */}
      <p 
        className="text-[#5C615D] text-xs leading-relaxed mb-4 font-mono break-words" 
        style={{ minHeight: '5.2rem', maxHeight: '5.2rem', overflow: 'hidden' }}
      >
        {displayText}
      </p>

      {/* Progress Bar Info */}
      <div 
        className="font-mono text-[9px] mb-4 flex items-center gap-2"
        style={{ color: progress === 100 ? '#1E6F44' : progress > 0 ? accent : '#8C908D' }}
      >
        <span>
          {progress === 100 
            ? '[SYS_OK: REVEALED]' 
            : progress > 0 
              ? `[DECRYPT: ${barText} ${progress}%]` 
              : '[SECURE_ENCRYPTED_DATA_PATH]'}
        </span>
      </div>
    </div>
  );
}
