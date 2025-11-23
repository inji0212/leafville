import { CameraControls, PerspectiveCamera } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import {
  INITIAL_CAMERA_POSITION,
  INITIAL_CAMERA_TARGET,
  PLANT_POSITION,
  ZOOMED_CAMERA_POSITION,
} from "../../../constants/sceneConstants";

export default function CameraSetup({ isZoomed }) {
  const controlRef = useRef();
  const plantTarget = useMemo(() => new THREE.Vector3(...PLANT_POSITION), []);

  const zoomedPosition = useMemo(
    () => new THREE.Vector3(...ZOOMED_CAMERA_POSITION),
    []
  );

  useEffect(() => {
    if (controlRef.current) {
      if (isZoomed) {
        controlRef.current.setLookAt(
          zoomedPosition.x,
          zoomedPosition.y,
          zoomedPosition.z,
          plantTarget.x,
          plantTarget.y,
          plantTarget.z,
          true
        );
      } else {
        controlRef.current.setLookAt(
          ...INITIAL_CAMERA_POSITION,
          ...INITIAL_CAMERA_TARGET,
          true
        );
      }
    }
  }, [
    isZoomed,
    zoomedPosition.x,
    zoomedPosition.y,
    zoomedPosition.z,
    plantTarget.x,
    plantTarget.y,
    plantTarget.z,
  ]);

  return (
    <>
      <CameraControls
        ref={controlRef}
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 1.6}
        focusOnSelect={true}
        enabled={!isZoomed}
        mouseButtons={{
          left: 0,
          middle: 1,
          right: 2,
        }}
      />
      <PerspectiveCamera makeDefault position={[...INITIAL_CAMERA_POSITION]} />
    </>
  );
}
