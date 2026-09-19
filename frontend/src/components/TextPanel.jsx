import CopyButton from './CopyButton';
import SpeakButton from './SpeakButton';

const MAX_CHARS = 500;

/**
 * Reusable panel for either text input (editable) or translation output (read-only).
 * langCode: BCP-47 code used for text-to-speech pronunciation.
 */
function TextPanel({
  label,
  value,
  onChange,
  placeholder,
  readOnly = false,
  loading = false,
  maxLength = MAX_CHARS,
  langCode = 'en-US',
}) {
  return (
    <div className="flex flex-col w-full h-56 rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
          {label}
        </span>
        <div className="flex items-center gap-3">
          <SpeakButton text={value} lang={langCode} />
          {readOnly && value && <CopyButton text={value} />}
        </div>
      </div>

      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <span className="flex gap-1">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce [animation-delay:-0.3s]" />
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce [animation-delay:-0.15s]" />
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" />
          </span>
        </div>
      ) : readOnly ? (
        <p className="flex-1 overflow-y-auto text-sm text-slate-700 whitespace-pre-wrap">
          {value || <span className="text-slate-300">Translation will appear here</span>}
        </p>
      ) : (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          aria-label={label}
          className="flex-1 resize-none text-sm text-slate-700 placeholder-slate-300
                     focus:outline-none"
        />
      )}

      {!readOnly && (
        <div className="text-right text-xs text-slate-400 mt-1">
          {value.length}/{maxLength}
        </div>
      )}
    </div>
  );
}

export default TextPanel;