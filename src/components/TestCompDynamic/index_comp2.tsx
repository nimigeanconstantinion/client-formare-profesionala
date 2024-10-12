import {useEffect, useRef, useState} from "react";

import { enGB } from "date-fns/locale/en-GB";
import * as React from "react";
import DatePicker from 'react-date-picker';
// import 'react-date-picker/dist/DatePicker.css';
import {Simulate} from "react-dom/test-utils";
import change = Simulate.change;
import {Value} from "react-date-picker/dist/cjs/shared/types";
 import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import {Calendar} from "primereact/calendar";
import {WrapperDate} from "./indexstyle";

interface Comp1Props{
    data:LoadType
}

interface LoadType{
    [hey: string]: any
}



const Index2:React.FC<Comp1Props>=(data)=>{

   const [ob,setOb]=useState(undefined);
   const [valDate,setValDate]=useState<Value>();
   const dateRef=useRef<Date>();

    useEffect(()=>{
        let ks=data.data[0]
            console.log(data);
            console.log(Object.values(data.data)[1])
        setOb(Object.values(data.data)[1])
        setValDate(new Date('2024-10-10'));
    },[])

    let handleChange=(e:Value)=>{
        setValDate(e);
    }

    return(
        <>
            <p>
                {
                    ob?(
                        <>
                            componenta 2 {ob}

                            <div id={"dv"}>KLhlkhlkh</div>
                            {/*<div style={{width: "300px",height: "400px",display:"flex",justifyItems:"flex-start"}}>*/}
                            <WrapperDate>
                                <DatePicker  id="example-datepicker" value={valDate} onChange={(e)=>handleChange(e)} locale={"en-GB"} format={"dd.MM.yyyy"} disabled={false}/>

                            </WrapperDate>

                            <Calendar/>


                            {/*</div>*/}
                        </>


                    ):"fara"


                }


            </p>
        </>
    )
}

export default Index2;