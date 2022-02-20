import { Link } from "react-router-dom";
import "./sidebar.css";
import axios from "axios";
import { useEffect, useState } from "react";
import about from "../../img/OIP.jpg"

export default function Sidebar() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/categories");
      setCats(res.data);
    };
    getCats();
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img
          src={about}
          alt=""
        />
        <p>
        A passionate Full Stack Software Developer 🚀 having an experience of building Web and Mobile applications with JavaScript / Reactjs / Nodejs / React Native and some other cool libraries and frameworks.
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
        {cats.map((c) => (
            <Link to={`/?cat=${c.name}`} className="link">
            <li className="sidebarListItem">{c.name}</li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
        <a href="https://www.facebook.com/profile.php?id=100078504875184" target="_blank">  <i className="topIcon fab fa-facebook-square"></i></a>
        <a href="https://www.instagram.com/sagar_kumar_821/" target="_blank"> <i className="topIcon fab fa-instagram-square"></i></a>
        <a href="https://pin.it/6ecbL43" target="_blank"><i className="topIcon fab fa-pinterest-square"></i></a>
        <a href="https://twitter.com/Sagar_kumar821" target="_blank">  <i className="topIcon fab fa-twitter-square"></i></a>
        <a href="https://www.linkedin.com/in/sagar-kumar-73a25018b/" target="_blank"> <i className="topIcon fab fa-linkedin"></i></a>
       
        </div>
      </div>
    </div>
  );
}