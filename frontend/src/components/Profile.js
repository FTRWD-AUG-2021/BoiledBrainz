import { useContext, useState, useEffect } from 'react';
import TheContext from '../TheContext';
import actions from '../api';

function Profile(props) {
    let { user } = useContext(TheContext)
    const [myPosts, setMyPosts] = useState([])

    useEffect(async () => {
        console.log('fire')
        let res = await actions.getMyPosts()
        console.log(res)
        setMyPosts(res.data)
    }, [])

    const ShowPosts = () => {
        return myPosts.map(eachPost => {
            return (
                <>
                    <div>
                        {eachPost.title}
                    </div>
                    <div>
                        {eachPost.post}
                    </div>
                    <img src={eachPost.userId.imageUrl} />
                </>
            )
        })
    }

    return (
        <div>
            Profile My name is
            <div> Prop Driilling: {props.user?.name}</div>


            <div> Context: {user?.name}</div>
            <ShowPosts />
        </div>
    );
}

export default Profile;