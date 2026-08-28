import React from 'react';

interface RadarChartProps {
  size?: number;
  interests?: string[];
  level?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  className?: string;
  showLabels?: boolean;
}

export const RadarChart: React.FC<RadarChartProps> = ({
  size = 200,
  interests = ['Technology', 'Leadership', 'Design', 'Project Management'],
  level = 'advanced',
  className = '',
  showLabels = false,
}) => {
  // 8 Dimensions
  const dimensions = [
    { name: 'Tech', key: 'Technology' },
    { name: 'Leadership', key: 'Leadership' },
    { name: 'Strategy', key: 'Business' },
    { name: 'Execution', key: 'Project Management' },
    { name: 'Design', key: 'Design' },
    { name: 'Analytics', key: 'Data Analytics' },
    { name: 'Teamwork', key: 'Teamwork' },
    { name: 'Comms', key: 'Communication' },
  ];

  // Base multiplier from experience level
  const levelMultiplier = {
    beginner: 0.45,
    intermediate: 0.65,
    advanced: 0.85,
    expert: 0.98,
  }[level] || 0.75;

  const center = 50;
  const maxRadius = 38;

  // Calculate polygon points based on whether key is selected in interests
  const points = dimensions.map((dim, i) => {
    const angle = (i * 2 * Math.PI) / dimensions.length - Math.PI / 2;
    const isSelected = interests.includes(dim.key);
    const weight = isSelected ? 1.0 * levelMultiplier : 0.45 * levelMultiplier;
    const r = maxRadius * Math.min(Math.max(weight, 0.25), 1.0);
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y, angle, label: dim.name, isSelected };
  });

  const pointsString = points.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full opacity-90 transition-all duration-700 overflow-visible"
        style={{ maxWidth: size, maxHeight: size }}
      >
        <defs>
          <radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#d2bbff" stopOpacity="0.35" />
            <stop offset="70%" stopColor="#7c3aed" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#0053db" stopOpacity="0.0" />
          </radialGradient>
          <linearGradient id="polyStroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#d2bbff" />
            <stop offset="100%" stopColor="#4cd7f6" />
          </linearGradient>
        </defs>

        {/* Concentric grid circles */}
        <circle cx="50" cy="50" r="38" fill="none" stroke="#2f3445" strokeWidth="0.5" strokeDasharray="1.5 1.5" />
        <circle cx="50" cy="50" r="28" fill="none" stroke="#2f3445" strokeWidth="0.5" />
        <circle cx="50" cy="50" r="18" fill="none" stroke="#2f3445" strokeWidth="0.5" />
        <circle cx="50" cy="50" r="8" fill="none" stroke="#2f3445" strokeWidth="0.5" />

        {/* Radial axes */}
        {dimensions.map((_, i) => {
          const angle = (i * 2 * Math.PI) / dimensions.length - Math.PI / 2;
          const x2 = center + 38 * Math.cos(angle);
          const y2 = center + 38 * Math.sin(angle);
          return (
            <line
              key={i}
              x1="50"
              y1="50"
              x2={x2}
              y2={y2}
              stroke="#2f3445"
              strokeWidth="0.5"
            />
          );
        })}

        {/* Data polygon */}
        <polygon
          points={pointsString}
          fill="url(#radarGlow)"
          stroke="url(#polyStroke)"
          strokeWidth="1.5"
          className="transition-all duration-700 ease-out filter drop-shadow-[0_0_8px_rgba(210,187,255,0.5)]"
        />

        {/* Data points */}
        {points.map((p, i) => (
          <g key={i}>
            <circle
              cx={p.x}
              cy={p.y}
              r={p.isSelected ? "2.2" : "1.6"}
              fill={p.isSelected ? "#acedff" : "#d2bbff"}
              className="transition-all duration-700 filter drop-shadow-[0_0_4px_#4cd7f6]"
            />
            {showLabels && (
              <text
                x={center + 45 * Math.cos(p.angle)}
                y={center + 45 * Math.sin(p.angle) + 1}
                textAnchor="middle"
                fontSize="3.8"
                fill={p.isSelected ? '#dde2f8' : '#958da1'}
                className="font-medium tracking-tight select-none"
              >
                {p.label}
              </text>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
};
