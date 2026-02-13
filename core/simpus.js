/**
 * Simpus UI Library - jQuery Components
 * A jQuery-based UI component library with a clean, modern design.
 * Version: 1.0.0
 * 
 * Dependencies: jQuery 3.6+
 */

(function ($) {
  'use strict';

  // ============================================
  // SIMPUS UI NAMESPACE
  // ============================================
  window.SimpusUI = {
    version: '1.0.0',
    zIndex: 100,
    windows: [],
    activeWindow: null,

    // Initialize the library
    init: function () {
      this.initTheme();
      this.initGlobalEvents();
      return this;
    },

    // Theme Management
    initTheme: function () {
      const savedTheme = localStorage.getItem('simpus-theme') || 'light';
      this.setTheme(savedTheme);
    },

    setTheme: function (theme) {
      $('html').attr('data-theme', theme);
      localStorage.setItem('simpus-theme', theme);
      $(document).trigger('simpus:themechange', [theme]);
    },

    toggleTheme: function () {
      const currentTheme = $('html').attr('data-theme') || 'light';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      this.setTheme(newTheme);
    },

    // Global Events
    initGlobalEvents: function () {
      // Close context menus on click outside
      $(document).on('click', function (e) {
        if (!$(e.target).closest('.simpus-context-menu, .simpus-menubar-item').length) {
          $('.simpus-context-menu, .simpus-menu-dropdown').removeClass('show');
        }
      });

      // Window focus management
      $(document).on('mousedown', '.simpus-window', function () {
        SimpusUI.focusWindow($(this));
      });
    },

    // Window Management
    focusWindow: function ($window) {
      if (!$window.hasClass('active')) {
        $('.simpus-window').removeClass('active');
        $window.addClass('active').css('z-index', ++this.zIndex);
        this.activeWindow = $window;
      }
    },

    // Generate unique ID
    generateId: function (prefix) {
      return prefix + '-' + Math.random().toString(36).substr(2, 9);
    }
  };

  // ============================================
  // MENU BAR PLUGIN
  // ============================================
  $.fn.simpusMenuBar = function (options) {
    const settings = $.extend({
      items: [],
      onSelect: null
    }, options);

    return this.each(function () {
      const $menuBar = $(this);

      const buildMenu = (items) => {
        let menuHtml = '';
        items.forEach(item => {
          if (item.divider) {
            menuHtml += '<div class="simpus-menu-divider"></div>';
          } else {
            const shortcut = item.shortcut ? `<span class="shortcut">${item.shortcut}</span>` : '';
            const hasSubmenu = item.submenu && item.submenu.length > 0;
            const itemClass = `simpus-menu-item ${item.disabled ? 'disabled' : ''} ${hasSubmenu ? 'has-submenu' : ''}`;

            menuHtml += `<div class="${itemClass}" data-action="${item.action || ''}">${item.label}${shortcut}`;
            if (hasSubmenu) {
              menuHtml += `<div class="simpus-menu-dropdown">${buildMenu(item.submenu)}</div>`;
            }
            menuHtml += '</div>';
          }
        });
        return menuHtml;
      };

      if (settings.items.length > 0) {
        let leftHtml = '<div class="simpus-menubar-left">';
        settings.items.forEach((item, index) => {
          const isLogo = index === 0;
          const itemClass = `simpus-menubar-item ${isLogo ? 'simpus-logo' : ''} ${index === 1 ? 'bold' : ''}`;
          leftHtml += `<span class="${itemClass}" data-menu="${item.id}">${item.label}</span>`;

          if (item.submenu) {
            const dropdownHtml = `<div class="simpus-menu-dropdown" id="menu-${item.id}">${buildMenu(item.submenu)}</div>`;
            $menuBar.append(dropdownHtml);
          }
        });
        leftHtml += '</div>';
        $menuBar.prepend(leftHtml);
        $menuBar.append('<div class="simpus-menubar-right"></div>');
      }

      $menuBar.on('mouseenter', '.simpus-menubar-item', function () {
        if ($menuBar.find('.simpus-menu-dropdown.show').length > 0) {
          $menuBar.find('.simpus-menubar-item').removeClass('active');
          $('.simpus-menu-dropdown').removeClass('show');
          $(this).addClass('active');
          const menuId = $(this).data('menu');
          $(`#menu-${menuId}`).addClass('show');
        }
      });

      $menuBar.on('click', '.simpus-menubar-item', function (e) {
        e.stopPropagation();
        const $item = $(this);
        const menuId = $item.data('menu');
        const $dropdown = $(`#menu-${menuId}`);

        const wasActive = $item.hasClass('active');

        $('.simpus-menu-dropdown').removeClass('show');
        $menuBar.find('.simpus-menubar-item').removeClass('active');

        if (!wasActive && $dropdown.length) {
          $item.addClass('active');
          $dropdown.addClass('show');
        }
      });

      $menuBar.on('click', '.simpus-menu-item', function (e) {
        e.stopPropagation();
        const $item = $(this);
        if ($item.hasClass('has-submenu') || $item.hasClass('disabled')) {
          return;
        }

        const action = $item.data('action');
        if (action && settings.onSelect) {
          settings.onSelect(null, action);
        }

        $menuBar.find('.simpus-menu-dropdown').removeClass('show');
        $menuBar.find('.simpus-menubar-item').removeClass('active');
      });

      $(document).on('click', function () {
        $menuBar.find('.simpus-menu-dropdown').removeClass('show');
        $menuBar.find('.simpus-menubar-item').removeClass('active');
      });
    });
  };

  // ============================================
  // DOCK PLUGIN
  // ============================================
  $.fn.simpusDock = function (options) {
    const settings = $.extend({
      items: [],
      position: 'bottom',
      magnification: true,
      onClick: null
    }, options);

    return this.each(function () {
      const $dock = $(this);
      $dock.addClass('simpus-dock');

      // Build dock items
      if (settings.items.length > 0) {
        let html = '';
        settings.items.forEach(item => {
          if (item.divider) {
            html += '<div class="simpus-dock-divider"></div>';
          } else {
            const activeClass = item.active ? ' active' : '';
            const tooltip = item.tooltip ? `<span class="tooltip">${item.tooltip}</span>` : '';
            html += `
              <div class="simpus-dock-item${activeClass}" data-app="${item.id}">
                ${item.icon || `<div style="background: ${item.color || '#16a085'}; width: 100%; height: 100%; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: white; font-size: 24px;">${item.label ? item.label[0] : 'A'}</div>`}
                ${tooltip}
              </div>
            `;
          }
        });
        $dock.html(html);
      }

      // Dock item click
      $dock.on('click', '.simpus-dock-item', function () {
        const appId = $(this).data('app');

        if (settings.onClick) {
          settings.onClick(appId, $(this));
        }

        // Bounce animation
        $(this).addClass('simpus-animate-bounce');
        setTimeout(() => $(this).removeClass('simpus-animate-bounce'), 500);
      });

      // Magnification effect
      if (settings.magnification) {
        $dock.on('mousemove', '.simpus-dock-item', function (e) {
          const $item = $(this);
          const rect = $item[0].getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const distance = Math.abs(e.clientX - centerX);
          const maxDistance = 80;
          const scale = Math.max(1, 1.5 - (distance / maxDistance) * 0.5);

          $item.css('transform', `scale(${scale}) translateY(-${(scale - 1) * 10}px)`);
        });

        $dock.on('mouseleave', '.simpus-dock-item', function () {
          $(this).css('transform', '');
        });
      }
    });
  };

  // ============================================
  // WINDOW PLUGIN
  // ============================================
  $.fn.simpusWindow = function (options) {
    const settings = $.extend({
      title: 'Untitled',
      width: 600,
      height: 400,
      x: null,
      y: null,
      minWidth: 300,
      minHeight: 200,
      resizable: true,
      draggable: true,
      closable: true,
      minimizable: true,
      maximizable: true,
      content: '',
      onClose: null,
      onMinimize: null,
      onMaximize: null,
      onFocus: null
    }, options);

    return this.each(function () {
      const $window = $(this);
      const windowId = SimpusUI.generateId('window');

      // Calculate initial position
      const initialX = settings.x !== null ? settings.x : ($(window).width() - settings.width) / 2 + (SimpusUI.windows.length * 20);
      const initialY = settings.y !== null ? settings.y : ($(window).height() - settings.height) / 2 + (SimpusUI.windows.length * 20);

      // Build window structure
      $window.addClass('simpus-window').attr('id', windowId).css({
        width: settings.width,
        height: settings.height,
        left: initialX,
        top: Math.max(28, initialY)
      });

      let titlebarHtml = '<div class="simpus-window-traffic-lights">';
      if (settings.closable) {
        titlebarHtml += '<span class="simpus-traffic-light close" data-action="close"></span>';
      } else {
        titlebarHtml += '<span class="simpus-traffic-light" style="background: #ccc; pointer-events: none;"></span>';
      }
      if (settings.minimizable) {
        titlebarHtml += '<span class="simpus-traffic-light minimize" data-action="minimize"></span>';
      } else {
        titlebarHtml += '<span class="simpus-traffic-light" style="background: #ccc; pointer-events: none;"></span>';
      }
      if (settings.maximizable) {
        titlebarHtml += '<span class="simpus-traffic-light maximize" data-action="maximize"></span>';
      } else {
        titlebarHtml += '<span class="simpus-traffic-light" style="background: #ccc; pointer-events: none;"></span>';
      }
      titlebarHtml += '</div>';

      const html = `
        <div class="simpus-window-titlebar">
          ${titlebarHtml}
          <span class="simpus-window-title">${settings.title}</span>
        </div>
        <div class="simpus-window-content">${settings.content}</div>
        ${settings.resizable ? '<div class="simpus-window-resize-handle"></div>' : ''}
      `;

      $window.html(html);

      // Add to window registry
      SimpusUI.windows.push($window);
      SimpusUI.focusWindow($window);

      // Draggable
      if (settings.draggable) {
        let isDragging = false;
        let dragOffsetX, dragOffsetY;

        $window.find('.simpus-window-titlebar').on('mousedown', function (e) {
          if ($(e.target).hasClass('simpus-traffic-light')) return;

          isDragging = true;
          dragOffsetX = e.clientX - $window.position().left;
          dragOffsetY = e.clientY - $window.position().top;
          $window.addClass('dragging');
        });

        $(document).on('mousemove', function (e) {
          if (!isDragging) return;

          let newX = e.clientX - dragOffsetX;
          let newY = e.clientY - dragOffsetY;

          // Keep within viewport
          newX = Math.max(0, Math.min(newX, $(window).width() - $window.width()));
          newY = Math.max(30, Math.min(newY, $(window).height() - $window.height()));

          $window.css({ left: newX, top: newY });
        });

        $(document).on('mouseup', function () {
          isDragging = false;
          $window.removeClass('dragging');
        });
      }

      // Resizable
      if (settings.resizable) {
        let isResizing = false;
        let startX, startY, startWidth, startHeight;

        $window.find('.simpus-window-resize-handle').on('mousedown', function (e) {
          isResizing = true;
          startX = e.clientX;
          startY = e.clientY;
          startWidth = $window.width();
          startHeight = $window.height();
          e.preventDefault();
        });

        $(document).on('mousemove', function (e) {
          if (!isResizing) return;

          const newWidth = Math.max(settings.minWidth, startWidth + (e.clientX - startX));
          const newHeight = Math.max(settings.minHeight, startHeight + (e.clientY - startY));

          $window.css({ width: newWidth, height: newHeight });
        });

        $(document).on('mouseup', function () {
          isResizing = false;
        });
      }

      // Traffic lights
      $window.on('click', '.simpus-traffic-light', function () {
        const action = $(this).data('action');

        switch (action) {
          case 'close':
            if (settings.onClose && settings.onClose($window) === false) return;
            $window.fadeOut(200, function () {
              $(this).remove();
              SimpusUI.windows = SimpusUI.windows.filter(w => w[0] !== $window[0]);
            });
            break;

          case 'minimize':
            if (settings.onMinimize && settings.onMinimize($window) === false) return;
            $window.addClass('minimized');
            break;

          case 'maximize':
            if (settings.onMaximize && settings.onMaximize($window) === false) return;
            $window.toggleClass('maximized');
            break;
        }
      });

      // API methods
      $window.data('simpusWindow', {
        setTitle: function (title) {
          $window.find('.simpus-window-title').text(title);
        },
        setContent: function (content) {
          $window.find('.simpus-window-content').html(content);
        },
        minimize: function () {
          $window.addClass('minimized');
        },
        maximize: function () {
          $window.addClass('maximized');
        },
        restore: function () {
          $window.removeClass('minimized maximized');
        },
        close: function () {
          $window.find('.simpus-traffic-light.close').trigger('click');
        },
        focus: function () {
          SimpusUI.focusWindow($window);
        }
      });
    });
  };

  // ============================================
  // CONTEXT MENU PLUGIN
  // ============================================
  $.fn.simpusContextMenu = function (options) {
    const settings = $.extend({
      items: [],
      onSelect: null
    }, options);

    return this.each(function () {
      const $element = $(this);
      const menuId = SimpusUI.generateId('context');

      // Build context menu
      let html = `<div class="simpus-context-menu" id="${menuId}">`;
      settings.items.forEach(item => {
        if (item.divider) {
          html += '<div class="simpus-menu-divider"></div>';
        } else {
          const disabled = item.disabled ? ' disabled' : '';
          const icon = item.icon ? `<span class="icon">${item.icon}</span>` : '';
          const shortcut = item.shortcut ? `<span class="shortcut">${item.shortcut}</span>` : '';
          html += `<div class="simpus-menu-item${disabled}" data-action="${item.action || ''}">${icon}${item.label}${shortcut}</div>`;
        }
      });
      html += '</div>';

      $('body').append(html);
      const $menu = $(`#${menuId}`);

      // Right click handler
      $element.on('contextmenu', function (e) {
        e.preventDefault();

        // Position menu
        let left = e.clientX;
        let top = e.clientY;

        // Keep within viewport
        if (left + $menu.outerWidth() > $(window).width()) {
          left = $(window).width() - $menu.outerWidth() - 10;
        }
        if (top + $menu.outerHeight() > $(window).height()) {
          top = $(window).height() - $menu.outerHeight() - 10;
        }

        $menu.css({ left, top }).addClass('show');
      });

      // Item click
      $menu.on('click', '.simpus-menu-item', function () {
        const action = $(this).data('action');

        if (settings.onSelect && action) {
          settings.onSelect(action, $(this));
        }

        $menu.removeClass('show');
      });
    });
  };

  // ============================================
  // MODAL PLUGIN
  // ============================================
  $.fn.simpusModal = function (options) {
    const settings = $.extend({
      title: '',
      subtitle: '',
      content: '',
      buttons: [
        { label: 'Cancel', type: 'secondary', action: 'cancel' },
        { label: 'OK', type: 'primary', action: 'ok' }
      ],
      closable: true,
      onAction: null,
      onClose: null
    }, options);

    return this.each(function () {
      const $trigger = $(this);

      $trigger.on('click', function () {
        const modalId = SimpusUI.generateId('modal');

        let buttonsHtml = '';
        settings.buttons.forEach(btn => {
          const typeClass = btn.type === 'primary' ? 'simpus-btn-primary' : 'simpus-btn-secondary';
          buttonsHtml += `<button class="simpus-btn ${typeClass}" data-action="${btn.action}">${btn.label}</button>`;
        });

        const html = `
          <div class="simpus-modal-overlay" id="${modalId}">
            <div class="simpus-modal">
              <div class="simpus-modal-header">
                ${settings.title ? `<div class="simpus-modal-title">${settings.title}</div>` : ''}
                ${settings.subtitle ? `<div class="simpus-modal-subtitle">${settings.subtitle}</div>` : ''}
              </div>
              <div class="simpus-modal-body">${settings.content}</div>
              <div class="simpus-modal-footer">${buttonsHtml}</div>
            </div>
          </div>
        `;

        $('body').append(html);
        const $overlay = $(`#${modalId}`);

        // Show animation
        setTimeout(() => $overlay.addClass('show'), 10);

        // Button actions
        $overlay.on('click', '.simpus-btn', function () {
          const action = $(this).data('action');

          if (settings.onAction) {
            if (settings.onAction(action, $overlay) !== false) {
              closeModal();
            }
          } else {
            closeModal();
          }
        });

        // Close on overlay click
        if (settings.closable) {
          $overlay.on('click', function (e) {
            if (e.target === this) {
              if (settings.onClose) settings.onClose();
              closeModal();
            }
          });
        }

        function closeModal() {
          $overlay.removeClass('show');
          setTimeout(() => $overlay.remove(), 300);
        }
      });
    });
  };

  // Static modal method
  $.simpusModal = function (options) {
    const settings = $.extend({
      title: '',
      subtitle: '',
      content: '',
      buttons: [
        { label: 'Cancel', type: 'secondary', action: 'cancel' },
        { label: 'OK', type: 'primary', action: 'ok' }
      ],
      type: null, // 'warning', 'error', 'success', 'info'
      onAction: null
    }, options);

    const modalId = SimpusUI.generateId('modal');

    let iconHtml = '';
    if (settings.type) {
      const icons = {
        warning: '⚠️',
        error: '✕',
        success: '✓',
        info: 'ℹ'
      };
      iconHtml = `<div class="simpus-alert-icon ${settings.type}">${icons[settings.type]}</div>`;
    }

    let buttonsHtml = '';
    settings.buttons.forEach(btn => {
      const typeClass = btn.type === 'primary' ? 'simpus-btn-primary' : 'simpus-btn-secondary';
      buttonsHtml += `<button class="simpus-btn ${typeClass}" data-action="${btn.action}">${btn.label}</button>`;
    });

    const html = `
      <div class="simpus-modal-overlay" id="${modalId}">
        <div class="simpus-modal">
          <div class="simpus-modal-header">
            ${iconHtml}
            ${settings.title ? `<div class="simpus-modal-title">${settings.title}</div>` : ''}
            ${settings.subtitle ? `<div class="simpus-modal-subtitle">${settings.subtitle}</div>` : ''}
          </div>
          <div class="simpus-modal-body">${settings.content}</div>
          <div class="simpus-modal-footer">${buttonsHtml}</div>
        </div>
      </div>
    `;

    $('body').append(html);
    const $overlay = $(`#${modalId}`);

    setTimeout(() => $overlay.addClass('show'), 10);

    $overlay.on('click', '.simpus-btn', function () {
      const action = $(this).data('action');

      if (settings.onAction) {
        if (settings.onAction(action, $overlay) !== false) {
          closeModal();
        }
      } else {
        closeModal();
      }
    });

    $overlay.on('click', function (e) {
      if (e.target === this) closeModal();
    });

    function closeModal() {
      $overlay.removeClass('show');
      setTimeout(() => $overlay.remove(), 300);
    }

    return {
      close: closeModal,
      element: $overlay
    };
  };

  // ============================================
  // TOOLTIP PLUGIN
  // ============================================
  $.fn.simpusTooltip = function (options) {
    const settings = $.extend({
      content: '',
      position: 'top', // top, bottom, left, right
      delay: 300
    }, options);

    return this.each(function () {
      const $element = $(this);
      const tooltipId = SimpusUI.generateId('tooltip');

      let showTimeout;

      $element.on('mouseenter', function () {
        showTimeout = setTimeout(() => {
          const html = `<div class="simpus-tooltip ${settings.position}" id="${tooltipId}">${settings.content || $element.attr('title') || ''}</div>`;
          $('body').append(html);

          const $tooltip = $(`#${tooltipId}`);
          const rect = $element[0].getBoundingClientRect();

          let left, top;
          switch (settings.position) {
            case 'top':
              left = rect.left + rect.width / 2 - $tooltip.outerWidth() / 2;
              top = rect.top - $tooltip.outerHeight() - 8;
              break;
            case 'bottom':
              left = rect.left + rect.width / 2 - $tooltip.outerWidth() / 2;
              top = rect.bottom + 8;
              break;
            case 'left':
              left = rect.left - $tooltip.outerWidth() - 8;
              top = rect.top + rect.height / 2 - $tooltip.outerHeight() / 2;
              break;
            case 'right':
              left = rect.right + 8;
              top = rect.top + rect.height / 2 - $tooltip.outerHeight() / 2;
              break;
          }

          $tooltip.css({ left, top }).addClass('show');
          $element.removeAttr('title');
        }, settings.delay);
      });

      $element.on('mouseleave', function () {
        clearTimeout(showTimeout);
        $(`#${tooltipId}`).remove();
      });
    });
  };

  // ============================================
  // SWITCH/TOGGLE PLUGIN
  // ============================================
  $.fn.simpusSwitch = function (options) {
    const settings = $.extend({
      checked: false,
      onChange: null
    }, options);

    return this.each(function () {
      const $element = $(this);
      const switchId = SimpusUI.generateId('switch');

      const html = `
        <div class="simpus-switch${settings.checked ? ' active' : ''}" id="${switchId}">
          <div class="simpus-switch-thumb"></div>
        </div>
      `;

      $element.html(html);
      const $switch = $element.find('.simpus-switch');

      $switch.on('click', function () {
        const isActive = $switch.toggleClass('active').hasClass('active');

        if (settings.onChange) {
          settings.onChange(isActive, $switch);
        }

        $element.trigger('change', [isActive]);
      });

      // API
      $element.data('simpusSwitch', {
        isChecked: function () {
          return $switch.hasClass('active');
        },
        setChecked: function (checked) {
          $switch.toggleClass('active', checked);
        },
        toggle: function () {
          $switch.toggleClass('active');
          return $switch.hasClass('active');
        }
      });
    });
  };

  // ============================================
  // SEGMENTED CONTROL PLUGIN
  // ============================================
  $.fn.simpusSegmented = function (options) {
    const settings = $.extend({
      items: [],
      selected: 0,
      onChange: null
    }, options);

    return this.each(function () {
      const $element = $(this);

      let html = '<div class="simpus-segmented">';
      settings.items.forEach((item, index) => {
        const activeClass = index === settings.selected ? ' active' : '';
        html += `<div class="simpus-segmented-item${activeClass}" data-index="${index}">${item}</div>`;
      });
      html += '</div>';

      $element.html(html);

      $element.on('click', '.simpus-segmented-item', function () {
        const index = $(this).data('index');

        $element.find('.simpus-segmented-item').removeClass('active');
        $(this).addClass('active');

        if (settings.onChange) {
          settings.onChange(index, settings.items[index]);
        }

        $element.trigger('change', [index, settings.items[index]]);
      });
    });
  };

  // ============================================
  // NOTIFICATION PLUGIN
  // ============================================
  $.simpusNotification = function (options) {
    const settings = $.extend({
      title: 'Notification',
      message: '',
      icon: '',
      duration: 5000,
      onClick: null
    }, options);

    const notifId = SimpusUI.generateId('notification');

    const html = `
      <div class="simpus-notification" id="${notifId}">
        <div class="simpus-notification-header">
          ${settings.icon ? `<div class="simpus-notification-icon">${settings.icon}</div>` : ''}
          <span class="simpus-notification-title">${settings.title}</span>
          <span class="simpus-notification-close">✕</span>
        </div>
        <div class="simpus-notification-body">${settings.message}</div>
      </div>
    `;

    $('body').append(html);
    const $notification = $(`#${notifId}`);

    setTimeout(() => $notification.addClass('show'), 10);

    // Auto hide
    const hideTimeout = setTimeout(() => hideNotification(), settings.duration);

    // Close button
    $notification.on('click', '.simpus-notification-close', function (e) {
      e.stopPropagation();
      clearTimeout(hideTimeout);
      hideNotification();
    });

    // Click handler
    if (settings.onClick) {
      $notification.on('click', function () {
        settings.onClick();
        hideNotification();
      });
    }

    function hideNotification() {
      $notification.removeClass('show');
      setTimeout(() => $notification.remove(), 300);
    }

    return {
      close: hideNotification,
      element: $notification
    };
  };

  // ============================================
  // FINDER PLUGIN
  // ============================================
  $.fn.simpusFinder = function (options) {
    const settings = $.extend({
      sidebar: [],
      files: [],
      onFileClick: null,
      onFileDoubleClick: null
    }, options);

    return this.each(function () {
      const $finder = $(this);
      $finder.addClass('simpus-finder');

      // Build sidebar
      let sidebarHtml = '<div class="simpus-finder-sidebar">';
      settings.sidebar.forEach(section => {
        sidebarHtml += `
          <div class="simpus-sidebar-section">
            <div class="simpus-sidebar-title">${section.title}</div>
        `;
        section.items.forEach(item => {
          const activeClass = item.active ? ' active' : '';
          sidebarHtml += `
            <div class="simpus-sidebar-item${activeClass}" data-path="${item.path}">
              ${item.icon || ''}
              <span>${item.label}</span>
            </div>
          `;
        });
        sidebarHtml += '</div>';
      });
      sidebarHtml += '</div>';

      // Build content
      const contentHtml = `
        <div class="simpus-finder-content">
          <div class="simpus-finder-toolbar">
            <div class="simpus-finder-path">
              <span>Hard Drive</span>
              <span>›</span>
              <span>Users</span>
              <span>›</span>
              <span>Documents</span>
            </div>
            <div class="simpus-segmented">
              <div class="simpus-segmented-item active">Icons</div>
              <div class="simpus-segmented-item">List</div>
              <div class="simpus-segmented-item">Columns</div>
            </div>
          </div>
          <div class="simpus-finder-view">
            <div class="simpus-file-grid"></div>
          </div>
        </div>
      `;

      $finder.html(sidebarHtml + contentHtml);

      // Render files
      const $grid = $finder.find('.simpus-file-grid');

      function renderFiles(files) {
        $grid.empty();
        files.forEach(file => {
          const html = `
            <div class="simpus-file-item" data-file="${file.name}">
              <div class="simpus-file-icon">${file.icon || '📄'}</div>
              <div class="simpus-file-name">${file.name}</div>
            </div>
          `;
          $grid.append(html);
        });
      }

      renderFiles(settings.files);

      // File click handlers
      $finder.on('click', '.simpus-file-item', function (e) {
        $finder.find('.simpus-file-item').removeClass('selected');
        $(this).addClass('selected');

        if (settings.onFileClick) {
          settings.onFileClick($(this).data('file'), $(this));
        }
      });

      $finder.on('dblclick', '.simpus-file-item', function () {
        if (settings.onFileDoubleClick) {
          settings.onFileDoubleClick($(this).data('file'), $(this));
        }
      });

      // Sidebar navigation
      $finder.on('click', '.simpus-sidebar-item', function () {
        $finder.find('.simpus-sidebar-item').removeClass('active');
        $(this).addClass('active');
      });

      // API
      $finder.data('simpusFinder', {
        setFiles: function (files) {
          renderFiles(files);
        },
        getSelected: function () {
          return $finder.find('.simpus-file-item.selected').data('file');
        }
      });
    });
  };

  // ============================================
  // DESKTOP ICONS PLUGIN
  // ============================================
  $.fn.simpusDesktopIcons = function (options) {
    const settings = $.extend({
      icons: [],
      onClick: null,
      onDoubleClick: null
    }, options);

    return this.each(function () {
      const $desktop = $(this);
      $desktop.addClass('simpus-desktop-icons');

      // Build icons
      settings.icons.forEach(icon => {
        const html = `
          <div class="simpus-desktop-icon" data-icon="${icon.id}">
            <div class="simpus-desktop-icon-img">${icon.image || icon.icon || '📄'}</div>
            <div class="simpus-desktop-label">${icon.label}</div>
          </div>
        `;
        $desktop.append(html);
      });

      // Click handlers
      $desktop.on('click', '.simpus-desktop-icon', function (e) {
        e.stopPropagation();
        $desktop.find('.simpus-desktop-icon').removeClass('selected');
        $(this).addClass('selected');

        if (settings.onClick) {
          settings.onClick($(this).data('icon'), $(this));
        }
      });

      $desktop.on('dblclick', '.simpus-desktop-icon', function () {
        if (settings.onDoubleClick) {
          settings.onDoubleClick($(this).data('icon'), $(this));
        }
      });

      // Deselect on desktop click
      $desktop.on('click', function (e) {
        if (e.target === this) {
          $desktop.find('.simpus-desktop-icon').removeClass('selected');
        }
      });
    });
  };

  // ============================================
  // TABS PLUGIN
  // ============================================
  $.fn.simpusTabs = function (options) {
    const settings = $.extend({
      onSelect: null
    }, options);

    return this.each(function () {
      const $container = $(this);
      const $nav = $container.find('.simpus-tabs-nav');
      const $contentPanels = $container.find('.simpus-tab-pane');

      // Hide all content panels except the first active one
      $contentPanels.hide();
      const activeTab = $nav.find('li.active');
      if (activeTab.length) {
        $(activeTab.find('a').attr('href')).show();
      } else {
        $nav.find('li:first').addClass('active');
        $contentPanels.first().show();
      }

      $nav.on('click', 'a', function (e) {
        e.preventDefault();

        const $link = $(this);
        const $li = $link.parent('li');
        const targetId = $link.attr('href');

        if ($li.hasClass('active')) {
          return;
        }

        // Update nav
        $li.addClass('active').siblings().removeClass('active');

        // Update content
        $contentPanels.hide();
        $(targetId).show();

        if (settings.onSelect) {
          settings.onSelect(targetId);
        }
      });
    });
  };

  // ============================================
  // AUTOCOMPLETE PLUGIN
  // ============================================
  $.fn.simpusAutocomplete = function (options) {
    const settings = $.extend({
      source: [], // Array of strings or objects {label, value}
      onSelect: null
    }, options);

    return this.each(function () {
      const $input = $(this);
      const wrapperId = SimpusUI.generateId('autocomplete');

      $input.wrap(`<div class="simpus-autocomplete-wrapper" id="${wrapperId}"></div>`);
      const $wrapper = $input.parent();

      $wrapper.append('<div class="simpus-autocomplete-dropdown"></div>');
      const $dropdown = $wrapper.find('.simpus-autocomplete-dropdown');

      let focusedIndex = -1;

      $input.on('input', function () {
        const query = $input.val().toLowerCase();
        if (query.length === 0) {
          $dropdown.removeClass('show').empty();
          return;
        }

        const matches = settings.source.filter(item => {
          const label = typeof item === 'string' ? item : item.label;
          return label.toLowerCase().includes(query);
        });

        if (matches.length > 0) {
          let html = '';
          matches.forEach((item, index) => {
            const label = typeof item === 'string' ? item : item.label;
            const value = typeof item === 'string' ? item : item.value;
            // Highlight match
            const highlightedLabel = label.replace(new RegExp(`(${query})`, 'gi'), '<strong>$1</strong>');
            html += `<div class="simpus-autocomplete-item" data-index="${index}" data-value="${value}">${highlightedLabel}</div>`;
          });
          $dropdown.html(html).addClass('show');
          focusedIndex = -1;
        } else {
          $dropdown.removeClass('show').empty();
        }
      });

      // Keyboard navigation
      $input.on('keydown', function (e) {
        if (!$dropdown.hasClass('show')) return;

        const $items = $dropdown.find('.simpus-autocomplete-item');

        switch (e.key) {
          case 'ArrowDown':
            e.preventDefault();
            focusedIndex = Math.min(focusedIndex + 1, $items.length - 1);
            updateFocus($items);
            break;
          case 'ArrowUp':
            e.preventDefault();
            focusedIndex = Math.max(focusedIndex - 1, 0);
            updateFocus($items);
            break;
          case 'Enter':
            e.preventDefault();
            if (focusedIndex >= 0) {
              $items.eq(focusedIndex).trigger('click');
            }
            break;
          case 'Escape':
            $dropdown.removeClass('show');
            break;
        }
      });

      function updateFocus($items) {
        $items.removeClass('active');
        if (focusedIndex >= 0) {
          const $item = $items.eq(focusedIndex);
          $item.addClass('active');

          // Scroll into view
          const dropdownHeight = $dropdown.height();
          const itemTop = $item.position().top;
          const itemHeight = $item.outerHeight();
          const scrollTop = $dropdown.scrollTop();

          if (itemTop + itemHeight > dropdownHeight) {
            $dropdown.scrollTop(scrollTop + (itemTop + itemHeight - dropdownHeight));
          } else if (itemTop < 0) {
            $dropdown.scrollTop(scrollTop + itemTop);
          }
        }
      }

      $dropdown.on('click', '.simpus-autocomplete-item', function () {
        const value = $(this).text(); // Use text for input value to avoid HTML tags
        const dataValue = $(this).data('value');

        $input.val(value);
        $dropdown.removeClass('show');

        if (settings.onSelect) {
          settings.onSelect(dataValue, value);
        }
      });

      $(document).on('click', function (e) {
        if (!$(e.target).closest($wrapper).length) {
          $dropdown.removeClass('show');
        }
      });
    });
  };

  // ============================================
  // SEARCHABLE SELECT PLUGIN
  // ============================================
  $.fn.simpusSelect = function (options) {
    const settings = $.extend({
      placeholder: 'Select...',
      searchPlaceholder: 'Search...',
      onChange: null
    }, options);

    return this.each(function () {
      const $select = $(this);
      $select.hide(); // Hide original select

      const wrapperId = SimpusUI.generateId('select');
      const optionsData = [];

      $select.find('option').each(function () {
        optionsData.push({
          value: $(this).val(),
          label: $(this).text(),
          selected: $(this).is(':selected')
        });
      });

      const initialLabel = optionsData.find(o => o.selected)?.label || settings.placeholder;

      const html = `
        <div class="simpus-select-wrapper" id="${wrapperId}">
          <div class="simpus-select-trigger" tabindex="0">
            <span>${initialLabel}</span>
          </div>
          <div class="simpus-select-dropdown">
            <input type="text" class="simpus-select-search" placeholder="${settings.searchPlaceholder}">
            <div class="simpus-select-options"></div>
          </div>
        </div>
      `;

      $select.after(html);
      const $wrapper = $select.next('.simpus-select-wrapper');
      const $trigger = $wrapper.find('.simpus-select-trigger');
      const $dropdown = $wrapper.find('.simpus-select-dropdown');
      const $searchInput = $wrapper.find('.simpus-select-search');
      const $optionsContainer = $wrapper.find('.simpus-select-options');

      function renderOptions(filter = '') {
        let optionsHtml = '';
        const lowerFilter = filter.toLowerCase();

        optionsData.forEach(opt => {
          if (opt.label.toLowerCase().includes(lowerFilter)) {
            const isSelected = $select.val() === opt.value;
            optionsHtml += `<div class="simpus-select-option${isSelected ? ' selected' : ''}" data-value="${opt.value}">${opt.label}</div>`;
          }
        });

        if (optionsHtml === '') {
          optionsHtml = '<div style="padding: 8px; color: var(--simpus-text-tertiary); font-size: 12px; text-align: center;">No results found</div>';
        }

        $optionsContainer.html(optionsHtml);
      }

      $trigger.on('click', function () {
        $dropdown.toggleClass('show');
        if ($dropdown.hasClass('show')) {
          $searchInput.val('').focus();
          renderOptions();
        }
      });

      $searchInput.on('input', function () {
        renderOptions($(this).val());
      });

      // Prevent closing when clicking search
      $searchInput.on('click', function (e) {
        e.stopPropagation();
      });

      $optionsContainer.on('click', '.simpus-select-option', function () {
        const value = $(this).data('value');
        const label = $(this).text();

        $select.val(value).trigger('change');
        $trigger.find('span').text(label);
        $dropdown.removeClass('show');

        if (settings.onChange) {
          settings.onChange(value, label);
        }
      });

      $(document).on('click', function (e) {
        if (!$(e.target).closest($wrapper).length) {
          $dropdown.removeClass('show');
        }
      });
    });
  };

  // ============================================
  // INITIALIZE
  // ============================================
  $(document).ready(function () {
    SimpusUI.init();
  });

})(jQuery);
