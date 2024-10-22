import React from "react";

const Header: React.FC = () => {
  return (
    <div className="w-full justify-center flex flex-col items-center gap-4 mb-4">
      <div className="w-2/5 py-2">
        <img src="public/roboflow-logo.png" alt="Roboflow" />
      </div>
      <div className="flex flex-col gap-4 w-full">
        <h1 className="text-2xl font-medium">Add an image</h1>
        <p className=" leading-relaxed">
          Take a photo of your outfit or upload an image.
        </p>
      </div>
    </div>
  );
};

export default Header;
