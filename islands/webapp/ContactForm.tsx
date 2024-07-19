import { useEffect, useState } from "preact/hooks";
import { webApp, webAppData } from "utils/webapp/mod.ts";
import { PageHead } from "components/mod.ts";

export default function ContactForm() {
  if (!webAppData.value.safe) {
    return <></>;
  }

  const [formData, setFormData] = useState({
    name: webAppData.value.user?.firstName || "",
    message: "",
  });

  useEffect(() => {
    webApp.MainButton.show();
    webApp.MainButton.setText("Submit");
    webApp.MainButton.onClick(submitForm);

    return () => {
      webApp.MainButton.offClick(submitForm);
    };
  }, [formData]);

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
        webApp.showAlert(`Please enter a value for ${field}`);
        return;
      }
    }
    await fetch(`/api/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    webApp.MainButton.hide();
    window.location.href = "/webapp/success";
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
              className="h-32 py-2 px-3"
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
              value={formData[key as keyof typeof formData]}
              className="py-2 px-3"
              maxLength={50}
              onInput={(event) =>
                updateFormData(key, (event.target as HTMLInputElement).value)}
            />
          )}
      </div>
    );
  };

  return (
    <>
      <PageHead
        title="Contact"
        text="The form below allows you to send us an anonymous message. We will not be able to reply to you, but we will read your message. If you wish to be contacted, please leave your contact details in the message."
      />
      <div className="mt-2">
        {["name", "message"].map(renderField)}
      </div>
    </>
  );
}
