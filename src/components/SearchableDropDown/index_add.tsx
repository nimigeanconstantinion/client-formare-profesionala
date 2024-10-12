import React, { useEffect, useState } from 'react';
import {AutoComplete, AutoCompleteChangeEvent, AutoCompleteCompleteEvent} from "primereact/autocomplete";
import {WrapperSearch} from "./indexstyle";
import Api from "../../Api";
import {Nume} from "../../models/Cursant";
import {types} from "util";

export interface Data {
    name: string;
    code: string;
    fields: string[],
    load?: LoadType
}

export const listNume:Data[]=[

    {name:"Vasilescu",code:"1",fields:["prenume","dataAdd"], load:{id: 1,persoana:undefined,nume: "Vasilescu",prenume: "Dana",dataAdd:new Date('2023-01-23')}},
    {name:"Jureschi",code:"2",fields:["prenume","dataAdd"], load:{id: 2,persoana:undefined,nume: "Jureschi",prenume: "Dana",dataAdd:new Date('2019-04-15')}}

]




interface ContentProps{
    data: Data[]
    retSelected?: Function|undefined
    defaultObj?: Data|undefined
    filterFunc?: Function|undefined,
    boolrw: boolean
}

const data:ContentProps={
    data:listNume,
    boolrw:false
}

export interface LoadType {
    [key: string]: any; // Permite accesul dinamic la orice proprietate
}
const MyAddAutoComplete=()=>{

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
        const formattedDate = date.toLocaleDateString("en-GB", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });

        return formattedDate;
    }

    let thisFilterFunc=async (den:string|null):Promise<Data[]|null>=>{
        console.log("Lucrez cu lista de filtrare!");
        console.log(data);

        if(den!=null){
            let lista= data.data.filter(p=>p.name.includes(den));
            if(lista!=null&&lista.length>0){
                return lista;
            }else{
                let retData:Data={code: "-1",name: "Add "+den,fields:['prenume',"dataAdd"],load:{id: -1,nume: den,prenume:"Hold",dataAdd: new Date()}};
                let retList:Data[]=[];
                retList.push(retData);
                return retList;
            }

        }
        return data.data;
    }
    function castContent(dateStr: string): string {
        // Parse the date string into a Date object
        const datx = new Date(dateStr);
        let formattedDate:string="";
        if(datx!=null&&datx.toString().includes("Invalid")==false) {
            console.log("Data");
            console.log(datx);
            console.log(dateStr);
            console.log(formatDate(dateStr));
            // Format the date object into the desired format (MM/DD/YYYY)
            // formattedDate = date.toLocaleDateString("en-GB", {
            //     year: "numeric",
            //     month: "2-digit",
            //     day: "2-digit",
            // });
            formattedDate=formatDate(dateStr);
        }else{
            formattedDate=dateStr;
        }
        return formattedDate;
    }
    const search =async (event: AutoCompleteCompleteEvent) => {

        await flt(event.query.toLowerCase());

    }


    let flt=async (den:string):Promise<void>=>{

        // let api=new Api();
        if(den.includes("/")){
            den="";
        }
        let response:Data[]|null=await thisFilterFunc!(den!=null&&den!==""?den:null);

        console.log("Lista la filtrare response");
        console.log(response);
        console.log("--------------------------------------");
        let lista=response;

        if(lista!=null){
            console.log("Flagggg de adaugare");
            console.log(lista);
            setFilteredObjs(lista)

            if (filteredObjs.length > 0 && filteredObjs[0].load) {
                console.log("flag 30 in")
                let listaTot = Object.keys(filteredObjs[0].load);
                let indx: number[] = [];
                listaTot.map((f, index) => {
                    if (data.data[0].fields.includes(f)) {
                        indx.push(index)
                    }
                })
                setIndxFld(indx);
                setFlds(Object.keys(filteredObjs[0].load));
                console.log("flag 31 in")

            }
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
        console.log("In itemTemplate");
        console.log(Object.values(item.load as LoadType)[2]);
        return (

            <div className="flex itm">

                {/*<div className={"divcode"}>{item.code}</div>*/}
                <div className={"divname"}>{item.name}</div>
                {/*<div className={"divname"}>{Object.values(item.load as LoadType)[2]}</div>*/}
                {/*<div className={"divname"}>{item.load!=undefined||item.load!=null?Object.values(item.load)[3]:""}</div>*/}

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
        console.log(defaultdObj)

        setObjs(data.data.sort((a, b) => a.name.localeCompare(b.name)));
        if(defaultdObj!=undefined){
            setSelectedObj(defaultdObj)

        }else{
            setDefaultObj({code:"",name:"",fields:["prenume","dataAdd"],load:{id:-1,nume:"",prenume:"",dataAdd:new Date()}})
        }
        if (data.data.length > 0 && data.data[0].load) {
            let listaTot = Object.keys(data.data[0].load);
            let indx: number[] = [];
            listaTot.map((f, index) => {
                if (data.data[0].fields.includes(f)) {
                    indx.push(index)
                }
            })
            setIndxFld(indx);
            setFlds(Object.keys(data.data[0].load));
            // pushDefaultObject();
            // let dynamicFld="id"
            //
            // let def:LoadType|undefined=objs.map(a=>a.load).filter(b=>b!=undefined?b[dynamicFld]==defaultObjID:false)[0];
            // if(def!=undefined&&def!=null){
            //     let a=def as Autorizatie;
            //     setDefaultObj({name: a.nomenclator.denumire,code: a.nrAutorizatie,load: a,fields:["dataRNFPA"]});
            //     setCh(prevState => ++prevState);
            //
            // }else{
            //
            // }
            // setVal(Object.values(data[0].load).toString)
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
            setSelectedObj(defaultdObj);
            console.log(defaultdObj);

        }
        // setSelectedObj(defaultdObj);
        // setCh(prevState => ++prevState);

    },[ch])

    let retSelValue=()=>{
        console.log(selectedObj);
        // if(retSelected!=undefined){
        //     retSelected(selectedObj?.load);
        // }
    }

    return (
        <WrapperSearch>

            <div className="card flex justify-content-center">
                {
                    selectedObj||defaultdObj|| ch?(
                        <AutoComplete className={"divfld"} field="name" value={selectedObj} suggestions={filteredObjs}
                                      completeMethod={search} onChange={(e: AutoCompleteChangeEvent) => setSelectedObj(e.value)} onBlur={retSelValue}
                                      itemTemplate={itemTemplate} panelFooterTemplate={panelFooterTemplate} disabled={false} />
                    ):(
                        ""
                    )


                }

            </div>

        </WrapperSearch>

    )
}

export default MyAddAutoComplete;