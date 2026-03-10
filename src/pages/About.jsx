import CodeExampleCard from "../components/CodeExampleCard";
import { useToast } from "../context/ToastContext";

const REACT_PROVIDER_CODE = `// ToastProvider gives global toast state to the app
import { ToastProvider } from "./context/ToastContext";
import ToastContainer from "./components/ToastContainer";

export default function AppShell() {
  return (
    <ToastProvider>
      <ToastContainer />
      {/* App routes/components */}
    </ToastProvider>
  );
}`;

const REACT_USAGE_CODE = `// Reusable React hook usage in any component
import { useToast } from "../context/ToastContext";

export default function SaveButton() {
  const { toast } = useToast();

  const handleSave = async () => {
    // Show success or error based on result
    toast.success("Record saved.");
    // toast.error("Save failed.");
  };

  return <button onClick={handleSave}>Save</button>;
}`;

const REACT_POSITION_CODE = `// React position control
import { useToast } from "../context/ToastContext";

export default function PositionController() {
  const { setPosition, toast } = useToast();

  const updatePosition = (nextPosition) => {
    // top-right | top-left | bottom-right | bottom-left
    setPosition(nextPosition);
    toast.info("Position changed to " + nextPosition);
  };

  return (
    <button onClick={() => updatePosition("bottom-left")}>
      Move Toast
    </button>
  );
}`;

const About = () => {
  const { toast, setPosition } = useToast();

  return (
    <main className="page">
      <section className="hero">
        <h1>React Version of the Toast Framework</h1>
        <p>
          This section shows reusable React components equivalent to the pure JavaScript
          framework. Each block includes commented source and a live action.
        </p>
      </section>

      <section className="code-grid">
        <CodeExampleCard
          title="React Provider Setup"
          description="Mount once to enable toasts throughout your website."
          explanation="Place provider + container at app root to get global notifications."
          code={REACT_PROVIDER_CODE}
          onDemo={() => toast.success("React provider demo toast fired.")}
          demoLabel="Live Demo"
        />
        <CodeExampleCard
          title="React Hook Usage"
          description="Use the `useToast` hook inside components."
          explanation="Call `toast.success` or `toast.error` from any page-level action."
          code={REACT_USAGE_CODE}
          onDemo={() => toast.error("React hook demo error toast.", { duration: 3000 })}
          demoLabel="Live Demo"
        />
        <CodeExampleCard
          title="React Position Control"
          description="Change toast corner globally in one function."
          explanation="Position state lives in context and updates the shared container."
          code={REACT_POSITION_CODE}
          onDemo={() => {
            setPosition("bottom-left");
            toast.info("React position switched to bottom-left.", { duration: 2200 });
          }}
          demoLabel="Live Demo"
        />
      </section>
    </main>
  );
};

export default About;
