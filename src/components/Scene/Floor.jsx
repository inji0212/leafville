import { useGLTF } from "@react-three/drei";

export default function Floor(props) {
  const { scene } = useGLTF("/models/room/floor.glb");

  return <primitive object={scene} {...props} />;
}

useGLTF.preload("/models/room/floor.glb");