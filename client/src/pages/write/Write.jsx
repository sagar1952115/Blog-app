import { useContext, useState, useRef, useMemo } from "react";
import "./write.css";
import axios from "axios";
import JoditEditor from "jodit-react";
import { Context } from "../../context/Context";
import { ToastContainer, toast } from "react-toastify";
import { TbLoader2 } from "react-icons/tb";
import "react-toastify/dist/ReactToastify.css";

export default function Write({ placeholder }) {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);
  const editor = useRef(null);
  const [isLoading, setIsloading] = useState(false);
  const [content, setContent] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title === "") {
      toast.error("Enter the title of the blog");
      return;
    }
    const newPost = {
      username: user.username,
      title,
      desc: content,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {
        toast.error("Error Occured while file upload!!!");
      }
    }
    try {
      setIsloading(true);
      const res = await axios.post("/posts", newPost);
      toast.success("Post created successfully.");
      setIsloading(false);
      window.location.replace("/post/" + res.data._id);
    } catch (err) {
      setIsloading(false);
      toast.error("Error Occured while creating post!!!");
    }
  };
  return (
    <div className="write">
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            disabled={isLoading}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            disabled={isLoading}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <JoditEditor
            ref={editor}
            value={content}
            config={config}
            tabIndex={1} // tabIndex of textarea
            onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
            onChange={(newContent) => {}}
          />
        </div>
        <button className="writeSubmit" type="submit" disabled={isLoading}>
          {" "}
          {isLoading ? <TbLoader2 className="loader" /> : "Publish"}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}
