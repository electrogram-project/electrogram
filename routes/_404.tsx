import { Button } from "components/mod.ts";
import { BsEmojiDizzyFill } from "react-icons/bs";

export default function NotFound() {
  return (
    <div>
      <div className="mt-4">
        <h1 className="text-4xl font-bold text-left text-pink-600 dark:text-pink-300">
          <BsEmojiDizzyFill className="inline mr-2 mb-2" />404
        </h1>

        <p className="mt-2 italic">
          Oh no! We can't find that page.
        </p>

        <a href="/">
          <Button text="Go home" />
        </a>
      </div>
    </div>
  );
}
