import { useState } from "react";

const CodeExampleCard = ({
  title,
  description,
  explanation,
  code,
  onDemo,
  demoLabel = "Live Demo",
  showCodeInitially = true,
  revealCodeOnDemo = false,
}) => {
  const [copied, setCopied] = useState(false);
  const [isCodeVisible, setIsCodeVisible] = useState(showCodeInitially);

  const handleDemoClick = () => {
    if (revealCodeOnDemo) {
      setIsCodeVisible(true);
    }
    onDemo?.();
  };

  const handleCopy = async () => {
    if (!isCodeVisible) return;

    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  };

  return (
    <article className="code-card">
      <h3>{title}</h3>
      <p className="muted">{description}</p>
      <p className="explain">{explanation}</p>
      <div className="btn-row">
        <button className="btn success" onClick={handleDemoClick}>
          {demoLabel}
        </button>
        <button className="btn ghost" onClick={handleCopy} disabled={!isCodeVisible}>
          {copied ? "Copied" : "Copy Code"}
        </button>
      </div>
      {isCodeVisible ? (
        <pre className="code-block">
          <code>{code}</code>
        </pre>
      ) : (
        <p className="explain">Click "{demoLabel}" to reveal the source code.</p>
      )}
    </article>
  );
};

export default CodeExampleCard;
