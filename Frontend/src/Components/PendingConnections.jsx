import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../assets/FeedSlice";
import { useEffect } from "react";

const PendingConnections = () => {
    const dispatch = useDispatch();
    const myPendingConnections = useSelector((store) => store.Feed)
    //if (myPendingConnections) return;
    const callingMyPendingConnections = async () => {
        try {

            const pendingConnectionsList = await axios.get("http://localhost:3000/connect/pendingConnections", { withCredentials: true });
           
            dispatch(addFeed(pendingConnectionsList.data));

        }
        catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        callingMyPendingConnections();
        console.log("i fire once");
    }, []);
    console.log(myPendingConnections)
    if (!myPendingConnections){
        return
    }

    return (
        <div> {myPendingConnections[0].fname}</div>
    )
}

export default PendingConnections