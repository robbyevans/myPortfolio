// src/hooks/useHandleProjects.ts

import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import {
  fetchProjects,
  addProject,
  updateProject,
  deleteProject,
} from "../store/projectSlice";
import { useCallback } from "react";

const useHandleProjects = () => {
  const dispatch = useDispatch<AppDispatch>();
  const projectsList = useSelector(
    (state: RootState) => state.projects.projectsList
  );
  const loading = useSelector((state: RootState) => state.projects.loading);
  const error = useSelector((state: RootState) => state.projects.error);

  const handleFetchProjects = useCallback(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const handleAddProject = useCallback(
    (formData: FormData) => {
      dispatch(addProject(formData)); // No need to pass token
    },
    [dispatch]
  );

  const handleUpdateProject = useCallback(
    (payload: { id: number; formData: FormData }) => {
      dispatch(updateProject(payload)); // No need to pass token
    },
    [dispatch]
  );

  const handleDeleteProject = useCallback(
    (id: number) => {
      dispatch(deleteProject(id)); // No need to pass token
    },
    [dispatch]
  );

  return {
    projectsList,
    loading,
    error,
    handleFetchProjects,
    handleAddProject,
    handleUpdateProject,
    handleDeleteProject,
  };
};

export default useHandleProjects;
