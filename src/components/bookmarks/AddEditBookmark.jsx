import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useUrlLocation from "../../customHooks/useUrlLocation";
import axios from "axios";
import ReactCountryFlag from "react-country-flag";
import { Loader } from "rsuite";
import { useBookmarks } from "../../context/BookmarksContext";
import { ReturnButton } from "../Utilities";
const geoLocationReverseUrl =
  "https://us1.api-bdc.net/data/reverse-geocode-client";

function AddEditBookmark({ mode }) {
  const navigate = useNavigate();
  const [lat, lng] = useUrlLocation();
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const {
    editBookmark,
    createBookmark,
    isLoading: singleLoading,
    singleBookmark,
    getSingleBookmark,
  } = useBookmarks();

  useEffect(() => {
    if (mode === "add") {
      async function getLocationInfo() {
        try {
          setIsLoading(true);
          setError(null);
          const { data } = await axios.get(
            `${geoLocationReverseUrl}?latitude=${lat}&longitude=${lng}`
          );
          if (data.city === "")
            throw new Error(
              "هیچ شهری در منطقه انتخاب شده یافت نشد. منطقه دیگری را انتخاب کنید"
            );
          setCity(data.city || data.locality || "");
          setCountry(data.countryName);
          setCountryCode(data.countryCode);
        } catch (e) {
          setError(e);
        }
        setIsLoading(false);
      }
      getLocationInfo();
    }
  }, [lat, lng]);

  useEffect(() => {
    if (mode === "edit") {
      async function fillFields() {
        await getSingleBookmark(id);
      }
      fillFields();
      setCity(singleBookmark?.cityName);
      setCountry(singleBookmark?.country);
      setCountryCode(singleBookmark?.countryCode);
    }
  }, [mode, id]);

  async function handleAddBookmark() {
    const newBookmark = {
      cityName: city,
      country: country,
      countryCode: countryCode,
      latitude: lat,
      longitude: lng,
      host_location: city,
    };
    await createBookmark(newBookmark);
    navigate("/bookmarks");
  }

  async function handleEditBookmark() {
    await editBookmark(id, {
      cityName: city,
      country: country,
      countryCode: countryCode,
      latitude: lat,
      longitude: lng,
      host_location: city,
    });
    navigate("/bookmarks/" + id);
  }

  if (!lat || !lng) return;
  if (isLoading) return <Loader content="loading ..." />;
  if (error) return <p className="errorP">{error.message}</p>;
  return (
    <div>
      <div className="flex flex-row items-center justify-between mx-2 my-7">
        <ReturnButton to="/bookmarks" />
        <h3>{mode === "add" ? "افزودن" : "ویرایش"} بوکمارک بروی نقشه</h3>
      </div>
      <p className="text-center text-green-700 text-xs mb-2">
        در صورت تغییر شهر، بوکمارک جدید اضافه میشود و بوکمارک قبلی ویرایش
        نمیگردد.
      </p>
      <form className="my-3 mx-auto w-2/3 border-1 border-stone-300 py-5 rounded-md px-3 shadow-md text-sm">
        <div>
          <label
            htmlFor="cityName"
            className="md:w-1/5 sm:w-full inline-block text-right pr-2 font-bold"
          >
            نام شهر
          </label>
          <input
            className="p-2 md:w-3/5 sm:w-full border-stone-300 border-1 rounded-md"
            type="text"
            name="cityName"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="mt-2">
          <label
            htmlFor="countryName"
            className="md:w-1/5 sm:w-full inline-block text-right pr-2 font-bold"
          >
            {" "}
            کشور
          </label>
          <input
            className="p-2 md:w-3/5 sm:w-full border-stone-300 border-1 rounded-md"
            type="text"
            name="countryName"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <span className="ml-2 text-xl">
            <ReactCountryFlag svg countryCode={countryCode} />
          </span>
        </div>
        <div className="mt-2">
          <label className="md:w-1/5 sm:hidden md:inline-block">&nbsp;</label>
          <button
            className="w-3/5 p-2 text-center bg-green-900 hover:bg-green-700 rounded-md text-white text-sm"
            disabled={singleLoading}
            onClick={(e) => {
              e.preventDefault();
              mode === "add" ? handleAddBookmark() : handleEditBookmark();
            }}
          >
            {singleLoading ? (
              <Loader content="لطفا منتظر بمانید ..." />
            ) : mode === "add" ? (
              "افزودن +"
            ) : (
              "ویرایش"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddEditBookmark;
