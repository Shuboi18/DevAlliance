import axios from "axios";
import { useState } from "react";

const EditUserProfile = ({user}) => {
    const [editFname, seteditFname] = useState(user.fname );
    const [editLname, seteditLname] = useState( user.lname );
    const email = user.email;
    if (!user) return;
    const editProfileButton = async () => {
        try {
            const res = await axios.patch("http://localhost:3000/editProfile", {
                editFname,
                editLname,
                email
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
                        <input value={editFname} type="text" className="input" placeholder="Type here" onChange={(event) => { seteditFname(event.target.value) }} />
                    </fieldset>
                </div>
                <div>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Last Name</legend>
                        <input value={editLname} type="text" className="input" placeholder="Type here" onChange={(event) => { seteditLname(event.target.value) }} />
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