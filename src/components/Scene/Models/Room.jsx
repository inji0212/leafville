import { useGLTF } from "@react-three/drei";

export default function Room(props) {
  const { scene } = useGLTF("/models/room/room.glb");

  return (
    <primitive
      object={scene}
      {...props}
      onPointerOver={(e) => e.stopPropagation()}
      onPointerOut={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
    />
  );
}

useGLTF.preload("/models/room/room.glb");
