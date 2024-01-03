import React, { useState, useEffect, useRef, FC} from 'react';
import { courseService } from '../../../services/courses/courseService';
import InputText from '../../atoms/InputText/InputText';
import InputSelect from '../../atoms/InputSelect/InputSelect';
import { User } from '../../../models/types/user.types';
import { Categories, Composers, Instrument } from '../../../models/types/courses.types';
import Button from '../../atoms/Button/Button';
import { useGoNavigate } from '../../../hooks/Navigation';
import { useParams } from 'react-router-dom';
import "./CourseForm.scss" ;

interface CourseFormProps {
  typeForm?: 'creat'| 'edit'
}

const CourseForm: FC<CourseFormProps>  = ({typeForm }) => {

    const [courseCreationIsSuccesful, setCourseCreationIsSuccesful] = useState< boolean | null > (null);
    const { navigateTo } = useGoNavigate();
    const [optionsProfessors, setOptionsProfessors] = useState([{ value: "", label: "Choisir un professeur" }]);
    const [optionsCategories, setOptionsCategories] = useState([{ value: "", label: "Choisir une catégorie" }]);
    const [optionsCompositors, setOptionsCompositors] = useState([{ value: "", label: "Choisir un compositeur" }]);
    const [optionsInstruments, setOptionsInstruments] = useState([{ value: "", label: "Choisir un instrument" }]);
    const { Id } = useParams();
    
    const initialStateNewCourse = {
      title: '',
      description: '',
      price: undefined || '',
      linkVideo: '',
      preview: '',
      photo: '',
      instrumentId: undefined || '',
      professorId: undefined || '',
      composerId: undefined || '',
      categoryId: undefined || ''
    };

  const [newCourse, setNewCourse] = useState(initialStateNewCourse);
  const dataFetchedRef = useRef(false);

  const handleChange = (event :any) => {
    const { name, value } = event.target;
    setNewCourse({ ...newCourse, [name]: value });
  };

  const clearNewCourse = () => {
    setCourseCreationIsSuccesful(null);
    setNewCourse(initialStateNewCourse);
  };

  const handleAdd = () => {
    clearNewCourse();
    navigateTo(`/courses`);
  };


  useEffect(() => {

      const getProfessorForOption = (response : User[]) => {
        const professors = response.map((e :any) => {
        return {
            value: e.id,
            label:  e.firstName + ' ' + e.lastName.toUpperCase()
          }
        });
        setOptionsProfessors([...optionsProfessors, ...professors]);
      };

      const getCategoryForOption = (response : Categories[]) => {
        const categories = response.map((e :any) => {
        return {
            value: e.id,
            label:  e.name
          }
        });
        setOptionsCategories([...optionsCategories, ...categories]);
      };

      const getCompositorsForOption = (response : Composers[]) => {
        const compositors = response.map((e :any) => {
        return {
            value: e.id,
            label:  e.fullName
          }
        });
        setOptionsCompositors([...optionsCompositors, ...compositors]);
      };

      const getInstrumentsForOption = (response : Instrument[]) => {
        const instruments = response.map((e :any) => {
        return {
            value: e.id,
            label:  e.name
          }
        });
        setOptionsInstruments([...optionsInstruments, ...instruments]);
      };

      const getCourseDatasForCreation = async() => {
        let datas = await courseService.courseDatasCreation();
        getProfessorForOption(datas.professors);
        getCategoryForOption(datas.categories);
        getCompositorsForOption(datas.composers);
        getInstrumentsForOption(datas.instruments);
      }

      const getCourseForEdit = async () => {
        if( Id !== undefined ) {
          let datas = await courseService.courseShow(Id);
          setNewCourse({
            ...datas,
            instrumentId: datas?.instrument.id,
            professorId: datas?.professor.id,
            composerId: datas?.composers[0].id,
            categoryId: datas?.categories[0].id,
          });
        }
      }

      if (!dataFetchedRef.current) {

        getCourseDatasForCreation();

        if( typeForm === 'edit' ) {
          getCourseForEdit();
        }

        dataFetchedRef.current = true;
      }


  },[optionsCategories, optionsCompositors,optionsInstruments,optionsProfessors, typeForm , Id ]);

  const handleSubmit = async () => {
    let response ;

    try {

      if( typeForm === 'creat') {
        response = await courseService.courseAdd(newCourse);
      }

      if( typeForm === 'edit') {
        response = await courseService.courseEdit(Id,newCourse);
      }

      if ( response && response.status >= 200 ){
        setCourseCreationIsSuccesful(true);
      }
    
    } catch (error) {
      console.error('Error creating course', error);
    }
  };


  if( courseCreationIsSuccesful ){
    return (
      <div className='container-sucess-add'>
        <div className='elements-zone'>
          <div className='txt-area'>
            {( typeForm === 'creat') && <h4>Vous venez de créer un nouveau cours avec succès </h4>}
            {( typeForm === 'edit') && <h4>Vous venez de modifier avec succès le cours N° { Id ?  Id : ''} </h4>}
          </div>
          <div className='btn-zone'>
            <Button kind='secondary' onClick={handleAdd}>
              Retour
            </Button> 

            {( typeForm === 'creat') && (
              <Button kind='primary' onClick={clearNewCourse}>
                  Ajouter un nouveau cours
              </Button> 
            )}
          </div>
        </div>
      </div>

    )
  }

  return (
    <div className='container-global-add'>
      <form className="add-course form">
        <div className='cont-title-page'>
          {( typeForm === 'creat') && <h1 className='title-page-add-course'> Ajouter un cours </h1> }
          {( typeForm === 'edit') && <h1 className='title-page-add-course'> Modifier le cours N° { Id ?  Id : ''}</h1> }
        </div>
        <div className="mb-3">
            <label></label>
        </div>
        <div className="mb-3">
              <InputText 
                  label= {"Titre"}
                  name='title' 
                  onChange={handleChange}
                  value={newCourse?.title || '' }
                  isRequired= {true}
                  errorText={""}
              />
        </div>
        <div className="mb-3">
              <InputText 
                  label= {"Description"}
                  type="textarea"     
                  name='description' 
                  onChange={handleChange}
                  value={newCourse?.description || ''}
                  isRequired= {true}
                  errorText={""}
              />
        </div>

        <div className="grid-container mb-3">
            <div className="grid-item mb-3">
                  <InputText 
                      label= {"Prix en €"}   
                      name='price' 
                      onChange={handleChange}
                      value={newCourse?.price}
                      isRequired= {true}
                      errorText={""}
                  />
            </div>
            <div className="grid-item mb-3">
                  <InputText 
                      label= {"Id de la vidéo"}   
                      name='linkVideo' 
                      onChange={handleChange}
                      value={newCourse?.linkVideo || ''}
                      isRequired= {true}
                      errorText={""}
                  />
            </div>
        </div>
        <div className="mb-3">
              <InputText 
                  label= {"Preview"}   
                  name='preview' 
                  onChange={handleChange}
                  value={newCourse?.preview || ''}
                  isRequired= {true}
                  errorText={""}
              />
        </div>
        <div className="mb-3">
              <InputText 
                  label= {"Photo"}   
                  name='photo' 
                  onChange={handleChange}
                  value={newCourse?.photo || ''}
                  isRequired= {true}
                  errorText={""}
              />
        </div>

        <div className="grid-container mb-3 select-input-grp">
              <div className="grid-item">
                <InputSelect 
                  name="instrumentId"
                  label="Instruments"
                  options={optionsInstruments}
                  value={newCourse.instrumentId || '' } 
                  onChange={handleChange}
                />
              </div>
              
              <div className="grid-item">
                <InputSelect 
                  name="professorId"
                  label="Professeurs"
                  options={optionsProfessors}
                  value={newCourse.professorId || ''} 
                  onChange={handleChange}
                />
              </div>

              <div className="grid-item">

                <InputSelect 
                  name="composerId"
                  label= "Compositeur"   
                  options={optionsCompositors}
                  value={newCourse.composerId || ''} 
                  onChange={handleChange}
                />
                
              </div>

              <div className="grid-item">
                <InputSelect 
                  name="categoryId"
                  label="Catégories"
                  options={optionsCategories}
                  value={newCourse.categoryId || ''} 
                  onChange={handleChange}
                />
              </div>
        </div>
        
        <div className='cont-add-course-check'>
          <Button kind='secondary' onClick={handleAdd}>
            Retour
          </Button> 
          <br></br>
          <Button kind='primary' onClick={handleSubmit}>
          {( typeForm === 'creat') && <span> Créer</span> }
          {( typeForm === 'edit') && <span> Modifier </span> }          
          </Button>
        </div>
        
      </form>
    </div>

  );
};

export default CourseForm;
