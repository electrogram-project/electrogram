import { JSX } from "preact";
import { capitalize } from "components/mod.ts";

type Props = {
  label: string;
  type: string;
  placeholder: string;
  onInput: JSX.GenericEventHandler<HTMLInputElement>;
};

export function InputField({ label, type, placeholder, onInput }: Props) {
  return (
    <>
      <label className="text-sm font-medium text-gray-900">
        {capitalize(label)}:
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-fit py-1 px-4 pr-10 rounded-md border-gray-400 enabled:bg-white enabled:shadow-sm enabled:shadow-gray-300 sm:text-sm m-1 disabled:bg-gray-200"
        onInput={onInput}
      />
    </>
  );
}
