import RegisterForm from "islands/RegisterForm.tsx";
import { PageHead } from "components/mod.ts";

export default function Home() {
  return (
    <div>
      <PageHead
        title="Set a new password"
        text="If you have received an email with a link to this page, you can set a new password for your account."
      />
      <RegisterForm />
    </div>
  );
}
