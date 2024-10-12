
import React, {useEffect, useState} from "react";
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import {WrapperSimpleDrop} from "./indexsimplestyle";
import {LoadType} from "./index";

export interface DataSimple {
    name: string;
    code: string;
    load: LoadType|null;
}

interface SimpleDropDownProps{
    data:DataSimple[],
    defaultObj:DataSimple|undefined,
    returnFunction: Function|null,
    isrw: boolean
}

const SimpleDropDown:React.FC<SimpleDropDownProps>=({data,defaultObj,isrw})=>{
    // className="w-full md:w-14rem sdrp
    const [selectedObj, setSelectedObj] = useState<DataSimple | null>(null);
    const [objs,setObjs]=useState<DataSimple[]>([]);
    useEffect(()=>{
        setObjs(data);
        console.log("Heeeeei---------------------");
        console.log(defaultObj);
        if(defaultObj!=null&&defaultObj!=undefined){
            setSelectedObj(defaultObj);

        }else{
            setSelectedObj(data[0]);
        }
    },[defaultObj,data])

    return (
        <WrapperSimpleDrop>

            <div className="card flex justify-content-center">
                <Dropdown panelClassName={"kkk"} value={selectedObj} onChange={(e: DropdownChangeEvent) =>setSelectedObj(e.value)} options={objs} optionLabel="name"
                          editable placeholder="Select an Value" className="w-full md:w-14rem sdrp" checkmark={true} highlightOnSelect={true} disabled={isrw} />
            </div>
        </WrapperSimpleDrop>

    )
}


export default SimpleDropDown;