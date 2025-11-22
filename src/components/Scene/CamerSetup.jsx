import { CameraControls, PerspectiveCamera } from "@react-three/drei";

export default function CameraSetup() {
  return (
    <>
      <CameraControls minPolarAngle={0} maxPolarAngle={Math.PI / 1.6} />
      <PerspectiveCamera makeDefault position={[15, 10, 20]} />
    </>
  );
}
