import { useEffect, useState } from "react";

function useVisualViewportHeight() {
  const [viewportHeight, setViewportHeight] = useState<number | undefined>(
    undefined
  );
  useEffect(() => {
    function handleResize() {
      setViewportHeight(window.visualViewport?.height);
    }
    window.visualViewport?.addEventListener("resize", handleResize);
    handleResize();
    return () =>
      window.visualViewport?.removeEventListener("resize", handleResize);
  }, []);
  return viewportHeight;
}
export default useVisualViewportHeight;
