import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import "./register.css";
import { TbLoader2 } from "react-icons/tb";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFetching, setIsfetching] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username === "") {
      toast.error("Enter valid user name");
      return;
    }
    if (email === "") {
      toast.error("Enter valid Email");
      return;
    }
    if (password === "") {
      toast.error("Enter Password");
      return;
    }
    setIsfetching(true);
    try {
      const res = await axios.post("/auth/register", {
        username,
        email,
        password,
      });
      res.data && window.location.replace("/login");
      setIsfetching(false);
    } catch (err) {
      toast.error("Something went wrong");
      setIsfetching(false);
    }
  };
  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          className="registerInput"
          disabled={isFetching}
          placeholder="Enter your username..."
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Email</label>
        <input
          type="text"
          className="registerInput"
          disabled={isFetching}
          placeholder="Enter your email..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          disabled={isFetching}
          className="registerInput"
          placeholder="Enter your password..."
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="registerButton" type="submit" disabled={isFetching}>
          {isFetching ? <TbLoader2 className="loader" /> : "Register"}
        </button>
      </form>
      <button className="registerLoginButton">
        <Link className="link" to="/login">
          Login
        </Link>
      </button>
      <ToastContainer />
    </div>
  );
}
