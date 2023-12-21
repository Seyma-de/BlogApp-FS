import React from "react";

const Post = () => {
  return (
    <div className="post">
      <div className="image">
        {" "}
        <img
          src="https://kinsta.com/wp-content/uploads/2020/05/best-blogging-platform-1024x512.png"
          alt=""
        />
      </div>

      <div className="texts">
        <h2>Best Blogging Platforms To Help You Get Content Out in the Wild</h2>
        <p className="info">
          <a className="author">Dawid</a>
          <time>2024-01-01 23:26</time>
        </p>

        <p className="summary">
          Even with the advent of YouTube and social media, blogging is still
          alive and well. Over 409 million people read personal and professional
          blogs hosted on WordPress.com alone each month.
        </p>
      </div>
    </div>
  );
};

export default Post;
