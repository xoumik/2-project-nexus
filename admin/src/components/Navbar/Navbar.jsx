import "./Navbar.css";
import { assets } from "../../assets/assets";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="full-logo">
        <h2 className="logo">Delight</h2>
        <p>Admin Panel</p>
      </div>
      <img className="profile" src={assets.profile_image} alt="" />
    </div>
  );
};
export default Navbar;
