import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import caller from '../api/caller';
import { CodeStructureType, FormValues } from '../types';
import { ApiResponseStatus } from '../enums';

interface DataState {
  items: CodeStructureType;
  status: ApiResponseStatus;
  error: string;
}

const initialState: DataState = {
  items: [],
  status: ApiResponseStatus.Idle,
  error: ''
};

export const fetchData = createAsyncThunk<CodeStructureType, FormValues>(
  'data/fetchData',
  async (args, { rejectWithValue }) => {
    try {
      return await caller(args);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = ApiResponseStatus.Loading;
      })
      .addCase(fetchData.fulfilled, (state, action: PayloadAction<CodeStructureType>) => {
        state.items = action.payload;
        state.status = ApiResponseStatus.Succeeded;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = ApiResponseStatus.Failed;
        state.error = action.error?.message || 'An error occurred.';
      });
  }
});

export default dataSlice.reducer;
