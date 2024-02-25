import IconExternalLink from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/external-link.tsx";

type Props = {
  name: string;
  description: string;
  url: string;
  date: string;
};

export function GroupCard({ name, description, url, date }: Props) {
  return (
    <section className="overflow-hidden rounded-md shadow-md shadow-zinc-300 transition m-2">
      <div className="bg-white p-4 sm:p-6">
        <p className="mt-0.5 line-clamp-3 text-xs italic text-gray-500">
          Added: {date}
        </p>
        <p className="mt-0.5 line-clamp-3 text-sm/relaxed text-gray-700">
          {description}
        </p>
        <h3 className="mt-0.5 text-lg text-gray-900 font-bold">{name}</h3>

        <div className="flex justify-start mt-4 gap-2">
          <p className="mt-0.5 line-clamp-3 text-sm/relaxed text-gray-500">
            Group URL:
          </p>
          <a className="flex items-center mr-2" href={url} target="_blank">
            <IconExternalLink className="h-5 w-5 text-blue-400 hover:text-blue-300" />
          </a>
        </div>
      </div>
    </section>
  );
}
