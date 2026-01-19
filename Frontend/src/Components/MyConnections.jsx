import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addConnections } from "../assets/ConnectionSlice";

const MyConnections = () => {
    const dispatch = useDispatch();
    const myConnections = useSelector((store) => store.Feed)
    const callingMyConnections = async () => {
        try {
            const myConnectionsList = await axios.get("http://localhost:3000/connect/myConnections", { withCredentials: true });
            console.log(myConnectionsList.data)
            dispatch(addConnections(myConnectionsList.data));

        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        callingMyConnections();
    }, []);

    if (!myConnections) return;
    if (myConnections.length === 0) {
        return (
            <div><h1>No Connection </h1></div>
        )
    }
    return (
        <div className="text-center my-10">
            <h1 className="text-bold text-3xl text-white">My Connections</h1>
            {myConnections.map((req) => {
                const { fname, lname, bio, skills, age, gender, photoURL } = req;
                return (
                    <div className="justify-between items-center m-4 mx-auto p-4 bg-base-300 flex w-1/2">
                        <div>
                            <img className="w-20 h-20 rounded-lg" src={photoURL} alt="User Profile Pic" />
                        </div>
                        <div className="text-left mx-4">
                            <h2 className="font-bold text-xl" key={req._id}>
                                {fname + " " + lname}
                            </h2>
                            {age && gender && <p>{age + "," + gender}</p>}
                            <p>{bio}</p>
                            <p>{skills}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}

export default MyConnections