import React, { FC } from 'react';
import './ButtonGroupList.scss';
import Button from '../../atoms/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

interface ButtonGroupListProps {
  handleAdd?: () => void;
  handleDelete?: () => void;
}

const ButtonGroupList: FC<ButtonGroupListProps> = ({ handleAdd, handleDelete}) => {

  return (
    <div className='container-btn'>

        { handleAdd && (
          <Button kind='primary' onClick={handleAdd}>
            <FontAwesomeIcon icon={faPlus} style={{color: "#fffffc"}} />
            Ajouter
          </Button>
        )}
        <Button kind='primary' onClick={handleDelete}>
          <FontAwesomeIcon icon={faTrash} style={{color: "#fffffc"}} />
          Supprimer
        </Button>
    </div>
  );
};

export default ButtonGroupList;
