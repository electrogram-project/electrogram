export const WEBAPP_URL = getEnvOrThrow("WEBAPP_URL");
export const TELEGRAM_BOT_TOKEN = getEnvOrThrow("TELEGRAM_BOT_TOKEN");
export const MONGO_URI = getEnvOrThrow("MONGO_URI");
export const SUPABASE_URL = getEnvOrThrow("SUPABASE_URL");
export const SUPABASE_KEY = getEnvOrThrow("SUPABASE_KEY");
export const ADMIN_CHANNEL_ID = getEnvOrThrow("ADMIN_CHANNEL_ID");
export const PUBLIC_CHANNEL_ID = getEnvOrThrow("PUBLIC_CHANNEL_ID");
export const FAQ_CHANNEL_IDS = getEnvOrThrow("FAQ_CHANNEL_IDS");

/**
 * Retrieves the value of the specified environment variable.
 * Throws an error if the environment variable is missing.
 *
 * @param {string} name - The name of the environment variable.
 * @returns {string} - The value of the environment variable.
 * @throws {Error} - If the environment variable is missing.
 */
export function getEnvOrThrow(name: string): string {
  const value = Deno.env.get(name) ?? "";
  if (value == "") {
    console.error(`Missing env variable: ${name}`);
  }
  return value;
}

export const IS_PRODUCTION = Deno.env.get("IS_PRODUCTION") === "true" ||
  typeof Deno.env.get("DENO_DEPLOYMENT_ID") !== "undefined";
export const IS_DEVELOPMENT = !IS_PRODUCTION;
