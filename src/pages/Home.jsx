import { useEffect, useState } from "react";
import Loader from "../components/Common/Loader";
import SceneCanvas from "../components/Scene/SceneCanvas";
import useSceneLoader from "../hooks/useSceneLoader";
import PlantCard from "../components/Card/PlantCard";
import WateringAnimation from "../components/Common/WateringAnimation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import useUserStore from "../store/authState";

export default function Home() {
  const [progress, setProgress] = useState(0);
  const { loaded } = useSceneLoader(progress);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isWatering, setIsWatering] = useState(false);
  const { setUser, clearUser } = useUserStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        clearUser();
      }
    });

    return () => unsubscribe();
  }, [setUser, clearUser]);
  return (
    <div className="w-full h-full relative">
      {!loaded && <Loader progress={progress} />}
      <SceneCanvas
        setProgress={setProgress}
        isZoomed={isZoomed}
        setIsZoomed={setIsZoomed}
        setIsCardOpen={setIsCardOpen}
        isDragging={isDragging}
        setIsDragging={setIsDragging}
        isWatering={isWatering}
        setIsWatering={setIsWatering}
      />
      <WateringAnimation isWatering={isWatering} />
      {isCardOpen && (
        <PlantCard
          setIsZoomed={setIsZoomed}
          setIsCardOpen={setIsCardOpen}
          setIsDragging={setIsDragging}
          isDragging={isDragging}
        />
      )}
    </div>
  );
}
