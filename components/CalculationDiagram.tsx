import React from 'react';

interface CalculationDiagramProps {
  distance: string;
  eyeHeight: string;
  protractorAngle: string;
  focusedInput: string | null;
  highlightedPart: string | null;
}

const CalculationDiagram: React.FC<CalculationDiagramProps> = ({ distance, eyeHeight, protractorAngle, focusedInput, highlightedPart }) => {
  const pAngle = parseFloat(protractorAngle);
  const clinometerAngle = isNaN(pAngle) || pAngle < 0 || pAngle >= 90 ? null : 90 - pAngle;

  const getStyle = (partName: string) => {
    const isFocused = focusedInput === partName;
    let isHighlighted = highlightedPart === partName;

    if (highlightedPart === 'distance_angle' && (partName === 'distance' || partName === 'protractorAngle')) {
        isHighlighted = true;
    }

    const isActive = isFocused || isHighlighted;
    const isAngle = partName === 'protractorAngle';

    return {
      stroke: isActive ? (isAngle ? '#ef4444' : '#3b82f6') : (isAngle ? '#ef4444' : 'black'),
      fill: isActive ? (isAngle ? '#ef4444' : '#3b82f6') : '#334155',
      strokeWidth: isActive ? 2.5 : 1,
      fontWeight: isActive ? 'bold' : 'normal',
      transition: 'all 0.3s ease-in-out',
    };
  };

  const distanceStyle = getStyle('distance');
  const eyeHeightStyle = getStyle('eyeHeight');
  const angleStyle = getStyle('protractorAngle');
  const h2Style = getStyle('h2');
  const HStyle = getStyle('H');

  return (
    <div className="my-8 px-4 flex justify-center" aria-hidden="true">
      <svg viewBox="0 0 400 280" className="w-full max-w-lg" aria-labelledby="diagram-title" role="img">
        <title id="diagram-title">측정 원리 다이어그램: 건물, 사람, 거리(d), 눈높이(h1), 건물 높이(H), 그리고 각도(θ)의 관계를 보여줍니다.</title>
        
        <line x1="10" y1="240" x2="390" y2="240" stroke="gray" strokeWidth="2" />
        
        <g>
            <rect x="300" y="40" width="60" height="200" fill="#CBD5E1" stroke="#475569" strokeWidth="1.5" />
            <rect x="310" y="55" width="15" height="20" fill="#F1F5F9" />
            <rect x="335" y="55" width="15" height="20" fill="#F1F5F9" />
            <rect x="310" y="85" width="15" height="20" fill="#F1F5F9" />
            <rect x="335" y="85" width="15" height="20" fill="#F1F5F9" />
            <rect x="310" y="115" width="15" height="20" fill="#F1F5F9" />
            <rect x="335" y="115" width="15" height="20" fill="#F1F5F9" />
        </g>

        <g>
            <circle cx="80" cy="190" r="10" fill="none" stroke="#475569" strokeWidth="1.5" />
            <line x1="80" y1="200" x2="80" y2="225" stroke="#475569" strokeWidth="1.5" />
            <line x1="80" y1="225" x2="70" y2="240" stroke="#475569" strokeWidth="1.5" />
            <line x1="80" y1="225" x2="90" y2="240" stroke="#475569" strokeWidth="1.5" />
            <line x1="80" y1="210" x2="70" y2="200" stroke="#475569" strokeWidth="1.5" />
            <line x1="80" y1="210" x2="90" y2="200" stroke="#475569" strokeWidth="1.5" />
        </g>

        <line x1="80" y1="190" x2="300" y2="40" stroke="#0EA5E9" strokeWidth="1.5" strokeDasharray="4 2" />
        <line x1="80" y1="190" x2="300" y2="190" stroke="#475569" strokeWidth="1" strokeDasharray="3 3" />
        
        <path d="M 100 190 A 20 20 0 0 1 118.4 182.2" fill="none" style={angleStyle} stroke={angleStyle.stroke} strokeWidth={angleStyle.strokeWidth as number} />
        <text x="125" y="180" fontSize="14" style={angleStyle} fill={angleStyle.fill}>{clinometerAngle !== null ? `${clinometerAngle.toFixed(1)}°` : 'θ'}</text>
        
        <g>
            <line x1="80" y1="245" x2="300" y2="245" style={distanceStyle} stroke={distanceStyle.stroke} />
            <line x1="80" y1="240" x2="80" y2="250" style={distanceStyle} stroke={distanceStyle.stroke} />
            <line x1="300" y1="240" x2="300" y2="250" style={distanceStyle} stroke={distanceStyle.stroke} />
            <text x="190" y="260" textAnchor="middle" fontSize="14" style={distanceStyle} fill={distanceStyle.fill}>
                {distance ? `거리 (d: ${distance}m)` : '거리 (d)'}
            </text>
        </g>

        <g>
            <line x1="70" y1="190" x2="70" y2="240" style={eyeHeightStyle} stroke={eyeHeightStyle.stroke} />
            <line x1="65" y1="190" x2="75" y2="190" style={eyeHeightStyle} stroke={eyeHeightStyle.stroke} />
            <line x1="65" y1="240" x2="75" y2="240" style={eyeHeightStyle} stroke={eyeHeightStyle.stroke} />
            <text x="45" y="215" textAnchor="middle" fontSize="14" style={eyeHeightStyle} fill={eyeHeightStyle.fill}>
                {eyeHeight ? `눈높이 (h₁: ${eyeHeight}m)` : '눈높이 (h₁)'}
            </text>
        </g>

        <g>
            <line x1="370" y1="40" x2="370" y2="240" style={HStyle} stroke={HStyle.stroke} strokeWidth={HStyle.strokeWidth as number} />
            <line x1="365" y1="40" x2="375" y2="40" style={HStyle} stroke={HStyle.stroke} />
            <line x1="365" y1="240" x2="375" y2="240" style={HStyle} stroke={HStyle.stroke} />
            <text x="385" y="140" textAnchor="middle" fontSize="14" style={HStyle} fill={HStyle.fill}>건물 높이 (H)</text>
        </g>

        <g>
            <line x1="290" y1="40" x2="290" y2="190" strokeDasharray="2 2" style={h2Style} stroke={h2Style.stroke} strokeWidth={h2Style.strokeWidth as number} />
            <text x="280" y="115" textAnchor="end" fontSize="14" style={h2Style} fill={h2Style.fill}>h₂</text>
        </g>

        <g className="font-mono text-sm">
            <text x="10" y="20" fontSize="14" fontWeight="bold">H = h₁ + h₂</text>
            <text x="10" y="40" fontSize="14" fontWeight="bold">h₂ = d × tan(θ)</text>
        </g>
      </svg>
    </div>
  );
};

export default CalculationDiagram;