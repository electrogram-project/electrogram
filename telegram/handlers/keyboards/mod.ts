import { Composer } from "telegram/deps.ts";
import { MyContext } from "telegram/context.ts";
import suggestions from "telegram/handlers/keyboards/suggestions.ts";
import messages from "telegram/handlers/keyboards/messages.ts";

const composer = new Composer<MyContext>();

// Register commands
composer.use(suggestions);
composer.use(messages);

export default composer;
