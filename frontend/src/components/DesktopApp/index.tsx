import { useState } from "react";
import Dropzone from "./Dropzone";
import PromptInput from "../PromptInput";
import { Button } from "@nextui-org/button";
import { Link } from "react-router-dom";

export default function DesktopApp() {
  const [prompt, setPrompt] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);

  return (
    <div className="p-10 flex justify-center items-center h-full">
      <div className="flex flex-col justify-between h-full w-1/2">
        <div className="w-full flex items-center justify-center">
          <img
            className="w-36 pb-10"
            src="public/roboflow-logo.png"
            alt="Roboflow"
          />
        </div>
        <div>
          <h1 className="text-2xl font-semibold mb-6">
            Upload an image and add a prompt
          </h1>
          <Dropzone setPhoto={setPhoto} photo={photo} />
          <PromptInput prompt={prompt} setPrompt={setPrompt} />
          <Button radius="sm" className="w-full mt-4 bg-white text-purple-700">
            Generate
          </Button>
          <div className="flex justify-center mt-8">
            <Link
              className="text-center font-bold text-sm"
              to="https://calendly.com/joao-roboflow/how-can-i-help-you-clone"
              target="_blank"
            >
              Learn more
            </Link>
          </div>
        </div>
        <div></div>
        <div />
      </div>
    </div>
  );
}
