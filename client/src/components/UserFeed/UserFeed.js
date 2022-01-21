import { useEffect, useState, useRef } from 'react'
import store from '../Feed/FoodStore'
import Food from '../Feed/Food'
import Form from "react-bootstrap/Form";
import './UserFeed.css'
import Axios from 'axios';


function UserFeed(props) {
  const axios = Axios.create();
  const [foodListings, setfoodListings] = useState([{ "id": 1 }])
  const [type, setType] = useState("All")
  const [btnMessage, setBtnMessage] = useState("");
  const userName = props.userName;
  
  const btnRef = useRef();
  
  var btnOnClick = () => {};

  useEffect(() => {
    store.getListings()
    store.emitter.addListener('GET_LISTINGS_SUCCESS', () => {
      setfoodListings(store.data);
    })

  }, [])

  useEffect(() => {
    checkFriendshipStatus()
  }, [])

  function addFriend() {
      axios.post("http://localhost:3001/api/friendship", {
        user1: window.localStorage.getItem("userName"),
        user2: userName
    }).then((response) => {
      if(response.status === 200) {
        //alert("Friend request sent.")
        setBtnMessage("Friend request sent!")
        btnRef.current.className="btn btn-warning";
      }
    })
  }

  function removeFriend() {
    axios.post("http://localhost:3001/api/friendship/remove", {
      user1: window.localStorage.getItem("userName"),
      user2: userName
  }).then((response) => {
    if(response.status === 200) {
      //alert("Friend request sent.")
      setBtnMessage("Add friend")
      btnRef.current.className="btn btn-success";
      btnRef.current.addEventListener('click', () => {
        addFriend();
      })   
    }
  })
  }

  function acceptFriend() {
    axios.post("http://localhost:3001/api/friendship/accept", {
      user1: window.localStorage.getItem("userName"),
      user2: userName
    }).then((response) => {
      if(response.status === 200) {
        //alert("Friend request sent.")
        setBtnMessage("Remove as friend")
        btnRef.current.className="btn btn-danger";
      }
    })
   
  }

  async function checkFriendshipStatus() {
    if (window.localStorage.getItem("userName") === userName || window.localStorage.getItem("userName") === null) {
      return ""
    } else {
      var btn;
      await axios.post("http://localhost:3001/api/friendship/find", {
        user1: window.localStorage.getItem("userName"),
        user2: userName
      }).then((response) => {
        console.log(response)
        if(response.status === 200){
          console.log(200)
          setBtnMessage("Remove as friend")
          btnRef.current.className="btn btn-danger";
          btnRef.current.addEventListener('click', () => {
            removeFriend();
          })   
        } else if(response.status === 229) {
          console.log(229)
          setBtnMessage("Accept friend request")
           btnRef.current.className="btn btn-primary";
           btnRef.current.addEventListener('click', () => {
            acceptFriend();
          })   
        } else if(response.status === 230) {
          console.log(230)
          setBtnMessage("Friend request sent!")
           btnRef.current.className="btn btn-warning";
           btnOnClick = null;
        }
      }).catch((error) => {
        if(error.response.status === 404) {
          console.log(404)
          setBtnMessage("Add friend")
          btnRef.current.className="btn btn-success";
          btnRef.current.addEventListener('click', () => {
            addFriend();
          })   
        } else {
          console.log(error)
          btn = null;
          
        }
      }).finally(() => {
       
        
      })
      console.log(btn);
      return btn;
    }
  }

function welcome() {
    if (window.localStorage.getItem("userName") === userName)
      return <h3>Welcome back, {userName}! Here are your listings:</h3>
    else return (
      <>
        <h3>Welcome to {userName}'s profile!</h3>
        <button ref = {btnRef} onClick={btnOnClick}>{btnMessage}</button>
      </>
    )
  }


  return (
    <div className="flex-container" >
      <div id="leftRow">
      </div>
      <div className="feed-container" style={{ paddingTop: "20px" }}>
        {welcome()}
        <Form.Group size="lg" controlId="type">
          <Form.Label>Category:</Form.Label>
          <Form.Control as="select" custom onChange={(e) => setType(e.target.value)}>
            <option value="All">All</option>
            <option value="Fruits">Fruits</option>
            <option value="Vegetables">Vegetables</option>
            <option value="Vegan">Vegan</option>
            <option value="Fast Food">Fast Food</option>
            <option value="Meat">Meat</option>
          </Form.Control>
        </Form.Group>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>

          {
            foodListings.map((e) => {
              if (e.userName === userName && type === 'All') {
                return (<Food key={e.id} item={e} userName={userName} avail={true} />)
              }
              else {
                if (e.userName === userName && e.type === type) {
                  return (<Food key={e.id} item={e} userName={userName} avail={true} />)
                }
              }
            })
          }
        </div>
      </div>
      <div id="rightRow">
      </div>
    </div>
  )
}

export default UserFeed