import { useState, useRef, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

export const useDragAndDrop = (isDragging, setIsDragging) => {
  const { camera } = useThree();
  const [dragPosition, setDragPosition] = useState(null);
  const plane = useRef(new THREE.Plane(new THREE.Vector3(0, 0, 1), 0));

  useEffect(() => {
    const handlePointerMove = (event) => {
      if (isDragging) {
        const mouse = new THREE.Vector2(
          (event.clientX / window.innerWidth) * 2 - 1,
          -(event.clientY / window.innerHeight) * 2 + 1
        );

        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, camera);

        const intersect = raycaster.ray.intersectPlane(
          plane.current,
          new THREE.Vector3()
        );
        if (intersect) setDragPosition(intersect);
      }
    };

    const handlePointerUp = () => {
      if (isDragging) {
        setIsDragging(false);
      }
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [isDragging, camera, setIsDragging]);

  return { dragPosition };
};
