import "./Home.css";
import FoodListView from "./components/Feed/FoodListView";

function Home(props) {
    const userName = props.userName;
    return (
        <div className="flex-container">
            <div id="leftRow">
            </div>
            <div className="feed-container">
                <FoodListView userName={userName} />
            </div>
            <div id="rightRow">
            </div>
        </div>
    );
}

export default Home