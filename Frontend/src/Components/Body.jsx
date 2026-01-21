import { Outlet, useNavigate } from "react-router-dom"
import NavBar from "./NavBar"
import Footer from "./Footer"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { addUserInfo } from "../assets/userSlice"
import { useEffect } from "react"

const Body = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
    const fetchUser = async () => {
        if (user) return;
        try {
            const res = await axios.get("http://localhost:3000/profile/getProfile", { withCredentials: true })
            dispatch(addUserInfo(res?.data))
        }
        catch (err) {
            if (err.status === 401) {
                navigate("/login")
            }
            console.error(err);
        }
    }

    useEffect(() => {
        fetchUser()
    }, []);
    return (
        <div>
            <NavBar />
            <Outlet />
            <Footer />

        </div>
    )
}
export default Body 