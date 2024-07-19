import { LayoutConfig, PageProps } from "$fresh/server.ts";
import { style } from "utils/webapp/style.ts";
import { Head } from "$fresh/runtime.ts";
import InitializeWebApp from "islands/webapp/InitializeWebApp.tsx";

export const config: LayoutConfig = {
  skipInheritedLayouts: true,
};

export default function App({ Component }: PageProps) {
  return (
    <>
      <Head>
        <script src="https://telegram.org/js/telegram-web-app.js">
        </script>
        <style
          dangerouslySetInnerHTML={{
            __html: style,
          }}
        />
      </Head>

      <body className="flex flex-col min-h-screen text-justify">
        <div className="flex-grow">
          <div className="mx-auto max-w-screen-xl py-2 px-4">
            <InitializeWebApp />
            <Component />
          </div>
        </div>
      </body>
    </>
  );
}
