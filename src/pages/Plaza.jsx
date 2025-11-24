import { useState } from "react";
import PlazaCanvas from "../components/Scene/PlazaCanvas";
import ChatBox from "../components/Chat/ChatBox";

export default function Plaza() {
  const [, setProgress] = useState(0);

  return (
    <div className="w-full h-full">
      <PlazaCanvas setProgress={setProgress} />

      <div className="fixed left-4 bottom-24 ">
        <ChatBox />
      </div>
    </div>
  );
}
