import { routerType } from "../abstraction/types/router.types";
import { MentorSignIn } from "./MentorSignIn";
import { MentorSignUp } from "./MentorSignUp";
import { StudentSignUp } from "./StudentSignUp";
import { StudentSignIn } from "./StudentSignIn";
import MentorDetails from "./MentorDetails";
import StudentDetails from "./StudentDetails";
import StudentTrack from './StudentTrack';
import MentorTrack from "./MentorTrack";

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
    element: <StudentTrack />,
    title: "studenttrack",
  },
  {
    path: "mentortrack",
    element: <MentorTrack />,
    title: "mentortrack",
  },
];

export default pagesData;
