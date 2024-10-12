import React, { useEffect, useState } from 'react';
import {AutoComplete, AutoCompleteChangeEvent, AutoCompleteCompleteEvent} from "primereact/autocomplete";
import { CountryService } from './CountryService';
import {WrapperSearch} from "./indexstyle";
import Api from "../../Api";
import Nomenclator from "../../models/NomCor";
import {Autorizatie} from "../../models/Objects";
export interface Data {
    name: string;
    code: string;
    fields: string[],
    load?: LoadType
}

interface ContentProps{
    data: Data[]
    retSelected: Function|undefined
    defaultObj: Data|undefined
    filterFunc: Function|undefined
}

export interface LoadType {
    [key: string]: any; // Permite accesul dinamic la orice proprietate
}
const MyAutoComplete:React.FC<ContentProps>=({data,retSelected,defaultObj,filterFunc})=>{

    const [objs, setObjs] = useState<Data[]>([]);
    const [selectedObj, setSelectedObj] = useState<Data>();

    const [defaultdObj, setDefaultObj] = useState<Data>();

    const [filteredObjs, setFilteredObjs] = useState<Data[]>([]);
    const[flds,setFlds]=useState<string[]>([]);
    const[val,setVal]=useState("");
    const [indxFld,setIndxFld]=useState<number[]>([])
    const [ch,setCh]=useState(0);

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
             formattedDate = date.toLocaleDateString("en-GB", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
            });
        }else{
            formattedDate=dateStr;
        }
        return formattedDate;
    }
    const search =async (event: AutoCompleteCompleteEvent) => {

        await flt(event.query.toLowerCase());
        // setTimeout(()=>{
        //     if(filterFunc!=null){
        //          flt(event.query.toLowerCase()).then(f=>f!=null?setFilteredObjs(f):setFilteredObjs([{name:"",code:"",fields:["dataRNFPA"],load:undefined}]));
        //
        //     }
        //
        // },500)

        // // Timeout to emulate a network connection
        // setTimeout(() => {
        //     let _filteredObjs;
        //
        //     if (!event.query.trim().length) {
        //         _filteredObjs = [...objs];
        //         setFilteredObjs(_filteredObjs);
        //     }
        //     else {
        //         console.log(event.query)
        //          let x= await flt(event.query.toLowerCase()).then(f=>setFilteredObjs(f));
        //         // if(filterFunc!=undefined){
        //         //    _filteredObjs=filterFunc(event.query.toLowerCase());
        //         //
        //         // }
        //         // _filteredObjs = objs.filter((objcrt) => {
        //         //     return objcrt.name.toLowerCase().includes(event.query.toLowerCase());
        //         // });
        //     }
        //
        //     // setFilteredObjs(_filteredObjs);
        // }, 350);
    }


    let flt=async (den:string):Promise<void>=> {

        let api = new Api();
        if (defaultObj == undefined) {


                let response = await api.getAutorizatii(den != null ? den : null);
                let lista = response.map(a => {
                    let ddt: Data = {
                        name: a.nomenclator.denumire,
                        code: a.nrAutorizatie,
                        load: a as LoadType,
                        fields: ["dataRNFPA"]
                    }
                    return ddt;
                });
                setFilteredObjs(lista)
    }else{
            console.log("========================PLMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM")
            if(filterFunc!=undefined){
                let response:Data[]= await filterFunc(den==undefined||den.includes("/")?null:den);
                if(response!=null&&response!=undefined){

                    console.log("---------------------------------------------------Flag")
                    console.log(response);
                    response.sort((a,b)=>a.name.localeCompare(b.name))
                    setFilteredObjs(response);
                    if (filteredObjs.length > 0 && filteredObjs[0].load) {
                        let listaTot = Object.keys(filteredObjs[0].load);
                        let indx: number[] = [];
                        listaTot.map((f, index) => {
                            if (filteredObjs[0].fields.includes(f)) {
                                indx.push(index)
                            }
                        })
                        setIndxFld(indx);
                        setFlds(Object.keys(filteredObjs[0].load));

                         setCh(prevState => ++prevState);
                    }

                }
            }


            // if (filteredObjs.length > 0 && filteredObjs[0].load) {
            //     let listaTot = Object.keys(filteredObjs[0].load);
            //     let indx: number[] = [];
            //     listaTot.map((f, index) => {
            //         if (filteredObjs[0].fields.includes(f)) {
            //             indx.push(index)
            //         }
            //     })
            //     setIndxFld(indx);
            //     setFlds(Object.keys(filteredObjs[0].load));
            //
            //      setCh(prevState => ++prevState);
            // }
        }

        // console.log("In filtrare")
        // if(filterFunc!=undefined){
        //     let response=await filterFunc(den);
        //     console.log("Response din flt");
        //     console.log(response as Data[])
        //     return response;
        // }
        // return null;
    }

    const itemTemplate = (item: Data) => {

        return (

            <div className="flex itm">

                <div className={"divcode"}>{item.code}</div>
                <div className={"divname"}>{item.name}</div>
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


    useEffect(()=> {
        console.log("Am intrat in Componenta cu");
        console.log(data);
        console.log(defaultObj)

        setObjs(data.sort((a, b) => a.name.localeCompare(b.name)));
        setSelectedObj(defaultdObj)
        if (data.length > 0 && data[0].load) {
            let listaTot = Object.keys(data[0].load);
            let indx: number[] = [];
            listaTot.map((f, index) => {
                if (data[0].fields.includes(f)) {
                    indx.push(index)
                }
            })
            setIndxFld(indx);
            setFlds(Object.keys(data[0].load));

            setCh(prevState => ++prevState);
        }

    },[])

    let pushDefaultObject=async ()=>{
        //
        // let dynamicFld="id"
        //
        // let def:LoadType|undefined=objs.map(a=>a.load).filter(b=>b!=undefined?b[dynamicFld]==defaultObjID:false)[0];
        // if(def!=undefined&&def!=null){
        //     let a=def as Autorizatie;
        //     setDefaultObj({name: a.nomenclator.denumire,code: a.nrAutorizatie,load: a,fields:["dataRNFPA"]});
        //     setCh(prevState => ++prevState);
        //
        // }
    }

    useEffect(()=>{
        // setFilteredObjs(objs);


    },[objs])


    useEffect(()=>{
        console.log("Default");
        console.log(ch);
        if(ch<=2){
            setSelectedObj(defaultObj);
            console.log(defaultObj);

        }
        // setSelectedObj(defaultdObj);
        // setCh(prevState => ++prevState);

    },[ch])

    let retSelValue=()=>{
        console.log(selectedObj);
        if(retSelected!=undefined){
            retSelected(selectedObj?.load);
        }
    }

    return (
        <WrapperSearch>

            <div className="card flex justify-content-center">
                {
                   selectedObj||defaultObj|| ch?(
                        <AutoComplete className={"divfld"} field="name" value={selectedObj} suggestions={filteredObjs}
                                      completeMethod={search} onChange={(e: AutoCompleteChangeEvent) => setSelectedObj(e.value)} onBlur={retSelValue} itemTemplate={itemTemplate} panelFooterTemplate={panelFooterTemplate} />
                    ):(
                            ""
                    )


                }

            </div>

        </WrapperSearch>

    )
}

export default MyAutoComplete;