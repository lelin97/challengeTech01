import { AxiosError, AxiosRequestConfig } from "axios";
import { axiosInstance } from "./axiosConfig";
import { ReturnMock } from "../types";

type AppReqConfig = {
  axiosConfig?: AxiosRequestConfig;
  messageSucess?: string;
  messageError?: string;
};

async function post<T extends any = any>(
  url: string,
  data: any,
  reqConfig?: AppReqConfig
): Promise<ReturnMock<T>> {
  const instance = await axiosInstance();
  const response = await instance
    .post<ReturnMock>(url, data, reqConfig?.axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((error: AxiosError) => {
      if (error.response?.data) {
        return error.response.data as any;
      }
      return {
        sucesso: false,
        mensagem: "Erro ao realizar requisição.",
        erro: error.message,
      };
    });

  return response;
}

const api = { post };

export { api };
