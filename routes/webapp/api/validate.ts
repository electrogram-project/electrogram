import { FreshContext } from "$fresh/server.ts";
import { parse, validate } from "@telegram-apps/init-data-node/web";
import { bot } from "telegram/bot.ts";
import { ADMIN_GROUP_ID, TELEGRAM_BOT_TOKEN } from "utils/constants.ts";

export const handler = async (
  req: Request,
  _ctx: FreshContext,
): Promise<Response> => {
  const [authType, authData] = (req.headers.get("authorization") || "")
    .split(" ");
  switch (authType) {
    case "tma": {
      try {
        await validate(authData, TELEGRAM_BOT_TOKEN, {
          expiresIn: 3600,
        });
        const safeData = parse(authData);
        const admins = await bot.api.getChatAdministrators(ADMIN_GROUP_ID);
        const isAdmin = admins.some((admin) =>
          admin.user.id === safeData.user?.id
        );
        return new Response(
          JSON.stringify({ safe: true, admin: isAdmin, data: safeData }),
          {
            status: 200,
          },
        );
      } catch {
        return new Response(JSON.stringify("Unauthorized"), { status: 401 });
      }
    }
    default:
      return new Response(JSON.stringify("Unauthorized"), { status: 401 });
  }
};
