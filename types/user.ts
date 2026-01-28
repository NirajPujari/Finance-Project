export type User = {
    token: string;
    name: string;
    email: string;
    age?: string;
}
export type SignUpUser = 
  Omit<User, "token" | "age"> &
  { age: string; password: string };

export type LogInUser = 
  Omit<User, "token" | "age" | "name"> &
  { password: string };