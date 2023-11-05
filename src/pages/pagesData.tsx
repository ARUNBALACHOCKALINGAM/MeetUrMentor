import { routerType } from "../abstraction/types/router.types";
import { MentorSignIn } from "./MentorSignIn";
import { MentorSignUp } from "./MentorSignUp";
import { StudentSignUp } from "./StudentSignUp";
import { StudentSignIn } from "./StudentSignIn";
import MentorDetails from "./MentorDetails";
import StudentDetails from "./StudentDetails";

const pagesData: routerType[] = [
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
];

export default pagesData;
