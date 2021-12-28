# react-minimalistic-store

## Simple wrapper for Context API, avoid boilerplate and repetition

---
## Get Started
Run `npm install react-minimalistic-store` to install.

## Syntax

### createStore

```ts
// Store creation
const {
  StoreProvider,
  useStore: { store, setState },
} = createStore<StoreInterface>(initialState);

// State mutation
// mergeStrategy is "deep" by default
function setState(
  newState: Partial<Store>,
  config: { mergeStrategy: "deep" | "shallow" }
);

/*
 newState would be partial of the store state
 for example, if your store looks like this:
*/
const initialState = {
  cart: [
    {
      name: "computer",
      price: 123,
    },
    {
      name: "console",
      price: 999,
    },
  ],
  user: {
    name: "Agus",
    profilePicture: "https://http.cat/418",
  },
};

// And you want to empty the "cart" property, then you can do this:
setState({ cart: [] });

// The resulting state would be:
const state = {
  cart: [],
  user: {
    name: "Agus",
    profilePicture: "https://http.cat/418",
  },
};

/*
    if you want to overwrite an entire property without merging it to its previous state
    (that would happen if the new state doesn't have properties that the previous did)
    then you can change the merge strategy:
*/
// "shallow" overwrites properties using a js spread, "deep" does a lodash deep merge
setState({ user: { name: "Agus" } }, { mergeStrategy: "shallow" });

// The resulting state would be:
const state = {
  cart: [],
  user: {
    name: "Agus",
  },
};
```

## Code example

### Store creation

```tsx
// ./UserData.tsx

import createStore from "react-minimalistic-store";

export interface IUserData {
  user?: {
    username: string;
    profilePicture: string;
  };
}

const store = createStore<IUserData>({});

// Remember to use PascalCase for the provider, so react can read it
export const UserDataProvider = store.StoreProvider;

export const useUserData = store.useStore;
```

### Wrapping app with provider

```tsx
// ./index.tsx

import React from "react";
import ReactDOM from "react-dom";
import App from "App";
import { UserDataProvider } from "UserData";

ReactDOM.render(
  <UserDataProvider>
    <App />
  </UserDataProvider>,
  document.getElementById("root")
);
```

### In app usage

```tsx
// ./App.tsx

import { useUserData } from "UserData";

const App: React.FC = () => {
  // Destructure the state from store and rename the setState function
  // to prevent variable name collitions, in case you use this hook more than once in the same place
  const {
    store: { user },
    setState: setUserData,
  } = useUserData();

  return (
    <div>
      {user && (
        <div>
          <div>username: {user.username}</div>
          <img src={user.profilePicture} alt="profile" />
        </div>
      )}
      <input
        placeholder="username"
        onChange={(e) => {
          setState({ user: { username: e.target.value } });
        }}
      />
      <input
        placeholder="profilePicture"
        onChange={(e) => {
          setState({ user: { profilePicture: e.target.value } });
        }}
      />
    </div>
  );
};

export default App;
```

## Warning

This library is not production tested, I use it for my own projects.

Use it at your own risk and please if you find a bug report it!

Thanks for your time! :]
