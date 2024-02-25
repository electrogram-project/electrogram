import { Handlers } from "$fresh/server.ts";
import { supabase } from "$utils/db.ts";
import { log } from "$grammy/logger.ts";

export const handler: Handlers = {
  /**
   * Handles a POST request and updates the user's password in Supabase.
   */
  async POST(req) {
    const { pwd, url } = await req.json();
    const params = new URLSearchParams(url.split("#")[1]);
    const access_token = params.get("access_token");
    const refresh_token = params.get("refresh_token");

    if (access_token && refresh_token) {
      supabase.auth
        .setSession({
          access_token,
          refresh_token,
        })
        .then(async (res) => {
          if (res.error) {
            console.error("Error msg:", res.error.message);
          }
          const { data, error } = await supabase.auth.updateUser({
            password: pwd,
          });
          if (error) {
            return new Response(`Error updating user: ${error.message}`, {
              status: 400,
            });
          }
          // log to the admin channel
          await log(`
${data.user.email} successfully set a password!
<i>${new Date().toISOString()}</i>`);
        });
    }
    const headers = new Headers();
    headers.set("location", "/");

    return new Response(null, {
      status: 303,
      headers,
    });
  },
};
