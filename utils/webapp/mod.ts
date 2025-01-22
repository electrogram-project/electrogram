import { computed, signal } from "@preact/signals";
import { type Telegram, type WebAppInitData } from "utils/webapp/types.ts";

export const newWindow = globalThis as unknown as Window & { Telegram: Telegram };

const telegramWindow = signal<Telegram>(newWindow.Telegram);

const telegramWebApp = computed(() => telegramWindow.value?.WebApp);

export const webApp = telegramWebApp.value;

export const webAppData = signal<
  { safe: boolean; admin: boolean; user: WebAppInitData["user"] }
>({
  safe: false,
  admin: false,
  user: undefined,
});
