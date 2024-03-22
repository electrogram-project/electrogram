import "$std/dotenv/load.ts";
import { start } from "$fresh/server.ts";
import manifest from "./fresh.gen.ts";
import config from "./fresh.config.ts";
import { supabase } from "$utils/db.ts";

Deno.cron("KeepAwake", "0 3 * * 1", async () => {
  await supabase.from("awake").select("*");
});

await start(manifest, config);
