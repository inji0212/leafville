import { Canvas } from "@react-three/fiber";
import { Environment, useProgress } from "@react-three/drei";

import { useEffect } from "react";
import CameraSetup from "./CamerSetup";
import SceneModelGroup from "./SceneModelGroup";

export default function SceneCanvas({ setProgress }) {
  function ProgressReporter() {
    const { progress } = useProgress();

    useEffect(() => {
      setProgress(progress);
    }, [progress]);

    return null;
  }
  return (
    <div className="fixed w-screen h-screen">
      <Canvas flat>
        <ambientLight intensity={Math.PI} />
        <CameraSetup />
        <SceneModelGroup />
        <Environment files="scene/sunny.hdr" background blur={0} />
        <ProgressReporter />
      </Canvas>
    </div>
  );
}
