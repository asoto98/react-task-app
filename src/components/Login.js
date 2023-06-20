import React, { useState, useRef } from "react";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import { auth } from "../firebase";

//call loginUser and wait for token after submission
const Login = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  //sign in function

  const signIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(
        emailRef.current?.value,
        passwordRef.current?.value
      )
      .then((user) => {
        console.log(user);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  //set up hooks for hiding/showing password
  const [show, setShow] = useState(false);
  const [icon, setIcon] = useState(eye);

  //flip eye icon when hiding/showing password
  const handleShow = () => {
    setShow(!show);
    setIcon(show ? eye : eyeOff);
  };
  return (
    <form className='form-control' onSubmit={signIn}>
      <h3>Please Log In</h3>
      <div className='form-control'>
        <label>Email</label>
        <input
          type='email'
          placeholder='youremail@email.com'
          required
          ref={emailRef}
        />

        <label>Password</label>
        <div className='password-wrapper'>
          <input
            type={show ? "text" : "password"}
            placeholder='password'
            required
            ref={passwordRef}
          />

          <span onClick={handleShow}>
            <Icon icon={icon} size={20} />
          </span>
        </div>
        <input type='submit' value='Log In' className='btn btn-block' />
      </div>
    </form>
  );
};

export default Login;
