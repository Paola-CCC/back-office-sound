import { AxiosResponse } from "axios";
import AxiosClient from "../AxiosClient";
import { IUsers } from "../../models/Interfaces/users";

const URL = 'https://api-sound-project.com';
const httpClient = AxiosClient;

const showAll = async () => {
    try {
        const response = await httpClient.get(`${URL}/api/users-all`);
        if (response.status >= 200 && response.status <= 299) {
            return response.data;
        } else {
            console.log("error message ", response);
        }
    } catch (error) {
        console.error(error);
    }
};

const showById = async (Id: number | string | undefined) => {
    try {
        const response = await httpClient.get(`${URL}/user/${Id}`);
        if (response.status >= 200 && response.status <= 299) {
            return response.data;
        } else {
            console.log("error message ", response);
        }
    } catch (error) {
        console.error(error);
    }
};

const showProfessorsList = async () => {
    try {
        const response: AxiosResponse<IUsers[]> = await httpClient.get(`${URL}/professors`);
        if (response.status >= 200 && response.status <= 299) {
            const responses : IUsers[] = response.data ;
            return responses;
        } else {
            console.log("error message ", response);
        }
    } catch (error) {
        console.error(error);
    }
};

const showStudentsList = async () => {
    try {
        const response: AxiosResponse<IUsers[]> = await httpClient.get(`${URL}/students`);
        if (response.status >= 200 && response.status <= 299) {
            const responses : IUsers[] = response.data ;
            return responses;
        } else {
            console.log("error message ", response);
        }
    } catch (error) {
        console.error(error);
    }
};

const showEntrepriseList = async () => {
    try {
        const response: AxiosResponse<IUsers[]> = await httpClient.get(`${URL}/entreprise`);
        if (response.status >= 200 && response.status <= 299) {
            const responses : IUsers[] = response.data ;
            return responses;
        } else {
            console.log("error message ", response);
        }
    } catch (error) {
        console.error(error);
    }
};

const login = async (data: Object) => {
    try {
        const response = await httpClient.post(`${URL}/api/login_check`, data);
        if (response.status >= 200 && response.status <= 299) {
            return response.data;
        } else {
            console.log("error message ", response);
        }
    } catch (error) {
        console.error(error);
    }
};


const register = async (data: Object) => {
    try {
        const response = await httpClient.post(`${URL}/api/register`, data);
        if (response.status >= 200 && response.status <= 299) {
            return response.data;
        } else {
            console.log("error message ", response);
        }
    } catch (error) {
        console.error(error);
    }
};

const updateUser = async (Id: number | string | undefined, data: Object) => {
    try {
        const response = await httpClient.put(`${URL}/user/${Id}/edit`, data);
                if (response.status >= 200 && response.status <= 299) {
            return response;
        } else {
            console.log("error message ", response);
        }
    } catch (error) {
        console.error(error);
    }
};

const deleteUser = async (Id: number | string, data: Object) => {
    try {
        const response = await httpClient.put(`${URL}/api/user/${Id}/edit`, data);
        if (response.status >= 200 && response.status <= 299) {
            return response.data;
        } else {
            console.log("error message ", response);
        }
    } catch (error) {
        console.error(error);
    }
};


const updateUserPicture = async (endpoint : any, userPicture :any) => {
    try {
        const response = await httpClient.postFile(`${URL}${endpoint}`, userPicture);
        if (response.status >= 200 && response.status <= 299) {
            return response ;
        } else {
            console.log('error message ', response)
        }
    } catch (error) {
        console.error(error)
    }
}


interface UsersDeleteManyParams {
    usersIds: number[];
  }
  
  const usersDeleteMany = async (params: UsersDeleteManyParams): Promise<AxiosResponse | void> => {
    try {
          
      const response = await httpClient.delete(`${URL}/users-delete-many?usersIds=[${params.usersIds}]`);
  
      if (response.status >= 200 && response.status <= 299) {
        return response;
      } else {
        console.log("Error message", response);
      }
    } catch (error) {
      console.error(error);
    }
  };

export const usersService = {
    login,
    register,
    showById,
    showProfessorsList,
    showStudentsList,
    showEntrepriseList,
    showAll,
    updateUser,
    deleteUser,
    usersDeleteMany,
    updateUserPicture

};
