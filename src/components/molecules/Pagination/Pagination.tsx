import React, { FC } from 'react';
import './Pagination.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight ,faChevronLeft } from "@fortawesome/free-solid-svg-icons";

interface PaginationProps {
  totalPages?: any,
  currentPage?:any,
  onPageChange?: any
}

const  Pagination: FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {

  return (
    <div className="pagination">
      <button className='btn-pagination'  onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>

      { currentPage && totalPages && (
        <div> 
           page {currentPage > 9 ? currentPage  : `0${currentPage}`} sur {totalPages > 9 ? totalPages  : `0${totalPages}`}
        </div>
       )
      }
      
      <button className='btn-pagination'  onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
};

export default Pagination;
