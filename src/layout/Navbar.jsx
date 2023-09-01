import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="bg-gray-800 px-4 py-2 flex justify-between items-center">
      <Link to="/" className="text-white font-medium text-lg">
        Quiz App
      </Link>
    </nav>
  );
};

export default Navbar;
