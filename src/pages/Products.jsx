import { useEffect, useRef, useState } from "react";
import CodeExampleCard from "../components/CodeExampleCard";
import { createToastApi } from "../toast-js/createToastApi";

const SUCCESS_CODE = `// Reusable success toast function
const showSuccessToast = (toastApi, message) => {
  // Uses built-in auto dismiss after 2500ms
  toastApi.success(message, {
    title: "Success",
    duration: 2500,
  });
};

// Usage:
showSuccessToast(toast, "Product saved successfully.");`;

const ERROR_CODE = `// Reusable error toast function
const showErrorToast = (toastApi, message) => {
  // Stays a bit longer so users can read the error
  toastApi.error(message, {
    title: "Error",
    duration: 4200,
  });
};

// Usage:
showErrorToast(toast, "Payment failed. Please try again.");`;

const POSITION_CODE = `// Reusable position controlled toast function
const showPositionToast = (toastApi, position) => {
  // Move toast container to the selected screen corner
  toastApi.setPosition(position);
  // Trigger a toast at the new position
  toastApi.info("Toast position updated to " + position, {
    title: "Position Control",
    duration: 2200,
  });
};

// Usage:
showPositionToast(toast, "bottom-left");`;

const Products = () => {
  const toastRef = useRef(null);
  const [position, setPosition] = useState("top-right");

  useEffect(() => {
    toastRef.current = createToastApi({ mountPoint: document.body, position: "top-right" });

    return () => {
      toastRef.current?.destroy();
      toastRef.current = null;
    };
  }, []);

  const showSuccessDemo = () => {
    toastRef.current?.success("Product added to cart successfully.", {
      title: "Success",
      duration: 2500,
    });
  };

  const showErrorDemo = () => {
    toastRef.current?.error("Purchase failed due to network issue.", {
      title: "Error",
      duration: 4200,
    });
  };

  const showPositionDemo = () => {
    if (!toastRef.current) return;
    toastRef.current.setPosition(position);
    toastRef.current.info(`Toast now appears at ${position}.`, {
      title: "Position Control",
      duration: 2200,
    });
  };

  return (
    <main className="page">
      <section className="hero">
        <h1>Products Toast Playground</h1>
        <p>
          Pure JavaScript toast framework demos. Click any live demo button to trigger
          a real toast, review the implementation below it, and copy the code instantly.
        </p>
      </section>

      <section className="position-panel">
        <label htmlFor="toast-position">Position for Position Control demo</label>
        <select
          id="toast-position"
          value={position}
          onChange={(event) => setPosition(event.target.value)}
        >
          <option value="top-right">top-right</option>
          <option value="top-left">top-left</option>
          <option value="bottom-right">bottom-right</option>
          <option value="bottom-left">bottom-left</option>
        </select>
      </section>

      <section className="code-grid">
        <CodeExampleCard
          title="Success Toast"
          description="Green confirmation alert with auto dismiss."
          explanation="Use this for completed actions like save, checkout, or profile updates."
          code={SUCCESS_CODE}
          onDemo={showSuccessDemo}
          showCodeInitially={false}
          revealCodeOnDemo
        />

        <CodeExampleCard
          title="Error Toast"
          description="Red alert for failed operations."
          explanation="Use this for API failures, form errors, or blocked purchase attempts."
          code={ERROR_CODE}
          onDemo={showErrorDemo}
        />

        <CodeExampleCard
          title="Position Control Toast"
          description="Move toast to any screen corner dynamically."
          explanation="Use this when screen layout changes and you need better visibility."
          code={POSITION_CODE}
          onDemo={showPositionDemo}
        />
      </section>
    </main>
  );
};

export default Products;
