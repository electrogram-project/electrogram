import { supabase } from "$utils/db.ts";

Deno.cron("Hey, wake up!", "0 3 * * 1", async () => {
  await supabase.from("awake").select("*");
});
