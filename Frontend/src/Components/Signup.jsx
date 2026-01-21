import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Signup = () => {
    const [email, setemailId] = useState("");
    const [password, setPassword] = useState("");
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [age, setAge] = useState(1);
    const [bio, setBio] = useState("");
    const [skills, setSkills] = useState([]);
    const [photoURL, setPhotoURL] = useState("");
    const [gender, setGender] = useState("");
    const navigate = useNavigate();
    const user = useSelector((state) => state.user)

    const handleSignup = async () => {
        try {
            await axios.post("http://localhost:3000/user/signup", {
                fname,
                lname,
                email,
                age,
                gender,
                bio,
                skills,
                photoURL,
                password
            });
            navigate("/login");
        }
        catch (err) {
            console.log(err);
        }
    }

    if (user) {
        return navigate("/getUserFeed");
    }
    return (
        <div className="flex justify-center my-2">
            <div className="card bg-base-300 w-96 shadow-sm">
                <div className="card-body">
                    <h2 className="card-title text-center">Sign Up</h2>
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
                            <legend className="fieldset-legend">Age</legend>
                            <input value={age} type="text" className="input" placeholder="Enter Age" onChange={(event) => { setAge(event.target.value) }} />
                        </fieldset>
                    </div>
                    <div>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Gender</legend>
                            <input value={gender} type="text" className="input" placeholder="Enter Gender" onChange={(event) => { setGender(event.target.value) }} />
                        </fieldset>
                    </div>
                    <div>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Bio</legend>
                            <input value={bio} type="text" className="input" placeholder="Type here" onChange={(event) => { setBio(event.target.value) }} />
                        </fieldset>
                    </div>
                    <div>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Skills</legend>
                            <input value={skills} type="text" className="input" placeholder="Type here" onChange={(event) => { setSkills(event.target.value) }} />
                        </fieldset>
                    </div>
                    <div>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">User Photo URL</legend>
                            <input value={photoURL} type="text" className="input" placeholder="Type here" onChange={(event) => { setPhotoURL(event.target.value) }} />
                        </fieldset>
                    </div>
                    <div>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Password</legend>
                            <input value={password} type="text" className="input" placeholder="Enter Your Password" onChange={(event) => { setPassword(event.target.value) }} />
                        </fieldset>
                    </div>

                    <div className="card-actions justify-center mt-6">
                        <button onClick={handleSignup} className="btn btn-primary">Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default Signup;