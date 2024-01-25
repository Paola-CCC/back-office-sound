import React, { FC, useEffect, useState } from 'react';
import './StudentsList.scss';
import ButtonGroupList from '../../../molecules/ButtonGroupList/ButtonGroupList';
import { useGoNavigate } from '../../../../hooks/Navigation';
import Pagination from '../../../molecules/Pagination/Pagination';
import { usersService } from '../../../../services/users/UsersService';
import { IUsers } from '../../../../models/Interfaces/users';

interface StudentsListProps {}

const StudentsList: FC<StudentsListProps> = () => {

  const [datas,setDatas] = useState< IUsers[] | null>([]);
  const itemsPerPage = 7;
  const { navigateTo } = useGoNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = datas !== null ? datas.slice(startIndex, endIndex ) : [];
  const totalPages =  datas !== null ? Math.ceil(datas.length / itemsPerPage) : 0;
  const [usersToDelete, setUsersToDelete] = useState<number[] >([]);
  const URL = 'https://api-sound-project.com/';


  const handleDeleteMultiple = async () => {
    await usersService.usersDeleteMany({ usersIds: usersToDelete });
    window.location.reload();
  };

  const handlePageChange = (newPage : number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);       
    }
  };

  const handleChange = (courseToDelete: number) => {
    setUsersToDelete(prevArray => {
      const index = prevArray.indexOf(courseToDelete);
      if (index !== -1) {
        const newArray = [...prevArray];
        newArray.splice(index, 1);
        return newArray;
      } else {
        return [...prevArray, courseToDelete!];
      }
    });
  };

  useEffect(() => {
    
    if(localStorage.getItem("jwt") && localStorage.getItem("jwt") !== '') {
      const loadDatas = async () => {
        let datas = await usersService.showStudentsList();
        if (datas !== undefined){
          setDatas(datas);

        }
      };
      loadDatas();
    }    
  },[]);

  return (
  <>
    <ButtonGroupList  handleDelete={handleDeleteMultiple} />

    <div className='container-list-courses card'>
      <table className='courses'>
        <thead>
          <tr>
            <th> </th>
            <th>Photo</th>
            <th>Id</th>
            <th className='name-course'>Nom Prénom</th>
            <th className='name-course'>Email</th>
            <th>Date de création</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((value : any, index : any) => (
            <tr key={index} >
              <td className='txt'>
                <input type='checkbox' checked={usersToDelete.includes(value.id)} onChange={()=> handleChange(value.id)}></input>
              </td>
              <td className='zone-img' tabIndex={0}  >
                  <div className='img-courses'>
                      <img src= { !value?.image?.imageName  ? URL + '/images/upload/profile.png' : URL + '/images/upload/' + value?.image?.imageName } alt={'profile user'} width={100} height={100}/>
                  </div>
              </td>
              <td className='txt item-id' tabIndex={0}  > { value?.id > 9 ? value.id : `0${value?.id}`} </td>
              <td className='txt name-course' tabIndex={0}  >{`${value?.firstName} ${value?.lastName}`}</td>
              <td className='txt' tabIndex={0}  >{value?.email}</td>
              <td className='txt' tabIndex={0}  >{value.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
    </div>
  </>
)};

export default StudentsList;
