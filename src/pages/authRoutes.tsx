import { routerType } from "../abstraction/types/router.types";
import { AuthPage } from "./AuthPage";

const authRoutes: routerType[] = [
  {
    path: "/",
    element: <AuthPage type="Signin" />,
    title: "signin",
  },
  {
    path: "/signin",
    element: <AuthPage type="Signin" />,
    title: "signin",
  },
  {
    path: "/signup",
    element: <AuthPage type="Signup" />,
    title: "signup",
  },
  {
    path: "/forgotpassword",
    element: <AuthPage forgotPassword={true} />,
    title: "forgotpassword",
  },
  {
    path: "/resetpassword",
    element: <AuthPage reset={true} />,
    title: "resetpassword",
  },
];

export default authRoutes;