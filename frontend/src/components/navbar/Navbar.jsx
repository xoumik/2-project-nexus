import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [username, setUsername] = useState(null); // State to store the username
  const { getTotalCartAmount, url } = useContext(StoreContext);

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await axios.get(`${url}/api/user/me`, {
          withCredentials: true,
        });
        console.log("API Response:", response.data); // Log response data
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
          <span className="username">{username}</span>
        ) : (
          <button onClick={() => setShowLogin(true)}>Sign In</button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
