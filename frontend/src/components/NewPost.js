import { useState } from 'react';
import axios from 'axios'
import actions from '../api';

function NewPost(props) {

    let [title, setTitle] = useState('')
    let [post, setPost] = useState('')


    const handleSubmit = async e => {
        e.preventDefault()
        let res = await actions.createNewPost({ title, post })
        props.history.push('/all-posts')
    }


    return (
        <div>
            <label>New Post</label>
            <form onSubmit={handleSubmit}>
                <input onChange={e => setTitle(e.target.value)} type="text" placeholder="Title" />
                <input onChange={e => setPost(e.target.value)} type="text" placeholder="Post" />
                <button>Submit</button>
            </form>
        </div>
    );
}

export default NewPost;