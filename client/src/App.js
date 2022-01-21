/* eslint-disable no-unused-vars */
import "./App.css";
import Nav from "./components/Nav/Nav";
import LogIn from "./components/LogIn/LogIn";
import Register from "./components/Register/Register";
import Footer from "./components/Footer/Footer";
import Home from "./Home";
import UserFeed from "./components/UserFeed/UserFeed";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import AddFood from "./components/AddFood/AddFood"
import UserMethods from './components/UserFeed/UserMethods'

function App() {
  const [userName, setUserName] = useState("");
  const [usrArr, setUsrArr] = useState([])

  useEffect(() => {
    UserMethods.getUsers()
    UserMethods.emitter.addListener('GET_USERS_SUCCESS', () => {
      setUsrArr(UserMethods.data);
    if(window.localStorage.getItem("userName")!== null) {
      setUserName(window.localStorage.getItem("userName"))
    }
  })
  }, [])

  var usrRoutes;

  return (
    <Router>
      <div className="App">
        <Nav userName={userName} setUserName={setUserName} usrArr={usrArr} />
        <Routes>
          <Route exact path="/" element={<Home userName={userName} />} />
          {usrRoutes}
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={<LogIn item={userName} onUsrUpdate={setUserName} />}
          />
          {usrArr.map((usr) => {
            console.log(usr);
            return <Route exact path={"/" + usr} element={<UserFeed userName={usr} />} />;
          })}
          <Route exact path="/dashboard" element={<UserFeed userName={userName} />}
          />
          <Route exact path="AddListing" element={<AddFood userName={userName} />}/>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
