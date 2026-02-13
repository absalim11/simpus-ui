(function () {
    // Register Components (Will be moved to separate files later ideally, but for now defining inline or loading)

    // Placeholder components for routing
    const EmptyComponent = { template: '<div><h3>Coming Soon</h3><p>This component is under construction.</p></div>' };

    // Main Vue App
    new Vue({
        el: '#components-app',
        data: {
            currentView: 'button',
            menuItems: [
                { id: 'button', label: 'Button' },
                { id: 'input', label: 'Input' },
                { id: 'card', label: 'Card' },
                { id: 'checkbox', label: 'Checkbox' },
                { id: 'radio', label: 'Radio Group' },
                { id: 'switch', label: 'Switch' },
                { id: 'combobox', label: 'Combobox' },
                { id: 'modal', label: 'Modal / Dialog' },
                { id: 'toast', label: 'Toast' },
                { id: 'skeleton', label: 'Skeleton' },
                { id: 'table', label: 'Table' },
                { id: 'tabs', label: 'Tabs' },
                { id: 'alert', label: 'Alert' },
                { id: 'confirm', label: 'Confirm Dialog' },
                { id: 'autocomplete', label: 'Input Autocomplete' },
                { id: 'dynamic-select', label: 'Dynamic Select' },
                { id: 'login', label: 'Login Page' }
            ]
        },
        computed: {
            currentViewComponent: function () {
                // Dynamically return component definition based on currentView
                // For now, we'll use a global registration approach or defined objects
                const viewName = 'comp-' + this.currentView;
                if (Vue.options.components[viewName]) {
                    return viewName;
                }
                return EmptyComponent;
            }
        },
        mounted: function () {
            console.log('Components Module Mounted');
        }
    });

    // --- Component Definitions (Temporary, will separate if grows too large) ---

    // 1. BUTTON
    Vue.component('comp-button', {
        template: `
        <div>
            <h1>Button</h1>
            <p>Displays a button or a component that looks like a button.</p>

            <div class="card-base mb-4">
                <div class="card-header"><h3 class="card-title">Usage</h3></div>
                <div class="card-content">
                    <pre style="background: #f1f5f9; padding: 1rem; border-radius: 6px; overflow-x: auto;">&lt;button class="btn-base btn-primary"&gt;Primary&lt;/button&gt;
&lt;button class="btn-base btn-secondary"&gt;Secondary&lt;/button&gt;
&lt;button class="btn-base btn-destructive"&gt;Destructive&lt;/button&gt;</pre>
                </div>
            </div>
            
            <div class="preview-container">
                <div class="flex gap-4 items-center flex-wrap">
                    <button class="btn-base btn-primary">Primary</button>
                    <button class="btn-base btn-secondary">Secondary</button>
                    <button class="btn-base btn-destructive">Destructive</button>
                    <button class="btn-base btn-outline">Outline</button>
                    <button class="btn-base btn-ghost">Ghost</button>
                    <button class="btn-base btn-link">Link</button>
                </div>
            </div>
            
            <h2>Sizes</h2>
            <div class="preview-container">
                <div class="flex gap-4 items-center">
                    <button class="btn-base btn-primary btn-sm">Small</button>
                    <button class="btn-base btn-primary">Default</button>
                    <button class="btn-base btn-primary btn-lg">Large</button>
                </div>
            </div>

             <h2>Loading</h2>
            <div class="preview-container">
                <div class="flex gap-4 items-center">
                    <button class="btn-base btn-primary" disabled>
                        <i class="fa fa-spinner fa-spin" style="margin-right: 8px;"></i> Please wait
                    </button>
                </div>
            </div>
        </div>
        `
    });

    // 2. INPUT
    Vue.component('comp-input', {
        template: `
        <div>
            <h1>Input</h1>
            <p>Displays a form input field or a component that looks like an input field.</p>

            <div class="card-base mb-4">
                <div class="card-header"><h3 class="card-title">Usage</h3></div>
                <div class="card-content">
                    <pre style="background: #f1f5f9; padding: 1rem; border-radius: 6px; overflow-x: auto;">&lt;div class="form-group"&gt;
  &lt;label class="form-label"&gt;Email&lt;/label&gt;
  &lt;input type="email" class="input-base" placeholder="Email"&gt;
&lt;/div&gt;</pre>
                </div>
            </div>
            
            <div class="preview-container">
                <div class="flex flex-col gap-4" style="width: 100%; max-width: 400px;">
                    <div class="form-group">
                        <label class="form-label">Email</label>
                        <input type="email" class="input-base" placeholder="Email">
                    </div>
                     <div class="form-group">
                        <label class="form-label">File</label>
                        <input type="file" class="input-base">
                    </div>
                     <div class="form-group">
                        <label class="form-label">Disabled</label>
                        <input type="text" class="input-base" disabled placeholder="Disabled">
                    </div>
                     <div class="form-group">
                        <label class="form-label">With Button</label>
                        <div class="flex gap-2">
                            <input type="text" class="input-base" placeholder="Search...">
                            <button class="btn-base btn-primary">Search</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `
    });

    // 3. CHECKBOX
    Vue.component('comp-checkbox', {
        template: `
        <div>
            <h1>Checkbox</h1>
            <p>A control that allows the user to make a binary choice.</p>

            <div class="card-base mb-4">
                <div class="card-header"><h3 class="card-title">Usage</h3></div>
                <div class="card-content">
                    <pre style="background: #f1f5f9; padding: 1rem; border-radius: 6px; overflow-x: auto;">&lt;label class="checkbox-container"&gt;
  &lt;input type="checkbox" checked&gt;
  &lt;span class="checkmark"&gt;&lt;/span&gt;
  Label Text
&lt;/label&gt;</pre>
                </div>
            </div>
            
            <div class="preview-container">
                <div class="flex flex-col gap-4">
                     <label class="checkbox-container">
                        <input type="checkbox" checked>
                        <span class="checkmark"></span>
                        Accept terms and conditions
                    </label>
                     <label class="checkbox-container">
                        <input type="checkbox">
                        <span class="checkmark"></span>
                        Subscribe to newsletter
                    </label>
                </div>
            </div>
        </div>
        `
    });

    // 4. RADIO
    Vue.component('comp-radio', {
        template: `
        <div>
            <h1>Radio Group</h1>
            <p>A set of checkable buttons—known as radio buttons—where no more than one of the buttons can be checked at a time.</p>

            <div class="card-base mb-4">
                <div class="card-header"><h3 class="card-title">Usage</h3></div>
                <div class="card-content">
                    <pre style="background: #f1f5f9; padding: 1rem; border-radius: 6px; overflow-x: auto;">&lt;label class="radio-container"&gt;
  &lt;input type="radio" name="group1"&gt;
  &lt;span class="radio-checkmark"&gt;&lt;/span&gt;
  Option 1
&lt;/label&gt;</pre>
                </div>
            </div>
            
            <div class="preview-container">
                <div class="flex flex-col gap-4">
                     <label class="radio-container">
                        <input type="radio" name="radio" checked>
                        <span class="radio-checkmark"></span>
                        Default
                    </label>
                     <label class="radio-container">
                        <input type="radio" name="radio">
                        <span class="radio-checkmark"></span>
                        Comfortable
                    </label>
                     <label class="radio-container">
                        <input type="radio" name="radio">
                        <span class="radio-checkmark"></span>
                        Compact
                    </label>
                </div>
            </div>
        </div>
        `
    });

    // 5. SWITCH
    Vue.component('comp-switch', {
        data: function () { return { isChecked: false } },
        template: `
        <div>
            <h1>Switch</h1>
            <p>A control that allows the user to toggle between checked and not checked.</p>

            <div class="card-base mb-4">
                <div class="card-header"><h3 class="card-title">Usage</h3></div>
                <div class="card-content">
                    <pre style="background: #f1f5f9; padding: 1rem; border-radius: 6px; overflow-x: auto;">&lt;label class="switch"&gt;
  &lt;input type="checkbox" v-model="val"&gt;
  &lt;span class="slider round"&gt;&lt;/span&gt;
&lt;/label&gt;</pre>
                </div>
            </div>
            
            <div class="preview-container">
                <div class="flex items-center gap-4">
                     <label class="switch">
                        <input type="checkbox" v-model="isChecked">
                        <span class="slider round"></span>
                    </label>
                    <span>{{ isChecked ? 'Airplane Mode On' : 'Airplane Mode Off' }}</span>
                </div>
            </div>
        </div>
        `
    });

    // 6. CARD
    Vue.component('comp-card', {
        template: `
        <div>
            <h1>Card</h1>
            <p>Displays a card with header, content, and footer.</p>

            <div class="card-base mb-4">
                <div class="card-header"><h3 class="card-title">Usage</h3></div>
                <div class="card-content">
                     <pre style="background: #f1f5f9; padding: 1rem; border-radius: 6px; overflow-x: auto;">&lt;div class="card-base"&gt;
  &lt;div class="card-header"&gt;
    &lt;h3 class="card-title"&gt;Title&lt;/h3&gt;
    &lt;p class="card-description"&gt;Desc&lt;/p&gt;
  &lt;/div&gt;
  &lt;div class="card-content"&gt;...&lt;/div&gt;
  &lt;div class="card-footer"&gt;...&lt;/div&gt;
&lt;/div&gt;</pre>
                </div>
            </div>
            
            <div class="preview-container">
                 <div class="card-base" style="width: 350px;">
                    <div class="card-header">
                        <h3 class="card-title">Create project</h3>
                        <p class="card-description">Deploy your new project in one-click.</p>
                    </div>
                    <div class="card-content">
                        <div class="form-group">
                            <label class="form-label">Name</label>
                            <input type="text" class="input-base" placeholder="Name of your project">
                        </div>
                         <div class="form-group">
                            <label class="form-label">Framework</label>
                            <select class="input-base">
                                <option>Select</option>
                                <option>Vue.js</option>
                                <option>React</option>
                            </select>
                        </div>
                    </div>
                    <div class="card-footer flex justify-between">
                        <button class="btn-base btn-outline">Cancel</button>
                        <button class="btn-base btn-primary">Deploy</button>
                    </div>
                 </div>
            </div>
        </div>
        `
    });




    // 7. COMBOBOX
    Vue.component('comp-combobox', {
        data: function () {
            return {
                isOpen: false,
                search: '',
                selected: null,
                frameworks: [
                    { value: 'next.js', label: 'Next.js' },
                    { value: 'sveltekit', label: 'SvelteKit' },
                    { value: 'nuxt.js', label: 'Nuxt.js' },
                    { value: 'remix', label: 'Remix' },
                    { value: 'astro', label: 'Astro' }
                ]
            }
        },
        computed: {
            filteredFrameworks() {
                if (!this.search) return this.frameworks;
                return this.frameworks.filter(f => f.label.toLowerCase().includes(this.search.toLowerCase()));
            }
        },
        template: `
        <div>
            <h1>Combobox</h1>
            <p>Autocomplete input and command palette with a list of suggestions.</p>

            <div class="card-base mb-4">
                <div class="card-header"><h3 class="card-title">Usage</h3></div>
                <div class="card-content">
                    <pre style="background: #f1f5f9; padding: 1rem; border-radius: 6px; overflow-x: auto;">&lt;comp-combobox&gt;&lt;/comp-combobox&gt; 
&lt;!-- See comp-combobox definition for full implementation details --&gt;</pre>
                </div>
            </div>
            
            <div class="preview-container" style="min-height: 300px; align-items: flex-start;">
                <div class="popover-container">
                    <button class="btn-base btn-outline justify-between" style="width: 200px;" @click="isOpen = !isOpen">
                        {{ selected ? frameworks.find(f => f.value === selected).label : 'Select framework...' }}
                        <i class="bi bi-chevron-expand" style="opacity: 0.5;"></i>
                    </button>
                    
                    <div class="popover-content" v-if="isOpen">
                        <div class="p-2 border-b">
                            <input type="text" class="input-base border-0 focus:ring-0" placeholder="Search framework..." v-model="search" autofocus>
                        </div>
                        <div class="p-1">
                            <div v-for="framework in filteredFrameworks" 
                                 :key="framework.value"
                                 class="select-item"
                                 @click="selected = framework.value; isOpen = false">
                                {{ framework.label }}
                                <i class="bi bi-check" v-if="selected === framework.value"></i>
                            </div>
                            <div v-if="filteredFrameworks.length === 0" class="p-2 text-sm text-muted">No framework found.</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `
    });

    // 8. MODAL / ALERT / CONFIRM
    Vue.component('comp-modal', {
        data: function () { return { showModal: false, showDialog: false } },
        template: `
        <div>
            <h1>Dialog</h1>
            <p>A window overlaid on either the primary window or another dialog window, rendering the content underneath inert.</p>

            <div class="card-base mb-4">
                <div class="card-header"><h3 class="card-title">Usage</h3></div>
                <div class="card-content">
                    <pre style="background: #f1f5f9; padding: 1rem; border-radius: 6px; overflow-x: auto;">&lt;!-- Modal Backdrop & Content --&gt;
&lt;div class="modal-backdrop" v-if="showModal" @click.self="showModal = false"&gt;
   &lt;div class="modal-content"&gt;...&lt;/div&gt;
&lt;/div&gt;</pre>
                </div>
            </div>
            
            <div class="preview-container">
                <div class="flex gap-4">
                     <button class="btn-base btn-outline" @click="showModal = true">Edit Profile</button>
                </div>
            </div>

            <!-- Modal Backdrop & Content -->
            <div class="modal-backdrop" v-if="showModal" @click.self="showModal = false">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Edit profile</h3>
                        <p>Make changes to your profile here. Click save when you're done.</p>
                    </div>
                    <div class="modal-body">
                         <div class="form-group">
                            <label class="form-label">Name</label>
                            <input type="text" class="input-base" value="Pedro Duarte">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Username</label>
                            <input type="text" class="input-base" value="@peduarte">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn-base btn-primary" @click="showModal = false">Save changes</button>
                    </div>
                    <button class="modal-close" @click="showModal = false"><i class="bi bi-x"></i></button>
                </div>
            </div>
        </div>
        `
    });

    // Alias for Alert/Confirm to reuse similar logic or show different examples 
    Vue.component('comp-alert', {
        data: function () { return { showAlert: false } },
        template: `
        <div>
            <h1>Alert Dialog</h1>
            <p>A modal dialog that interrupts the user with important content and expects a response (usually just an acknowledgement).</p>

            <div class="card-base mb-4">
                <div class="card-header"><h3 class="card-title">Usage</h3></div>
                <div class="card-content">
                    <pre style="background: #f1f5f9; padding: 1rem; border-radius: 6px; overflow-x: auto;">&lt;div class="modal-backdrop" v-if="showAlert"&gt;
  &lt;div class="modal-content" style="max-width: 400px;"&gt;
    &lt;div class="modal-header"&gt;
      &lt;h3 class="text-lg font-semibold"&gt;Payment Successful&lt;/h3&gt;
      &lt;p class="text-sm text-muted"&gt;Your payment has been processed successfully.&lt;/p&gt;
    &lt;/div&gt;
    &lt;div class="modal-footer"&gt;
      &lt;button class="btn-base btn-primary w-full" @click="showAlert = false"&gt;Continue&lt;/button&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;</pre>
                </div>
            </div>

             <div class="preview-container">
                <button class="btn-base btn-primary" @click="showAlert = true">Show Alert</button>
            </div>

            <!-- Alert Modal -->
            <div class="modal-backdrop" v-if="showAlert">
                <div class="modal-content" style="max-width: 400px;">
                    <div class="modal-header">
                        <h3 class="text-lg font-semibold">Payment Successful</h3>
                        <p class="text-sm text-muted">Your payment has been processed successfully.</p>
                    </div>
                    <div class="modal-footer">
                        <button class="btn-base btn-primary w-full" @click="showAlert = false">Continue</button>
                    </div>
                </div>
            </div>
        </div>
        `
    });

    Vue.component('comp-confirm', {
        data: function () { return { showConfirm: false } },
        template: `
        <div>
            <h1>Confirm Dialog</h1>
            <p>A modal dialog that asks the user to confirm or cancel an action.</p>

            <div class="card-base mb-4">
                <div class="card-header"><h3 class="card-title">Usage</h3></div>
                <div class="card-content">
                    <pre style="background: #f1f5f9; padding: 1rem; border-radius: 6px; overflow-x: auto;">&lt;div class="modal-backdrop" v-if="showConfirm"&gt;
  &lt;div class="modal-content" style="max-width: 450px;"&gt;
    &lt;div class="modal-header"&gt;
      &lt;h3 class="text-lg font-semibold"&gt;Delete Account&lt;/h3&gt;
      &lt;p class="text-sm text-muted"&gt;Are you sure? This action cannot be undone.&lt;/p&gt;
    &lt;/div&gt;
    &lt;div class="modal-footer flex justify-end gap-2"&gt;
      &lt;button class="btn-base btn-outline" @click="showConfirm = false"&gt;Cancel&lt;/button&gt;
      &lt;button class="btn-base btn-destructive" @click="confirmAction"&gt;Delete&lt;/button&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;</pre>
                </div>
            </div>

            <div class="preview-container">
                <button class="btn-base btn-destructive" @click="showConfirm = true">Delete Account</button>
            </div>

            <!-- Confirm Modal -->
            <div class="modal-backdrop" v-if="showConfirm">
                <div class="modal-content" style="max-width: 450px;">
                    <div class="modal-header">
                        <h3 class="text-lg font-semibold">Delete Account</h3>
                        <p class="text-sm text-muted">Are you sure you want to delete your account? This action cannot be undone.</p>
                    </div>
                    <div class="modal-footer flex justify-end gap-2">
                        <button class="btn-base btn-outline" @click="showConfirm = false">Cancel</button>
                        <button class="btn-base btn-destructive" @click="showConfirm = false">Delete</button>
                    </div>
                </div>
            </div>
        </div>
        `
    });


    // 9. TOAST
    Vue.component('comp-toast', {
        data: function () { return { toasts: [] } },
        methods: {
            addToast() {
                const id = Date.now();
                this.toasts.push({ id, title: 'Scheduled: Catch up', description: 'Friday, February 10, 2023 at 5:57 PM', type: 'default' });
                setTimeout(() => this.removeToast(id), 5000);
            },
            addDestructiveToast() {
                const id = Date.now();
                this.toasts.push({ id, title: 'Uh oh! Something went wrong.', description: 'There was a problem with your request.', type: 'destructive' });
                setTimeout(() => this.removeToast(id), 5000);
            },
            removeToast(id) {
                this.toasts = this.toasts.filter(t => t.id !== id);
            }
        },
        template: `
        <div>
            <h1>Toast</h1>
            <p>A succinct message that is displayed temporarily.</p>

            <div class="card-base mb-4">
                <div class="card-header"><h3 class="card-title">Usage</h3></div>
                <div class="card-content">
                    <pre style="background: #f1f5f9; padding: 1rem; border-radius: 6px; overflow-x: auto;">&lt;div class="toast-viewport"&gt;
  &lt;div class="toast-base"&gt;
    &lt;div class="toast-title"&gt;Title&lt;/div&gt;
    &lt;div class="toast-desc"&gt;Description&lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;</pre>
                </div>
            </div>
            
            <div class="preview-container">
                <div class="flex gap-4">
                    <button class="btn-base btn-outline" @click="addToast">Show Toast</button>
                    <button class="btn-base btn-outline" @click="addDestructiveToast">Show Destructive Toast</button>
                </div>
            </div>

            <!-- Toast Container -->
            <div class="toast-viewport">
                <transition-group name="toast">
                    <div v-for="toast in toasts" :key="toast.id" class="toast-base" :class="{'toast-destructive': toast.type === 'destructive'}">
                        <div class="flex flex-col gap-1">
                            <div class="toast-title">{{ toast.title }}</div>
                            <div class="toast-desc">{{ toast.description }}</div>
                        </div>
                    </div>
                </transition-group>
            </div>
        </div>
        `
    });

    // 10. SKELETON
    Vue.component('comp-skeleton', {
        template: `
        <div>
            <h1>Skeleton</h1>
            <p>Use to show a placeholder while content is loading.</p>

            <div class="card-base mb-4">
                <div class="card-header"><h3 class="card-title">Usage</h3></div>
                <div class="card-content">
                    <pre style="background: #f1f5f9; padding: 1rem; border-radius: 6px; overflow-x: auto;">&lt;div class="skeleton" style="width: 100px; height: 16px;"&gt;&lt;/div&gt;
&lt;div class="skeleton rounded-full" style="width: 40px; height: 40px;"&gt;&lt;/div&gt;</pre>
                </div>
            </div>
            
            <div class="preview-container">
                <div class="flex item-center space-x-4">
                    <div class="skeleton rounded-full" style="width: 48px; height: 48px; border-radius: 50%;"></div>
                    <div class="space-y-2">
                        <div class="skeleton" style="width: 250px; height: 16px; margin-bottom: 8px;"></div>
                        <div class="skeleton" style="width: 200px; height: 16px;"></div>
                    </div>
                </div>
            </div>
        </div>
        `
    });

    // 11. TABLE
    Vue.component('comp-table', {
        template: `
        <div>
            <h1>Table</h1>
            <p>A responsive table component.</p>

            <div class="card-base mb-4">
                <div class="card-header"><h3 class="card-title">Usage</h3></div>
                <div class="card-content">
                    <pre style="background: #f1f5f9; padding: 1rem; border-radius: 6px; overflow-x: auto;">&lt;table class="w-full caption-bottom text-sm"&gt;
  &lt;thead class="[&_tr]:border-b"&gt;
    &lt;tr class="border-b"&gt;&lt;th&gt;Header&lt;/th&gt;&lt;/tr&gt;
  &lt;/thead&gt;
  &lt;tbody&gt;
    &lt;tr class="border-b"&gt;&lt;td&gt;Cell&lt;/td&gt;&lt;/tr&gt;
  &lt;/tbody&gt;
&lt;/table&gt;</pre>
                </div>
            </div>
            
            <div class="preview-container block">
                <div class="relative w-full overflow-auto">
                    <table class="w-full caption-bottom text-sm">
                        <thead class="[&_tr]:border-b">
                            <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Invoice</th>
                                <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                                <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Method</th>
                                <th class="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Amount</th>
                            </tr>
                        </thead>
                        <tbody class="[&_tr:last-child]:border-0">
                            <tr class="border-b transition-colors hover:bg-muted/50">
                                <td class="p-4 align-middle font-medium">INV001</td>
                                <td class="p-4 align-middle">Paid</td>
                                <td class="p-4 align-middle">Credit Card</td>
                                <td class="p-4 align-middle text-right">$250.00</td>
                            </tr>
                            <tr class="border-b transition-colors hover:bg-muted/50">
                                <td class="p-4 align-middle font-medium">INV002</td>
                                <td class="p-4 align-middle">Pending</td>
                                <td class="p-4 align-middle">PayPal</td>
                                <td class="p-4 align-middle text-right">$150.00</td>
                            </tr>
                             <tr class="border-b transition-colors hover:bg-muted/50">
                                <td class="p-4 align-middle font-medium">INV003</td>
                                <td class="p-4 align-middle">Unpaid</td>
                                <td class="p-4 align-middle">Bank Transfer</td>
                                <td class="p-4 align-middle text-right">$350.00</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        `
    });

    // 12. TABS
    Vue.component('comp-tabs', {
        data: function () { return { activeTab: 'account' } },
        template: `
        <div>
            <h1>Tabs</h1>
            <p>A set of layered sections of content—known as tab panels—that are displayed one at a time.</p>

            <div class="card-base mb-4">
                <div class="card-header"><h3 class="card-title">Usage</h3></div>
                <div class="card-content">
                    <pre style="background: #f1f5f9; padding: 1rem; border-radius: 6px; overflow-x: auto;">&lt;div class="tabs-list"&gt;
  &lt;button class="tabs-trigger" data-state="active"&gt;Tab 1&lt;/button&gt;
  &lt;button class="tabs-trigger"&gt;Tab 2&lt;/button&gt;
&lt;/div&gt;
&lt;div class="tabs-content"&gt;Content 1&lt;/div&gt;</pre>
                </div>
            </div>
            
            <div class="preview-container">
               <div style="width: 400px;">
                    <div class="tabs-list">
                        <button class="tabs-trigger" :data-state="activeTab === 'account' ? 'active' : ''" @click="activeTab = 'account'">Account</button>
                        <button class="tabs-trigger" :data-state="activeTab === 'password' ? 'active' : ''" @click="activeTab = 'password'">Password</button>
                    </div>
                    <div class="tabs-content" v-if="activeTab === 'account'">
                        <div class="card-base">
                            <div class="card-header">
                                <h3 class="card-title">Account</h3>
                                <p class="card-description">Make changes to your account here.</p>
                            </div>
                            <div class="card-content">
                                <div class="form-group"><label class="form-label">Name</label><input class="input-base" value="Pedro Duarte"></div>
                            </div>
                            <div class="card-footer"><button class="btn-base btn-primary">Save changes</button></div>
                        </div>
                    </div>
                     <div class="tabs-content" v-if="activeTab === 'password'">
                        <div class="card-base">
                            <div class="card-header">
                                <h3 class="card-title">Password</h3>
                                <p class="card-description">Change your password here.</p>
                            </div>
                            <div class="card-content">
                                <div class="form-group"><label class="form-label">Current Password</label><input class="input-base" type="password"></div>
                                <div class="form-group"><label class="form-label">New Password</label><input class="input-base" type="password"></div>
                            </div>
                            <div class="card-footer"><button class="btn-base btn-primary">Save password</button></div>
                        </div>
                    </div>
               </div>
            </div>
        </div>
        `
    });

    // 13. LOGIN PAGE EXAMPLE
    Vue.component('comp-login', {
        template: `
        <div style="height: 100%; display: flex; align-items: center; justify-content: center; background-color: #f1f5f9;">
            <div class="card-base" style="width: 100%; max-width: 400px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);">
                <div class="card-header" style="text-align: center; padding-bottom: 0;">
                    <h3 class="card-title">Welcome back</h3>
                    <p class="card-description">Enter your credentials to access your account</p>
                </div>
                <div class="card-content" style="padding-top: 1.5rem;">
                    <div class="form-group">
                        <label class="form-label">Email</label>
                        <input type="email" class="input-base" placeholder="name@example.com">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Password</label>
                        <input type="password" class="input-base" placeholder="Enter your password">
                    </div>
                    <div class="form-group">
                         <label class="checkbox-container">
                            <input type="checkbox">
                            <span class="checkmark"></span>
                            Remember me
                        </label>
                    </div>
                    <button class="btn-base btn-primary" style="width: 100%;">Sign in</button>
                    
                    <div style="margin-top: 1.5rem; text-align: center; font-size: 0.875rem;">
                        <span class="text-muted-foreground">Don't have an account? </span>
                        <button class="btn-base btn-link" style="padding: 0; height: auto;">Sign up</button>
                    </div>
                    
                    <div style="position: relative; margin: 1.5rem 0; text-align: center;">
                        <div style="position: absolute; left: 0; top: 50%; width: 100%; height: 1px; background: var(--border);"></div>
                        <span style="position: relative; background: white; padding: 0 0.5rem; color: var(--muted-foreground); font-size: 0.75rem; text-transform: uppercase;">Or continue with</span>
                    </div>

                    <div class="flex gap-2">
                        <button class="btn-base btn-outline" style="width: 50%;">Github</button>
                        <button class="btn-base btn-outline" style="width: 50%;">Google</button>
                    </div>
                </div>
            </div>
        </div>
        `
    });

    // 14. AUTOCOMPLETE INPUT
    Vue.component('comp-autocomplete', {
        props: {
            placeholder: { type: String, default: 'Search...' },
            apiUrl: { type: String, default: 'https://dummyjson.com/products/search?q=' },
            dataKey: { type: String, default: 'products' },
            labelKey: { type: String, default: 'title' }
        },
        data() {
            return {
                query: '',
                results: [],
                isOpen: false,
                loading: false,
                controller: null
            }
        },
        methods: {
            onInput() {
                if (!this.query) {
                    this.results = [];
                    this.isOpen = false;
                    return;
                }

                this.loading = true;
                this.isOpen = true;

                if (this.controller) this.controller.abort();
                this.controller = new AbortController();

                fetch(`${this.apiUrl}${this.query}`, { signal: this.controller.signal })
                    .then(res => res.json())
                    .then(data => {
                        this.results = this.dataKey ? data[this.dataKey] : data;
                        this.loading = false;
                    })
                    .catch(err => {
                        if (err.name !== 'AbortError') {
                            console.error('Fetch error:', err);
                            this.loading = false;
                        }
                    });
            },
            selectItem(item) {
                this.query = item[this.labelKey];
                this.isOpen = false;
                this.$emit('select', item);
            }
        },
        template: `
        <div>
            <h1>Input Autocomplete</h1>
            <p>Text input with dynamic suggestions from JSON API.</p>

            <div class="card-base mb-4">
                <div class="card-header"><h3 class="card-title">Usage</h3></div>
                <div class="card-content">
                    <pre style="background: #f1f5f9; padding: 1rem; border-radius: 6px; overflow-x: auto;">&lt;comp-autocomplete 
    placeholder="Search products..." 
    api-url="https://dummyjson.com/products/search?q=" 
    data-key="products" 
    label-key="title"
    @select="handleSelect" 
/&gt;</pre>
                </div>
            </div>
            
            <div class="card-base mb-4">
                <div class="card-header"><h3 class="card-title">Props</h3></div>
                <div class="card-content">
                    <table class="simpus-table">
                        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
                        <tbody>
                            <tr><td>placeholder</td><td>String</td><td>'Search...'</td><td>Input placeholder text</td></tr>
                            <tr><td>apiUrl</td><td>String</td><td>(DummyJSON)</td><td>API endpoint URL</td></tr>
                            <tr><td>dataKey</td><td>String</td><td>'products'</td><td>Key in response JSON containing array</td></tr>
                            <tr><td>labelKey</td><td>String</td><td>'title'</td><td>Key in item object to display</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="preview-container">
                 <div class="relative" style="width: 100%; max-width: 300px;">
                    <div class="form-group" style="margin-bottom: 0;">
                        <input type="text" 
                               class="input-base" 
                               :placeholder="placeholder"
                               v-model="query"
                               @input="onInput"
                               @focus="isOpen = !!query"
                               style="width: 100%;">
                        <div v-if="loading" style="position: absolute; right: 10px; top: 10px; color: var(--muted-foreground);">
                            <i class="fa fa-spinner fa-spin"></i>
                        </div>
                    </div>
                    
                    <div v-if="isOpen && results.length > 0" 
                         class="popover-content" 
                         style="width: 100%; max-height: 200px; overflow-y: auto;">
                        <div v-for="(item, index) in results" 
                             :key="index"
                             class="select-item"
                             @click="selectItem(item)">
                            {{ item[labelKey] }}
                        </div>
                    </div>
                     <div v-if="isOpen && !loading && results.length === 0" 
                         class="popover-content" 
                         style="width: 100%; padding: 0.5rem; text-align: center; color: var(--muted-foreground);">
                        No results found.
                    </div>
                </div>
            </div>
        </div>
        `
    });

    // 15. DYNAMIC SELECT (Server-side Search)
    Vue.component('comp-dynamic-select', {
        props: {
            placeholder: { type: String, default: 'Select an item...' },
            apiUrl: { type: String, default: 'https://dummyjson.com/users/search?q=' },
            dataKey: { type: String, default: 'users' },
            labelKey: { type: String, default: 'firstName' }, // Can be a function or string
            valueKey: { type: String, default: 'id' }
        },
        data() {
            return {
                isOpen: false,
                searchQuery: '',
                selectedItem: null,
                items: [],
                loading: false,
                controller: null
            }
        },
        computed: {
            displayLabel() {
                return this.selectedItem ? this.resolveLabel(this.selectedItem) : this.placeholder;
            }
        },
        methods: {
            toggle() {
                this.isOpen = !this.isOpen;
                if (this.isOpen && this.items.length === 0) {
                    this.fetchData('');
                }
                if (this.isOpen) {
                    this.$nextTick(() => {
                        this.$refs.searchInput.focus();
                    });
                }
            },
            resolveLabel(item) {
                return item[this.labelKey];
            },
            onSearch() {
                this.fetchData(this.searchQuery);
            },
            fetchData(query) {
                this.loading = true;

                if (this.controller) this.controller.abort();
                this.controller = new AbortController();

                fetch(`${this.apiUrl}${query}`, { signal: this.controller.signal })
                    .then(res => res.json())
                    .then(data => {
                        this.items = this.dataKey ? data[this.dataKey] : data;
                        this.loading = false;
                    })
                    .catch(err => {
                        if (err.name !== 'AbortError') {
                            console.error('Fetch error:', err);
                            this.loading = false;
                        }
                    });
            },
            selectItem(item) {
                this.selectedItem = item;
                this.isOpen = false;
                this.$emit('change', item[this.valueKey]);
            }
        },
        template: `
        <div>
            <h1>Dynamic Select</h1>
            <p>Searchable dropdown (Select2-like) with remote data fetching.</p>

            <div class="card-base mb-4">
                <div class="card-header"><h3 class="card-title">Usage</h3></div>
                <div class="card-content">
                    <pre style="background: #f1f5f9; padding: 1rem; border-radius: 6px; overflow-x: auto;">&lt;comp-dynamic-select 
    placeholder="Select user..." 
    api-url="https://dummyjson.com/users/search?q=" 
    data-key="users" 
    label-key="firstName"
    value-key="id"
    @change="handleChange" 
/&gt;</pre>
                </div>
            </div>

            <div class="card-base mb-4">
                <div class="card-header"><h3 class="card-title">Props</h3></div>
                <div class="card-content">
                    <table class="simpus-table">
                        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
                        <tbody>
                            <tr><td>placeholder</td><td>String</td><td>'Select an item...'</td><td>Input placeholder text</td></tr>
                            <tr><td>apiUrl</td><td>String</td><td>(DummyJSON)</td><td>API endpoint URL</td></tr>
                            <tr><td>dataKey</td><td>String</td><td>'users'</td><td>Key in response JSON containing array</td></tr>
                            <tr><td>labelKey</td><td>String</td><td>'firstName'</td><td>Key in item object to display</td></tr>
                            <tr><td>valueKey</td><td>String</td><td>'id'</td><td>Key in item object to return as value</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="preview-container">
                <div class="popover-container" style="width: 100%; max-width: 300px;">
                    <button class="btn-base btn-outline justify-between w-full" @click="toggle" style="width: 100%;">
                        {{ displayLabel }}
                        <i class="bi bi-chevron-down opacity-50"></i>
                    </button>
                    
                    <div v-if="isOpen" class="popover-content" style="width: 100%; margin-top: 4px;">
                        <div style="padding: 0.5rem; border-bottom: 1px solid var(--border);">
                            <input ref="searchInput"
                                   type="text" 
                                   class="input-base border-0 focus:ring-0" 
                                   placeholder="Search..." 
                                   v-model="searchQuery"
                                   @input="onSearch"
                                   style="height: 2rem; padding: 0;">
                        </div>
                        
                        <div style="max-height: 200px; overflow-y: auto;">
                            <div v-if="loading" class="p-4 text-center text-muted-foreground">
                                <i class="fa fa-spinner fa-spin"></i> Loading...
                            </div>
                             <div v-else-if="items.length === 0" class="p-4 text-center text-muted-foreground">
                                No results found.
                            </div>
                            <div v-else
                                 v-for="item in items" 
                                 :key="item[valueKey]"
                                 class="select-item"
                                 @click="selectItem(item)">
                                {{ resolveLabel(item) }}
                                <i v-if="selectedItem && selectedItem[valueKey] === item[valueKey]" class="bi bi-check"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `
    });

})();
