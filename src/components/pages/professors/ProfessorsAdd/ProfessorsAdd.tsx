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
  const [professorCreationIsSuccesful, setProfessorCreationIsSuccesful] = useState< boolean | null > (null);
  const [optionsInstruments, setOptionsInstruments] = useState< any>([]);
  const [newUsers, setNewUsers] = useState(initialStateNewUsers);

  const dataFetchedRef = useRef(false);
  const { navigateTo } = useGoNavigate();
  
  const handleChange = (event: any) => {
      const { name, value } = event.target;
      setNewUsers({ ...newUsers, [name]: value });    
  };

  const clearSatesProfessor = () => {
    setProfessorCreationIsSuccesful(null);
    setNewUsers(initialStateNewUsers);
  };

  const goBackListProfessor = () => {
    clearSatesProfessor();
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

      let response = await usersService.register(datasRegister);
      if(response.token && response.token !== '') {
        setProfessorCreationIsSuccesful(true);
      }
    
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



  if( professorCreationIsSuccesful ) {
    return (
      <div className='container-sucess-add'>
        <div className='elements-zone'>
          <div className='txt-area'>
            <h4>Vous venez d'inscrire un nouveau professeur avec succès </h4>
          </div>
          <div className='btn-zone'>
            <Button kind='secondary' onClick={goBackListProfessor}>
              Retour
            </Button> 
            <Button kind='primary' onClick={clearSatesProfessor}>
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
          <Button kind='secondary' onClick={clearSatesProfessor}>
            Retour
          </Button> 
          <Button kind='primary' onClick={handleSubmit}>
             Créer
          </Button>
        </div>
      </form>
    </div>
)};

export default ProfessorsAdd;
