import { useState } from "react";
import SquareCanvas from "../components/Scene/SquareCanvas";
import ChatBox from "../components/Chat/ChatBox";

export default function Square() {
  const [, setProgress] = useState(0);

  return (
    <div className="w-full h-full">
      <SquareCanvas setProgress={setProgress} />

      <div className="fixed left-4 bottom-24 ">
        <ChatBox />
      </div>
    </div>
  );
}
