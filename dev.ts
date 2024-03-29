#!/usr/bin/env -S deno run -A --watch=static/,routes/

import "$std/dotenv/load.ts";
import dev from "$fresh/dev.ts";
import "./bot.ts";
import config from "./fresh.config.ts";

const origConsoleError = console.error;
console.error = (msg) => {
  if (typeof msg === "string" && msg.includes("Improper nesting of table")) {
    return;
  }
  origConsoleError(msg);
};
await dev(import.meta.url, "./main.ts", config);
