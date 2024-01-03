import React, { FC, useEffect, useState } from 'react';
import './InstrumentsList.scss';
import ButtonGroupList from '../../../molecules/ButtonGroupList/ButtonGroupList';
import { useGoNavigate } from '../../../../hooks/Navigation';
import Pagination from '../../../molecules/Pagination/Pagination';
import { instrumentService } from '../../../../services/courses/instrumentService';

interface InstrumentsListProps {}

const InstrumentsList: FC<InstrumentsListProps> = () => {

  const [datas,setDatas] = useState< any >(null);
  const itemsPerPage = 15;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = datas !== null ? datas.slice(startIndex, endIndex ) : [];
  const totalPages =  datas !== null ? Math.ceil(datas.length / itemsPerPage) : 0;
  const [instrumentToDelete, setInstrumentToDelete] = useState<number[] >([]);
  const canShowPagination = datas !== null && datas.length > itemsPerPage ? true : false ; 

  const { navigateTo } = useGoNavigate();

  const handleAdd = () => {
    navigateTo(`/instruments/add`);
  };

  const handleDeleteMultiple = async () => {
    await instrumentService.instrumentsDeleteMany({ instrumentsIDs: instrumentToDelete });
    window.location.reload();
  };

  const handlePageChange = (newPage : number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);       
    }
  };

  const handleChange = (courseToDelete: number) => {
    setInstrumentToDelete(prevArray => {
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
        let datas = await instrumentService.instrumentAll();
        setDatas(datas);
      };
      loadDatas();
    }    
  },[]);


  return (

  <>
    <div className="InstrumentsList" data-testid="InstrumentsList">
    <ButtonGroupList handleAdd={handleAdd} handleDelete={handleDeleteMultiple} />
    <div className='container-list-courses card'>
      <table className='courses'>
        <thead>
          <tr>
            <th> </th>
            {/* <th>Icons</th> */}
            <th>Id</th>
            <th>Instruments</th>
            <th>Compositeurs <br/>associés </th>
            <th>Cours associés </th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((value : any, index : any) => (
            <tr key={index} >
              <td className='txt'>
                <input type='checkbox' checked={instrumentToDelete.includes(value.id)} onChange={()=> handleChange(value.id)}></input>
              </td>
              {/* <td className='txt item-id' tabIndex={0} onClick={() => navigateTo(`/instruments/${value.id}`)} >  Zone ICONE   </td> */}
              <td className='txt item-id'>  { value.id > 9 ? value.id : `0${value.id}` } </td>
              <td className='txt'> { value.name} </td>
              <td className='txt'> 
                {   value.composers && value.composers.length ? (
                    value?.composers?.length > 9 ? value?.composers?.length : `0${value?.composers?.length}`
                    ) : '0'
                }      
              </td>
              <td className='txt'> 
                {   value.courses && value.courses.length ? (
                    value?.courses?.length > 9 ? value?.courses?.length : `0${value?.courses?.length}`
                    ) : '0'
                }      
              </td>


              {/* <td className='txt'> { value?.courses?.length > 9  ? value?.courses?.length : `0${value?.course?.length}`} </td> */}
            </tr>
          ))}
        </tbody>
      </table>
      {canShowPagination ? 
      <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />  :

      <div className="pagination empty"></div>

      }
    </div>

  </div>
  </>
)};

export default InstrumentsList;
