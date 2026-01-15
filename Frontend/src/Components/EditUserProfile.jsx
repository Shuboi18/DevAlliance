import axios from "axios";
import { useState } from "react";

const EditUserProfile = ({user}) => {
    const [fname, seteditFname] = useState(user.fname);
    const [lname, seteditLname] = useState(user.lname);
    if (!user) return;
    const editProfileButton = async () => {
        try {
            const res = await axios.patch("http://localhost:3000/profile/editProfile", {
                fname,
                lname
            }, { withCredentials: true });
            console.log(res?.data)
        }
        catch (err) {
            console.log(err)
        }
    }
return (
    <div className="flex justify-center my-10">
        <div className="card bg-base-300 w-96 shadow-sm">
            <div className="card-body">
                <h2 className="card-title text-center">Edit Profile</h2>
                <div>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">First Name</legend>
                        <input value={fname} type="text" className="input" placeholder="Type here" onChange={(event) => { seteditFname(event.target.value) }} />
                    </fieldset>
                </div>
                <div>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Last Name</legend>
                        <input value={lname} type="text" className="input" placeholder="Type here" onChange={(event) => { seteditLname(event.target.value) }} />
                    </fieldset>
                </div>
                <div className="card-actions justify-center">
                    <button className="btn btn-primary" onClick={editProfileButton}>Save Changes</button>
                </div>
            </div>
        </div>
    </div>
)
}
export default EditUserProfile;