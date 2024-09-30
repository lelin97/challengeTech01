import axios, { AxiosInstance } from "axios";

export const axiosInstance = async (): Promise<AxiosInstance> => {
  const instance = axios.create({
    responseType: "json",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,OPTIONS",
    },
  });

  return instance;
};
