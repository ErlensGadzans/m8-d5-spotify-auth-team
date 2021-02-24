import React from "react";
import { Container, Image, Button } from "react-bootstrap";
import logo from "../logo/Spotify_Logo_Black.png";
import fb from "../logo/fb.png";
import "bootstrap/dist/css/bootstrap.min.css";
import useForm from "./UseForm"; // IMPORTING THE COMPONENT WITH HOOKS
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const LoginComponent = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = async (e) => {
    e.preventDefault();
    const res = await axios("http://localhost:3007/users/login", {
      //WHAT IS AXIOS THIS?
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        email,
        password,
      },
    });
    console.log(res);
    if (res.status === 200) {
      localStorage.setItem("accessToken", res.data.accessToken);
      props.history.push("/");
    }
  };

  return (
    <Container fluid id="signup-page-wrapper">
      <div className="sign-logo-wrapper">
        <Image src={logo} id="signup-page-logo" />
      </div>
      <div className="signup-items">
        <Button className="signup-btn fb my-2">
          <Image src={fb} id="fb" />
          CONTINUE WITH FACEBOOK
        </Button>
        <Button className="signup-btn apple my-2">CONTINUE WITH APPLE</Button>
        <Button className="signup-btn google my-2">CONTINUE WITH GOOGLE</Button>
      </div>
      <h6>OR</h6>
      <div className="form-inputs">
        <form className="form">
          <label>Email addess</label>
          <input
            className="form-input"
            id="email" // WITH THIS ID IT CHECKS IF IT'S A VALID EMAIL
            name="email"
            type="email"
            placeholder="Email adress or username"
            value={email} // TAKES THE VALUE FROM MY CUSTOM HOOKS IN USEFORM COMPONENT
            onChange={(e) => setEmail(e.target.value)} // THE FUNCTION THAT LISTENS TO THE CHANGE OF THE VALUE
          />
          <br />
          <label>Password</label>
          <input
            className="form-input"
            id="password"
            name="password"
            type="password"
            placeholder="*********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <a href="#"> Forgot your password? </a>
          <div className="submit-btn">
            <input type="checkbox" id="checkbox" className="my-auto" />
            <p className="ml-n5 my-auto">Remember me</p>
            <input
              className="form-input-submit"
              type="submit"
              value="LOG IN"
              onClick={login}
            />
          </div>
        </form>
        <hr />
        <h4 className="text-center mb-3">Don't have an account?</h4>
        <button id="bottom-btn" onClick={login} value="Login">
          SIGN UP FOR SPOTIFY
        </button>
      </div>
    </Container>
  );
};

export default LoginComponent;
