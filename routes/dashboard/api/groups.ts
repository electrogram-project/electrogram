import { Handlers } from "$fresh/server.ts";
import { Group } from "$utils/db.ts";
import { announce, log } from "$grammy/logger.ts";

export const handler: Handlers = {
  /**
   * Handles a POST request to add a new group to the database.
   */
  async POST(req, _ctx) {
    const request = await req.json();
    const { body, username } = request;
    const newData = JSON.parse(body);
    newData.addedBy = username;
    newData.addedAt = new Date().toISOString();
    const newGroup = new Group(newData);
    await newGroup.save();
    const { _id, __v, ...groupData } = newData;
    // log to the admin channel
    await log(`
New group added by <b>${groupData.addedBy}</b>:
<pre><code>${JSON.stringify(groupData, null, 2)}</code></pre>
<i>${groupData.addedAt.toLocaleString()}</i>`);
    // announce to the public channel
    await announce(`
New group <a href='${groupData.url}'>${groupData.name}</a> added to the database! 🎉`);
    const results = await Group.find();
    return new Response(JSON.stringify(results));
  },

  /**
   * Handles a PUT request to modify an existing group in the database.
   */
  async PUT(req, _ctx) {
    const request = await req.json();
    const { body, username } = request;
    const editedData = JSON.parse(body);
    editedData.editedBy = username;
    editedData.editedAt = new Date().toISOString();
    editedData.deletedBy = "";
    editedData.deletedAt = null;
    const { _id, ...editedGroup } = editedData;
    await Group.findByIdAndUpdate(_id, editedGroup);
    const { __v, ...groupData } = editedGroup;
    // log to the admin channel
    await log(`
Group modified by <b>${groupData.editedBy}</b>:
<pre><code>${JSON.stringify(groupData, null, 2)}</code></pre>
<i>${groupData.editedAt.toLocaleString()}</i>`);
    const results = await Group.find();
    return new Response(JSON.stringify(results));
  },

  /**
   * Handles a DELETE request to mark an existing group as deleted in the database.
   */
  async DELETE(req, _ctx) {
    const request = await req.json();
    const { body, username } = request;
    const deletedData = JSON.parse(body);
    deletedData.deletedBy = username;
    deletedData.deletedAt = new Date().toISOString();
    const { _id, ...deletedGroup } = deletedData;
    await Group.findByIdAndUpdate(_id, deletedGroup);
    const { __v, ...groupData } = deletedGroup;
    // log to the admin channel
    await log(`
Group deleted by <b>${groupData.deletedBy}</b>:
<pre><code>${JSON.stringify(groupData, null, 2)}</code></pre>
<i>${groupData.deletedAt.toLocaleString()}</i>`);
    const results = await Group.find();
    return new Response(JSON.stringify(results));
  },
};
