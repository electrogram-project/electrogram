import { Handlers } from "$fresh/server.ts";
import { logMessage } from "telegram/bot.ts";
import { escapeChars } from "utils/functions.ts";

export const handler: Handlers = {
  /**
   * Handles a POST request to add a new message to the database.
   */
  async POST(req) {
    const newData = await req.json();
    await logMessage(`
<pre><code>${escapeChars(JSON.stringify(newData, null, 2))}</code></pre>
<i>${(new Date()).toISOString()}</i>`);
    const headers = new Headers();
    headers.set("location", "/success");
    return new Response(null, {
      status: 303,
      headers,
    });
  },
};
