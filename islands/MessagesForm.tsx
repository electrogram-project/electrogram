import { useState } from "preact/hooks";
import { Button, capitalize } from "components/mod.ts";

export default function MessagesForm() {
  const [formData, setFormData] = useState({
    name: "",
    message: "",
  });

  const submitForm = async () => {
    await fetch(`/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    window.location.href = "/success";
  };

  const formFields = ["name", "message"].map((
    key,
    index,
  ) => (
    <div key={index}>
      <label className="text-sm font-medium text-gray-900">
        {capitalize(key)}:
      </label>
      {key === "name"
        ? (
          <input
            type="text"
            placeholder="Ascanio"
            maxLength={50}
            className="w-fit py-1 px-4 pr-10 rounded-md border-gray-400 enabled:bg-white enabled:shadow-sm enabled:shadow-gray-300 sm:text-sm m-1 disabled:bg-gray-200"
            onInput={(event) => {
              setFormData((prevValues) => ({
                ...prevValues,
                [key]: (event.target as HTMLInputElement).value,
              }));
            }}
          />
        )
        : (
          <textarea
            type="text"
            placeholder="Let me in..."
            maxLength={1000}
            className="w-full h-32 py-1 px-4 pr-10 rounded-md border-gray-400 enabled:bg-white enabled:shadow-sm enabled:shadow-gray-300 sm:text-sm m-1 disabled:bg-gray-200"
            onInput={(event) => {
              setFormData((prevValues) => ({
                ...prevValues,
                [key]: (event.target as HTMLInputElement).value,
              }));
            }}
          />
        )}
    </div>
  ));

  return (
    <div>
      {formFields}
      <span onClick={submitForm}>
        <Button text="Submit" />
      </span>
    </div>
  );
}
