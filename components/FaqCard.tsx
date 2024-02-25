type Props = {
  title: string;
  text: string;
};

export function FaqCard({ title, text }: Props) {
  return (
    <div className="m-2">
      <details className="group bg-gray-50 p-4 [&_summary::-webkit-details-marker]:hidden rounded-md shadow-md shadow-zinc-300 transition m-2">
        <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900">
          <h2 className="text-left font-bold">
            {title}
          </h2>
          <svg
            className="h-5 w-5 shrink-0 transition duration-300 group-open:-rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </summary>
        <p
          className="mt-4 leading-relaxed text-gray-700"
          dangerouslySetInnerHTML={{ __html: text }}
        >
        </p>
      </details>
    </div>
  );
}
