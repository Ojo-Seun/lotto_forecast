export interface OperationsReturnValues {
  newEntries: number;
  previousEntries: number;
  response?: any;
  yearsCreated?: any;
}

interface Error {
  err: boolean;
  message: string;
}

interface State {
  error: Error;
  loading: boolean;
  data: OperationsReturnValues;
}

interface Action<T, P> {
  type: T;
  payload: P;
}
type Actions = Action<"LOADING", boolean> | Action<"ERROR", Error> | Action<"DATA", OperationsReturnValues>;

// interface Actions {
//   type: ActionsType;
//   payload: State;
// }

export const initialState: State = {
  error: { err: false, message: "" },
  loading: false,
  data: {
    newEntries: 0,
    previousEntries: 0,
  } as OperationsReturnValues,
};

export const operationsReducer = (state = initialState, action: Actions) => {
  switch (action.type) {
    case "LOADING":
      return { ...state, loading: action.payload };
    case "DATA":
      return { ...state, data: action.payload };
    case "ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
