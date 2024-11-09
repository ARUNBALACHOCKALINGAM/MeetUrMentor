import { routerType } from "../abstraction/types/router.types";
import StudentPrompts from "./Student/StudentPrompts";
import MentorPrompts from "./Mentor/MentorPrompts";
import MentorDetails from "./Mentor/MentorDetails";
import MentorHome from "./Mentor/MentorHome";
import StudentDetails from "./Student/StudentDetails";
import Track from "./Track";
import MentorMatch from "./Mentor/MentorMatch";
import { SignIn } from "./SignIn";

const pagesData: routerType[] = [
  {
    path: "/",
    element: <SignIn type="Signin"/>,
    title: "signin",
  },
  {
    path: "signin",
    element: <SignIn type="Signin"/>,
    title: "signin",
  },
  {
    path: "signup",
    element: <SignIn type="Signup" />,
    title: "signup",
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
    path: "mentordetails",
    element: <MentorDetails />,
    title: "mentordetailsform",
  },
  {
    path: "studentdetails",
    element: <StudentDetails />,
    title: "studentdetailsform",
  },
  {
    path: "studenttrack",
    element: <Track />,
    title: "studenttrack",
  },
  {
    path: "mentortrack",
    element: <Track />,
    title: "mentortrack",
  },
  {
    path: "studentprompts",
    element: <StudentPrompts />,
    title: "studentprompts",
  },
  {
    path: "mentorprompts",
    element: <MentorPrompts />,
    title: "mentorprompts",
  },
];

export default pagesData;
