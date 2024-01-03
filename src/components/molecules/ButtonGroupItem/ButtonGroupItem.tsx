import React, { FC } from 'react';
import './ButtonGroupItem.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from '../../atoms/Button/Button';

interface ButtonGroupItemProps {
  handleUpdate?: () => void;
  handleDelete?: () => void;
}

const ButtonGroupItem: FC<ButtonGroupItemProps> = ({handleUpdate, handleDelete }) => (
  <div className='container-btn'>
    <Button kind='primary' onClick={handleUpdate}>
      <FontAwesomeIcon icon={faPencil} style={{color: "#fffffc"}} />
      Modifier
    </Button>
    <Button kind='primary' onClick={handleDelete}>
      <FontAwesomeIcon icon={faTrash} style={{color: "#fffffc"}} />
      Supprimer
    </Button>
  </div>
);

export default ButtonGroupItem;
