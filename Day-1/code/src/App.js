import React, { useEffect, useState } from "react";
import Login from "./components/Login";
import { auth } from "./firebase";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return <div>{user ? <p>Welcome, {user.displayName}</p> : <Login />}</div>;
};

export default App;
