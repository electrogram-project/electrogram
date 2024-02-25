import { Button } from "components/Button.tsx";

export default function Home() {
  return (
    <div>
      <div className="flex grid px-4">
        <div className="text-center">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-black text-emerald-400">
            Great!
          </h1>

          <p className="mt-2 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900">
            Thank you for your contribution!
          </p>

          <p className="mt-4 text-sm sm:text-base md:text-lg lg:text-xl text-gray-500">
            Your request has been submitted successfully.
          </p>

          <a href="/">
            <Button text="Go home" />
          </a>
        </div>
      </div>
    </div>
  );
}
