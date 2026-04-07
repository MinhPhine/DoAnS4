'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto remove after 5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 5000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showSuccess = useCallback((msg) => addToast(msg, 'success'), [addToast]);
  const showError = useCallback((msg) => addToast(msg, 'error'), [addToast]);
  const showWarning = useCallback((msg) => addToast(msg, 'warning'), [addToast]);
  const showInfo = useCallback((msg) => addToast(msg, 'info'), [addToast]);

  return (
    <ToastContext.Provider value={{ showSuccess, showError, showWarning, showInfo }}>
      {children}
      
      {/* Toast Container */}
      <div className="fixed bottom-8 right-8 z-[9999] flex flex-col gap-3 max-w-md w-full pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between p-4 rounded-2xl shadow-2xl border animate-in slide-in-from-right-full transition-all duration-300 bg-white
              ${toast.type === 'success' ? 'border-green-100 text-green-800' : ''}
              ${toast.type === 'error' ? 'border-red-100 text-red-800' : ''}
              ${toast.type === 'warning' ? 'border-amber-100 text-amber-800' : ''}
              ${toast.type === 'info' ? 'border-blue-100 text-blue-800' : ''}
            `}
          >
            <div className="flex items-center gap-3">
              {toast.type === 'success' && <CheckCircle className="text-green-500 w-5 h-5 shrink-0" />}
              {toast.type === 'error' && <XCircle className="text-red-500 w-5 h-5 shrink-0" />}
              {toast.type === 'warning' && <AlertCircle className="text-amber-500 w-5 h-5 shrink-0" />}
              {toast.type === 'info' && <Info className="text-blue-500 w-5 h-5 shrink-0" />}
              <span className="text-[14px] font-bold">{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-gray-400 hover:text-gray-600 transition-colors ml-4"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
