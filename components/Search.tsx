import { JSX } from "preact";

export function Search({
  text,
  value,
  onInput,
}: {
  text: string;
  value: string;
  onInput: JSX.GenericEventHandler<HTMLInputElement>;
}) {
  return (
    <div className="flex items-center justify-center mb-4 mt-2">
      <div className="w-48">
        <label htmlFor="Search" className="sr-only">Search</label>
        <input
          type="text"
          id="Search"
          value={value}
          placeholder={text}
          onInput={onInput}
          className="w-full rounded-lg bg-slate-100 dark:bg-slate-700 border-0 py-2.5 pe-10 sm:text-sm"
        />
      </div>
    </div>
  );
}
