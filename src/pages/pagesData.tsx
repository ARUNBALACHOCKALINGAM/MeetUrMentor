import { routerType } from "../abstraction/types/router.types";
import { MentorSignIn } from "./Mentor/MentorSignIn";
import { MentorSignUp } from "./Mentor/MentorSignUp";
import { StudentSignUp } from "./Student/StudentSignUp";
import { StudentSignIn } from "./Student/StudentSignIn";
import StudentPrompts from "./Student/StudentPrompts";
import MentorPrompts from "./Mentor/MentorPrompts";
import MentorDetails from "./Mentor/MentorDetails";
import MentorHome from "./Mentor/MentorHome";
import StudentDetails from "./Student/StudentDetails";
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
    path: "mentorhome",
    element: <MentorHome />,
    title: "mentorhome",
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
