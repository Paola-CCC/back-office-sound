import React, { FC, useState } from 'react';
import './InstrumentAdd.scss';
import Button from '../../../atoms/Button/Button';
import InputText from '../../../atoms/InputText/InputText';
import { instrumentService } from '../../../../services/courses/instrumentService';
import { useGoNavigate } from '../../../../hooks/Navigation';

interface InstrumentAddProps {}

const InstrumentAdd: FC<InstrumentAddProps> = () => { 

  const [courseCreationIsSuccesful, setCourseCreationIsSuccesful] = useState< boolean | null > (null);
  const [instrumentName, setInstrumentName] = useState<string>('');
  const { navigateTo } = useGoNavigate();


  const clearNewCourse = () => {
    setCourseCreationIsSuccesful(null);
    setInstrumentName('');
  };

  const handleAdd = () => {
    clearNewCourse();
    navigateTo(`/instruments`);
  };


  const handleSubmit = async () => {

    try {

      const newInstrument = {
        name: instrumentName
      };

      let response = await instrumentService.instrumentAdd(newInstrument);

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
            <h4>Vous venez de créer un nouvel instrument avec succès </h4>
          </div>
          <div className='btn-zone'>
            <Button kind='secondary' onClick={handleAdd}>
              Retour
            </Button> 

              <Button kind='primary' onClick={clearNewCourse}>
                  Ajouter un nouvel instrument
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
           <h1 className='title-page-add-course'> Ajouter un Instrument </h1> 
        </div>
        <div className="mb-3">
          <InputText 
              label= {"Nom de l'instrument"}
              name='name' 
              onChange={(e) => setInstrumentName(e.target.value)}
              value={instrumentName }
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

export default InstrumentAdd;
