import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../assets/FeedSlice";
import { useEffect } from "react";

const MyConnections = () => {
    const dispatch = useDispatch();
    const myConnections = useSelector((store) => store.Feed)
    const callingMyConnections = async () => {
        try {
            const myConnectionsList = await axios.get("http://localhost:3000/connect/myConnections", { withCredentials: true });
            console.log(myConnectionsList?.data)
            dispatch(addFeed(myConnectionsList?.data));
            
        }
        catch (err)
        {
            console.log(err);
        }
    }

    useEffect(() => {
        callingMyConnections()
    },[])
    return (
        <div>{ myConnections.fname}</div>
    )
}

export default MyConnections