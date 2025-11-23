import { useGLTF } from "@react-three/drei";

export default function WateringCan(props) {
  const { scene } = useGLTF("/models/room/wateringcan.glb");
  return <primitive object={scene} {...props} />;
}

useGLTF.preload("/models/room/wateringcan.glb");
