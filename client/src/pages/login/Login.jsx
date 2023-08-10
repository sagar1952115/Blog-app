import axios from "axios";
import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TbLoader2 } from "react-icons/tb";
import "./login.css";

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userRef.current.value === "") {
      toast.error("Enter valid UserName");
    }
    if (passwordRef.current.value === "") {
      toast.error("Enter valid Password");
    }
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      toast.error("Something went wrong.");
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          className="loginInput"
          placeholder="Enter your username..."
          disabled={isFetching}
          ref={userRef}
        />
        <label>Password</label>
        <input
          type="password"
          className="loginInput"
          disabled={isFetching}
          placeholder="Enter your password..."
          ref={passwordRef}
        />
        <button className="loginButton" type="submit" disabled={isFetching}>
          {isFetching ? <TbLoader2 className="loader" /> : "Login"}
        </button>
      </form>
      <button className="loginRegisterButton">
        <Link className="link" to="/register">
          Register
        </Link>
      </button>
      <ToastContainer />
    </div>
  );
}
