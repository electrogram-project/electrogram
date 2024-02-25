import { FreshContext } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";
import { kv } from "$utils/db.ts";

export type ServerState = {
  user: string | null;
  error: { code: number; msg: string } | null;
};

/**
 * Handles the incoming request and performs authentication and authorization checks.
 * @param {Request} req - The incoming request object.
 * @param {FreshContext<ServerState>} ctx - The context object containing server state.
 * @returns {Promise<Response>} - The response object.
 */
export async function handler(
  req: Request,
  ctx: FreshContext<ServerState>,
): Promise<Response> {
  const url = new URL(req.url);
  const cookies = getCookies(req.headers);
  const access_token = cookies.auth;
  const protected_route = url.pathname.startsWith("/dashboard/");

  const headers = new Headers();
  headers.set("location", "/dashboard");

  if (protected_route && !access_token) {
    return new Response(null, { headers, status: 303 });
  }

  if (access_token) {
    const session = await kv.get(["access_token", access_token]);

    if (protected_route && !session.value) {
      return new Response(null, { headers, status: 303 });
    }

    if (session.value) {
      const user = JSON.parse(session.value!.toString())?.user.email;
      ctx.state.user = user;
    }
  }

  return await ctx.next();
}
