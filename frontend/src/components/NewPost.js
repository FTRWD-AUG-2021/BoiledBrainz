import { useState } from "react";
import axios from "axios";
import actions from "../api";

function NewPost(props) {
  let [title, setTitle] = useState("");
  let [post, setPost] = useState("");
  // here we are creating our new post. now to complete this objective. i know im going to need to import useState from react. ill have my post and my title, both of which will change, starting out
  // empty then we want whatever the user inputs to go into the data base to later be grabbed and displayed. we want to post whatever the user inputs unto our data base using our model and pushing it into our API with axios. we are going to create an action in our API file using axios. in order to get the user input to be measured we have to use e.target.value which will track whatever the user changes everytime he changes it until we submit. we will make an onSubmit as well as a handle Submit to handle what happens on submission, which in this case is us posting something to our database to later be pulled. upon submission we use props.history.push('all-posts') to take us directly to the all-posts page, which will be displaying all of our posts as well as our recently posted one.

  const handleSubmit = async (e) => {
    //    here we have our e.preventDefault, which is used here for making sure that the whole page doesnt reload everytime the submission is made, which is how it was designed to work before SPA enviornments/react.
    e.preventDefault();
    let res = await actions.createNewPost({ title, post });
    // here we have our handle submit, which is not synched with the page but is asynchrnous to the event, which in this case, is the submission of our new-post form.
    //  we create a variable. in that variable we contain our action, which is contained in our actions file. this createNewPost command will when the even is called, return the command that allows us to post the new user input into our
    props.history.push("/all-posts");
  };

  return (
    <div>
      <label>New Post</label>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Title"
        />
        <input
          onChange={(e) => setPost(e.target.value)}
          type="text"
          placeholder="Post"
        />
      </form>
    </div>
  );
}

export default NewPost;
