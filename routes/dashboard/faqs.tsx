import { Handlers, PageProps } from "$fresh/server.ts";
import { ServerState } from "routes/_middleware.ts";
import FaqsPanel from "islands/FaqsPanel.tsx";

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
        In this page, the FAQs are listed. You can delete a FAQ by clicking on
        the "Delete" button. The FAQ are automatically added and updated from
        the telegram channel.
      </p>
      <FaqsPanel data={[]} username={username} />
    </div>
  );
}
