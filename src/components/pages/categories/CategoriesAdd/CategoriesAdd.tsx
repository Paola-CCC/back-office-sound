import React, { FC, useState } from 'react';
import './CategoriesAdd.scss';
import Button from '../../../atoms/Button/Button';
import InputText from '../../../atoms/InputText/InputText';
import { useGoNavigate } from '../../../../hooks/Navigation';
import { categoriesService } from '../../../../services/courses/categoriesService';

interface CategoriesAddProps {}

const CategoriesAdd: FC<CategoriesAddProps> = () => { 

  const [courseCreationIsSuccesful, setCourseCreationIsSuccesful] = useState< boolean | null > (null);
  const { navigateTo } = useGoNavigate();
  const [categoryName, setCategoryName] = useState('');



  const clearNewCourse = () => {
    setCourseCreationIsSuccesful(null);
  };

  const handleAdd = () => {
    clearNewCourse();
    navigateTo(`/categories`);
  };


  const handleSubmit = async () => {

    try {

      const newCategory = {
        name: categoryName
      };

      let response = await categoriesService.categoryAdd(newCategory);

      if ( response && response.status >= 200 ){
        setCourseCreationIsSuccesful(true);
      }
    
    } catch (error) {
      console.error('Error creating course', error);
    }
  }


  if( courseCreationIsSuccesful ){
    return (
      <div className='container-sucess-add'>
        <div className='elements-zone'>
          <div className='txt-area'>
            <h4>Vous venez de créer une nouvelle catégorie avec succès </h4>
          </div>
          <div className='btn-zone'>
            <Button kind='secondary' onClick={handleAdd}>
              Retour
            </Button> 

              <Button kind='primary' onClick={clearNewCourse}>
               Ajouter une nouvelle catégorie
              </Button> 
          </div>
        </div>
      </div>

    )
  }
  
  return (
    <div className='container-global-add'>
      <form className="add-course form">
        <div className='cont-title-page'>
           <h1 className='title-page-add-course'> Ajouter une catégorie </h1> 
        </div>
        <div className="mb-3">
          <InputText 
              label= {"Nom de la catégorie"}
              name='name' 
              onChange={(e) => setCategoryName(e.target.value)}
              value={categoryName }
              isRequired= {true}
              errorText={""}
          />
        </div>
        
        <div className='cont-add-course-check'>
          <Button kind='secondary' onClick={handleAdd}>
            Retour
          </Button> 
          <br></br>
          <Button kind='primary' onClick={handleSubmit}>
            <span> Ajouter </span>  
          </Button>
        </div>
        
      </form>
    </div>
)};

export default CategoriesAdd;
