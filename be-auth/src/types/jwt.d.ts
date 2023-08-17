import { ERoleLevel } from "./enums";

export interface UserPayload {
  id: string;
  email: string;
  role: ERoleLevel;
}
