import { useEffect } from "preact/hooks";
import { webApp, webAppData } from "utils/webapp/mod.ts";

async function fetchData(url: string, options?: RequestInit) {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("Error fetching data");
  }
  return response.json();
}

export default function InitializeWebApp() {
  function setThemeClass() {
    document.documentElement.className = webApp.colorScheme;
  }

  useEffect(() => {
    if (webApp) {
      webApp.ready();
      webApp.onEvent("themeChanged", setThemeClass);

      fetchData("/webapp/api/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `tma ${webApp.initData}`,
        },
      })
        .then((response) =>
          webAppData.value = {
            safe: response.safe,
            admin: response.admin,
            user: response.data.user,
          }
        );
    }
  }, []);

  return <></>;
}
