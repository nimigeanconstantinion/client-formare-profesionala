import {createSelector} from "@reduxjs/toolkit";
import {CursState} from "./curs.reducer";

interface RootState {
    cursState: CursState
}

const cursCrtState = (state: RootState) => state.cursState;

export const  selLoadCursCrt=createSelector(
   cursCrtState,
    (cursState):typeof cursState.cursCrt => cursState.cursCrt
);


