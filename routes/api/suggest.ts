import { Handlers } from "$fresh/server.ts";
import { Suggestion } from "$utils/db.ts";
import { log } from "$grammy/logger.ts";

export const handler: Handlers = {
  /**
   * Handles a POST request to add a new suggestion to the database.
   */
  async POST(req) {
    const newData = await req.json();
    newData.addedAt = new Date().toISOString();
    const newSuggestion = new Suggestion(newData);
    await newSuggestion.save();
    const { _id, __v, ...suggestionData } = newData;
    // log to the admin channel
    await log(`
New suggestion added:
<pre><code>${JSON.stringify(suggestionData, null, 2)}</code></pre>
<i>${suggestionData.addedAt}</i>`);
    const headers = new Headers();
    headers.set("location", "/suggest");

    return new Response(null, {
      status: 303, // See Other
      headers,
    });
  },
};
