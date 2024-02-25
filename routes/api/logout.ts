import { Handlers } from "$fresh/server.ts";
import { deleteCookie, getCookies } from "$std/http/cookie.ts";
import { kv } from "$utils/db.ts";

export const handler: Handlers = {
  /**
   * Handles a GET request for user logout and redirects to the dashboard.
   */
  async GET(req) {
    const url = new URL(req.url);
    const headers = new Headers(req.headers);

    const cookies = getCookies(req.headers);
    const access_token = cookies.auth;

    if (access_token) {
      await kv.delete(["access_token", access_token]);
    }

    deleteCookie(headers, "auth", { path: "/", domain: url.hostname });

    headers.set("location", "/dashboard");

    return new Response(null, {
      status: 302,
      headers,
    });
  },
};
