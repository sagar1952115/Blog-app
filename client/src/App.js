import Topbar from "./components/topbar/Topbar";
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Setting from "./pages/settings/Setting";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";
import Contact from "./components/contact/Contact";
import About from "./components/about/About";


function App() {
  const { user } = useContext(Context);
  return (
    <BrowserRouter>
    <Topbar/>
      <Routes>
        <Route path="/" element={<Homepage />}>
      </Route>

      <Route path="/register" element={user ?<Homepage/>:<Register />} />
      <Route path="/posts" element={<Homepage/>} />
      <Route path="/login" element={user ? <Homepage/>:<Login />} />
      <Route path="/contact" element={user ?<Contact/> : <Login/>} />
      <Route path="/about" element={user ?<About/> : <Login/>} />
      <Route path="/write" element={user ? <Write /> : <Login/>} />
      <Route path="/setting" element={user ? <Setting /> :<Login/>} />
      <Route path="/post/:id" element={<Single />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;