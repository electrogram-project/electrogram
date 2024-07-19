import { useState } from "preact/hooks";
import { BsGithub, BsTelegram } from "react-icons/bs";
import DarkModeSwitch from "islands/DarkModeSwitch.tsx";

type Props = {
  title: string;
  bot_tag: string;
  nav_menu: { name: string; href: string }[];
};

function NavItem({ name, href }: { name: string; href: string }) {
  return (
    <li>
      <a
        className="decoration-pink-600 dark:decoration-pink-300 decoration-[3px] underline-offset-[5px] hover:underline aria-[current='page']:underline"
        href={href}
      >
        {name}
      </a>
    </li>
  );
}

export default function HeaderNav({ title, bot_tag, nav_menu }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 border-b border-slate-200 bg-slate-100 text-slate-800 dark:(bg-slate-700 text-slate-100 border-slate-700)">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              className="h-10 w-10 rounded-md hidden md:block"
              src="/electrogram.png"
              alt="Electrogram Logo"
            />
            <a
              className="block text-xl font-bold hover:text-pink-600 dark:hover:text-pink-300"
              href="/"
            >
              <span className="sr-only">Home</span>
              {title}
            </a>
          </div>
          <div className="hidden md:block">
            <nav aria-label="Global">
              <ul className="flex items-center gap-6">
                {nav_menu.map((menu) => (
                  <NavItem key={menu.href} name={menu.name} href={menu.href} />
                ))}
              </ul>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex gap-4">
              <a
                className="flex justify-center items-center"
                href={"https://t.me/" + bot_tag.substring(1)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <BsTelegram className="w-6 h-6 hover:text-pink-600 dark:hover:text-pink-300" />
                <label className="sr-only">Telegram</label>
              </a>
              <a
                className="flex justify-center items-center"
                href="https://github.com/electrogram-project/electrogram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BsGithub className="w-6 h-6 hover:text-pink-600 dark:hover:text-pink-300" />
                <label className="sr-only">GitHub</label>
              </a>
              <DarkModeSwitch prev={"system"} />
            </div>
            <button
              className="block rounded transition md:hidden"
              onClick={toggleMenu}
            >
              <span className="sr-only">Toggle menu</span>
              {isMenuOpen
                ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )
                : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
            </button>

            {isMenuOpen && (
              <div className="absolute top-16 left-0 w-full md:hidden border-b border-slate-200 bg-slate-100 text-slate-800 dark:(bg-slate-800 text-slate-100 border-slate-700) opacity-[.98]">
                <ul className="flex flex-col items-center gap-6 p-4 text-sm">
                  {nav_menu.map((menu) => (
                    <NavItem
                      key={menu.href}
                      name={menu.name}
                      href={menu.href}
                    />
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
