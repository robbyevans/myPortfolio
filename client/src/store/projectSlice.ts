import axios from "axios";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

// Project and State Interfaces
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

interface ProjectsState {
  projectsList: Project[];
  loading: boolean;
  error: string | null;
}

const initialState: ProjectsState = {
  projectsList: [],
  loading: false,
  error: null,
};

// Helper function to retrieve token from localStorage
const getAuthToken = () => localStorage.getItem("authToken");

// Async Thunks
export const fetchProjects = createAsyncThunk<Project[]>(
  "projects/fetchProjects",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<Project[]>(
        "http://localhost:3000/projects"
      );
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
        "http://localhost:3000/projects",
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
      `http://localhost:3000/projects/${id}`,
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
      await axios.delete(`http://localhost:3000/projects/${id}`, {
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
  name: "projects",
  initialState,
  reducers: {},
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
      }
    );
    builder.addCase(fetchProjects.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
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
      }
    );
    builder.addCase(addProject.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
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
      }
    );
    builder.addCase(updateProject.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
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
      }
    );
    builder.addCase(deleteProject.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default projectsSlice.reducer;
