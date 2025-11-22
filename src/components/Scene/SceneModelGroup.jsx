import Floor from "./Floor";

export default function SceneModelGroup() {
  return (
    <group scale={1} position={[0, 0, 0]}>
      <Floor />
    </group>
  );
}
