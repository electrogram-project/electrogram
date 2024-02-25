import { Handlers } from "$fresh/server.ts";
import { Contact } from "$utils/db.ts";
import { log } from "$grammy/logger.ts";

export const handler: Handlers = {
  /**
   * Handles a POST request to add a new message to the database.
   */
  async POST(req) {
    const newData = await req.json();
    newData.addedAt = new Date().toISOString();
    const newContact = new Contact(newData);
    await newContact.save();
    const { _id, __v, name, ...contactData } = newData;
    // log to the admin channel
    await log(`
New message recieved from ${name}:
<pre><code>${JSON.stringify(contactData, null, 2)}</code></pre>
<i>${contactData.addedAt}</i>`);
    const headers = new Headers();
    headers.set("location", "/suggest");

    return new Response(null, {
      status: 303, // See Other
      headers,
    });
  },
};
