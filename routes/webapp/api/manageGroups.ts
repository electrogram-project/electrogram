import { Handlers } from "$fresh/server.ts";
import { parse, validate } from "@telegram-apps/init-data-node/web";
import { Groups } from "utils/db.ts";
import { TELEGRAM_BOT_TOKEN } from "utils/constants.ts";
import { logMessage } from "telegram/bot.ts";
import { escapeChars } from "utils/functions.ts";

export const handler: Handlers = {
  /**
   * Handles a PUT request to modify an existing group in the database.
   */
  async PUT(req, _ctx) {
    const [authType, authData] = (req.headers.get("authorization") || "")
      .split(" ");
    switch (authType) {
      case "tma": {
        try {
          await validate(authData, TELEGRAM_BOT_TOKEN, {
            expiresIn: 3600,
          });
          const safeData = parse(authData);
          const newData = await req.json();
          newData.modifiedAt = new Date().toISOString();
          newData.modifiedBy = safeData.user?.id.toString();
          newData.deleted = false;
          const { _id, __v, ...modifiedGroup } = newData;
          await Groups.findByIdAndUpdate(_id, modifiedGroup);
          await logMessage(
            `
Group modified by <b>${modifiedGroup.modifiedBy}</b>:
<pre><code>${escapeChars(JSON.stringify(modifiedGroup, null, 2))}</code></pre>
<i>${new Date().toISOString()}</i>`,
            true,
          );
          return new Response(null, { status: 200 });
        } catch {
          return new Response(JSON.stringify("Unauthorized"), { status: 401 });
        }
      }
      default:
        return new Response(JSON.stringify("Unauthorized"), { status: 401 });
    }
  },

  /**
   * Handles a POST request to mark an existing group as deleted in the database.
   */
  async POST(req, _ctx) {
    const [authType, authData] = (req.headers.get("authorization") || "")
      .split(" ");
    switch (authType) {
      case "tma": {
        try {
          await validate(authData, TELEGRAM_BOT_TOKEN, {
            expiresIn: 3600,
          });
          const safeData = parse(authData);
          const newData = await req.json();
          newData.modifiedAt = new Date().toISOString();
          newData.modifiedBy = safeData.user?.id.toString();
          newData.deleted = true;
          const { _id, __v, ...modifiedGroup } = newData;
          await Groups.findByIdAndUpdate(_id, modifiedGroup);
          await logMessage(
            `
Group marked as deleted by <b>${modifiedGroup.modifiedBy}</b>:
<pre><code>${escapeChars(JSON.stringify(modifiedGroup, null, 2))}</code></pre>
<i>${new Date().toISOString()}</i>`,
          );
          return new Response(null, { status: 200 });
        } catch {
          return new Response(JSON.stringify("Unauthorized"), { status: 401 });
        }
      }
      default:
        return new Response(JSON.stringify("Unauthorized"), { status: 401 });
    }
  },

  /**
   * Handles a DELETE request to delete a group from the database.
   */
  async DELETE(req, _ctx) {
    const [authType, authData] = (req.headers.get("authorization") || "")
      .split(" ");
    switch (authType) {
      case "tma": {
        try {
          await validate(authData, TELEGRAM_BOT_TOKEN, {
            expiresIn: 3600,
          });
          const newData = await req.json();
          const { _id, __v, ...deletedGroup } = newData;
          await Groups.findByIdAndDelete(_id);
          await logMessage(
            `
Group deleted permanently by <b>${deletedGroup.modifiedBy}</b>:
<pre><code>${escapeChars(JSON.stringify(deletedGroup, null, 2))}</code></pre>
<i>${new Date().toISOString()}</i>`,
          );
          return new Response(null, { status: 200 });
        } catch {
          return new Response(JSON.stringify("Unauthorized"), { status: 401 });
        }
      }
      default:
        return new Response(JSON.stringify("Unauthorized"), { status: 401 });
    }
  },
};
