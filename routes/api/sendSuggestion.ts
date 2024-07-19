import { Handlers } from "$fresh/server.ts";
import { Groups } from "utils/db.ts";
import { logSuggestion } from "telegram/bot.ts";
import { escapeChars } from "utils/functions.ts";

export const handler: Handlers = {
  /**
   * Handles a POST request to add a new suggestion to the database.
   */
  async POST(req) {
    const newData = await req.json();
    const newSuggestion = new Groups(newData);
    await newSuggestion.save();
    await logSuggestion(`
<pre><code>${escapeChars(JSON.stringify(newData, null, 2))}</code></pre>
<i>${new Date().toISOString()}</i>`);
    const headers = new Headers();
    headers.set("location", "/success");
    return new Response(null, {
      status: 303,
      headers,
    });
  },
};
