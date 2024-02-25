import { useEffect, useState } from "preact/hooks";
import {
  Button,
  ButtonGroup,
  Divisor,
  SearchBox,
  SelectInput,
  TableHead,
} from "components/mod.ts";
import { Group } from "$utils/schemas.ts";

type GroupData = Group & { [key: string]: string | Date | undefined };

type Props = {
  data: GroupData[];
  username: string;
};

async function fetchData(url: string, options?: RequestInit) {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("Error fetching data");
  }
  return response.json();
}

export default function GroupsPanel({ data, username }: Props) {
  const [fetchedData, setFetchedData] = useState<GroupData[]>([]);
  const [newRow, setNewRow] = useState<Partial<GroupData>>({});
  const [editIndex, setEditIndex] = useState(-1);
  const [editedValues, setEditedValues] = useState<Partial<GroupData>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeSearchTerm, setActiveSearchTerm] = useState("");
  const [deletedSearchTerm, setDeletedSearchTerm] = useState("");

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

  useEffect(() => {
    if (editedValues["degree"] === "m" && editedValues["year"] === "3") {
      setEditedValues((prevValues) => ({
        ...prevValues,
        year: "1",
      }));
    }
  }, [editedValues["degree"]]);

  useEffect(() => {
    if (editedValues["year"] !== "0" && editedValues["semester"] === "0") {
      setEditedValues((prevValues) => ({
        ...prevValues,
        semester: "1",
      }));
    } else if (editedValues["year"] === "0") {
      setEditedValues((prevValues) => ({
        ...prevValues,
        semester: "0",
      }));
    }
  }, [editedValues["year"]]);

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
      setEditIndex(-1);
      setEditedValues({});
      setNewRow({});
    } catch (error) {
      console.error(`Error during fetch request: ${method}`, error);
    }
  };

  const handleEdit = (index: number) => {
    setEditIndex(index);
    const dataToEdit = activeGroups[index];
    setEditedValues(dataToEdit);
  };

  const handleSave = async (index: number) => {
    editedValues.meta = activeGroups[index].meta;
    await handleFetch(`/dashboard/api/groups`, "PUT", {
      body: JSON.stringify(editedValues),
      username: username,
    });
  };

  const handleDelete = async (index: number) => {
    if (globalThis.confirm("Are you sure you want to delete this group?")) {
      await handleFetch(`/dashboard/api/groups`, "DELETE", {
        body: JSON.stringify(activeGroups[index]),
        username: username,
      });
    }
  };

  const handleRecover = async (index: number) => {
    await handleFetch(`/dashboard/api/groups`, "PUT", {
      body: JSON.stringify(deletedGroups[index]),
      username: username,
    });
  };

  const handleAddNewRow = () => {
    setNewRow({});
    setEditIndex(fetchedData.length);
  };

  const handleSaveNewRow = async () => {
    const urlPattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i",
    ); // fragment locator

    if (!newRow["url"]) {
      alert("URL is required");
      return;
    }

    if (!urlPattern.test(newRow["url"])) {
      alert("Please enter a valid URL");
      return;
    }

    const fields = ["name", "url", "degree", "year", "semester"];
    for (const field of fields) {
      if (!newRow[field as keyof typeof newRow]) {
        alert(`Please enter a value for ${field}`);
        return;
      }
    }

    await handleFetch(`/dashboard/api/groups`, "POST", {
      body: JSON.stringify(newRow),
      username: username,
    });
  };

  const activeGroups = fetchedData.filter((
    group,
  ) => (group.deletedBy === "" &&
    group.name.toLowerCase().includes(activeSearchTerm.toLowerCase()))
  );
  const deletedGroups = fetchedData.filter((group) =>
    (group.deletedBy ?? "") !== "" &&
    group.name.toLowerCase().includes(deletedSearchTerm.toLowerCase())
  );

  const activeRows = activeGroups.map((dict, index) => (
    <tr className="odd:bg-gray-50" key={index}>
      {[
        "name",
        "url",
        "degree",
        "year",
        "semester",
      ]
        .map((key, innerIndex) => (
          <td
            className="truncate px-4 py-2 text-gray-700"
            key={innerIndex}
          >
            {editIndex === index
              ? (
                key === "degree" || key === "year" || key === "semester"
                  ? (
                    <SelectInput
                      label=""
                      value={editedValues[key] || dict[key]}
                      onInput={(value) => {
                        setEditedValues((prevValues) => ({
                          ...prevValues,
                          [key]: value,
                          ...(key === "year" && value === "0" &&
                            { semester: "0" }),
                        }));
                      }}
                      options={key === "degree"
                        ? [{ value: "m", label: "Master" }, {
                          value: "b",
                          label: "Bachelor",
                        }]
                        : key === "year" && editedValues["degree"] === "b"
                        ? [
                          { value: "0", label: "General" },
                          { value: "1", label: "First" },
                          { value: "2", label: "Second" },
                          { value: "3", label: "Third" },
                        ]
                        : key === "year" && editedValues["degree"] === "m"
                        ? [
                          { value: "0", label: "General" },
                          { value: "1", label: "First" },
                          { value: "2", label: "Second" },
                        ]
                        : key === "semester" && editedValues["year"] !== "0"
                        ? [{ value: "1", label: "First" }, {
                          value: "2",
                          label: "Second",
                        }]
                        : [{ value: "0", label: "--" }]}
                      disabled={key === "semester" &&
                        editedValues["year"] === "0"}
                    />
                  )
                  : (
                    <input
                      type="text"
                      className="inline-block px-4 py-0 text-sm rounded-md font-medium text-gray-700"
                      value={((editedValues[key] ?? dict[key]) || "")
                        .toString()}
                      onChange={(event) =>
                        setEditedValues((prevValues) => ({
                          ...prevValues,
                          [key]: (event.target as HTMLInputElement).value,
                        }))}
                    />
                  )
              )
              : (
                key === "degree"
                  ? (dict[key] === "b" ? "Bachelor" : "Master")
                  : key === "year"
                  ? (dict[key] === "1"
                    ? "First"
                    : dict[key] === "2"
                    ? "Second"
                    : dict[key] === "3"
                    ? "Third"
                    : "General")
                  : key === "semester"
                  ? (dict[key] === "1"
                    ? "First"
                    : dict[key] === "2"
                    ? "Second"
                    : dict[key] === "3"
                    ? "Third"
                    : "-")
                  : dict[key]
              )}
          </td>
        ))}
      <td>
        {editIndex === index
          ? (
            <>
              <ButtonGroup
                button={[
                  {
                    text: "Save",
                    onClick: () => handleSave(index),
                  },
                  {
                    text: "Cancel",
                    onClick: () => {
                      setEditIndex(-1);
                      setEditedValues({});
                    },
                  },
                ]}
              />
            </>
          )
          : (
            <>
              <ButtonGroup
                button={[
                  {
                    text: "Edit",
                    onClick: () => handleEdit(index),
                    disabled: editIndex !== -1,
                  },
                  {
                    text: "Delete",
                    onClick: () =>
                      handleDelete(index),
                    disabled: editIndex !== -1,
                  },
                ]}
              />
            </>
          )}
      </td>
    </tr>
  ));

  const deletedRows = deletedGroups.map((dict, index) => (
    <tr className="odd:bg-gray-50" key={index}>
      {[
        "name",
        "url",
        "degree",
        "year",
        "semester",
      ].map((
        key,
        innerIndex,
      ) => (
        <td
          className="whitespace-nowrap px-4 py-2 text-gray-700"
          key={innerIndex}
        >
          {key === "degree"
            ? (dict[key] === "b" ? "Bachelor" : "Master")
            : key === "year"
            ? (dict[key] === "1"
              ? "First"
              : dict[key] === "2"
              ? "Second"
              : dict[key] === "3"
              ? "Third"
              : "General")
            : key === "semester"
            ? (dict[key] === "1"
              ? "First"
              : dict[key] === "2"
              ? "Second"
              : dict[key] === "3"
              ? "Third"
              : "-")
            : dict[key] || "-"}
        </td>
      ))}
      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
        {
          <>
            <ButtonGroup
              button={[
                {
                  text: "Recover",
                  onClick: () => handleRecover(index),
                  disabled: editIndex !== -1,
                },
              ]}
            />
          </>
        }
      </td>
    </tr>
  ));

  const newRows = [
    "name",
    "url",
    "degree",
    "year",
    "semester",
  ].map((key, index) => (
    <td key={index} className="whitespace-nowrap px-4 py-2 text-gray-700">
      {key === "degree" || key === "year" || key === "semester"
        ? (
          <SelectInput
            label=""
            value={newRow[key] || ""}
            onInput={(value) => {
              setNewRow((prevValues) => ({
                ...prevValues,
                [key]: value,
                ...(key === "year" && value === "0" && { semester: "0" }),
              }));
            }}
            options={key === "degree"
              ? [
                { value: "m", label: "Master" },
                { value: "b", label: "Bachelor" },
              ]
              : key === "year" && newRow["degree"] === "b"
              ? [
                { value: "0", label: "General" },
                { value: "1", label: "First" },
                { value: "2", label: "Second" },
                { value: "3", label: "Third" },
              ]
              : key === "year" && newRow["degree"] === "m"
              ? [
                { value: "0", label: "General" },
                { value: "1", label: "First" },
                { value: "2", label: "Second" },
              ]
              : key === "semester" && newRow["year"] !== "0"
              ? [
                { value: "1", label: "First" },
                { value: "2", label: "Second" },
              ]
              : [{ value: "0", label: "--" }]}
            disabled={key === "year" && !newRow["degree"] ||
              key === "semester" && !newRow["year"] || key === "semester" &&
                newRow["year"] === "0"}
          />
        )
        : (
          <input
            type="text"
            value={newRow[key]?.toString() || ""}
            className="inline-block px-4 py-0 text-sm rounded-md font-medium text-gray-700"
            onChange={(event) =>
              setNewRow((prevValues) => ({
                ...prevValues,
                [key]: (event.target as HTMLInputElement).value,
              }))}
          />
        )}
    </td>
  ));

  const newRowActions = (
    <td className="odd:bg-gray-50">
      <ButtonGroup
        button={[
          { text: "Save", onClick: handleSaveNewRow },
          {
            text: "Cancel",
            onClick: () => {
              setEditIndex(-1);
              setNewRow({});
            },
          },
        ]}
      />
    </td>
  );

  return (
    <div>
      {isLoading
        ? <div>Loading...</div>
        : error
        ? <div>Error: {error}</div>
        : (
          <div>
            <Divisor title="Groups" />
            <SearchBox
              text="Search for a group..."
              value={activeSearchTerm}
              onInput={(e) =>
                setActiveSearchTerm((e.target as HTMLInputElement).value)}
            />
            <div className="overflow-auto">
              <table className="table-auto min-w-full divide-y-2 divide-gray-200 bg-white text-sm rounded-md">
                <thead className="text-left">
                  <TableHead
                    col_names={[
                      { name: "Name" },
                      { name: "Url" },
                      { name: "Degree" },
                      { name: "Year" },
                      { name: "Semester" },
                      { name: "Actions" },
                    ]}
                  />
                </thead>
                <tbody className="text-left divide-y divide-gray-200">
                  {activeRows.length > 0 ? activeRows : (
                    <tr>
                      <td className="px-3" colspan={4}>No data to display</td>
                    </tr>
                  )}
                  {editIndex === fetchedData.length && (
                    <tr>
                      {newRows}
                      {newRowActions}
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <span onClick={handleAddNewRow}>
              <Button text="Add" disabled={editIndex !== -1} />
            </span>
            <Divisor title="Deleted groups" />
            <SearchBox
              text="Search for a deleted group..."
              value={deletedSearchTerm}
              onInput={(e) =>
                setDeletedSearchTerm((e.target as HTMLInputElement).value)}
            />
            <div className="overflow-auto">
              <table className="table-auto min-w-full divide-y-2 divide-gray-200 bg-white text-sm rounded-md">
                <thead className="text-left">
                  <TableHead
                    col_names={[
                      { name: "Name" },
                      { name: "Url" },
                      { name: "Degree" },
                      { name: "Year" },
                      { name: "Semester" },
                      { name: "Actions" },
                    ]}
                  />
                </thead>
                <tbody className="text-left divide-y divide-gray-200">
                  {deletedRows.length > 0 ? deletedRows : (
                    <tr>
                      <td
                        className="whitespace-nowrap px-4 py-2 text-gray-700"
                        colspan={4}
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
