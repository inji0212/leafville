import { useGLTF } from "@react-three/drei";
import { useCallback, useRef, useState } from "react";
import { useCursorPointer } from "../../hooks/useCursorPointer";
import { useDragOverCanvas } from "../../hooks/useDragOverCanvas";

export default function PlantTomato({
  setIsZoomed,
  setIsCardOpen,
  // isDragging,
  // setIsDragging,
  // setIsWatering,
  // showWateringbox,
  ...props
}) {
  const { scene } = useGLTF("/models/plant/tomato1.glb");
  const plantRef = useRef();
  const [hovered, setHovered] = useState(false);

  useCursorPointer(hovered);

  const handleDropOnPlant = useCallback(() => {
    alert("물 주기가 완료되었습니다! 🌱");
  }, []);

  useDragOverCanvas(plantRef, handleDropOnPlant);

  const handleClick = (event) => {
    event.stopPropagation();
    setIsZoomed(true);
    setIsCardOpen(true);
  };

  return (
    <primitive
      object={scene}
      {...props}
      ref={plantRef}
      onClick={handleClick}
      onPointerOver={(event) => {
        event.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={(event) => {
        event.stopPropagation();
        setHovered(false);
      }}
    ></primitive>
  );
}

useGLTF.preload("/models/plant/tomato1.glb");
