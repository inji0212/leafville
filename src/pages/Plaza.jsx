import { useState } from "react";
import PlazaCanvas from "../components/Scene/PlazaCanvas";
import ChatBox from "../components/Chat/ChatBox";
import Loader from "../components/Common/Loader";
import useSceneLoader from "../hooks/useSceneLoader";

export default function Plaza() {
  const [progress, setProgress] = useState(0);
  const { loaded } = useSceneLoader(progress);

  return (
    <div className="w-full h-full">
      {!loaded && <Loader progress={progress} />}

      <PlazaCanvas setProgress={setProgress} />

      <div className="fixed left-4 bottom-24 ">
        <ChatBox />
      </div>
    </div>
  );
}
