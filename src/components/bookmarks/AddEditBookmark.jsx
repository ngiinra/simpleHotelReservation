import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import useUrlLocation from '../../customHooks/useUrlLocation';
import axios from 'axios';
import ReactCountryFlag from 'react-country-flag';
import { Loader } from 'rsuite';
import { useBookmarks } from '../../context/BookmarksContext';
const geoLocationReverseUrl = "https://us1.api-bdc.net/data/reverse-geocode-client";

function AddEditBookmark({ mode }) {
  const navigate = useNavigate();
  const [lat, lng] = useUrlLocation();
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const { editBookmark, createBookmark, isLoading: singleLoading, singleBookmark, getSingleBookmark } = useBookmarks();

  useEffect(() => {
    if (mode==='add'){
      async function getLocationInfo() {
        try {
          setIsLoading(true);
          setError(null);
          const { data } = await axios.get(`${geoLocationReverseUrl}?latitude=${lat}&longitude=${lng}`);
          if (data.city === "")
            throw new Error("هیچ شهری در منطقه انتخاب شده یافت نشد. منطقه دیگری را انتخاب کنید");
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
    if (mode === 'edit') {
      async function fillFields() {
        await getSingleBookmark(id);
      }
      fillFields();
      setCity(singleBookmark?.cityName);
      setCountry(singleBookmark?.country);
      setCountryCode(singleBookmark?.countryCode);
    }
  }, [mode,id])

  async function handleAddBookmark() {
    const newBookmark = {
      "cityName": city,
      "country": country,
      "countryCode": countryCode,
      "latitude": lat,
      "longitude": lng,
      "host_location": city,
    };
    await createBookmark(newBookmark);
    navigate('/bookmarks');
  }

  async function handleEditBookmark() {
    await editBookmark(id, {
      "cityName": city,
      "country": country,
      "countryCode": countryCode,
      "latitude": lat,
      "longitude": lng,
      "host_location": city,
    });
    navigate('/bookmarks/' + id);
  }

  if (!lat || !lng) return;
  if (isLoading) return <Loader content="loading ..." />;
  if (error) return (<p className='errorP'>{error.message}</p>);
  return (
    <div>
      <div className='near-flex'>
        <Link to="/bookmarks"><button className='return-btn'>بازگشت ←</button></Link>
        <h3>{mode==='add'?"افزودن":"ویرایش"} بوکمارک بروی نقشه</h3>
      </div>
      <p style={{textAlign:'center', color:'green',fontSize:'small'}}>در صورت تغییر شهر، بوکمارک جدید اضافه میشود و بوکمارک قبلی ویرایش نمیگردد.</p>
      <form className='add-bookmark-form'>
        <div>
          <label htmlFor='cityName'>نام شهر</label>
          <input type="text" name="cityName" value={city} onChange={(e) => setCity(e.target.value)} />
        </div>
        <div>
          <label htmlFor='countryName'> کشور</label>
          <input type="text" name="countryName" value={country} onChange={(e) => setCountry(e.target.value)} />
          <span className='flagOn'><ReactCountryFlag svg countryCode={countryCode} /></span>
        </div>
        <button className='return-btn' disabled={singleLoading} onClick={(e) => {
          e.preventDefault();
          mode === 'add' ? handleAddBookmark() : handleEditBookmark();
        }}>
          {singleLoading ? <Loader content="لطفا منتظر بمانید ..." /> :
            mode === 'add' ? "افزودن +" : "ویرایش"}
        </button>
      </form>
    </div>
  )
}

export default AddEditBookmark