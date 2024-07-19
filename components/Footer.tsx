import { BsEye, BsInstagram, BsQuestionCircle } from "react-icons/bs";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-100 text-slate-800 dark:(bg-slate-700 text-slate-100 border-slate-700)">
      <div className="relative mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-4 lg:pt-8">
        <div className="lg:flex lg:items-end lg:justify-between">
          <div>
            <div className="flex justify-center lg:justify-start">
            </div>

            <p className="mx-auto mt-6 max-w-lg text-center leading-relaxed lg:text-left">
              This website is built with{" "}
              <a
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent font-semibold decoration-yellow-400 decoration-2 underline-offset-[5px] hover:underline"
                href="https://fresh.deno.dev"
                target="_blank"
                rel="noopener noreferrer"
              >
                Deno Fresh
              </a>{" "}
              and hosted in{" "}
              <a
                className="bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent font-semibold decoration-blue-400 decoration-2 underline-offset-[5px] hover:underline"
                href="https://deno.com/deploy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Deno Deploy
              </a>
              .
            </p>
          </div>

          <ul className="mt-12 flex flex-wrap justify-center gap-4 md:gap-6 lg:mt-0 lg:justify-end lg:gap-8">
            <li>
              <a
                className="font-semibold inline-flex items-center gap-2 hover:text-pink-600 dark:hover:text-pink-300"
                href="https://t.me/s/faqbiomedicapolito"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BsQuestionCircle className="w-6 h-6" />
                Faqs
              </a>
            </li>
            <li>
              <a
                className="font-semibold inline-flex items-center gap-2 hover:text-pink-600 dark:hover:text-pink-300"
                href="https://www.instagram.com/bio_meme_polito/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BsInstagram className="w-5 h-5" />
                Biomeme
              </a>
            </li>
          </ul>
        </div>
        <p className="mt-6 text-center text-sm lg:text-right">
          <a
            className="inline-flex items-center gap-1 decoration-pink-600 dark:decoration-pink-300 decoration-2 underline-offset-2 hover:underline"
            href="/privacy"
          >
            <BsEye className="w-4 h-4" />
            Privacy Policy
          </a>
        </p>
        <p className="mt-1 text-center text-sm lg:text-right">
          Site icon created by{" "}
          <a
            className="decoration-pink-600 dark:decoration-pink-300 decoration-2 underline-offset-2 hover:underline"
            href="https://www.flaticon.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Freepik
          </a>
        </p>
        <p className="mt-1 text-center text-sm lg:text-right">
          <a
            className="decoration-pink-600 dark:decoration-pink-300 decoration-2 underline-offset-2 hover:underline"
            href="https://www.apache.org/licenses/LICENSE-2.0"
            target="_blank"
            rel="noopener noreferrer"
          >
            Apache License 2.0
          </a>{" "}
          &copy; {new Date().getFullYear()} Electrogram
        </p>
      </div>
    </footer>
  );
}
