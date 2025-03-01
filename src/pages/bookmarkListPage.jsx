import Loader from "rsuite/Loader";
import { useBookmarks } from "../context/BookmarksContext";
import SearchBookmarks from "./../components/bookmarks/SearchBookmarks";
import BookmarksList from "../components/bookmarks/BookmarksList";
import { useEffect } from "react";

export default function BookmarksListPage() {
  const { isLoading, getBookmarksList } = useBookmarks();
  useEffect(() => {
    getBookmarksList();
  }, []);

  return (
    <div>
      <SearchBookmarks />
      {isLoading ? (
        <Loader content="loading .." style={{ margin: "5rem" }} />
      ) : (
        <BookmarksList />
      )}
    </div>
  );
}
