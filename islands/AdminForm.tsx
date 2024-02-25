import { useState } from "preact/hooks";
import { Button, capitalize } from "components/mod.ts";

type Props = {
  data: {
    user: string | null;
  };
};

export default function AdminForm({ data }: Props) {
  const isAllowed = !!data.user;
  let username = "";

  if (isAllowed) {
    username = (data.user as string).split("@")[0];
  }

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const submitForm = async () => {
    const fields = ["email", "password"];
    for (const field of fields) {
      if (!formData[field as keyof typeof formData]) {
        alert(`Please enter a value for ${field}`);
        return;
      }
    }

    await fetch(`/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then(() => {
      window.location.href = "/dashboard";
    });
  };

  const formFields = ["email", "password"].map((
    key,
    index,
  ) => (
    <div key={index}>
      <label className="text-sm font-medium text-gray-900">
        {capitalize(key)}:
      </label>
      {key === "email"
        ? (
          <input
            type="email"
            value={formData[key as keyof typeof formData]}
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
          <input
            type="password"
            value={formData[key as keyof typeof formData]}
            className="w-fit py-1 px-4 pr-10 rounded-md border-gray-400 enabled:bg-white enabled:shadow-sm enabled:shadow-gray-300 sm:text-sm m-1 disabled:bg-gray-200"
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
      {!isAllowed
        ? (
          <div>
            {formFields}
            <span onClick={submitForm}>
              <Button text="Sign in" />
            </span>
          </div>
        )
        : (
          <div>
            Welcome! You are logged in as {username}
            <br />
            <a href="/api/logout">
              <Button text="Logout" />
            </a>
          </div>
        )}
    </div>
  );
}
