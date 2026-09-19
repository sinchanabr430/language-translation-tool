import { useState } from 'react';

/**
 * Text-to-speech button using the browser's built-in Web Speech API.
 * lang: BCP-47 language code (e.g. 'en-US', 'hi-IN') so pronunciation matches the language.
 */
function SpeakButton({ text, lang }) {
  const [speaking, setSpeaking] = useState(false);

  const isSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;

  const handleSpeak = () => {
    if (!isSupported || !text) return;

    // Stop any currently playing speech before starting a new one.
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang || 'en-US';
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  if (!isSupported) return null; // gracefully hide if browser doesn't support it

  return (
    <button
      type="button"
      onClick={handleSpeak}
      disabled={!text}
      title="Listen"
      aria-label="Read text aloud"
      className="text-slate-400 hover:text-indigo-600 disabled:opacity-30 disabled:cursor-not-allowed
                 transition-colors"
    >
      {speaking ? (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" strokeWidth="2" className="w-4 h-4 animate-pulse">
          <path strokeLinecap="round" strokeLinejoin="round"
                d="M11 5L6 9H2v6h4l5 4V5zM19 12a7 7 0 00-1.5-4.5M22 12a10 10 0 00-2-6" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" strokeWidth="2" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round"
                d="M11 5L6 9H2v6h4l5 4V5zM19 12a7 7 0 00-1.5-4.5M22 12a10 10 0 00-2-6" />
        </svg>
      )}
    </button>
  );
}

export default SpeakButton;