import { AxiosResponse } from "axios";
import AxiosClient from "../AxiosClient";
import { ICategories } from "../../models/Interfaces/categories";

const URL = 'https://api-sound-project.com';
const httpClient = AxiosClient;


const categoriesAll = async () => {
    try {
      const response : AxiosResponse<ICategories[]> = await httpClient.get(`${URL}/category/all`);
      if (response.status >= 200 && response.status <= 299) {
        const categories: ICategories[] = response.data;
        return categories;
      } else {
        throw new Error(`Erreur de réponse de l'API, code : ${response?.status}`);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des catégories :', error);
      throw error; 
    }
  };


  const categoryAdd = async (newCategory : Object) => {
    try {
        const response = await httpClient.post(`${URL}/category/new`, newCategory);
        if (response.status >= 200 && response.status <= 299) {
          return response;
        } else {
          throw new Error(`Erreur de réponse de l'API, code : ${response?.status}`);
        }
    } catch (error) {
      console.error('Erreur lors de la création de la catégorie :', error);
      throw error; 
    }
};


interface categoriesDeleteManyParams {
  categoriesIDs: number[];
}

const categoriesDeleteMany = async (params: categoriesDeleteManyParams): Promise<AxiosResponse | void> => {
  try {

    const response = await httpClient.delete(`${URL}/category/delete-many?categoriesIDs=[${params.categoriesIDs}]`);

    if (response.status >= 200 && response.status <= 299) {
      return response;
    } else {
      console.log("Error message", response);
    }
  } catch (error) {
    console.error(error);
  }
};

//   const courseShowById = async (Id: number | string) => {
//     try {
//       const response = await httpClient.get(`${URL}/api/courses/${Id}`);
//       if (response.status >= 200 && response.status <= 299) {
//         return response.data;
//       } else {
//         console.log("error message ", response);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };


//   const courseAdd = async (data: Object) => {
//     try {
//       const response = await httpClient.post(`${URL}/api/new-course`, data);
//       if (response.status >= 200 && response.status <= 299) {
//         return response.data;
//       } else {
//         console.log("error message ", response);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };


// // récuperer les documents par cours
// const courseEdit = async ( Id: number | string, data: Object) => {
//     try {
//       const response = await httpClient.put(`${URL}/courses/${Id}`,data);
  
//       if (response.status >= 200 && response.status <= 299) {
//         return response.data;
//       } else {
//         console.log("error message ", response);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };


//   const courseDelete = async (Id: number | string) => {
//     try {
//       const response = await httpClient.delete(`${URL}/courses/${Id}`);
//       if (response.status >= 200 && response.status <= 299) {
//         return response;
//       } else {
//         console.log("error message ", response);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };


  export const categoriesService = {
    categoriesAll,
    categoryAdd,
    categoriesDeleteMany 
  };