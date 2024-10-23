import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC<{ step: "picture" | "prompt" }> = ({ step }) => {
  return (
    <div className="w-full justify-center flex flex-col items-center gap-4 mb-4">
      <Link className="w-2/5 py-2" to="https://roboflow.com" target="_blank">
        <img src="public/roboflow-logo.png" alt="Roboflow" />
      </Link>
      <div className="flex flex-col gap-4 w-full">
        <h1 className="text-2xl font-semibold">
          {step === "picture" ? "1. Add an image" : "2. Add a prompt"}
        </h1>
        {step === "picture" && (
          <p className="leading-relaxed font-light">
            Take a photo of your outfit or upload an image.
          </p>
        )}
      </div>
    </div>
  );
};

export default Header;
