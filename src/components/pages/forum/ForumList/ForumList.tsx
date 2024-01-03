import React, { FC, useEffect, useState } from 'react';
import './ForumList.scss';
import ButtonGroupList from '../../../molecules/ButtonGroupList/ButtonGroupList';
import Pagination from '../../../molecules/Pagination/Pagination';
import { forumService } from '../../../../services/forum/forumService';

interface ForumListProps {}

const ForumList: FC<ForumListProps> = () => {

  const [datas,setDatas] = useState< any>([]);
  const itemsPerPage = 7;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = datas !== null ? datas.slice(startIndex, endIndex ) : [];
  const totalPages =  datas !== null ? Math.ceil(datas.length / itemsPerPage) : 0;
  const [forumToDelete, setForumToDelete] = useState<number[] >([]);

  useEffect(() => {
    if(localStorage.getItem("jwt") && localStorage.getItem("jwt") !== '') {
      const loadDatas = async () => {
        let datas = await forumService.showAll();
        if (datas !== undefined){
          setDatas(datas);
        }
      };
      loadDatas();
    }    
  },[]);

  const handleDeleteMultiple = async () => {
    await forumService.forumDeleteMany({ forumsIds: forumToDelete });
    window.location.reload();
  };


  const handlePageChange = (newPage : number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);       
    }
  };

  const handleChange = (courseToDelete: number) => {
    setForumToDelete(prevArray => {
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

  
  return (
  <>
    <ButtonGroupList  handleDelete={handleDeleteMultiple} />

    <div className='container-list-courses card'>
      <table className='courses'>
        <thead>
          <tr>
            <th> </th>
            <th>Id</th>
            <th className='name-course'>Auteur</th>
            <th className='name-course'>Titre</th>
            <th className='name-course'>Réponses</th>
            <th>Date de création</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((value : any, index : any) => (
            <tr key={index} >
              <td className='txt'>
                <input type='checkbox' checked={forumToDelete.includes(value.id)} onChange={()=> handleChange(value.id)}></input>
              </td>
              <td className='txt item-id' > { value?.id > 9 ? value.id : `0${value?.id}`} </td>
              <td className='txt name-course' >{`${value?.author?.firstName} ${value?.author?.lastName}`}</td>
              <td className='txt biography' >
                <div>
                  {value?.subject}
                </div>
              </td>
              <td className='txt' >{ value?.answersCount > 9 ? value.answersCount : `0${value?.answersCount}`} </td>
              <td className='txt' >{value.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
    </div>
  </>
)};

export default ForumList;
