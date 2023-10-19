import { useContext } from "react";
import { Store } from "../store/store";

function useStore() {
  const { state, dispatch } = useContext(Store);
  return { state, dispatch };
}

export default useStore;
