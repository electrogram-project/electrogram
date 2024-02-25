import { Handlers } from "$fresh/server.ts";
import { setCookie } from "$std/http/cookie.ts";
import { supabase } from "$utils/db.ts";
import { log } from "$grammy/logger.ts";

export const handler: Handlers = {
  /**
   * Handles a POST request for user authentication and redirects to the dashboard on success.
   */
  async POST(req) {
    const url = new URL(req.url);
    const { email, password } = await req.json();
    const headers = new Headers();
    headers.set("location", "/dashboard");

    const {
      data: { user, session },
      error,
    } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error != null || user == null || session == null) {
      return new Response(null, { status: 500 });
    }

    setCookie(headers, {
      name: "auth",
      value: session.access_token,
      maxAge: session.expires_in,
      sameSite: "Lax",
      domain: url.hostname,
      path: "/",
      secure: true,
    });

    // log to the admin channel
    await log(`
${email} successfully logged in!
<i>${new Date().toISOString()}</i>`);

    return new Response(null, {
      status: 303,
      headers,
    });
  },
};
