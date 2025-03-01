import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import axios from "axios";

const BookmarksContext = createContext();
const BASE_URL = "http://localhost:5000/bookmarks";
const initialState = {
  bookmarksList: [],
  isLoading: false,
  singleBookmark: null,
  error: "",
};
function bookmarksReducerFunction(state, actions) {
  switch (actions.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "bookmarks/loaded":
      return { ...state, isLoading: false, bookmarksList: actions.payload };
    case "bookmark/loaded":
      return { ...state, isLoading: false, singleBookmark: actions.payload };
    case "bookmark/created":
      return {
        ...state,
        isLoading: false,
        bookmarksList: [...state.bookmarksList, actions.payload],
        singleBookmark: actions.payload,
      };
    case "bookmark/deleted":
      return {
        ...state,
        isLoading: false,
        bookmarksList: state.bookmarksList.filter(
          (item) => item.id !== actions.payload
        ),
        singleBookmark: null,
      };
    case "bookmark/edited":
      return { ...state, isLoading: false, singleBookmark: actions.payload };
    case "rejected":
      return { ...state, isLoading: false, error: actions.payload };
    default:
      return new Error("this action is not defined in Bookmark dispatch.");
  }
}

export function BookmarksProvider({ children }) {
  const [{ bookmarksList, isLoading, singleBookmark }, dispatch] = useReducer(
    bookmarksReducerFunction,
    initialState
  );

  async function getBookmarksList() {
    try {
      dispatch({ type: "loading" });
      const { data } = await axios.get(`${BASE_URL}`);
      dispatch({ type: "bookmarks/loaded", payload: data });
    } catch (e) {
      dispatch({
        type: "rejected",
        payload: "error in get bookmarks list : " + e,
      });
    }
  }

  async function getSingleBookmark(id) {
    if (Number(id) === singleBookmark?.id) return;
    try {
      dispatch({ type: "loading" });
      const { data } = await axios.get(`${BASE_URL}/${id}`);
      dispatch({ type: "bookmark/loaded", payload: data });
    } catch (e) {
      dispatch({
        type: "rejected",
        payload: "error in get single bookmark : " + e,
      });
    }
  }

  async function createBookmark(newBookmarkObj) {
    try {
      dispatch({ type: "loading" });
      const { data } = await axios.post(`${BASE_URL}/`, newBookmarkObj);
      dispatch({ type: "bookmark/created", payload: data });
    } catch (e) {
      dispatch({
        type: "rejected",
        payload: "error in create bookmark : " + e,
      });
    }
  }

  async function searchBookmarks(query) {
    try {
      dispatch({ type: "loading" });
      const { data } = await axios.get(`${BASE_URL}?${query}`);
      dispatch({ type: "bookmarks/loaded", payload: data });
    } catch (e) {
      dispatch({
        type: "rejected",
        payload: "error in search bookmarks : " + e,
      });
    }
  }

  async function deleteBookmark(id) {
    try {
      dispatch({ type: "loading" });
      await axios.delete(`${BASE_URL}/${id}`);
      dispatch({ type: "bookmark/deleted", payload: id });
    } catch (e) {
      dispatch({
        type: "rejected",
        payload: "error in delete bookmark : " + e,
      });
    }
  }

  async function editBookmark(id, newData) {
    try {
      dispatch({ type: "loading" });
      const { data } = await axios.put(`${BASE_URL}/${id}`, newData);
      dispatch({ type: "bookmrak/edited", payload: data });
    } catch (e) {
      dispatch({
        type: "rejected",
        payload: "error in delete bookmark : " + e,
      });
    }
  }

  return (
    <BookmarksContext.Provider
      value={{
        getBookmarksList,
        singleBookmark,
        getSingleBookmark,
        bookmarksList,
        isLoading,
        createBookmark,
        searchBookmarks,
        deleteBookmark,
        editBookmark,
      }}
    >
      {children}
    </BookmarksContext.Provider>
  );
}

export function useBookmarks() {
  return useContext(BookmarksContext);
}
export default BookmarksContext;
