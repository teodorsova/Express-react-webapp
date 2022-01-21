import "./Food.css";
import Axios from 'axios'
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { FacebookIcon, FacebookShareButton, WhatsappIcon, WhatsappShareButton } from 'react-share'

const defaultImgString = "https://i.pinimg.com/originals/fd/80/ec/fd80ecec48eba2a9adb76e4133905879.png"

function Food(props) {
  //const [refresh, setRefresh] = useState(0);

  const item = props.item;
  const userName = props.userName;
  const axios = Axios.create();
  const navigate = useNavigate();
  const avail = props.avail


  function formatDate(date) {
    try {
      var strDate = date.toString();
      strDate = strDate.substring(0, 10)
      return strDate;
    } catch (err) {
    }
  }

  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  function claimItem() {
    axios.put("http://localhost:3001/api/listing", {
      headers: new Headers({
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      }),
      id: item.id,
      userName: userName,
    }).then((response) => {
      if (response.status === 200) {
        //window.location.reload(false);
        let path = `/`;
        navigate(path + userName);
        navigate(path);
        alert("The item was claimed!");

        //setRefresh(refresh+1);

        return response;
      }
    }).catch((response) => {
      alert("Something went wrong.")
    });
  }

  function showAvailability() {
    if (item.isAvailable === true)
      return <p style={{ color: "#09c209" }}>The item is available for others</p>
    else return <p style={{ color: "red" }}>The item is not available for others</p>
  }


  function showClaimButton() {
    if (userName !== item.userName && userName.length > 0 && item.isAvailable === true && item.claimedBy === "Nobody")
      return <button className="claim-btn" onClick={claimItem}>Claim</button>
  }


  function changeAvail() {
    axios.put("http://localhost:3001/api/listing/update", {
      headers: new Headers({
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      }),
      id: item.id,
      isAvailable: !item.isAvailable,
    }).then((response) => {
      if (response.status === 200) {
        item.isAvailable = !item.isAvailable;
        //window.location.reload(false);
        let path = `/`;
        navigate(path);
        navigate(path + userName);

        if (item.isAvailable === true)
          alert(`You shared with everyone: ${item.foodName} from ${item.location}`);
        else alert(`You made private the following item: ${item.foodName} from ${item.location}`);

        //setRefresh(refresh+1);

        return response;
      }
    }).catch((response) => {
      alert("Something went wrong.")
    });
  }


  function showAvailButton() {
    if (avail === true && window.localStorage.getItem("userName") === userName) {
      if (item.isAvailable === true)
        return <button className="btn btn-success btn-md mt-4 " onClick={changeAvail}>Public</button>
      else return <button className="btn btn-danger btn-md mt-4" onClick={changeAvail}>Private</button>
    }
  }

  function showLink() {
    if (item.claimedBy === "Nobody") {
      return "Nobody"
    } else {
      return (<Link to={`${item.claimedBy}`}>{item.claimedBy}</Link>)
    }
  }
  return (
    <div className="listing">
      <img src={item.imgSrc == null ? defaultImgString : item.imgSrc} width="200" alt="food" />
      <h1>{item.foodName}</h1>
      {showAvailButton()}
      {showAvailability()}
      <p>Description: {item.description}</p>
      <p>Category: {item.type}</p>
      <p>Listed by: {<Link to={`${item.userName}`}>{item.userName}</Link>}</p>
      <p>Claimed by: {showLink()} </p>
      <p>Expiration date: {formatDate(item.expirationDate)}</p>
      <p>Available quantity: {item.quantity}</p>
      <p>Location: {item.location}</p>
      <div class="container">
        <FacebookShareButton quote="Let's reduce food waste. Check out this listing!" url={`http://ReduceFoodWaste.com/${item.userName}`}>
          <FacebookIcon style={{ "border-radius": "10px" }}></FacebookIcon>
        </FacebookShareButton>
        
        <WhatsappShareButton style={{ "margin-left": "10px"}} title="Let's reduce food waste. Check out this listing!" url={`http://ReduceFoodWaste.com/${item.userName}`}>
          <WhatsappIcon style={{ "border-radius": "10px" }}></WhatsappIcon>
        </WhatsappShareButton>
        </div>
        {showClaimButton()}
    </div>
  );
}

export default Food