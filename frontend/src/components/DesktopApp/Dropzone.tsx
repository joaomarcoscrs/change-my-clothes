import React, { useState, useRef } from "react";
import { Button } from "@nextui-org/button";
import { Spinner } from "@nextui-org/spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt, faTimes } from "@fortawesome/free-solid-svg-icons";

interface DropzoneProps {
  setPhoto: (file: File | null) => void;
  photo: string | null;
}

const Dropzone: React.FC<DropzoneProps> = ({ setPhoto, photo }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(file: File) {
    const validTypes = ["image/jpeg", "image/png", "image/bmp", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setError("Please upload only .jpg, .png, .bmp, or .webp images.");
      return;
    }
    setError(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64String = e.target?.result as string;
      setPhoto(base64String);
      console.log("File accepted and converted to base64:", file.name);
    };
    reader.readAsDataURL(file);
  }

  function onDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  function onDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragActive(true);
  }

  function onDragLeave(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragActive(false);
  }

  function onClick() {
    inputRef.current?.click();
  }

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }

  function removePhoto() {
    setPhoto(null);
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-2/3 gap-4">
      {photo ? (
        <div className="relative w-full h-full">
          <img
            src={photo}
            alt="Uploaded photo"
            className="w-full h-full object-contain"
          />
          <Button
            isIconOnly
            size="sm"
            className="absolute top-2 right-2 bg-white/30 hover:bg-white/40 text-white"
            onClick={removePhoto}
          >
            <FontAwesomeIcon icon={faTimes} />
          </Button>
        </div>
      ) : (
        <>
          <div
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onClick={onClick}
            className={`flex flex-col items-center justify-center w-full h-full p-8 border border-dashed rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer transition-colors duration-300 ${
              isDragActive
                ? "border-purple-500 bg-purple-50"
                : "border-gray-400 hover:border-purple-400"
            }`}
          >
            <input
              ref={inputRef}
              type="file"
              accept="image/jpeg,image/png,image/bmp,image/webp"
              onChange={onInputChange}
              className="hidden"
            />
            {isLoading ? (
              <Spinner size="lg" color="secondary" />
            ) : (
              <>
                <p className="text-lg font-light text-center mb-2">
                  {isDragActive
                    ? "Drop the image here."
                    : "Choose an image or drag and drop here."}
                </p>
                <p className="text-sm font-light text-gray-400 mt-2">
                  .jpg, .png, .bmp, .webp
                </p>
                <FontAwesomeIcon
                  icon={faCloudUploadAlt}
                  size="2x"
                  className="text-gray-300 mt-4"
                />
              </>
            )}
          </div>
          {error && (
            <p className="text-sm font-mono text-red-500 mt-2">{error}</p>
          )}
        </>
      )}
    </div>
  );
};

export default Dropzone;
