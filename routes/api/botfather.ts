import { FreshContext } from "$fresh/server.ts";
import { webhookCallback } from "telegram/deps.ts";
import { bot } from "telegram/bot.ts";
import { IS_PRODUCTION, TELEGRAM_BOT_TOKEN } from "utils/constants.ts";

let handleUpdate: (req: Request) => Promise<Response>;

if (IS_PRODUCTION) {
  handleUpdate = webhookCallback(bot!, "std/http");
}

export const handler = async (req: Request, _ctx: FreshContext) => {
  try {
    const url = new URL(req.url);

    if (url.searchParams.get("token") !== TELEGRAM_BOT_TOKEN) {
      return new Response("Unauthorized", { status: 401 });
    }

    return await handleUpdate(req);
  } catch (e) {
    console.error(e);
  }
};
