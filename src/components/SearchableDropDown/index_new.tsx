import React, { useEffect, useState } from 'react';
import {AutoComplete, AutoCompleteChangeEvent, AutoCompleteCompleteEvent} from "primereact/autocomplete";
import { CountryService } from './CountryService';
import {WrapperSearch} from "./indexstyle";
import Api from "../../Api";
import Nomenclator from "../../models/NomCor";
export interface Data {
    name: string;
    code: string;
    fields: string[],
    load: Object|undefined
}

interface ContentProps{
    data: Data[]
    retSelected: Function|undefined
}
const MyAutoComplete:React.FC<ContentProps>=({data,retSelected})=>{

    const [objs, setObjs] = useState<Data[]>([]);
    const [selectedObj, setSelectedObj] = useState<Data>();
    const [filteredObjs, setFilteredObjs] = useState<Data[]>([]);
    const[flds,setFlds]=useState<string[]>([]);
    const[val,setVal]=useState("");
    const [indxFld,setIndxFld]=useState<number[]>([])

    function formatDate(dateStr: string): string {
        // Parse the date string into a Date object
        const date = new Date(dateStr);


        // Format the date object into the desired format (MM/DD/YYYY)
        const formattedDate = date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });

        return formattedDate;
    }

    function castContent(dateStr: string): string {
        // Parse the date string into a Date object
        const date = new Date(dateStr);
        let formattedDate:string="";
        if(date!=null) {

            // Format the date object into the desired format (MM/DD/YYYY)
             formattedDate = date.toLocaleDateString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
            });
        }else{
            formattedDate=dateStr;
        }
        return formattedDate;
    }
    const search = (event: AutoCompleteCompleteEvent) => {
        // Timeout to emulate a network connection
        setTimeout(() => {
            let _filteredObjs;

            if (!event.query.trim().length) {
                _filteredObjs = [...objs];
            }
            else {
                console.log("In filtru");
                console.log(event.query);
                _filteredObjs = objs.filter((objcrt) => {
                    return objcrt.name.toLowerCase().includes(event.query.toLowerCase());
                });
            }

            setFilteredObjs(_filteredObjs);
        }, 250);
    }

    const itemTemplate = (item: Data) => {

        return (

            <div className="flex itm">

                <div className={"divcode"}>{item["code"]}</div>
                <div className={"divname"}>{item.name.trim()}</div>
                {
                    item.fields.length>0&&flds.length>0&&item.load!=undefined&&indxFld.length>0?(
                        Object.keys(item.load).map((k,index)=>{


                            if(item.fields.includes(k)&&item.load!=undefined){
                                return (
                                    <>
                                        <div className={"divsup"}>{castContent(Object.values(item.load)[index])}</div>
                                    </>
                                )
                            }

                        })

                    ):""
                }

            </div>
        );
    };

    const panelFooterTemplate = () => {
        const isCountrySelected = (filteredObjs || []).some( objcrt => objcrt['name'] === selectedObj?.name );
        return (
            <div className="py-2 px-3">
                {isCountrySelected ? (
                    <span>
                        <b>{selectedObj?.name}</b> selected.
                    </span>
                ) : (
                    'No Selection.'
                )}
            </div>
        );
    };


    useEffect(()=>{

        setObjs(data.sort((a,b)=>a.name.localeCompare(b.name)));
        if(data.length>0&&data[0].load){
            let listaTot=Object.keys(data[0].load);
            let indx:number[]=[];
            listaTot.map((f,index)=>{
                if(data[0].fields.includes(f)){
                    indx.push(index)
                }
            })
            setIndxFld(indx);
            setFlds(Object.keys(data[0].load));
            // setFilteredObjs(objs);
            // setVal(Object.values(data[0].load).toString)
        }
    },[])




    let retValue=()=>{
        console.log(selectedObj);
        if(retSelected!=undefined){
            retSelected(selectedObj?.load);
        }
    }
    return (
        <WrapperSearch>

            <div className="card flex justify-content-center">
                <AutoComplete className={"divfld"} field="name" value={selectedObj} suggestions={filteredObjs}
                              completeMethod={search} onChange={(e: AutoCompleteChangeEvent) => setSelectedObj(e.value)} onBlur={retValue} itemTemplate={itemTemplate} panelFooterTemplate={panelFooterTemplate} />
            </div>

        </WrapperSearch>

    )
}

export default MyAutoComplete;