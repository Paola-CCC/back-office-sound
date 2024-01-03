import React, { FC, useState } from 'react';
import './EntrepriseAdd.scss';
import InputText from '../../../atoms/InputText/InputText';
import Button from '../../../atoms/Button/Button';
import { useGoNavigate } from '../../../../hooks/Navigation';
import { usersService } from '../../../../services/users/UsersService';
import InputRadio from '../../../atoms/InputRadio/InputRadio';

interface EntrepriseAddProps {}

const EntrepriseAdd: FC<EntrepriseAddProps> = () => { 

  const initialStateNewUsers  = {
    firstName: '',
    lastName:'',
    email:'',
    biography: '',
    password: "password",
    roles: "ROLE_ADMIN",
    instruments:[]
  };


  const OptionsRoles = [
    {
      value: 'ROLE_ADMIN',
      label:'administrateur'
    },
  ]

  const [usersEntrepriseCreationIsSuccesful, setUsersEntrepriseCreationIsSuccesful] = useState< boolean | null > (null);
  const [newUsers, setNewUsers] = useState(initialStateNewUsers);

  const { navigateTo } = useGoNavigate();
  
  const handleChange = (event: any) => {
      const { name, value } = event.target;
      setNewUsers({ ...newUsers, [name]: value });    
  };

  const clearNewCourse = () => {
    setUsersEntrepriseCreationIsSuccesful(null);
    setNewUsers(initialStateNewUsers);
  };

  const handleAdd = () => {
    clearNewCourse();
    navigateTo(`/professors`);
  };

  const handleSubmit = async () => {

    try {
      
      await usersService.register(newUsers);
    
    } catch (error) {
      console.error('Error creating course', error);
    }
  };



if( usersEntrepriseCreationIsSuccesful ) {
  return (
    <>
    </>
  )

}

  return (
    <div className='container-global-add'>
      <form className="add-course form">
        <div className='cont-title-page'>
          <h2 className='title-page-add-course'> Ajouter un administrateur </h2> 
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

export default EntrepriseAdd;
