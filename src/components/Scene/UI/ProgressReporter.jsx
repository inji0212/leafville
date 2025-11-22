import { useEffect } from "react";
import { useProgress } from "@react-three/drei";

export function ProgressReporter({ setProgress }) {
  const { progress } = useProgress();

  useEffect(() => {
    setProgress(progress);
  }, [progress, setProgress]);

  return null;
}
