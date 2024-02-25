type Props = {
  nav_menu: { name: string; href: string }[];
};

export function NavBar(props: Props) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-col sm:flex-row items-center gap-1 text-sm text-gray-600">
        {props.nav_menu.map((menu, index) => (
          <li className="my-2 sm:my-0">
            <a
              href={menu.href}
              className="mx-3 hover:underline aria-[current='page']:underline underline-offset-2"
            >
              {menu.name}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
