import { PageProps } from "$fresh/server.ts";
import { Footer } from "components/mod.ts";
import HeaderNav from "islands/HeaderNav.tsx";

export default function App({ Component }: PageProps) {
  const code = `function global_dark(change) {
    if (change === 'auto') delete localStorage.theme; else if (change === 'on') localStorage.theme = 'dark'; else if (change === 'off') localStorage.theme = 'light';
    window.isDark = localStorage.theme === "dark" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
    document.documentElement.classList[window.isDark ? 'add' : 'remove']("dark");
  }
  global_dark();`;

  const title = "Electrogram";
  const bot_tag = "@ingbio_bot";

  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        <script
          dangerouslySetInnerHTML={{
            __html: code,
          }}
        />
      </head>
      <body className="flex flex-col min-h-screen text-justify">
        <HeaderNav
          title={title}
          bot_tag={bot_tag}
          nav_menu={[
            { name: "Home", href: "/" },
            { name: "Blog", href: "/blog" },
            { name: "Suggest", href: "/suggest" },
            { name: "Contact", href: "/contact" },
            { name: "About", href: "/about" },
          ]}
        />
        <div className="flex-grow bg-slate-200 text-slate-800 dark:(bg-slate-800 text-slate-100)">
          <div className="mx-auto max-w-screen-xl py-2 px-6 sm:px-8 lg:px-10">
            <Component />
          </div>
        </div>
        <Footer />
      </body>
    </html>
  );
}
