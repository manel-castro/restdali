import axios from "axios";

export const axiosInstanceAuth = axios.create({
  baseURL: "http://be-backoffice-srv:9002",
});
