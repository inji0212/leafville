import { useEffect, useState } from "react";

/**
 * Canvas 밖에서 Loader를 제어할 때 사용
 * @param {number} Progress - Canvas 내부에서 전달된 progress (0~100)
 * @returns {Object} loaded: boolean, Progress: number
 */
export default function useSceneLoader(progress) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (progress >= 100) {
      setTimeout(() => setLoaded(true), 300);
    }
  }, [progress]);

  return { loaded };
}
