import React from 'react';

interface InputCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  description?: string;
  onFocus?: () => void;
  onBlur?: () => void;
}

const InputCard: React.FC<InputCardProps> = ({ icon, label, value, onChange, placeholder, description, onFocus, onBlur }) => {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 flex flex-col items-center text-center transition-shadow hover:shadow-md">
      <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
        {icon}
      </div>
      <label className="text-slate-700 font-semibold mb-3 text-md">{label}</label>
      <input
        type="number"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onFocus={onFocus}
        onBlur={onBlur}
        className="w-full text-center p-2 border-2 border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        aria-label={label}
      />
      {description && <p className="text-xs text-slate-500 mt-2">{description}</p>}
    </div>
  );
};

export default InputCard;