import { useState } from "preact/hooks";
import { Button } from "components/mod.ts";

function SelectInput(
  { label, value, onInput, options, disabled }: {
    label: string;
    value: string;
    onInput: (value: string) => void;
    options: { value: string; label: string }[];
    disabled?: boolean;
  },
) {
  return (
    <div className="mb-1">
      <label className="font-bold">
        {label.charAt(0).toUpperCase() + label.slice(1)}:
      </label>
      <br />
      <select
        value={value}
        className="w-fit rounded-lg bg-slate-100 dark:bg-slate-700 border-0 py-2 pe-3 sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        onInput={(event) => onInput((event.target as HTMLSelectElement).value)}
        disabled={disabled}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function SuggestForm() {
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    degree: "",
    year: "",
    semester: "",
  });

  const updateFormData = (key: string, value: string) => {
    setFormData((prevValues) => ({
      ...prevValues,
      [key]: value,
      ...(key === "year" && value === "0" && { semester: "0" }),
    }));
  };

  const submitForm = async () => {
    const requiredFields = ["name", "url", "degree", "year", "semester"];

    for (const field of requiredFields) {
      if (!formData[field as keyof typeof formData]) {
        alert(`Please enter a value for ${field}`);
        return;
      }
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

    if (!urlPattern.test(formData.url)) {
      alert("Please enter a valid URL");
      return;
    }

    await fetch("/api/sendSuggestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    window.location.href = "/success";
  };

  const renderField = (key: string) => {
    const isSelect = key === "degree" || key === "year" || key === "semester";

    if (isSelect) {
      const options = key === "degree"
        ? [
          { value: "m", label: "Master" },
          { value: "b", label: "Bachelor" },
        ]
        : key === "year" && formData.degree === "b"
        ? [
          { value: "0", label: "General" },
          { value: "1", label: "First" },
          { value: "2", label: "Second" },
          { value: "3", label: "Third" },
        ]
        : key === "year" && formData.degree === "m"
        ? [
          { value: "0", label: "General" },
          { value: "1", label: "First" },
          { value: "2", label: "Second" },
        ]
        : key === "semester" && formData.year !== "0"
        ? [
          { value: "1", label: "First" },
          { value: "2", label: "Second" },
        ]
        : [{ value: "0", label: "--" }];

      const isDisabled = (key === "year" && !formData.degree) ||
        (key === "semester" && (!formData.year || formData.year === "0"));

      return (
        <SelectInput
          key={key}
          label={key}
          value={formData[key as keyof typeof formData] || ""}
          onInput={(value) => updateFormData(key, value)}
          options={options}
          disabled={isDisabled}
        />
      );
    }

    return (
      <div key={key} className="mb-1">
        <label className="font-bold">
          {key.charAt(0).toUpperCase() + key.slice(1)}:
        </label>
        <br />
        <input
          type="text"
          value={formData[key as keyof typeof formData] || ""}
          placeholder={key === "url"
            ? "https://t.me/joinchat/..."
            : "Knitting club..."}
          className="w-fit rounded-lg bg-slate-100 dark:bg-slate-700 border-0 py-2 pe-3 sm:text-sm"
          maxLength={key === "url" ? 200 : 50}
          onInput={(event) =>
            updateFormData(key, (event.target as HTMLInputElement).value)}
        />
      </div>
    );
  };

  return (
    <div className="mt-2">
      {["name", "url", "degree", "year", "semester"].map(renderField)}
      <span onClick={submitForm}>
        <Button text="Submit" />
      </span>
    </div>
  );
}
