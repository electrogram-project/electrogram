import { Context } from "telegram/deps.ts";
import { I18nFlavor } from "grammy_i18n";
import { type ChatMembersFlavor } from "grammy_chatmembers";

// Define the context type
export type MyContext =
  & Context
  & I18nFlavor
  & ChatMembersFlavor;
