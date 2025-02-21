import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();
const initialState = { user: null, isAuthenticated: false };
const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function authReducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };
    default:
      throw new Error("Unknown action type");
  }
}

function AuthContextProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    authReducer,
    initialState
  );
  function logIn(user) {
    if (user.email === FAKE_USER.email && user.password === FAKE_USER.password)
      dispatch({ type: "login", payload: user });
  }

  function logOut(user) {
    dispatch({ type: "logout" });
  }
  return (
    <AuthContext.Provider value={{ logIn, logOut, user, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("Auth context used outside the Auth Provider");
  return context;
}

export { AuthContextProvider, useAuthContext };
