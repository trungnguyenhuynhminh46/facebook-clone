import { useEffect } from "react";

export default function useOnClickOutside(
  ref: React.MutableRefObject<any>,
  handler: (event: any) => void
) {
  useEffect(() => {
    const listener = (event: any) => {
      if (
        !ref.current ||
        ref.current.contains(event.target) ||
        event.target.tagName.toLowerCase() == "i"
      ) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}
