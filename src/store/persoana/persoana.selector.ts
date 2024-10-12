import {createSelector} from "@reduxjs/toolkit";
import {PersoanaState} from "./persoana.reducer"
interface RootState {
    persoanaState:PersoanaState
}

const persCrtState = (state: RootState) => state.persoanaState;

export const  selLoadPersoanaCrt=createSelector(
    persCrtState,
    (persoanaState):typeof persoanaState.persoanaCrt =>persoanaState.persoanaCrt
);

