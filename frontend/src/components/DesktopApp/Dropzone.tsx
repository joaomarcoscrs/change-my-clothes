import React, { useState, useRef } from "react";
import { Button } from "@nextui-org/button";
import { Spinner } from "@nextui-org/spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt, faImage } from "@fortawesome/free-solid-svg-icons";

interface DropzoneProps {
  onFileAccepted: (file: File) => void;
}

const Dropzone: React.FC<DropzoneProps> = ({ onFileAccepted }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    const validTypes = ["image/jpeg", "image/png", "image/bmp", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setError("Please upload only .jpg, .png, .bmp, or .webp images.");
      return;
    }
    setError(null);
    setIsLoading(true);
    // Simulate file processing
    setTimeout(() => {
      console.log("File accepted:", file.name);
      setIsLoading(false);
    }, 1500);
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(false);
  };

  const onClick = () => inputRef.current?.click();

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-2/3 gap-4">
      <div
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onClick={onClick}
        className={`flex flex-col items-center justify-center w-full h-full p-8 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-300 ${
          isDragActive
            ? "border-purple-500 bg-purple-50"
            : "border-gray-300 hover:border-purple-400"
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
            <p className="text-lg font-mono text-center mb-2">
              {isDragActive
                ? "Drop the image here"
                : "Drag & drop an image here"}
            </p>
            <p className="text-sm font-mono text-gray-500">
              or click to select a file
            </p>
            <p className="text-xs font-mono text-gray-400 mt-2">
              .jpg, .png, .bmp, .webp
            </p>
            <FontAwesomeIcon
              icon={faCloudUploadAlt}
              size="3x"
              className="text-gray-400 mb-4"
            />
          </>
        )}
      </div>
      {error && <p className="text-sm font-mono text-red-500 mt-2">{error}</p>}
      <Button
        className="font-mono bg-purple-600 text-white hover:bg-purple-700"
        endContent={<FontAwesomeIcon icon={faImage} />}
        onClick={onClick}
      >
        Select from gallery
      </Button>
    </div>
  );
};

export default Dropzone;
