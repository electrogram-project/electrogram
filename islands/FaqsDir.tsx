import { useEffect, useState } from "preact/hooks";
import { FaqCard, SearchBox } from "components/mod.ts";
import { Faq } from "$utils/schemas.ts";

export default function FaqsDir() {
  const [fetchedData, setFetchedData] = useState<Faq[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("/api/faqs")
      .then((response) => response.json())
      .then((data) => setFetchedData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <SearchBox
        text="Search for a FAQ..."
        value={searchTerm}
        onInput={(e) => setSearchTerm((e.target as HTMLInputElement).value)}
      />
      <div className="max-h-screen overflow-y-auto">
        {fetchedData.length > 0
          ? fetchedData.filter((faq) =>
            faq.title.toLowerCase().includes(searchTerm.toLowerCase())
          ).map((faq) => (
            <div className="overflow-hidden">
              <FaqCard title={faq.title} text={faq.text} />
            </div>
          ))
          : (
            <section className="overflow-hidden rounded-md shadow-md shadow-zinc-300 transition m-4">
              <div className="bg-white p-4 sm:p-6">
                <h4 className="mt-0.5 text-base text-gray-900 font-bold">
                  No results
                </h4>
              </div>
            </section>
          )}
      </div>
    </div>
  );
}
