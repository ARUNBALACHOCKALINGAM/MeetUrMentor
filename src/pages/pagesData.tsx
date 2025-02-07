import { routerType } from "../abstraction/types/router.types";
import Track from "./Track";
import Details from "./Details";
import { Home } from "./Home";
import { PersonalCard } from "../features/match/PersonalCard";
import { Chat } from "../features/chat/Chat";
import { KanbanBoard } from "../features/tasks/KanbanBoard";
import { Progress } from "../features/progress/Progress";
import { Achievements } from "../features/achievements/Achievements";
import { Profile } from "../features/profile/Profile";
import { Settings } from "../features/settings/Settings";
import { TaskDetails } from "../features/tasks/TaskDetails";
import { TaskForm } from "../features/tasks/TaskForm";
import authRoutes from "./authRoutes";


const pagesData: routerType[] = [
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
    element: <Home children={<PersonalCard/>}/>,
    title: "home",
  },
  {
    path: "chat",
    element: <Home children={<Chat userType={"student"}/>}/>,
    title: "chat",
  },
  {
    path: "tasks",
    element: <Home children={<KanbanBoard/>}/>,
    title: "tasks",
  },
  {
    path: "task",
    element: <Home children={<TaskDetails/>}/>,
    title: "task",
  },
  {
    path: "addtask",
    element: <Home children={<TaskForm/>}/>,
    title: "addtask",
  },
  {
    path: "progress",
    element: <Home children={<Progress/>}/>,
    title: "progress",
  },
  {
    path: "achievements",
    element: <Home children={<Achievements/>}/>,
    title: "achievements",
  },
  {
    path: "profile",
    element: <Home children={<Profile/>}/>,
    title: "profile",
  },
  {
    path: "settings",
    element: <Home children={<Settings/>}/>,
    title: "settings",
  },
  ...authRoutes
];

export default pagesData;
