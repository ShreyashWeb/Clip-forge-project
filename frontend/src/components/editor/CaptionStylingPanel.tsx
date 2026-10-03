import React, { useState } from 'react';
import { Type, Sparkles, Palette, AlignVerticalJustifyCenter, Eye } from 'lucide-react';

interface CaptionStylingPanelProps {
  onStyleChange?: (style: any) => void;
}

export const CaptionStylingPanel: React.FC<CaptionStylingPanelProps> = ({ onStyleChange }) => {
  const [activePreset, setActivePreset] = useState<'pop' | 'karaoke' | 'glow' | 'minimal'>('pop');
  const [fontSize, setFontSize] = useState(28);
  const [position, setPosition] = useState<'bottom' | 'center' | 'top'>('bottom');
  const [accentColor, setAccentColor] = useState('#EF4444');

  const presets = [
    { id: 'pop', name: 'Dynamic Pop', desc: 'Bouncy word-by-word reveal with punchy red highlight' },
    { id: 'karaoke', name: 'Viral Karaoke', desc: 'High-contrast glowing pill box moving with voice' },
    { id: 'glow', name: 'Cyber Neon Glow', desc: 'Futuristic red outline with soft shadow' },
    { id: 'minimal', name: 'Clean Minimal', desc: 'Classic white typography with subtle drop shadow' },
  ];

  return (
    <div className="bg-forge-900 border border-forge-700/80 rounded-2xl p-4 space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-forge-700/60">
        <div className="flex items-center gap-2">
          <Type className="w-4 h-4 text-crimson-400" />
          <h3 className="text-xs font-bold text-white uppercase tracking-wider font-display">
            Dynamic Caption Engine
          </h3>
        </div>
        <span className="text-[10px] bg-crimson-950 text-crimson-400 font-mono px-2 py-0.5 rounded border border-crimson-800">
          AI SYNCED
        </span>
      </div>

      {/* Preset Selector */}
      <div className="space-y-2">
        <label className="text-[11px] font-bold text-forge-400 uppercase tracking-wider block">
          Subtitle Style Presets
        </label>
        <div className="grid grid-cols-2 gap-2">
          {presets.map((preset) => (
            <button
              key={preset.id}
              onClick={() => setActivePreset(preset.id as any)}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                activePreset === preset.id
                  ? 'bg-crimson-950/60 border-crimson-500 text-white shadow-glow-crimson'
                  : 'bg-forge-850 border-forge-700/60 text-forge-300 hover:bg-forge-800 hover:text-white'
              }`}
            >
              <p className="text-xs font-bold">{preset.name}</p>
              <p className="text-[10px] text-forge-400 mt-0.5 line-clamp-1">{preset.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Position & Size */}
      <div className="grid grid-cols-2 gap-3 pt-2 border-t border-forge-800">
        <div>
          <label className="text-[11px] font-bold text-forge-400 uppercase tracking-wider block mb-1">
            Screen Position
          </label>
          <div className="grid grid-cols-3 gap-1">
            {(['top', 'center', 'bottom'] as const).map((pos) => (
              <button
                key={pos}
                onClick={() => setPosition(pos)}
                className={`py-1 text-[10px] font-bold rounded-lg border capitalize transition-colors ${
                  position === pos
                    ? 'bg-crimson-600 border-crimson-500 text-white'
                    : 'bg-forge-850 border-forge-700 text-forge-300 hover:bg-forge-800'
                }`}
              >
                {pos}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex justify-between text-[11px] font-bold text-forge-400 uppercase tracking-wider mb-1">
            <span>Font Size</span>
            <span className="text-white font-mono">{fontSize}px</span>
          </div>
          <input
            type="range"
            min="18"
            max="42"
            value={fontSize}
            onChange={(e) => setFontSize(parseInt(e.target.value))}
            className="w-full h-1.5 bg-forge-800 rounded-lg cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};
