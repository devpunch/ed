import { configureStore } from '@reduxjs/toolkit';
import counterSlicer from "./counterSlicer";
import userSlicer from "./userSlicer";
import menuSlicer from "./menuSlicer";
import testSlicer from "./testSlicer";

export const store = configureStore({
  reducer: {
    counter: counterSlicer,
    user: userSlicer,
    menu: menuSlicer,
    test: testSlicer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch