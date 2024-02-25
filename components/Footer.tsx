import IconBrain from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/brain.tsx";
import IconHeart from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/heart.tsx";
import IconBrandGithub from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/brand-github.tsx";
import IconFileInfo from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/file-info.tsx";
import IconBrandInstagram from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/brand-instagram.tsx";

type Props = {
  description: string;
};

export function Footer({ description }: Props) {
  return (
    <footer className="bg-gray-100">
      <div className="relative mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 lg:pt-24">
        <div className="lg:flex lg:items-end lg:justify-between">
          <div>
            <div className="flex justify-center items-center text-zinc-700 lg:justify-start">
              <IconBrain className="w-9 h-9" />
              <IconHeart className="w-9 h-9" />
            </div>

            <p className="mx-auto mt-2 max-w-md text-justify leading-relaxed text-gray-600">
              {description}
              <br />
              <a
                className="font-mono transition hover:underline aria-[current='page']:underline underline-offset-2"
                href="/dashboard"
              >
                Dashboard
              </a>
            </p>
          </div>

          <ul className="mt-12 flex flex-wrap justify-center gap-1 md:gap-4 lg:gap-5 lg:mt-0 lg:justify-end">
            <li>
              <div className="flex justify-between">
                <a
                  className="text-gray-700 flex items-center gap-1 transition hover:underline underline-offset-2"
                  href="https://github.com/electrogram-project/electrogram"
                  target="_blank"
                >
                  <IconBrandGithub className="w-5 h-5" /> Source
                </a>
              </div>
            </li>
            <li>
              <div className="flex justify-between">
                <a
                  className="text-gray-700 flex items-center gap-1 transition hover:underline underline-offset-2"
                  href="https://www.instagram.com/bio_meme_polito/"
                  target="_blank"
                >
                  <IconBrandInstagram className="w-5 h-5" /> Biomeme
                </a>
              </div>
            </li>
            <li>
              <div className="flex justify-between">
                <a
                  className="text-gray-700 flex items-center gap-1 transition hover:underline aria-[current='page']:underline underline-offset-2"
                  href="/about"
                >
                  <IconFileInfo className="w-5 h-5" /> About
                </a>
              </div>
            </li>
          </ul>
        </div>

        <p className="mt-6 text-center text-sm text-gray-500 lg:text-right">
          Site icon created by{" "}
          <a
            className="hover:underline underline-offset-2"
            href="https://www.flaticon.com/"
            target="_blank"
          >
            Freepik
          </a>
        </p>
        <p className="mt-2 text-center text-sm text-gray-500 lg:text-right">
          <a
            className="hover:underline underline-offset-2"
            href="https://www.apache.org/licenses/LICENSE-2.0"
            target="_blank"
          >
            Apache License 2.0
          </a>{" "}
          &copy; {new Date().getFullYear()} Electrogram
        </p>
      </div>
    </footer>
  );
}
