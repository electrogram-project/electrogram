import { Handlers } from "$fresh/server.ts";
import { Group, Suggestion } from "$utils/db.ts";
import { announce, log } from "$grammy/logger.ts";

export const handler: Handlers = {
  /**
   * Handles a GET request to get the suggestions from the database.
   */
  async GET(_req, _ctx) {
    const results = await Suggestion.find();
    return new Response(JSON.stringify(results));
  },

  /**
   * Handles a PUT request to mark an existing suggestion as approved in the database.
   */
  async PUT(req, _ctx) {
    const request = await req.json();
    const { body, username } = request;
    const editedData = JSON.parse(body);
    editedData.approvedBy = username;
    editedData.approvedAt = new Date().toISOString();
    const { _id, ...editedSuggestion } = editedData;
    await Suggestion.findByIdAndUpdate(_id, editedSuggestion);
    const { __v, ...SuggestionData } = editedSuggestion;
    // log to the admin channel
    await log(`
Suggestion approved by <b>${SuggestionData.approvedBy}</b>:
<pre><code>${JSON.stringify(SuggestionData, null, 2)}</code></pre>
<i>${SuggestionData.approvedAt.toLocaleString()}</i>`);
    // announce to the public channel
    await announce(`
New group <a href='${SuggestionData.url}'>${SuggestionData.name}</a> added to the database! 🎉`);
    editedData.addedBy = SuggestionData.approvedBy;
    editedData.addedAt = SuggestionData.approvedAt;
    const newGroup = new Group(editedData);
    await newGroup.save();
    const results = await Suggestion.find();
    return new Response(JSON.stringify(results));
  },

  /**
   * Handles a DELETE request to mark an existing suggestion as rejected in the database.
   */
  async DELETE(req, _ctx) {
    const request = await req.json();
    const { body, username } = request;
    const editedData = JSON.parse(body);
    editedData.rejectedBy = username;
    editedData.rejectedAt = new Date().toISOString();
    const { _id, ...editedSuggestion } = editedData;
    await Suggestion.findByIdAndUpdate(_id, editedSuggestion);
    const { __v, ...SuggestionData } = editedSuggestion;
    // log to the admin channel
    await log(`
Suggestion rejected by <b>${SuggestionData.rejectedBy}</b>:
<pre><code>${JSON.stringify(SuggestionData, null, 2)}</code></pre>
<i>${SuggestionData.rejectedAt.toLocaleString()}</i>`);
    const results = await Suggestion.find();
    return new Response(JSON.stringify(results));
  },
};
