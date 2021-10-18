import React from "react";
import { GoogleLogin } from "react-google-login";
import actions from "../api";

function Auth({ getUser }) {
  const responseGoogle = async ({ profileObj }) => {
    //Go to google and get my info
    await actions.authenticate(profileObj); //Send profile info to my api
    getUser();
  };
  // here we import our googleLogin, which allows our users to sign in with with  the users google credentials. when they do this we get their web token, which contains all of their data with is encrpted. we use JWS tokens to unencrypt and manupulate this information. here we have a funtion . when login is succesful we use our actions.authenticate, to push the google defined profileObj to our /authenticate api. here profileObj then becomes known as user. we pass the user from google to the api and we grab the user token from the profileObj(user) which is res.data.token in the console.log. we label res.data.token as 'token' and we setItem in the localStorage so that the user stays logged in while navigating the page.
  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLEID}
      buttonText="Login"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={"single_host_origin"}
    />
  );
}

export default Auth;
