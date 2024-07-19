import { Handlers } from "$fresh/server.ts";
import { Groups } from "utils/db.ts";

export const handler: Handlers = {
  /**
   * Handles a GET request to get the groups from the database.
   */
  async GET(_req, _ctx) {
    const results = await Groups.find();
    return new Response(JSON.stringify(results));
  },
};
