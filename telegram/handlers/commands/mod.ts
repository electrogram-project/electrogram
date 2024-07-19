import { Composer } from "telegram/deps.ts";
import { MyContext } from "telegram/context.ts";
import start from "telegram/handlers/commands/start.ts";
import help from "telegram/handlers/commands/help.ts";
import inline from "telegram/handlers/commands/inline.ts";
import privacy from "telegram/handlers/commands/privacy.ts";
import admin from "telegram/handlers/commands/admin.ts";
const composer = new Composer<MyContext>();

// Register commands
composer.use(start);
composer.use(help);
composer.use(inline);
composer.use(privacy);
composer.use(admin);

// Define informations about commands
export const listOfCommands: Array<{
  command: string;
  description: string;
  show: boolean;
}> = [
  { command: "start", description: "Start the bot.", show: true },
  { command: "help", description: "Show the help message.", show: true },
  { command: "inline", description: "Explain the inline sintax.", show: true },
  { command: "privacy", description: "Show the privacy policy.", show: true },
  { command: "admin", description: "Open the admin dashboard.", show: true },
];

export default composer;
