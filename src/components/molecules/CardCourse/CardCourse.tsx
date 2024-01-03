import React from "react";
import "./CardCourse.scss";
import RatingStars from "../../atoms/RatingStars/RatingStars";
import { useGoNavigate } from "../../../hooks/Navigation";


interface CardCourseProps {
  id: number | string
  imgSrc: string;
  imgAlt: string;
  professorName: string;
  title: string;
  rating: number;
  shortDescription: string;
  longDescription: string;
}

const CardCourse : React.FC<CardCourseProps> = ({ id, imgSrc, imgAlt, professorName, title, rating, shortDescription,longDescription }) => {

  const { navigateTo } = useGoNavigate();

  const handleClick = () => {
    navigateTo(`/courses/${id}`);
  }

  return (
    <div className="card-item card"  tabIndex={0} onClick={handleClick} >
      <div className="card-img">
        {imgSrc && imgAlt && (
          <img src={imgSrc} alt={imgAlt} className="card-img" />
        )}
      </div>
      <div className="card-body">
        <div className="card-title">
          <span >{title}</span>
        </div>
        <div className="card-description">
          <p>{shortDescription}</p>
        </div>
        <div className="cours-infos-little">
          <small>de {professorName}</small>
          <span className="stars-area">
            <RatingStars ratingScore={rating}  />
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardCourse;
