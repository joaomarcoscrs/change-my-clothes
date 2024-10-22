import React from "react";

const Header: React.FC = () => {
  return (
    <div className="w-full justify-center flex flex-col items-center gap-4 mb-4">
      <div className="w-2/5 py-2">
        <img src="public/roboflow-logo.png" alt="Roboflow" />
      </div>

      <h1 className="text-2xl font-bold">Add an image</h1>
      <p className="text-sm text-gray-500">
        Upload an image of yourself and we'll change your clothes for you!
      </p>
    </div>
  );
};

export default Header;
