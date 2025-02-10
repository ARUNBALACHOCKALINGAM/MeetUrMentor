export interface UserState {
    user: User
}

export interface User {
    userType: 'student' | 'mentor';
    email: string;
    username: string;
    about: string;
    highestQualification: string;
    university: string;
    cgpa: string;
    linkedIn: string;
    github: string;
    leetcode: string;
    codechef: string;
    portfolio: string;
    company: string;
    role: string;
    track: string;
    avatar:string;
    matchedUser:string;
}


export interface SocialMedia {
    name: string;
    url: string;
  }
  
  export interface UserProfile {
    _id: string;
    userType: string;
    email: string;
    about: string;
    highestQualification?: string;
    university?: string;
    cgpa?: string;
    github?: string;
    leetcode?: string;
    codechef?: string;
    portfolio?: string;
    company?: string;
    role?: string;
    avatar: string;
    matchedUser?: string | null;
    createdAt: string;
    updatedAt: string;
    __v: number;
    username: string;
    linkedIn?: string;
    track: string;
    socialMedia: SocialMedia[];
  }
  

export interface FormData {
    username: string;
    about: string;
    company: string;
    role: string;
    highestQualification: string;
    university: string;
    cgpa: string;
    linkedin: string;
    github: string;
    leetcode: string;
    codechef: string;
    portfolio: string;
    avatar:string;
  }

  