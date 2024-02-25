import { Composer, session as grammySession } from "$grammy/deps.ts";
import { GrammyContext, GrammySession } from "$grammy/context.ts";
import { DenoKVAdapter } from "grammy_denokv";
import { kv } from "$utils/db.ts";

const session = new Composer<GrammyContext>();

session.use(
  grammySession({
    initial: (): GrammySession => ({
      __language_code: "it",
      step: ["b", "0", "0"],
    }),
    getSessionKey: (ctx) =>
      `enc:${ctx.chat?.id.toString()}_${ctx.from?.id?.toString()}`,
    storage: new DenoKVAdapter(kv),
  }),
);
export default session;
