import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import caseOutputSlice from "./caseoutputslice";
import caseInputSlice from "./caseinputslice";
import uiSlice from "./uislice";
// ...

export const store = configureStore({
  reducer: {
    case_outputs: caseOutputSlice,
    case_inputs: caseInputSlice,
    ui_settings: uiSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
