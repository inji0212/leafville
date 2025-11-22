import { useGLTF } from "@react-three/drei";

export default function Plant(props) {
  const { scene } = useGLTF("/models/plant/tomato1.glb");

  return <primitive object={scene} {...props} />;
}

useGLTF.preload("/models/plant/tomato1.glb");
