import axios from "axios";
import { useEffect, useState } from "react";

function JsonServer() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/posts").then((res) => {
      setPosts(res.data), console.log(res.data);
    });
  }, []);

  function handlePostClick() {
    axios
      .post("http://localhost:3000/posts", {
        title: "Fred",
        author: "Flintstone",
      })
      .then(function (res) {
        console.log(res);
      });
  }

  function handleDeleteClick() {
    axios
      .delete("http://localhost:3000/posts/2")
      .then((res) => setPosts(res.data));
  }

  return (
    <div>
      {/* {JSON.stringify(posts)} */}
      {posts.map((post) => {
        return (
          <div key={post.id}>
            {post.title}
            {post.author}
          </div>
        );
      })}
      <button onClick={handlePostClick}>Send Post</button>
      <button onClick={handleDeleteClick}>Delete post</button>
    </div>
  );
}

export default JsonServer;
