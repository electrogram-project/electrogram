#!/usr/bin/env -S deno run -A --watch=static/,routes/

import "$std/dotenv/load.ts";
import dev from "$fresh/dev.ts";
import config from "./fresh.config.ts";
import "./bot.ts";

import "$std/dotenv/load.ts";

await dev(import.meta.url, "./main.ts", config);
