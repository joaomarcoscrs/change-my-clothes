import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faImage, faTimes } from "@fortawesome/free-solid-svg-icons";

import { Button } from "@nextui-org/button";
import { useState, useEffect, useRef } from "react";

export default function DesktopApp() {
  return (
    <div className="p-10 flex flex-col items-center">
      <img className="w-36" src="public/roboflow-logo.png" alt="Roboflow" />
      <div>
        <h1>Upload an image and add a prompt</h1>
      </div>
    </div>
  );
}
