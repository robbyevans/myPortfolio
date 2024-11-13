import React from "react";
import * as S from "./styles";
import ToastMessage from "../../components/ToastMessage/ToastMessage";
import { Project, ImageData } from "../../store/projectSlice";
import { IToastMessage } from "../../store/projectSlice";

interface ProjectWithMixedImages extends Omit<Project, "images"> {
  images: (ImageData | File)[];
}

interface AdminPageProps {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  handleLogin: () => void;
  token: string | null;
  projectsList: Project[];
  toastMessage: IToastMessage;
  handleResetToastMessage: () => void;
  newProject: ProjectWithMixedImages;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddProjectClick: () => void;
  handleUpdateProjectClick: () => void;
  currentProject: Project | null;
  handleCancelEdit: () => void;
  handleEditProject: (project: Project) => void;
  handleDeleteProjectClick: (id: number) => void;
  handleRemoveImage: (index: number) => void;
  handleBackToHome: () => void;
}

const AdminPage: React.FC<AdminPageProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  handleLogin,
  token,
  projectsList,
  toastMessage,
  handleResetToastMessage,
  newProject,
  handleInputChange,
  handleFileChange,
  handleAddProjectClick,
  handleUpdateProjectClick,
  currentProject,
  handleCancelEdit,
  handleEditProject,
  handleDeleteProjectClick,
  handleRemoveImage,
  handleBackToHome,
}) => {
  if (!token) {
    return (
      <S.LoginContainer>
        <S.BackButton onClick={handleBackToHome}>Back to Home</S.BackButton>
        <h2>Admin Login</h2>
        <S.Input
          type="text"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <S.Input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <S.Button onClick={handleLogin}>Login</S.Button>
      </S.LoginContainer>
    );
  }

  return (
    <S.AdminContainer>
      <ToastMessage
        toastMessage={toastMessage}
        isAutoclose={true}
        handleClose={handleResetToastMessage}
      />
      <S.BackButton onClick={handleBackToHome}>Back to Home</S.BackButton>
      <h2>Admin Portal</h2>
      <S.Form>
        <S.Input
          type="text"
          name="name"
          placeholder="Project Name"
          value={newProject.name || ""}
          onChange={handleInputChange}
        />
        <S.TextArea
          name="description"
          placeholder="Description"
          value={newProject.description || ""}
          onChange={handleInputChange}
        />
        <S.Input
          type="text"
          name="live_link"
          placeholder="Live Link"
          value={newProject.live_link || ""}
          onChange={handleInputChange}
        />
        <S.FileInputWrapper>
          <S.FileInput
            type="file"
            name="images"
            multiple
            accept="image/*"
            onChange={handleFileChange}
          />
        </S.FileInputWrapper>
        <S.ImagePreviewContainer>
          {newProject.images.map((image, index) => (
            <S.ImagePreview key={index}>
              {image instanceof File ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Project Image ${index}`}
                />
              ) : (
                <img src={image.url} alt={`Project Image ${index}`} />
              )}
              <S.RemoveImageButton onClick={() => handleRemoveImage(index)}>
                &times;
              </S.RemoveImageButton>
            </S.ImagePreview>
          ))}
        </S.ImagePreviewContainer>
        {currentProject ? (
          <>
            <S.Button onClick={handleUpdateProjectClick}>
              Update Project
            </S.Button>
            <S.CancelButton onClick={handleCancelEdit}>Cancel</S.CancelButton>
          </>
        ) : (
          <S.Button onClick={handleAddProjectClick}>Add Project</S.Button>
        )}
      </S.Form>
      <S.ProjectList>
        {projectsList.map((project) => (
          <S.ProjectItem key={project.id}>
            <span>{project.name}</span>
            <S.ButtonsWrapper>
              <S.EditButton onClick={() => handleEditProject(project)}>
                Edit
              </S.EditButton>
              <S.DeleteButton
                onClick={() => handleDeleteProjectClick(project.id)}
              >
                Delete
              </S.DeleteButton>
            </S.ButtonsWrapper>
          </S.ProjectItem>
        ))}
      </S.ProjectList>
    </S.AdminContainer>
  );
};

export default AdminPage;
