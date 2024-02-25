import { JSX } from "preact";
import IconSearch from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/search.tsx";

export function SearchBox({
  text,
  value,
  onInput,
}: {
  text: string;
  value: string;
  onInput: JSX.GenericEventHandler<HTMLInputElement>;
}) {
  return (
    <div className="flex items-center justify-center">
      <div className="relative my-2 mt-3">
        <label htmlFor="Search" className="sr-only">Search</label>
        <input
          type="text"
          id="Search"
          value={value}
          placeholder={text}
          className="w-full sm:w-auto py-1 px-4 pr-10 rounded-md border-gray-400 shadow-sm shadow-zinc-300 sm:text-sm"
          onInput={onInput}
        />
        <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
          <button type="button" className="text-gray-300 hover:text-gray-600">
            <span className="sr-only">Search</span>
            <IconSearch />
          </button>
        </span>
      </div>
    </div>
  );
}
