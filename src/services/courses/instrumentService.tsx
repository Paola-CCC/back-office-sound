import { AxiosResponse } from "axios";
import AxiosClient from "../AxiosClient";
import { IInstruments } from "../../models/Interfaces/instrument";

const URL = 'https://api-sound-project.com';
const httpClient = AxiosClient;


const instrumentAll = async () => {
    try {
      const response : AxiosResponse<any> = await httpClient.get(`${URL}/instruments`);
      if (response.status >= 200 && response.status <= 299) {
        const instruments: IInstruments[] = response.data;
        return instruments;
      } else {
        throw new Error(`Erreur de réponse de l'API, code : ${response?.status}`);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des cours :', error);
      throw error; 
    }
  };

  interface instrumentDeleteManyParams {
    instrumentsIDs: number[];
  }
  
  const instrumentsDeleteMany = async (params: instrumentDeleteManyParams): Promise<AxiosResponse | void> => {
    try {
          
      const response = await httpClient.delete(`${URL}/instruments-delete-many?instrumentsIDs=[${params.instrumentsIDs}]`);
  
      if (response.status >= 200 && response.status <= 299) {
        return response;
      } else {
        console.log("Error message", response);
      }
    } catch (error) {
      console.error(error);
    }
  };


  const instrumentAdd = async ( data: Object ,) => {
    try {
      const response = await httpClient.post(`${URL}/api/new-instrument`, data);
      if (response.status >= 200 && response.status <= 299) {
        return response;
      } else {
        console.log("error message ", response);
      }
    } catch (error) {
      console.error(error);
    }
  };


  export const instrumentService = {
    instrumentAll,
    instrumentsDeleteMany,
    instrumentAdd
    
  };