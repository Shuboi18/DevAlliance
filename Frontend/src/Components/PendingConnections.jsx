import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addConnectionReq } from "../assets/ConnectionRequestSlice";

const PendingConnections = () => {
    const dispatch = useDispatch();
    const myPendingConnections = useSelector((store) => store.requests)
    const callingMyPendingConnections = async () => {
        try {

            const pendingConnectionsList = await axios.get("http://localhost:3000/connect/pendingConnections", { withCredentials: true });
            console.log(pendingConnectionsList.data)
            dispatch(addConnectionReq(pendingConnectionsList.data));

        }
        catch (err) {
            console.log(err);
        }
    }

    const acceptReqButton = async (_id) => {
        try {
            await axios.patch("http://localhost:3000/connect/response/accepted/" + { _id })
            console.log("Accepted Successfully");
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        callingMyPendingConnections();
    }, []);

    if (!myPendingConnections) return;
    if (myPendingConnections.length === 0) {
        return (
            <div><h1>No Pending Connection Requests</h1></div>
        )
    }
    return (
        <div className="text-center my-10">
            <h1 className="text-bold text-3xl text-white">Connection Requests</h1>
            {myPendingConnections.map((req) => {
                const { fname, lname, bio, skills, age, gender, photoURL } = req.fromUserID;
                return (
                    <div className="flex justify-between items-center m-4 mx-auto p-4 bg-base-300 flex w-2/3">
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
                        <div>
                            <button onClick={() => acceptReqButton(req._id)} className="mx-2 btn btn-primary">Accept</button>
                            <button className="mx-2 btn btn-secondary">Reject</button>
                        </div>
                    </div>
                )
            })}
        </div>
    );

}

export default PendingConnections