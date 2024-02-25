import { useEffect, useState } from "preact/hooks";
import { ButtonGroup, Divisor, TableHead } from "components/mod.ts";
import { Contact } from "$utils/schemas.ts";

type ContactData = Contact & { [key: string]: string | Date | undefined };

type Props = {
  data: ContactData[];
  username: string;
};

async function fetchData(url: string, options?: RequestInit) {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("Error fetching data");
  }
  return response.json();
}

export default function MessagesPanel({ data, username }: Props) {
  const [fetchedData, setFetchedData] = useState<ContactData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetchData("/dashboard/api/contacts")
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
    if (globalThis.confirm("Are you sure you want to delete this message?")) {
      await handleFetch(`/dashboard/api/contacts`, "DELETE", {
        body: JSON.stringify(contacts[index]),
        username: username,
      });
    }
  };

  const contacts = fetchedData;

  const contactsRows = contacts.map((dict, index) => (
    <tr className="odd:bg-gray-50">
      {[
        "name",
        "message",
        "addedAt",
      ].map((key, innerIndex) => (
        <td
          key={innerIndex}
          className="whitespace-nowrap px-4 py-2 text-gray-700"
        >
          {dict[key]}
        </td>
      ))}
      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
        <>
          <ButtonGroup
            button={[
              { text: "Delete", onClick: () => handleDelete(index) },
            ]}
          />
        </>
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
            <Divisor title="New messages" />
            <div className="overflow-x-auto">
              <table className="table-auto min-w-full divide-y-2 divide-gray-200 bg-white text-sm rounded-md">
                <thead className="text-left">
                  <TableHead
                    col_names={[
                      { name: "Name" },
                      { name: "Message" },
                      { name: "Added at" },
                      { name: "Actions" },
                    ]}
                  />
                </thead>
                <tbody className="text-left divide-y divide-gray-200">
                  {contactsRows.length > 0 ? contactsRows : (
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
