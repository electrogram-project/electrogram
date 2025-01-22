import GroupsList from "islands/GroupsList.tsx";
import { Alert, PageHead } from "components/mod.ts";

export default function Home() {
  return (
    <div>
      <PageHead
        title="Groups"
        text="This page lists all available groups. Use the search box to find a specific group."
      />
      <Alert text="These links are provided as they are and we have no control over them nor do we know their content. If any abuse occurs in a group, please send a message via the contact page to request its removal from the list." />
      <GroupsList />
      <div className="my-4 mx-4">
        <ul className="flex flex-col space-y-2 text-sm text-left">
          <li>
            <span
              style={{ paddingTop: "0.1em", paddingBottom: "0.1rem" }}
              className="flex-none text-xs px-2 rounded-full m-1 bg-teal-200 text-teal-800"
            >
              Managed
            </span>
            <span>
              The group is managed by someone we know.
            </span>
          </li>
          <li>
            <span
              style={{ paddingTop: "0.1em", paddingBottom: "0.1rem" }}
              className="flex-none text-xs px-2 rounded-full m-1 bg-blue-200 text-blue-800"
            >
              External
            </span>
            <span>
              The group is managed by someone we don't know.
            </span>
          </li>
          <li>
            <span
              style={{ paddingTop: "0.1em", paddingBottom: "0.1rem" }}
              className="flex-none text-xs px-2 rounded-full m-1 bg-red-200 text-red-800"
            >
              Abandoned
            </span>
            <span>
              The group is not managed by anyone as far as we know.
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
