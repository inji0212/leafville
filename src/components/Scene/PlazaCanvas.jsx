import { Canvas } from "@react-three/fiber";
import {
  Environment,
  useProgress,
  PerspectiveCamera,
  CameraControls,
} from "@react-three/drei";
import { useEffect } from "react";
import PlazaBox from "../Models/PlazaBox";

export default function PlazaCanvas({ setProgress }) {
  function ProgressReporter() {
    const { progress } = useProgress();

    useEffect(() => {
      setProgress?.(progress);
    }, [progress]);

    return null;
  }

  return (
    <div className="fixed w-screen h-screen">
      <Canvas flat>
        <ambientLight intensity={0} />

        <PerspectiveCamera makeDefault position={[15, 10, 20]} />
        <CameraControls minPolarAngle={0} maxPolarAngle={Math.PI / 1.6} />

        <PlazaBox scale={0.5} position={[0, 0, 0]} rotation={[0, 3.5, 0]} />

        <Environment files="scene/sunny.hdr" background blur={0} />
        <ProgressReporter />
      </Canvas>
    </div>
  );
}
