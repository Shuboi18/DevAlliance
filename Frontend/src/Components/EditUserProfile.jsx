import axios from "axios";
import { useState } from "react";

const EditUserProfile = ({ user }) => {
    const [fname, seteditFname] = useState(user.fname);
    const [lname, seteditLname] = useState(user.lname);
    const [bio, seteditBio] = useState(user.bio);
    const [skills, seteditSkills] = useState(user.skills);
    const [photoURL, seteditPhotoURL] = useState(user.photoURL);

    // useEffect(() => {
    //     if (user) {
    //         seteditFname(user.fname || "");
    //         seteditLname(user.lname || "");
    //         seteditBio(user.bio || "");
    //         seteditSkills(user.skills || "");
    //         seteditPhotoURL(user.photoURL || "");
    //     }
    // }, [user]);

    // if (!user) {
    //     return <div>Chirag.....</div>;
    // }
    const editProfileButton = async () => {
        try {
            await axios.patch("http://localhost:3000/profile/editProfile", {
                fname,
                lname,
                bio,
                skills,
                photoURL
            }, { withCredentials: true });
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="flex justify-center my-10">
            <div className="flex justify-center mx-4">
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
                        <div>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Bio</legend>
                                <input value={bio} type="text" className="input" placeholder="Type here" onChange={(event) => { seteditBio(event.target.value) }} />
                            </fieldset>
                        </div>
                        <div>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Skills</legend>
                                <input value={skills} type="text" className="input" placeholder="Type here" onChange={(event) => { seteditSkills(event.target.value) }} />
                            </fieldset>
                        </div>
                        <div>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">User Photo URL</legend>
                                <input value={photoURL} type="text" className="input" placeholder="Type here" onChange={(event) => { seteditPhotoURL(event.target.value) }} />
                            </fieldset>
                        </div>
                        <div className="card-actions justify-center mt-11">
                            <button className="btn btn-primary" onClick={editProfileButton}>Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="card bg-base-300 w-96 shadow-sm">
                    <figure>
                        <img
                            src={photoURL}
                            alt="Shoes" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">{fname + " " + lname + ", " + user.age}</h2>
                        <p>{bio}</p>
                        <p>{skills}</p>
                        <div className="card-actions justify-end">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default EditUserProfile;