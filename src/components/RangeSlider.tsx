import React from 'react';

interface RangeSliderProps {
    min: number;
    max: number;
    value: number;
    setValue: (value: number) => void;
    label: string;
}

const RangeSlider: React.FC<RangeSliderProps> = ({ min, max, value, setValue, label }) => {
    return (
        <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}: {value.toFixed(2)}
            </label>
            <input
                type="range"
                min={min}
                max={max}
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>{min.toFixed(2)}</span>
                <span>{max.toFixed(2)}</span>
            </div>
        </div>
    );
};

export default RangeSlider;
