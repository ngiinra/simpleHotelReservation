import React, { useEffect } from "react";
import Loader from "rsuite/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { useBookmarks } from "../../context/BookmarksContext";
import ReactCountryFlag from "react-country-flag";
import { BiEdit } from "react-icons/bi";
import { ReturnButton } from "../Utilities";

function SelectedBookmark() {
  const { id } = useParams();
  const { singleBookmark, getSingleBookmark, isLoading } = useBookmarks();
  const navigate = useNavigate();
  useEffect(() => {
    getSingleBookmark(id);
  }, [id]);

  async function handleEditBookmark(e, singleBookmark) {
    e.preventDefault();
    navigate(
      `/bookmarks/edit/${singleBookmark.id}?lat=${singleBookmark.latitude}&lng=${singleBookmark.longitude}`
    );
  }

  if (isLoading || !singleBookmark) return <Loader />;
  return (
    <div>
      <ReturnButton to="/bookmarks" />
      <div
        className="w-100 mx-auto my-10 rounded-lg shadow-md p-10 border-1 border-stone-300 text-sm"
        key={singleBookmark.id}
      >
        <div>
          <h3 className="font-bold text-md mb-1 text-blue-700">
            {singleBookmark.cityName}
          </h3>
          <button
            className="float-right cursor-pointer"
            onClick={(e) => handleEditBookmark(e, singleBookmark)}
          >
            <BiEdit className="text-blue-700 text-4xl" />
          </button>
          <p>
            <span className="font-bold">country: </span>
            {singleBookmark.country}
          </p>
          <p>
            <span className="font-bold">country code: </span>
            <ReactCountryFlag
              countryCode={singleBookmark.countryCode}
              svg
            />{" "}
          </p>
          <p>
            <span className="font-bold">host location: </span>
            {singleBookmark.host_location}
          </p>
        </div>
      </div>
    </div>
  );
}

export default SelectedBookmark;
