import { createToastRenderer } from "./createToastRenderer";
import { createToastStore } from "./createToastStore";

const DEFAULT_DURATION = 3200;

export const createToastApi = ({ mountPoint = document.body, position = "top-right" } = {}) => {
  const store = createToastStore();
  const renderer = createToastRenderer({ mountPoint, position });

  const unsubscribe = store.subscribe((toasts) => {
    renderer.render(toasts, (id) => store.remove(id));
  });

  const show = (message, options = {}) => {
    const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    const {
      type = "info",
      title = "",
      duration = DEFAULT_DURATION,
      autoDismiss = true,
    } = options;

    store.add({ id, message, type, title });

    if (autoDismiss && duration > 0) {
      setTimeout(() => store.remove(id), duration);
    }

    return id;
  };

  return {
    show,
    success: (message, options = {}) => show(message, { ...options, type: "success" }),
    error: (message, options = {}) => show(message, { ...options, type: "error" }),
    warning: (message, options = {}) => show(message, { ...options, type: "warning" }),
    info: (message, options = {}) => show(message, { ...options, type: "info" }),
    setPosition: renderer.setPosition,
    clear: store.clear,
    destroy() {
      unsubscribe();
      renderer.destroy();
    },
  };
};
