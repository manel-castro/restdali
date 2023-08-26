import axios from "axios";

export const axiosInstanceBackoffice = axios.create({
  baseURL: "http://be-backoffice-srv:9002",
});
