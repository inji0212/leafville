import { useGLTF } from "@react-three/drei";
import { useState } from "react";
import { useCursorPointer } from "../../../hooks/useCursorPointer";

export default function PlantTomato({ setIsZoomed, ...props }) {
  const { scene } = useGLTF("/models/plant/tomato1.glb");
  const [hovered, setHovered] = useState(false);

  useCursorPointer(hovered);

  const handleClick = (event) => {
    event.stopPropagation();
    console.log("Plant clicked! Toggling zoom status.");
    setIsZoomed((prev) => !prev);
  };
  return (
    <primitive
      object={scene}
      {...props}
      onClick={handleClick}
      onPointerOver={(event) => {
        event.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={(event) => {
        event.stopPropagation();
        setHovered(false);
      }}
    />
  );
}

useGLTF.preload("/models/plant/tomato1.glb");
