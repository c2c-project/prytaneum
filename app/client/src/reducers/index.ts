import { combineReducers } from '@reduxjs/toolkit';
import chatReducer from './chat';
import feedReducer from './question-feed';
import queueReducer from './quesiton-queue';
import playlistReducer from './playlist';

export default combineReducers({
    questions: feedReducer,
    chat: chatReducer,
    queue: queueReducer,
    playlist: playlistReducer,
});

export * from './chat';
export * from './quesiton-queue';
export * from './question-feed';
export * from './playlist';
