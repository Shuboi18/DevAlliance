import { useState } from "react";
import axios from "axios";
const Signup = () => {
    const [email, setemailId] = useState("");
    const [password, setPassword] = useState("");
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const handleSignup = async () => { 
        try {
            const res =await axios.post("http://localhost:3000/signup", {
                fname,
                lname,
                email,
                password
            });
            console.log(res?.data);
        }
        catch (err) {
            console.log(err);
        }
    }
    return (
        <div className="flex justify-center my-10">
            <div className="card bg-base-300 w-96 shadow-sm">
                <div className="card-body">
                    <h2 className="card-title text-center">Sign in</h2>
                    <div>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">First Name</legend>
                            <input value={fname} type="text" className="input" placeholder="Type here" onChange={(event) => { setFname(event.target.value) }} />
                        </fieldset>
                    </div>
                    <div>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Last Name</legend>
                            <input value={lname} type="text" className="input" placeholder="Type here" onChange={(event) => { setLname(event.target.value) }} />
                        </fieldset>
                    </div>
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
                    
                    <div className="card-actions justify-center">
                        <button onClick={handleSignup} className="btn btn-primary">Sign in</button>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default Signup;