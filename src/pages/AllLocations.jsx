import useFetch from "../customHooks/useFetch";
import { Loader } from "rsuite";
import { Link } from "react-router-dom";
export default function AllLocations() {
  const { allData, isLoading } = useFetch("http://localhost:5000/hotels");

  if (isLoading) return <Loader content="loading..." />;
  return (
    <div>
      <div className="grid xl:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 gap-2 mt-5">
        {allData.map((data) => {
          return (
            <Link
              to={`/hotels/${data.id}?lat=${data.latitude}&lng=${data.longitude}`}
              key={data.id}
            >
              <div className="size-70 overflow-hidden mx-auto my-3 py-1 hover:border-stone-400 hover:border-1 rounded-md">
                <img
                  className="h-50 w-65 overflow-hidden rounded-md mx-auto"
                  src={data?.xl_picture_url}
                  onError={(e) =>
                    (e.target.src = "/img/home/home-not-founded.webp")
                  }
                />
                <div className="mt-2 text-xs text-center">
                  <p>{data.smart_location}</p>
                  <p className="text-gray-600">{data.name}</p>
                  <p className="text-bold">
                    {" "}
                    <span className="text-blue-700"> € {data.price}</span> night
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
