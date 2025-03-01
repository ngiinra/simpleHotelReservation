import React, { useState } from "react";
import { useBookmarks } from "../../context/BookmarksContext";
import { IoIosSearch } from "react-icons/io";

function SearchBookmarks() {
  const [countryQuery, setCountryQuery] = useState("");
  const { searchBookmarks, bookmarksList } = useBookmarks();

  const handleSearch = async () => {
    await searchBookmarks(`country_like=${countryQuery}`);
  };

  return (
    <form>
      <div className="my-5 mx-10 flex items-center border-1 border-stone-300 rounded-md ">
        <button
          type="button"
          className=" bg-green-900 size-10 hover:bg-green-700 text-white rounded-l-md"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleSearch();
          }}
        >
          <IoIosSearch className="size-full p-3" />
        </button>
        <input
          className="p-2 w-9/10 active:border-0"
          type="text"
          placeholder="نام کشور"
          value={countryQuery}
          onChange={(e) => setCountryQuery(e.target.value)}
        />
      </div>
      <h2 className="pl-2 mb-2 w-full pb-2 border-b-1 border-stone-300">
        founded bookmarks ({bookmarksList?.length})
      </h2>
    </form>
  );
}

export default SearchBookmarks;
