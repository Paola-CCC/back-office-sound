import { AxiosResponse } from "axios";
import AxiosClient from "../AxiosClient";
import { IComposers } from "../../models/Interfaces/composer";

const URL = 'https://api-sound-project.com';
const httpClient = AxiosClient;


const composersAll = async () => {
  try {
    const response: AxiosResponse<IComposers[]> = await httpClient.get(`${URL}/composer/all`);
    if (response.status >= 200 && response.status <= 299) {
      const compositors: IComposers[] = response.data;
      return compositors;
    } else {
      throw new Error(`Erreur de réponse de l'API, code : ${response?.status}`);
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des cours :', error);
    throw error;
  }
};

  const composersShowById = async (Id: number | string | undefined) => {
    try {
      const response = await httpClient.get(`${URL}/composer/${Id}`);
      if (response.status >= 200 && response.status <= 299) {
        return response.data;
      } else {
        console.log("error message ", response);
      }
    } catch (error) {
      console.error(error);
    }
  };


const composersAdd = async (data: Object) => {
  try {
    const response = await httpClient.post(`${URL}/composer/new`, data);
    if (response.status >= 200 && response.status <= 299) {
      return response;
    } else {
      console.log("error message ", response);
    }
  } catch (error) {
    console.error(error);
  }
};

interface composersDeleteManyParams {
  composersIDs: number[];
}

const composersDeleteMany = async (params: composersDeleteManyParams): Promise<AxiosResponse | void> => {
  try {

    const response = await httpClient.delete(`${URL}/composer/delete-many?composersIDs=[${params.composersIDs}]`);

    if (response.status >= 200 && response.status <= 299) {
      return response;
    } else {
      console.log("Error message", response);
    }
  } catch (error) {
    console.error(error);
  }
};


const composersEdit = async ( Id: number | string | undefined, data: Object) => {
    try {
      const response = await httpClient.put(`${URL}/composer/${Id}/edit`,data);

      if (response.status >= 200 && response.status <= 299) {
        return response;
      } else {
        console.log("error message ", response);
      }
    } catch (error) {
      console.error(error);
    }
  };


  const composersDelete = async (Id: number | string | undefined) => {
    try {
      const response = await httpClient.delete(`${URL}/composer/${Id}`);
      if (response.status >= 200 && response.status <= 299) {
        return response;
      } else {
        console.log("error message ", response);
      }
    } catch (error) {
      console.error(error);
    }
  };


export const composersService = {
  composersAll,
  composersAdd,
  composersDeleteMany,
  composersShowById,
  composersDelete,
  composersEdit
};