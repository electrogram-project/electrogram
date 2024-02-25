import { Handlers } from "$fresh/server.ts";
import { Faq } from "$utils/db.ts";
import { log } from "$grammy/logger.ts";

export const handler: Handlers = {
  /**
   * Handles a DELETE request to delete a FAQ from the database and returns the updated collection.
   */
  async DELETE(req, _ctx) {
    const request = await req.json();
    const { body, username } = request;
    const deletedData = JSON.parse(body);
    // deno-lint-ignore no-unused-vars
    const { __v, _id, text, chat, ...deletedFaq } = deletedData;
    await Faq.findByIdAndDelete(_id);
    // log to the admin channel
    await log(`
Faq deleted by <b>${username}</b>:
<pre><code>${JSON.stringify(deletedFaq, null, 2)}</code></pre>
<i>${new Date().toISOString().toLocaleString()}</i>`);
    const results = await Faq.find();
    return new Response(JSON.stringify(results));
  },
};
