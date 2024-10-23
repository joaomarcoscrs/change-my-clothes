import React from "react";

const Header: React.FC<{ step: "picture" | "prompt" }> = ({ step }) => {
  return (
    <div className="w-full justify-center flex flex-col self-start gap-6 mb-4">
      <div className="w-28">
        <img src="public/roboflow-logo.png" alt="Roboflow" />
      </div>
      <div className="flex flex-col gap-4 w-full">
        <h1 className="text-2xl font-bold">
          {step === "picture" ? "1. Add an image" : "2. Add a prompt"}
        </h1>
        {step === "picture" && (
          <p className="font-normal text-base text-white">
            Take a photo of your outfit or upload an image.
          </p>
        )}
      </div>
    </div>
  );
};

export default Header;
