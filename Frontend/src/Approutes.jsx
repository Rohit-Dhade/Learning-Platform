import { createBrowserRouter } from "react-router";
import LoginAndRegister from "./features/auth/pages/LoginAndRegister";
import HomePage from "./features/auth/pages/HomePage";
import Protected from "./features/auth/components/Protected";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected><HomePage/></Protected>,
  },
  {
    path: "/auth",
    element: <LoginAndRegister />,
  },
  
]);

export default router;