import { createBrowserRouter } from "react-router-dom";
import Signup from "./Signup";
import App from "../App.jsx";
import Login from "./Login";
import Feed from "./Feed.jsx";
import Body from "./Body.jsx";
const router = createBrowserRouter([{
    path: "/",
    element: <App />,
    children: [
        {path: "/", element: <Body/>},
        { path: "/signup", element: <Signup /> },
        { path: "/login", element: <Login /> },
        {path:"/profiledashboard", element:<Feed/>}
    ]
}])

export default router;