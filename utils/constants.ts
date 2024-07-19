export const TELEGRAM_BOT_TOKEN = getEnvOrThrow("TELEGRAM_BOT_TOKEN");
export const WEBAPP_URL = getEnvOrThrow("WEBAPP_URL");
export const ADMIN_GROUP_ID = getEnvOrThrow("ADMIN_GROUP_ID");
export const PUBLIC_GROUP_ID = getEnvOrThrow("PUBLIC_GROUP_ID");
export const MONGO_URI = getEnvOrThrow("MONGO_URI");

// Get an environment variable or throw an error if it's not set
export function getEnvOrThrow(name: string): string {
  const value = Deno.env.get(name) ?? "";
  if (value == "") {
    console.error(`Missing env variable: ${name}`);
  }
  return value;
}

// Check if the app is running in production
export const IS_PRODUCTION = !!(Deno.env.get("IS_PRODUCTION") === "true" ||
  typeof Deno.env.get("DENO_DEPLOYMENT_ID") !== "undefined");
