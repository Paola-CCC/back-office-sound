import React, { FC } from 'react';
import './CourseEdit.scss';
import CourseForm from '../../../templates/CoursesForm/CourseForm';

interface CourseEditProps {}

const CourseEdit: FC<CourseEditProps> = () => (
  <>
    < CourseForm typeForm='edit' />
  </>
);

export default CourseEdit;
