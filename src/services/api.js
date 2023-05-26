import axios from "axios";
import instance from "../utils/axios-customize";

export const callLogin = (userName, passWord, delay) => {
  return instance.post("/api/v1/auth/login", {
    username: userName,
    password: passWord,
    delay: delay,
  });
};

export const callRegister = (fullName, email, passWord, phone) => {
  return instance.post("/api/v1/user/register", {
    fullName: fullName,
    email: email,
    password: passWord,
    phone: phone,
  });
};

export const callFetchAccount = () => {
  return instance.get("/api/v1/auth/account");
};
