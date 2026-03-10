import { useToast } from "../context/ToastContext";

const POSITIONS = [
  "top-right",
  "top-left",
  "bottom-right",
  "bottom-left",
];

const Home = () => {
  const { toast, setPosition, position } = useToast();

  return (
    <main className="page">
      <section className="hero">
        <h1>Custom Notification Framework</h1>
        <p>
          Reusable toasts with success, error, warning, and info styles.
          Control placement globally from any page.
        </p>
      </section>

      <section className="panel">
        <h2>Toast Types</h2>
        <div className="btn-row">
          <button
            className="btn success"
            onClick={() => toast.success("Account saved successfully.")}
          >
            Success Toast
          </button>
          <button
            className="btn error"
            onClick={() =>
              toast.error("Unable to connect to server.", { duration: 4500 })
            }
          >
            Error Toast
          </button>
          <button
            className="btn warning"
            onClick={() =>
              toast.warning("Your session expires in 2 minutes.", {
                autoDismiss: false,
                title: "Warning",
              })
            }
          >
            Sticky Warning
          </button>
        </div>
      </section>

      <section className="panel">
        <h2>Position Control</h2>
        <div className="btn-row">
          {POSITIONS.map((item) => (
            <button
              key={item}
              className={`btn ghost ${position === item ? "active" : ""}`}
              onClick={() => {
                setPosition(item);
                toast.info(`Position changed to ${item}.`, { duration: 1800 });
              }}
            >
              {item}
            </button>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;
