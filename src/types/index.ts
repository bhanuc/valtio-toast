export type ToastType = 'success' | 'error' | 'warning' | 'info';
export type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';

export interface Toast {
    id: string;
    message: string;
    type: ToastType;
    duration: number;
    position: ToastPosition;
    createdAt: number;
    onClose?: () => void;
}

export interface ToastOptions extends Partial<Omit<Toast, 'id' | 'createdAt'>> {
    message: string;
    type: ToastType;
}

export interface ToastThemeColors {
    background: string;
    border: string;
    text: string;
}

export interface ToastTheme {
    success: ToastThemeColors;
    error: ToastThemeColors;
    warning: ToastThemeColors;
    info: ToastThemeColors;
}
