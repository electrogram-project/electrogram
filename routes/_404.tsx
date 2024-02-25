import { Button } from "components/mod.ts";

export default function NotFound() {
  return (
    <div>
      <div className="flex grid px-4">
        <div className="text-center">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-black text-gray-300">
            404
          </h1>

          <p className="mt-2 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900">
            Oh no!
          </p>

          <p className="mt-4 text-sm sm:text-base md:text-lg lg:text-xl text-gray-500">
            We can't find that page.
          </p>

          <a href="/">
            <Button text="Go home" />
          </a>
        </div>
      </div>
    </div>
  );
}
