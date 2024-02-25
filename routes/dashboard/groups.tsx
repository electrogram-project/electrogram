import { Handlers, PageProps } from "$fresh/server.ts";
import { ServerState } from "routes/_middleware.ts";
import GroupsPanel from "islands/GroupsPanel.tsx";

export const handler: Handlers = {
  GET(_req, ctx) {
    return ctx.render(ctx.state);
  },
};

export default function Home(props: PageProps<ServerState>) {
  const username = (props.data.user as string).split("@")[0];

  return (
    <div>
      <p className="text-left">
        In this page, the groups are listed. You can edit a group by clicking on
        the "Edit" button or delete it by clicking on the "Delete" button. Under
        the "delete groups" section, the deleted groups are listed. You can
        restore a group by clicking on the "Recover" button.
      </p>
      <GroupsPanel data={[]} username={username} />
    </div>
  );
}
