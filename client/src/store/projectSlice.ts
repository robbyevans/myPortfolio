import axios from "axios";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

export interface ImageData {
  url: string;
  id: number;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  images: ImageData[];
  live_link: string;
}

export interface IToastMessage {
  showToastMessage: boolean;
  variant: "success" | "error" | "info";
  message: string;
}

interface ProjectsState {
  projectsList: Project[];
  loading: boolean;
  error: string | null;
  toastMessage: IToastMessage;
}

const initialState: ProjectsState = {
  projectsList: [],
  loading: false,
  error: null,
  toastMessage: {
    showToastMessage: false,
    variant: "info",
    message: "",
  },
};

// Helper function to retrieve token from localStorage
const getAuthToken = () => localStorage.getItem("authToken");
const apiUrl = import.meta.env.VITE_API_URL;

// Async Thunks
export const fetchProjects = createAsyncThunk<Project[]>(
  "projects/fetchProjects",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<Project[]>(`${apiUrl}/projects`);
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        return rejectWithValue(
          err.response.data.error || "Failed to fetch projects."
        );
      }
      return rejectWithValue("An unknown error occurred.");
    }
  }
);

export const addProject = createAsyncThunk<Project, FormData>(
  "projects/addProject",
  async (formData, { rejectWithValue }) => {
    try {
      const token = getAuthToken(); // Get token from localStorage
      const response = await axios.post<Project>(
        `${apiUrl}/projects`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        return rejectWithValue(
          err.response.data.error || "Failed to add project."
        );
      }
      return rejectWithValue("An unknown error occurred.");
    }
  }
);

export const updateProject = createAsyncThunk<
  Project,
  { id: number; formData: FormData }
>("projects/updateProject", async ({ id, formData }, { rejectWithValue }) => {
  try {
    const token = getAuthToken(); // Get token from localStorage
    const response = await axios.patch<Project>(
      `${apiUrl}/projects/${id}`,

      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      return rejectWithValue(
        err.response.data.error || "Failed to update project."
      );
    }
    return rejectWithValue("An unknown error occurred.");
  }
});

export const deleteProject = createAsyncThunk<number, number>(
  "projects/deleteProject",
  async (id, { rejectWithValue }) => {
    try {
      const token = getAuthToken(); // Get token from localStorage
      await axios.delete(`${apiUrl}/projects/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return id;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        return rejectWithValue(
          err.response.data.error || "Failed to delete project."
        );
      }
      return rejectWithValue("An unknown error occurred.");
    }
  }
);

// Slice
const projectsSlice = createSlice({
  extraReducers: (builder) => {
    // Fetch Projects
    builder.addCase(fetchProjects.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchProjects.fulfilled,
      (state, action: PayloadAction<Project[]>) => {
        state.loading = false;
        state.projectsList = action.payload;
        state.toastMessage = {
          showToastMessage: true,
          variant: "info",
          message: "Projects fetched successfully",
        };
      }
    );
    builder.addCase(fetchProjects.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.toastMessage = {
        showToastMessage: true,
        variant: "error",
        message: "Failed to fetch projects",
      };
    });

    // Add Project
    builder.addCase(addProject.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      addProject.fulfilled,
      (state, action: PayloadAction<Project>) => {
        state.loading = false;
        state.projectsList.push(action.payload);
        state.toastMessage = {
          showToastMessage: true,
          variant: "success",
          message: "Project added successfully",
        };
      }
    );
    builder.addCase(addProject.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.toastMessage = {
        showToastMessage: true,
        variant: "error",
        message: "Failed to add project",
      };
    });

    // Update Project
    builder.addCase(updateProject.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      updateProject.fulfilled,
      (state, action: PayloadAction<Project>) => {
        state.loading = false;
        const index = state.projectsList.findIndex(
          (p) => p.id === action.payload.id
        );
        if (index !== -1) {
          state.projectsList[index] = action.payload;
        }
        state.toastMessage = {
          showToastMessage: true,
          variant: "success",
          message: "Project updated successfully",
        };
      }
    );
    builder.addCase(updateProject.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.toastMessage = {
        showToastMessage: true,
        variant: "error",
        message: "Failed to update project",
      };
    });

    // Delete Project
    builder.addCase(deleteProject.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      deleteProject.fulfilled,
      (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.projectsList = state.projectsList.filter(
          (project) => project.id !== action.payload
        );
        state.toastMessage = {
          showToastMessage: true,
          variant: "success",
          message: "Project deleted successfully",
        };
      }
    );
    builder.addCase(deleteProject.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.toastMessage = {
        showToastMessage: true,
        variant: "error",
        message: "Failed to delete project",
      };
    });
  },

  name: "projects",
  initialState,
  reducers: {
    setShowToastMessage: (state, action: PayloadAction<IToastMessage>) => {
      state.toastMessage = action.payload;
    },
    resetToastMessage: (state) => {
      state.toastMessage = {
        showToastMessage: false,
        variant: "info",
        message: "",
      };
    },
  },
});

export const { setShowToastMessage, resetToastMessage } = projectsSlice.actions;
export default projectsSlice.reducer;
