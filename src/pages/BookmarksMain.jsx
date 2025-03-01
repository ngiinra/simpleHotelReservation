import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Map from "../components/Map";
import { useBookmarks } from "../context/BookmarksContext";
import { useUsers } from "../context/UsersContext";

function BookmarksMain() {
  const { bookmarksList } = useBookmarks();

  return (
    <div>
      <div className="hotelsMain ">
        <div className="hotelsList-content">
          <Outlet />
        </div>
        <div className="hotelsMap">
          <Map markers={bookmarksList} />
        </div>
      </div>
    </div>
  );
}

export default BookmarksMain;
