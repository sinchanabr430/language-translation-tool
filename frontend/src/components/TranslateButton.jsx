function TranslateButton({ onClick, disabled, loading }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="w-full sm:w-auto rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-medium text-white
                 hover:bg-indigo-700 active:bg-indigo-800
                 disabled:bg-slate-300 disabled:cursor-not-allowed
                 transition-colors"
    >
      {loading ? 'Translating...' : 'Translate'}
    </button>
  );
}

export default TranslateButton;