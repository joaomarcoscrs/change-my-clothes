import React from "react";

interface PromptInputProps {
  prompt: string;
  setPrompt: (value: string) => void;
}

const PromptInput: React.FC<PromptInputProps> = ({ prompt, setPrompt }) => {
  return (
    <div>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder='"Tropical clothes"'
        className="w-full h-12 p-2 font-mono text-sm font-light border text-gray-300 border-gray-400 bg-white/5 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-700 hover:bg-white/10 focus:bg-white/10 hover:border-purple-400 focus:border-purple-400 focus:text-white"
      />
    </div>
  );
};

export default PromptInput;
