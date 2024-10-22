import Header from "./Header";
import Camera from "./Camera";

export default function MobileApp() {
  return (
    <div className="flex flex-col h-full items-center px-4 py-8">
      <Header />
      <Camera />
    </div>
  );
}
