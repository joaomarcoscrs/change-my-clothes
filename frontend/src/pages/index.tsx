import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

import { title, subtitle } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { Button } from "@nextui-org/button";

function handleCameraButtonClick() {
  console.log("Camera button clicked");
}

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <span className={title()}>Make&nbsp;</span>
          <span className={title({ color: "violet" })}>beautiful&nbsp;</span>
          <br />
          <span className={title()}>
            websites regardless of your design experience.
          </span>
          <div className={subtitle({ class: "mt-4" })}>
            Beautiful, fast and modern React UI library.
          </div>
        </div>

        <div className="mt-8">
          <Snippet hideCopyButton hideSymbol variant="bordered">
            <span>
              Get started by editing{" "}
              <Code color="primary">pages/index.tsx</Code>
            </span>
          </Snippet>
        </div>

        <div className="mt-8">
          <Button
            color="primary"
            variant="shadow"
            startContent={<FontAwesomeIcon icon={faCamera} />}
            onClick={handleCameraButtonClick}
          >
            Open Camera or Pick Image
          </Button>
        </div>
      </section>
    </DefaultLayout>
  );
}
