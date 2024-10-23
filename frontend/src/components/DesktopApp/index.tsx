import { useState } from "react";
import Dropzone from "./Dropzone";
import PromptInput from "../PromptInput";
import { Button } from "@nextui-org/button";
import { Link } from "react-router-dom";
import useApi from "../../hooks/useApi";

export default function DesktopApp() {
  const [prompt, setPrompt] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const api = useApi();

  if (resultImage) {
    return (
      <div className="p-10 flex justify-center items-center h-full">
        <div className="flex flex-col gap-2 h-full w-1/2">
          <Link
            className="w-full flex items-center justify-center"
            to="https://roboflow.com"
            target="_blank"
          >
            <img
              className="w-36 pb-10"
              src="public/roboflow-logo.png"
              alt="Roboflow"
            />
          </Link>
          <div className="h-2/3">
            <img
              src={resultImage}
              alt="Generated"
              className="w-full h-full object-contain rounded"
            />
          </div>
          <Button
            className="bg-white text-purple-700 disabled:bg-gray-400 disabled:text-gray-500 disabled:cursor-not-allowed border-gray-300 border disabled:border-0 h-12 text-base"
            radius="sm"
            variant="bordered"
            onClick={() => {
              setResultImage(null);
            }}
          >
            Generate again
          </Button>
          <div className="flex justify-center">
            <Link
              className="text-center font-normal text-gray-100 underline text-sm h-10"
              to="https://calendly.com/joao-roboflow/how-can-i-help-you-clone"
              target="_blank"
            >
              Learn more
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-10 flex justify-center items-center h-full">
      <div className="flex flex-col justify-between h-full w-1/2">
        <Link
          className="w-full flex items-center justify-center"
          to="https://roboflow.com"
          target="_blank"
        >
          <img
            className="w-36 pb-10"
            src="public/roboflow-logo.png"
            alt="Roboflow"
          />
        </Link>
        <div className="flex flex-col gap-6">
          <h1 className="text-2xl font-semibold">
            Upload an image and add a prompt
          </h1>
          <Dropzone setPhoto={setPhoto} photo={photo} />
          <PromptInput prompt={prompt} setPrompt={setPrompt} />
          <Button
            radius="sm"
            className="bg-white text-purple-700 disabled:bg-gray-400 disabled:text-gray-500 disabled:cursor-not-allowed border-gray-300 border disabled:border-0 h-12 text-base"
            style={
              prompt.length < 3 || !photo
                ? { backgroundColor: "rgba(255, 255, 255, 0.10)" }
                : {}
            }
            disabled={prompt.length < 3 || !photo}
            onClick={async () => {
              setLoading(true);
              try {
                const base64Image = photo?.split(",")[1];
                const result = await api.changeClothes(base64Image, prompt);
                setResultImage(result.result_image);
              } catch (error) {
                console.error("Error generating image:", error);
              } finally {
                setLoading(false);
              }
            }}
            isLoading={loading}
          >
            Generate
          </Button>
          <div className="flex justify-center">
            <Link
              className="text-center font-normal text-gray-100 underline text-sm h-10"
              to="https://calendly.com/joao-roboflow/how-can-i-help-you-clone"
              target="_blank"
            >
              Learn more
            </Link>
          </div>
        </div>
        <div />
        <div />
      </div>
    </div>
  );
}
