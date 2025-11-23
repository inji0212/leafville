import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Watering(props) {
  const { scene, animations } = useGLTF("/models/room/watering.glb");
  const ref = useRef();
  const mixer = useRef();

  useEffect(() => {
    if (animations.length > 0) {
      mixer.current = new THREE.AnimationMixer(scene);
      const action = mixer.current.clipAction(animations[0]);
      action.setLoop(THREE.LoopOnce);
      action.clampWhenFinished = true;
      action.play();
    }
    return () => mixer.current?.stopAllAction();
  }, [animations, scene]);

  useFrame((state, delta) => mixer.current?.update(delta));

  return <primitive ref={ref} object={scene} {...props} />;
}

useGLTF.preload("/models/room/watering.glb");
