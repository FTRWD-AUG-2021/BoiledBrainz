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
  },
  authenticate: async (user) => {
    let res = await axios.post(`${SERVER_URL}/authenticate`, user);
    localStorage.setItem("token", res.data.token);
  },
  getUser: async () => {
    return await axios.get(`${SERVER_URL}/get-user`, createHeader());
  },
  getMyPosts: async () => {
    return await axios.get(`${SERVER_URL}/my-posts`, createHeader());
  },
  likePost: async (postId) => {
    return await axios.post(
      `${SERVER_URL}/like-post`,
      { postId },
      createHeader()
    );
  },
};

export default actions;
