import { getIsAuth } from "@/utils/getIsAuth";
import axios from "axios";
// import { cookies } from "next/headers";
import Cookies from "js-cookie";

export const instance = axios.create({
  baseURL: "http://localhost:80",
  headers: {
    common: {
      Authorization: getIsAuth(),
    },
    // Cookie:
    //   Cookies.get("session") ||
    //   "eyJqd3QiOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKcFpDSTZJbVE1TnpVeE9UWmlMVEkzTkdFdE5HWTNaQzA0TldNeExUQTRNV1F5TURVMU5HVTVPU0lzSW1WdFlXbHNJam9pZEdWemRFQjBaWE4wTG1OaGMzTnpJaXdpY205c1pTSTZJa0ZFVFVsT0lpd2lhV0YwSWpveE5qa3hNak0wTURZMGZRLmJHS1h4cG1ORjREVlBDU3pCdThhQzBienpHNm13WkNzYU12VzUzRmxnbXMifQ==",
  },
  // withCredentials: true,
});
