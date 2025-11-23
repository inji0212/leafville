import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";

import CameraSetup from "./Camera/CameraSetup";
import SceneModelGroup from "./SceneModelGroup";
import { ProgressReporter } from "./UI/ProgressReporter";

export default function SceneCanvas({
  setProgress,
  isZoomed,
  setIsZoomed,
  setIsCardOpen,
  isDragging,
  setIsDragging,
}) {
  const handlePointerMissed = () => {
    if (isDragging) {
      setIsDragging(false);
      document.body.style.cursor = "auto";
      alert("식물에 물을 주세요! 💧");
    }
  };

  return (
    <div className="fixed w-screen h-screen">
      <Canvas flat onPointerMissed={handlePointerMissed}>
        <ambientLight intensity={Math.PI} />
        <CameraSetup isZoomed={isZoomed} />
        <SceneModelGroup
          setIsZoomed={setIsZoomed}
          setIsCardOpen={setIsCardOpen}
          setIsDragging={setIsDragging}
          isDragging={isDragging}
        />
        <Environment files="scene/sunny.hdr" background blur={0} />
        <ProgressReporter setProgress={setProgress} />
      </Canvas>
    </div>
  );
}
