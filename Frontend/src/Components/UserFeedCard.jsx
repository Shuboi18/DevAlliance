import axios from "axios";
import { removeFeedInfo } from "../assets/FeedSlice";
import { useDispatch } from "react-redux";

const UserFeedCard = ({ feedStore }) => {
    const dispatch = useDispatch();
    const IngIntConnectionButton = async (status, _id) => {
        try {
            const res = await axios.post("http://localhost:3000/connect/request/" + status + "/" + _id, {}, { withCredentials: true })
            console.log(res);
            dispatch(removeFeedInfo(_id));
        } catch (err) {
            console.log(err)
        }
    };
    if (feedStore.length === 0) {
        return <h1 className="text-3xl font-bold">No Feed Available</h1>;
    }

    return (
        feedStore.length === 0 ? <h1 className="text-3xl font-bold">No Feed Available</h1> :
            feedStore.map((feed) => {
                const { _id, fname, lname, age, bio, skills, photoURL, gender } = feed;
                return (<div className="" key={_id}>
                    <div className="card bg-base-300 w-96 shadow-sm">
                        <figure>
                            <img
                                src={photoURL}
                                alt="Shoes" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{fname + " " + lname}</h2>
                            {age && gender && (<h6 className="card-title text-md">{age + ", " + gender}</h6>)}
                            <p>{bio}</p>
                            <p>{skills}</p>
                            <div className="flex items-center">
                                <button onClick={() => IngIntConnectionButton("interested", _id)} className="mx-2 btn btn-primary">Interested</button>
                                <button onClick={() => IngIntConnectionButton("ignored", _id)} className="mx-2 btn btn-secondary">Ignore</button>
                            </div>
                        </div>
                    </div>
                </div>
                )
            }
            ))
};
export default UserFeedCard;