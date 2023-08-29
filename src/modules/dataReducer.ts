import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ChatCompletion } from 'openai/resources/chat';
import caller from '../api/caller';
import { CodeStructureType, FormValues } from '../types';
import { ApiResponseStatus } from '../enums';
import { Composer } from '../models/Composer';

interface DataState {
  codeStructure: CodeStructureType | undefined;
  thoughtsWhenComposing: string;
  status: ApiResponseStatus;
  error: string;
}

const initialState: DataState = {
  codeStructure: undefined,
  thoughtsWhenComposing: '',
  status: ApiResponseStatus.Idle,
  error: ''
};

export const fetchData = createAsyncThunk<ChatCompletion, FormValues>(
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
      .addCase(fetchData.fulfilled, (state, action: PayloadAction<ChatCompletion>) => {
        const composer = new Composer(action.payload);
        state.codeStructure = composer.getCodeStructure();
        state.thoughtsWhenComposing = composer.getThoughtsWhenComposing();
        state.status = ApiResponseStatus.Succeeded;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = ApiResponseStatus.Failed;
        state.error = action.error?.message || 'An error occurred.';
      });
  }
});

export default dataSlice.reducer;
