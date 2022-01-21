import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "./AddFood.css";
const fetch = require("node-fetch");

function AddFood(props) {

  const user = props.userName

  if (user.length < 1) {
    alert("You are not logged in. You are now redirected to the login page.");
    window.location.href = `http://localhost:3000/login`;
  }


  const [foodName, setFoodName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("Fruits");
  const [isAvailable, setIsAvailable] = useState(false);
  const [listingDate, setListingDate] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [location, setLocation] = useState("");
  const [quantity, setQuantity] = useState("");
  //const [userName, setUserName] = useState("");

  var reqBody = {
    foodName: "",
    description: "",
    type: "Fruits",
    isAvailable: false,
    listingDate: "",
    expirationDate: "",
    location: "",
    quantity: 0,
    userName: ""
  };



  async function createFood() {
    reqBody.foodName = foodName;
    reqBody.description = description;
    reqBody.type = type;
    reqBody.isAvailable = isAvailable;
    reqBody.listingDate = listingDate;
    reqBody.expirationDate = expirationDate;
    reqBody.location = location;
    reqBody.quantity = quantity;
    reqBody.userName = user;

    const options = {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: new Headers({
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      }),
    };

    console.log(reqBody);

    fetch("http://localhost:3001/api/listing", options)
      .then((response) => {
        alert("The listing was created!");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function validateForm() {
    return foodName.length > 0 && description.length > 0
      && listingDate.length > 0
      && expirationDate.length > 0 && location.length > 0
      && quantity.length > 0 && user.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    
    createFood();
  }

  return (
    <div className="AddListing" >
      <h3>Add a Food Listing</h3>
      <br></br>
      <br></br>
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="foodName">
          <Form.Label>Food name:</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
          />
        </Form.Group>
        {/* (//_____________________________________________________________________________________________________foodName) */}


        <Form.Group size="lg" controlId="description">
          <Form.Label>Description:</Form.Label>
          <Form.Control
            type="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        {/* (//_____________________________________________________________________________________________________description) */}

        <Form.Group size="lg" controlId="type">
          <Form.Label>Type:</Form.Label>
          <Form.Control as="select" custom onChange={(e) => setType(e.target.value)}>
            <option value = "Fruits">Fruits</option>
            <option value = "Vegetables">Vegetables</option>
            <option value = "Vegan">Vegan</option>
            <option value = "Fast Food">Fast Food</option>
            <option value = "Meat">Meat</option>
          </Form.Control>
        </Form.Group>
        {/* (//_____________________________________________________________________________________________________type) */}

        <Form.Group size="lg" controlId="isAvailable">
          <Form.Label>Available:</Form.Label>
          <Form.Control
            autoFocus
            type="checkbox"
            checked={isAvailable}
            onChange={(e) => setIsAvailable(e.target.checked)}
          />
        </Form.Group>
        {/* (//_____________________________________________________________________________________________________isAvailable) */}


        <Form.Group size="lg" controlId="listingDate">
          <Form.Label>Listing date:</Form.Label>
          <Form.Control
            type="text"
            value={listingDate}
            onChange={(e) => setListingDate(e.target.value)}
          />
        </Form.Group>
        {/* (//_____________________________________________________________________________________________________listingDate) */}

        <Form.Group size="lg" controlId="expirationDate">
          <Form.Label>Expiration Date:</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value)}
          />
        </Form.Group>
        {/* (//_____________________________________________________________________________________________________expirationDate) */}


        <Form.Group size="lg" controlId="location">
          <Form.Label>Location:</Form.Label>
          <Form.Control
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </Form.Group>
        {/* (//_____________________________________________________________________________________________________location) */}

        <Form.Group size="lg" controlId="quantity">
          <Form.Label>Quantity:</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </Form.Group>
        {/*  */}


        {/* <Form.Group size="lg" controlId="userName">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </Form.Group> 
        _____________________________________________________________________________________________________userName */}


        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Add Food
        </Button>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </Form>
    </div>
  );
}

export default AddFood;
