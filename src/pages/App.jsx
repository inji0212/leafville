import { Canvas } from "@react-three/fiber";
import {
  CameraControls,
  Environment,
  PerspectiveCamera,
} from "@react-three/drei";
import Floor from "../components/Scene/Floor";

export default function Home() {
  return (
    <div className="w-full h-full">
      <Canvas flat>
        <CameraControls minPolarAngle={0} maxPolarAngle={Math.PI / 1.6} />
        <ambientLight intensity={Math.PI} />

        {/* group으로 전체 모델 위치/크기 조절 */}
        <group scale={1} position={[0, 0, 0]}>
          <Floor />
        </group>
        <Environment preset="forest" background blur={0} />
        <PerspectiveCamera makeDefault position={[10, 10, 20]} />
      </Canvas>
    </div>
  );
}
