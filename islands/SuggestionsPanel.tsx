import { useEffect, useState } from "preact/hooks";
import {
  ButtonGroup,
  Divisor,
  SelectInput,
  TableHead,
} from "components/mod.ts";
import { Suggestion } from "$utils/schemas.ts";

type SuggestionData = Suggestion & { [key: string]: string | Date | undefined };

type Props = {
  data: SuggestionData[];
  username: string;
};

async function fetchData(url: string, options?: RequestInit) {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("Error fetching data");
  }
  return response.json();
}

export default function SuggestionsPanel({ data, username }: Props) {
  const [fetchedData, setFetchedData] = useState<SuggestionData[]>([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [editedValues, setEditedValues] = useState<Partial<SuggestionData>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetchData("/dashboard/api/suggestions")
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
    } catch (error) {
      console.error(`Error during fetch request: ${method}`, error);
    }
  };

  const handleSave = async (index: number) => {
    await handleFetch(`/dashboard/api/suggestions`, "PUT", {
      body: JSON.stringify(editedValues),
      username: username,
    });
  };

  const handleEdit = (index: number) => {
    setEditIndex(index);
    const dataToEdit = newSuggestions[index];
    setEditedValues(dataToEdit);
  };

  const handleDelete = async (index: number) => {
    if (
      globalThis.confirm("Are you sure you want to delete this suggestion?")
    ) {
      await handleFetch(`/dashboard/api/suggestions`, "DELETE", {
        body: JSON.stringify(newSuggestions[index]),
        username: username,
      });
    }
  };

  const newSuggestions = fetchedData.filter((suggestion) =>
    suggestion.rejectedBy === "" && suggestion.approvedBy === ""
  );
  const oldSuggestions = fetchedData.filter((suggestion) =>
    suggestion.rejectedBy !== "" || suggestion.approvedBy !== ""
  );

  const newRows = newSuggestions.map((dict, index) => (
    <tr className="odd:bg-gray-50" key={index}>
      {[
        "name",
        "url",
        "degree",
        "year",
        "semester",
        "addedAt",
      ].map((key, innerIndex) => (
        <td
          className="whitespace-nowrap px-4 py-2 text-gray-700"
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
                  key === "addedAt" ? <span>{dict[key]}</span> : (
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
      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
        {editIndex === index
          ? (
            <>
              <ButtonGroup
                button={[
                  {
                    text: "Confirm",
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
                    text: "Approve",
                    onClick: () => handleEdit(index),
                    disabled: editIndex !== -1,
                  },
                  {
                    text: "Reject",
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

  const oldRows = oldSuggestions.map((dict, index) => (
    <tr className="odd:bg-gray-50" key={index}>
      {[
        "name",
        "url",
        "degree",
        "year",
        "semester",
        "approvedBy",
        "rejectedBy",
      ].map((key, innerIndex) => (
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
            <Divisor title="New suggestions" />
            <div className="overflow-x-auto">
              <table className="table-auto min-w-full divide-y-2 divide-gray-200 bg-white text-sm rounded-md">
                <thead className="text-left">
                  <TableHead
                    col_names={[
                      { name: "Name" },
                      { name: "Url" },
                      { name: "Degree" },
                      { name: "Year" },
                      { name: "Semester" },
                      { name: "Added at" },
                      { name: "Actions" },
                    ]}
                  />
                </thead>
                <tbody className="text-left divide-y divide-gray-200">
                  {newRows.length > 0 ? newRows : (
                    <tr>
                      <td className="px-3" colspan={5}>No data to display</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <Divisor title="Old suggestions" />
            <div className="overflow-x-auto">
              <table className="table-auto min-w-full divide-y-2 divide-gray-200 bg-white text-sm rounded-md">
                <thead className="text-left">
                  <TableHead
                    col_names={[
                      { name: "Name" },
                      { name: "Url" },
                      { name: "Degree" },
                      { name: "Year" },
                      { name: "Semester" },
                      { name: "Approved by" },
                      { name: "Rejected by" },
                    ]}
                  />
                </thead>
                <tbody className="text-left divide-y divide-gray-200">
                  {oldRows.length > 0 ? oldRows : (
                    <tr>
                      <td
                        className="whitespace-nowrap px-4 py-2 text-gray-700"
                        colspan={6}
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
