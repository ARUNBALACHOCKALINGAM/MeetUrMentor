import { routerType } from "../abstraction/types/router.types";



import Track from "./Track";

import { AuthPage } from "./AuthPage";

import Details from "./Details";


import { Home } from "./Home";

const pagesData: routerType[] = [
  {
    path: "/",
    element: <AuthPage type="Signin" />,
    title: "signin",
  },
  {
    path: "signin",
    element: <AuthPage type="Signin" />,
    title: "signin",
  },
  {
    path: "signup",
    element: <AuthPage type="Signup" />,
    title: "signup",
  },
  {
    path: "forgotpassword",
    element: <AuthPage forgotPassword={true} />,
    title: "forgotpassword",
  },
  {
    path: "resetpassword",
    element: <AuthPage reset={true} />,
    title: "resetpassword",
  },
  {
    path: "track",
    element: <Track />,
    title: "tack",
  },
  {
    path: "details",
    element: <Details />,
    title: "detailsform",
  },
  {
    path: "studenttrack",
    element: <Track />,
    title: "studenttrack",
  },
  {
    path: "home",
    element: <Home />,
    title: "home",
  }
];

export default pagesData;
