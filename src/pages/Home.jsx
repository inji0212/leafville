import { useState } from "react";
import Loader from "../components/Common/Loader";
import SceneCanvas from "../components/Scene/SceneCanvas";
import useSceneLoader from "../hooks/useSceneLoader";

export default function Home() {
  const [progress, setProgress] = useState(0);
  const { loaded } = useSceneLoader(progress);
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <div className="w-full h-full relative">
      {!loaded && <Loader progress={progress} />}
      <SceneCanvas
        setProgress={setProgress}
        isZoomed={isZoomed}
        setIsZoomed={setIsZoomed}
      />
    </div>
  );
}
