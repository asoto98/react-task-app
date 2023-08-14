import { useState, useEffect } from "react";
import Home from "./components/Home";
import { auth } from "./firebase";
import Main from "./components/Main";

function App() {
  //initialize user to null before signing in
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      const user = {
        uid: userAuth?.uid,
        email: userAuth?.email,
      };

      if (userAuth) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);
  return <div>{user ? <Home /> : <Main />}</div>;
}

export default App;
