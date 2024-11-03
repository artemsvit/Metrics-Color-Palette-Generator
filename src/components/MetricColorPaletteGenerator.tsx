import React, { useState } from 'react';
import { Trash2, Palette, Download, Copy, RefreshCw, Wand2, Check } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Enhanced color palette with more variety
const PASTEL_BASE_COLORS = [
  '#93C6E7',  // Bright pastel blue
  '#FF6B6B',  // Warm red
  '#4ECDC4',  // Turquoise
  '#FFD93D',  // Golden yellow
  '#95D5B2',  // Mint green
  '#FF69B4',  // Hot pink
  '#6C5B7B',  // Deep purple
  '#F8B195',  // Peach
  '#45B7D1',  // Ocean blue
  '#98FB98',  // Pale green
  '#DDA0DD',  // Plum
  '#FF9671',  // Coral
  '#2EC4B6',  // Teal
  '#E6B89C',  // Tan
  '#9B5DE5',  // Bright purple
  '#FFBF69',  // Light orange
];

// Color utilities
const hexToHSL = (hex) => {
  const r = parseInt(hex.substr(1,2), 16) / 255;
  const g = parseInt(hex.substr(3,2), 16) / 255;
  const b = parseInt(hex.substr(5,2), 16) / 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
};

const hslToHex = (h, s, l) => {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = n => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
};

const getColorDistance = (color1, color2) => {
  const hsl1 = hexToHSL(color1);
  const hsl2 = hexToHSL(color2);
  
  const dh = Math.min(Math.abs(hsl2.h - hsl1.h), 360 - Math.abs(hsl2.h - hsl1.h)) / 180.0;
  const ds = Math.abs(hsl2.s - hsl1.s) / 100.0;
  const dl = Math.abs(hsl2.l - hsl1.l) / 100.0;
  
  return Math.sqrt(dh * dh * 4 + ds * ds + dl * dl);
};

const optimizeColors = (numColors) => {
  const colors = [...PASTEL_BASE_COLORS];
  const result = [];
  
  const firstColorIndex = Math.floor(Math.random() * colors.length);
  result.push(colors[firstColorIndex]);
  colors.splice(firstColorIndex, 1);

  while (result.length < numColors && colors.length > 0) {
    let maxMinDistance = -1;
    let bestColorIndex = 0;

    for (let i = 0; i < colors.length; i++) {
      let minDistance = Number.MAX_VALUE;
      for (const chosenColor of result) {
        const distance = getColorDistance(colors[i], chosenColor);
        minDistance = Math.min(minDistance, distance);
      }
      if (minDistance > maxMinDistance) {
        maxMinDistance = minDistance;
        bestColorIndex = i;
      }
    }

    result.push(colors[bestColorIndex]);
    colors.splice(bestColorIndex, 1);
  }

  return result;
};

const Toast = ({ message }) => (
  <Alert className="fixed bottom-4 right-4 w-auto max-w-md animate-in fade-in slide-in-from-bottom-4 bg-green-50 border-green-200">
    <Check className="h-4 w-4 text-green-500" />
    <AlertDescription className="text-green-700">{message}</AlertDescription>
  </Alert>
);

const MetricColorPaletteGenerator = () => {
  const [metrics, setMetrics] = useState({
    'Cycle time': '#93C6E7',
    'Lead time': '#FF6B6B',
    'Reaction time': '#4ECDC4',
    'Review Time': '#FFD93D'
  });
  const [newMetricName, setNewMetricName] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    showToastMessage('Color code copied to clipboard!');
  };

  const matchColors = () => {
    const metricNames = Object.keys(metrics);
    const optimizedColors = optimizeColors(metricNames.length);
    
    const newMetrics = {};
    metricNames.forEach((metric, index) => {
      newMetrics[metric] = optimizedColors[index] || PASTEL_BASE_COLORS[index % PASTEL_BASE_COLORS.length];
    });
    
    setMetrics(newMetrics);
    showToastMessage('Updated colors for maximum contrast');
  };

  const updateMetricColor = (metric) => {
    const newMetrics = { ...metrics };
    const unusedColors = PASTEL_BASE_COLORS.filter(color => 
      !Object.values(newMetrics).includes(color)
    );
    const newColor = unusedColors.length > 0 
      ? unusedColors[Math.floor(Math.random() * unusedColors.length)]
      : PASTEL_BASE_COLORS[Math.floor(Math.random() * PASTEL_BASE_COLORS.length)];
    
    newMetrics[metric] = newColor;
    setMetrics(newMetrics);
    showToastMessage(`Updated color for ${metric}`);
  };

  const addNewMetric = () => {
    if (newMetricName && !metrics[newMetricName]) {
      const unusedColors = PASTEL_BASE_COLORS.filter(color => 
        !Object.values(metrics).includes(color)
      );
      const newColor = unusedColors.length > 0 
        ? unusedColors[0]
        : PASTEL_BASE_COLORS[Object.keys(metrics).length % PASTEL_BASE_COLORS.length];
      
      setMetrics(prev => ({
        ...prev,
        [newMetricName]: newColor
      }));
      setNewMetricName('');
      showToastMessage(`Added new metric: ${newMetricName}`);
    }
  };

  const deleteMetric = (metric) => {
    const newMetrics = { ...metrics };
    delete newMetrics[metric];
    setMetrics(newMetrics);
    showToastMessage(`Deleted ${metric}`);
  };

  const exportPalette = (format) => {
    let output = '';
    switch (format) {
      case 'json':
        output = JSON.stringify(metrics, null, 2);
        break;
      case 'css':
        output = Object.entries(metrics)
          .map(([name, color]) => `--color-${name.toLowerCase().replace(/\s+/g, '-')}: ${color};`)
          .join('\n');
        break;
      case 'tailwind':
        output = `colors: {\n${Object.entries(metrics)
          .map(([name, color]) => `  '${name.toLowerCase().replace(/\s+/g, '-')}': '${color}',`)
          .join('\n')}\n}`;
        break;
      case 'sass':
        output = Object.entries(metrics)
          .map(([name, color]) => `$color-${name.toLowerCase().replace(/\s+/g, '-')}: ${color};`)
          .join('\n');
        break;
      case 'less':
        output = Object.entries(metrics)
          .map(([name, color]) => `@color-${name.toLowerCase().replace(/\s+/g, '-')}: ${color};`)
          .join('\n');
        break;
      case 'sketch':
        output = Object.entries(metrics)
          .map(([name, color]) => `${name}: ${color}`)
          .join('\n');
        break;
    }
    
    navigator.clipboard.writeText(output);
    showToastMessage(`Copied ${format.toUpperCase()} format to clipboard`);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Palette className="w-8 h-8 text-blue-500" />
          <h1 className="text-2xl font-bold">Metrics Color Palette Generator</h1>
        </div>
        <button
          onClick={matchColors}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          <Wand2 className="w-4 h-4" />
          <span>Match Colors</span>
        </button>
      </div>

      <Card>
        <CardContent className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(metrics).map(([metric, color]) => (
              <div key={metric} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-10 h-10 rounded-lg shadow-inner border-2 border-white cursor-pointer hover:scale-110 transition-transform"
                      style={{ backgroundColor: color }}
                      onClick={() => copyToClipboard(color)}
                      title="Click to copy color code"
                    />
                    <div>
                      <div className="font-medium">{metric}</div>
                      <div className="text-sm text-gray-500">{color}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateMetricColor(metric)}
                      className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"
                      title="Update color"
                    >
                      <RefreshCw size={16} />
                    </button>
                    <button
                      onClick={() => deleteMetric(metric)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Add New Metric</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <input
              type="text"
              value={newMetricName}
              onChange={(e) => setNewMetricName(e.target.value)}
              placeholder="Enter metric name"
              className="flex-1 p-2 border rounded-lg"
            />
            <button
              onClick={addNewMetric}
              disabled={!newMetricName}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
            >
              Add Metric
            </button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Export Palette</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            <button
              onClick={() => exportPalette('json')}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
            >
              Copy as JSON
            </button>
            <button
              onClick={() => exportPalette('css')}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
            >
              Copy as CSS Variables
            </button>
            <button
              onClick={() => exportPalette('tailwind')}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
            >
              Copy as Tailwind Config
            </button>
            <button
              onClick={() => exportPalette('sass')}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
            >
              Copy as SASS Variables
            </button>
            <button
              onClick={() => exportPalette('less')}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
            >
              Copy as LESS Variables
            </button>
            <button
              onClick={() => exportPalette('sketch')}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
            >
              Copy as Sketch Palette
            </button>
          </div>
        </CardContent>
      </Card>

      {showToast && <Toast message={toastMessage} />}
    </div>
  );
};

export default MetricColorPaletteGenerator;
