import React, { FC, useEffect, useRef, useState } from 'react';
import './ProfessorsAdd.scss';
import InputText from '../../../atoms/InputText/InputText';
import Button from '../../../atoms/Button/Button';
import { useGoNavigate } from '../../../../hooks/Navigation';
import { usersService } from '../../../../services/users/UsersService';
import InputGroupCheckbox from '../../../atoms/InputGroupCheckbox/InputGroupCheckbox';
import { Instrument } from '../../../../models/types/courses.types';
import InputRadio from '../../../atoms/InputRadio/InputRadio';
import { instrumentService } from '../../../../services/courses/instrumentService';

interface ProfessorsAddProps {}

const ProfessorsAdd: FC<ProfessorsAddProps> = () => { 

  const initialStateNewUsers = {
    firstName: '',
    lastName:'',
    email:'',
    biography: '',
    password: "password",
    roles: "ROLE_PROFESSOR"
  };

  const OptionsRoles = [
    {
      value: 'ROLE_PROFESSOR',
      label:'Professeur'
    },
  ]

  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [usersCreationIsSuccesful, setUsersCreationIsSuccesful] = useState< boolean | null > (null);
  const [optionsInstruments, setOptionsInstruments] = useState< any>([]);
  const [newUsers, setNewUsers] = useState(initialStateNewUsers);

  const dataFetchedRef = useRef(false);
  const { navigateTo } = useGoNavigate();
  
  const handleChange = (event: any) => {
      const { name, value } = event.target;
      setNewUsers({ ...newUsers, [name]: value });    
  };

  const clearNewCourse = () => {
    setUsersCreationIsSuccesful(null);
    setNewUsers(initialStateNewUsers);
  };

  const handleAdd = () => {
    clearNewCourse();
    navigateTo(`/professors`);
  };

  const handleCheckboxChange = (option : number) => {
    if(selectedOptions.includes(option) ){
      let newArray = selectedOptions.filter((valueChecked) => valueChecked !== option );
      setSelectedOptions([]);
      setSelectedOptions([...newArray]);
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleSubmit = async () => {

    try {
      
      const datasRegister = {
        ...newUsers,
        instruments:selectedOptions  
      }

      await usersService.register(datasRegister);
    
    } catch (error) {
      console.error('Error creating course', error);
    }
  };

  useEffect(() => {

    const getInstrumentsForOption = (response : Instrument[]) => {
      const instruments = response.map((e :any) => {
      return {
          value: e.id,
          label: e.name
      }
      });
      setOptionsInstruments([...optionsInstruments, ...instruments]);
    };

    const displayInstruments = async () => {
      try {
          const dataInstruments = await instrumentService.instrumentAll();
          getInstrumentsForOption(dataInstruments);
      } catch (error) {
          console.error(error);
      };
    }

    if( dataFetchedRef.current === false ){
      displayInstruments();
      dataFetchedRef.current = true;
    }
  
  }, [optionsInstruments,selectedOptions])



  if( usersCreationIsSuccesful ) {
    return (
      <>
      </>
    )

  }

  return (
    <div className='container-global-add'>
      <form className="add-course form">
        <div className='cont-title-page'>
          <h2 className='title-page-add-course'> Ajouter un professeur </h2> 
        </div>
        
        <div className="mb-3">
          <InputRadio
            labelRadioGroup={"Rôle"}
            options={OptionsRoles}
            selectedOptions={newUsers?.roles}
            name='roles'
            handleChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <InputText
            label={"Prénom"}
            name='firstName'
            onChange={handleChange}
            value={newUsers?.firstName || ''}
            isRequired={true}
            errorText={""}
          />
        </div>

        <div className="mb-3">
          <InputText
            label={"Nom"}
            name='lastName'
            onChange={handleChange}
            value={newUsers?.lastName || ''}
            isRequired={true}
            errorText={""}
          />
        </div>

        <div className="mb-3">
          <InputText
            label={"Email"}
            type="email"     
            name='email'
            onChange={handleChange}
            value={newUsers?.email || ''}
            isRequired={true}
            errorText={""}
          />
        </div>

        <div className="mb-3">
          <InputGroupCheckbox
            options={optionsInstruments}
            selectedOptions={selectedOptions}
            labelCheckboxGroup="Instruments"
            handleChange={(selected :any ) => handleCheckboxChange(selected)}
          />
        </div>

        <div className="mb-3">
          <InputText 
            label= {"Biographie"}
            type="textarea"     
            name='biography' 
            onChange={handleChange}
            value={newUsers?.biography || ''}
            isRequired= {true}
            errorText={""}
          />
        </div>

        <div className='cont-add-course-check'>
          <Button kind='secondary' onClick={handleAdd}>
            Retour
          </Button> 
          <Button kind='primary' onClick={handleSubmit}>
            <span> Créer</span> 
          </Button>
        </div>
        
      </form>
    </div>
)};

export default ProfessorsAdd;
