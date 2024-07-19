import { BsCheckCircleFill } from "react-icons/bs";
import { webAppData } from "utils/webapp/mod.ts";

export default function Success() {
  if (!webAppData.value.safe) {
    return <></>;
  }
  return (
    <div>
      <div className="mt-4">
        <p className="text-center text-green-500">
          <BsCheckCircleFill className="inline mr-2 mb-2 h-24 w-24" />
        </p>

        <p className="mt-2 italic">
          Thank you for your contribution! Your request has been submitted
          successfully. You can now close this tab by clicking the X button at
          the top.
        </p>
      </div>
    </div>
  );
}
