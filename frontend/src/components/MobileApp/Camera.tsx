import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@nextui-org/button";
import { Spinner } from "@nextui-org/spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faRotate } from "@fortawesome/free-solid-svg-icons";
import PromptInput from "../PromptInput";
import useApi from "@/hooks/useApi";

export default function Camera({
  step,
  setStep,
}: {
  step: "picture" | "prompt" | "result";
  setStep: (step: "picture" | "prompt" | "result") => void;
}) {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    async function initCamera() {
      try {
        const cameraStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: facingMode },
        });
        setStream(cameraStream);
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    }

    initCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [facingMode]);

  const setVideoRef = useCallback(
    (videoElement: HTMLVideoElement | null) => {
      if (videoElement) {
        videoRef.current = videoElement;
        videoElement.srcObject = stream;
      }
    },
    [stream]
  );

  const flipCamera = useCallback(async () => {
    if (stream) {
      // Stop all tracks of the current stream
      stream.getTracks().forEach((track) => track.stop());
    }

    try {
      const newFacingMode = facingMode === "user" ? "environment" : "user";
      const newStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: newFacingMode },
      });

      setStream(newStream);
      setFacingMode(newFacingMode);

      // Update video source
      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
      }
    } catch (error) {
      console.error("Error switching camera:", error);
      // Handle the error (e.g., show a message to the user)
    }
  }, [stream, facingMode]);

  async function takePhoto() {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas.getContext("2d")?.drawImage(videoRef.current, 0, 0);
      const photoData = canvas.toDataURL("image/jpeg");
      setPhoto(photoData);
      setStep("prompt");
    }
  }

  async function openGallery() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
          setPhoto(e.target?.result as string);
          setStep("prompt");
        };
        fileReader.readAsDataURL(file);
      }
    };
    input.click();
  }

  const api = useApi();

  if (resultImage) {
    return (
      <div className="flex flex-col relative items-center gap-2 py-2">
        <div className="h-2/3 relative">
          <img
            src={resultImage}
            alt="Generated"
            className="w-full h-full object-contain rounded"
          />
        </div>
        <div
          className="flex flex-col gap-2 bottom-0 left-0 right-0 fixed p-4 border border-t-gray-600 border-r-0 border-l-0 border-b-0 bg-opacity-5"
          style={{ backgroundColor: "#311C4C" }}
        >
          <Button
            className="bg-white text-purple-700 disabled:bg-gray-400 disabled:text-gray-500 disabled:cursor-not-allowed border-gray-300 border disabled:border-0 h-12 text-base"
            radius="sm"
            onClick={() => {
              setResultImage(null);
              setStep("prompt");
            }}
          >
            Add a New Prompt
          </Button>
          <Button
            className="text-white border border-gray-300 bg-transparent h-12 text-base"
            radius="sm"
            variant="bordered"
            onClick={() => {
              setResultImage(null);
              setPrompt("");
              setStep("picture");
              setPhoto(null);
            }}
          >
            Use a New Photo
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      {step === "picture" && stream ? (
        <div className="flex h-2/3 flex-col relative items-center justify-center gap-2 py-2">
          <video
            autoPlay
            playsInline
            ref={setVideoRef}
            className="w-full h-full object-cover rounded"
          />
          <Button
            isIconOnly
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-20 h-20 rounded-full bg-transparent p-0 border-0"
            aria-label="Take a photo"
            onClick={takePhoto}
          >
            <div className="w-full h-full rounded-full border-4 border-white flex items-center justify-center">
              <div className="w-[90%] h-[90%] rounded-full bg-white" />
            </div>
          </Button>
          <Button
            isIconOnly
            className="absolute bottom-4 left-4 bg-white/50 backdrop-blur-md p-0 border-0"
            aria-label="Open gallery"
            onClick={openGallery}
          >
            <FontAwesomeIcon size="lg" icon={faImage} />
          </Button>
          <Button
            isIconOnly
            className="absolute bottom-4 right-4 bg-white/50 backdrop-blur-md p-0 border-0"
            aria-label="Flip camera"
            onClick={flipCamera}
          >
            <FontAwesomeIcon size="lg" icon={faRotate} />
          </Button>
        </div>
      ) : step === "prompt" && photo ? (
        <div className="flex flex-col h-2/3 gap-4">
          <PromptInput prompt={prompt} setPrompt={setPrompt} />
          <img
            src={photo}
            alt="Captured"
            className="w-full h-full object-cover rounded"
          />
          <div
            className="flex flex-col gap-2 bottom-0 left-0 right-0 fixed p-4 border border-t-gray-600 border-r-0 border-l-0 border-b-0 bg-opacity-5"
            style={{ backgroundColor: "#311C4C" }}
          >
            <Button
              className="bg-white text-purple-700 disabled:bg-gray-400 disabled:text-gray-500 disabled:cursor-not-allowed border-gray-300 border disabled:border-0 h-12 text-base"
              style={
                prompt.length < 3 || !photo
                  ? { backgroundColor: "rgba(255, 255, 255, 0.10)" }
                  : {}
              }
              radius="sm"
              disabled={prompt.length < 3 || !photo}
              isLoading={loading}
              onClick={async () => {
                setLoading(true);
                const base64Image = photo?.split(",")[1];
                try {
                  const result = await api.changeClothes(base64Image, prompt);

                  setResultImage(result.result_image);
                  setStep("result");
                } catch (error) {
                  console.error("Error generating image:", error);
                } finally {
                  setLoading(false);
                }
              }}
            >
              Generate
            </Button>
            <Button
              className="text-white border border-gray-300 bg-transparent h-12 text-base"
              radius="sm"
              variant="bordered"
              onClick={() => {
                setStep("picture");
                setPhoto(null);
                setPrompt("");
              }}
            >
              Retake Photo
            </Button>
          </div>
        </div>
      ) : (
        <div
          className="w-full h-full flex items-center justify-center border border-gray-400 rounded-lg"
          style={{ background: "rgba(255, 255, 255, 0.10)" }}
        >
          <Spinner
            className="text-white"
            color="white"
            label="Loading camera..."
            size="lg"
          />
        </div>
      )}
    </>
  );
}
