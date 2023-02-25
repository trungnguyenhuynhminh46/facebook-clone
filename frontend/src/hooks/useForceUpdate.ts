import { useState } from "react";
function useForceUpdate() {
  let [value, setState] = useState(true);
  return () => setState(!value);
}
export default useForceUpdate;
