import { useEffect, useState } from "preact/hooks";
import { PageHead, SearchWebApp } from "components/mod.ts";
import { GroupEditCard } from "islands/webapp/GroupEditCard.tsx";
import { GroupType } from "islands/GroupsList.tsx";
import { webAppData } from "utils/webapp/mod.ts";

async function fetchData(url: string, options?: RequestInit) {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("Error fetching data");
  }
  return response.json();
}

export default function PendingGroupsList() {
  if (!webAppData.value.safe && !webAppData.value.admin) {
    return <></>;
  }

  const [fetchedData, setFetchedData] = useState<GroupType[]>([]);
  const [filteredData, setFilteredData] = useState<GroupType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchState, setSearchState] = useState(false);

  useEffect(() => {
    fetchData("/api/retrieveGroups")
      .then((data) => {
        setFetchedData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleSearch = () => {
    setSearchState(true);
  };

  useEffect(() => {
    setSearchState(false);
    const groups = fetchedData.filter((group) =>
      (group.status === "pending" && !group.deleted) &&
      group.name.toLowerCase().includes(searchTerm.toLowerCase())
    ).sort((a, b) => a.name.localeCompare(b.name));
    setFilteredData(groups);
  }, [searchState, fetchedData]);

  const groupsCards = filteredData.map((dict, _index) => (
    <GroupEditCard {...dict} />
  ));
  const desc =
    `Hello ${webAppData.value.user?.firstName}! Here you can manage the groups that are pending approval.`;
  return (
    <>
      <div className="container mx-auto p-4">
        <PageHead
          title="Manage Groups"
          text={desc}
        />
        <SearchWebApp
          text="Search for a group..."
          value={searchTerm}
          onInput={(e) => setSearchTerm((e.target as HTMLInputElement).value)}
          onButtonClick={handleSearch}
        />
        <div>
          <div className="grid grid-cols-1 gap-4">
            {groupsCards.length > 0 ? groupsCards : (
              <div>
                <p>
                  No results found
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
