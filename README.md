# Metrics Color Palette Generator

A React component for generating and managing consistent color palettes for metrics visualization. Built with React, Tailwind CSS, and shadcn/ui components.

## Features

- 🎨 Generate harmonious color palettes for metrics visualization
- 🔄 Automatic color optimization for maximum contrast
- 📋 One-click color code copying
- 💾 Export palettes in multiple formats (JSON, CSS, Tailwind, SASS, LESS, Sketch)
- 🎯 Add, update, and delete metrics with their associated colors
- 🌈 16 carefully selected base colors
- 💅 Modern UI with shadcn/ui components

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/metrics-color-palette-generator

# Navigate to the project directory
cd metrics-color-palette-generator

# Install dependencies
npm install
```

## Dependencies

- React 18+
- Tailwind CSS
- shadcn/ui components
- Lucide React icons
- TypeScript (optional)

## Usage

1. Install the required dependencies:

```bash
npm install @/components/ui lucide-react
```

2. Import and use the component:

```jsx
import MetricColorPaletteGenerator from './components/MetricColorPaletteGenerator';

function App() {
  return (
    <div>
      <MetricColorPaletteGenerator />
    </div>
  );
}
```

3. Initialize shadcn/ui components:

```bash
npx shadcn-ui init
```

4. Install required shadcn/ui components:

```bash
npx shadcn-ui add card alert
```

## Export Formats

The generator supports exporting color palettes in various formats:

- **JSON**: For use in JavaScript applications
- **CSS Variables**: For CSS styling
- **Tailwind Config**: For Tailwind CSS projects
- **SASS Variables**: For SASS/SCSS projects
- **LESS Variables**: For LESS projects
- **Sketch Palette**: For design handoff

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.
