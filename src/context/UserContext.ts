import { User } from "firebase/auth";

import { createContext } from "react";
import UserData from "../models/UserData";

interface UserContextModel {
  user: null | User;
  account: null | UserData;
}

const defaultValues: UserContextModel = {
  user: null,
  account: null,
};

const userContext = createContext(defaultValues);

export default userContext;
