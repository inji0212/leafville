import { useDragAndDrop } from "../../../hooks/useDragAndDrop";
import WateringCan from "../../Models/WateringCan";

export default function DraggableWateringCan({ isDragging, setIsDragging }) {
  const { dragPosition } = useDragAndDrop(isDragging, setIsDragging);

  if (!isDragging || !dragPosition) return null;
  return (
    <WateringCan
      position={[dragPosition.x, dragPosition.y + 0.5, dragPosition.z]}
      scale={0.15}
      rotation={[0, Math.PI / 2, 0]}
    />
  );
}
