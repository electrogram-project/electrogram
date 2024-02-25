import { useEffect, useState } from "preact/hooks";
import { GroupCard, SearchBox } from "components/mod.ts";
import { Group } from "$utils/schemas.ts";

type GroupDesc = {
  degree: string;
  year: string;
  semester: string;
};

export function createDesc(data: GroupDesc) {
  const { degree, year, semester } = data;
  let degreeName = "";
  let description = "";

  if (degree === "b") {
    degreeName = "Bachelor";
  } else if (degree === "m") {
    degreeName = "Master";
  }

  if (year === "0") {
    description = `${degreeName}`;
  } else {
    description = `${degreeName}: ${year} year ${semester} semester`;
  }

  return description;
}

async function fetchData(url: string, options?: RequestInit) {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("Error fetching data");
  }
  return response.json();
}

export default function GroupsDir() {
  const [fetchedData, setFetchedData] = useState<Group[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetchData("/api/groups")
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

  const groupsList = fetchedData.filter((group) =>
    (group.deletedBy ?? "") === "" &&
    group.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupsCards = groupsList.map((dict, index) => (
    <>
      <GroupCard
        name={dict.name}
        description={createDesc(dict)}
        url={dict.url}
        date={(dict?.editedAt || dict?.addedAt)
          ? new Date(dict?.editedAt || dict?.addedAt).toISOString().split(
            "T",
          )[0]
          : ""}
      />
    </>
  ));

  return (
    <div>
      {isLoading
        ? <div>Loading...</div>
        : error
        ? <div>Error: {error}</div>
        : (
          <div>
            <SearchBox
              text="Search for a group..."
              value={searchTerm}
              onInput={(e) =>
                setSearchTerm((e.target as HTMLInputElement).value)}
            />
            <div className="max-h-screen overflow-y-auto">
              {groupsCards.length > 0
                ? groupsCards
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
        )}
    </div>
  );
}
