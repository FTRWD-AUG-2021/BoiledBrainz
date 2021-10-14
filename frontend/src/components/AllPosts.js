import { useEffect, useState } from "react";
import actions from "../api";

function AllPosts(props) {
  const [posts, setPosts] = useState([]);

  useEffect(async () => {
    let res = await actions.getAllPosts();
    setPosts(res.data.reverse());
    // here we get all posts, which is us getting the data from /all-posts and setting the setPosts = to the res.data
    //or in other words, the resulting data from our get.
  }, []);
  const handleClick = async (whichPostId, i) => {
    console.log("click", whichPostId);
    let res = await actions.likePost(whichPostId);
    console.log(res.data);
    let newPosts = [...posts];
    newPosts[i] = res.data;
    setPosts(newPosts);
  };
  const ShowPosts = () => {
    return posts.map((eachPost, i) => {
      return (
        <div key={eachPost._id}>
          <h3>{eachPost.title}</h3>
          <p>{eachPost.post}</p>
          <i>{eachPost.userId.name}</i>
          <img src={eachPost.userId.imageUrl} />
          <br></br>
          <h3>Likes: {eachPost.likes}</h3>
          <button onClick={(e) => handleClick(eachPost._id, i)}>Like 👍</button>
          <hr></hr>
        </div>
      );
    });
  };

  return (
    <div>
      All Posts
      <ShowPosts />
    </div>
  );
}

export default AllPosts;
