import axios from "axios";

export function login(user) {
  return axios.post("http://localhost:3001/api/auth", {
    email: user.email,
    password: user.password
  });
}
