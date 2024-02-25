import { Handlers, PageProps } from "$fresh/server.ts";
import { ServerState } from "routes/_middleware.ts";
import MessagesPanel from "islands/MessagesPanel.tsx";

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
        In this page, the messages are listed. You can delete a message by
        clicking on the "Delete" button. Note that deletion is permanent for
        messages.
      </p>
      <MessagesPanel data={[]} username={username} />
    </div>
  );
}
