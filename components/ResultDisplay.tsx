import React from 'react';

interface ResultDisplayProps {
  step: number;
  distance: number;
  eyeHeight: number;
  clinometerAngle: number | null;
  h2Value: number | null;
  calculatedHeight: number | null;
  onReset: () => void;
}

const CalculationStep: React.FC<{ children: React.ReactNode, isVisible: boolean }> = ({ children, isVisible }) => {
  if (!isVisible) return null;
  return (
    <div className="px-4 py-3 bg-white rounded-md shadow-sm animate-fade-in-up">
      {children}
    </div>
  );
};

const ResultDisplay: React.FC<ResultDisplayProps> = ({ step, distance, eyeHeight, clinometerAngle, h2Value, calculatedHeight, onReset }) => {
  return (
    <div className="bg-slate-50 border-t-4 border-blue-500 rounded-b-lg px-6 py-5 shadow-inner mt-6">
      <h2 className="text-2xl font-bold text-center mb-4 text-blue-800">📊 계산 과정</h2>
      <div className="space-y-3 text-lg font-mono text-slate-700">
        <CalculationStep isVisible={step >= 1}>
          <p>H = h₁ + h₂</p>
          <p className="text-sm text-slate-500">건물 높이 = 내 눈높이 + (내 눈높이부터 건물 꼭대기까지의 높이)</p>
        </CalculationStep>

        <CalculationStep isVisible={step >= 2}>
          <p>h₂ = d × tan(θ)</p>
          <p className="text-sm text-slate-500">h₂ = 거리 × tan(클리노미터 각도)</p>
        </CalculationStep>

        <CalculationStep isVisible={step >= 3}>
          <p>h₂ = {distance}m × tan({clinometerAngle?.toFixed(1)}°)</p>
          {h2Value !== null && <p className="font-bold text-indigo-600">h₂ ≈ {h2Value.toFixed(2)}m</p>}
        </CalculationStep>

        <CalculationStep isVisible={step >= 4}>
           {h2Value !== null && <p>H = {eyeHeight}m + {h2Value.toFixed(2)}m</p>}
        </CalculationStep>
        
        {step >= 5 && calculatedHeight !== null && (
          <div className="!mt-6 text-center animate-fade-in-up">
            <p className="text-xl font-semibold text-slate-800 mb-2">최종 계산 높이:</p>
            <p className="text-4xl font-bold text-blue-600 bg-blue-100 py-3 rounded-lg">
              {calculatedHeight.toFixed(2)} m
            </p>
          </div>
        )}
      </div>

      {step >= 5 && (
        <div className="text-center mt-6 animate-fade-in-up flex justify-center items-center gap-4" style={{animationDelay: '0.5s'}}>
          <button
            onClick={onReset}
            className="bg-slate-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-slate-700 transition-colors duration-300"
          >
            다시하기
          </button>
          <a
            href="https://student.amplify.com/join/#/CQR6U9?lang=ko"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-700 transition-colors duration-300"
          >
            Desmos 활동하기
          </a>
        </div>
      )}
      
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ResultDisplay;