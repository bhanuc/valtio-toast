import { useCallback } from 'react';
import { toastActions } from '../store/toastStore';
import type { Toast, ToastOptions } from '../types';


type UseToastReturn = {
  show: (options: ToastOptions) => string;
  success: (message: string, duration?: number) => string;
  error: (message: string, duration?: number) => string;
  warning: (message: string, duration?: number) => string;
  info: (message: string, duration?: number) => string;
  remove: (id: string) => void;
  removeAll: () => void;
  configure: (options: Partial<ToastOptions>) => void;
};

export const useToast = (): UseToastReturn => {
  const show = useCallback((options: ToastOptions) => {
    return toastActions.show(options);
  }, []);

  const success = useCallback((message: string, duration?: number) => {
    return show({ type: 'success', message, duration });
  }, [show]);

  const error = useCallback((message: string, duration?: number) => {
    return show({ type: 'error', message, duration });
  }, [show]);

  const warning = useCallback((message: string, duration?: number) => {
    return show({ type: 'warning', message, duration });
  }, [show]);

  const info = useCallback((message: string, duration?: number) => {
    return show({ type: 'info', message, duration });
  }, [show]);
  return {
    show,
    success,
    error,
    warning,
    info,
    remove: toastActions.remove,
    removeAll: toastActions.removeAll,
    configure: (options: Partial<ToastOptions>) => {
      toastActions.configure(options as Partial<any>);
    },
  };
};