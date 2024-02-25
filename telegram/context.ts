import type { ParseModeFlavor } from "grammy_parse_mode";
import type { Context, SessionFlavor } from "./deps.ts";
import { I18nFlavor } from "grammy_i18n";

// Write session types
export interface GrammySession {
  id?: number;
  __language_code: string;
  step: ["b" | "m", string, string];
}

// Define the context type
export type GrammyContext =
  & Context
  & SessionFlavor<GrammySession>
  & I18nFlavor
  & ParseModeFlavor<Context>;
