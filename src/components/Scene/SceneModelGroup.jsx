import { PLANT_POSITION } from "../../constants/sceneConstants";
import PlantTomato from "./Models/PlantTomato";
import Room from "./Models/Room";

export default function SceneModelGroup({ setIsZoomed }) {
  return (
    <group scale={1}>
      <Room scale={3.5} position={[0, -3, 0]} />
      <PlantTomato
        scale={0.6}
        position={[...PLANT_POSITION]}
        setIsZoomed={setIsZoomed}
      />
    </group>
  );
}
