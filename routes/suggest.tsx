import SuggestForm from "islands/SuggestForm.tsx";
import { PageHead } from "components/mod.ts";

export default function Home() {
  return (
    <div>
      <PageHead
        title="Suggest"
        text="The form below allows you to suggest a new group to be added to the list. Please ensure that the group you are suggesting is not already on the list. By 'General' we mean that the group is not specific to a year, e.g. a group concerning a specific orientation of a Master's degree."
      />
      <SuggestForm />
    </div>
  );
}
