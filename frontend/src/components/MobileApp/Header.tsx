import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC<{ step: "picture" | "prompt" }> = ({ step }) => {
  return (
    <div className="w-full justify-center flex flex-col self-start gap-6 mb-4">
      <div className="flex justify-between self-stretch items-center">
        <div className="w-28">
          <Link to="https://roboflow.com/" target="_blank">
            <img src="public/roboflow-logo.png" alt="Roboflow" />
          </Link>
        </div>
        <Link
          className="text-center font-normal text-gray-100 underline text-sm h-10 leading-10"
          to="https://calendly.com/joao-roboflow/how-can-i-help-you-clone"
          target="_blank"
        >
          Learn more
        </Link>
      </div>
      <div className="flex flex-col gap-4 w-full">
        <h1 className="text-2xl font-black text-white">
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
