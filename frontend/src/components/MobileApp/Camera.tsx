import { useState, useEffect } from "react";
import { Button } from "@nextui-org/button";
import { Spinner } from "@nextui-org/spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

export default function Camera() {
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    const initCamera = async () => {
      try {
        const cameraStream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        setStream(cameraStream);
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    };

    initCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <>
      {stream ? (
        <div className="flex h-2/3 flex-col relative items-center justify-center gap-2 py-2">
          <video
            autoPlay
            playsInline
            ref={(videoElement) => {
              if (videoElement) {
                videoElement.srcObject = stream;
              }
            }}
            className="w-full h-full object-cover"
          />
          <Button
            isIconOnly
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-20 h-20 rounded-full bg-transparent p-0 border-0"
            aria-label="Take a photo"
          >
            <div className="w-full h-full rounded-full border-4 border-white flex items-center justify-center">
              <div className="w-[90%] h-[90%] rounded-full bg-white"></div>
            </div>
          </Button>
          <Button
            isIconOnly
            className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-white/50 backdrop-blur-md p-0 border-0"
            aria-label="Open gallery"
          >
            <FontAwesomeIcon icon={faImage} />
          </Button>
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-200">
          <Spinner label="Loading camera..." size="lg" />
        </div>
      )}
    </>
  );
}
