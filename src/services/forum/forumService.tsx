import { AxiosResponse } from "axios";
import AxiosClient from "../AxiosClient";
import { IForum } from "../../models/Interfaces/forum";

const URL = 'http://localhost:1234';
const httpClient = AxiosClient;

const showAll = async () => {
  
  try {
    const response : AxiosResponse< IForum[] > = await httpClient.get(`${URL}/forums`);
    if (response.status >= 200 && response.status <= 299) {
      const forumList: IForum[] = response.data;
      return forumList;
    } else {
      throw new Error(`Erreur de réponse de l'API, code : ${response?.status}`);
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des cours :', error);
    throw error; 
  }
};

interface ForumDeleteManyParams {
  forumsIds: number[];
}

const forumDeleteMany = async (params: ForumDeleteManyParams) => {
  
  try {
    const response = await httpClient.delete(`${URL}/forums-delete-many?forumsIds=[${params.forumsIds}]`);

    if (response.status >= 200 && response.status <= 299) {
      const forumList: any = response.data;
      return forumList;
    } else {
      throw new Error(`Erreur de réponse de l'API, code : ${response?.status}`);
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des forums :', error);
    throw error; 
  }
};

export const forumService = {
  showAll,
  forumDeleteMany
};