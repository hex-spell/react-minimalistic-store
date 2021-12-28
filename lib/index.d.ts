import React from "react";
declare type SetStateFunc<T> = (newState: Partial<T>, config?: {
    mergeStrategy: "shallow" | "deep" | "replace";
}) => {};
declare type StoreContext<T> = {
    store: T;
    setState: SetStateFunc<T>;
};
export default function createStore<T>(initialState: T): {
    useStore: () => StoreContext<T>;
    StoreProvider: React.FC;
};
export {};
