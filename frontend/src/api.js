import axios from 'axios';

let SERVER_URL = process.env.NODE_ENV === 'development' ? `http://localhost:5000/api` : `https://ourlivelink.herokuapp.com/api`

const createHeader = () => { //Sends my token to the backend
    return { headers: { authorization: `Bearer ${localStorage.getItem('token')}` } }
}


//THIS IS WHERE WE CONNECT TO THE BACKEND >> OUR FRONT END ROUTES
const actions = {
    getAllPosts: async () => {
        return await axios.get(`${SERVER_URL}/all-posts`, createHeader())
    },
    createNewPost: async ({ title, post }) => {
        return await axios.post(`${SERVER_URL}/new-post`, { title, post }, createHeader())
    },
    authenticate: async (user) => {
        let res = await axios.post(`${SERVER_URL}/authenticate`, user)
        localStorage.setItem('token', res.data.token)
    },
    getUser: async () => {
        return await axios.get(`${SERVER_URL}/get-user`, createHeader())
    },
    getMyPosts: async () => {
        return await axios.get(`${SERVER_URL}/my-posts`, createHeader())
    },
    likePost: async (postId) => {
        return await axios.post(`${SERVER_URL}/like-post`, { postId }, createHeader())
    }
}


export default actions