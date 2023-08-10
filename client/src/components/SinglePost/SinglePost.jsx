import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./SinglePost.css";
import Tohtml from "../Tohtml";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HTMLReactParser from "html-react-parser";
import { TbLoader2 } from "react-icons/tb";
import JoditEditor from "jodit-react";

export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const PF = "http://localhost:5000/images/";
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/posts/" + path);
      console.log(res);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
  }, [path]);
  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/,
    uploader: {
      url: "https://xdsoft.net/jodit/finder/?action=fileUpload",
    },
    filebrowser: {
      ajax: {
        url: "https://xdsoft.net/jodit/finder/",
      },
      height: 580,
    },
  };
  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${post._id}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) {}
  };

  const handleUpdate = async () => {
    try {
      setIsLoading(true);
      await axios.put(`/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
      });
      toast.success("Post updated successfully");
      setIsLoading(false);
      setUpdateMode(false);
    } catch (err) {
      setIsLoading(false);

      console.log(err);
    }
  };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
          <img src={PF + post.photo} alt="" className="singlePostImg" />
        )}
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePostTitle">
            {title}
            {post.username === user?.username && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon far fa-edit"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className="singlePostIcon far fa-trash-alt"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author:
            <Link to={`/?user=${post.username}`} className="link">
              <b> {post.username}</b>
            </Link>
          </span>
          <span className="singlePostDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <JoditEditor
            value={desc}
            config={config}
            tabIndex={1} // tabIndex of textarea
            onBlur={(newContent) => setDesc(newContent)} // preferred to use only this option to update the content for performance reasons
            onChange={(newContent) => {}}
          />
        ) : (
          <div>{HTMLReactParser(desc)}</div>
        )}
        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            {isLoading ? <TbLoader2 className="loader" /> : "Update"}
          </button>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}
