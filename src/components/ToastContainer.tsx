import React, { useMemo } from 'react';
import { useSnapshot } from 'valtio';
import { toastState, toastActions } from '../store/toastStore';
import { ToastItem } from './ToastItem';
import type { Toast, ToastPosition } from '../types';

const positionClasses: Record<ToastPosition, string> = {
    'top-right': 'top-0 right-0',
    'top-left': 'top-0 left-0',
    'bottom-right': 'bottom-0 right-0',
    'bottom-left': 'bottom-0 left-0',
    'top-center': 'top-0 left-1/2 -translate-x-1/2',
    'bottom-center': 'bottom-0 left-1/2 -translate-x-1/2',
};

export const ToastContainer: React.FC = () => {
    const state = useSnapshot(toastState);

    const groupedToasts = useMemo(() => {
        return state.toasts.reduce<Record<ToastPosition, Toast[]>>((acc, toast) => {
            const position = toast.position || state.defaultPosition;
            if (!acc[position]) {
                acc[position] = [];
            }
            acc[position] = [...acc[position], toast];
            return acc;
        }, {} as Record<ToastPosition, Toast[]>);
    }, [state.toasts, state.defaultPosition]);

    return (
        <>
            {Object.entries(groupedToasts).map(([position, toasts]) => (
                <div
                    key={position}
                    className={`fixed z-50 p-4 space-y-4 pointer-events-none ${positionClasses[position as ToastPosition]
                        }`}
                >
                    {toasts.map((toast) => (
                        <ToastItem
                            key={toast.id}
                            toast={toast}
                            onRemove={toastActions.remove}
                        />
                    ))}
                </div>
            ))}
        </>
    );
};