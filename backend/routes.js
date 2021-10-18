const express = require("express");
const router = express.Router();
const Post = require("./models/Post");
const User = require("./models/User");
const jwt = require("jsonwebtoken");

//http://localhost:5000/api/all-posts GET
router.get("/all-posts", async (req, res) => {
  let allPosts = await Post.find();
  res.json(allPosts);
  // here we route our data using express to our /all-posts link
  // this is us throwing the data to the /all-posts where we catch
  //it to be used in the front end with our api. api grabbing the data
  // that we throw from the back end. once its grabbed by the api, we can then
  // use the actions to map it out in the front end.
});

//http://localhost:5000/api/new-post POST
router.post("/new-post", authorize, async (req, res) => {
  //Everyime you put authorize as middleware you'll have the user as res.locals.user the user is stored in the local stoage.
  let newPost = req.body;
  // when the user input is posted to the /new-post api, the event is tracked and the
  // input is measured as req.body. here we put the user input(req.body) into the variable
  // newPost to be manipulated. req.body will come with all sorts of data we can pull from

  newPost.userId = res.locals.user._id; // post document How we add the userId to the
  // here we set newPost.userId to res.locals.user._id this allows us to grab the user ID
  // aka the first and last name of our user. this will translate into the userId input
  //in our model. so we grab the input from the event (req.body) with that event and input comes
  //user data, so we access that data using console.log, track down the user._id, and set it equal
  // to the newPost userId in the model. our result is our post being posted in the resulting. we add this to the database by setting the post = Post.create(us creating a new piece of data using our model and its parameters)
  //json
  let post = await Post.create(newPost);
  res.json(post);
});

router.get("/get-user", authorize, async (req, res) => {
  let user = await User.findById(res.locals.user._id);
  res.json(user);
});
router.post("/like-post", authorize, async (req, res) => {
  console.log("did i  hit this!?", req.body);
  let updatedPost = await Post.findByIdAndUpdate(
    req.body.postId,
    // here we say that we want the computer to use the Post model/ collection to findBtIdAndUpdate the user input. in this case we are finding the post that matches the post the user liked in the event (req.body.postId === userInput.bodyofinput.IdSpecificToThisPost)
    { $inc: { likes: 1 } },
    // after that postId is found, we tell the computer to tell the database to increment the likes up 1.
    { new: true }
  ).populate("userId");
  //   we then populate that specific post that contains the id and we populate the post that matches usedId.
  res.json(updatedPost);
  //   okay so whats going on here. first off we are going to send whatever data we are getting her to the /like-post api. it is from here that whatever data we grab/ receive will be used in the front end. in this case we create a updatedPost variable. whenever a like click happens, the event triggers the likePost API action, which posts the event(postId) to that api. that api recieves the new data and automatically updates our collection.
});

router.post("/authenticate", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    //if the user is not in database create them
    user = await User.create(req.body);
  }
  //   here we are grabbing the users posts. we link the router to our front end with '/my-posts.'
  // Router is what gives us our stored data in MongoDB/ is what allows our code to connect with with our data base. we pull the code from the back end and we send it to /my-posts. from there we use our API actions to grab that information and display it. so it goes from the database ==> to the router ==> to my-posts ==> to api action ==> to our front end code ==> to the the display.

  router.get("/my-posts", authorize, async (req, res) => {
    let myPosts = await Post.find({ userId: res.locals.user._id }).populate(
      "userId"
      //  here we start off by creating a variable. this will store the intended data command that we want to use. our objective for my-post is to grab all of the users post. first we use our asyc await method which allows the command to only take place when the user initiates the event. we want to display only the the users data. so we grab our model for Post and we tell the computer to find (in the post datbase) all of the posts with the userId: res.locals.user._id, or in other words, the id of the currently signed in user and only their posts. we then populate all of the that userId.
    );

    res.json(myPosts);
    // we tell the computer to return a json of information that meets the parameters requested in the myPosts variable
  });
  jwt.sign({ user }, "secret key", { expiresIn: "30min" }, (err, token) => {
    res.json({ user, token });
  });
});
// jwt which is imported and given the name jwt grabs the user, gives it a signature, assigns in the secret name to the user and allows us to send the encrpyted user/ token and store it in the front end. jwt is a vessel for safely transfering user data from back to front and front to back

//Middleware >>> Put this in the middle of any route where you want to authorize
function authorize(req, res, next) {
  let token = req.headers.authorization.split(" ")[1];
  // here we grab the token from the user. if a token is found, we verify the token
  // and we set the data.user (the user) = res.locals.user
  //Token from front end
  if (token) {
    jwt.verify(token, "secret key", (err, data) => {
      if (!err) {
        res.locals.user = data.user; //Set global variable with user data in the backend
        next();
      } else {
        res.status(403).json({ message: err });
        //throw new Error({ message: "ahhh" })
      }
    });
  } else {
    res.status(403).json({ message: "Must be logged in!" });
  }
}

module.exports = router;
