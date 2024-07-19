import { JSX } from "preact";
import { BsSearch } from "react-icons/bs";

export function SearchWebApp({
  text,
  value,
  onInput,
  onButtonClick,
}: {
  text: string;
  value: string;
  onInput: JSX.GenericEventHandler<HTMLInputElement>;
  onButtonClick: () => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-center mb-4 mt-2">
        <div className="w-48">
          <label htmlFor="Search" className="sr-only">Search</label>
          <input
            type="text"
            id="Search"
            value={value}
            onInput={onInput}
            placeholder={text}
            className="w-full rounded-lg border-0 py-2.5 pe-10 sm:text-sm"
          />
        </div>
        <>
          <button
            className="h-10 w-10 flex items-center justify-center ml-2 p-2"
            onClick={onButtonClick}
          >
            <BsSearch className="h-5 w-5" />
          </button>
        </>
      </div>
    </div>
  );
}
