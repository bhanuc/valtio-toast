import { proxy, ref } from 'valtio';
import type { Toast, ToastOptions, ToastPosition } from '../types';
import { generateId } from '../utils/helpers';

interface ToastState {
  toasts: Toast[];
  maxToasts: number;
  defaultPosition: ToastPosition;
  defaultDuration: number;
}

// Initialize the store with ref for the toasts array
export const toastState = proxy<ToastState>({
  toasts: ref([]),
  maxToasts: 5,
  defaultPosition: 'top-right',
  defaultDuration: 5000,
});

export const toastActions = {
  show: (options: ToastOptions): string => {
    const id = generateId();
    const toast: Toast = {
      id,
      message: options.message,
      type: options.type,
      duration: options.duration || toastState.defaultDuration,
      position: options.position || toastState.defaultPosition,
      createdAt: Date.now(),
      onClose: options.onClose,
    };

    if (toastState.toasts.length >= toastState.maxToasts) {
      const oldestToast = [...toastState.toasts]
        .sort((a, b) => a.createdAt - b.createdAt)[0];
      if (oldestToast) {
        toastActions.remove(oldestToast.id);
      }
    }

    // Update the toasts array immutably
    toastState.toasts = [...toastState.toasts, toast];

    if (toast.duration > 0) {
      setTimeout(() => {
        toastActions.remove(id);
      }, toast.duration);
    }

    return id;
  },

  remove: (id: string): void => {
    const toast = toastState.toasts.find(t => t.id === id);
    if (toast?.onClose) {
      toast.onClose();
    }
    toastState.toasts = toastState.toasts.filter(t => t.id !== id);
  },

  removeAll: (): void => {
    toastState.toasts.forEach(toast => {
      if (toast.onClose) {
        toast.onClose();
      }
    });
    toastState.toasts = [];
  },

  configure: (config: Partial<ToastState>): void => {
    Object.assign(toastState, config);
  },
};