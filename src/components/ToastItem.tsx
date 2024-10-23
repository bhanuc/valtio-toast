import React, { useEffect, useRef } from 'react';
import { ToastIcon } from './ToastIcon';
import type { Toast } from '../types';

interface ToastItemProps {
    toast: Toast;
    onRemove: (id: string) => void;
}

export const ToastItem: React.FC<ToastItemProps> = ({ toast, onRemove }) => {
    const { id, message, type } = toast;
    const removeTimeoutRef = useRef<NodeJS.Timeout>();

    const themeMap = {
        success: {
            bg: 'bg-green-50',
            border: 'border-green-200',
            text: 'text-green-800',
        },
        error: {
            bg: 'bg-red-50',
            border: 'border-red-200',
            text: 'text-red-800',
        },
        warning: {
            bg: 'bg-yellow-50',
            border: 'border-yellow-200',
            text: 'text-yellow-800',
        },
        info: {
            bg: 'bg-blue-50',
            border: 'border-blue-200',
            text: 'text-blue-800',
        },
    };

    const theme = themeMap[type];

    useEffect(() => {
        if (toast.duration > 0) {
            removeTimeoutRef.current = setTimeout(() => {
                onRemove(id);
            }, toast.duration)
        }

        return () => {
            if (removeTimeoutRef.current) {
                clearTimeout(removeTimeoutRef.current);
            }
        };
    }, [id, toast.duration, onRemove]);

    return (
        <div
            className={`max-w-md w-full pointer-events-auto overflow-hidden rounded-lg border shadow-lg 
            ${theme.bg} ${theme.border} animate-toast-enter`}
            role="alert"
            aria-live="assertive"
        >
            <div className="p-4">
                <div className="flex items-start">
                    <div className="flex-shrink-0">
                        <ToastIcon type={type} />
                    </div>
                    <div className="ml-3 w-0 flex-1">
                        <p className={`text-sm font-medium ${theme.text}`}>{message}</p>
                    </div>
                    <div className="ml-4 flex-shrink-0 flex">
                        <button
                            className={`inline-flex rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${theme.text}`}
                            onClick={() => onRemove(id)}
                        >
                            <span className="sr-only">Close</span>
                            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

