# Simpus UI Library

A jQuery-based UI component library with a clean, modern design.


![Version](https://img.shields.io/badge/version-1.1.0-blue.svg)
![jQuery](https://img.shields.io/badge/jQuery-3.7.1-0769AD.svg)
![Vue.js](https://img.shields.io/badge/Vue.js-2.7-42b883.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## ✨ Features

- 🪟 **Draggable & Resizable Windows** — Fully functional windowing system
- 🎨 **Glassmorphism Style** — Frosted glass backdrops, spring animations, vibrancy materials
- 🌓 **Light & Dark Mode** — Automatic theme switching
- 📱 **Responsive Design** — Works on all screen sizes
- ⚡ **jQuery + Vue.js** — Desktop powered by jQuery, component showcase by Vue.js
- 🧩 **Component Showcase** — Interactive documentation with live previews
- 🔌 **Dynamic Components** — Input Autocomplete & Dynamic Select with JSON API support

## 🚀 Quick Start

### 1. Clone & Serve

```bash
git clone https://github.com/absalim11/simpus-ui.git
cd simpus-ui
python3 simpus-server.py
# Open http://localhost:8087
```

### 2. Include Files

```html
<!-- Bootstrap 4.6 -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">

<!-- Simpus UI CSS -->
<link rel="stylesheet" href="styles/simpus.css">

<!-- jQuery + Vue.js -->
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.min.js"></script>
```

## 📁 Project Structure

```
simpus-ui/
├── index.html                  # Main entry point (Simpus OS Desktop)
├── styles/
│   └── simpus.css              # Core design system (source of truth)
├── core/
│   ├── simpus-ui.js            # jQuery UI plugins (Window, Dock, MenuBar, etc.)
│   └── routing.js              # SPA routing
├── app/
│   ├── desktop/
│   │   ├── desktop.html        # Desktop template
│   │   └── controller.js       # Desktop Vue controller
│   └── components/
│       ├── index.html          # Component Showcase template
│       ├── controller.js       # Vue component definitions
│       └── components.css      # Showcase-specific styles (inherits from simpus.css)
├── img/                        # Wallpapers & icons
└── simpus-server.py            # Development server
```

## 🧩 Component Showcase

The library includes an interactive **Component Showcase** accessible from the desktop:

**Menu Bar** → **Components** → **Showcase Component**

### Available Components

| Component | Description |
|---|---|
| **Button** | Primary, Secondary, Destructive, Outline, Ghost, Link variants |
| **Input** | Text inputs with labels, placeholders, disabled states |
| **Checkbox** | Custom styled checkboxes |
| **Radio** | Radio button groups |
| **Switch** | Toggle switches |
| **Card** | Content containers with header/footer |
| **Combobox** | Searchable dropdown with keyboard navigation |
| **Modal / Dialog** | macOS Tahoe-style frosted glass dialogs |
| **Alert Dialog** | Informational modal with single action |
| **Confirm Dialog** | Confirmation modal with Cancel/Confirm actions |
| **Toast** | Notification popups with glassmorphism |
| **Skeleton** | Loading placeholders |
| **Table** | Data tables with hover states |
| **Tabs** | Tabbed content navigation |
| **Input Autocomplete** | Live search with JSON API (DummyJSON) |
| **Dynamic Select** | Searchable select with remote data fetching |
| **Login Page** | Pre-designed login form example |

### Dynamic Components (API-powered)

```html
<!-- Autocomplete: fetches from https://dummyjson.com/products/search -->
<comp-autocomplete></comp-autocomplete>

<!-- Dynamic Select: fetches from https://dummyjson.com/users/search -->
<comp-dynamic-select></comp-dynamic-select>
```

## 🖥️ Desktop Environment (jQuery Plugins)

### Menu Bar

```javascript
$('#menubar').simpusMenuBar({
  items: [
    {
      id: 'file', label: 'File',
      submenu: [
        { label: 'New', shortcut: '⌘N', action: 'new' },
        { divider: true },
        { label: 'Save', shortcut: '⌘S', action: 'save' }
      ]
    }
  ],
  onSelect: function(menu, action) { console.log(action); }
});
```

### Window

```javascript
$('<div></div>').simpusWindow({
  title: 'My Window',
  width: 600,
  height: 400,
  content: '<p>Hello, Simpus!</p>',
  resizable: true
});
```

### Modal

```javascript
$.simpusModal({
  type: 'success',
  title: 'Saved!',
  content: 'Your changes have been saved.',
  buttons: [{ label: 'OK', type: 'primary', action: 'ok' }]
});
```

### Dock, Context Menu, Notification, Finder

See the full jQuery API in `core/simpus-ui.js`.

## 🎨 Icon System

Simpus OS uses **Bootstrap Icons v1.11.3** with **400+ curated icons** across 12 categories. Full interactive documentation is available at `app/icons/index.html` with search and click-to-copy.

### Usage

```html
<i class="bi bi-hospital"></i>
<i class="bi bi-person-badge"></i>
<i class="bi bi-heart-pulse"></i>
```

### Categories

| Category | Icons | Key Icons |
|---|---|---|
| 🏥 **Healthcare** | 40+ | `hospital`, `capsule`, `heart-pulse`, `lungs`, `virus`, `bandaid` |
| 👥 **People** | 30+ | `person`, `person-badge`, `person-check`, `people`, `person-gear` |
| 🧭 **Navigation** | 45+ | `arrow-*`, `chevron-*`, `caret-*`, `arrows-move`, `signpost` |
| 📄 **Files** | 45+ | `file-earmark-*`, `folder-*`, `archive`, `files` |
| 💬 **Communication** | 45+ | `chat-*`, `envelope-*`, `send`, `telephone-*`, `bell-*` |
| ⚙️ **System** | 100+ | `house`, `gear`, `search`, `calendar-*`, `clock-*`, `trash-*` |
| 📊 **Data** | 30+ | `bar-chart-*`, `graph-*`, `pie-chart`, `database-*`, `table` |
| 💰 **Commerce** | 45+ | `cart-*`, `bag-*`, `wallet`, `credit-card-*`, `bank`, `building` |
| 🎬 **Media** | 45+ | `image`, `camera-*`, `play-*`, `volume-*`, `music-*`, `mic-*` |
| ⚠️ **Status** | 35+ | `check-circle`, `exclamation-*`, `info-circle`, `patch-*` |
| 💻 **Devices** | 40+ | `laptop`, `phone`, `printer`, `wifi`, `cpu`, `terminal`, `bug` |
| 🔒 **Security** | 28+ | `shield-*`, `lock-*`, `key`, `fingerprint`, `incognito` |
| 📐 **Layout** | 35+ | `layout-*`, `columns`, `type-*`, `text-*`, `fullscreen` |

### Icon Documentation Page

Open via **Menu Bar** → **Components** → or directly at `app/icons/index.html`.
Features: search filter, dark mode toggle, click-to-copy HTML.

## 🎨 Design System

All styles are driven by CSS variables defined in `styles/simpus.css`:

```css
:root {
  /* Colors */
  --simpus-accent-primary: #16a085;
  --simpus-accent-secondary: #2980b9;
  --simpus-accent-red: #c0392b;

  /* Buttons */
  --simpus-btn-height: 32px;
  --simpus-btn-padding: 0 16px;
  --simpus-btn-radius: 8px;

  /* Inputs */
  --simpus-input-radius: 8px;
  --simpus-input-border: #bdc3c7;

  /* Windows */
  --simpus-window-radius: 12px;
  --simpus-glass-blur: 20px;

  /* Z-Index Scale */
  --simpus-z-dock: 1000;
  --simpus-z-menubar: 1001;
  --simpus-z-modal: 2000;
  --simpus-z-tooltip: 3000;
}
```

### Theme Switching

```javascript
SimpusUI.setTheme('dark');
SimpusUI.toggleTheme();
```

## 📋 Changelog

### v1.0.0
- Initial release with desktop environment, windowing system, dock, menu bar

## 🌐 Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13.1+
- Edge 80+

## 📄 License

MIT License — free for personal and commercial use.

---

Made with ❤️ by Simpus UI Team.
