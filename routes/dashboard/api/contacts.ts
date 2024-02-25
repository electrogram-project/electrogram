import { Handlers } from "$fresh/server.ts";
import { Contact } from "$utils/db.ts";
import { log } from "$grammy/logger.ts";

export const handler: Handlers = {
  /**
   * Handles a GET request to get the messages from the database.
   */
  async GET(_req, _ctx) {
    const results = await Contact.find();
    return new Response(JSON.stringify(results));
  },

  /**
   * Handles a DELETE request to delete a message from the database and returns the updated collection.
   */
  async DELETE(req, _ctx) {
    const request = await req.json();
    const { body, username } = request;
    const deletedData = JSON.parse(body);
    const { __v, _id, ...deletedFaq } = deletedData;
    await Contact.findByIdAndDelete(_id);
    await log(`
Faq deleted by <b>${username}</b>:
<pre><code>${JSON.stringify(deletedFaq, null, 2)}</code></pre>
<i>${new Date().toISOString().toLocaleString()}</i>`);
    const results = await Contact.find();
    return new Response(JSON.stringify(results));
  },
};
