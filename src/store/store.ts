import {configureStore,} from "@reduxjs/toolkit";
import {thunk} from "redux-thunk";
import persoanaSlice from "./persoana/persoana.reducer"
import persoanaReducer from "./persoana/persoana.reducer";
import cursReducer from "./curs/curs.reducer";

const store = configureStore({
    reducer: {
        persoanaState: persoanaReducer,
        cursState: cursReducer
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch

export default store;