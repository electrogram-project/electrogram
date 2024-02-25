import MessagesForm from "islands/MessagesForm.tsx";
import { PageHead } from "components/mod.ts";

export default function Home() {
  return (
    <div>
      <PageHead
        title="Send us an anonymous message"
        text="The form below allows you to send us an anonymous message. We will not be able to reply to you, but we will read your message. If you wish to be contacted, please leave your contact details in the message."
      />
      <MessagesForm />
    </div>
  );
}
