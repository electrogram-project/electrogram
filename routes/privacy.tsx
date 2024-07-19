import { PageHead } from "components/mod.ts";

export default function Home() {
  return (
    <div>
      <PageHead
        title="Privacy Policy"
        text="This page describes how we handle your data."
      />
      <p className="mt-2 mb-1">
        This website does not collect any personal user data nor does it use
        tracking technologies. However, the hosting provider may collect data
        for service provision purposes. For more details, please refer to the
        {" "}
        <a
          href="https://docs.deno.com/deploy/manual/privacy-policy/"
          className="font-semibold decoration-pink-600 dark:decoration-pink-300 decoration-2 underline-offset-2 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Deno Deploy Privacy Policy
        </a>.
      </p>
    </div>
  );
}
