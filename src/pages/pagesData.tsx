import { routerType } from "../abstraction/types/router.types";
import { MentorSignIn } from "./MentorSignIn";
import { MentorSignUp } from "./MentorSignUp";
import { StudentSignUp } from "./StudentSignUp";
import { StudentSignIn } from "./StudentSignIn";
import StudentPrompts from "./StudentPrompts";
import MentorPrompts from "./MentorPrompts";
import MentorDetails from "./MentorDetails";
import StudentDetails from "./StudentDetails";
import Track from "./Track";

const pagesData: routerType[] = [
  {
    path: "/",
    element: <MentorSignIn />,
    title: "mentorsignin",
  },
  {
    path: "mentorsignin",
    element: <MentorSignIn />,
    title: "mentorsignin",
  },
  {
    path: "mentorsignup",
    element: <MentorSignUp />,
    title: "mentorsignup",
  },
  {
    path: "studentsignup",
    element: <StudentSignUp />,
    title: "studentsignup",
  },
  {
    path: "studentsignin",
    element: <StudentSignIn />,
    title: "studentsignin",
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
