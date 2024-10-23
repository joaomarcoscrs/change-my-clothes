import Header from "./Header";
import Camera from "./Camera";
import { useState } from "react";

export default function MobileApp() {
  const [step, setStep] = useState<"picture" | "prompt">("picture");

  return (
    <div className="flex flex-col h-full self-start px-4 py-6 overflow-hidden">
      <Header step={step} />
      <Camera setStep={setStep} step={step} />
    </div>
  );
}
