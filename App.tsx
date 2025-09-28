import React, { useState, useMemo } from 'react';
import InputCard from './components/InputCard';
import ResultDisplay from './components/ResultDisplay';
import BuildingIcon from './components/icons/BuildingIcon';
import RulerIcon from './components/icons/RulerIcon';
import ProtractorIcon from './components/icons/ProtractorIcon';
import CalculationDiagram from './components/CalculationDiagram';

const App: React.FC = () => {
  const [distance, setDistance] = useState<string>('');
  const [eyeHeight, setEyeHeight] = useState<string>('');
  const [protractorAngle, setProtractorAngle] = useState<string>('');
  
  const [calculatedHeight, setCalculatedHeight] = useState<number | null>(null);
  const [h2Value, setH2Value] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [calculationStep, setCalculationStep] = useState<number>(0);
  const [highlightedPart, setHighlightedPart] = useState<string | null>(null);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const allInputsFilled = useMemo(() => {
    return distance.trim() !== '' && eyeHeight.trim() !== '' && protractorAngle.trim() !== '';
  }, [distance, eyeHeight, protractorAngle]);

  const handleCalculate = () => {
    const dist = parseFloat(distance);
    const height = parseFloat(eyeHeight);
    const angle = parseFloat(protractorAngle);

    if (isNaN(dist) || isNaN(height) || isNaN(angle) || dist <= 0 || height <= 0 || angle <= 0 || angle >= 90) {
      alert('유효한 값을 입력해주세요. (모든 값은 0보다 커야하며, 각도기로 잰 각도는 90보다 작아야 합니다)');
      return;
    }

    setIsCalculating(true);

    const clinometerAngle = 90 - angle;
    const angleInRadians = clinometerAngle * (Math.PI / 180);
    const calculatedH2 = dist * Math.tan(angleInRadians);
    const finalHeight = height + calculatedH2;

    setTimeout(() => { setCalculationStep(1); setHighlightedPart('eyeHeight'); }, 500);
    setTimeout(() => { setCalculationStep(2); setHighlightedPart('distance_angle'); }, 2000);
    setTimeout(() => { setH2Value(calculatedH2); setCalculationStep(3); }, 3500);
    setTimeout(() => { setCalculationStep(4); setHighlightedPart('h2'); }, 5000);
    setTimeout(() => { setCalculatedHeight(finalHeight); setCalculationStep(5); setHighlightedPart('H'); }, 6500);
    setTimeout(() => { setHighlightedPart(null); }, 8000);
  };

  const handleReset = () => {
    setDistance('');
    setEyeHeight('');
    setProtractorAngle('');
    setCalculatedHeight(null);
    setH2Value(null);
    setIsCalculating(false);
    setCalculationStep(0);
    setHighlightedPart(null);
    setFocusedInput(null);
  };

  const clinometerAngle = useMemo(() => {
    const angle = parseFloat(protractorAngle);
     if (isNaN(angle) || angle <= 0 || angle >= 90) return null;
    return 90 - angle;
  }, [protractorAngle]);

  return (
    <div className="bg-slate-100 min-h-screen font-sans flex flex-col items-center justify-center p-4">
      <main className="w-full max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">건물 높이 측정기</h1>
          <p className="text-lg text-slate-600">클리노미터를 이용해 학교 건물의 높이를 측정해 봅시다!</p>
        </header>

        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <InputCard
              icon={<BuildingIcon />}
              label="1. 건물과 나의 거리 (m)"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              placeholder="예: 15.0"
              onFocus={() => setFocusedInput('distance')}
              onBlur={() => setFocusedInput(null)}
            />
            <InputCard
              icon={<RulerIcon />}
              label="2. 나의 눈높이 (m)"
              value={eyeHeight}
              onChange={(e) => setEyeHeight(e.target.value)}
              placeholder="예: 1.6"
              onFocus={() => setFocusedInput('eyeHeight')}
              onBlur={() => setFocusedInput(null)}
            />
            <InputCard
              icon={<ProtractorIcon />}
              label="3. 각도기로 잰 각도 (°)"
              value={protractorAngle}
              onChange={(e) => setProtractorAngle(e.target.value)}
              placeholder="예: 52"
              description="실제 계산 각도 = 90° - 입력 각도"
              onFocus={() => setFocusedInput('protractorAngle')}
              onBlur={() => setFocusedInput(null)}
            />
          </div>
          
          <CalculationDiagram 
            distance={distance}
            eyeHeight={eyeHeight}
            protractorAngle={protractorAngle}
            focusedInput={focusedInput}
            highlightedPart={highlightedPart}
          />

          <div className="text-center mb-8">
            <button
              onClick={handleCalculate}
              disabled={!allInputsFilled || isCalculating}
              className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg text-lg shadow-md hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
            >
              {isCalculating ? '계산 중...' : '높이 계산하기'}
            </button>
          </div>

          {(isCalculating || calculatedHeight !== null) && (
            <ResultDisplay
              step={calculationStep}
              distance={parseFloat(distance)}
              eyeHeight={parseFloat(eyeHeight)}
              clinometerAngle={clinometerAngle}
              h2Value={h2Value}
              calculatedHeight={calculatedHeight}
              onReset={handleReset}
            />
          )}
        </div>
        <footer className="text-center mt-8 text-sm text-slate-500">
          <p>Trigonometry in Action | Educational Tool</p>
        </footer>
      </main>
    </div>
  );
};

export default App;