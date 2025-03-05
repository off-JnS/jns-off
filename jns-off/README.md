# jns-off

## Projektübersicht

Willkommen zu jns-off, einer preisgekrönten Website, die speziell für die mobile Ansicht entwickelt wurde. Diese Website bietet ein modernes Design mit einem dunklen Modus und 3D-Elementen, um ein ansprechendes Benutzererlebnis zu gewährleisten.

## Technologien

- **HTML**: Strukturierung der Inhalte
- **CSS**: Gestaltung und Layout
- **JavaScript**: Interaktive Funktionen
- **Vite**: Build-Tool für eine schnelle Entwicklung
- **GitHub Actions**: Automatisierung des Deployments

## Struktur

Die Projektstruktur ist wie folgt:

```
jns-off
├── src
│   ├── assets
│   │   ├── fonts
│   │   │   └── poppins
│   │   ├── images
│   │   └── models
│   ├── js
│   │   ├── main.js
│   │   ├── darkMode.js
│   │   └── 3dElements.js
│   ├── css
│   │   ├── style.css
│   │   ├── darkMode.css
│   │   └── mobile.css
│   ├── sections
│   │   ├── hero.html
│   │   ├── leistung.html
│   │   └── kontakt.html
│   └── index.html
├── .github
│   └── workflows
│       └── deploy.yml
├── .gitignore
├── package.json
├── vite.config.js
└── README.md
```

## Installation

1. Klone das Repository:
   ```
   git clone https://github.com/off-JnS/jns-off.git
   ```
2. Navigiere in das Projektverzeichnis:
   ```
   cd jns-off
   ```
3. Installiere die Abhängigkeiten:
   ```
   npm install
   ```

## Nutzung

Um die Website lokal zu starten, führe den folgenden Befehl aus:
```
npm run dev
```

## Deployment

Das Projekt ist so konfiguriert, dass es automatisch auf GitHub Pages bereitgestellt wird. Änderungen an der Haupt-Branch werden automatisch veröffentlicht.

## Lizenz

Dieses Projekt ist lizenziert unter der MIT-Lizenz.