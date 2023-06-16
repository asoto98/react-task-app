import React, { useState } from "react";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import { useRef } from "react";
import { auth } from "../firebase";

//call loginUser and wait for token after submission
const Signup = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const nameRef = useRef(null);

  // sign up function
  const createAccount = (e) => {
    e.preventDefault();
    auth
      ?.createUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((user) => {
        console.log("Current Name:", nameRef.current.value);
        auth.currentUser.updateProfile({
          displayName: nameRef.current.value,
        });
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
  console.log("SignUp component rendering");
  return (
    <form className='form-control' onSubmit={createAccount}>
      <h3>Create an Account</h3>
      <div className='form-control'>
        <label>Name</label>
        <input type='text' placeholder='Your Name' required ref={nameRef} />
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
        <input type='submit' value='Sign Up' className='btn btn-block' />
      </div>
    </form>
  );
};

export default Signup;
