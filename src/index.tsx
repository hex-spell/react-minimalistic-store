// we need a provider, a context and a state. return type automatically if possible.
import React, { createContext, useContext, useMemo, useState }  from "react";

type SetStateFunc<T> = (newState: Partial<T>) => void;
type StoreContext<T> = { store: T; setState: SetStateFunc<T> };

export default function createStore<T>(initialState: T): {
  useStore: () => StoreContext<T>;
  StoreProvider: React.FC;
} {
  const Context = createContext({
    store: initialState,
    setState: (newState: Partial<T>) => {},
  });

  const StoreProvider: React.FC = ({ children }) => {
    const [store, setStore] = useState(initialState);

    const setState = (newState: Partial<T>) =>
      setStore({ ...store, ...newState });

    const value = useMemo(() => ({ store, setState }), [store, setState]);
    return <Context.Provider value={value}>{children}</Context.Provider>;
  };

  const useStore = () => {
    return useContext(Context);
  };

  return { StoreProvider, useStore };
}
