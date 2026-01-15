import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../assets/FeedSlice";
import { useEffect } from "react";
import UserFeedCard from "./UserFeedCard";

const UserFeed = () => {
    // const dispatch = useDispatch();
    // const feedStore = useSelector((state) => state.Feed);
    // const getFeed = async () => {
    //     if(feedStore) return;
    //     try {
    //         const res = await axios.get("http://localhost:3000/getUserFeed", { withCredentials: true });
    //         dispatch(addFeed(res.data));
            
    //     } catch (err) {
    //         console.error(err);
    //     }
    // }

    // useEffect(() => {
    //     getFeed();
    // },);
    
    return (
        <div className="flex justify-center my-10"><UserFeedCard /></div>
    )
}
export default UserFeed;