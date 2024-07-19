import { useState } from "preact/hooks";
import {
  BsFillPenFill,
  BsSaveFill,
  BsTrash2Fill,
  BsXCircleFill,
} from "react-icons/bs";
import { GroupType } from "islands/GroupsList.tsx";

import { webApp } from "utils/webapp/mod.ts";

async function fetchData(url: string, options?: RequestInit) {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("Error fetching data");
  }
  return response.json();
}

export function GroupEditCard(data: GroupType) {
  const [editableData, setEditableData] = useState({
    _id: data._id,
    name: data.name,
    degree: data.degree,
    year: data.year,
    semester: data.semester,
    url: data.url,
    status: data.status,
  });
  const [isEditMode, setIsEditMode] = useState(false);

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleDeleteClick = () => {
    webApp.showConfirm(
      "Are you sure you want to mark this group as deleted?",
      (confirmed) => {
        if (!confirmed) {
          return;
        }
        fetchData("/webapp/api/manageGroups", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `tma ${webApp.initData}`,
          },
          body: JSON.stringify(editableData),
        });
        globalThis.location.reload();
      },
    );
  };

  const handleSaveClick = () => {
    const requiredFields = ["name", "url", "degree", "year", "semester"];
    for (const field of requiredFields) {
      if (!editableData[field as keyof typeof editableData]) {
        webApp.showAlert(`Please enter a value for ${field}!`);
        return;
      }
    }
    if (editableData.status === "pending") {
      webApp.showAlert("Please select a new status!");
      return;
    }

    const urlPattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i",
    );

    if (!urlPattern.test(editableData.url)) {
      webApp.showAlert("Please enter a valid URL");
      return;
    }

    fetchData("/webapp/api/manageGroups", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `tma ${webApp.initData}`,
      },
      body: JSON.stringify(editableData),
    });
    setIsEditMode(false);
    globalThis.location.reload();
  };

  const handleCancelClick = () => {
    setEditableData(data);
    setIsEditMode(false);
  };

  const handleChange = (e: Event) => {
    const { name, value } = e.target as
      | HTMLInputElement
      | HTMLSelectElement;
    setEditableData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col p-2">
      <section>
        <div>
          <b>Status:</b>
          <br />
          <select
            name="status"
            value={editableData.status}
            onChange={handleChange}
            disabled={!isEditMode}
          >
            {editableData.status === "pending"
              ? <option value="pending">Pending</option>
              : <></>}
            <option value="external">External</option>
            <option value="abandoned">Abandoned</option>
            <option value="managed">Managed</option>
          </select>
        </div>
        <div>
          <b>Category:</b>
          <br />
          <div className="flex justify-center gap-1">
            <select
              name="degree"
              value={editableData.degree}
              onChange={handleChange}
              disabled={!isEditMode}
            >
              <option value="b">Bachelor</option>
              <option value="m">Master</option>
            </select>
            <select
              name="year"
              value={editableData.year}
              onChange={handleChange}
              disabled={editableData.degree === "" || !isEditMode}
            >
              {editableData.degree === "b"
                ? (
                  <>
                    <option value="0">General</option>
                    <option value="1">First Year</option>
                    <option value="2">Second Year</option>
                    <option value="3">Third Year</option>
                  </>
                )
                : (
                  <>
                    <option value="0">General</option>
                    <option value="1">First Year</option>
                    <option value="2">Second Year</option>
                  </>
                )}
            </select>
            <select
              name="semester"
              value={editableData.year === "0" ? "0" : editableData.semester}
              onChange={handleChange}
              disabled={editableData.year === "" ||
                editableData.year === "0" || !isEditMode}
            >
              {editableData.year === "0" ? <option value="0">--</option> : (
                <>
                  <option value="1">First Semester</option>
                  <option value="2">Second Semester</option>
                </>
              )}
            </select>
          </div>
        </div>
        <div>
          <b>Name:</b>
          <br />
          <input
            type="text"
            name="name"
            value={editableData.name}
            onInput={handleChange}
            disabled={!isEditMode}
          />
        </div>

        <div>
          <b>Link:</b>
          <br />
          <input
            type="text"
            name="url"
            value={editableData.url}
            onInput={handleChange}
            disabled={!isEditMode}
          />
        </div>
        <div className="flex mt-2 gap-2">
          {!isEditMode
            ? (
              <>
                <button
                  className="h-10 w-10 flex items-center justify-center p-2 bg-blue-500 rounded hover:bg-blue-700"
                  onClick={handleEditClick}
                >
                  <BsFillPenFill className="h-5 w-5" />
                </button>
                <button
                  className="h-10 w-10 flex items-center justify-center p-2 bg-red-500 rounded hover:bg-red-700"
                  onClick={handleDeleteClick}
                >
                  <BsTrash2Fill className="h-5 w-5" />
                </button>
              </>
            )
            : (
              <>
                <button
                  className="h-10 w-10 flex items-center justify-center p-2 bg-green-500 rounded hover:bg-green-700"
                  onClick={handleSaveClick}
                >
                  <BsSaveFill className="h-5 w-5" />
                </button>
                <button
                  className="h-10 w-10 flex items-center justify-center p-2 bg-gray-500 rounded hover:bg-gray-700"
                  onClick={handleCancelClick}
                >
                  <BsXCircleFill className="h-5 w-5" />
                </button>
              </>
            )}
        </div>
      </section>
    </div>
  );
}
