import React, { useState, useRef } from "react";
import Login from "./Login";
import Signup from "./Signup";
//call loginUser and wait for token after submission
const Main = () => {
  //set up hooks for hiding/showing password
  const [form, setForm] = useState(true);

  //flip whether login or signup should render
  const handleForm = () => {
    setForm(!form);
  };

  return (
    <div className='container'>
      <h2>Welcome to React Task Tracker!</h2>
      {form ? <Login /> : <Signup />}
      <h4>
        {form ? "Not Yet Registered?" : "Already Registered?"}
        <span onClick={handleForm} className='signup'>
          {form ? "Create an Account" : "Sign In"}
        </span>
      </h4>
    </div>
  );
};

export default Main;
