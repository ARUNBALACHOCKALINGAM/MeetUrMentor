export interface UserState {
    user: {
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
    }
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
  }