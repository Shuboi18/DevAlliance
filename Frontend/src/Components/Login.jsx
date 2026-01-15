import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUserInfo } from "../assets/userSlice";
import { useNavigate } from "react-router-dom";
const Login = () => {
    const [email, setemailId] = useState("chirag1790@gmail.com");
    const [password, setPassword] = useState("Password12345");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const handleLogin = async () => {
        try {

            const res = await axios.post("http://localhost:3000/user/login", {
                email,
                password
            },
                { withCredentials: true }
            );
            dispatch(addUserInfo(res?.data));
            navigate("/getUserFeed");
        }
        catch (err) {
            setErrorMessage(err?.response?.data || "Something went wrong");

        }
    }
    return (

        <div className="flex justify-center my-10">
            <div className="card bg-base-300 w-96 shadow-sm">
                <div className="card-body">
                    <h2 className="card-title text-center">Sign in</h2>
                    <div>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Email Address</legend>
                            <input value={email} type="text" className="input" placeholder="Type here" onChange={(event) => { setemailId(event.target.value) }} />
                        </fieldset>
                    </div>
                    <div>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Password</legend>
                            <input value={password} type="text" className="input" placeholder="Type here" onChange={(event) => { setPassword(event.target.value) }} />
                        </fieldset>
                    </div>
                    <div>
                        <p className="text-red-500">{errorMessage}</p>
                    </div>
                    <div className="card-actions justify-center">
                        <button onClick={handleLogin} className="btn btn-primary">Log in</button>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default Login;