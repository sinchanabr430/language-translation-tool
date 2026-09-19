/**
 * Button to swap source and target languages.
 * Disabled when source is "auto" since you can't swap into "detect".
 */
function SwapButton({ onClick, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={disabled ? "Can't swap when source is set to Detect Language" : 'Swap languages'}
      aria-label="Swap source and target languages"
      className="mt-5 shrink-0 rounded-full border border-slate-200 bg-white p-2
                 text-slate-500 hover:text-indigo-600 hover:border-indigo-300
                 disabled:opacity-30 disabled:cursor-not-allowed
                 transition-colors"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round"
              d="M7 16V4M7 4L3 8M7 4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" />
      </svg>
    </button>
  );
}

export default SwapButton;