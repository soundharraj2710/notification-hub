export const createToastStore = () => {
  const listeners = new Set();
  let toasts = [];

  const notify = () => {
    listeners.forEach((listener) => listener([...toasts]));
  };

  return {
    subscribe(listener) {
      listeners.add(listener);
      listener([...toasts]);
      return () => listeners.delete(listener);
    },
    add(toast) {
      toasts = [...toasts, toast];
      notify();
    },
    remove(id) {
      toasts = toasts.filter((toast) => toast.id !== id);
      notify();
    },
    clear() {
      toasts = [];
      notify();
    },
  };
};
