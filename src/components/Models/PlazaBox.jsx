import { useGLTF } from "@react-three/drei";

export default function PlazaBox(props) {
  const { scene } = useGLTF("/models/room/square.glb");

  return <primitive object={scene} {...props} />;
}

useGLTF.preload("/models/room/square.glb");
