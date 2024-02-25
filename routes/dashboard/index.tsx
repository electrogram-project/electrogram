import type { Handlers, PageProps } from "$fresh/server.ts";
import { ServerState } from "routes/_middleware.ts";
import { Button } from "components/Button.tsx";
import AdminForm from "islands/AdminForm.tsx";

export const handler: Handlers = {
  GET(_req, ctx) {
    return ctx.render(ctx.state);
  },
};

export default function Home(props: PageProps<ServerState>) {
  return (
    <div>
      <AdminForm data={props.data} />
    </div>
  );
}
