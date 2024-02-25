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
      className="px-3 py-1.5 my-2 rounded bg-slate-700 text-sm text-white font-medium hover:bg-slate-600 disabled:opacity-75"
    >
      {text}
    </button>
  );
}
