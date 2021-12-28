// we need a provider, a context and a state. return type automatically if possible.
import React, { createContext, useContext, useMemo, useState } from "react";
import _ from "lodash";

type SetStateFunc<T> = (
  newState: Partial<T>,
  config?: {
    mergeStrategy: "shallow" | "deep";
  }
) => {};
type StoreContext<T> = { store: T; setState: SetStateFunc<T> };

export default function createStore<T>(initialState: T): {
  useStore: () => StoreContext<T>;
  StoreProvider: React.FC;
} {
  const Context = createContext<StoreContext<T>>({
    store: initialState,
    setState: (newState, mergeStrategy) => ({}),
  });

  const StoreProvider: React.FC = ({ children }) => {
    const [store, setStore] = useState(initialState);

    //TODO: check if these merge and spread cause rerenders
    const setState = (
      newState: Partial<T>,
      { mergeStrategy } = { mergeStrategy: "deep" }
    ) => {
      if (mergeStrategy === "deep") setStore(_.merge(newState, store));
      else if (mergeStrategy === "shallow") setStore({ ...store, ...newState });

      return {};
    };

    const value = useMemo(() => ({ store, setState }), [store, setState]);

    return <Context.Provider value={value}>{children}</Context.Provider>;
  };

  const useStore = () => {
    return useContext(Context);
  };

  return { StoreProvider, useStore };
}
