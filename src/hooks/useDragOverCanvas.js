import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export const useDragOverCanvas = (plantRef, onDropOnPlant) => {
  const { camera, gl, scene } = useThree();
  const raycaster = useRef(new THREE.Raycaster());

  useEffect(() => {
    const handleDragOver = (event) => {
      event.preventDefault();

      const mouse = new THREE.Vector2(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
      );
      raycaster.current.setFromCamera(mouse, camera);

      const intersects = raycaster.current.intersectObjects(
        scene.children,
        true
      );

      if (
        intersects.length > 0 &&
        intersects[0].object.parent === plantRef.current
      ) {
        gl.domElement.style.cursor = "pointer";
      } else {
        gl.domElement.style.cursor = "crosshair";
      }
    };

    const handleDrop = (event) => {
      handleDragOver(event);

      const intersects = raycaster.current.intersectObjects(
        scene.children,
        true
      );
      if (
        intersects.length > 0 &&
        intersects[0].object.parent === plantRef.current
      ) {
        onDropOnPlant(event);
      }
      gl.domElement.style.cursor = "auto";
    };

    gl.domElement.addEventListener("dragover", handleDragOver);
    gl.domElement.addEventListener("drop", handleDrop);

    return () => {
      gl.domElement.removeEventListener("dragover", handleDragOver);
      gl.domElement.removeEventListener("drop", handleDrop);
    };
  }, [camera, gl, scene, plantRef, onDropOnPlant]);
};
