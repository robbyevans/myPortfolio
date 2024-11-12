import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import {
  fetchProjects,
  addProject,
  updateProject,
  deleteProject,
  resetToastMessage,
} from "../store/projectSlice";
import { useCallback } from "react";

const useHandleProjects = () => {
  const dispatch = useDispatch<AppDispatch>();

  const projectsList = useSelector(
    (state: RootState) => state.projects.projectsList
  );
  const loading = useSelector((state: RootState) => state.projects.loading);
  const error = useSelector((state: RootState) => state.projects.error);
  const toastMessage = useSelector(
    (state: RootState) => state.projects.toastMessage
  );

  const handleFetchProjects = useCallback(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const handleAddProject = useCallback(
    (formData: FormData) => {
      dispatch(addProject(formData));
    },
    [dispatch]
  );

  const handleUpdateProject = useCallback(
    (payload: { id: number; formData: FormData }) => {
      dispatch(updateProject(payload));
    },
    [dispatch]
  );

  const handleDeleteProject = useCallback(
    (id: number) => {
      dispatch(deleteProject(id));
    },
    [dispatch]
  );
  const handleResetToasteMessage = () => {
    dispatch(resetToastMessage());
  };

  return {
    projectsList,
    loading,
    error,
    toastMessage,
    handleFetchProjects,
    handleAddProject,
    handleUpdateProject,
    handleDeleteProject,
    handleResetToasteMessage,
  };
};

export default useHandleProjects;
