import FaqsDir from "islands/FaqsDir.tsx";
import { PageHead } from "components/mod.ts";

export default function Home() {
  return (
    <div>
      <PageHead
        title="Faqs"
        text="This page lists the Frequently Asked Questions that have been asked over the years in our groups. Use the search box to find a specific FAQ."
      />
      <FaqsDir />
    </div>
  );
}
