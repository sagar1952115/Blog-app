import { Link } from "react-router-dom";
import HTMLReactParser from "html-react-parser";
import "./post.css";

export default function Post({ post }) {
  const PF = "https://blogapp-a680.onrender.com/images/";
  return (
    <div className="post">
      {post.photo && <img className="postImg" src={PF + post.photo} alt="" />}
      <div className="postInfo">
        <div className="postCats">
          {post.categories.map((c) => {
            return <span className="postCat">{c.name}</span>;
          })}
        </div>
        <span className="postTitle">
          <Link to={`/post/${post._id}`} className="link">
            {post.title}
          </Link>
        </span>
        <hr />
        <span className="postDate">
          {" "}
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className="postDesc">{HTMLReactParser(post.desc)}</p>
    </div>
  );
}
