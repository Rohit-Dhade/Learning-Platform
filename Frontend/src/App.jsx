import router from "./Approutes";
import { RouterProvider } from "react-router";
import { AuthContextProvider } from "./features/auth/auth.context";

const App = () => {
  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  );
};

export default App;
