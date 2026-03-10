/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useMemo, useState } from "react";

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

const DEFAULT_DURATION = 3500;

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const [position, setPosition] = useState("top-right");

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback((message, options = {}) => {
    const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    const {
      type = "info",
      title = "",
      duration = DEFAULT_DURATION,
      autoDismiss = true,
    } = options;

    setToasts((prev) => [
      ...prev,
      { id, message, type, title, duration, autoDismiss },
    ]);

    if (!autoDismiss || duration <= 0) return id;
    setTimeout(() => {
      removeToast(id);
    }, duration);
    return id;
  }, [removeToast]);

  const clearToasts = useCallback(() => {
    setToasts([]);
  }, []);

  const toast = useMemo(() => ({
    success: (message, options = {}) =>
      addToast(message, { ...options, type: "success" }),
    error: (message, options = {}) =>
      addToast(message, { ...options, type: "error" }),
    warning: (message, options = {}) =>
      addToast(message, { ...options, type: "warning" }),
    info: (message, options = {}) =>
      addToast(message, { ...options, type: "info" }),
  }), [addToast]);

  const value = {
    toasts,
    position,
    setPosition,
    addToast,
    removeToast,
    clearToasts,
    toast,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  );
};
