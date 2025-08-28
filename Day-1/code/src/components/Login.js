import React from "react";
import { signInwithGoogle } from "../firebase";

const Login = () => {
  const handleSignin = async () => {
    try {
      await signInwithGoogle();
    } catch (err) {
      console.log("Error while signin");
    }
  };

  return (
    <div>
      <button onClick={handleSignin}>Sign in with Google</button>
    </div>
  );
};

export default Login;
