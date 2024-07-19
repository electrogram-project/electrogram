import { useState } from "preact/hooks";
import { Button } from "components/mod.ts";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    message: "",
  });

  const updateFormData = (key: string, value: string) => {
    setFormData((prevValues) => ({
      ...prevValues,
      [key]: value,
    }));
  };

  const submitForm = async () => {
    const fields = ["name", "message"];
    for (const field of fields) {
      if (!formData[field as keyof typeof formData]) {
        alert(`Please enter a value for ${field}`);
        return;
      }
    }

    await fetch("/api/sendMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    window.location.href = "/success";
  };

  const renderField = (key: string) => {
    const isTextArea = key === "message";
    return (
      <div key={key} className="mb-1">
        <label className="font-bold">
          {key.charAt(0).toUpperCase() + key.slice(1)}:
        </label>
        <br />
        {isTextArea
          ? (
            <textarea
              placeholder="Let me in..."
              className="w-full h-32 rounded-lg bg-slate-100 dark:bg-slate-700 border-0 py-2 px-3 sm:text-sm"
              maxLength={1000}
              onInput={(event) =>
                updateFormData(
                  key,
                  (event.target as HTMLTextAreaElement).value,
                )}
            />
          )
          : (
            <input
              type="text"
              placeholder="Ascanio"
              className="w-fit rounded-lg bg-slate-100 dark:bg-slate-700 border-0 py-2 px-3 sm:text-sm"
              maxLength={50}
              onInput={(event) =>
                updateFormData(key, (event.target as HTMLInputElement).value)}
            />
          )}
      </div>
    );
  };

  return (
    <div className="mt-2">
      {["name", "message"].map(renderField)}
      <span onClick={submitForm}>
        <Button text="Submit" />
      </span>
    </div>
  );
}
