import MyAutoComplete, {Data} from "./index_v3";
import React, {useEffect, useState} from "react";
import Api from "../../Api";
import Nomenclator from "../../models/NomCor";


const TestX:React.FC=()=>{
    const [lista,setLista]=useState<Data[]>([])

    let loadData=async ():Promise<Data[]|undefined>=>{
        let api=new Api();
        try{
            let response=await api.getNomenclatorFormare();
            console.log(response);
            return response.map(n=>{
                let datt:Data={
                    name: n.denumire,
                    code: n.cod,
                    fields: ['dataAdd'],
                    load: n
                }
                return datt;
            });
        }catch (e) {
            console.log(e);
        }

    }
    useEffect(()=>{
        console.log("In textx")
        let listt=loadData().then(res=>res!=undefined?setLista(res):"");

    },[])

    let selObj=(obj:Nomenclator|null)=>{

        if(obj!=null){
            console.log(obj);
            console.log(obj.denumire);
        }
    }

    let filterAut=(filterStr:string|null)=>{

    }

    return(
        <>
            {
                lista.length>0?(
                    <MyAutoComplete data={lista} retSelected={selObj} filterFunc={undefined} defaultObj={undefined}  />
                ):""
            }
        </>
    )

}

export default TestX;

