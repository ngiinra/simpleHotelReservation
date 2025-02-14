import React, { useEffect } from 'react'
import Loader from 'rsuite/Loader';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useBookmarks } from '../../context/BookmarksContext';
import ReactCountryFlag from 'react-country-flag';
import { BiEdit } from 'react-icons/bi';

function SelectedBookmark() {
  const { id } = useParams();
  const { singleBookmark, getSingleBookmark, isLoading } = useBookmarks();
  const navigate = useNavigate();
  useEffect(() => {
    getSingleBookmark(id);
  }, [id])

  async function handleEditBookmark(e,singleBookmark) {
    e.preventDefault();
    navigate(`/bookmarks/edit/${singleBookmark.id}?lat=${singleBookmark.latitude}&lng=${singleBookmark.longitude}`)
  }

  if (isLoading || !singleBookmark) return <Loader />
  return (
    <div>
      <Link to='/bookmarks'><button className='return-btn'>بازگشت ←</button></Link>

      <div className="hotel-indivisual" key={singleBookmark.id} >
        <div className="hotel-desc">
          <h3 className="bold">{singleBookmark.cityName}</h3>
          <button className='no-color-btn' style={{ float: 'right' }} onClick={(e)=>handleEditBookmark(e,singleBookmark)}>
            <BiEdit style={{ color: 'orange', fontSize: '30px' }} />
          </button>
          <p><span className="bold">country: </span>{singleBookmark.country}</p>
          <p><span className="bold">country code: </span><ReactCountryFlag countryCode={singleBookmark.countryCode} svg /> </p>
          <p><span className="bold">host location: </span>{singleBookmark.host_location}</p>
        </div>
      </div>
    </div>
  )
}

export default SelectedBookmark;