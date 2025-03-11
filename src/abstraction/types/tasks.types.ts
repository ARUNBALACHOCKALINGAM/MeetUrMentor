export interface Level {
  _id:string,
  tasks: Task[],
  isUnlocked: boolean,
  isCompleted:boolean,
  level:string
}

export interface Comments {
    comments: string;
    path: string;
    element: JSX.Element;
  }

export interface Task {
    name: string,
    points: number,
    difficulty: string,
    status: string,
};

export type SingleTask = {
  subTasks: Array<SingleTask>;
  id: string;
  _id?:string;
  name: string;
  description: string;
  status: "Todo" | "InProgress" | "Completed";
  title:string;
  resources:any;
  points: number;
  difficulty: "Easy" | "Medium" | "Hard";
  type:string;
  // Add other fields as needed
};

export type Activity = {
  _id:string;
  taskId:string;
  username:string;
  content:string;
  userId:string;
  type:string;
  createdAt:string;
}