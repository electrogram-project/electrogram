import { PageProps, RouteConfig } from "$fresh/server.ts";
import { NavBar, PageHead } from "components/mod.ts";

export default function Layout({ Component }: PageProps) {
  return (
    <html>
      <body className="flex flex-col bg-slate-100 font-junction min-h-screen">
        <PageHead title="Dashboard" text="" />
        <NavBar
          nav_menu={[
            { name: "Home", href: "/dashboard" },
            { name: "Groups", href: "/dashboard/groups" },
            { name: "Suggestions", href: "/dashboard/suggestions" },
            { name: "Faqs", href: "/dashboard/faqs" },
            { name: "Messages", href: "/dashboard/messages" },
          ]}
        />
        <br />
        <div className="container mx-auto px-5 ">
          <Component />
        </div>
      </body>
    </html>
  );
}
