// components/ColorPicker.tsx
import React, { useState } from 'react';

interface ColorPickerProps {
  value?: string;
  onChange: (color: string) => void;
  label?: string;
}

const PRESET_COLORS = [
  // Grays
  { name: 'Black', value: '#000000' },
  { name: 'Gray 900', value: '#111827' },
  { name: 'Gray 800', value: '#1F2937' },
  { name: 'Gray 700', value: '#374151' },
  { name: 'Gray 600', value: '#4B5563' },
  { name: 'Gray 500', value: '#6B7280' },
  { name: 'Gray 400', value: '#9CA3AF' },
  { name: 'Gray 300', value: '#D1D5DB' },
  { name: 'White', value: '#FFFFFF' },
  
  // Blues
  { name: 'Blue 900', value: '#1E3A8A' },
  { name: 'Blue 800', value: '#1E40AF' },
  { name: 'Blue 700', value: '#1D4ED8' },
  { name: 'Blue 600', value: '#2563EB' },
  { name: 'Blue 500', value: '#3B82F6' },
  { name: 'Blue 400', value: '#60A5FA' },
  
  // Reds
  { name: 'Red 900', value: '#7F1D1D' },
  { name: 'Red 800', value: '#991B1B' },
  { name: 'Red 700', value: '#B91C1C' },
  { name: 'Red 600', value: '#DC2626' },
  { name: 'Red 500', value: '#EF4444' },
  { name: 'Red 400', value: '#F87171' },
  
  // Greens
  { name: 'Green 900', value: '#14532D' },
  { name: 'Green 800', value: '#166534' },
  { name: 'Green 700', value: '#15803D' },
  { name: 'Green 600', value: '#16A34A' },
  { name: 'Green 500', value: '#22C55E' },
  { name: 'Green 400', value: '#4ADE80' },
  
  // Yellows
  { name: 'Yellow 900', value: '#713F12' },
  { name: 'Yellow 800', value: '#854D0E' },
  { name: 'Yellow 700', value: '#A16207' },
  { name: 'Yellow 600', value: '#CA8A04' },
  { name: 'Yellow 500', value: '#EAB308' },
  { name: 'Yellow 400', value: '#FACC15' },
  
  // Purples
  { name: 'Purple 900', value: '#581C87' },
  { name: 'Purple 800', value: '#6B21A8' },
  { name: 'Purple 700', value: '#7E22CE' },
  { name: 'Purple 600', value: '#9333EA' },
  { name: 'Purple 500', value: '#A855F7' },
  { name: 'Purple 400', value: '#C084FC' },
  
  // Pinks
  { name: 'Pink 900', value: '#831843' },
  { name: 'Pink 800', value: '#9F1239' },
  { name: 'Pink 700', value: '#BE123C' },
  { name: 'Pink 600', value: '#DB2777' },
  { name: 'Pink 500', value: '#EC4899' },
  { name: 'Pink 400', value: '#F472B6' },
  
  // Oranges
  { name: 'Orange 900', value: '#7C2D12' },
  { name: 'Orange 800', value: '#9A3412' },
  { name: 'Orange 700', value: '#C2410C' },
  { name: 'Orange 600', value: '#EA580C' },
  { name: 'Orange 500', value: '#F97316' },
  { name: 'Orange 400', value: '#FB923C' },
  
  // Cyans
  { name: 'Cyan 900', value: '#164E63' },
  { name: 'Cyan 800', value: '#155E75' },
  { name: 'Cyan 700', value: '#0E7490' },
  { name: 'Cyan 600', value: '#0891B2' },
  { name: 'Cyan 500', value: '#06B6D4' },
  { name: 'Cyan 400', value: '#22D3EE' },
];

export default function ColorPicker({ value = '#000000', onChange, label = 'Color' }: ColorPickerProps) {
  const [showPicker, setShowPicker] = useState(false);
  const [customColor, setCustomColor] = useState(value);

  const handlePresetClick = (color: string) => {
    onChange(color);
    setCustomColor(color);
  };

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setCustomColor(newColor);
    onChange(newColor);
  };

  const handleHexInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let hexValue = e.target.value;
    
    // Add # if not present
    if (!hexValue.startsWith('#')) {
      hexValue = '#' + hexValue;
    }
    
    setCustomColor(hexValue);
    
    // Validate hex color (3 or 6 digits)
    if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hexValue)) {
      onChange(hexValue);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      
      {/* Current Color Display */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setShowPicker(!showPicker)}
          className="w-20 h-10 rounded border-2 border-gray-300 shadow-sm hover:border-gray-400 transition-colors"
          style={{ backgroundColor: value || customColor }}
          title="Click to pick color"
        />
        <input
          type="text"
          value={customColor}
          onChange={handleHexInputChange}
          placeholder="#000000"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Color Picker Panel */}
      {showPicker && (
        <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-lg">
          {/* Native Color Picker */}
          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-600 mb-2">Custom Color Picker</label>
            <input
              type="color"
              value={customColor}
              onChange={handleCustomColorChange}
              className="w-full h-10 rounded cursor-pointer"
            />
          </div>

          {/* Preset Colors Grid */}
          <div className="space-y-2">
            <label className="block text-xs font-medium text-gray-600">Preset Colors</label>
            <div className="grid grid-cols-9 gap-2 max-h-60 overflow-y-auto">
              {PRESET_COLORS.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  onClick={() => handlePresetClick(color.value)}
                  className={`w-8 h-8 rounded border-2 hover:scale-110 transition-transform ${
                    (value || customColor) === color.value ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Close Button */}
          <button
            type="button"
            onClick={() => setShowPicker(false)}
            className="mt-4 w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
          >
            Done
          </button>
        </div>
      )}
    </div>
  );
}