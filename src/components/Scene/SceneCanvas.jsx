import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";

import CameraSetup from "./Camera/CameraSetup";
import SceneModelGroup from "./SceneModelGroup";
import { ProgressReporter } from "./UI/ProgressReporter";

export default function SceneCanvas({ setProgress, isZoomed, setIsZoomed }) {
  return (
    <div className="fixed w-screen h-screen">
      <Canvas flat>
        <ambientLight intensity={Math.PI} />
        <CameraSetup isZoomed={isZoomed} />
        <SceneModelGroup setIsZoomed={setIsZoomed} />
        <Environment files="scene/sunny.hdr" background blur={0} />
        <ProgressReporter setProgress={setProgress} />
      </Canvas>
    </div>
  );
}
