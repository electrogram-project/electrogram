import GroupsDir from "islands/GroupsDir.tsx";
import { PageHead } from "components/mod.ts";

export default function Home() {
  return (
    <div>
      <PageHead
        title="Groups"
        text="This page lists all available groups. Use the search box to find a specific group."
      />
      <p className="italic">
        ⚠️These links are provided as they are and we have no control over the
        groups nor do we know their content. If any abuse occurs in a group,
        please send a message via the contact page to request its removal from
        the list.
      </p>
      <GroupsDir />
    </div>
  );
}
