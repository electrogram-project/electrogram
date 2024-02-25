import { PageProps } from "$fresh/server.ts";
import { Footer, Header } from "components/mod.ts";

export default function App({ Component }: PageProps) {
  const title = "Electrogram";
  const subtitle = "@ingbio_bot";
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body className="flex flex-col bg-slate-100 font-junction min-h-screen">
        <Header
          title={title}
          subtitle={subtitle}
          nav_menu={[
            { name: "Home", href: "/" },
            { name: "Faqs", href: "/faqs" },
            { name: "Erasmus", href: "/erasmus" },
            { name: "Suggest", href: "/suggest" },
            { name: "Contact", href: "/contact" },
          ]}
        />
        <div className="container mx-auto px-5 ">
          <Component />
        </div>
        <Footer description="This website is part of the 'Electrogram project'. By organising and preserving the knowledge acquired over the years by graduate students, this project aims to assist present students and improve their academic life." />
      </body>
    </html>
  );
}
