

import React from 'react';
// FIX: Import the IdeaMode enum to use its values, not just its type.
import { IdeaMode } from '../types';
import { PRESETS, RANDOM_IDEAS } from '../constants';
import { WandIcon } from './icons/WandIcon';
import { TypeIcon } from './icons/TypeIcon';
import { GridIcon } from './icons/GridIcon';


interface IdeaSelectorProps {
  mode: IdeaMode;
  setMode: (mode: IdeaMode) => void;
  customPrompt: string;
  setCustomPrompt: (prompt: string) => void;
  selectedPreset: string;
  setSelectedPreset: (presetId: string) => void;
  setRandomIdea: () => void;
  disabled?: boolean;
}

const TabButton: React.FC<{
    label: string;
    isActive: boolean;
    onClick: () => void;
    icon: React.ReactNode;
    disabled?: boolean;
}> = ({ label, isActive, onClick, icon, disabled }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-t-lg transition-all focus:outline-none focus:ring-2 focus:ring-brand-accent/50 ${
      isActive ? 'bg-brand-secondary text-brand-accent' : 'bg-transparent text-gray-400 hover:bg-white/5'
    } ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
  >
    {icon}
    {label}
  </button>
);

export const IdeaSelector: React.FC<IdeaSelectorProps> = ({
  mode,
  setMode,
  customPrompt,
  setCustomPrompt,
  selectedPreset,
  setSelectedPreset,
  setRandomIdea,
  disabled
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">Step 2: Choose Your Idea</label>
      <div className="flex border-b border-gray-700">
        {/* FIX: Use IdeaMode enum for checking active state and setting mode. */}
        <TabButton label="Surprise Me" icon={<WandIcon className="w-4 h-4" />} isActive={mode === IdeaMode.Random} onClick={() => setMode(IdeaMode.Random)} disabled={disabled} />
        {/* FIX: Use IdeaMode enum for checking active state and setting mode. */}
        <TabButton label="Custom" icon={<TypeIcon className="w-4 h-4" />} isActive={mode === IdeaMode.Custom} onClick={() => setMode(IdeaMode.Custom)} disabled={disabled} />
        {/* FIX: Use IdeaMode enum for checking active state and setting mode. */}
        <TabButton label="Presets" icon={<GridIcon className="w-4 h-4" />} isActive={mode === IdeaMode.Presets} onClick={() => setMode(IdeaMode.Presets)} disabled={disabled} />
      </div>
      <div className="bg-brand-secondary p-4 rounded-b-lg">
        {/* FIX: Use IdeaMode enum for comparison. */}
        {mode === IdeaMode.Random && (
          <div className="text-center">
            <p className="text-gray-400 mb-2">Let AI suggest a creative extension.</p>
            <button
              type="button"
              onClick={setRandomIdea}
              disabled={disabled}
              className="px-4 py-2 text-sm font-semibold bg-brand-accent text-brand-primary rounded-md hover:bg-yellow-300 transition-colors disabled:opacity-50"
            >
              Get Random Idea
            </button>
          </div>
        )}
        {/* FIX: Use IdeaMode enum for comparison. */}
        {mode === IdeaMode.Custom && (
          <textarea
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            placeholder="e.g., add a geometric pattern with flowing lines"
            rows={3}
            disabled={disabled}
            className="w-full bg-brand-primary/50 text-white p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-brand-accent focus:border-brand-accent transition"
          />
        )}
        {/* FIX: Use IdeaMode enum for comparison. */}
        {mode === IdeaMode.Presets && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => setSelectedPreset(preset.id)}
                disabled={disabled}
                className={`p-3 text-left text-sm rounded-md transition-all ${
                  selectedPreset === preset.id
                    ? 'bg-brand-accent text-brand-primary font-semibold ring-2 ring-brand-accent'
                    : 'bg-brand-primary/50 text-gray-300 hover:bg-white/10'
                }`}
              >
                {preset.title}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};