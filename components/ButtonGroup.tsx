type Props = {
  button: { text: string; onClick: () => void; disabled?: boolean }[];
};

export function ButtonGroup({ button }: Props) {
  return (
    <span className="inline-flex overflow-hidden rounded-md border-gray-400 shadow-sm shadow-zinc-300 bg-white">
      {button.map((item) => (
        <button
          className="inline-block px-4 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative disabled:opacity-75"
          onClick={item.onClick}
          disabled={item.disabled}
        >
          {item.text}
        </button>
      ))}
    </span>
  );
}
