import { useContext, useState, useEffect } from 'react';
import TheContext from '../TheContext';

function Profile(props) {
    let { user } = useContext(TheContext)
    return (
        <div>
            Profile My name is
            <div> Prop Driilling: {props.user?.name}</div>


            <div> Context: {user?.name}</div>
        </div>
    );
}

export default Profile;