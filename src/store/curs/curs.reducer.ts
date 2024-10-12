import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import Curs from "../../models/Objects";
import {CursStatus} from "../../models/Statuses";

// import index from "../../components/OverlayMess";

export interface CursState{
    cursCrt: Curs|null,
    statusRetrieve: CursStatus,
}

const CursInitialState: CursState = {
    cursCrt: null,
    statusRetrieve: CursStatus.NONE

}

const cursSlice = createSlice({

    name: 'StoreCurs',
    initialState: CursInitialState,
    reducers:{
        loadCursCrt(state,action:PayloadAction<Curs>){
            state.cursCrt=action.payload;
        },
        initCursState(state,action:PayloadAction<void>){
            state.cursCrt=null;
            state.statusRetrieve= CursStatus.NONE
        }


    }


}
)

export const {loadCursCrt,initCursState}=cursSlice.actions;

export default cursSlice.reducer;