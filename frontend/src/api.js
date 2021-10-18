import axios from "axios";

let SERVER_URL =
  process.env.NODE_ENV === "development"
    ? `http://localhost:5000/api`
    : `https://ourlivelink.herokuapp.com/api`;

const createHeader = () => {
  //Sends my token to the backend
  return {
    headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
  };
};

//THIS IS WHERE WE CONNECT TO THE BACKEND >> OUR FRONT END ROUTES
const actions = {
  getAllPosts: async () => {
    return await axios.get(`${SERVER_URL}/all-posts`, createHeader());
    // when we cann on getAllPosts, we are getting the data that we have in the all-posts server url.
    // so here we import axios and along with it the get command. this allows us to get information from mongoose compass, which is storing our data.
    //  we get this data and we send it to the /all-posts link, where we will go and grab that information
    //here we are getting the data that we sent to all-posts in the router.
    // this is what we use to catch the data we throw in our router.
  },
  createNewPost: async ({ title, post }) => {
    return await axios.post(
      `${SERVER_URL}/new-post`,
      { title, post },
      createHeader()
    );
    // here we grab the parameters title and post which were set and inputted by the user using useState. we send this data to our /new-post with the intention of using our router to grab whats sent to the api and place it into our database where we can later get and manipulate.
  },
  authenticate: async (user) => {
    let res = await axios.post(`${SERVER_URL}/authenticate`, user);
    localStorage.setItem("token", res.data.token);
    // we grab the profileObj when initiated, which in this function is the user.
    // we grab the users google token located in res.data.token and we give it a title of "token". we then set the item in local storage.
  },
  getUser: async () => {
    return await axios.get(`${SERVER_URL}/get-user`, createHeader());
  },
  getMyPosts: async () => {
    return await axios.get(`${SERVER_URL}/my-posts`, createHeader());
    // here we create our action which will be called in our front end code. we want to get whatever has been put into the my-posts which was defined and filtered in the routes. basically router (back-end code) takes the data in mongoDb, takes what ever code and command we gave it, uses that code to define what data we want out of the collection, the computer grabs that data and sends it whatever API link we define to later be grabbed here and manipulated in our code. in this line of code, he router told the computer to go into the collection Posts, find the posts specific too the userId that is set to the current user, and then pupulate. populate just means that all the documents we grab must have a userId= to the userId we defined (the logged in user). if you wanted to populate one piece of data, you would do findOne({with.specific.object}).populate('specific detail about of selected post'). because we used find(specific.pobject).populate(anything with usedId) find() meant we would
    // find all that matched this parameter. if we did just find().populate(userId) it would have found and returned anything with an userId instead of just the logged in user.
  },
  likePost: async (postId) => {
    return await axios.post(
      `${SERVER_URL}/like-post`,
      { postId },
      //   here we tell the computer that whatever object is being returned by this command, it will be known as postId
      createHeader()
    );
  },
};

export default actions;
