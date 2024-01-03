import React, { FC, useEffect, useState } from 'react';
import './ComposersList.scss';
import ButtonGroupList from '../../../molecules/ButtonGroupList/ButtonGroupList';
import { useGoNavigate } from '../../../../hooks/Navigation';
import Pagination from '../../../molecules/Pagination/Pagination';
import { composersService } from '../../../../services/courses/composersService';

interface ComposersListProps {}

const ComposersList: FC<ComposersListProps> = () => {

  const [datas,setDatas] = useState< any >(null);
  const itemsPerPage = 7;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = datas !== null ? datas.slice(startIndex, endIndex ) : [];
  const totalPages =  datas !== null ? Math.ceil(datas.length / itemsPerPage) : 0;
  const [composersToDelete, setComposersToDelete] = useState<number[] >([]);
  const canShowPagination = datas !== null && datas.length > itemsPerPage ? true : false ; 

  const { navigateTo } = useGoNavigate();

  const handleAdd = () => {
    navigateTo(`/composers/add`);
  };

  const handleDeleteMultiple = async () => {
    await composersService.composersDeleteMany({ composersIDs: composersToDelete });
    window.location.reload();
  };

  const handlePageChange = (newPage : number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);       
    }
  };

  const handleChange = (courseToDelete: number) => {
    setComposersToDelete(prevArray => {
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
        let datas = await composersService.composersAll();
        setDatas(datas);
      };
      loadDatas();
    }    
  },[]);


  return (
  <div className="categoriesList" data-testid="categoriesList">
    <ButtonGroupList handleAdd={handleAdd} handleDelete={handleDeleteMultiple} />
    <div className='container-list-courses card'>
      <table className='courses'>
        <thead>
          <tr>
            <th> </th>
            <th>Photos</th>
            <th>Id</th>
            <th className='txt fullname'>Nom Prénom </th>
            <th>Biographie </th>
            <th>Nombre de cours </th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((value : any, index : any) => (
            <tr key={index} >
              <td className='txt'>
                <input type='checkbox' checked={composersToDelete.includes(value.id)} onChange={()=> handleChange(value.id)}></input>
              </td>
              <td className='zone-img' tabIndex={0} onClick={() => navigateTo(`/composers/${value.id}`)} >
                <div className='img-courses'>
                   <img src={"https://static.nationalgeographic.fr/files/styles/image_3200/public/800px-Wolfgang-amadeus-mozart_1.webp?w=710&h=1043"} alt={'86'} className="card-img" />
                </div>
              </td>
              <td className='txt item-id' tabIndex={0} onClick={() => navigateTo(`/composers/${value.id}`)}>  { value.id > 9 ? value.id : `0${value.id}` } </td>
              <td className='txt fullname' tabIndex={0} onClick={() => navigateTo(`/composers/${value.id}`)}> { value.fullName} </td>
              <td className='txt biography' tabIndex={0} onClick={() => navigateTo(`/composers/${value.id}`)}> 
              <div>
              { value.biography} 
              </div>
              </td>
              <td className='txt' tabIndex={0} onClick={() => navigateTo(`/composers/${value.id}`)} > { value.courses.length > 9  ? value.courses.length : `0${value.courses.length}`} </td>
            </tr>
          ))}
        </tbody>
      </table>
      {canShowPagination ? 
        <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />  
        : (
            <div className="pagination empty"></div>
        )
      }
    </div>
  </div>
)};

export default ComposersList;
