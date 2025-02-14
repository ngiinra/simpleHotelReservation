import React from 'react'
import { Outlet } from 'react-router-dom';
import Map from '../components/Map'
import { useBookmarks } from '../context/BookmarksContext';

function BookmarksMain() {
    const {bookmarksList} = useBookmarks();
    return (
        <div className="hotelsMain" >
            <div className="hotelsList-content" >
                <Outlet/>
            </div>
            <div className='hotelsMap'>
                 <Map markers={bookmarksList}/>
            </div>
        </div>
    );
}

export default BookmarksMain