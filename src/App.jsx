import './App.css'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import HotelsMain from './pages/HotelsMain'
import SearchedHotels from './components/SearchedHotels'
import SelectedHotel from './components/SelectedHotel'
import AllLocations from './components/AllLocations'

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
      </Routes>
      
    </>
  )
}

export default App
