import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import Persoana from "../../models/Persoana";
import {PersoanaStatus} from "../../models/Statuses";

// import index from "../../components/OverlayMess";

export interface PersoanaState{
    persoanaCrt: Persoana|null,
    statusRetrieve: PersoanaStatus,
}

const PersoanaInitialState: PersoanaState = {
    persoanaCrt: null,
    statusRetrieve: PersoanaStatus.NONE

}

const persoanaSlice = createSlice({

    name: 'StorePersoana',
    initialState: PersoanaInitialState,
    reducers:{
        loadPersoanaCrt(state,action:PayloadAction<Persoana>){
            state.persoanaCrt=action.payload;
        },
        retrievePersoanaCrt(state,action:PayloadAction<void>){
            state.statusRetrieve=PersoanaStatus.LOADING;
        },
        retrievePersoanaCrtError(state,action:PayloadAction<void>){
                    state.statusRetrieve=PersoanaStatus.ERROR;
                }

    }


}
)

export const {loadPersoanaCrt,retrievePersoanaCrt,retrievePersoanaCrtError}=persoanaSlice.actions;

export default persoanaSlice.reducer;