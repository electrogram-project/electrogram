import { Chat, MessageEntity, User } from "$grammy/deps.ts";
import { Faq } from "$utils/schemas.ts";

/**
 * Retrieves the full name from the specified user object.
 *
 * @param {Pick<User, "first_name" | "last_name">} from - The user object containing the first name and last name.
 * @returns {string} - The full name of the user.
 */
export function getFullName(
  from: Pick<User, "first_name" | "last_name">,
): string {
  return from.last_name
    ? `${from.first_name} ${from.last_name}`
    : from.first_name;
}

/**
 * Parses the given text and replaces specific entities with HTML tags.
 *
 * @param {string} text - The text to be parsed.
 * @param {MessageEntity[] | undefined} [entities] - The entities to be replaced with HTML tags.
 * @returns {string} - The parsed text with HTML tags.
 */
export function getParseHTML(
  text: string,
  entities: MessageEntity[] | undefined,
): string {
  let parsed_text = text;
  if (entities) {
    entities.reverse().forEach((entity: MessageEntity) => {
      const entityValue = text.substring(
        entity.offset,
        entity.offset + entity.length,
      );
      switch (entity.type) {
        case "bold":
          parsed_text = parsed_text.slice(0, entity.offset) +
            `<b>${entityValue}</b>` +
            parsed_text.slice(entity.offset + entity.length);
          break;
        case "italic":
          parsed_text = parsed_text.slice(0, entity.offset) +
            `<i>${entityValue}</i>` +
            parsed_text.slice(entity.offset + entity.length);
          break;
        case "code":
          parsed_text = parsed_text.slice(0, entity.offset) +
            `<code>${entityValue}</code>` +
            parsed_text.slice(entity.offset + entity.length);
          break;
        case "pre":
          parsed_text = parsed_text.slice(0, entity.offset) +
            `<pre>${entityValue}</pre>` +
            parsed_text.slice(entity.offset + entity.length);
          break;
        case "text_link":
          parsed_text = parsed_text.slice(0, entity.offset) +
            `<a href="${entity.url}"  target="_blank">${entityValue}</a>` +
            parsed_text.slice(entity.offset + entity.length);
          break;
      }
    });
  }
  parsed_text = parsed_text.replace(/\n/g, "<br>");
  return parsed_text;
}

/**
 * Creates a FAQ entry object.
 *
 * @param {number} message_id - The ID of the message.
 * @param {Chat.ChannelChat} chat - The channel chat object.
 * @param {string} parsed_text - The parsed text of the FAQ entry.
 * @param {string} text - The original text of the FAQ entry.
 * @returns {Faq} - The created FAQ entry object.
 */
export function createFaqEntry(
  message_id: number,
  chat: Chat.ChannelChat,
  parsed_text: string,
  text: string,
): Faq {
  const lines = text.split("\n").filter((line) => line.trim() !== "");
  const title = text.split("\n")[0];
  const preview = lines.slice(1).join("\n").substring(0, 50) + "...";
  const url = chat
    ? `https://t.me/${
      chat.username || `c/${chat.id.toString().substring(4)}`
    }/${message_id}`
    : "";

  return {
    message_id,
    text: parsed_text.split("<br>").slice(1).join("<br>"),
    title,
    preview,
    url,
    chat,
  };
}
