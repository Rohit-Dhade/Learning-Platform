import { createBrowserRouter } from "react-router";
import LoginAndRegister from "./features/auth/pages/LoginAndRegister";


const router = createBrowserRouter([
  {
    path: "/",
    element: (<main><h1>Welcome to home page</h1></main>),
  },
  {
    path: "/auth",
    element: <LoginAndRegister />,
  },
  
]);

export default router