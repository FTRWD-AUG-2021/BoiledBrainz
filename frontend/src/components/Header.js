import { Link, Route, Switch } from "react-router-dom";
import { useContext } from "react";
import TheContext from "../TheContext";
import Auth from "./Auth";

function Header(props) {
  const logOut = () => {
    localStorage.removeItem("token");
    setUser({});
    // when we log out we remove the token object and set user to an empty object meaning no one is logged in.
  };

  let { user, setUser, getUser } = useContext(TheContext);

  return (
    <>
      <header>
        <h1>Boiling 🍜🥚🍲</h1>
        <div id="auth">
          {/* if there is a user, we will output a h4 header that has the users name/ the option button to log out. if there is none (user.name = false) we have our google authentication process (a google button that when processed grabs the user and sends it to the getUser api.) */}
          {user?.name ? (
            <div>
              <h4>{user?.name}</h4>
              <button onClick={logOut}>Log Out</button>
            </div>
          ) : (
            <Auth getUser={getUser} />
          )}
        </div>
      </header>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/all-posts">All</Link>
        {user?.name ? (
          <>
            <Link to="/new-post">New</Link>
            <Link to="/profile">Profile</Link>
          </>
        ) : null}
      </nav>
    </>
  );
}

export default Header;
