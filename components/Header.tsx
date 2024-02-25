type Props = {
  title: string;
  subtitle: string;
  nav_menu: { name: string; href: string }[];
};

function NavItem({ name, href }: { name: string; href: string }) {
  return (
    <a
      href={href}
      className="sm:mx-3 mx-auto hover:underline aria-[current='page']:underline underline-offset-2"
    >
      {name}
    </a>
  );
}

export function Header({ title, subtitle, nav_menu }: Props) {
  return (
    <header className="text-zinc-700 text-lg">
      <a href="/">
        <div className="flex justify-center my-5 sm:my-10">
          <img
            className="h-24 sm:h-28 rounded-md shadow-md shadow-zinc-500"
            src="/electrogram.png"
            alt="Electrogram Logo"
          />
        </div>
        <p className="text-center text-3xl mt-4 mb-1 font-extrabold font-mono">
          {title}
        </p>
        <a href={"https://t.me/" + subtitle.substring(1)} target="_blank">
          <p className="text-center text-xl mb-2 font-semibold font-mono text-blue-400 hover:text-blue-300">
            {subtitle}
          </p>
        </a>
      </a>
      <nav className="flex justify-center mt-2 mb-3 sm:mt-4 sm:mb-6">
        {nav_menu.map((menu) => (
          <NavItem key={menu.href} name={menu.name} href={menu.href} />
        ))}
      </nav>
    </header>
  );
}
