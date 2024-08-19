import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify"; // Assuming you're using react-toastify for toast notifications
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [username, setUsername] = useState(null);
  const { getTotalCartAmount, url } = useContext(StoreContext);

  const logout = async () => {
    try {
      await axios.get(`${url}/api/user/logout`, {
        withCredentials: true,
      });
      setUsername(null);
      toast.success("Successfully logged out!");
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Failed to log out. Please try again.");
    }
  };

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await axios.get(`${url}/api/user/me`, {
          withCredentials: true,
        });
        if (response.data.success) {
          setUsername(response.data.name);
        } else {
          setUsername(null);
        }
      } catch (error) {
        console.error("Error fetching username:", error);
        setUsername(null);
      }
    };

    fetchUsername();
  }, [url]);

  return (
    <div className="navbar">
      <Link to="/">
        <h2 className="logo">Delight</h2>
      </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          Home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          Menu
        </a>
        <a
          href="#app-download"
          onClick={() => setMenu("app")}
          className={menu === "app" ? "active" : ""}
        >
          App
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          Contact Us
        </a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="Search" />
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="Basket" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {username ? (
          <div className="navbar-profile">
            <div className="navbar-profile-name">
              <img src={assets.profile_icon} alt="Profile" />
              <p>{username}</p>
            </div>
            <ul className="nav-profile-dropdown">
              <li>
                <img src={assets.bag_icon} alt="Orders" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="Logout" />
                Logout
              </li>
            </ul>
          </div>
        ) : (
          <button onClick={() => setShowLogin(true)}>Sign In</button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
