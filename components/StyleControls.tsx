

import React from 'react';
// FIX: Import enums to use their values, not just their types.
import { TattooStyle, Intensity } from '../types';

interface StyleControlsProps {
  style: TattooStyle;
  setStyle: (style: TattooStyle) => void;
  intensity: Intensity;
  setIntensity: (intensity: Intensity) => void;
  disabled?: boolean;
}

const RadioButton: React.FC<{
  label: string;
  name: string;
  value: string;
  checked: boolean;
  onChange: (value: any) => void;
  disabled?: boolean;
}> = ({ label, name, value, checked, onChange, disabled }) => (
  <label className={`flex-1 text-center px-4 py-2 text-sm rounded-md cursor-pointer transition-colors ${
    checked ? 'bg-brand-accent text-brand-primary font-semibold' : 'bg-brand-secondary/50 text-gray-300 hover:bg-white/10'
  } ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}>
    <input
      type="radio"
      name={name}
      value={value}
      checked={checked}
      onChange={() => onChange(value)}
      disabled={disabled}
      className="sr-only"
    />
    {label}
  </label>
);


export const StyleControls: React.FC<StyleControlsProps> = ({
  style,
  setStyle,
  intensity,
  setIntensity,
  disabled
}) => {
  return (
    <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Step 3: Fine-Tune Style</label>
        <div className="space-y-4">
            <div>
                <div className="flex bg-brand-secondary rounded-md p-1 space-x-1">
                    {/* FIX: Use TattooStyle enum for value, checked, and onChange handler. */}
                    <RadioButton label="Black & Grey" name="style" value={TattooStyle.BlackAndGrey} checked={style === TattooStyle.BlackAndGrey} onChange={() => setStyle(TattooStyle.BlackAndGrey)} disabled={disabled}/>
                    {/* FIX: Use TattooStyle enum for value, checked, and onChange handler. */}
                    <RadioButton label="Color" name="style" value={TattooStyle.Color} checked={style === TattooStyle.Color} onChange={() => setStyle(TattooStyle.Color)} disabled={disabled}/>
                </div>
            </div>
            <div>
                <div className="flex bg-brand-secondary rounded-md p-1 space-x-1">
                     {/* FIX: Use Intensity enum for value, checked, and onChange handler. */}
                     <RadioButton label="Subtle" name="intensity" value={Intensity.Subtle} checked={intensity === Intensity.Subtle} onChange={() => setIntensity(Intensity.Subtle)} disabled={disabled}/>
                     {/* FIX: Use Intensity enum for value, checked, and onChange handler. */}
                     <RadioButton label="Balanced" name="intensity" value={Intensity.Balanced} checked={intensity === Intensity.Balanced} onChange={() => setIntensity(Intensity.Balanced)} disabled={disabled}/>
                     {/* FIX: Use Intensity enum for value, checked, and onChange handler. */}
                     <RadioButton label="Bold" name="intensity" value={Intensity.Bold} checked={intensity === Intensity.Bold} onChange={() => setIntensity(Intensity.Bold)} disabled={disabled}/>
                </div>
            </div>
        </div>
    </div>
  );
};