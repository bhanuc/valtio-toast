# 🎯 valtio-toast

A lightweight, type-safe toast notification system for React applications using Valtio state management and Tailwind CSS.

[![npm version](https://badge.fury.io/js/valtio-toast.svg)](https://badge.fury.io/js/valtio-toast)
[![TypeScript](https://badges.frapsoft.com/typescript/code/typescript.svg?v=101)](https://github.com/ellerbrock/typescript-badges/)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

## ✨ Features

- 🎯 Built with TypeScript for full type safety
- 🎨 Styled with Tailwind CSS
- 🔄 Valtio state management
- 🎭 Smooth animations
- ♿ Accessible (WAI-ARIA compliant)
- 📱 Responsive design
- 🎛 Customizable duration and positioning
- 🔄 Queue management for multiple toasts
- 🎨 Themeable with custom styles
- 📦 Zero dependencies (except peer dependencies)

## 📦 Installation

```bash
npm install valtio-toast
# or
yarn add valtio-toast
```

## 🚀 Quick Start

```tsx
import { ToastProvider } from 'valtio-toast';
import { useToast } from 'valtio-toast';

// Wrap your app with ToastProvider
function App() {
  return (
    <ToastProvider>
      <YourApp />
    </ToastProvider>
  );
}

// Use in any component
function YourComponent() {
  const toast = useToast();

  const handleClick = () => {
    toast.show({
      type: 'success',
      message: 'Operation successful!',
      duration: 5000 // optional, defaults to 5000ms
    });
  };

  return <button onClick={handleClick}>Show Toast</button>;
}
```

## 📖 API Reference

### ToastProvider Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| position | ToastPosition | 'top-right' | Position of toasts |
| maxToasts | number | 5 | Maximum number of toasts shown at once |
| children | ReactNode | - | Child components |

### useToast Hook

Returns an object with the following methods:

```typescript
interface ToastMethods {
  show: (options: ToastOptions) => string;
  success: (message: string, duration?: number) => string;
  error: (message: string, duration?: number) => string;
  warning: (message: string, duration?: number) => string;
  info: (message: string, duration?: number) => string;
  remove: (id: string) => void;
  removeAll: () => void;
}
```

### Toast Options

```typescript
interface ToastOptions {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
  position?: ToastPosition;
  onClose?: () => void;
}
```

## 🎨 Customization

### Tailwind Configuration

Add these custom animations to your `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      keyframes: {
        'toast-enter': {
          '0%': { transform: 'translateX(100%)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 }
        },
        'toast-exit': {
          '0%': { transform: 'translateX(0)', opacity: 1 },
          '100%': { transform: 'translateX(100%)', opacity: 0 }
        }
      },
      animation: {
        'toast-enter': 'toast-enter 0.3s ease-out',
        'toast-exit': 'toast-exit 0.3s ease-in'
      }
    }
  }
};
```

### Custom Themes

```typescript
import { createTheme } from 'valtio-toast';

const customTheme = createTheme({
  success: {
    background: 'bg-emerald-50',
    border: 'border-emerald-200',
    text: 'text-emerald-800'
  },
  // ... other types
});

<ToastProvider theme={customTheme}>
  <App />
</ToastProvider>
```

## 🔧 Advanced Usage

### Custom Components

```typescript
import { createToastComponent } from 'valtio-toast';

const CustomToast = createToastComponent(({ message, type }) => (
  <div className="custom-toast">
    {message}
  </div>
));

<ToastProvider component={CustomToast}>
  <App />
</ToastProvider>
```

### Queue Management

```typescript
const toast = useToast();

// Configure queue behavior
toast.configure({
  maxToasts: 3,
  queueMode: 'replace-oldest'
});
```

## 📚 Examples

### Basic Usage

```typescript
const toast = useToast();

// Success toast
toast.success('Profile updated successfully');

// Error toast
toast.error('Failed to save changes');

// Warning toast
toast.warning('Your session will expire soon');

// Info toast
toast.info('New features available');
```

### Custom Duration

```typescript
toast.show({
  type: 'success',
  message: 'Quick notification',
  duration: 2000 // 2 seconds
});
```

### With Callback

```typescript
toast.show({
  type: 'info',
  message: 'Processing...',
  onClose: () => {
    console.log('Toast closed');
  }
});
```

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

MIT © [Bhanu Pratap Chaudhary]