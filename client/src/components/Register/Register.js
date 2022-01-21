import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Axios from 'axios'

import "./Register.css";



function Register() {

  const [usernameul, setUsernameul] = useState("");
  const [passWord, setPassword] = useState("");
  const navigate = useNavigate();
  const axios = Axios.create();

  const routeChange = () =>{ 
    let path = `/login`; 
    navigate(path);
  }

  const register = () => {
    axios.post("http://localhost:3001/api/register", {
      headers: new Headers({
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      }),
      userName: usernameul,
      passWord: passWord,
    }).then((response) => {
      if(response.status === 200){
       routeChange();
       return response;
      } 
   }).catch((response) => {
      alert("Username already exists!")
   });
  }

  function validateForm() {
    return usernameul.length > 0 && passWord.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    register();
  }

  return (
    <div className="Login">
      <h2>Register an user</h2>
      <br></br>
      <br></br>
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="userName">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            autoFocus
            type="username"
            value={usernameul}
            onChange={(e) => setUsernameul(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={passWord}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Register
        </Button>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </Form>
    </div>
  );
}

export default Register;
