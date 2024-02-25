export function SelectInput(
  { label, value, onInput, options, disabled }: {
    label: string;
    value: string;
    onInput: (value: string) => void;
    options: { value: string; label: string }[];
    disabled?: boolean;
  },
) {
  return (
    <div>
      {label !== "" && (
        <label className="text-sm font-medium text-gray-900">{label}:</label>
      )}
      <select
        value={value}
        onInput={(event) => onInput((event.target as HTMLSelectElement).value)}
        disabled={disabled}
        className="py-0 px-4 pr-7 rounded-md border-gray-400 enabled:bg-white enabled:shadow-sm enabled:shadow-gray-300 sm:text-sm m-1 disabled:bg-gray-200"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
