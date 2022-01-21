import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

import "./login.css";
const fetch = require("node-fetch");

function LogIn(props) {
  const { item, onUsrUpdate } = props;
  const [usernameul, setUsernameul] = useState(item);
  const [passWord, setPassword] = useState("");


  const navigate = useNavigate();

    const routeChange = () =>{ 
      let path = `/dashboard`; 
      navigate(path);
    }

    var reqBody = {
      userName: "",
      passWord: "",
    };
  

  function validateForm() {
    return usernameul.length > 0 && passWord.length > 0;
  }

  async function login() {
    reqBody.userName = usernameul;
    reqBody.passWord = passWord;

    const options = {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: new Headers({
        "Access-Control-Allow-Credentials" : true,
        "Content-Type": "application/json",
      }),
      credentials: 'include',

    };

    fetch("http://localhost:3001/api/login", options)
      .then((response) => {
        if(response.status != 200){
          alert("Wrong credentials.")
          //window.location.href = `http://localhost:3000/login`;
        }
        else{
          onUsrUpdate(usernameul);
          routeChange();
        }

        
        console.log(document.cookie);
        window.localStorage.setItem("userName",`${usernameul}`);
        //window.location.href = `http://localhost:3000/dashboard`;
      })
      .catch((err) => {
        console.log(err);
      });
  }


  function handleSubmit(event) {
    event.preventDefault();
    login();
  }

  return (
    <div className="Login">
      <h3 style={{ marginBottom: "50px" }}>Log in</h3>
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
          Login
        </Button>
      </Form>
    </div>
  );
}

export default LogIn;

