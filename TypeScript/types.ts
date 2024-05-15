export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
    user?: User;
  }
  
  export interface User {
    name: string;
    phone: string;
    email: string;
  }
  