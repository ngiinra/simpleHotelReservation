import axios from "axios";
import { createContext, useContext, useReducer } from "react";

const UsersContext = createContext();

const BASE_URL = "http://localhost:5000/users";
const initialUser = {
  username: null,
  password: null,
  isAuth: false,
  isLoading: false,
  error: null,
};
function usersReducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "user/loaded":
      return {
        ...state,
        isLoading: false,
        username: action.payload?.username,
        password: action.payload?.password,
      };
    case "user/authed":
      return { ...state, isAuth: true };
    case "user/notAuthed":
      return {
        ...state,
        username: null,
        password: null,
        isAuth: false,
        isLoading: false,
        error: null,
      };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error("undefind action in users reducer.");
  }
}
export function UsersProvider({ children }) {
  const [user, dispatch] = useReducer(usersReducer, initialUser);

  /**
   * Login if user exist.
   * @param {string} username
   * @param {string} password
   */
  async function login(username, password) {
    try {
      dispatch({ type: "loading" });
      const { data } = await axios.get(
        `${BASE_URL}?username=${username}&password=${password}`
      );
      if (data.length === 0) {
        dispatch({ type: "user/notAuthed" });
        dispatch({ type: "rejected", payload: "User not found." });
      } else if (data.length === 1) {
        const userInServer = data[0];
        dispatch({
          type: "user/loaded",
          payload: {
            username: userInServer.username,
            password: userInServer.password,
          },
        });
        dispatch({ type: "user/authed" });
      }
    } catch {
      dispatch({ type: "rejected", payload: "error eccoured in login" });
    }
  }

  function logout() {
    dispatch({ type: "user/notAuthed" });
  }

  return (
    <UsersContext.Provider value={{ user, login, logout }}>
      {children}
    </UsersContext.Provider>
  );
}

export function useUsers() {
  if (!UsersContext) throw new Error("out of users context!");
  return useContext(UsersContext);
}
