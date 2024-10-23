import React from "react";

interface PromptInputProps {
  prompt: string;
  setPrompt: (value: string) => void;
}

const PromptInput: React.FC<PromptInputProps> = ({ prompt, setPrompt }) => {
  return (
    <div>
      <h2 className="text-lg font-medium my-4">Prompt</h2>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder='"Tropical clothes"'
        className="w-full h-12 p-2 font-mono text-sm font-light border text-gray-300 border-gray-400 bg-white/10 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-700"
      />
    </div>
  );
};

export default PromptInput;
