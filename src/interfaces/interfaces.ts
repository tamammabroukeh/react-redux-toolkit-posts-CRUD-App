export interface IPost {
  id: string;
  title: string;
  content: string;
  date: string;
  userId?: string;
  reactions: {
    thumbsUp: number;
    wow: number;
    heart: number;
    rocket: number;
    coffee: number;
  };
}
export interface IUser {
  id: string;
  name: string;
}

export interface IProps {
  company: string;
  aboutTxt: string;
  isLoggedIn: boolean;
  setIsLoggedIn: (type: boolean) => void;
}

export interface IFormInputDetails {
  label: string;
  id: string;
  name: keyof IUser;
  type: string;
}
