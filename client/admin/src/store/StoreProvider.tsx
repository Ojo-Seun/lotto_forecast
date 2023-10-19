import { useReducer } from "react";
import { Store, ctxInitialState } from "./store";
import { reducer } from "./reducer";

interface Props {
  children: React.ReactNode;
}

function StoreProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, ctxInitialState);
  const values = { state, dispatch };
  return <Store.Provider value={values}>{children}</Store.Provider>;
}

export default StoreProvider;
