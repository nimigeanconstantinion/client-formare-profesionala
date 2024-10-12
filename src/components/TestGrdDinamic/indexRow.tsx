import {LoadType} from "../SearchableDropDown";
import React, {useEffect, useState} from "react";
// import Adresa from "../Adresa";
import {Localitate,Adresa} from "../../models/Persoana";


// interface RowProps<T>{
//     // id: number|null,
//     data: Object,
//     dataType: keyof typeof typeMap;
// }

const typeMap = {
    Adresa: {} as Adresa,
    Localitate: {} as Localitate
};

type TypeMap = typeof typeMap;
type TypeOf<T extends keyof TypeMap> = TypeMap[T];

interface RowProps{
    data: Object,
    dataType:string;
}
const IndexRow:React.FC<RowProps>=({data,dataType}) => {

// const IndexRow=<T extends {}>({data}) {
    const [nFields,setNFields]=useState<number>(0);
    const [fields,setFields]=useState<string[]>([]);
    const [vals,setVals]=useState<any>();
    // let objTransform = data as Adresa;

    useEffect(()=>{
        console.log("Inside GRIDROW")
        // const objTransform=data as LoadType;
        const objTransform = Object.values(data)[0] as typeof typeMap["Adresa"];

        // type DataType = typeof typeMap[typeof dataType];
        // const objTransform = data as DataType;
        Object.values(objTransform).map(v=>console.log(typeof v));
        console.log(objTransform.localitate);
        console.log("-=-=-=-=-=-=-=-==-=-=")
    },[data])
    return(
        // <>
        //     {
        //         fields?(
        //             fields.map((f,index)=>{
        //                 console.log(fields)
        //                 return(
        //                     <p>{f}-{vals}</p>
        //                 )
        //             })
        //         ):<p>{nFields}</p>
        //     }
        //     {/*<p>HHHHHHHHH</p>*/}
        // </>
        <>
            {/*{fields.map((key) => (*/}
            {/*    <p key={key}>*/}
            {/*        {key}: {JSON.stringify((data as any)[key])}*/}
            {/*    </p>*/}
            {/*))}*/}
        </>
    )
}

export default IndexRow;