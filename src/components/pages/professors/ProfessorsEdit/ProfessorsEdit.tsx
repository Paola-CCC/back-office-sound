import React, { FC, useEffect, useRef, useState } from 'react';
import './ProfessorsEdit.scss';
import InputText from '../../../atoms/InputText/InputText';
import Button from '../../../atoms/Button/Button';
import { useGoNavigate } from '../../../../hooks/Navigation';
import { usersService } from '../../../../services/users/UsersService';
import InputGroupCheckbox from '../../../atoms/InputGroupCheckbox/InputGroupCheckbox';
import { Instrument } from '../../../../models/types/courses.types';
import InputRadio from '../../../atoms/InputRadio/InputRadio';
import { instrumentService } from '../../../../services/courses/instrumentService';
import { useParams } from 'react-router-dom';

interface ProfessorsEditProps {}

const ProfessorsEdit: FC<ProfessorsEditProps> = () => { 

  const initialStateNewUsers = {
    firstName: '',
    lastName:'',
    email:'',
    biography: '',
    photo:'',
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
  const [selectedFile, setSelectedFile] = useState< any>('');
  const [successUpdateUser, setSuccessUpdateUser] = useState< any>(null);
  const [successUpdateUserPic, setSuccessUpdateUserPic] = useState< any>(null);
  const [isLoading, setIsLoading] = useState< any>(false);
  const { Id } = useParams();
  const dataFetchedRef = useRef(false);
  const { navigateTo } = useGoNavigate();
  const URL = 'https://api-sound-project.com/';
  
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

      let response = await usersService.updateUser( Id , datasRegister);
      updatePicture();
      if(response.token && response.token !== '') {
        setProfessorCreationIsSuccesful(true);
      }
    
    } catch (error) {
      console.error('Error creating course', error);
    }
  };

  /** Selectionne la photo  */
  const onFileChange = async(event :any) => {
    const file = event.target.files[0];

    if (!file) {
      console.error("No file selected");
    }

    setSelectedFile(file);
  };

  /** Met à jour la photo de profile */
  const updatePicture = async() => {
    // e.preventDefault();

    if (!selectedFile) {
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append('imageFile', selectedFile, selectedFile.name);

    try {
      const response = await usersService.updateUserPicture(`/uploadimage/new/user/${Id}`, formData);
        if (response && response.data !== '' && response.data !== undefined ) {
          setSuccessUpdateUserPic(true);
          window.location.reload();
          setIsLoading(false); 
        } else {
          setSuccessUpdateUserPic(false);
          setIsLoading(false); 
        }
    } catch (error) {
      console.error(error);
      setSuccessUpdateUserPic(false);
      setIsLoading(false); 
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

    const displayUserProfessorData = async () => {
      try {
          const dataUser = await usersService.showById(Id);
          setNewUsers({
            firstName: dataUser?.firstName,
            lastName: dataUser?.lastName,
            photo: dataUser?.image?.imageName,
            email:dataUser?.email,
            biography: dataUser?.biography,
            password: "password",
            roles: "ROLE_PROFESSOR"
          });

          console.log('prof photo ', dataUser.photo );
      } catch (error) {
          console.error(error);
      };
    }

    if( dataFetchedRef.current === false ){
      displayInstruments();

      if( Id && Id !== undefined) {
        displayUserProfessorData();
      }
      dataFetchedRef.current = true;
    }
  
  }, [optionsInstruments,selectedOptions,Id])



  if( professorCreationIsSuccesful ) {
    return (
      <div className='container-sucess-add'>
        <div className='elements-zone'>
          <div className='txt-area'>
            <h4>Vous venez de modifier les informations du professeur avec succès </h4>
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
          <h2 className='title-page-add-course'> Modifier les données </h2> 
        </div>
        

        <div className="grid-container mb-3">
          <div className="img-profile">
            <img src= { !newUsers?.photo  ? URL + '/images/upload/profile.png' : URL + '/images/upload/' + newUsers?.photo } alt={'profile user'} width={100} height={100}/>
          </div>
          <div className="container-inputFile">
            <label  htmlFor="file-image" className="form-label">Changer ma photo de profil</label>
            <input className="form-control" type="file" id="file-image" name="file-image" onChange={onFileChange} required={true}   accept=".jpg, .jpeg, .png" />
          </div>
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
        <div className="grid-container mb-3">
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
 {/*
        <div className="mb-3">
          <InputGroupCheckbox
            options={optionsInstruments}
            selectedOptions={selectedOptions}
            labelCheckboxGroup="Instruments"
            handleChange={(selected :any ) => handleCheckboxChange(selected)}
          />
        </div> */}

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
            Modifier
          </Button>
        </div>
      </form>
    </div>
)};

export default ProfessorsEdit;
