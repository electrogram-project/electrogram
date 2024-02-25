import { Handlers, PageProps } from "$fresh/server.ts";
import { ServerState } from "routes/_middleware.ts";
import SuggestionsPanel from "islands/SuggestionsPanel.tsx";

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
        In this page, the suggestions submitted from the users are listed. You
        can approve a suggestion by clicking on the "Approve" button or reject
        it by clicking on the "Reject" button. When you click on the "Approve"
        button, it's given the possibility to edit the suggestion before
        finalizing the approval.
      </p>
      <SuggestionsPanel data={[]} username={username} />
    </div>
  );
}
