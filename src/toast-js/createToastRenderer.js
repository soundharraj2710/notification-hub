export const createToastRenderer = ({ mountPoint, position = "top-right" }) => {
  if (!mountPoint) {
    throw new Error("createToastRenderer requires a mountPoint element.");
  }

  const container = document.createElement("div");
  container.className = `toast-container toast-${position}`;
  mountPoint.appendChild(container);

  const render = (toasts, onClose) => {
    container.innerHTML = "";

    toasts.forEach((toast) => {
      const el = document.createElement("article");
      el.className = `toast toast-${toast.type ?? "info"}`;

      const title = toast.title || (toast.type ?? "info").toUpperCase();
      el.innerHTML = `
        <span class="toast-icon">${toast.type === "success" ? "✓" : toast.type === "error" ? "!" : "i"}</span>
        <div class="toast-content">
          <h4>${title}</h4>
          <p>${toast.message}</p>
        </div>
        <button class="toast-close" type="button" aria-label="Close notification">x</button>
      `;

      el.querySelector(".toast-close").addEventListener("click", () => onClose(toast.id));
      container.appendChild(el);
    });
  };

  const setPosition = (nextPosition) => {
    container.className = `toast-container toast-${nextPosition}`;
  };

  const destroy = () => {
    container.remove();
  };

  return { render, setPosition, destroy };
};
