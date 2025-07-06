# 3D Portfolio - Kerkervaring

Een interactieve 3D portfolio website gebouwd met React Three Fiber, waarbij projecten worden gepresenteerd in een virtuele kerkruimte.

## Overzicht

Dit portfolio project combineert moderne webtechnologie met architecturale visualisatie om een unieke gebruikerservaring te creëren. Bezoekers navigeren door een 3D kerk waarbij verschillende projecten worden gerepresenteerd door interactieve, gekleurde kubussen.

## Features

### 🏛️ 3D Kerkmodel
- Realistische kerkarchitectuur met witte ramen
- Reflecterende vloer met aanpasbare eigenschappen
- Atmosferische verlichting met point lights

### 🎨 Interactieve Project Showcase
- 6 gekleurde kubussen in een cirkel arrangement
- Hover effecten met animaties (zweven en rotatie)
- "View Project" knoppen voor elk project
- Unieke kleurcodering per project (rood, turquoise, blauw, groen, geel, paars)

### 🎮 Navigatie & Controls
- Rotatie knoppen voor 60° stappen navigatie
- Touch swipe ondersteuning voor mobiele apparaten
- Mouse drag swipe voor desktop gebruikers
- Vloeiende camera interpolatie met mouse-look functionaliteit

### ✨ Visuele Effecten
- Custom Godray/lichtstraal effect via post-processing
- Performance monitoring met FPS counter
- Intro pagina met roterende sphere en normal mapping

## Technische Stack

- **React 19.0** - UI Framework
- **Three.js + React Three Fiber** - 3D Graphics & WebGL
- **@react-three/drei** - R3F Helper componenten
- **@react-three/postprocessing** - Visuele effecten
- **Vite** - Build tool & development server
- **Leva** - GUI voor development controls

## Project Structuur

```
portfolio/
├── src/
│   ├── index.jsx          # Hoofd app entry & navigatie
│   ├── Experience.jsx     # 3D scene setup & camera controls
│   ├── IntroPage.jsx      # Entry pagina met sphere
│   ├── PortfolioClean.jsx # Kerkmodel & reflectieve vloer
│   ├── ProjectCubes.jsx   # Interactieve project kubussen
│   ├── GodrayEffect.jsx   # Custom post-processing effect
│   └── FPSCounter.jsx     # Performance monitoring
├── public/
│   └── church_whitewindows.glb  # 3D kerkmodel
└── dist/                  # Build output voor deployment
```

## Installatie & Development

```bash
# Installeer dependencies
npm install

# Start development server
npm run dev

# Build voor productie
npm run build

# Preview productie build
npm run preview
```

## Performance Optimalisaties

- Suspense loading met fallback placeholders
- Geoptimaliseerde reflectie resolutie (1024px)
- Frame limiting op reflecties (30 frames)
- Lazy loading van 3D assets

## Browser Compatibiliteit

Het project vereist een moderne browser met WebGL2 ondersteuning. Getest op:
- Chrome/Edge (laatste versies)
- Firefox (laatste versies)
- Safari (met WebGL2 enabled)

## Deployment

Het project is geconfigureerd voor GitHub Pages deployment via de workflow in `.github/workflows/deploy.yml`.

## Licentie

Dit project is eigendom van de portfolio eigenaar. Alle rechten voorbehouden.