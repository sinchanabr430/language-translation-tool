import { useState } from 'react';

/**
 * Copies given text to clipboard and shows brief "Copied!" feedback.
 */
function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      disabled={!text}
      className="text-xs font-medium text-slate-500 hover:text-indigo-600
                 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
    >
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}

export default CopyButton;