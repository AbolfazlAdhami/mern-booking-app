import { Link } from "react-router-dom";

const Header = () => {
  const isLoggedIn = false; // Replace with your authentication logic

  const HeaderStyle = {
    navLink: "flex items-center text-white px-3 font-bold hover:bg-blue-600",
    singInButton: "flex bg-white items-center text-blue-600 px-3 font-bold hover:bg-gray-100",
  };

  return (
    <div className="bg-blue-500 text-white py-6">
      <div className="container mx-auto flex justify-between">
        <h1 className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">MernBooking.com</Link>
        </h1>
        <div>
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
