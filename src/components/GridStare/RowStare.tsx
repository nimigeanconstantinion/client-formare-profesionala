import {MotivNeabsolvire, NomenclatorStari, PerioadaSomaj, SLD, StareCursant, TipCursant} from "../../models/Cursant";
import {useEffect, useRef, useState} from "react";
import DatePicker from "react-date-picker";
import * as React from "react";
import {Value} from "react-date-picker/dist/cjs/shared/types";
import {DataSimple} from "../SearchableDropDown/index_simple";
import ComboStare from "../SearchableDropDown/index_simple"

interface RowGridStare{
    id: number|undefined,
    data: StareCursant|undefined
}

// export interface StareCursant {
//     id: number; // Assuming id is of type number
//     stare: NomenclatorStari; // Reference to NomenclatorStari interface
//     dataStare: Date;
//     tipCursant: TipCursant; // Reference to TipCursant enum
//     denumireAngajator: string;
//     codUnicInregistrare: string;
//     lunaAng: number;
//     anulAng: number;
//     motivNeabsolvire?: MotivNeabsolvire; // Optional reference to MotivNeabsolvire interface (due to possible ManyToOne relationship)
// }

const Index:React.FC<RowGridStare>=({data})=>{

    const refNrSom=useRef<HTMLInputElement>(null);
    const [dataStart, setDataStart] = useState<Value>();
    const [dataSfarsit, setDataSfarsit] = useState<Value>();
    const [defaSLD,setDefaSLD]=useState<DataSimple>();
    const [nomStare,setNomStare]=useState<NomenclatorStari[]>();
    // const dataStare:DataSimple[]=[
    //     {
    //         code: "1",
    //         name: "",
    //         load: S
    //     },
    //     {
    //         code: "2",
    //         name: "false",
    //         load: null
    //     }
    // ]
    useEffect(()=>{
        console.log("IN ROW GRID CU");
        console.log(data);
        // if(data!=undefined){
        //     if(refNrSom.current!=null){
        //         refNrSom.current.value=data.nrSomaj;
        //     }
        //     setDataStart(data.dataStartSomaj);
        //     setDataSfarsit(data.dataSfSomaj);
        //     if(data.somerLungaDurata){
        //         if(dataSld[0]!=undefined){
        //             let dfs:DataSimple=dataSld[0];
        //             setDefaSLD(dfs);
        //
        //         }
        //
        //     }else{
        //         setDefaSLD(dataSld[1]);
        //     }
        // }else{
        //     if(refNrSom.current!=null) {
        //         refNrSom.current.value=" SVljklkhlk     ";
        //
        //     }
        //
        // }
    },[data])


    let handleDataStartChange=(e:Value)=>{
        console.log(e);
    }

    let setFocusDate=()=>{

    }

    let sldChange=()=>{

    }

    return(
        <div  className={"divgrdps"}>
            {/*  <input ref={refNrSom} type={"text"} className={"fldinput divnrsom"} defaultValue={"PLLJKLSKDLHLHL"}/>*/}

            {/* <DatePicker id={"grd_dataStart"} className={"fldinput dataStart"} value={dataStart} onChange={(e)=>handleDataStartChange(e)} format={"dd/MM/yyyy"} onFocus={(e)=>setFocusDate()}  />*/}
            {/* <DatePicker id={"grd_dataSfarsit"} className={"fldinput dataSfarsit"} value={dataSfarsit} onChange={(e)=>handleDataStartChange(e)} format={"dd/MM/yyyy"} onFocus={(e)=>setFocusDate()}  />*/}


            <div className={"fldinput div_sld"}>
                {/*<ComboStare data={dataSld} defaultObj={defaSLD} returnFunction={sldChange} isrw={false}/>*/}

            </div>

        </div>

    )

}


export default Index;