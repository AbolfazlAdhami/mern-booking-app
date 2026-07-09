import { useAppContext } from "@/contexts/AppContext";
import { Link } from "react-router-dom";
import SignOutButton from "./SignOutButton";
import { HeaderStyle } from "@/constants/styles";

const Header = () => {
  const { isLoggedIn } = useAppContext();



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
