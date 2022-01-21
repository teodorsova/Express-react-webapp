import './Nav.css';
import React, { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import notificationImg from "../../notification.png"
import Axios from 'axios'

function Nav(props) {
    const user = (window.localStorage.getItem("userName") === null) ? (props.userName) : (window.localStorage.getItem("userName"));
    const usrArr = props.usrArr;
    const navigate = useNavigate();
    const [navBtn, setNavBtn] = useState("");
    const axios = Axios.create();
    const cardRef = useRef();

    var loggedin;
    var notifications = [];
    var aboutToExpire = [];

    const linkStyle = {
        "color": 'white',
        "textDecoration": "none",
        "paddingLeft": "20px",
        "paddingRight": "20px",
        "font-size": "20px",
        "display": "flex",
        "align-items": "center"
    };
    const setUserName = props.setUserName;

    function logOut() {
        setUserName("");
        //document.cookie = null;
        //document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        window.localStorage.removeItem("userName")
        //alert("You have been logged out.")
    }
    function getNotifications() {
        setTimeout(() => {
            axios.post("http://localhost:3001/api/notifications",
                {
                    userName: user
                }
            ).then((res) => {
                if (res.status === 200) {
                    aboutToExpire = res.data;
                    checkNotifications()
                    setTimeout(()=>{getNotifications()}, 1000);
        

                }
            })

        }, 1000)
        
    }

    const isInitialMount = useRef(true);
    useEffect(() => {
           getNotifications();
    }, [])

    function changeStyleNone(e) {
        cardRef.current.style.display = 'none';
    }

    function changeStyleBlock(e) {
        cardRef.current.style.display = 'inline-block';
    }


    function checkNotifications() {
        notifications = [];
        
        for (let i = 0; i < aboutToExpire.length; i++) {
            let dateString = aboutToExpire[i].expirationDate;
            let date = Date.parse(dateString)
            let today = new Date();
            let difference = Math.ceil(Math.abs(today - date) / (1000 * 60 * 60 * 24))
            if (difference <= 10) {
                notifications.push(aboutToExpire[i])
            }
        }
        aboutToExpire = [];
        if (notifications.length > 0) {
            setNavBtn(
                <><button id="notif" className='notification-btn toggle' onMouseEnter={changeStyleBlock} onMouseLeave={changeStyleNone}>
                    <img src={notificationImg} height="20px"></img>
                </button>
                    <div ref={cardRef} className="card custom">

                        <p className='notification-text'>You have {notifications.length} listing(s) about to expire! Check your profile.</p>

                    </div></>
            )


        } else {
            setNavBtn(
                <><button className='notification-btn' onMouseEnter={changeStyleBlock} onMouseLeave={changeStyleNone}>
                    <img src={notificationImg} height="20px"></img>
                </button>
                    <div ref={cardRef} className="card custom" style={{ height: "80px" }}>

                        <p className='notification-text'>No new notifications!</p>
                    </div></>
            )
        }

    }


    if (user === "" || user === undefined || user === null) {
        console.log(user)
        loggedin = (
            <ul className="nav-links">
                <Link style={linkStyle} to="register">
                    <li>Register</li>
                </Link>
                <Link style={linkStyle} to="login">
                    <li>Login</li>
                </Link>

            </ul>
        )
    }
    else loggedin = (
        <ul className="nav-links">

            <Link to="/AddListing">
                <button className='btn btn-success text-center' style={{ borderRadius: "10px" }} >
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16" >
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                    </svg>
                </button>
            </Link>

            {navBtn}

            <Link style={linkStyle} to="dashboard">
                <li>{"Welcome " + user}</li>
            </Link>


            <Link style={linkStyle} to="/" onClick={logOut}>
                <li>Logout</li>
            </Link>


        </ul>)


    return (
        <nav>
            <div style={{ display: "flex", alignItems: "center", paddingTop: "10px", paddingBottom: "10px" }}>
                <Link style={linkStyle} to="/">
                    <h1>ReFood</h1>
                </Link>
                {loggedin}
                <Form.Group size="lg" controlId="type">
                    <Form.Label>Go to profile</Form.Label>
                    <Form.Control as="select" custom onChange={(e) => navigate("/" + e.target.value)}>
                        <option value="default" disabled hidden selected>Select a user</option>
                        {
                            usrArr.map((i) => {
                                return <option value={i}>{i}</option>
                            })
                        }
                    </Form.Control>
                </Form.Group>

            </div>
        </nav>
    )
}

export default Nav