import { getIsAuth } from "@/utils/getIsAuth";
import axios from "axios";

export const instance = axios.create({
  baseURL: "http://localhost:8080", // ONLY FOR DEV: comment this for production
  headers: {
    common: {
      Authorization: getIsAuth(),
    },
  },
});
