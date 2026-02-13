(function () {
  new Vue({
    el: '#desktop-app',
    data: {
      simpusLogo: '<img src="img/ui-brand-logo.png" alt="Branding Logo" style="height: 20px;">'
    },
    methods: {
      updateClock: function () {
        const now = new Date();
        const options = { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', hour12: false };
        const timeString = now.toLocaleString('en-GB', options).replace(',', '');
        $('#desktop-clock').text(timeString);
      },

      initMenuBar: function () {
        const self = this;
        $('#menubar').simpusMenuBar({
          items: [
            {
              id: 'logo', label: this.simpusLogo, submenu: [
                { label: 'About macOS Web', action: 'about' }
              ]
            },
            {
              id: 'file', label: 'File', submenu: [
                { label: 'New Window', shortcut: 'Ctrl+N', action: 'new-window' },
                {
                  label: 'Open Recent',
                  submenu: [
                    { label: 'patient-records.csv', action: 'open-file-1' },
                    { label: 'monthly-report.pdf', action: 'open-file-2' },
                    {
                      label: 'Archives',
                      submenu: [
                        { label: '2023-archive.zip', action: 'open-archive-1' },
                        { label: '2022-archive.zip', action: 'open-archive-2' },
                      ]
                    }
                  ]
                },
                { divider: true },
                { label: 'Close', shortcut: 'Ctrl+W', action: 'close' }
              ]
            },
            {
              id: 'edit', label: 'Edit', submenu: [
                { label: 'Cut', action: 'cut' },
                { label: 'Copy', action: 'copy' },
                { label: 'Paste', action: 'paste' }
              ]
            },
            {
              id: 'view', label: 'View', submenu: [
                { label: 'Toggle Theme', action: 'toggle-theme' },
                { label: 'Change Background', action: 'change-bg' },
              ]
            },
            {
              id: 'window', label: 'Window', submenu: [
                { label: 'Minimize', action: 'minimize' },
                { label: 'Zoom', action: 'zoom' }
              ]
            },
            {
              id: 'components', label: 'Components', submenu: [
                { label: 'Open Component Showcase', action: 'show-all-components' },
                { divider: true },
                {
                  label: 'Layouts',
                  submenu: [
                    { label: 'Grid System', action: 'layout-grid' },
                    {
                      label: 'Containers',
                      submenu: [
                        { label: 'Fluid Container', action: 'container-fluid' },
                        { label: 'Fixed Container', action: 'container-fixed' }
                      ]
                    }
                  ]
                },
                {
                  label: 'Forms',
                  submenu: [
                    { label: 'Inputs', action: 'show-inputs' },
                    { label: 'Selects', action: 'show-selects' },
                    {
                      label: 'Advanced',
                      submenu: [
                        { label: 'Datepicker', action: 'show-datepicker' },
                        { label: 'Rich Text', action: 'show-richtext' }
                      ]
                    }
                  ]
                },
                { divider: true },
                { label: 'Data Table Example', action: 'show-table' },
                { label: 'Tabs Example', action: 'show-tabs' },
                { divider: true },
                { label: 'Icon System', action: 'show-icons' }
              ]
            }
          ],
          onSelect: function (menu, action) {
            self.handleMenuAction(action);
          }
        });

        // Add Theme Toggle
        const $themeToggle = $('<div class="simpus-menubar-item" title="Toggle Theme"><i class="bi bi-moon-stars"></i></div>');
        $themeToggle.on('click', function () {
          SimpusUI.toggleTheme();
        });
        $('.simpus-menubar-right').append($themeToggle);

        // Add Clock
        const $clock = $('<div class="simpus-menubar-item" id="desktop-clock" style="font-feature-settings: &quot;tnum&quot;; font-variant-numeric: tabular-nums; cursor: default;"></div>');
        $('.simpus-menubar-right').append($clock);
      },

      initDock: function () {
        const self = this;
        $('#dock').simpusDock({
          items: [
            { id: 'finder', icon: '<div class="app-icon app-finder"><i class="bi bi-folder2-open"></i></div>', tooltip: 'File Explorer' },
            { id: 'settings', icon: '<div class="app-icon app-settings"><i class="bi bi-gear-fill"></i></div>', tooltip: 'Settings' },
            { id: 'terminal', icon: '<div class="app-icon app-terminal"><i class="bi bi-terminal-fill"></i></div>', tooltip: 'Terminal' },
            { id: 'calculator', icon: '<div class="app-icon app-calculator"><i class="bi bi-calculator-fill"></i></div>', tooltip: 'Calculator' },
            { divider: true },
            { id: 'trash', icon: '<div class="app-icon app-trash"><i class="bi bi-trash-fill"></i></div>', tooltip: 'Trash' }
          ],
          onClick: function (appId, $item) {
            self.handleDockClick(appId, $item);
          }
        });
      },

      initDesktopIcons: function () {
        const self = this;
        $('#desktop-icons').simpusDesktopIcons({
          icons: [
            { id: 'documents', label: 'Documents', icon: '<i class="bi bi-folder-fill"></i>' },
            { id: 'disk', label: 'Hard Drive', icon: '<i class="bi bi-hdd-fill"></i>' }
          ],
          onDoubleClick: (iconId) => self.createNewWindow(`Explorer: ${iconId}`)
        });
      },

      handleMenuAction: function (action) {
        if (!action) return;
        const $activeWindow = SimpusUI.activeWindow;
        switch (action) {
          case 'about': this.showAboutWindow(); break;
          case 'new-window': this.createNewWindow('New Window'); break;
          case 'toggle-theme': SimpusUI.toggleTheme(); break;
          case 'change-bg': this.changeWallpaper(); break;
          case 'minimize': $activeWindow?.data('simpusWindow')?.minimize(); break;
          case 'zoom': $activeWindow?.data('simpusWindow')?.maximize(); break;
          case 'close': $activeWindow?.data('simpusWindow')?.close(); break;
          case 'show-all-components': this.createComponentsWindow(); break;
          case 'show-table': this.createTableWindow(); break;
          case 'show-tabs': this.createTabsWindow(); break;
          case 'show-icons': this.createIconsWindow(); break;
          default: $.simpusNotification({ title: 'Action', message: `Action '${action}' triggered.` });
        }
      },

      handleDockClick: function (appId, $item) {
        switch (appId) {
          case 'finder': this.createFinderWindow(); break;
          case 'settings': this.createComponentsWindow(); break;
          default: $.simpusNotification({ title: 'Dock', message: `Launched "${appId}"`, icon: $item.find('.app-icon').html() });
        }
      },

      createIconsWindow: function () {
        $('<div></div>').simpusWindow({
          title: 'Icon System',
          width: 900,
          height: 600,
          content: '<iframe src="app/icons/index.html" style="width:100%; height:100%; border:none;"></iframe>'
        }).appendTo('#windows-container');
      },

      createFinderWindow: function () {
        const $window = $('<div></div>').simpusWindow({
          title: 'Finder',
          width: 800,
          height: 500,
          content: '<div id="finder-app"></div>'
        }).appendTo('#windows-container');

        $window.find('#finder-app').simpusFinder({
          sidebar: [
            {
              title: 'Favorites',
              items: [
                { label: 'AirDrop', path: 'airdrop', icon: '<i class="bi bi-broadcast"></i>' },
                { label: 'Recents', path: 'recents', icon: '<i class="bi bi-clock"></i>' },
                { label: 'Applications', path: 'applications', icon: '<i class="bi bi-grid"></i>' },
                { label: 'Desktop', path: 'desktop', icon: '<i class="bi bi-display"></i>', active: true },
                { label: 'Documents', path: 'documents', icon: '<i class="bi bi-file-earmark-text"></i>' },
                { label: 'Downloads', path: 'downloads', icon: '<i class="bi bi-arrow-down-circle"></i>' }
              ]
            },
            {
              title: 'iCloud',
              items: [
                { label: 'iCloud Drive', path: 'icloud', icon: '<i class="bi bi-cloud"></i>' }
              ]
            },
            {
              title: 'Locations',
              items: [
                { label: 'Macintosh HD', path: 'disk', icon: '<i class="bi bi-hdd"></i>' },
                { label: 'Network', path: 'network', icon: '<i class="bi bi-hdd-network"></i>' }
              ]
            }
          ],
          files: [
            { name: 'Project Proposal.pdf', icon: '<i class="bi bi-file-earmark-pdf" style="color: #e74c3c;"></i>' },
            { name: 'Budget 2024.xlsx', icon: '<i class="bi bi-file-earmark-spreadsheet" style="color: #27ae60;"></i>' },
            { name: 'Notes.txt', icon: '<i class="bi bi-file-earmark-text" style="color: #95a5a6;"></i>' },
            { name: 'Design Assets', icon: '<i class="bi bi-folder-fill" style="color: #3498db;"></i>' },
            { name: 'Screenshots', icon: '<i class="bi bi-folder-fill" style="color: #3498db;"></i>' },
            { name: 'logo.png', icon: '<i class="bi bi-file-earmark-image" style="color: #8e44ad;"></i>' },
            { name: 'index.html', icon: '<i class="bi bi-file-earmark-code" style="color: #e67e22;"></i>' },
            { name: 'styles.css', icon: '<i class="bi bi-file-earmark-code" style="color: #3498db;"></i>' }
          ],
          onFileDoubleClick: function (filename) {
            if (filename.includes('.')) {
              $.simpusNotification({ title: 'Opening File', message: `Opening ${filename}...` });
            } else {
              $.simpusNotification({ title: 'Folder', message: `Entering ${filename}` });
            }
          }
        });
      },

      createNewWindow: function (title = 'Untitled') {
        $('<div></div>').simpusWindow({
          title: title,
          width: 450 + Math.random() * 200,
          height: 300 + Math.random() * 150,
          content: '<p style="padding: 1rem;">This is a new window.</p>'
        }).appendTo('#windows-container');
      },

      createWelcomeWindow: function () {
        this.createNewWindow('Welcome to macOS Web');
      },

      changeWallpaper: function () {
        $.simpusNotification({ title: 'Wallpaper', message: 'Wallpaper updated to default.' });
        $('#desktop-app').css('background-image', "url('img/walpaper.jpeg')");
      },

      createComponentsWindow: function () {
        const content = `
          <div style="padding: 20px;">
            <h3>Component Showcase</h3>
            <p>Welcome to Simpus UI components demonstration.</p>
            <hr>
            <h4>Buttons</h4>
            <button class="simpus-btn simpus-btn-primary">Primary</button>
            <button class="simpus-btn simpus-btn-secondary">Secondary</button>
            <br><br>
            <h4>Inputs</h4>
            <input type="text" class="simpus-input" placeholder="Type something...">
            <br><br>
            <h4>Switch</h4>
            <div id="demo-switch"></div>
          </div>
        `;

        const $window = $('<div></div>').simpusWindow({
          title: 'Component Showcase',
          width: 500,
          height: 400,
          content: content
        }).appendTo('#windows-container');

        // Initialize components inside the window
        $window.find('#demo-switch').simpusSwitch({ checked: true });
      },

      showAboutWindow: function () {
        const content = `
          <div style="text-align: center; padding: 20px;">
            <img src="img/ui-icon.png" style="width: 64px; margin-bottom: 10px;">
            <h3>macOS Web</h3>
            <p>Version 1.0.0</p>
            <p>Built with SimpusUI & Vue.js</p>
            <br>
            <p class="text-muted">&copy; 2024 Abworks</p>
          </div>
        `;
        $('<div></div>').simpusWindow({
          title: 'About macOS Web',
          width: 300,
          height: 250,
          content: content,
          minimizable: false,
          maximizable: false
        }).appendTo('#windows-container');
      },

      createTableWindow: function () {
        const content = `
          <div style="padding: 10px;">
             <table class="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>1</td><td>John Doe</td><td>Developer</td><td><span class="badge badge-success">Active</span></td></tr>
                <tr><td>2</td><td>Jane Smith</td><td>Designer</td><td><span class="badge badge-warning">Away</span></td></tr>
                <tr><td>3</td><td>Bob Johnson</td><td>Manager</td><td><span class="badge badge-danger">Offline</span></td></tr>
              </tbody>
             </table>
          </div>
        `;
        $('<div></div>').simpusWindow({
          title: 'Data Table Example',
          width: 500,
          height: 300,
          content: content
        }).appendTo('#windows-container');
      },

      createTabsWindow: function () {
        const content = `
          <div style="padding: 10px;">
            <ul class="nav nav-tabs">
              <li class="active"><a href="#tab1" data-toggle="tab">Home</a></li>
              <li><a href="#tab2" data-toggle="tab">Profile</a></li>
              <li><a href="#tab3" data-toggle="tab">Messages</a></li>
            </ul>
            <div class="tab-content" style="padding: 10px; border: 1px solid #ddd; border-top: 0; background: #fff;">
              <div class="tab-pane active" id="tab1">
                <h4>Home Tab</h4>
                <p>Welcome to the home tab content.</p>
              </div>
              <div class="tab-pane" id="tab2">
                <h4>Profile Tab</h4>
                <p>User profile information goes here.</p>
              </div>
              <div class="tab-pane" id="tab3">
                <h4>Messages Tab</h4>
                <p>You have 0 new messages.</p>
              </div>
            </div>
          </div>
        `;
        $('<div></div>').simpusWindow({
          title: 'Tabs Example',
          width: 400,
          height: 300,
          content: content
        }).appendTo('#windows-container');
      }
    },
    mounted: function () {
      // Initialize UI Plugins
      this.initMenuBar();
      this.initDock();
      this.initDesktopIcons();

      // Start Clock
      this.updateClock();
      setInterval(this.updateClock, 1000);

      // Welcome
      setTimeout(() => this.createWelcomeWindow(), 500);
    }
  });
})();
