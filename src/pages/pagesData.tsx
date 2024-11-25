import { routerType } from "../abstraction/types/router.types";
import StudentPrompts from "./Student/StudentPrompts";
import MentorPrompts from "./Mentor/MentorPrompts";
import MentorDetails from "./Mentor/MentorDetails";
import MentorHome from "./Mentor/MentorHome";
import StudentDetails from "./Student/StudentDetails";
import Track from "./Track";
import MentorMatch from "./Mentor/MentorMatch";
import { AuthPage } from "./AuthPage";
import { ForgotPassword } from "../features/authentication/components/ForgotPassword";
import { ResetPassword } from "../features/authentication/components/ResetPassword";
import Details from "./Details";
import Prompts from "./Prompts";

const pagesData: routerType[] = [
  {
    path: "/",
    element: <AuthPage type="Signin"/>,
    title: "signin",
  },
  {
    path: "signin",
    element: <AuthPage type="Signin"/>,
    title: "signin",
  },
  {
    path: "signup",
    element: <AuthPage type="Signup" />,
    title: "signup",
  },
  {
    path: "forgotpassword",
    element: <AuthPage  forgotPassword={true}/>,
    title: "forgotpassword",
  },
  {
    path: "resetpassword",
    element: <AuthPage reset={true}/>,
    title: "resetpassword",
  }, 
  {
    path: "track",
    element: <Track />,
    title: "tack",
  },
  {
    path: "mentorhome",
    element: <MentorHome />,
    title: "mentorhome",
  },
  {
    path: "mentormatch",
    element: <MentorMatch />,
    title: "mentormatch",
  },
  {
    path: "details",
    element: <Details/>,
    title: "detailsform",
  },
  {
    path: "studenttrack",
    element: <Track />,
    title: "studenttrack",
  }
];

export default pagesData;
