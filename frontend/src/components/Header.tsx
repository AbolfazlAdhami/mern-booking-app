import { useAppContext } from "@/context/AppContext";
import { Link } from "react-router-dom";
import SignOutButton from "./SignOutButton";

const Header = () => {
  const { isLoggedIn } = useAppContext();

  const HeaderStyle = {
    navLink: "flex items-center text-white px-3 font-bold hover:bg-blue-600 transition-all ease-in rounded-lg",
    singInButton: "flex bg-white items-center text-blue-600 px-3 font-bold hover:bg-gray-100 p-2 transition-all ease-in rounded-lg",
  };

  return (
    <div className="bg-orange-400 text-white py-6">
      <div className="container mx-auto flex justify-between">
        <h1 className="text-3xl text-white font-bold tracking-tight  ">
          <Link to="/">MernBooking.com</Link>
        </h1>
        <div className="flex space-x-2">
          {isLoggedIn ? (
            <>
              <Link className={HeaderStyle.navLink} to="/my-bookings">
                My Bookings
              </Link>
              <Link className={HeaderStyle.navLink} to="/my-hotels">
                My Hotels
              </Link>
              <SignOutButton />
            </>
          ) : (
            <Link to="/sign-in" className={HeaderStyle.singInButton}>
              Sign In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
