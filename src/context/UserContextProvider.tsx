import { ReactNode, useEffect, useState } from "react";
import UserContext from "./UserContext";
import { User } from "firebase/auth";
import { auth } from "../firebaseConfig";
import UserData from "../models/UserData";
import { addNewUser, getUserData } from "../services/userDataService";

interface Props {
  children: ReactNode;
}

const UserContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [account, setAccount] = useState<UserData | null>(null);

  //useEffect for this to run once
  useEffect(() => {
    //return a function in useEffect --> called Clean up function:
    return auth.onAuthStateChanged((newUser) => {
      console.log("user changed", user?.uid);
      if (newUser) {
        setUser(newUser);
        getUserData(newUser.uid).then((res) => {
          if (res?._id) {
            setAccount(res);
          } else {
            addNewUser({ uid: newUser.uid }).then((res) => {
              if (res) setAccount(res);
            });
          }
        });
      } else {
        setUser(null);
        setAccount(null);
      }
    });
  }, [auth]);

  return (
    <UserContext.Provider value={{ user: user, account }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
