import { Link } from "react-router-dom";
import "./Topbar.css";
import { useContext } from "react";
import { Context } from "../../context/Context";

export default function Topbar() {
  const PF = "http://localhost:5000/images/";

  const { user, dispatch } = useContext(Context);
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="top">
      <div className="topLeft">
        <a
          href="https://www.facebook.com/profile.php?id=100078504875184"
          target="_blank"
          rel="noreferrer"
        >
          {" "}
          <i className="topIcon fab fa-facebook-square"></i>
        </a>
        <a
          href="https://www.instagram.com/sagar_kumar_821/"
          target="_blank"
          rel="noreferrer"
        >
          {" "}
          <i className="topIcon fab fa-instagram-square"></i>
        </a>
        <a href="https://pin.it/6ecbL43" target="_blank" rel="noreferrer">
          <i className="topIcon fab fa-pinterest-square"></i>
        </a>
        <a
          href="https://twitter.com/Sagar_kumar821"
          target="_blank"
          rel="noreferrer"
        >
          {" "}
          <i className="topIcon fab fa-twitter-square"></i>
        </a>
        <a
          href="https://www.linkedin.com/in/sagar-kumar-73a25018b/"
          target="_blank"
          rel="noreferrer"
        >
          {" "}
          <i className="topIcon fab fa-linkedin"></i>
        </a>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/about">
              ABOUT
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/contact">
              CONTACT
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/write">
              WRITE
            </Link>
          </li>
          {user && (
            <li className="topListItem" onClick={handleLogout}>
              LOGOUT
            </li>
          )}
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <Link className="link" to="/setting">
            <img className="topImg" src={PF + user.ProfilePic} alt="" />
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
        <i className="topSearchIcon fas fa-search"></i>
      </div>
    </div>
  );
}
