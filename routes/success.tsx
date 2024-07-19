import { Button } from "components/Button.tsx";
import { BsEmojiSmileUpsideDownFill } from "react-icons/bs";

export default function Home() {
  return (
    <div>
      <div className="mt-4">
        <h1 className="text-4xl font-bold text-left text-pink-600 dark:text-pink-300">
          <BsEmojiSmileUpsideDownFill className="inline mr-2 mb-2" />Great!
        </h1>

        <p className="mt-2 italic">
          Thank you for your contribution! Your request has been submitted
          successfully.
        </p>

        <a href="/">
          <Button text="Go home" />
        </a>
      </div>
    </div>
  );
}
