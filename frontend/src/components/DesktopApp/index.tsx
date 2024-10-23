import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faImage, faTimes } from "@fortawesome/free-solid-svg-icons";

import { Button } from "@nextui-org/button";
import { useState, useEffect, useRef } from "react";
import Dropzone from "./Dropzone";

export default function DesktopApp() {
  return (
    <div className="p-10 flex justify-center items-center">
      <div className="flex flex-col items-center justify-center w-1/2">
        <img
          className="w-36 pb-10"
          src="public/roboflow-logo.png"
          alt="Roboflow"
        />
        <div>
          <h1 className="text-2xl font-medium">
            Upload an image and add a prompt
          </h1>
        </div>
        <Dropzone />
      </div>
    </div>
  );
}
