import { BsLink45Deg } from "react-icons/bs";
import { GroupType } from "islands/GroupsList.tsx";

export function GroupCard(data: GroupType) {
  const platform = data.url.includes("t.me")
    ? "Telegram"
    : data.url.includes("chat.whatsapp.com")
    ? "WhatsApp"
    : data.url.includes("discord.gg")
    ? "Discord"
    : "Other";

  return (
    <div className="flex flex-col justify-between h-full rounded-md shadow-md bg-slate-200 dark:bg-slate-800 p-4 sm:p-6">
      <div>
        <div className="text-center">
          <span
            style={{ paddingTop: "0.1em", paddingBottom: "0.1rem" }}
            className={`text-xs px-2 rounded-full ${
              data.status === "external"
                ? "bg-blue-200 text-blue-800"
                : data.status === "abandoned"
                ? "bg-red-200 text-red-800"
                : "bg-teal-200 text-teal-800"
            }`}
          >
            {data.status.charAt(0).toUpperCase() + data.status.slice(1)}
          </span>
          <div>
            <p className="text-xs">
              {data.degree === "m"
                ? "Master"
                : data.degree === "b"
                ? "Bachelor"
                : ""}
              {data.year === "0" ? "" : ": " + data.year + " year"}
              {data.year === "0" ? "" : " " + data.semester + " semester"}
            </p>
          </div>
        </div>
        <p className="font-bold mb-2 text-center">{data.name}</p>
      </div>
      <div className="text-center mt-4">
        <a
          className="font-semibold inline-flex items-center gap-1 hover:text-pink-600 dark:hover:text-pink-300"
          href={data.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <BsLink45Deg className="h-5 w-5" />
          {platform}
        </a>
      </div>
    </div>
  );
}
