import axios from "axios";

export function register(user) {
  return axios.post("http://localhost:3001/api/users", {
    email: user.email,
    password: user.password,
    name: user.name
  });
}
