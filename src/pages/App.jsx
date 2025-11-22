import { useState } from "react";
import Loader from "../components/Loader";
import SceneCanvas from "../components/Scene/SceneCanvas";
import useSceneLoader from "../hooks/useSceneLoader";

export default function Home() {
  const [progress, setProgress] = useState(0);
  const { loaded } = useSceneLoader(progress);

  return (
    <div className="w-full h-full relative">
      {!loaded && <Loader progress={progress} />}
      <SceneCanvas setProgress={setProgress} />
    </div>
  );
}
