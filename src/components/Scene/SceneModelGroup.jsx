import Room from "./Room";
import Plant from "./plant";

export default function SceneModelGroup() {
  return (
    <group scale={3.5} position={[0, -3, 0]}>
      <Room />
      <Plant scale={0.15} position={[-1.8, 1.56, 0]} />
    </group>
  );
}
