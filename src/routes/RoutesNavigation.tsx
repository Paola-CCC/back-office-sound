import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  CategoriesAdd,
  CategoriesList,
  ComposersAdd,
  ComposersEdit,
  ComposersItem,
  ComposersList,
  CourseAdd,
  CourseEdit,
  CourseItem,
  CoursesList,
  EntrepriseAdd,
  EntrepriseItem,
  EntrepriseList,
  ForumItem,
  ForumList,
  InstrumentAdd,
  InstrumentsList,
  ProfessorsAdd,
  ProfessorsEdit,
  ProfessorsItem,
  ProfessorsList,
  StudentsItem,
  StudentsList,
} from "../components/pages";

const RoutesNavigation = () => {
  return (
    <Routes>
      <Route index path="courses" element={<CoursesList />} />
      <Route path="courses/add" element={<CourseAdd />} />
      <Route path="courses/:Id" element={<CourseItem />} />
      <Route path="courses/:Id/edit" element={<CourseEdit />} />

      <Route path="composers" element={<ComposersList />} />
      <Route path="composers/add" element={<ComposersAdd />} />
      <Route path="composers/:Id" element={<ComposersItem />} />
      <Route path="composers/:Id/edit" element={<ComposersEdit />} />

      <Route path="professors" element={<ProfessorsList />} />
      <Route path="professors/add" element={<ProfessorsAdd />} />
      {/* <Route path="professors/:Id" element={<ProfessorsItem />} /> */}
      <Route path="professors/:Id/edit" element={<ProfessorsEdit />} />

      <Route path="entreprise" element={<EntrepriseList />} />
      <Route path="entreprise/add" element={<EntrepriseAdd />} />
      <Route path="entreprise/:Id" element={<EntrepriseItem />} />
      <Route path="entreprise/:Id/edit" element={<ProfessorsEdit />} />

      <Route path="students" element={<StudentsList />} />
      {/* <Route path="students/:Id" element={<StudentsItem />} /> */}

      <Route path="forum" element={<ForumList />} />
      <Route path="forum/:Id" element={<ForumItem />} />

      <Route path="instruments" element={<InstrumentsList />} />
      <Route path="instruments/add" element={<InstrumentAdd />} />

      <Route path="categories" element={<CategoriesList />} />
      <Route path="categories/add" element={<CategoriesAdd />} />
    </Routes>
  );
};

export default RoutesNavigation;
