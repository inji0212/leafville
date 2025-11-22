import { useEffect } from 'react';

export function useCursorPointer(hovered) {
  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
    return () => {
        document.body.style.cursor = "auto"; 
    }
  }, [hovered]);
}