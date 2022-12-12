import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import {fetchRawVideo, fetchVideo} from "./videoAPI";
import {VideoType} from "../../commons/types/VideoType";

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const asyncPostVideo = createAsyncThunk(
    'video/postVideo',
    async (videoId: string) => {
        const response = await fetchVideo(videoId);
        // The value we return becomes the `fulfilled` action payload
        return response.data;
    }
);

export const asyncGetVideo = createAsyncThunk(
    'video/fetchVideo',
    async (videoId: string) => {
        const response = await fetchVideo(videoId);
        return response.data;
    }
);

export const asyncGetRawVideo = createAsyncThunk(
    'video/fetchRawVideo',
    async (videoId: string) => {
        const response = await fetchRawVideo(videoId);
        return response.data;
    }
);
