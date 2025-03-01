import React, { FC, useEffect, useRef, useState } from 'react';
import './ComposersAdd.scss';
import Button from '../../../atoms/Button/Button';
import InputText from '../../../atoms/InputText/InputText';
import { useGoNavigate } from '../../../../hooks/Navigation';
import InputSelect from '../../../atoms/InputSelect/InputSelect';
import { Instrument } from '../../../../models/types/courses.types';
import { courseService } from '../../../../services/courses/courseService';
import { composersService } from '../../../../services/courses/composersService';

interface ComposersAddProps { }

const ComposersAdd: FC<ComposersAddProps> = () => {

  const [composersCreationIsSuccesful, setComposersCreationIsSuccesful] = useState<boolean | null>(null);
  const { navigateTo } = useGoNavigate();
  const [optionsInstruments, setOptionsInstruments] = useState([{ value: "", label: "Choisir un instrument" }]);

  const initialStateNewComposers = {
    lastname: '',
    firstname: '',
    biography: '',
    photo:'',
    instrumentId: ''
  };

  const dataFetchedRef = useRef(false);
  const [newComposers, setNewComposers] = useState(initialStateNewComposers);

  const clearNewComposers = () => {
    setComposersCreationIsSuccesful(null);
    setNewComposers(initialStateNewComposers);
  };

  const handleAdd = () => {
    clearNewComposers();
    navigateTo(`/composers`);
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setNewComposers({ ...newComposers, [name]: value });
  };


  const handleSubmit = async () => {

    try {
      const data = {
        biography: newComposers.biography,
        fullName: newComposers.firstname + ' ' + newComposers.lastname.toUpperCase(),
        instrumentId: newComposers.instrumentId,
        photo: newComposers.photo
      };

      let response = await composersService.composersAdd(data);
      if ( response && response.status >= 200 ){
        setComposersCreationIsSuccesful(true);
      }

    } catch (error) {
      console.error('Error creating course', error);
    }
  }

  useEffect(() => {

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
      getInstrumentsForOption(datas.instruments);
    }

    if (!dataFetchedRef.current) {
      getCourseDatasForCreation();
      dataFetchedRef.current = true;
    }

  },[optionsInstruments])


  if (composersCreationIsSuccesful) {
    return (
      <div className='container-sucess-add'>
        <div className='elements-zone'>
          <div className='txt-area'>
            <h4>Vous venez de créer un nouveau compositeur avec succès </h4>
          </div>
          <div className='btn-zone'>
            <Button kind='secondary' onClick={handleAdd}>
              Retour
            </Button>
            <Button kind='primary' onClick={clearNewComposers}>
              Ajouter un nouveau compositeur
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
          <h1 className='title-page-add-course'> Ajouter un nouveau compositeur </h1>
        </div>
        <div className="mb-3">
          <InputText
            label={"Prénom"}
            name='firstname'
            onChange={handleChange}
            value={newComposers?.firstname || ''}
            isRequired={true}
            errorText={""}
          />
        </div>
        <div className="mb-3">
          <InputText
            label={"Nom"}
            name='lastname'
            onChange={handleChange}
            value={newComposers?.lastname || ''}
            isRequired={true}
            errorText={""}
          />
        </div>
        <div className="mb-3">
          <InputText
            label={"Lien de la photo"}
            name='photo'
            onChange={handleChange}
            value={newComposers?.photo || ''}
            isRequired={true}
            errorText={""}
          />
        </div>
        <div className="mb-3">
          <InputText
            label={"Biographie"}
            type='textarea'
            name='biography'
            onChange={handleChange}
            value={newComposers?.biography || ''}
            isRequired={true}
            errorText={""}
          />
        </div>
        <div className="grid-item">
          <InputSelect
            name="instrumentId"
            label="Instruments"
            options={optionsInstruments}
            value={newComposers?.instrumentId || ''}
            onChange={handleChange}
          />
        </div>

        <div className='cont-add-course-check'>
          <Button kind='secondary' onClick={handleAdd}>
            Retour
          </Button>
          <Button kind='primary' onClick={handleSubmit}>
            <span> Ajouter </span>
          </Button>
        </div>

      </form>
    </div>
  )
};

export default ComposersAdd;
