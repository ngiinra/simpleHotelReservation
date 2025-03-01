import { Outlet } from "react-router-dom";
import { useHotels } from "../context/HotelsProvider";
import Map from "../components/Map";

export default function HotelsMain() {
  const { allData } = useHotels();
  return (
    <div>
      <div className="hotelsMain">
        <div className="hotelsList-content">
          <Outlet />
        </div>
        <div className="hotelsMap">
          <Map markers={allData} />
        </div>
      </div>
    </div>
  );
}
