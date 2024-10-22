import Header from "./Header";
import Camera from "./Camera";
import { useState } from "react";

export default function MobileApp() {
  const [step, setStep] = useState<"picture" | "prompt">("picture");

  return (
    <div className="flex flex-col h-full items-center px-4 py-8">
      <Header step={step} />
      <Camera setStep={setStep} step={step} />
    </div>
  );
}
