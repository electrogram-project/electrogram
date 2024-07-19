type Props = {
  title: string;
  text: string;
};

function parseLinks(text: string) {
  return text.replace(
    /((https?:\/\/)?[\da-z.-]+\.[a-z.]{2,6}[\/\w .-]*\??[^\s]*)/g,
    "<a href='$1' target='_blank' rel='noopener noreferrer' class='italic decoration-pink-600 dark:decoration-pink-300 hover:underline'>$1</a>",
  );
}

export function FaqCard({ title, text }: Props) {
  text = parseLinks(text);
  return (
    <div className="space-y-4 my-2">
      <details className="group rounded-md shadow-md bg-slate-100 dark:bg-slate-700 p-4 [&_summary::-webkit-details-marker]:hidden">
        <summary className="flex cursor-pointer items-center justify-between gap-1.5">
          <h2 className="font-medium">
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
          className="mt-4 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: text }}
        >
        </p>
      </details>
    </div>
  );
}
