import RatingStars from '../../../atoms/RatingStars/RatingStars';
import { useGoNavigate } from '../../../../hooks/Navigation';
import { useEffect, useState } from 'react';
import { courseService } from '../../../../services/courses/courseService';
import "./CoursesList.scss";
import ButtonGroupList from '../../../molecules/ButtonGroupList/ButtonGroupList';
import Pagination from '../../../molecules/Pagination/Pagination';
import { ICourses } from '../../../../models/Interfaces/courses';


const CoursesList = () => {

  const [datas,setDatas] = useState<ICourses[] |null >(null);
  const itemsPerPage = 7;
  const { navigateTo } = useGoNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = datas !== null ? datas.slice(startIndex, endIndex ) : [];
  const totalPages =  datas !== null ? Math.ceil(datas.length / itemsPerPage) : 0;


  const [courseToDelete, setCourseToDelete] = useState<number[] >([]);

  const handleAdd = () => {
    navigateTo(`/courses/add`);
  };

  const handleDeleteMultiple = async () => {
    await courseService.courseDeleteMany({ courseIds: courseToDelete });
    window.location.reload();
  };

  const handlePageChange = (newPage : number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);       
    }
  };

  const handleChange = (courseToDelete: number) => {
    setCourseToDelete(prevArray => {
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
        let datas = await courseService.courseAll();
        setDatas(datas);
      };
      loadDatas();
    }    
  },[]);

 return (
  <>
    <ButtonGroupList handleAdd={handleAdd} handleDelete={handleDeleteMultiple} />
    <div className='container-list-courses card'>
      <table className='courses'>
        <thead>
          <tr>
            <th> </th>
            <th>Photo</th>
            <th>Id</th>
            <th className='name-course'>Nom du cours</th>
            <th className='name-course'>Professeur</th>
            <th>Instruments</th>
            <th>Note</th>
            <th>Date de création</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((value : any, index : any) => (
            <tr key={index} >
              <td className='txt'>
                <input type='checkbox' checked={courseToDelete.includes(value.id)} onChange={()=> handleChange(value.id)}></input>
              </td>
              <td className='zone-img' tabIndex={0} onClick={() => navigateTo(`/courses/${value.id}`)} >
                {value.photo && (
                  <div className='img-courses'>
                      <img src={value.photo} alt={'86'} className="card-img" />
                  </div>
                )}
              </td>
              <td className='txt item-id' tabIndex={0} onClick={() => navigateTo(`/courses/${value.id}`)} >  {     value.id > 9 ? value.id  : `0${value.id}` }    </td>
              <td className='txt name-course' tabIndex={0} onClick={() => navigateTo(`/courses/${value.id}`)} >
                <div>
                { value?.title && value?.btitle!== '' ? value?.title : 'absence de données' } 
                </div>
              </td>
              <td className='txt name-course' tabIndex={0} onClick={() => navigateTo(`/courses/${value.id}`)} >{`${value.professor.firstName} ${value.professor.lastName}`}</td>
              <td className='txt' tabIndex={0} onClick={() => navigateTo(`/courses/${value.id}`)} >{`${value.instrument.name}`}</td>
              <td className='txt' tabIndex={0} onClick={() => navigateTo(`/courses/${value.id}`)} >
                <span className="stars-area">
                  <RatingStars ratingScore={value.ratingScore} />
                </span>          
              </td>
              <td className='txt' tabIndex={0} onClick={() => navigateTo(`/courses/${value.id}`)} >{value.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />

  </>


)};

export default CoursesList;