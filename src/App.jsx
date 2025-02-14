import 'rsuite/Loader/styles/index.css';
import './App.css'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import HotelsMain from './pages/HotelsMain'
import SearchedHotels from './components/hotels/SearchedHotels'
import SelectedHotel from './components/hotels/SelectedHotel'
import AllLocations from './components/AllLocations'
import BookmarksMain from './pages/BookmarksMain'
import SelectedBookmark from './components/bookmarks/SelectedBookmark'
import BookmarksListPage from './pages/bookmarkListPage';
import AddEditBookmark from './components/bookmarks/AddEditBookmark';


function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<AllLocations/>}/>
        <Route path='/hotels' element={<HotelsMain/>} >
          <Route index element={<SearchedHotels/>}/>
          <Route path='/hotels/:id' element={<SelectedHotel/>} />
        </Route>
        <Route path='/bookmarks' element={<BookmarksMain/>}>
          <Route index element={<BookmarksListPage/>} />
          <Route path='add' element={<AddEditBookmark mode='add'/>}/>
          <Route path=':id' element={<SelectedBookmark/>}/>
          <Route path='edit/:id' element={<AddEditBookmark mode='edit'/>} />
        </Route>
      </Routes>
      
    </>
  )
}

export default App
