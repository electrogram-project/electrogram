import { Composer } from "grammy";
import { GrammyContext } from "$grammy/context.ts";
import start from "$grammy/handlers/commands/start.ts";
import help from "$grammy/handlers/commands/help.ts";
import inline from "$grammy/handlers/commands/inline.ts";

const composer = new Composer<GrammyContext>();

// Register commands
composer.use(start);
composer.use(help);
composer.use(inline);

// Define informations about commands
export const listOfCommands: Array<{
  command: string;
  description: string;
  show: boolean;
}> = [
  { command: "start", description: "Start the bot.", show: true },
  { command: "help", description: "View help message.", show: true },
  { command: "inline", description: "Discover inline sintax.", show: true },
];

export default composer;
