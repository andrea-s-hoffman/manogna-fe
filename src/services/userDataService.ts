import axios from "axios";
import JobData from "../models/JobData";
import UserData from "../models/UserData";

const baseURL: string = import.meta.env.VITE_BASE_URL || "BASE URL NOT FOUND";

export const getUserData = async (uid: string): Promise<UserData | void> => {
  try {
    const res = await axios.get(`${baseURL}/users/${uid}`);
    return res.data;
  } catch (err) {
    return console.log(err);
  }
};

export const addNewUser = async (
  userData: UserData
): Promise<UserData | void> => {
  try {
    const res = await axios.post(`${baseURL}/users`, userData);
    return res.data;
  } catch (err) {
    return console.log(err);
  }
};

export const deleteUserData = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${baseURL}/users/${id}`);
  } catch (err) {
    console.log(err);
  }
};
