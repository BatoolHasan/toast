import React, { useState, createContext } from "react";
import { useEscapeKey } from "../../hooks/useEscapeKey";

export const ToastContext = createContext();

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];
const DEFAULT_MESSAGE = "";
const DEFAULT_VARIANT = VARIANT_OPTIONS[0];

function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const [message, setMessage] = useState(DEFAULT_MESSAGE);
  const [selectedVariant, setSelectedVariant] = useState(DEFAULT_VARIANT);

  useEscapeKey(setToasts([]));

  const addToast = () => {
    setToasts([
      ...toasts,
      { message, variant: selectedVariant, id: crypto.randomUUID() },
    ]);
  };

  const removeToast = (id) => {
    setToasts(toasts.filter((toast) => toast.id !== id));
  };

  const resetMessage = () => {
    setMessage(DEFAULT_MESSAGE);
  };

  const resetSelectedVariant = () => {
    setSelectedVariant(DEFAULT_VARIANT);
  };

  return (
    <ToastContext.Provider
      value={{
        toasts,
        message,
        setMessage,
        selectedVariant,
        setSelectedVariant,
        removeToast,
        addToast,
        resetMessage,
        resetSelectedVariant,
        VARIANT_OPTIONS,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
