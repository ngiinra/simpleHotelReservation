import { Link } from "react-router-dom";

export function ReturnButton({ to }) {
  return (
    <Link to={to}>
      <button className="p-2 border-1 border-stone-300 rounded-md text-sm w-50 ml-4 hover:text-white hover:bg-green-900 cursor-pointer">
        بازگشت ←
      </button>
    </Link>
  );
}
