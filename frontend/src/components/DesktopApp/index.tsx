import { useState } from "react";
import Dropzone from "./Dropzone";
import PromptInput from "../PromptInput";

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
        </div>
        <div></div>
        <div />
      </div>
    </div>
  );
}
