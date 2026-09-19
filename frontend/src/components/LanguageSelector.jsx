import { LANGUAGES } from '../constants/languages';

/**
 * Dropdown for selecting a language.
 * excludeAuto: hides "Detect Language" option (used for target dropdown).
 */
function LanguageSelector({ label, value, onChange, excludeAuto = false }) {
  const options = excludeAuto
    ? LANGUAGES.filter((lang) => lang.value !== 'auto')
    : LANGUAGES;

  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700
                   focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400
                   transition-colors"
      >
        {options.map((lang) => (
          <option key={lang.value} value={lang.value}>
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default LanguageSelector;