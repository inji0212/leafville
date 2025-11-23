import { useState } from "react";
import SquareCanvas from "../components/Scene/SquareCanvas";

export default function Square() {
  const [, setProgress] = useState(0);

  return (
    <div className="w-full h-full relative">
      <SquareCanvas setProgress={setProgress} />
    </div>
  );
}
