import { useToast } from "../context/ToastContext";
import "./toast.css";

const TYPE_META = {
  success: { icon: "✓", fallbackTitle: "Success" },
  error: { icon: "!", fallbackTitle: "Error" },
  warning: { icon: "!", fallbackTitle: "Warning" },
  info: { icon: "i", fallbackTitle: "Info" },
};

const ToastContainer = () => {
  const { toasts, removeToast, position } = useToast();

  return (
    <div className={`toast-container toast-${position}`} role="status" aria-live="polite">
      {toasts.map((toast) => {
        const meta = TYPE_META[toast.type] ?? TYPE_META.info;

        return (
          <div key={toast.id} className={`toast toast-${toast.type}`}>
            <span className="toast-icon">{meta.icon}</span>
            <div className="toast-content">
              <h4>{toast.title || meta.fallbackTitle}</h4>
              <p>{toast.message}</p>
            </div>
            <button
              type="button"
              className="toast-close"
              onClick={() => removeToast(toast.id)}
              aria-label="Close notification"
            >
              x
            </button>
            {toast.autoDismiss && (
              <span
                className="toast-progress"
                style={{ animationDuration: `${toast.duration}ms` }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ToastContainer;
