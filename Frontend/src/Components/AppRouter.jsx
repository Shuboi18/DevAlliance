import { createBrowserRouter } from "react-router-dom";
import Signup from "./Signup";
import App from "../App.jsx";
import Login from "./Login";
import Body from "./Body.jsx";
import UserProfile from "./UserProfile.jsx";
import UserFeed from "./UserFeed.jsx";
import MyConnections from "./MyConnections.jsx";
import PendingConnections from "./PendingConnections.jsx";
const router = createBrowserRouter([{
    path: "/",
    element: <App />,
    children: [
        { path: "/signup", element: <Signup /> },
        // { index: true, element: <Body /> },
        { path: "/login", element: <Login /> },
        { path: "/profiledashboard", element: <UserProfile /> },
        { path: "/getUserFeed", element: <UserFeed /> },
        { path: "/UserConnectionList", element: <MyConnections /> },
        { path: "/PendingConnectionList", element: <PendingConnections /> }
    ]
}])

export default router;