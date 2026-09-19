import { useState } from 'react';
import LanguageSelector from './components/LanguageSelector';
import SwapButton from './components/SwapButton';
import TextPanel from './components/TextPanel';
import TranslateButton from './components/TranslateButton';
import { LANGUAGES } from './constants/languages';

const BACKEND_URL = 'http://localhost:5000/api/translate';

function getSpeechCode(value) {
  const lang = LANGUAGES.find((l) => l.value === value);
  return lang ? lang.speechCode : 'en-US';
}

async function translateText(text, source, target) {
  const response = await fetch(BACKEND_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, source, target }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Translation failed. Please try again.');
  }

  return data.translatedText;
}

function App() {
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('hi');
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSwap = () => {
    if (sourceLang === 'auto') return;
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setInputText(outputText);
    setOutputText(inputText);
  };

  const handleTranslate = async () => {
    setError('');

    if (!inputText.trim()) {
      setError('Please enter some text to translate.');
      return;
    }

    setLoading(true);
    setOutputText('');
    try {
      const result = await translateText(inputText, sourceLang, targetLang);
      setOutputText(result);
    } catch (err) {
      setError(err.message || 'Translation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
    setError('');
    window.speechSynthesis.cancel();
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-start sm:items-center justify-center p-4 py-10">
      <div className="w-full max-w-3xl">
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-semibold text-slate-800">
            Language Translation Tool
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Translate text instantly between multiple languages.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 sm:p-6">
          <div className="flex items-end gap-2 mb-1">
            <LanguageSelector label="From" value={sourceLang} onChange={setSourceLang} />
            <SwapButton onClick={handleSwap} disabled={sourceLang === 'auto'} />
            <LanguageSelector
              label="To"
              value={targetLang}
              onChange={setTargetLang}
              excludeAuto
            />
          </div>

          {sourceLang === 'auto' && (
            <p className="text-xs text-amber-600 mb-3">
              Note: this API doesn't support auto-detection — text will be treated as English.
              For best accuracy, select the source language manually.
            </p>
          )}

          <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 ${sourceLang === 'auto' ? 'mt-2' : 'mt-4'}`}>
            <TextPanel
              label="Enter text"
              value={inputText}
              onChange={setInputText}
              placeholder="Type or paste text here..."
              langCode={getSpeechCode(sourceLang)}
            />
            <TextPanel
              label="Translation"
              value={outputText}
              readOnly
              loading={loading}
              langCode={getSpeechCode(targetLang)}
            />
          </div>

          {error && (
            <p className="mt-3 text-sm text-red-500" role="alert">
              {error}
            </p>
          )}

          <div className="mt-5 flex flex-col sm:flex-row items-center gap-3">
            <TranslateButton
              onClick={handleTranslate}
              disabled={loading || !inputText.trim()}
              loading={loading}
            />
            <button
              type="button"
              onClick={handleClear}
              className="text-sm text-slate-400 hover:text-slate-600 transition-colors"
            >
              Clear
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-slate-400 mt-4">
          Powered by MyMemory Translation API
        </p>
      </div>
    </div>
  );
}

export default App;