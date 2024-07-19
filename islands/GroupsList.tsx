import { useEffect, useState } from "preact/hooks";
import { GroupCard, Search } from "components/mod.ts";
import { Group } from "utils/schemas.ts";
import { ObjectId } from "mongoose";

export type GroupType = Group & { _id: ObjectId };

async function fetchData(url: string, options?: RequestInit) {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("Error fetching data");
  }
  return response.json();
}

export default function GroupsList() {
  const [fetchedData, setFetchedData] = useState<GroupType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchData("/api/retrieveGroups")
      .then((data) => {
        setFetchedData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const groups = fetchedData.filter((group) =>
    (group.status !== "pending" && !group.deleted) &&
    group.name.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => a.name.localeCompare(b.name));

  const groupsCards = groups.map((dict, _index) => <GroupCard {...dict} />);

  return (
    <div className="container mx-auto p-4">
      <Search
        text="Search for a group..."
        value={searchTerm}
        onInput={(e) => setSearchTerm((e.target as HTMLInputElement).value)}
      />
      <div className="max-h-[80vh] overflow-y-auto bg-slate-100 rounded-lg p-4 dark:bg-slate-700">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {groupsCards.length > 0
            ? groupsCards
            : (
              <div className="flex flex-col justify-between h-full rounded-md shadow-md bg-slate-200 dark:bg-slate-800 p-4 sm:p-6">
                <div>
                  <div className="text-center">
                    <p className="text-xs">
                      Try to search for a different group
                    </p>
                  </div>
                  <p className="font-bold mb-2 text-center">No results found</p>
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
