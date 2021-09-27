import React from 'react';
import { GoogleLogin } from 'react-google-login';
import actions from '../api'

function Auth({ getUser }) {

    const responseGoogle = async ({ profileObj }) => { //Go to google and get my info
        await actions.authenticate(profileObj) //Send profile info to my api
        getUser()
    }

    return (
        <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLEID}
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
        />
    );
}

export default Auth;