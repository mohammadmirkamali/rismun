import axios from "axios";

export function login(user) {
  return axios.post("http://localhost:8000/api/auth", {
    email: user.email,
    password: user.password
  });
}
