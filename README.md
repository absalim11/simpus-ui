# Simpus UI Library

A jQuery-based UI component library with a clean, modern design.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![jQuery](https://img.shields.io/badge/jQuery-3.6+-0769AD.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## ✨ Features

- 🪟 **Draggable & Resizable Windows** - A flexible windowing system
- 🎨 **Modern Effects** - Beautiful blur and transparency
- 🌓 **Light & Dark Mode** - Automatic theme switching
- 📱 **Responsive Design** - Works on all screen sizes
- ⚡ **jQuery Powered** - Simple, familiar API
- 🎯 **Zero Dependencies** - Just jQuery

## 🚀 Quick Start

### Include Files

```html
<!-- CSS -->
<link rel="stylesheet" href="css/simpus-ui.css">

<!-- jQuery (required) -->
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>

<!-- Simpus UI Library -->
<script src="js/simpus-ui.js"></script>
```

### Basic Structure

```html
<div class="simpus-desktop">
  <!-- Menu Bar -->
  <div class="simpus-menubar" id="menubar"></div>
  
  <!-- Windows Container -->
  <div id="windows"></div>
  
  <!-- Dock -->
  <div class="simpus-dock" id="dock"></div>
</div>
```

## 📚 Components

### Menu Bar

```javascript
$('#menubar').simpusMenuBar({
  items: [
    {
      id: 'file',
      label: 'File',
      submenu: [
        { label: 'New', shortcut: 'Ctrl+N', action: 'new' },
        { label: 'Open', shortcut: 'Ctrl+O', action: 'open' },
        { divider: true },
        { label: 'Save', shortcut: 'Ctrl+S', action: 'save' }
      ]
    }
  ],
  onSelect: function(menu, action) {
    console.log('Selected:', action);
  }
});
```

### Dock

```javascript
$('#dock').simpusDock({
  items: [
    { 
      id: 'home', 
      icon: '<div class="app-icon">🏠</div>',
      tooltip: 'Home',
      active: true
    },
    { 
      id: 'settings', 
      icon: '<div class="app-icon">⚙️</div>',
      tooltip: 'Settings'
    }
  ],
  onClick: function(appId) {
    console.log('Launched:', appId);
  }
});
```

### Window

```javascript
$('#window').simpusWindow({
  title: 'My Window',
  width: 600,
  height: 400,
  content: '<p>Hello, Simpus!</p>',
  resizable: true,
  draggable: true,
  onClose: function($window) {
    console.log('Window closed');
  }
});
```

### Modal

```javascript
// Simple modal
$.simpusModal({
  title: 'Hello',
  content: 'This is a modal dialog.',
  buttons: [
    { label: 'Cancel', type: 'secondary', action: 'cancel' },
    { label: 'OK', type: 'primary', action: 'ok' }
  ],
  onAction: function(action) {
    console.log('Action:', action);
  }
});

// Alert modal with icon
$.simpusModal({
  type: 'success', // 'info', 'warning', 'error', 'success'
  title: 'Success!',
  content: 'Your changes have been saved.',
  buttons: [{ label: 'Great!', type: 'primary', action: 'ok' }]
});
```

### Notification

```javascript
$.simpusNotification({
  title: 'New Message',
  message: 'You have a new notification.',
  icon: '💬',
  duration: 5000,
  onClick: function() {
    console.log('Notification clicked');
  }
});
```

### Context Menu

```javascript
$('#element').simpusContextMenu({
  items: [
    { label: 'Cut', shortcut: 'Ctrl+X', action: 'cut' },
    { label: 'Copy', shortcut: 'Ctrl+C', action: 'copy' },
    { label: 'Paste', shortcut: 'Ctrl+V', action: 'paste' },
    { divider: true },
    { label: 'Delete', action: 'delete', disabled: true }
  ],
  onSelect: function(action) {
    console.log('Context action:', action);
  }
});
```

### Tooltip

```javascript
$('#button').simpusTooltip({
  content: 'Click me!',
  position: 'top', // 'top', 'bottom', 'left', 'right'
  delay: 300
});
```

### Switch/Toggle

```javascript
$('#switch').simpusSwitch({
  checked: true,
  onChange: function(isChecked) {
    console.log('Switch:', isChecked);
  }
});

// API
$('#switch').data('simpusSwitch').toggle();
$('#switch').data('simpusSwitch').setChecked(true);
```

### Segmented Control

```javascript
$('#segmented').simpusSegmented({
  items: ['Day', 'Week', 'Month'],
  selected: 0,
  onChange: function(index, value) {
    console.log('Selected:', value);
  }
});
```

### Finder/File Browser

```javascript
$('#finder').simpusFinder({
  sidebar: [
    {
      title: 'Favorites',
      items: [
        { label: 'Desktop', path: '/desktop', icon: '🖥️' },
        { label: 'Documents', path: '/docs', icon: '📄' }
      ]
    }
  ],
  files: [
    { name: 'file.txt', icon: '📄' },
    { name: 'image.jpg', icon: '🖼️' }
  ],
  onFileClick: function(filename) {
    console.log('Clicked:', filename);
  }
});
```

### Desktop Icons

```javascript
$('#desktop').simpusDesktopIcons({
  icons: [
    { id: 'disk', label: 'Hard Drive', icon: '💿' },
    { id: 'docs', label: 'Documents', icon: '📁' }
  ],
  onDoubleClick: function(iconId) {
    console.log('Opened:', iconId);
  }
});
```

## 🎨 Theming

### Switch Theme

```javascript
// Toggle between light and dark
SimpusUI.toggleTheme();

// Set specific theme
SimpusUI.setTheme('dark');
SimpusUI.setTheme('light');
```

### CSS Variables

Customize the look by overriding CSS variables:

```css
:root {
  --simpus-accent-primary: #16a085;
  --simpus-window-radius: 8px;
  --simpus-glass-blur: 20px;
}
```

## 📦 Available CSS Variables

### Colors
- `--simpus-bg-primary`, `--simpus-bg-secondary`, `--simpus-bg-tertiary`
- `--simpus-text-primary`, `--simpus-text-secondary`, `--simpus-text-tertiary`
- `--simpus-accent-primary`, `--simpus-accent-secondary`, etc.

### Components
- `--simpus-menubar-height`, `--simpus-menubar-bg`
- `--simpus-window-radius`, `--simpus-window-bg`, `--simpus-window-shadow`
- `--simpus-dock-height`, `--simpus-dock-bg`
- `--simpus-btn-radius`, `--simpus-btn-primary-bg`
- `--simpus-input-radius`, `--simpus-input-bg`

### Effects
- `--simpus-glass-light`, `--simpus-glass-dark`
- `--simpus-glass-blur`, `--simpus-glass-saturation`
- `--simpus-shadow-sm`, `--simpus-shadow-md`, `--simpus-shadow-lg`

## 🔧 API Reference

### Global Methods

| Method | Description |
|--------|-------------|
| `SimpusUI.init()` | Initialize the library |
| `SimpusUI.setTheme(theme)` | Set theme ('light' or 'dark') |
| `SimpusUI.toggleTheme()` | Toggle between light/dark |
| `SimpusUI.focusWindow($window)` | Bring window to front |
| `SimpusUI.generateId(prefix)` | Generate unique ID |

### Window API

```javascript
const $window = $('#window');

// Methods via data attribute
$window.data('simpusWindow').setTitle('New Title');
$window.data('simpusWindow').setContent('<p>New content</p>');
$window.data('simpusWindow').minimize();
$window.data('simpusWindow').maximize();
$window.data('simpusWindow').restore();
$window.data('simpusWindow').close();
$window.data('simpusWindow').focus();
```

## 🌐 Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13.1+
- Edge 80+

## 📄 License

MIT License - feel free to use in personal and commercial projects.

---


## 🌟 Component Showcase

The library includes a comprehensive **Component Showcase** that demonstrates all available UI elements. 

To view it:
1. Open the Menu Bar > **Components** > **Open Component Showcase**.
2. Or click the **Settings** icon in the Dock.

### New Components (v1.1)

#### 🦴 Skeleton Loader
Animated placeholders for content loading states.
```html
<div class="simpus-animate-pulse">
  <div class="simpus-skeleton text" style="width: 70%;"></div>
</div>
```

#### 🔍 Autocomplete
Input field with dropdown suggestions.
```javascript
$('#input').simpusAutocomplete({
  source: ['Apple', 'Banana', 'Cherry']
});
```

#### 📂 Finder (File Manager)
A macOS-style file browser with sidebar navigation and icon grid view.
```javascript
$('#finder').simpusFinder({
  sidebar: [...],
  files: [...]
});
```

#### 🔐 Login Window
A pre-designed, centered login modal template.
```javascript
createLoginWindow();
```

---

Made with ❤️ for the web development community.
