import { useEffect, useState } from "preact/hooks";
import { Divisor, SearchBox, TableHead } from "components/mod.ts";
import { Faq } from "$utils/schemas.ts";

type FaqData = Faq & { [key: string]: string | number | object };

type Props = {
  data: FaqData[];
  username: string;
};

async function fetchData(url: string, options?: RequestInit) {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("Error fetching data");
  }
  return response.json();
}

export default function FaqsPanel({ data, username }: Props) {
  const [fetchedData, setFetchedData] = useState<FaqData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setIsLoading(true);
    fetchData("/api/faqs")
      .then((data) => {
        setFetchedData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error.toString());
        setIsLoading(false);
      });
  }, []);

  const handleFetch = async (
    url: string,
    method: string,
    item: { body: string; username?: string },
  ) => {
    try {
      const options: RequestInit = {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      };
      const updatedData = await fetchData(url, options);
      setFetchedData(updatedData);
    } catch (error) {
      console.error(`Error during fetch request: ${method}`, error);
    }
  };

  const handleDelete = async (index: number) => {
    if (globalThis.confirm("Are you sure you want to delete this FAQ?")) {
      await handleFetch(`/dashboard/api/faqs`, "DELETE", {
        body: JSON.stringify(faqs[index]),
        username: username,
      });
    }
  };

  const faqs = fetchedData.filter((faq) =>
    faq.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const faqsRows = faqs.map((dict, index) => (
    <tr key={index}>
      {[
        "title",
        "preview",
      ].map((key, innerIndex) => (
        <td
          key={innerIndex}
          dangerouslySetInnerHTML={{ __html: String(dict[key]) }}
        >
        </td>
      ))}
      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
        <span className="inline-flex justify-left overflow-hidden rounded-md border bg-white shadow-sm">
          <button
            className="inline-block px-4 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative"
            onClick={() => handleDelete(index)}
          >
            Delete
          </button>
        </span>
      </td>
    </tr>
  ));

  return (
    <div>
      {isLoading
        ? <div>Loading...</div>
        : error
        ? <div>Error: {error}</div>
        : (
          <div>
            <Divisor title="FAQs" />
            <SearchBox
              text="Search for a faq..."
              value={searchTerm}
              onInput={(e) =>
                setSearchTerm((e.target as HTMLInputElement).value)}
            />
            <div className="overflow-x-auto">
              <table className="table-auto min-w-full divide-y-2 divide-gray-200 bg-white text-sm rounded-md">
                <thead className="text-left">
                  <TableHead
                    col_names={[
                      { name: "Title" },
                      { name: "Preview" },
                      { name: "Actions" },
                    ]}
                  />
                </thead>
                <tbody className="text-left divide-y divide-gray-200">
                  {faqsRows.length > 0 ? faqsRows : (
                    <tr>
                      <td
                        className="whitespace-nowrap px-4 py-2 text-gray-700"
                        colspan={2}
                      >
                        No data to display
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
    </div>
  );
}
