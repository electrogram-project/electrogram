import { BsArrowCounterclockwise, BsDashCircleFill } from "react-icons/bs";
import { Group } from "utils/schemas.ts";
import { ObjectId } from "mongoose";
import { webApp } from "utils/webapp/mod.ts";

export type GroupType = Group & { _id: ObjectId };

async function fetchData(url: string, options?: RequestInit) {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("Error fetching data");
  }
  return response.json();
}
export function GroupRecoverCard(data: GroupType) {
  const handleRecoverClick = () => {
    webApp.showConfirm(
      "Are you sure you want to recover this group?",
      (confirmed) => {
        if (!confirmed) {
          return;
        }
        fetchData("/webapp/api/manageGroups", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `tma ${webApp.initData}`,
          },
          body: JSON.stringify(data),
        });
        globalThis.location.reload();
      },
    );
  };

  const handleDeleteClick = () => {
    webApp.showConfirm(
      "Are you sure you want to delete this group forever?",
      (confirmed) => {
        if (!confirmed) {
          return;
        }
        fetchData("/webapp/api/manageGroups", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `tma ${webApp.initData}`,
          },
          body: JSON.stringify(data),
        });
        globalThis.location.reload();
      },
    );
  };

  return (
    <div className="flex flex-col p-2">
      <section>
        <div>
          <b>Status:</b>
          <br />
          <select
            name="status"
            value={data.status}
            disabled={true}
          >
            <option value="pending">Pending</option>
            <option value="external">External</option>
            <option value="abandoned">Abandoned</option>
            <option value="managed">Managed</option>
          </select>
        </div>
        <div>
          <b>Degree | year | semester:</b>
          <br />
          <div className="flex justify-center gap-1">
            <select
              name="degree"
              value={data.degree}
              disabled={true}
            >
              <option value="b">Bachelor</option>
              <option value="m">Master</option>
            </select>
            <select
              name="year"
              value={data.year}
              disabled={true}
            >
              <option value="0">General</option>
              <option value="1">First Year</option>
              <option value="2">Second Year</option>
              <option value="3">Third Year</option>
            </select>
            <select
              name="semester"
              value={data.year === "0" ? "0" : data.semester}
              disabled={true}
            >
              <option value="1">First Semester</option>
              <option value="2">Second Semester</option>
            </select>
          </div>
        </div>
        <div>
          <b>Name:</b>
          <br />
          <input
            type="text"
            name="name"
            value={data.name}
            disabled={true}
          />
        </div>

        <div>
          <b>Link:</b>
          <br />
          <input
            type="text"
            name="url"
            value={data.url}
            disabled={true}
          />
        </div>
        <div className="flex mt-2 gap-2">
          <button
            className="h-10 w-10 flex items-center justify-center p-2 bg-teal-500 text-white rounded hover:bg-teal-700"
            onClick={handleRecoverClick}
          >
            <BsArrowCounterclockwise className="h-5 w-5" />
          </button>
          <button
            className="h-10 w-10 flex items-center justify-center p-2 bg-red-500 text-white rounded hover:bg-red-700"
            onClick={handleDeleteClick}
          >
            <BsDashCircleFill className="h-5 w-5" />
          </button>
        </div>
      </section>
    </div>
  );
}
