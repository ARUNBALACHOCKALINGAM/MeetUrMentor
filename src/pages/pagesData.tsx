import { routerType } from "../abstraction/types/router.types";
import { MentorSignIn } from "./MentorSignIn";


const pagesData: routerType[] = [
  {
    path: "mentorsignin",
    element: <MentorSignIn />,
    title: "mentorsignin"
  }
];

export default pagesData;
