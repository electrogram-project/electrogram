import { useState } from "preact/hooks";
import { Button, capitalize, SelectInput } from "components/mod.ts";

export default function SuggestionsForm() {
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    degree: "",
    year: "",
    semester: "",
  });

  const submitForm = async () => {
    const urlPattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i",
    );

    if (!formData["url"]) {
      alert("URL is required");
      return;
    }

    if (!urlPattern.test(formData["url"])) {
      alert("Please enter a valid URL");
      return;
    }

    const fields = ["name", "url", "degree", "year", "semester"];
    for (const field of fields) {
      if (!formData[field as keyof typeof formData]) {
        alert(`Please enter a value for ${field}`);
        return;
      }
    }

    await fetch(`/api/suggest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    window.location.href = "/success";
  };

  const formFields = ["name", "url", "degree", "year", "semester"].map((
    key,
    index,
  ) => (
    <div key={index} className="flex items-center gap-1">
      {key === "degree" || key === "year" || key === "semester"
        ? (
          <SelectInput
            label={capitalize(key)}
            value={formData[key as keyof typeof formData] || ""}
            onInput={(value) => {
              setFormData((prevValues) => ({
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
              : key === "year" && formData["degree"] === "b"
              ? [
                { value: "0", label: "General" },
                { value: "1", label: "First" },
                { value: "2", label: "Second" },
                { value: "3", label: "Third" },
              ]
              : key === "year" && formData["degree"] === "m"
              ? [
                { value: "0", label: "General" },
                { value: "1", label: "First" },
                { value: "2", label: "Second" },
              ]
              : key === "semester" && formData["year"] !== "0"
              ? [
                { value: "1", label: "First" },
                { value: "2", label: "Second" },
              ]
              : [{ value: "0", label: "--" }]}
            disabled={key === "year" && !formData["degree"] ||
              key === "semester" && !formData["year"] || key === "semester" &&
                formData["year"] === "0"}
          />
        )
        : (
          <div>
            <label className="text-sm font-medium text-gray-900">
              {capitalize(key)}:
            </label>
            <input
              type="text"
              value={formData[key as keyof typeof formData] || ""}
              placeholder={key === "url"
                ? "https://t.me/joinchat/..."
                : "Knitting club..."}
              maxLength={key === "url" ? 200 : 50}
              className="w-fit py-1 px-4 pr-10 rounded-md border-gray-400 enabled:bg-white enabled:shadow-sm enabled:shadow-gray-300 sm:text-sm m-1 disabled:bg-gray-200"
              onInput={(event) =>
                setFormData((prevValues) => ({
                  ...prevValues,
                  [key]: (event.target as HTMLInputElement).value,
                }))}
            />
          </div>
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
