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
  // to the newPost userId in the model. our result is our post being posted in the resulting
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
    { $inc: { likes: 1 } },
    { new: true }
  ).populate("userId");
  res.json(updatedPost);
});

router.post("/authenticate", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    //if the user is not in database create them
    user = await User.create(req.body);
  }
  router.get("/my-posts", authorize, async (req, res) => {
    let myPosts = await Post.find({ userId: res.locals.user._id }).populate(
      "userId"
    );

    res.json(myPosts);
  });
  jwt.sign({ user }, "secret key", { expiresIn: "30min" }, (err, token) => {
    res.json({ user, token });
  });
});

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
