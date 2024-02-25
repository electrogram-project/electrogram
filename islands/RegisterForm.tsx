import { useState } from "preact/hooks";
import { Button, InputField } from "components/mod.ts";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    new_password: "",
    repeat_password: "",
  });

  const submitForm = async () => {
    const fields = ["new_password", "repeat_password"];
    if (formData["new_password"] !== formData["repeat_password"]) {
      alert("Password and repeated password must be the same.");
      return;
    }
    for (const field of fields) {
      if (!formData[field as keyof typeof formData]) {
        alert(`Please enter a value for ${field}`);
        return;
      }
    }
    if (formData["new_password"].length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }

    await fetch(`/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pwd: formData.new_password,
        url: window.location.href,
      }),
    });

    window.location.href = "/success";
  };

  const formFields = ["new_password", "repeat_password"].map((
    key,
    _index,
  ) => (
    <div>
      <InputField
        label={key}
        type="password"
        placeholder="pippo123"
        onInput={(event) => {
          setFormData((prevValues) => ({
            ...prevValues,
            [key]: (event.target as HTMLInputElement).value,
          }));
        }}
      />
    </div>
  ));

  return (
    <div>
      {formFields}
      <span onClick={submitForm}>
        <Button text="Set the password" />
      </span>
    </div>
  );
}
