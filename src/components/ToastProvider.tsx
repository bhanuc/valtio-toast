import React from 'react';
import { ToastContainer } from "./ToastContainer"

interface ToastProviderProps {
    children: React.ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
    return (
        <>
            {children}
            <ToastContainer />
        </>
    );
};
