import React, { useEffect } from "react";
import Loader from "rsuite/Loader";
import { Link, useParams } from "react-router-dom";
import { useHotels } from "../../context/HotelsProvider";
import { ReturnButton } from "../Utilities";

function SelectedHotel() {
  const { id } = useParams();
  const { singleHotel: hotel, getSingleHotel } = useHotels();
  useEffect(() => {
    getSingleHotel(id);
  }, [id]);

  if (!hotel) return <Loader content="loading ..." />;
  return (
    <div>
      <ReturnButton to="/hotels" />
      <div
        className="my-5 mx-8 shadom-md border-1 border-stone-300 p-5 rounded-md"
        key={hotel.id}
      >
        <img
          className="h-80 mx-auto rounded-xl mb-5"
          src={hotel.xl_picture_url}
          onError={(e) => (e.target.src = "/img/home/home-not-founded.webp")}
        />
        <div className="text-sm">
          <span className="font-bold text-green-800 pr-5 text-lg">
            {hotel.name}
          </span>
          <span className="font-bold">{hotel.price} $</span>
          <p className="lg:flex flex-row sm:block">
            <span className="font-bold block lg:w-1/5">bedrooms no:</span>
            <p>{hotel.bedrooms}</p>
          </p>
          <p className="lg:flex flex-row sm:block">
            <span className="font-bold block lg:w-1/5">location: </span>
            <p>{hotel.host_location}</p>
          </p>
          <p className="lg:flex flex-row sm:block my-2">
            <span className="font-bold block lg:w-1/5">summary:</span>
            <p className="lg:w-4/5 text-justify">{hotel.summary}</p>
          </p>
          <p className="lg:flex flex-row sm:block my-2">
            <span className="font-bold block lg:w-1/5">space: </span>
            <p className="lg:w-4/5 text-justify">{hotel.space}</p>
          </p>
          <p className="lg:flex flex-row sm:block my-2">
            <span className="font-bold block lg:w-1/5">description: </span>
            <p className="lg:w-4/5 text-justify">{hotel.description}</p>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SelectedHotel;
