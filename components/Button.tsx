type Props = {
  text: string;
  type?: string;
  disabled?: boolean;
};

export function Button({ text, type = "button", disabled }: Props) {
  return (
    <button
      type={type}
      disabled={disabled}
      className="px-3 py-1.5 my-2 rounded text-sm font-extrabold text-slate-200 bg-slate-900 hover:bg-pink-600 dark:(hover:bg-pink-300 text-slate-800 bg-slate-100) disabled:opacity-75"
    >
      {text}
    </button>
  );
}
